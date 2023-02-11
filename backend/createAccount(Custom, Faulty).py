import sys

import requests
import Constants

url = "https://api-gateway-public.clouddqt.uk.capitalone.com/developer-services-platform-pp/api/data/accounts/create"

liveBalance = True
numTransactions = 0
balance = "0"
creditScore = "100"
currencyCode = "GBP"
state = "open"
productType = "Credit"
creditLimit = "1000"
riskScore = "0"

def createAccount():
  payload = "{\n    \"accounts\": [\n        {\n            \"balance\": "+balance+",\n            \"creditScore\": "+creditScore+",\n            \"currencyCode\": "+currencyCode+",\n            \"productType\": "+productType+",\n            \"riskScore\": "+riskScore+",\n            \"state\": "+state+",\n            \"creditLimit\": "+creditLimit+"\n        }\n    ]\n}\n\n"
  headers = {
    'Content-Type': 'application/json',
    'Version': '1.0',
    'Authorization': f'Bearer {Constants.authJWT}'
  }

  response = requests.request("POST", url, headers=headers, data=payload)

  print(response.text.encode('utf8'))

if __name__ == '__main__':
    createAccount()
