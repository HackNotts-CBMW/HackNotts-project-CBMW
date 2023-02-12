import json
from flask import request
import requests

from backend import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}
def CreditOrDebit():
    spending = 10
    accountID = "87267767"

    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{accountID}",
        headers=headers).text
    json_response = json.loads(response)
    balance = int(json_response["Accounts"][0]["balance"])

    if balance > spending:
        return json.dumps({"suggestCredit": True})
    else:
        return json.dumps({"suggestCredit": False})


if __name__ == '__main__':
    print(CreditOrDebit())