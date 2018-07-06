from django.db import models

# Create your models here.
from customers.models import Customer
from serviceProviders.models import ServiceProviders
from serviceProviders.models import Services


class Payments(models.Model):
    token_id=models.CharField(max_length=200,primary_key=True)
    price=models.IntegerField()
    returned_names=models.CharField(max_length=200)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    service_provider=models.ForeignKey(ServiceProviders,related_name="payment_to_service_provider",on_delete=models.CASCADE,null=True,blank=True)
    service=models.ForeignKey(Services,related_name="payment_to_service",on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
        return self.returned_names
    class Meta:
        verbose_name_plural='Payments'
