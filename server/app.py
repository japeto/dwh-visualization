################################################
#
#
################################################

import json
from flask import Flask, jsonify
# import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from connection import config as PROD, config_dev as DEV
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['DEBUG'] = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(POSTGRES_USER)s:\
%(POSTGRES_PW)s@%(POSTGRES_HOST)s:%(POSTGRES_PORT)s/%(POSTGRES_DB)s' % DEV

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)
