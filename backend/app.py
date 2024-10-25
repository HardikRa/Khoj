from flask import Flask,request
from common.neo4j_utils import Neo4jUtils

app = Flask(__name__)

neo4jUtils = Neo4jUtils('neo4j','p2ppassword','neo4j://10.1.210.104')

@app.route('/fradulent_users')
def index(methods=['GET','POST']):
    query_type = request.args.get("filter")    
    result = neo4jUtils.filter_fraudlent_users()
    for res in result:
        print(res.properties)
    return 'Web App with Python Flask!'

@app.route('/llm')
def llm():
    pass


@app.route('/potentially_frauded_and_related')
def okay():
    neo4jUtils.get_data()
    return 'okay something'
# @app.route('/potentially_fraudulent_users')
# def 

if __name__=='__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)