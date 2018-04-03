import requests
import json


def post(URL, data):
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(data, ensure_ascii=False, indent="\t")
    r = requests.post(URL, data=data, headers=headers)