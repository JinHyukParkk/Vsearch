from log_python import log
import requests
import json
import logging

def post(URL, data):
    headers = {'Content-Type': 'application/json'}
    data = json.dumps(data, ensure_ascii=False, indent="\t")
    try:
        r = requests.post(URL, data=data, headers=headers)
    except:
        log("### ElasticSearch Post ERROR ###", logging.error)
