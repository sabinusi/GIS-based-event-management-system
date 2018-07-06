
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view


from serviceProviders import urls
from customers import cusstomerURL
schema_view=get_swagger_view(title='GISBasedEeventOrganizationSystem')
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^customer/', include(cusstomerURL)),
    url(r'^swagger/', schema_view),
    url(r'^serviceProvider/',include(urls))
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
admin.site.site_header = 'GIS Based Event Organization System '