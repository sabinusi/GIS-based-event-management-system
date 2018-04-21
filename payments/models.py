from django.db import models

# Create your models here.
from customers.models import Customer


class Payments(models.Model):
    token_id=models.CharField(max_length=300,primary_key=True)
    price=models.IntegerField()
    names=models.CharField(max_length=200)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    def __str__(self):
        return self.names
    class Meta:
        verbose_name_plural='Payments'
