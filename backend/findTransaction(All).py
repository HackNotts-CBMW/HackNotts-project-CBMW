import json
from flask import request, Flask
import requests
import random

import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

app = Flask(__name__)

@app.route('/login')
def findTransaction():
    accountID = request.json['ID']
    dictionary = {}

    params = {
    'status': 'eq:Successful'
    }

    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions", headers=headers, params=params).text
    json_response = json.loads(response)

    for transactions in json_response["Transactions"]:
        if transactions["merchant"]["category"] in dictionary:
            dictionary[transactions["merchant"]["category"]] += round(transactions["amount"],2)
        else: 
            dictionary[transactions["merchant"]["category"]] = round(transactions["amount"],2)

    # print(dictionary)

    json_response = json.dumps(json_response)
    return json_response


    


