import json
from flask import request, Flask
import requests

app = Flask(__name__)

from backend import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

params = {
    'status': 'eq:Successful'
}



@app.route('/')
def findAccount():
    account_id = request.json['ID']
    category = request.json['category']  # this will need to get input from the front end
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
