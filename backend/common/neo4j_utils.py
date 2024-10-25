import neo4j

class neo4jUtils:
    def __init__(self,username:str,password:str,uri:str):
        self.username = username
        self.password = password
        self.uri = uri
        self.driver = neo4j.GraphDatabase.driver(self.uri, auth=(self.username, self.password))

    def execute_query(self,query:str):
        query = """
        MERGE (d:Domain {name: $domain})
        WITH d
        UNWIND $subdomains AS subdomain
        MERGE (s:Domain {name: subdomain})
        MERGE (d)-[:HAS_SUBDOMAIN]->(s)
        RETURN d, s
        """
        with self.driver.session() as session:
            # result = session.run(query, domain=domain, subdomains=subdomains)
            # return [(record["d"]["name"], record["s"]["name"]) for record in result]
            pass

