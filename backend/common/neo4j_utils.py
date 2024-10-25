import neo4j

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
        with self.driver.session(database="db2") as session:
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
        with self.driver.session(database="db2") as session:
            result = session.run(query)
            return [record for record in result]
    
    def filter_fraudlent_user_given_user_id(self,user_id:int):
        """
        
        """
        pass