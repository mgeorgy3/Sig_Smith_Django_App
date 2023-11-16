
from django.contrib import admin
from django.urls import path, include
from .views import OANDA_Request_View


urlpatterns = [
    #path('', OANDA_Request_View.as_view()),
    #path('form', provide_oanda_request),
    #path('succesful_form', succesful_form_view),
    path('rest_api_form', OANDA_Request_View.as_view()),
    path('post_api_form', OANDA_Request_View.as_view()),
]
