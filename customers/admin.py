from django.contrib import admin

from customers.models import Customer

class CustomerAdmin(admin.ModelAdmin):
    search_fields = ['first_name','middle_name','email','address','phone_number','service_provider']
    search_fields=['phone_number']
admin.site.register(Customer,CustomerAdmin)

