from django.contrib import admin
from inventory.models import BulkRegistration, ItemRegistration, ItemRegistrationChange

admin.site.register(BulkRegistration)
admin.site.register(ItemRegistration)
admin.site.register(ItemRegistrationChange)