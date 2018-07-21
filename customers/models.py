from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User
from serviceProviders.models import ServiceProviders
from serviceProviders.models import Services


class Customer(User):
    GENDER = (
        ('male', 'male'),
        ('female', 'female')
    )
    address=models.CharField(max_length=100)
    phone_regex = RegexValidator(regex=r'^\+255?\d{9}$',
                                 message="Phone number must be entered in the format: '+255******'. Up to 9 character is allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=15)
    service_provider=models.ForeignKey(ServiceProviders,on_delete=models.CASCADE,blank=True,null=True)
    service=models.ForeignKey(Services,on_delete=models.CASCADE,related_name="customer_service",blank=True,null=True)
    age=models.IntegerField(default=0)
    sex=models.CharField(choices=GENDER,null=True,blank=True,max_length=50)
    event_date=models.CharField(max_length=80,null=True)
    place=models.CharField(max_length=100,blank=True)
    start_time=models.CharField(max_length=50,null=True,blank=True)
    bank=models.CharField(max_length=100,null=True)
    end_time=models.CharField(max_length=50,null=True,blank=True)
    has_payed=models.BooleanField(default=False)
    def __str__(self):
        return self.first_name
    class Meta:
        verbose_name_plural="customers"


