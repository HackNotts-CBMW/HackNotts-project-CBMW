import requests
import Constants

url = "https://api-gateway-public.clouddqt.uk.capitalone.com/developer-services-platform-pp/api/data/accounts/create"

payload = "{\n    \"accounts\": [\n        {\n            \"balance\": balance,\n            \"creditScore\": creditScore,\n            \"currencyCode\": currencyCode,\n            \"productType\": productType,\n            \"riskScore\": riskScore,\n            \"state\": state,\n            \"creditLimit\": creditLimit\n        }\n    ]\n}\n\n"
headers = {
  'Content-Type': 'application/json',
  'Version': '1.0',
  'Authorization': f'Bearer {Constants.authJWT}'
}

response = requests.request("POST", url, headers=headers, data = payload)

print(response.text.encode('utf8'))