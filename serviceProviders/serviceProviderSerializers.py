from rest_framework import serializers
from rest_framework.permissions import AllowAny


from .models import ServiceProviders, Images, ImageComments, Videos, Services,ServiceName,VideoComments


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
        fields="__all__"

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
        fields=['price','currency','discriptions','name','id']

class ListServiceProvidersSerializer(serializers.ModelSerializer):
    permission_classes=[AllowAny]
    services=SerivesSerializer(many=True)
    class Meta:
        model=ServiceProviders
        fields = ['id','phone_number','gender','email','rates','personal_descriptions', 'address', 'pic_url', 'username', 'first_name', 'last_name', 'services']
class ImageCommentsSeri(serializers.ModelSerializer):
    class Meta:
        model=ImageComments
        fields=['id','comments']
class ListImagesSerializer(serializers.ModelSerializer):

    permission_class=[AllowAny]

    image_comments=ImageCommentsSeri(many=True)
    class Meta:
        model=Images
        fields="__all__"
class ListVideosSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Videos
        fields="__all__"

class RecomandServiceProvider(serializers.ModelSerializer):
    class Meta:
        model=ServiceProviders
        fields=['username','first_name','last_name','pic_url','id']
class RecomendedServices(serializers.ModelSerializer):
    permission_class=[AllowAny]
    service_provider=RecomandServiceProvider(many=False)
    class Meta:
        model=Services
        fields=['name','price','service_provider']
class ServiceNamesSerializers(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=ServiceName
        fields="__all__"
class UpdateImageLikeSerialzers(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Images
        fields=['likes']
class UpdateImageDislikeLikeSerialzers(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Images
        fields=['dislikes']
class ImageCommentsSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=ImageComments
        fields="__all__"
class VideoCommentsSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=VideoComments
        fields="__all__"




