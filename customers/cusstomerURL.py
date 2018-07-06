from django.conf.urls import url
from .views import Registation,Order
urlpatterns = [
    url(r'^registration', Registation.as_view()),
    url(r'^order', Order.as_view()),
]
