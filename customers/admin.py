from django.contrib import admin

from customers.models import Customer

class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name','last_name','age','sex','email','address','phone_number','service_provider',
                    'service','event_date','place','start_time','end_time','has_payed']
    search_fields=['phone_number']
admin.site.register(Customer,CustomerAdmin)

