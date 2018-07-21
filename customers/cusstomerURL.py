from django.conf.urls import url
from .views import Registation,Order
from . import views as customer_views
urlpatterns = [
    url(r'^registration', Registation.as_view()),
    url(r'^order', Order.as_view()),
    url(r'^login', customer_views.AuthLoginAPIView),
    url(r'^compliteOrder/(?P<id>[\w-]+)', customer_views.CompleteOrder.as_view())
]
