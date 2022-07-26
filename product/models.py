from django.db import models
from model_utils import Choices
from model_utils.models import TimeStampedModel, StatusModel

# from maro.app.models import Category


class Item(TimeStampedModel, StatusModel):
    STATUS = Choices('stock', 'out_stock', 'discontinued', 'on sale', 'expiring')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    quantity = models.PositiveIntegerField(default=0)
    # category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    # brand = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('product:detail', kwargs={'pk': self.pk})

    @property
    def expiration(self):
        return self.expiration_date.strftime('%d/%m/%Y') if self.expiration_date else ''


class ItemVariation(models.Model):
    item = models.ManyToManyField(Item)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)


class ItemAddition(models.Model):
    item = models.ManyToManyField(Item)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)


