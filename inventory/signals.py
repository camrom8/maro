from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver

from inventory.models import ItemRegistration, BulkRegistration


@receiver(post_save, sender=ItemRegistration)
def updating_registration(sender, instance, created, **kwargs):
    """update bulk registration quantity and item inventory when item registration changes"""
    bulk = BulkRegistration.objects.prefetch_related('items').get(id=instance.registration_id)
    total_items_before = bulk.quantity
    total_items_now = total_cost = total_products = 0

    for item in bulk.items.all():
        total_products += 1
        total_cost += item.cost * item.quantity
        total_items_now += item.quantity

    items_total_change = total_items_now - total_items_before
    if items_total_change:
        item = instance.item
        item.quantity += items_total_change
        item.save()
        bulk.quantity = total_items_now
        bulk.cost = total_cost
        bulk.product_quantity = total_products
        bulk.save()


@receiver(post_delete, sender=ItemRegistration)
def remove_item_from_registration(sender, instance, **kwargs):
    bulk = BulkRegistration.objects.get(id=instance.registration_id)
    bulk.quantity -= instance.quantity
    bulk.cost -= instance.cost * instance.quantity
    bulk.product_quantity -= 1
    bulk.save()
