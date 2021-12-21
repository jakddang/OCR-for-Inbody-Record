import requests
import argparse


def get_params(height, weight):
    params = {"height": height, "weight": weight}

    return params


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Toy clinet")
    parser.add_argument("--height", default=170, type=int)
    parser.add_argument("--weight", default=70, type=int)
    args = parser.parse_args()

    url = "http://10.0.7.57:5000/"

    home = requests.get(url)
    print(home.text)

    test = requests.get(url + "test/")
    print(test.text[13:-2])

    params = get_params(args.height, args.weight)
    res = requests.get(url + "bmi/", params=params)
    print(res.text)
