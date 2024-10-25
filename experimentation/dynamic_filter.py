import neo4j
import json

class Neo4jUtils:
    def __init__(self,username:str,password:str,uri:str):
        self.username = username
        self.password = password
        self.uri = uri
        self.driver = neo4j.GraphDatabase.driver(self.uri, auth=(self.username, self.password))

    def execute_query(self):
        query = """
        MATCH (n)-[r]-(m) RETURN n,r,m LIMIT 10;
        """
        with self.driver.session(database="db3") as session:
            result = session.run(query).data()
            json.dumps(result,default=str)
            print(result)


neo = Neo4jUtils("neo4j","p2ppassword","neo4j://10.1.210.104")
neo.execute_query()