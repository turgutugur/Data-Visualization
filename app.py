from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps

# Create an instance of our Flask app.
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create connection variable
app.config["MONGO_URI"] = "mongodb+srv://Eddy:LeDBcnpfSBCZZUGU@cluster1.5au3f.mongodb.net/nba_db"
mongo = PyMongo(app)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return(render_template("index.html"))

@app.route("/teams")
def season():
    return (render_template("teams.html"))

@app.route("/teamsstats")
def getseasons():
    data = mongo.db.standings.find({})
    return (dumps(data))

@app.route("/players")
def players():
    return(render_template("players.html"))

@app.route("/player_data")
def getPlayerData():
    data = mongo.db.player_data.find({})
    return(dumps(data))

@app.route("/head")
def head():
    return(render_template("head.html"))

@app.route("/headtoheadstats/<team1>/<team2>")
def matchup(team1, team2):
    data = mongo.db.h2h.find_one({"teams": { "$all" : [team1, team2]}})
    return(dumps(data))

@app.route("/teamlist")
def teamlist():
    data = mongo.db.teamlist.find_one({})
    return(dumps(data))



if __name__ == "__main__":
    app.run(debug=True)
    