
from django.contrib import admin
from django.urls import path, include
from .views import OANDA_Request_View, send_OANDA_request, get_data

app_name = 'api'

urlpatterns = [
    #path('', OANDA_Request_View.as_view()),
    #path('form', provide_oanda_request),
    #path('succesful_form', succesful_form_view),
    path('rest_api_form', OANDA_Request_View.as_view()),
    path('post_api_form', OANDA_Request_View.as_view()),
    path('get_data_start_point<str:id>', send_OANDA_request, name= "send_Oanda_Request"),
    path('fetch_params/<str:id>/', get_data, name ='fetch_params')
]
