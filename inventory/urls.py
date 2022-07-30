from django.urls import path, include
from rest_framework import routers

from inventory.views import RegisterViewSet, BulkRegistrationViewSet, ItemRegistrationViewSet

router = routers.DefaultRouter()
router.register(
    'register',
    RegisterViewSet,
    basename='register'
)
router.register(
    'registration',
    BulkRegistrationViewSet,
    basename='registration'
)

router.register(
    'item-registration',
    ItemRegistrationViewSet,
    basename='item-registration',
)

router.register(
    'item-registration',
    ItemRegistrationViewSet,
    basename='item-registration',
)


app_name = 'inventory'
urlpatterns = [
    path('api/', include(router.urls)),
]