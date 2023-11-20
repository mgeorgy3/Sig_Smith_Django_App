
from django.urls import path, include
from .views import main, charts, display_data_list, view_data, create_user

app_name = "frontend"

urlpatterns = [
    path('', main),
    path('charts', charts, name="charts"),
    path('display_data_list', display_data_list),
    path('view_data/<str:id>/', view_data, name = "view_data"),
    path('users', create_user, name='create_user'),
]
