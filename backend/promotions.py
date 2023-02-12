import json
import random

promotion_cat = {"Shopping": ["Amazon", "Apple", "Boots", "Sports Direct"],
                 "Fun": ["Amazon", "Disney Plus", "Tidal", "Booking.com"]}
discount_list = [5, 10, 12, 15, 20]


def promotions(category=None, brand=None, discount=None):
    if not brand:
        if not category:
            _, company_list = random.choice(list(promotion_cat.items()))
            company = random.choice(company_list)

            if not discount:
                discount_chosen = str(random.choice(discount_list)) + "%"
            else:
                discount_chosen = discount

            return json.dumps({company: discount_chosen})
    if brand:
        if not discount:
            discount_chosen = str(random.choice(discount_list)) + "%"
        else:
            discount_chosen = discount

        return json.dumps({brand: discount_chosen})
    if category in promotion_cat:
        company = random.choice(promotion_cat[category])

        if not discount:
            discount_chosen = str(random.choice(discount_list)) + "%"
        else:
            discount_chosen = str(discount) + "%"

        return json.dumps({company: discount_chosen})


def createListOfPromotions():
    promo_shopping = {}
    promo_fun = {}

    for i in promotion_cat["Shopping"]:
        promo_shopping[i] = str(random.choice(discount_list)) + "%"

    for i in promotion_cat["Fun"]:
        promo_fun[i] = str(random.choice(discount_list)) + "%"

    return json.dumps(promo_shopping), json.dumps(promo_fun)


if __name__ == '__main__':
    print(createListOfPromotions())
