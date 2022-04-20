from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util

# Create an instance of our Flask app.
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create connection variable
app.config["MONGO_URI"] = "mongodb://localhost:27017/nba_db"
mongo = PyMongo(app)
CORS(app)

@app.route("/")
def index():
    return(render_template("index.html"))

@app.route("/standings")
def getstandings():
    data = mongo.db.standings.find({})
    return(json_util.dumps(data))

# teamsstats by turgut
@app.route("/teams")
def season():
    return (render_template("teams.html"))
@app.route("/teamsstats")
def getseasons():
    data = mongo.db.standings.find({})
    return (json_util.dumps(data))
# ------------------------


if __name__ == "__main__":
    app.run(debug=True)