from django.contrib.auth.models import User
from rest_framework import serializers

from inventory.models import ItemRegistration, BulkRegistration
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


class BulkRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    registrations = serializers.HyperlinkedIdentityField(view_name='inventory:registration-detail')

    class Meta:
        model = BulkRegistration
        fields = ['id', 'description', 'product_quantity', 'quantity', 'cost', 'created', 'user', 'registrations']


class ItemRegistrationSerializer(serializers.ModelSerializer):
    item = serializers.CharField(source='item.name')

    class Meta:
        model = ItemRegistration
        fields = ['id', 'item', 'quantity', 'cost', 'registration']
