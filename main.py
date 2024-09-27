import os
from flask import Flask, render_template, jsonify
import requests
from datetime import datetime, timedelta

app = Flask(__name__)

NASA_API_KEY = "5dxKaHYAWFnYuV9e9wDg0YIEneZ7kvV1RbC5B6sI"  # Replace with your actual NASA API key

def fetch_neo_data():
    today = datetime.now().strftime("%Y-%m-%d")
    end_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
    
    url = f"https://api.nasa.gov/neo/rest/v1/feed?start_date={today}&end_date={end_date}&api_key={NASA_API_KEY}"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        neo_list = []
        for date, neos in data["near_earth_objects"].items():
            for neo in neos:
                neo_list.append({
                    "id": neo["id"],
                    "name": neo["name"],
                    "diameter": neo["estimated_diameter"]["kilometers"]["estimated_diameter_max"],
                    "distance": neo["close_approach_data"][0]["miss_distance"]["kilometers"],
                    "date": date
                })
        return neo_list
    else:
        return []

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.get('/')
def neo_data():
    print('Get Request')
    data = fetch_neo_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)