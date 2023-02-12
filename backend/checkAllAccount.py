import json
import requests
from dotenv import load_dotenv
import os
from os.path import join, dirname


dotenv_path = join(dirname(__file__), '..env')
load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv("AUTH_JWT")}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

params = {

}

response = requests.get("https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts", headers=headers, params=params).text
json_response = json.loads(response)
print(json_response)