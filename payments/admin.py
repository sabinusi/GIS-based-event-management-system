from django.contrib import admin

from payments.models import Payments
class PaymentsAdmin(admin.ModelAdmin):
    list_display = ['token_id','price','names','customer']
    search_fields = ['customer']
admin.site.register(Payments,PaymentsAdmin)
