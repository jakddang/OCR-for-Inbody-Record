import requests
import argparse


def get_params(height, weight):
    params = {"height": height, "weight": weight}

    return params


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Toy clinet")
    parser.add_argument("--name", default="cch", type=str)
    parser.add_argument("--height", default=170, type=int)
    parser.add_argument("--weight", default=70, type=int)
    args = parser.parse_args()

    url = "http://10.0.7.57:5000/"

    test = requests.get(
        f"{url}test/?name={args.name}&height={args.height}&weight={args.weight}"
    )
    print(test.text)

    judgement = requests.get(f"{url}judgement/?name={args.name}")
    print(f"your info \n{judgement.text}")
