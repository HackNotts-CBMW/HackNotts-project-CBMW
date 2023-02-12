import json
from flask import request
import requests

from backend import Constants

headers = {
    'Authorization': f'Bearer {Constants.authJWT}',
    'Content-Type': 'application/json',
    'version': '1.0'
}



