import json
import random


def promotions(category=None, brand=None, discount=None):
    promotion_cat = {"Shopping": ["Amazon", "Apple", "Boots", "Sports Direct"],
                     "Fun": ["Amazon", "Disney Plus", "Tidal", "Booking.com"]}
    discount_list = [5, 10, 12, 15, 20]

    if not brand:
        if not category:
            _, company_list = random.choice(list(promotion_cat.items()))
            company = random.choice(company_list)

            if not discount:
                discount_chosen = random.choice(discount_list)
            else:
                discount_chosen = discount

            return json.dumps({company: discount_chosen})
    if brand:
        if not discount:
            discount_chosen = random.choice(discount_list)
        else:
            discount_chosen = discount

        return json.dumps({brand: discount_chosen})
    if category in promotion_cat:
        company = random.choice(promotion_cat[category])

        if not discount:
            discount_chosen = random.choice(discount_list)
        else:
            discount_chosen = discount

        return json.dumps({company: discount_chosen})
