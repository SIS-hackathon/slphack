#
# SLPHACK's slphack.py
# Copyright (c) 2016 The Center to Promote Healthcare Access, Inc., DBA Social Interest Solutions
# Licensed under MIT (https://github.com/SIS-hackathon/slphack/LICENSE.txt)
#

from flask import Flask, jsonify, render_template, request, redirect, json, send_from_directory, abort

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('slp_getstarted0.html')

@app.route('/slpapp')
def slpapp():
    return render_template('slpapplication.html')

if __name__ == '__main__':
    app.run()
