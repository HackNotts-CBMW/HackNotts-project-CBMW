import json
from flask import request, Flask
import requests

from backend import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

app = Flask(__name__)

@app.route('/login')
def findAccount():
    account_id = json.loads(request.json)['ID']
    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{account_id}",
        headers=headers).text
    json_response = json.loads(response)
    json_response = json.dumps(json_response)

    return json_response
