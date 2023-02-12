import json
from flask import request, Flask, Response
import requests
import random
import os
from os.path import join, dirname

import backend.TGTG as TGTG
import backend.findTransactionCategory as findTransactionCategory
import backend.promotions as promotions
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
import backend.models as db

dotenv_path = join(dirname(__file__), '.env')
load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv("AUTH_JWT")}',
    'Content-Type': 'application/json',
    'version': '1.0'
}

params = {
    'status': 'eq:Successful'
}

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route('/api/login')
def login():
    email = request.json['email']
    password = request.json['password']
    user = db.retrieveUser(email)
    print(type(user))
    print(user)
    if(bcrypt.check_password_hash(user[1], password)):
        return userData(user[2])
    else:
        return Response(json.dumps({"error": "Invalid credentials"}), status=401)

@app.route('/api/register')
def register():
    email = request.json['email']
    password = bcrypt.generate_password_hash(request.json['password'])
    # Account initialized with 25 transactions
    try:
        account_id = generateUser(25)
        db.insertUser(email, password, account_id)
        return Response(json.dumps({"message": "User created"}), status=200)
    except Exception as e:
        return Response(json.dumps({"message": "Failed to generate user", "error": str(e)}), status=500)

def generateUser(numTransactions):
    quantity = 1
    liveBalance = False

    payload = json.dumps({"quantity": quantity, "numTransactions": numTransactions, "liveBalance": liveBalance})

    response = requests.post("https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create", headers=headers, data=payload).text
    

    print(type(json.loads(response)["Accounts"][0]['accountId']))

    return json.loads(response)['Accounts'][0]['accountId']

@app.route('/api/user')
def getUser(account_id):
    account_id = request.json['ID']
    return userData(account_id)

def userData(account_id):
    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{account_id}",
        headers=headers).text
    json_response = json.loads(response)
    json_response = json.dumps(json_response)

    return json_response

@app.route('/api/transactions')
def findTransaction():
    accountID = request.json['ID']

    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions", headers=headers, params=params).text
    # json_response = json.loads(response)

    # json_response = json.dumps(json_response)
    return response

@app.route('/api/createtransactions')
def createTransactions():
    account_id = request.json['ID']
    
    transactions=[{"amount": request.json["amount"]}, {"currency": request.json["currency"]}, {"creditDebitIndicator": request.json["creditDebitIndicator"]}, {"status": request.json["status"]}]
    payload = json.dumps({"transactions": transactions})
    response = requests.post(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{account_id}/create", headers=headers, data=payload).text
    
    json_response = json.loads(response)
    json_response = json.dumps(json_response)
    return json_response

@app.route('/api/spendings')
def spendingByCategory():
    accountID = request.json['ID']
    dictionary = {}

    response = requests.get(f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{accountID}/transactions", headers=headers, params=params).text
    json_response = json.loads(response)

    for transactions in json_response["Transactions"]:
        if transactions["merchant"]["category"] in dictionary:
            dictionary[transactions["merchant"]["category"]] += round(transactions["amount"], 2)
        else: 
            dictionary[transactions["merchant"]["category"]] = round(transactions["amount"], 2)

    json_response = json.dumps(dictionary)
    return json_response

@app.route('/api/spendings/<category>')
def spendingPerMerchantInCategory(category):
    account_id = request.json['ID']
    # category = request.json['category']  # this will need to get input from the front end
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


@app.route('/api/deals')
def findFoodDeals():
    TGTG.TGTG()

@app.route('/api/promotion')
def getPromotion():
    promotions.promotions()

@app.route('/api/fakepromotion')
def getFakeRandomPromotion():
    promotions.createListOfPromotions()

@app.route('/api/credit')
def DebitOrCredit():
    spending = request.json['spending']
    accountID = request.json['ID']

    response = requests.get(
        f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/{accountID}",
        headers=headers).text
    json_response = json.loads(response)
    balance = int(json_response["Accounts"][0]["balance"])

    if balance > spending:
        return json.dumps({"suggestCredit": True})
    else:
        return json.dumps({"suggestCredit": False})

# @app.route('/find')
# def findFoodDeals():
#     backend.findTransactionCategory.findTotalCategorySpent()

db.initialize()
app.run( # Starts the site
    host='127.0.0.1',  # EStablishes the host, required for repl to detect the site
    port=5000
)