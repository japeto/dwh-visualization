
import json, decimal, datetime
from app import db
from sqlalchemy import text

def date_encoder(obj):
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

def query_manager(sql_string):
    results = db.engine.execute(text(sql_string))
    return json.dumps([(dict(row)) for row in results], default=date_encoder)