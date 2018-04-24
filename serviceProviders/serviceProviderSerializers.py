from rest_framework import serializers
from rest_framework.permissions import AllowAny

from .models import ServiceProviders

class RegistrationSerialzier(serializers.ModelSerializer):
    permission_classes = (AllowAny)
    class Meta:
        model=ServiceProviders
        fields = ['password','username','first_name','last_name','email',
                  'gender','personal_descriptions','address','phone_number'
                  ]

