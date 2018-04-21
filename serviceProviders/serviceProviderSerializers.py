from rest_framework import serializers


from .models import ServiceProviders

class RegistrationSerialzier(serializers.ModelSerializer):
    class Meta:
        model=ServiceProviders
        fields = ['password','username','first_name','last_name','email',
                  'gender','personal_descriptions','address','phone_number'
                  ]

