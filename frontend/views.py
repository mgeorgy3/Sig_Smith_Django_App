from django.shortcuts import render, loader
from api.models import OANDA_Request_Paramaters
# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .models import CustomUserCreationForm


def main(request):
    print("AT LEAST I AM HERE")
    
    template = loader.get_template("frontend/index.html")
    ## can add content which can bbe accessed in te html by using the DTL markup llanguage like you can say "if some contex do this"  this can be used to make sure that users are authorized

    return HttpResponse(template.render(request = request))

def charts(request):
    template = loader.get_template("frontend/charts.html")
    ## can add content which can bbe accessed in te html by using the DTL markup llanguage like you can say "if some contex do this"  this can be used to make sure that users are authorized

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

