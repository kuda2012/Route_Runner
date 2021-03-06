from flask import Flask, render_template, request, jsonify, session, g, redirect, flash, json
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError
from google.oauth2 import id_token
from google.auth.transport import requests
import os
import re
from models import db, connect_db
import wtforms_json
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
wtforms_json.init()

app.config['SQLALCHEMY_DATABASE_URI'] = (os.environ.get('DATABASE_URL', "postgres://postgres@127.0.0.1:5432/route_runner"))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "secret")



toolbar = DebugToolbarExtension(app)

connect_db(app)


db.create_all()





@app.route('/', methods=["GET", "POST"])
def homepage():
    """Show homepage."""
    # print(request.json["token"])
    request1 = requests.Request()

    id_info = id_token.verify_oauth2_token(
    request.json["token"], request1, "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com")
    print(id_info)
    if id_info['iss'] != 'accounts.google.com':
        raise ValueError('Wrong issuer.')
    return id_info