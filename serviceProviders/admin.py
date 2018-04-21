from django.contrib import admin

from serviceProviders.models import ServiceProviders, Videos, Images, Services, ServiceName, ImageComments, \
    VideoComments


class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ['username','first_name','last_name','email','gender','personal_descriptions','address','phone_number']
    search_fields = ['last_name']
admin.site.register(ServiceProviders,ServiceProviderAdmin)
class ImagesAdmin(admin.ModelAdmin):
    search_fields = ['likes','dislikes','descriptions','service_proviser']

admin.site.register(Images,ImagesAdmin)
class VideoAdmin(admin.ModelAdmin):
    search_fields = ['likes','dislikes','comments','descriptions','service_proviser']
admin.site.register(Videos,VideoAdmin)
class ServicesAdmin(admin.ModelAdmin):
    search_fields = ['name','price','currency','discriptions','service_provider']
admin.site.register(Services,ServicesAdmin)
class ServiceNameAdmin(admin.ModelAdmin):
    search_fields = ['name']
admin.site.register(ServiceName,ServiceNameAdmin)
admin.site.register(ImageComments)
admin.site.register(VideoComments)
