from django.conf import settings
from django.db import models

# Create your models here.
from django.template.backends import django

from customers.models import Customer
from serviceProviders.models import ServiceProviders


class Schedules(models.Model):


    service_provider=models.ForeignKey(ServiceProviders,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    date=models.DateField()
