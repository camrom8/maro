from django.shortcuts import render


def indexView(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def inventory_view(request, *args, **kwargs):
    return render(request, "frontend/inventory_register.html")


def registration_view(request, *args, **kwargs):
    return render(request, "frontend/inventory_registration.html")
