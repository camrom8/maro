from decimal import Decimal
from django.conf import settings

from product.models import Item


class Register(object):
    def __init__(self, request):
        """
        Initialize the cart.
        """
        self.session = request.session
        register = self.session.get(settings.REGISTER_SESSION_ID)
        if not register:
            register = self.session[settings.REGISTER_SESSION_ID] = {}
        self.register = register
        self.products_ids = []

    def add(self, item_id, cost, quantity=1, update=False):
        """
        Add a product to the register or update its quantity.
        """
        if quantity == 0:
            self.remove(item_id)
        else:
            if item_id not in self.register:
                self.register[item_id] = {'quantity': 0, 'cost': cost}
            if update:
                self.register[item_id]['quantity'] = quantity
                self.register[item_id]['cost'] = cost
            else:
                self.register[item_id]['quantity'] += quantity
            self.save()

    def remove(self, item_id):
        """
        Remove a product from the cart.
        """
        if item_id in self.register:
            del self.register[item_id]
        self.save()

    def get_product_count(self):
        return len(self.register.keys())

    def __iter__(self):
        """
        Iterate over the items in the cart and get the total cost
        """
        """
        Iterate over the items in the cart and get the products
        from the database.
        """
        item_ids = self.register.keys()
        # get the product objects and add them to the cart
        items = Item.objects.filter(id__in=item_ids)
        register = self.register.copy()
        for item in items:
            item_id = str(item.id)
            register[item_id]['name'] = item.name
            register[item_id]['id'] = item_id
            register[item_id]['item'] = item
        for item in register.values():
            item['total_cost'] = float(Decimal(item['cost']) * item['quantity'])
            yield item

    def __len__(self):
        """
        Count all items in the cart.
        """
        return sum(item['quantity'] for item in self.register.values())

    def get_total_cost(self):
        return float(sum(Decimal(item['cost']) * item['quantity'] for item in self.register.values()))

    def clear(self):
        # remove cart from session
        del self.session[settings.REGISTER_SESSION_ID]
        self.save()

    def save(self):
        # mark the session as "modified" to make sure it gets saved
        self.session.modified = True

