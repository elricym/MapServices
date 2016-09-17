from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^user/event/$', views.getAllEvents, name="user/event"),
    url(r'^user/event/new/$', views.newEventRequest, name='user/event/new'),
    url(r'^user/location/$', views.updateLocation, name='user/location'),
]
