from flask import Flask, render_template, request, jsonify, session, g, redirect, flash, json
from flask_debugtoolbar import DebugToolbarExtension
from flask_expects_json import expects_json
from flask_json_schema import JsonSchema, JsonValidationError
from sqlalchemy.exc import IntegrityError
from google.oauth2 import id_token
from google.auth.transport import requests
import os
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
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "secret")

CLIENT_ID = "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com"


toolbar = DebugToolbarExtension(app)

connect_db(app)


db.create_all()

with open('./schema/UserSchema.json') as f:
    schema = json.load(f)

@app.route('/signup', methods=["POST"])
@expects_json(schema)
def signup():
    """Signup"""
    try:
        user = User.signup(
                    name=request.json["name"],
                    password=request.json["password"],
                    email=request.json["email"],
                    google_enabled=False
                    )
        db.session.commit()
        return f"Welcome, {user.name}!"
    except IntegrityError:
        return ("Sorry. This email has already been taken. Please choose a different one.")

@app.route('/signup/google', methods=["POST"])
def signupGoogle():
    """Signup Through Google"""
    if request.json.get("token"):
        try:
            request1 = requests.Request()
            id_info = id_token.verify_oauth2_token(
                request.json["token"], request1, CLIENT_ID)
            if id_info['iss'] != 'accounts.google.com':
                raise ValueError('Wrong issuer.')
            if not User.query.filter_by(email=id_info.get("email")).one_or_none():
                 user = User.signup(
                        name=id_info["name"],
                        password=id_info["name"],
                        email=id_info["email"],
                        google_enabled = True
                        )
                 db.session.commit()
        except ValueError:
            return "Wrong Issuer"
        return id_info



@app.route('/login', methods=["POST"])
def login():
    get_user = User.query.filter_by(email=request.json.get("email")).one_or_none()
    if get_user:
        if not get_user.google_enabled: 
            user = User.authenticate(request.json["email"], request.json["password"])
            if user:
                return f"Hi {user.name}, Welcome back to Route Runner!"
            else:
                return "The username and password you entered did not match our records. Please double-check and try again."
        else:
            return f"This user has already registered an account through google sign-in. Please use that option to sign in."
    else:
        return "The username and password you entered did not match our records. Please double-check and try again."

@app.route("/<user_id>/routes", methods=["GET"])
def getRoutes(user_id):
    get_user_routes = Routes.query.filter_by(owner_id=user_id).all()
    print(get_user_routes)
    return get_user_routes

@app.route("/<user_id>/routes/add", methods=["Post"])
def addRoute(user_id):
    added_route = Routes(owner_id=user_id, name = request.json.get("name"), path=request.json.get("path", []), distance=request.json.get("distance"))
    db.session.add(added_route)
    db.session.commit()
    added_route = added_route.serialize()
    return added_route