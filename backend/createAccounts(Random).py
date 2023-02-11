import json
import requests
import Constants

quantity = 1
numTransactions = 25
liveBalance = False

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}
payload = json.dumps({"quantity": quantity, "numTransactions": numTransactions, "liveBalance": liveBalance})

response = requests.post("https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create", headers=headers, data=payload).text
json_response = json.loads(response)
print(json_response)
