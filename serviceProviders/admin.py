from django.contrib import admin

from serviceProviders.models import ServiceProviders, Videos, Images, Services, ServiceName, ImageComments, \
    VideoComments


class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ['username','first_name','last_name','email','gender','personal_descriptions','address','phone_number','passed','pic_url']
    search_fields = ['username','first_name','last_name','email','gender','personal_descriptions','address','phone_number','passed']
admin.site.register(ServiceProviders,ServiceProviderAdmin)

class ImagesAdmin(admin.ModelAdmin):
    list_display = ['likes','dislikes','descriptions','url','service_proviser']
    search_fields = ['service_proviser']

admin.site.register(Images,ImagesAdmin)


class ImagesCommentsAdmin(admin.ModelAdmin):
    search_fields = ['comments']
    list_display = ['comments','image']
admin.site.register(ImageComments,ImagesCommentsAdmin)
class VideoCommentsAdmin(admin.ModelAdmin):
    search_fields = ['comments','video']
    list_display = ['comments','video']


class VideoAdmin(admin.ModelAdmin):
    search_fields = ['service_proviser']
    list_display = ['likes','dislikes','url','descriptions','service_proviser']
admin.site.register(Videos,VideoAdmin)

class ServicesAdmin(admin.ModelAdmin):
    search_fields = ['price','currency','discriptions','service_provider','name']
    list_display = ['price','currency','discriptions','service_provider','name']
admin.site.register(Services,ServicesAdmin)

class ServiceNameAdmin(admin.ModelAdmin):
    search_fields = ['name']


admin.site.register(ServiceName,ServiceNameAdmin)

admin.site.register(VideoComments,VideoCommentsAdmin)
