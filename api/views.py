from django.shortcuts import render, loader
from django.shortcuts import get_object_or_404, redirect

# Create your views here.
from rest_framework import generics, status
from .models import OANDA_Request_Paramaters, OANDA_Form
from django.forms import modelformset_factory
from.serializers import OANDA_Requests_Serializer
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from django.http import HttpResponse, HttpResponseRedirect, HttpRequest
from rest_framework.response import Response
import logging
from .consumers import Live_OANDA_DATA

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

@api_view(['GET'])
def get_data(request, *args, **kwargs):
    print("Fetching a specific parameter request from the database")
    try:
        # Fetch a specific item from the database based on its ID
        data = OANDA_Request_Paramaters.objects.get(id=kwargs['id'])
        serializer = OANDA_Requests_Serializer(data)
        return Response(serializer.data)
    except OANDA_Request_Paramaters.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


@api_view(['GET'])
def get_data_list(request, *args, **kwargs):
    print("Fetching the Data List from the Database")
    try:
        # Fetch a specific item from the database based on its ID
        data = OANDA_Request_Paramaters.objects.all()
        serializer = OANDA_Requests_Serializer(data, many=True)

        # Return the serialized data as a response
        #print(Response(serializer.data))
        return Response(serializer.data)
        
    except OANDA_Request_Paramaters.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

def provide_oanda_request(request):
 
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # create a form instance and populate it with data from the request:
        form = OANDA_Form(request.POST)
        # check whether it's valid:
        if form.is_valid():
            oanda_request = form.save(commit=False)
            

            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            print("IT IS VALID")

            oanda_request.save()

            return HttpResponseRedirect("succesful_form")
        
        
        #if a GET (or any other method) we'll create a blank form
    else:
        print("IT IS NOT VALID")
        form = OANDA_Form()

    return render(request, "api/forms.html", {"form": form})

@method_decorator(csrf_protect, name='dispatch')
class OANDA_Request_View(APIView):
    queryset = OANDA_Request_Paramaters.objects.all()
    serializer_class = OANDA_Requests_Serializer
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'api/api_form.html'

    
    def post(self, request, *args, **kwargs):
        print("HELLO FROM POST")

        oanda_request = OANDA_Request_Paramaters()
        oanda_serializer = OANDA_Requests_Serializer(oanda_request, data=request.data)

        if not oanda_serializer.is_valid():
            print("OF")
            return Response("The Parameters are invalid", status=status.HTTP_400_BAD_REQUEST)
        """
        Response(template_name="api/api_form.html", 
                        data={'serializer': oanda_serializer, 
                              'oanda_request': oanda_request})
        """
        oanda_serializer.save()

        #template = loader.get_template("api/api_form.html")
        
        return render(request, 'api/succesful_entry.html', {'serializer': oanda_serializer})
    
    def get(self, request, *args, **kwargs):

        print("IN GET")
        oanda_request = OANDA_Request_Paramaters()
        oanda_serializer = OANDA_Requests_Serializer(oanda_request)

        return Response(template_name="api/api_form.html", 
                        data={'serializer': oanda_serializer, 
                              'oanda_request': oanda_request})



def send_OANDA_request(request, *args, **kwargs):
    template = loader.get_template("frontend/view_charts.html")
    
    print(kwargs['id'])

    data_chunk = get_object_or_404(OANDA_Request_Paramaters, id = kwargs['id'])
    
    return render(request,"frontend/view_charts.html", kwargs)


# def api_get_live_data(request, *args, **kwargs):

#     #template = loader.get_template("frontend/view_charts.html")
#     my_consumer = Live_OANDA_DATA()
#     my_consumer.connect()


#     return render(request, "api/socket.html")
def get_current_user_info(request, *args, **kwargs):

    current_user = get_user_model()

    print(current_user.objects)



    return HttpResponse(content="200")
    

