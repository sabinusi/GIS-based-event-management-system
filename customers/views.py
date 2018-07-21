from django.shortcuts import render

from customers.models import Customer
from .customerSerializers import RegistationSerialzier,OrderSerializer
from  . import customerSerializers
from . import models as customer_models
from django.core import serializers
import json
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.http import HttpResponse, JsonResponse
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
def AuthLoginAPIView(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)

    if username is not None and password is not None:
        try:
            print(username, password)
            u = customer_models.Customer.objects.filter(email=username, password=password)
            m = serializers.serialize('json', u)
            ob = json.loads(m)[0]
            print(ob)
            return HttpResponse(ob['pk'], status=HTTP_200_OK)
        except:
            return HttpResponse('failed', status=HTTP_400_BAD_REQUEST)
    else:
        return HttpResponse('pass both username and password', status=HTTP_400_BAD_REQUEST)
class CompleteOrder(generics.UpdateAPIView):
    serializer_class=customerSerializers.UpdateOrderSerializer
    queryset=customer_models.Customer
    lookup_field = "id"
