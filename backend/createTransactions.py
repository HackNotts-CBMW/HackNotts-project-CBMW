import json
import requests
from flask import request
import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

# transactions = [{"amount": 1.23}, {"currency": "INR"}, {"creditDebitIndicator": "Credit"}, {"status": "Pending"}]
# payload = json.dumps({"transactions": transactions})
# account_id = "87267767"

# response = requests.post(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{account_id}/create", headers=headers, data=payload).text
# json_response = json.loads(response)
# print(json_response)

def createTransactions():
    account_id = request.json['ID']
    transactions=[{"amount": request.json["amount"]}, {"currency": request.json["currency"]}, {"creditDebitIndicator": request.json["creditDebitIndicator"]}, {"status": request.json["status"]}]
    payload = json.dumps({"transactions": transactions})
    response = requests.post(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{account_id}/create", headers=headers, data=payload).text
    json_response = json.loads(response)
    json_response = json.dumps(json_response)