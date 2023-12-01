from django.shortcuts import render, loader
from django.shortcuts import get_object_or_404, redirect

# Create your views here.
from rest_framework import generics
from .models import OANDA_Request_Paramaters, OANDA_Form
from django.forms import modelformset_factory
from.serializers import OANDA_Requests_Serializer
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.response import Response
import logging


from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_data(request, *args, **kwargs):
    print("WE GOT HERE")
    try:
        # Fetch a specific item from the database based on its ID
        data = OANDA_Request_Paramaters.objects.get(id=kwargs['id'])
        serializer = OANDA_Requests_Serializer(data)
        return Response(serializer.data)
    except OANDA_Request_Paramaters.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


@api_view(['GET'])
def get_data_list(request, *args, **kwargs):
    print("WE GOT HERE")
    try:
        # Fetch a specific item from the database based on its ID
        data = OANDA_Request_Paramaters.objects.all()
        serializer = OANDA_Requests_Serializer(data, many=True)

        # Return the serialized data as a response
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




"""

    def FX_DF(self, *, make_file = False):

        params = {}

        params.update("granularity")
        params.update("from", self.Start_Date)



        path = "/v3/instruments/{}/candles".format(self.FX_Pair)

        url = "{}{}".format(self._base_url, path)

        res = requests.get(url, headers=self._headers, params=params)

        data = []
        index_in = []
        for r in res.json()["candles"]:
            data.append(
                [
                    
                    float(r["mid"]["o"]),
                    float(r["mid"]["h"]),
                    float(r["mid"]["l"]),
                    float(r["mid"]["c"]),
                    float(r["volume"])

                ]        
                )
                    #index_in.append(pd.to_datetime(r["time"]))
            index_in.append(pd.Timestamp(r["time"]))
        self.df = pd.DataFrame(data, columns=["Open", "High", "Low", "Close", "Volume"], index= index_in)        
        
        if make_file:
            file_From = str(self.From_).replace(":", ".")
            file_To = str(self.to_).replace(":", ".")
            #print(file_From)
            filename = 'TickerDataClass_OUT/' + self.granularity + '_' + self.instrument + '_' + file_From + '_' + file_To + '.csv'
            self.df.to_csv(filename)
        return self.df


"""


class OANDA_Request_View(APIView):
    queryset = OANDA_Request_Paramaters.objects.all()
    serializer_class = OANDA_Requests_Serializer
    
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'api/api_form.html'

    def post(self, request, *args, **kwargs):
        

        oanda_request = OANDA_Request_Paramaters()
        oanda_serializer = OANDA_Requests_Serializer(oanda_request, data=request.data)

        if not oanda_serializer.is_valid():
            return Response(template_name="api/api_form.html", 
                        data={'serializer': oanda_serializer,
                              'oanda_request': oanda_request})
        
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


def api_get_live_data(request, *args, **kwargs):

    template = loader.get_template("frontend/view_charts.html")

    print("Hello")

    

    return render(request, "frontend/view_charts.html")
    


