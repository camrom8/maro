from django.db import models
from django.db.models import Model


class Store(models.Model):
    name = models.CharField(max_length=255)


class Category(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)


class Brand(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
