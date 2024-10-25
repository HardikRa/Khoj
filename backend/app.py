from flask import Flask

app = Flask(__name__)

@app.route('/')
def index(methods=['GET','POST']):
    return 'Web App with Python Flask!'

@app.route('/llm')
def llm():
    pass

if __name__=='__main__':
    app.run(host='0.0.0.0', port=8000)