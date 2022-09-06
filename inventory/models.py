from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel
from product.models import Item


class BulkRegistration(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    product_quantity = models.PositiveIntegerField(default=0)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.created:%Y-%m-%d %H:%M} - ' \
               f'{self.description if len(self.description) < 101 else f"{self.description[0:100]}..."}'


class ItemBase(models.Model):
    registration = models.ForeignKey(BulkRegistration, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        abstract = True


class ItemRegistration(TimeStampedModel, ItemBase):
    registration = models.ForeignKey(BulkRegistration, on_delete=models.CASCADE, related_name='items')

    class Meta:
        unique_together = ('registration', 'item')

    def __str__(self):
        return f'{self.item} - registration'

class ItemRegistrationChange(TimeStampedModel, ItemBase):
    registration = models.ForeignKey(BulkRegistration, on_delete=models.CASCADE, related_name='changes')
    reason = models.TextField()

# class ItemVariationRegistration(TimeStampedModel):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     item = models.ForeignKey(Item, on_delete=models.PROTECT)
#     quantity = models.PositiveIntegerField()
#
#
# class ItemAdditionRegistration(TimeStampedModel):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     item = models.ForeignKey(Item, on_delete=models.PROTECT)
#     cost = models.DecimalField(max_digits=10, decimal_places=2)
#     quantity = models.PositiveIntegerField()