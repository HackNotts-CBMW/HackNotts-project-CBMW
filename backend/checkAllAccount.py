import json
import requests
import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

params = {

}

response = requests.get("https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts", headers=headers, params=params).text
json_response = json.loads(response)
print(json_response)