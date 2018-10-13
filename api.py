import requests
import json
from flask import Flask,request,jsonify,make_response
app = Flask(__name__)

@app.route('/api/v1/proxy',methods=['POST'])
def proxy():
    try:
        url = json.loads(request.data)['url']
        if url[0:4] == 'http':
            print (url)
            r = requests.get(url, timeout = 2)
            result = r.text
            resp = make_response(result, 200)
            resp.headers['Content-Type'] = 'application/json'
            return resp
        else:
            return jsonify({'ok':'false'})
    except:
        return jsonify({'ok':'false'})

app.run(host='0.0.0.0',port='2333')