from django.contrib.auth.models import User
from rest_framework import serializers

from inventory.models import (
    ItemRegistration,
    BulkRegistration,
    ItemRegistrationChange
)
from product.serializers import ItemSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        depth = 2


class ItemRegisterSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    cost = serializers.CharField()
    quantity = serializers.IntegerField()
    total_cost = serializers.CharField()


class ItemAddRegisterSerializer(serializers.Serializer):
    id = serializers.CharField()
    cost = serializers.CharField()
    quantity = serializers.IntegerField()

class ItemChangeRegisterSerializer(serializers.Serializer):
    item = serializers.IntegerField()
    registration = serializers.IntegerField()
    cost = serializers.CharField()
    quantity = serializers.IntegerField()


class BulkRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    items = serializers.HyperlinkedRelatedField(
        view_name='inventory:item-registration-detail',
        read_only=True,
        many=True
    )

    class Meta:
        model = BulkRegistration
        fields = ['id', 'description', 'product_quantity', 'quantity', 'cost', 'created', 'user', 'items']


class ItemRegistrationSerializer(serializers.ModelSerializer):
    item = serializers.CharField(source='item.name')

    class Meta:
        model = ItemRegistration
        fields = ['id', 'item', 'quantity', 'cost', 'registration']


class BulkRegistrationDetailsSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    items = ItemRegistrationSerializer(many=True, read_only=True)

    class Meta:
        model = BulkRegistration
        fields = ['id', 'description', 'product_quantity', 'quantity', 'cost', 'created', 'user', 'items']


class ItemRegistrationChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemRegistrationChange
        fields = ['id', 'registration', 'item', 'quantity', 'cost', 'reason']