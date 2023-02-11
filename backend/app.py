import json
from flask import request, Flask
import requests
import random

from backend import Constants
import backend.findTransactionCategory as findTransactionCategory 

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

app = Flask(__name__)

@app.route('/api/login')
def login():
    account_id = request.json['ID']
    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{account_id}",
        headers=headers).text
    json_response = json.loads(response)
    json_response = json.dumps(json_response)

    return json_response

@app.route('/api/find')
def findAccount():
    return findTransactionCategory.findTotalCategorySpent()

@app.route('/api/proxytest')
def proxy():
    return json.dumps({"hello": "hi"})

if __name__ == "__main__":  # Makes sure this is the main process
	app.run( # Starts the site
		host='127.0.0.1',  # EStablishes the host, required for repl to detect the site
		port=5000
	)