from __future__ import unicode_literals
from django.db import models
from django.http import StreamingHttpResponse
from django.utils import timezone
from ConstParams import ConstParams
from django.core import serializers
import requests
import json
import datetime

salt = "mingsapp"

# Create your models here.

# Users model
class users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length = 200)
    password = models.CharField(max_length = 200)
    lat = models.FloatField()
    lng = models.FloatField()
    create_time = models.DateTimeField(auto_now=True)
    #token = models.CharField(max_length = 1000)

    def __str__(self):
        return self.username

    # Get current location via geolocation API.
    def getLocation(self):
        url = ConstParams.GeolocationURL + "?key=" + ConstParams.GoogleApiKey
        locationRequest = {}
        locationRespose = requests.post(url, data=locationRequest)
        responseContent = json.loads(locationRespose.content)
        return responseContent

    # Update location data on database.
    def updateLocation(self, userId, lat, lng):
        user = users.objects.get(id = userId)
        user.lat = lat
        user.lng = lng
        user.save();

    # Login user using username and password. If success, return token. If not, return 0.
    def login(self, username, password):
        user = users.objects.filter(username = username)

        if (len(user) == 0 or user[0].password!= password):
            return 0
        elif(password == user[0].password):
            return user[0].username
        

    def register(self, username, password):
        user_check = users.objects.filter(username = username)
        if(len(user_check) == 0):
            user = users(username = username, password = password)
            user.save()
            return user.username
        else:
            return 0

    def getUserByUsername(self, username):
        user = users.objects.get(username = username)
        if(user == null):
            return False
        else:
            return True


class events(models.Model):
    id = models.IntegerField(primary_key=True)
    event_name = models.CharField(max_length = 200)
    lat = models.FloatField()
    lng = models.FloatField()
    create_time = models.DateTimeField(auto_now=True)
    event_datetime = models.DateTimeField(default=timezone.now, blank=True)

    #TODO: format datetime into mysql timestamp
    def newEventRequest(self, userId, event_name, event_datetime, lat, lng):
        event = events(event_name = event_name, event_datetime = event_datetime, lat = lat, lng = lng)
        event.save()

    def getEventsByEventIds(self, eventIds):
        eventList = events.objects.filter(id__in=eventIds)
        return serializers.serialize("json", eventList)

class user_event(models.Model):
    id = models.IntegerField(primary_key=True)
    event_id = models.IntegerField()
    user_id = models.IntegerField()

    def getEventsIdsByUserId(self, userId):
        user_events = user_event.objects.filter(user_id = userId)
        eventIdList = []
        for e in user_events:
            eventIdList.append(e.id)
        return eventIdList
