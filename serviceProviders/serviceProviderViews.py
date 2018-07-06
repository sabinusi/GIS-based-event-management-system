from django.contrib.auth import authenticate
from rest_framework import generics, serializers

from rest_framework_jwt.serializers import JSONWebTokenSerializer

from serviceProviders.models import ServiceProviders, Images, Videos, Services, ServiceName, ImageComments
from serviceProviders.serviceProviderSerializers import RegistrationSerialzier, UploadImagesSerializer, \
    UploadVideoSerializer, ListServiceProvidersSerializer, ListImagesSerializer, ListVideosSerializer, \
    RecomendedServices, ServiceNamesSerializers, UpdateImageLikeSerialzers, UpdateImageDislikeLikeSerialzers, \
    ImageCommentsSerializer

from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from django.db.models import F
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
import json
from rest_framework.authtoken.models import Token
class Registration(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerialzier
    queryset = ServiceProviders


def AuthLoginAPIView(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)

    if username is not None and password is not None:
        try:
            print(username,password)
            u = ServiceProviders.objects.filter(username=username,password=password)
            # print(u)
            # print('hi')
            payload = jwt_payload_handler(u)
            # print (payload)
            token = jwt_encode_handler(payload)
            print (token)
            return JsonResponse('succesfull', content_type='application/json')
        except:
            return HttpResponse('failed', status=HTTP_400_BAD_REQUEST)
    else:
        return HttpResponse('pass both username and password', status=HTTP_400_BAD_REQUEST)
class CustomJWTSerializer(JSONWebTokenSerializer):
    username_field = 'username_or_email'

    def validate(self, attrs):

         password = attrs.get("password")
         user_obj = ServiceProviders.objects.filter(email=attrs.get("username_or_email")).first() or ServiceProviders.objects.filter(username=attrs.get("username_or_email")).first()

         if user_obj is not None:
            credentials = {
                'username':user_obj.username,
                'password': password
            }
            print(credentials)
            if all(credentials.values()):
                # user = authenticate(**credentials)
                print(user_obj)
                if user_obj:
                    if not user_obj.is_active:
                        msg = ('User account is disabled.')
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user_obj)
                    return {
                        'token': jwt_encode_handler(payload),
                        'user': user_obj

                    }
                else:
                    msg = ('Unable to log in with provided credentials.')
                    raise serializers.ValidationError(msg)

            else:
                msg = ('Must include "{username_field}" and "password".')
                msg = msg.format(username_field=self.username_field)

                raise serializers.ValidationError(msg)

         else:
            msg = ('Account with this email/username does not exists')
            raise serializers.ValidationError(msg)
class UploadImages(generics.CreateAPIView):
    queryset = Images
    serializer_class = UploadImagesSerializer
class UploadVideo(generics.CreateAPIView):
    queryset = Videos
    serializer_class = UploadVideoSerializer
class ListServiceProviders(generics.ListAPIView):
    permission_classes =[AllowAny]
    queryset = ServiceProviders.objects.filter(passed=True)
    serializer_class = ListServiceProvidersSerializer
class RetriveServiceProvider(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = ServiceProviders.objects.filter(passed=True)
    serializer_class = ListServiceProvidersSerializer
    lookup_field = 'id'
class ListImages(generics.ListAPIView):
    permission_classes = [AllowAny]
    lookup_url_kwarg = 'service_proviser'
    def get_queryset(self):
        service_provider_id=self.kwargs.get(self.lookup_url_kwarg)
        images=Images.objects.filter(service_proviser=service_provider_id)
        return  images

    serializer_class = ListImagesSerializer
class ListVideo(generics.ListAPIView):
    permission_classes = [AllowAny]
    lookup_url_kwarg = 'service_proviser'
    def get_queryset(self):
        print(self.request.user.id)
        service_provider_id=self.kwargs.get(self.lookup_url_kwarg)
        images=Videos.objects.filter(service_proviser=service_provider_id)
        return  images

    serializer_class = ListImagesSerializer
class ListAllImages(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Images.objects.all()
    serializer_class =  ListImagesSerializer

class ListAllVideos(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Videos.objects.all()
    serializer_class = ListVideosSerializer

class Recomandation(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RecomendedServices
    def get_queryset(self):
        queryset = ""
        price=self.request.query_params.get('price',None)
        name=self.request.query_params.get('name',None)
        if price is not None and name is not None:
            sab=name.split(',')

            queryset = Services.objects.filter(name__in=sab)
            return queryset
class ServiceNames(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ServiceNamesSerializers
    queryset = ServiceName.objects.all()
class ImageLike(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = UpdateImageLikeSerialzers
    def get_queryset(self):
        id=self.request.query_params.get('id',None)


        im=Images.objects.filter(id=id)
        im.likes=F('likes') + 1
        im.save()

        print(im)


        return im





class ImageDisLike(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UpdateImageDislikeLikeSerialzers
    queryset = Images.objects.all()
    lookup_field = 'id'
class ImageCommentsView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class=ImageCommentsSerializer
    queryset = ImageComments.objects.all()







