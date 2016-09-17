from django.shortcuts import render
from .models import users, events, user_event
from django.http import HttpResponse

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
    events().newEventRequest(request.GET.get('userid'), request.GET.get('eventname'), request.GET.get('lat'), request.GET.get('lng'))
    return HttpResponse(request.GET.get('q'))

def getAllEvents(request):
    eventIdList = user_event().getEventsIdsByUserId(request.GET.get('userid'))
    eventList = events().getEventsByEventIds(eventIdList)
    return HttpResponse(eventList)
