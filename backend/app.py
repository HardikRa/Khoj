from flask import Flask,request
from common.LLM import LLMs
from common.neo4j_utils import Neo4jUtils
from flask_cors import CORS, cross_origin

app = Flask(__name__)

#handle CORS errors
CORS(app)

neo4jUtils = Neo4jUtils('neo4j','p2ppassword','neo4j://10.1.210.104')

@app.route('/fraudulent_users')
def index(methods=['GET','POST']):
    result = neo4jUtils.get_fraudlent_data()
    return result


@app.route('/llm')
def llm(methods=['GET','POST']):
    """
    Talk with your data! We want the user to be able to speak to their data, and it speak back.
    """
    llm = LLMs()
    userPrompt = request.args.get("userPrompt","")
    if userPrompt is None:
        return {"Error":"User prompt cannot be Empty"}
    else:
        # cipher_query = llm.generate_cipher_query(user_prompt=userPrompt)
        cipher_query = 'MATCH (u:User{guid: "aa39d3cbfb9f6ed0a48fcc6156bfb693"})-[r]-(n) RETURN u, r, n;'
        results = neo4jUtils.execute_neo4j_query(query=cipher_query)
        return results



@app.route('/potentially_frauded_and_related')
def okay():
    neo4jUtils.get_data()
    return 'okay something'
# @app.route('/potentially_fraudulent_users')
# def 

if __name__=='__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)