import json

from flask import Flask, render_template
import pandas as pd
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['DEBUG'] = True
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://japeto:jeffersonamado@localhost/DATABASE'
POSTGRES = {
    'user': 'japeto',
    'pw': 'jeffersonamado',
    'db': 'my_database',
    'host': 'localhost',
    'port': '5433',
}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES


db = SQLAlchemy()


@app.route("/")
def index():
    df = pd.read_csv('data.csv').drop('Open', axis=1)
    chart_data = df.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}
    return render_template("index.html", data=data)


if __name__ == "__main__":
    #from models import db
    #db.init_app(app)

    app.run(debug=True)
