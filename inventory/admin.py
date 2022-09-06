from django.contrib import admin
from inventory.models import BulkRegistration, ItemRegistration, ItemRegistrationChange

admin.site.register(ItemRegistrationChange)


class ItemRegistrationInline(admin.TabularInline):
    model = ItemRegistration


class BulkRegistrationAdmin(admin.ModelAdmin):
    readonly_fields = ["user", "cost", "product_quantity", "quantity"]
    inlines = [
        ItemRegistrationInline,
    ]

admin.site.register(BulkRegistration, BulkRegistrationAdmin)