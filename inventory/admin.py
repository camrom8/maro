from django.contrib import admin
from inventory.models import BulkRegistration, ItemRegistration
# Register your models here.
admin.site.register(BulkRegistration)
admin.site.register(ItemRegistration)