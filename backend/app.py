from flask import Flask,request
from common.neo4j_utils import Neo4jUtils

app = Flask(__name__)

@app.route('/fradulent_users')
def index(methods=['GET','POST']):
    query_type = request.args.get("filter")    
    neo4jUtils = Neo4jUtils('neo4j','p2ppassword','neo4j://10.1.210.104')
    result = neo4jUtils.filter_fraudlent_user()
    for res in result:
        print(res)
    return 'Web App with Python Flask!'

@app.route('/llm')
def llm():
    pass

if __name__=='__main__':
    app.run(host='0.0.0.0', port=8000)