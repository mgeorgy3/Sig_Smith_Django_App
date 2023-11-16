from django.shortcuts import render, loader
from api.models import OANDA_Request_Paramaters
# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

def main(request):
    print("AT LEAST I AM HERE")
    
    template = loader.get_template("frontend/index.html")
    ## can add content which can bbe accessed in te html by using the DTL markup llanguage like you can say "if some contex do this"  this can be used to make sure that users are authorized

    return HttpResponse(template.render(request = request))

def charts(request):
    template = loader.get_template("frontend/charts.html")
    ## can add content which can bbe accessed in te html by using the DTL markup llanguage like you can say "if some contex do this"  this can be used to make sure that users are authorized

    return HttpResponse(template.render(request = request))

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def display_data_list(request):

    data_list = OANDA_Request_Paramaters.objects.all()
    #print(data_list)
    return render(request, 'frontend/data_request.html', {'data_list': data_list})

def view_data(request, *args, **kwargs):

    template = loader.get_template("frontend/view_charts.html")
    
    print(kwargs['id'])

    data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])
    
    return render(request,"frontend/view_charts.html", kwargs)

