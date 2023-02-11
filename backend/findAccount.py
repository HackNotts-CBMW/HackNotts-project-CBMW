import json
import sys

import requests

from backend import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

account_id = sys.argv[1]

response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{account_id}", headers=headers).text
json_response = json.loads(response)
print(json_response)