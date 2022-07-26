from django.urls import path
from .views import indexView, inventory_view, registration_view  # the view responsible for the frontend

urlpatterns = [
    path('', indexView),  # add the view to the url
    path('inventory-register/', inventory_view),  # add the view to the url
    path('inventory-registration/', registration_view),  # add the view to the url
]