from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^user/event/$', views.newEventRequest, name='user/event'),
    url(r'^user/location/$', views.updateLocation, name='user/location'),
]
