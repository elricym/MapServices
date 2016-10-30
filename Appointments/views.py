from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import users, events, user_event
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json

# Create your views here.
def index(request):
    print request.GET
    location = users().getLocation()
    lat = location.get('location').get('lat')
    lng = location.get('location').get('lng')
    return render(request, 'Appointments/index.html', {'lat' : lat, 'lng' : lng})

def updateLocation(request):
    users().updateLocation(request.GET.get('userid'), request.GET.get('lat'), request.GET.get('lng'))
    return HttpResponse(request.GET.get('q'))

def newEventRequest(request):
    events().newEventRequest(request.GET.get('userid'), request.GET.get('eventname'), request.GET.get('eventdatetime'), request.GET.get('lat'), request.GET.get('lng'))
    return HttpResponse(request.GET.get('q'))

def getAllEvents(request):
    eventIdList = user_event().getEventsIdsByUserId(request.GET.get('userid'))
    eventList = events().getEventsByEventIds(eventIdList)
    return JsonResponse(eventList, safe=False)

def login(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    response = users().login(username, password)
    return HttpResponse(response)

def register(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    response = users().register(username, password)
    return HttpResponse(response)
