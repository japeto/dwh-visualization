
import json
from flask import jsonify, render_template
import pandas as pd
from app import app, db

@app.route("/")
def index():
    return jsonify({'api':'dwh-visualization', 'version':'1.3','year':'2018',
                    'course':'data-mining Spring2018', 'more':'/help'})

@app.route("/help")
def help():
    return render_template("index.html")

@app.route("/data")
def return_data():
    df = pd.read_csv('data.csv').drop('Open', axis=1)
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}
    return data

app.run(debug=True)
