from django.urls import path, include
from rest_framework import routers

from inventory.views import RegisterViewSet, BulkRegistrationViewSet, ItemRegistrationViewSet

router = routers.DefaultRouter()
router.register(
    'register-list',
    RegisterViewSet,
    basename='register-list'
)
router.register(
    'registration',
    BulkRegistrationViewSet,
    basename='registration'
)

router.register(
    'registration-detail',
    ItemRegistrationViewSet,
    basename='registration-detail'
)
app_name = 'inventory'
urlpatterns = [
    path('api/', include(router.urls)),
]