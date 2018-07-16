from django.conf.urls import url
from rest_framework_jwt.views import ObtainJSONWebToken


from serviceProviders.serviceProviderViews import Registration, CustomJWTSerializer, AuthLoginAPIView, UploadImages, \
    UploadVideo, ListServiceProviders, ListImages, ListAllImages, ListAllVideos, ListVideo, Recomandation, ServiceNames, \
    ImageLike, ImageDisLike, ImageCommentsView, RetriveServiceProvider,VideoCommentsView,ImageCommentsView

urlpatterns = [
    url(r'^registration', Registration.as_view()),
   # url(r'^token', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer)),
   url(r'^login', AuthLoginAPIView),
   # login?username=saby&password='sabinusi'

   # url(r'^token', ObtainJSONWebToken.as_view()),
   url(r'^recomandation', Recomandation.as_view()),
   url(r'^allImages', ListAllImages.as_view()),
   url(r'^allVideos', ListAllVideos.as_view()),
   url(r'^serviceNames', ServiceNames.as_view()),
   url(r'^likeImage/(?P<id>[\w-]+)', ImageLike.as_view()),
   url(r'^dislikeImage/(?P<id>[\w-]+)', ImageDisLike.as_view()),
   url(r'^createImageComments', ImageCommentsView.as_view()),
   url(r'^createVideoComments', VideoCommentsView.as_view()),



   url(r'^list', ListServiceProviders.as_view()),
   url(r'^get/(?P<id>[\w-]+)', RetriveServiceProvider.as_view()),
   url(r'^images/(?P<service_proviser>[\w-]+)', ListImages.as_view()),
   url(r'^videos/(?P<service_proviser>[\w-]+)', ListVideo.as_view()),
   url(r'^uploadImages', UploadImages.as_view()),
   url(r'^uploadVideo', UploadVideo.as_view())
]