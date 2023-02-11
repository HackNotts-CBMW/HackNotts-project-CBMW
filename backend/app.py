import json
from flask import request, Flask
import requests
import random
import os
from os.path import join, dirname
import backend.findTransactionCategory as findTransactionCategory 
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv("AUTH_JWT")}',
    'Content-Type': 'application/json',
    'version': '1.0'
}
params = {
    'status': 'eq:Successful'
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

@app.route('/api/transactions')
def findTransaction():
    accountID = request.json['ID']

    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions", headers=headers, params=params).text
    # json_response = json.loads(response)

    # json_response = json.dumps(json_response)
    return response

@app.route('/api/spendings')
def spendingByCategory():
    accountID = request.json['ID']
    dictionary = {}

    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions", headers=headers, params=params).text
    json_response = json.loads(response)

    for transactions in json_response["Transactions"]:
        if transactions["merchant"]["category"] in dictionary:
            dictionary[transactions["merchant"]["category"]] += round(transactions["amount"],2)
        else: 
            dictionary[transactions["merchant"]["category"]] = round(transactions["amount"],2)

    json_response = json.dumps(dictionary)
    return json_response

@app.route('/api/spendings/<category>')
def spendingPerMerchantInCategory(category):
    account_id = request.json['ID']
    # category = request.json['category']  # this will need to get input from the front end
    dictionary = {}

    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{account_id}/transactions",
        headers=headers, params=params).text
    json_response = json.loads(response)

    for transactions in json_response["Transactions"]:
        if transactions["merchant"]["category"] == category:
            if transactions["merchant"]["name"] in dictionary:
                dictionary[transactions["merchant"]["name"]] += transactions["amount"]
            if transactions["merchant"]["name"] not in dictionary:
                dictionary[transactions["merchant"]["name"]] = transactions["amount"]

    json_object = json.dumps(dictionary)

    return json_object


@app.route('/find')
def findFoodDeals():
    backend.findTransactionCategory.findTotalCategorySpent()

if __name__ == "__main__":  # Makes sure this is the main process
	app.run( # Starts the site
		host='127.0.0.1',  # EStablishes the host, required for repl to detect the site
		port=5000
	)