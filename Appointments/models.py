from __future__ import unicode_literals
from django.db import models
from django.http import StreamingHttpResponse
from ConstParams import ConstParams
import requests
import json

# Create your models here.

class LocationModel():

    def getLocationByID(self):
        url = ConstParams.GeolocationURL + "?key=" + ConstParams.GoogleApiKey
        locationRequest = {}
        locationRespose = requests.post(url, data=locationRequest)
        responseContent = json.loads(locationRespose.content)
        return responseContent
