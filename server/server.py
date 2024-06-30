from flask import Flask, jsonify, request
from flask_cors import CORS
import time 
import random 
from flask_socketio import SocketIO, emit


app = Flask(__name__)
CORS(app) 
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/api/crack_safe', methods=["POST"])
def countDigits():
    
    req = request.get_json()
    print(req)
    print(req["actual_combination"])
    attempts, time_taken = crack_safe(req["actual_combination"])
    result = {
        "attempts": attempts, "time_taken":time_taken
    }
    print(result)
    return jsonify(result)

def count_correct_digits(guess: str, actual: str) -> int: 
    return sum(1 for g, a in zip(guess, actual) if g == a) 

def generate_next_guess(current_guess: str, correct_positions: list, digit_pool: list) -> str: 
    next_guess = list(current_guess) 

    for i in range(10): 
        if not correct_positions[i]: 
            next_guess[i] = random.choice(digit_pool) 

    return ''.join(next_guess) 

  

def crack_safe(actual_combination: str): 

    start = time.time() 
    attempts = 0 
    current_guess = ''.join(random.choice('0123456789') for _ in range(10)) 
    correct_positions = [False] * 10 
    digit_pool = list('0123456789') 

    while current_guess != actual_combination: 
        attempts += 1 

        for i in range(10): 
            if current_guess[i] == actual_combination[i]: 
                correct_positions[i] = True 
        current_guess = generate_next_guess(current_guess, correct_positions, digit_pool) 

    end = time.time() 
    time_taken = end - start 

    return attempts, time_taken 


if __name__ == "__main__":
    app.run(debug=True, port=8080)

