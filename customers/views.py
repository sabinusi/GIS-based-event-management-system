from django.shortcuts import render

from customers.models import Customer
from .customerSerializers import RegistationSerialzier,OrderSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
class Registation(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Customer.objects.all()
    serializer_class = RegistationSerialzier
class Order(generics.ListAPIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset = Customer.objects.filter(has_payed=True,service_provider=self.request.query_params.get('id',None))
        return  queryset
    serializer_class = OrderSerializer
