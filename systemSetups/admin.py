from django.contrib import admin

from systemSetups.models import Schedules
class SchedulesAdmin(admin.ModelAdmin):
    list_display = ['service_provider','customer','date']
    search_fields = ['customer']

admin.site.register(Schedules,SchedulesAdmin)
