from rest_framework import serializers
from rest_framework.permissions import AllowAny
from .models import Customer
from django.conf.urls import url

class RegistationSerialzier(serializers.ModelSerializer):
    permission_class=[AllowAny]
    class Meta:
        model=Customer
        fields=['first_name','last_name','email','password','phone_number','address','sex','age','bank','username']

class OrderSerializer(serializers.ModelSerializer):
    permission_class=[AllowAny]
    service=serializers.StringRelatedField(many=False)
    class Meta:
        model=Customer
        fields=['first_name','last_name','age','sex','email','address','phone_number',
                    'service','event_date','place','start_time','end_time']
class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=['service_provider','service','event_date','place','start_time','end_time','has_payed']

