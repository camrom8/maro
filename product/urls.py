from django.urls import path, include
from rest_framework import routers

from product.views import ItemCreateView, ItemDetailView, ItemListViewSet

router = routers.DefaultRouter()
router.register(
    'item-list',
    ItemListViewSet,
    basename='item-list'
)
app_name = 'product'
urlpatterns = [
    path('', include(router.urls)),
    path('new/', ItemCreateView.as_view(), name='new'),
    path('detail/<int:pk>/', ItemDetailView.as_view(), name='detail')
]