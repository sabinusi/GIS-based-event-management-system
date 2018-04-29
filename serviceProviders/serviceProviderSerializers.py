from rest_framework import serializers
from rest_framework.permissions import AllowAny

from .models import ServiceProviders, Images, ImageComments, Videos


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



