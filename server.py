from flask import Flask, request
import requests
import json
import redis

app = Flask(__name__)
r = redis.StrictRedis(host="localhost", port=6379, db=0)


def cal_bmi(height, weight):
    return weight / (height / 100 * height / 100)


@app.route("/")
def root():
    return "Welcome!"


@app.route("/test/", methods=["GET"])
def name():
    name = request.args.get("name", "cch")
    height = int(request.args.get("height", "173"))
    weight = int(request.args.get("weight", "80"))

    text = f"Hello, {name}!"

    params = {
        "name": name,
        "height": height,
        "weight": weight,
    }

    requests.post("http://127.0.0.1:5000/bmi/", data=json.dumps(params))

    return text


@app.route("/bmi/", methods=["POST"])
def bmi():
    params = json.loads(request.get_data())

    name = params["name"]
    height = params["height"]
    weight = params["weight"]
    bmi = cal_bmi(params["height"], params["weight"])

    params = {
        "height": height,
        "weight": weight,
        "bmi": bmi,
    }

    json_params = json.dumps(params)

    r.set(name, json_params)

    return json.dumps(params)


@app.route("/judgement/", methods=["GET"])
def judge_weight():
    name = request.args.get("name", "cch")

    params = r.get(name)
    json_params = json.loads(params)

    # check None
    if len(json_params) == 0:
        return "No parameter!"

    bmi = json_params["bmi"]

    if bmi < 20:
        category = "Underweight"

    elif bmi >= 20 and bmi < 25:
        category = "Normal weight"

    elif bmi >= 25 and bmi < 30:
        category = "Overweight"

    elif bmi >= 30:
        category = "Obesity"

    result = {"name": name, "bmi": bmi, "category": category}

    return json.dumps(result)


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
