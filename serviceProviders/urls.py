from django.conf.urls import url
from rest_framework_jwt.views import ObtainJSONWebToken


from serviceProviders.serviceProviderViews import Registration, CustomJWTSerializer,AuthLoginAPIView,UploadImages,UploadVideo

urlpatterns = [
    url(r'^registration', Registration.as_view()),
   # url(r'^token', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer)),
   url(r'^token', AuthLoginAPIView),

   url(r'^uploadImages', UploadImages.as_view()),
   url(r'^uploadVideo', UploadVideo.as_view())
]