from django.contrib.auth import authenticate
from rest_framework import generics, serializers

from rest_framework_jwt.serializers import JSONWebTokenSerializer

from serviceProviders.models import ServiceProviders, Images, Videos
from serviceProviders.serviceProviderSerializers import RegistrationSerialzier, UploadImagesSerializer, \
    UploadVideoSerializer, ListServiceProvidersSerializer, ListImagesSerializer, ListVideosSerializer

from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
import json
from rest_framework.authtoken.models import Token
class Registration(generics.CreateAPIView):

    serializer_class = RegistrationSerialzier
    queryset = ServiceProviders


def AuthLoginAPIView(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)

    if username is not None and password is not None:
        try:

            u = ServiceProviders.objects.get(username=username, password=password)
            print(u)
            print('hi')
            payload = jwt_payload_handler(u)
            print (payload)
            token = jwt_encode_handler(payload)
            print (token)
            return JsonResponse({'token': token, 'id': u.id}, content_type='application/json')
        except:
            return HttpResponse('credential didn\'t match', status=HTTP_400_BAD_REQUEST)
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
class ListImages(generics.ListAPIView):
    lookup_url_kwarg = 'service_proviser'
    def get_queryset(self):
        service_provider_id=self.kwargs.get(self.lookup_url_kwarg)
        images=Images.objects.filter(service_proviser=service_provider_id)
        return  images

    serializer_class = ListImagesSerializer
class ListAllImages(generics.ListAPIView):
    permission_classes = [AllowAny]

    queryset = Images.objects.all()
    serializer_class = ListImagesSerializer
class ListAllVideos(generics.ListAPIView):
    permission_classes = [AllowAny]

    queryset = Videos.objects.all()
    serializer_class = ListVideosSerializer
