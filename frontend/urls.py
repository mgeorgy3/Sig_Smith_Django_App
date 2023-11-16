
from django.urls import path, include
from .views import main, charts, index, display_data_list, view_data

app_name = "frontend"

urlpatterns = [
    path('', main),
    path('charts', charts, name="charts"),
    path('test_react', index),
    path('display_data_list', display_data_list),
    path('view_data/<str:id>/', view_data, name = "view_data"),
]
