from flask import Flask, request
import requests
import json

app = Flask(__name__)


@app.route("/")
def root():
    return "Welcome!\n"


@app.route("/test/")
def func1():
    text = {"message": "Hello, Tester!"}
    return json.dumps(text)


@app.route("/bmi/", methods=["GET"])
def cal_bmi():
    height = int(request.args.get("height", "170"))
    weight = int(request.args.get("weight", "60"))

    params = {
        "height": height,
        "weight": weight,
        "bmi": weight / (height / 100 * height / 100),
    }

    res = requests.post("http://127.0.0.1:5000/judgement/", data=json.dumps(params))

    return res.text


@app.route("/judgement/", methods=["POST"])
def judge_weight():
    params = json.loads(request.get_data())

    if len(params) == 0:
        return "No parameter!"

    result = {"bmi": params["bmi"], "category": "temp"}

    if params["bmi"] < 20:
        result["category"] = "Underweight"

    if params["bmi"] >= 20 and params["bmi"] < 25:
        result["category"] = "Normal weight"

    if params["bmi"] >= 25 and params["bmi"] < 30:
        result["category"] = "Overweight"

    if params["bmi"] >= 30:
        result["category"] = "Obesity"

    return json.dumps(result)


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
