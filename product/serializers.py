from django.db.migrations import serializer
from rest_framework import serializers

from product.models import Item


class ItemSerializer(serializers.ModelSerializer):
    item_details = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'description', 'expiration', 'item_details')

    def get_item_details(self, obj):
        return obj.get_absolute_url()

