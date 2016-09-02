from django.shortcuts import render
from .models import users
from django.http import HttpResponse

# Create your views here.
def index(request):
    print request.GET
    model = users()
    location = model.getLocation()
    lat = location.get('location').get('lat')
    lng = location.get('location').get('lng')
    return render(request, 'Appointments/index.html', {'lat' : lat, 'lng' : lng})


def test(request):
    users().updateLocation(request.GET.get('userid'), request.GET.get('lat'), request.GET.get('lng'))
    return HttpResponse(request.GET.get('q'))
