from __future__ import unicode_literals
from django.db import models
from django.http import StreamingHttpResponse
from django.utils import timezone
from ConstParams import ConstParams
import requests
import json

# Create your models here.

# Users model
class users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length = 200)
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
        return self.username

    # Get current location via Geolocation API.
    def getLocation(self):
        url = ConstParams.GeolocationURL + "?key=" + ConstParams.GoogleApiKey
        locationRequest = {}
        locationRespose = requests.post(url, data=locationRequest)
        responseContent = json.loads(locationRespose.content)
        return responseContent

    # Update location data on database.
    def updateLocation(self, userId, lat, lng):
        user = users.objects.get(id = userId)
        user.lat  = lat
        user.lng = lng
        user.save()

class events(models.Model):
    id = models.IntegerField(primary_key=True)
    eventname = models.CharField(max_length = 200)
    lat = models.FloatField()
    lng = models.FloatField()
    create_time = models.DateTimeField(default=timezone.now, blank=True)

    def newEventRequest(self, userId, eventname, lat, lng):
        event = events(eventname = eventname, lat = lat, lng = lng)
        event.save()

class user_event(models.Model):
    id = models.IntegerField(primary_key=True)
    event_id = models.IntegerField()
    user_id = models.IntegerField()

    def getEventsByUserId(self, userId):
        events = user_event.objects.filter(user_id = userId)
        return events
