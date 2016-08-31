from django.shortcuts import render
from .models import LocationModel

# Create your views here.
def index(request):
    model = LocationModel()
    location = model.getLocationByID()
    lat = location.get('location').get('lat')
    lng = location.get('location').get('lng')
    return render(request, 'Appointments/index.html', {'lat' : lat, 'lng' : lng})
