from flask import Flask, jsonify, render_template, request, redirect, json, send_from_directory, abort
from config import *
#import couchdb

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)    # Change setting per deployment
#server = couchdb.Server(app.config["COUCH_SERVER"])


@app.route('/')
@app.route('/goslp')
def index():
    return render_template('slp_getstarted0.html')

@app.route('/slpapp')
def slpapp():
    return render_template('step1_getstarted3.html')

@app.route('/save_slp_app')
def saveslpapp():
    dict_aaData = {"result": "Your Application Has Been Submitted."}

    return jsonify(dict_aaData)

if __name__ == '__main__':
    app.run()