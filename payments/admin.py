from django.contrib import admin

from payments.models import Payments
class PaymentsAdmin(admin.ModelAdmin):
    list_display = ['token_id','price','returned_names','customer','service_provider','service']
    search_fields = ['customer']
admin.site.register(Payments,PaymentsAdmin)
