from flask import Flask, render_template
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError

import pymysql
pymysql.install_as_MySQLdb()

# Import configuration
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Create SQLAlchemy engine and session using configuration
engine = create_engine(app.config['DATABASE_URL'])
Session = sessionmaker(bind=engine)
session = Session()

# Function to get table schemas and rows
def get_table_schemas_and_rows():
    metadata = MetaData()
    metadata.reflect(bind=engine)
    table_info = {}
    
    for table in metadata.sorted_tables:
        table_name = table.name
        table_info[table_name] = {
            'columns': [column.name for column in table.columns],
            'rows': []
        }
        
        # Retrieve the first 3 rows
        try:
            result = session.execute(table.select().limit(3))
            table_info[table_name]['rows'] = result.fetchall()
        except Exception as e:
            table_info[table_name]['rows'] = [f"Error retrieving data: {e}"]
    
    return table_info

@app.route('/')
def index():
    try:
        table_schemas_and_rows = get_table_schemas_and_rows()
        return render_template('index.html', table_schemas_and_rows=table_schemas_and_rows)
    except SQLAlchemyError as e:
        return f"Query failed: {e}"

if __name__ == '__main__':
    app.run(debug=True)
