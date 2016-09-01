from django.shortcuts import render
from .models import users

# Create your views here.
def index(request):
    model = users()
    location = model.getLocation()
    lat = location.get('location').get('lat')
    lng = location.get('location').get('lng')
    return render(request, 'Appointments/index.html', {'lat' : lat, 'lng' : lng})
