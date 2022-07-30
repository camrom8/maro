from decimal import Decimal


# Create your views here.
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from inventory.models import BulkRegistration, ItemRegistration, ItemRegistrationChange
from inventory.register import Register
from inventory.serializers import (
    ItemRegisterSerializer,
    ItemAddRegisterSerializer,
    BulkRegistrationSerializer,
    ItemRegistrationSerializer,
    BulkRegistrationDetailsSerializer,
    ItemRegistrationChangeSerializer,
    ItemChangeRegisterSerializer
)


class RegisterViewSet(viewsets.ViewSet):

    def list(self, request):
        register = Register(request)
        serializer_register = ItemRegisterSerializer(self._get_register_table_data(register), many=True)
        return Response({'items': serializer_register.data})

    def create(self, request):
        serializer_create = ItemAddRegisterSerializer(data=request.data)
        if serializer_create.is_valid():
            register = Register(request)
            register.add(
                serializer_create.validated_data.get('id'),
                serializer_create.validated_data.get('cost'),
                serializer_create.validated_data.get('quantity'),
                True
            )
            serializer_register = ItemRegisterSerializer(self._get_register_table_data(register), many=True)
            return Response({'items': serializer_register.data})
        return Response(serializer_create.errors)

    @staticmethod
    def _get_register_table_data(register):
        items = [item for item in register]
        for item in items:
            del item['item']
        summary ={
            'id': '',
            'name': '',
            'cost': '',
            'quantity': len(register),
            'total_cost': register.get_total_cost()
        }
        items.append(summary)
        return items


class BulkRegistrationViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        register = Register(request)
        description = request.data.get('description')
        user = request.user
        bulk = BulkRegistration.objects.create(
            user=user,
            description=description,
            cost=register.get_total_cost(),
            product_quantity=register.get_product_count(),
            quantity=len(register)
        )
        registration_items = []
        for entry in register:
            item = entry['item']
            item.quantity += entry['quantity']
            item.save()
            registration_item = ItemRegistration(
                registration=bulk,
                item=item,
                cost=Decimal(entry['cost']),
                quantity=entry['quantity']
            )
            registration_items.append(registration_item)
        ItemRegistration.objects.bulk_create(registration_items)
        register.clear()
        serializer_context = {
            'request': request,
        }
        serializer = BulkRegistrationSerializer(bulk, context=serializer_context)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = BulkRegistrationSerializer(BulkRegistration.objects.all(), many=True, context=serializer_context)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(BulkRegistration, pk=pk)
        serializer = BulkRegistrationDetailsSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ItemRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = ItemRegistrationSerializer
    filterset_fields = ['registration']
    queryset = ItemRegistration.objects.all()

    def create(self, request, *args, **kwargs):
        serializer_change = ItemRegistrationChangeSerializer(data=request.data)
        if serializer_change.is_valid():
            serializer_change.save()
            return Response(serializer_change.data, status=status.HTTP_200_OK)
        else:
            serializer_create = ItemChangeRegisterSerializer(data=request.data)
            if serializer_create.is_valid():
                ItemRegistrationChange.objects.create(**serializer_create.validated_data)
                serializer_create.save()
                return Response(serializer_create.data, status=status.HTTP_200_OK)
        return Response(serializer_create.errors, status=status.HTTP_400_BAD_REQUEST)

