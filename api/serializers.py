from rest_framework import serializers
from .models import OANDA_Request_Paramaters



class OANDA_Requests_Serializer(serializers.ModelSerializer):
    class Meta:
        model = OANDA_Request_Paramaters
        fields = '__all__'

    FX_Pair = serializers.ChoiceField(choices=OANDA_Request_Paramaters.FX_List)
    Granularity = serializers.ChoiceField(choices=OANDA_Request_Paramaters.G_Choices_reversed)
