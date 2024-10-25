import hashlib
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
        MATCH (n) RETURN n LIMIT 100;
        """
        with self.driver.session(database="db3") as session:
            result = session.run(query)
            return [record for record in result]

    def execute_neo4j_query(self,query:str):
        """
        Accept a cipher query and run it. Return the response

        Args:
        query:str   The neo4j argument that needs to be run

        Returns:
        records:list   A list of records that are returned from the query
        """
        with self.driver.session(database="db3") as session:
            result = session.run(query)
            return [record for record in result]

        
    def filter_fraudlent_users(self):
        """
        Filter fraudlent users.
        Return a list of records

        Args:
        None

        Returns:
        records:list A list of user records
        """
        query = """
                MATCH (u:User) where u.fraudMoneyTransfer=1 return u LIMIT 100;
        """
        with self.driver.session(database="db3") as session:
            result = session.run(query)
            return [record for record in result]
    
    def filter_fraudlent_user_given_user_id(self,user_id:int):
        """
        
        """
        pass

    def get_data(self):
        
        query = """
        MATCH (u:User)-[r]->(related)
        WHERE u.predictedProbability > 0.8
        RETURN 
            collect(DISTINCT{
                id: id(u), 
                ip: CASE WHEN EXISTS((u)-[:HAS_IP]->(:IP)) THEN [(u)-[:HAS_IP]->(ip:IP) | ip.guid][0] ELSE null END,
                location: CASE WHEN EXISTS((u)-[:HAS_CC]->(:Card)) THEN [(u)-[:HAS_CC]->(card:Card) | card.level][0] ELSE null END,
                risk_level: u.fraudMoneyTransfer
            }) + 
        collect(DISTINCT{
            id: id(related),
            ip: CASE WHEN EXISTS((related)-[:HAS_IP]->(:IP)) THEN [(related)-[:HAS_IP]->(ip:IP) | ip.guid][0] ELSE null END,
            location: CASE WHEN EXISTS((related)-[:HAS_CC]->(:Card)) THEN [(related)-[:HAS_CC]->(card:Card) | card.level][0] ELSE null END,
            risk_level: related.fraudMoneyTransfer
        }) AS nodes,
            collect(DISTINCT{
                id: id(r), 
                from: id(startNode(r)), 
                to: id(endNode(r)), 
                name: type(r)
            }) AS relationships
    """
            
        with self.driver.session(database="db3") as session:
            result = session.run(query)
            data = result.single()
            print (data)
            
            formatted_data = {
                "nodes": data["nodes"],
                "relationships": data["relationships"]
            }
            
        # driver.close()
            with open('test-dataaa-num.json', "w") as file:
                json.dump(formatted_data, file)
            return formatted_data
