from flask import Flask, jsonify, request
import numpy as np
from trained_models.models import drawing_battle_model
import random

app = Flask(__name__)
classes = drawing_battle_model.classes

@app.route('/api/v1/answers', methods=['GET'])
def get_answers():
    seed = request.args.get('seed')
    random.seed(seed)
    item = {"label": classes[random.randrange(0, len(classes))]}
    
    return jsonify(item) 

@app.route('/api/v1/predicts', methods=['POST'])
def get_predicts():
    item = {"label": drawing_battle_model.predict(request.json)}
    
    return jsonify(item) 

if __name__ == '__main__':
    app.run(debug=True)