from django.core.validators import RegexValidator
from django.db import models

from serviceProviders.models import ServiceProviders


class Customer(models.Model):
    first_name=models.CharField(max_length=100)
    middle_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    phone_regex = RegexValidator(regex=r'^\+255?\d{9}$',
                                 message="Phone number must be entered in the format: '+255******'. Up to 9 character is allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True)
    service_provider=models.ForeignKey(ServiceProviders,on_delete=models.CASCADE)


