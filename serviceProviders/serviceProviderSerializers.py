from rest_framework import serializers
from rest_framework.permissions import AllowAny

from .models import ServiceProviders, Images, ImageComments, Videos, Services


class RegistrationSerialzier(serializers.ModelSerializer):
    permission_classes = (AllowAny)
    class Meta:
        model=ServiceProviders
        fields = ['password','username','first_name','last_name','email',
                  'gender','personal_descriptions','address','phone_number'
                  ]
class UploadImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Images
        fields=['url','descriptions','service_proviser']
        def save(self,validaed_data):
            validaed_data.pop('service_proviser')
            Images.objects.create(service_proviser=self.request.user, **validaed_data)
class UploadVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Videos
        fields=['url','service_proviser','descriptions','service_proviser']
        def save(self,Validated_data):
             Validated_data.pop('service_proviser')
             Videos.objects.create(service_proviser=self.request.user,**Validated_data)
class SerivesSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    name=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Services
        fields=['price','currency','discriptions','name']

class ListServiceProvidersSerializer(serializers.ModelSerializer):
    permission_classes=[AllowAny]
    services=SerivesSerializer(many=True)
    class Meta:
        model=ServiceProviders
        fields = ['id','phone_number','gender','email','rates','personal_descriptions', 'address', 'pic_url', 'username', 'first_name', 'last_name', 'services']
class ListImagesSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Images
        fields="__all__"
class ListVideosSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Videos
        fields="__all__"



