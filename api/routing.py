from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"api/live-end-point/$", consumers.ChatConsumer.as_asgi()),
]