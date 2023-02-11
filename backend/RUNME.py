import json
from flask import request, Flask
import requests
import random

import Constants
import backend.findTransactionCategory

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

app = Flask(__name__)

@app.route('/login')
def login():
    account_id = request.json['ID']
    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{account_id}",
        headers=headers).text
    json_response = json.loads(response)
    json_response = json.dumps(json_response)

    return json_response

@app.route('/find')
def findAccount():
    backend.findTransactionCategory.findTotalCategorySpent()


@app.route('/find')
def findFoodDeals():
    backend.findTransactionCategory.findTotalCategorySpent()

if __name__ == "__main__":  # Makes sure this is the main process
	app.run( # Starts the site
		host='0.0.0.0',  # EStablishes the host, required for repl to detect the site
		port=random.randint(2000, 9000)  # Randomly select the port the machine hosts on.
	)