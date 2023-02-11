from tgtg import TgtgClient
from flask import request
from backend import Constants

def TGTG(latitude = None, longitude = None):
    food_dict = {}
    food_list_dict = []

    if not latitude:
        latitude = 52.953266
    if not longitude:
        longitude = -1.187243

    client = TgtgClient(access_token=Constants.credentials["access_token"],
                        refresh_token=Constants.credentials["refresh_token"], user_id=Constants.credentials["user_id"],
                        cookie=Constants.credentials["cookie"])

    items = client.get_items(favorites_only=False, latitude=latitude, longitude=longitude, radius=50)

    for i in items:
        try:
            food_dict["start_time"] = i["pickup_interval"]["start"]
            food_dict["end_time"] = i["pickup_interval"]["end"]
            food_dict["store"] = i["store"]["store_name"]
            food_dict["image_icon"] = i["item"]["logo_picture"]["current_url"]
            food_dict["price"] = i["item"]["price_including_taxes"]["minor_units"]
            food_dict["price"] = "{:.2f}".format(food_dict["price"] * 0.01)
            food_list_dict.append(food_dict)
        except (KeyError):
            pass
        food_dict = {}
    return food_list_dict

if __name__ == '__main__':
    print(TGTG())
