from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"api/live-end-point/$", consumers.Live_OANDA_DATA.as_asgi()),
    #re_path(r"api/live-end-point/(?P<data_id>\w+)$", consumers.Live_OANDA_DATA.as_asgi())
]