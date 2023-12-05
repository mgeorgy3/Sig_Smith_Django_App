from django.shortcuts import render, loader
from api.models import OANDA_Request_Paramaters
# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .models import CustomUserCreationForm
from django.urls import reverse

from api.routing import websocket_urlpatterns


def main(request):
    print("AT LEAST I AM HERE")
    
    template = loader.get_template("frontend/index.html")

    return HttpResponse(template.render(request = request))

def charts(request):
    template = loader.get_template("frontend/charts.html")

    return HttpResponse(template.render(request = request))


def display_data_list(request):

    data_list = OANDA_Request_Paramaters.objects.all()
    #print(data_list)
    return render(request, 'frontend/data_request.html', {'data_list': data_list})

def view_data(request, *args, **kwargs):

    template = loader.get_template("frontend/view_charts.html")
    
    print(kwargs['id'])

    data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])

    
    
    return render(request,"frontend/view_charts.html", {'data_base_request_params': data_chunk})



def create_user(request):

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return render(request, 'frontend/charts.html')  # Replace 'home' with the name of your home view or URL
    else:
        form = CustomUserCreationForm()

    return render(request, 'users/login_form.html', {'form': form})


def live_data(request, *args, **kwargs):

    template = loader.get_template("frontend/view_charts.html")
    
    print(kwargs['id'])

    data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])

    
    
    return render(request,"frontend/view_charts.html", {'data_base_request_params': data_chunk})


def training_data(request, *args, **kwargs):

    template = loader.get_template("frontend/Training_Data.html")
    
    if request.method == 'GET':
        return render(request,"frontend/Training_Data.html")
    if request.method == 'POST':
        print(kwargs['id'])
        data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])
        return redirect(reverse('training-data_POST', {'data_base_request_params': data_chunk} ))
        #return render(request,"frontend/Training_Data.html", {'data_base_request_params': data_chunk})

def get_live_data(request, *args, **kwargs):
    
    #data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])
    print("I AM IN FRONTEND VIEWS")

    print(websocket_urlpatterns[0])
    return render(request,"frontend/stream.html")
    
    
    
    
