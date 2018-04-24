from django.contrib import admin

from serviceProviders.models import ServiceProviders, Videos, Images, Services, ServiceName, ImageComments, \
    VideoComments


class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ['username','first_name','last_name','email','gender','personal_descriptions','address','phone_number']
    search_fields = ['username','first_name','last_name','email','gender','personal_descriptions','address','phone_number']
admin.site.register(ServiceProviders,ServiceProviderAdmin)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ['likes','dislikes','descriptions','url','service_proviser']
    search_fields = ['service_proviser']

admin.site.register(Images,ImagesAdmin)
class VideoAdmin(admin.ModelAdmin):
    search_fields = ['service_proviser']
    list_display = ['likes','dislikes','comments','url','descriptions','service_proviser']
admin.site.register(Videos,VideoAdmin)
class ServicesAdmin(admin.ModelAdmin):
    search_fields = ['name','price','currency','discriptions','service_provider']
    list_display = ['name','price','currency','discriptions','service_provider']
admin.site.register(Services,ServicesAdmin)
class ServiceNameAdmin(admin.ModelAdmin):
    search_fields = ['name']
admin.site.register(ServiceName,ServiceNameAdmin)
admin.site.register(ImageComments)
admin.site.register(VideoComments)
