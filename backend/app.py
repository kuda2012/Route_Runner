from flask import Flask, render_template, request, jsonify, session, g, redirect, flash, json
from flask_debugtoolbar import DebugToolbarExtension
from flask_expects_json import expects_json
from flask_json_schema import JsonSchema, JsonValidationError
from jsonschema import validate, ValidationError
from sqlalchemy.exc import IntegrityError
from google.oauth2 import id_token
from google.auth.transport import requests as google_auth_request
import os
import jwt
import re
from models import db, connect_db, User, Routes
import wtforms_json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
wtforms_json.init()

app.config['SQLALCHEMY_DATABASE_URI'] = (os.environ.get(
    'DATABASE_URL', "postgres://postgres@127.0.0.1:5432/route_runner"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'my_precious')

CLIENT_ID = "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com"

CURR_USER_KEY = "curr_user"

toolbar = DebugToolbarExtension(app)

connect_db(app)


db.create_all()


@app.teardown_request
def add_user_to_g(self):
    """If we're logged in, add curr user to Flask global."""
    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
    else:
        g.user = None


# def do_login(user):
#     """Log in user."""

#     session[CURR_USER_KEY] = user.id


# def do_logout():
#     """Logout user."""

#     if CURR_USER_KEY in session:
#         del session[CURR_USER_KEY]


class InvalidUsage(Exception):
    status_code = 401

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

with open('./schema/UserSchema.json') as f:
    schema = json.load(f)

@app.route('/signup', methods=["POST"])
def signup():
    """Signup (w/o google)"""
    try:
        validate(request.json, schema=schema)
    except ValidationError as e:
        raise InvalidUsage(e.schema["error_msg"], 400)
    try:
        user = User.signup(
                    name=request.json["name"],
                    password=request.json["password"],
                    email=request.json["email"],
                    google_enabled=False
                    )
        db.session.commit()
        token_normal = User.encode_auth_token(user.email)
        return {"token_normal":token_normal, "msg":f"Hi, {user.name}! Welcome to Route Runner!"}
    except IntegrityError:
        raise InvalidUsage("This email has already been taken. Please choose a different one.", 409)

@app.route('/signup/google', methods=["POST"])
def signup_google():
    """Signup through Google"""
    if request.json.get("token_google"):
        try:
            req = google_auth_request.Request()
            id_info = id_token.verify_oauth2_token(
                request.json["token_google"], req, CLIENT_ID)
            if id_info['iss'] == 'accounts.google.com':
                if not User.query.filter_by(email=id_info.get("email")).one_or_none():
                    user = User.signup(
                            name=id_info["name"],
                            password=id_info["name"],
                            email=id_info["email"],
                            google_enabled = True
                            )
                    db.session.commit()
                user = User.query.filter_by(email=id_info["email"]).one_or_none()
                return {"token_google": request.json["token_google"], "msg": f"Hi, {user.name}! Welcome to Route Runner!", "id_info": id_info}
            else:
                return {"token_google": request.json["token_google"]}
        except ValueError:
            return "Wrong Issuer"
    else:
        return "No token sent"



@app.route('/login', methods=["POST"])
def login():
    get_user = User.query.filter_by(email=request.json.get("email")).one_or_none()
    if get_user:
        if not get_user.google_enabled:
            user = User.authenticate(request.json["email"], request.json["password"])
            if user:
                # do_login(user)
                token_normal = User.encode_auth_token(user.email)
                return {"token_normal":token_normal, "msg":f"Hi, {user.name}! Welcome to Route Runner!"}
            else:
                raise InvalidUsage("The username and password you entered did not match our records. Please double-check and try again.", 401)
        else:
            raise InvalidUsage("This user has already registered an account through Google sign-in. Please use that option to sign in.", 403) 
    else:
        raise InvalidUsage("The username and password you entered did not match our records. Please double-check and try again.", 401)

@app.route('/logout', methods = ["POST"])
def logout():
    """Handle logout of user."""
    if g.user:
        user = User.query.get(session[CURR_USER_KEY])
        # do_logout()
        return f"See you later, {user.name}", "success"
    else:
        raise InvalidUsage("You are not logged in", 401)


@app.route("/auth_token", methods=["POST"])
def auth_token():
    auth_token = request.json.get("token_google",  request.json.get("token_normal")) 
    new_token = User.validate_token(auth_token)
    if new_token:
        if request.json.get("token_google"):
            return {"token_google": new_token}
        else:
             return {"token_normal": new_token}
    else:
        return "Session Timed Out. Please log in again."


@app.route("/<user_id>/routes", methods=["GET"])
def get_routes(user_id):
    if not g.user:
        raise InvalidUsage('You are not logged in', status_code=401)
    get_user_routes = Routes.query.filter_by(owner_id=user_id).all()
    routes_array = []
    for route in get_user_routes:
        routes_array.append(route.serialize())
    return jsonify(routes_array)

@app.route("/<user_id>/routes/add", methods=["POST"])
def add_route(user_id):
    if not g.user:
        raise InvalidUsage('You are not logged in', status_code=401)
    added_route = Routes(owner_id=user_id, name = request.json.get("name"), path=request.json.get("path", []), distance=request.json.get("distance"))
    db.session.add(added_route)
    db.session.commit()
    added_route = added_route.serialize()
    return added_route

@app.route("/routes/<route_id>/delete", methods=["DELETE"])
def delete_route(user_id, route_id):
    if not g.user:
        raise InvalidUsage('You are not logged in', status_code=401)
    delete_route = Routes.query.filter_by(id=route_id).first()
    db.session.delete(delete_route)
    db.session.commit()
    delete_route = delete_route.serialize()
    return f'Your route by the name of {delete_route.get("name")} has been deleted'

@app.route("/routes/<route_id>/update", methods=["PATCH"])
def update_route(route_id):
    if not g.user:
        raise InvalidUsage('You are not logged in', status_code=401)
    update_route = Routes.query.filter_by(id=route_id).first()
    update_route.name = request.json.get("name", update_route.name)
    update_route.path = request.json.get("path", update_route.path)
    update_route.distance = request.json.get("distance", update_route.distance)
    db.session.commit()
    update_route = update_route.serialize()
    return jsonify(update_route)