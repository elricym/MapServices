from __future__ import unicode_literals
from django.db import models
from django.http import StreamingHttpResponse
from ConstParams import ConstParams
import requests
import json

# Create your models here.

class users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length = 200)
    latitude = models.FloatField()
    longtitude = models.FloatField()

    def __str__(self):
        return self.username

    def getLocation(self):
        url = ConstParams.GeolocationURL + "?key=" + ConstParams.GoogleApiKey
        locationRequest = {}
        locationRespose = requests.post(url, data=locationRequest)
        responseContent = json.loads(locationRespose.content)
        return responseContent

    def updateLocation(self, userId, lat, lng):
        user = users.objects.get(id = userId)
        user.latitude  = lat
        user.longtitude = lng
        user.save()

class events(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length = 200)
    lat = models.FloatField()
    lng = models.FloatField()
