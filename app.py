#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask import url_for
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)

tasks=[
    {
        'userId':	1,
        'id':	1,
        'title': "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body":	"quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
]

auth = HTTPBasicAuth()




@app.route('/posts')
def get_task():
    print("hahahahahh")
    return jsonify(tasks),200


@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def create_task():
    # print("request json: ",request.json['title'] )
    if not request.json or not 'title' in request.json:
        abort(400)
    task = {
        'id': tasks[-1]['id'] + 1,
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'done': False
    }
    tasks.append(task)
    return jsonify({'task': task}), 200

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(host= '0.0.0.0',port=5000,debug=True)