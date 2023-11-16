from django.db import models
# Create your models here.
from django.forms import ModelForm
from django.forms.widgets import SelectDateWidget, Select
from django import forms

    #Granularity_Choices = ["S5", "S10", "S15", "S30", "M1", "M2", "M4", "M5", 
        # "M10", "M15", "M30", "H1", "H2","H3","H4","H6","H8","H12","D","W","M"]

        #labels_choices = ['5 second', '10 second', '15 second', '30 second', '1 minute', '2 minute', '4 minute', '5 minute', '10 minute', '15 
        # minute', '30 minute', '1 hour', '2 hour', '3 hour', '4 hour', '6 hour', '8 hour', '12 hour', '1 day', '1 week', '1 month']


def generate_years_list(start_year, end_year):
    years_list = []
    for year in range(start_year, end_year + 1):
        years_list.append(year)
    return years_list





class OANDA_Request_Paramaters(models.Model):
    FX_List = [('GBP_SGD', 'GBP_SGD'), ('USD_SEK', 'USD_SEK'), ('EUR_DKK', 'EUR_DKK'), 
           ('CAD_CHF', 'CAD_CHF'), ('USD_CZK', 'USD_CZK'), ('USD_ZAR', 'USD_ZAR'), 
           ('USD_DKK', 'USD_DKK'), ('GBP_USD', 'GBP_USD'), ('USD_MXN', 'USD_MXN'),
           ('USD_HUF', 'USD_HUF'), ('EUR_CAD', 'EUR_CAD'), ('EUR_USD', 'EUR_USD'), 
           ('CAD_JPY', 'CAD_JPY'), ('NZD_HKD', 'NZD_HKD'), ('USD_HKD', 'USD_HKD'), 
           ('AUD_JPY', 'AUD_JPY'), ('ZAR_JPY', 'ZAR_JPY'), ('GBP_ZAR', 'GBP_ZAR'), 
           ('SGD_JPY', 'SGD_JPY'), ('USD_JPY', 'USD_JPY'), ('EUR_TRY', 'EUR_TRY'), 
           ('EUR_JPY', 'EUR_JPY'), ('AUD_SGD', 'AUD_SGD'), ('EUR_NZD', 'EUR_NZD'), 
           ('GBP_HKD', 'GBP_HKD'), ('CHF_JPY', 'CHF_JPY'), ('EUR_HKD', 'EUR_HKD'), 
           ('GBP_CAD', 'GBP_CAD'), ('USD_THB', 'USD_THB'), ('GBP_CHF', 'GBP_CHF'), 
           ('AUD_CHF', 'AUD_CHF'), ('NZD_CHF', 'NZD_CHF'), ('AUD_HKD', 'AUD_HKD'), 
           ('USD_CHF', 'USD_CHF'), ('CAD_HKD', 'CAD_HKD'), ('AUD_CAD', 'AUD_CAD'), 
           ('GBP_PLN', 'GBP_PLN'), ('EUR_PLN', 'EUR_PLN'), ('GBP_NZD', 'GBP_NZD'), 
           ('EUR_HUF', 'EUR_HUF'), ('EUR_NOK', 'EUR_NOK'), ('CHF_HKD', 'CHF_HKD'), 
           ('EUR_GBP', 'EUR_GBP'), ('AUD_NZD', 'AUD_NZD'), ('CAD_SGD', 'CAD_SGD'), 
           ('EUR_CZK', 'EUR_CZK'), ('NZD_JPY', 'NZD_JPY'), ('USD_TRY', 'USD_TRY'), 
           ('GBP_JPY', 'GBP_JPY'), ('SGD_CHF', 'SGD_CHF'), ('USD_CNH', 'USD_CNH'), 
           ('USD_NOK', 'USD_NOK'), ('NZD_SGD', 'NZD_SGD'), ('NZD_USD', 'NZD_USD'), 
           ('USD_CAD', 'USD_CAD'), ('AUD_USD', 'AUD_USD'), ('CHF_ZAR', 'CHF_ZAR'), ('HKD_JPY', 'HKD_JPY'), ('EUR_SEK', 'EUR_SEK'),
            ('USD_SGD', 'USD_SGD'), ('TRY_JPY', 'TRY_JPY'), ('NZD_CAD', 'NZD_CAD'), 
            ('EUR_SGD', 'EUR_SGD'), ('EUR_AUD', 'EUR_AUD'), ('GBP_AUD', 'GBP_AUD'), 
            ('USD_PLN', 'USD_PLN'), ('EUR_CHF', 'EUR_CHF'), ('EUR_ZAR', 'EUR_ZAR')]
    
    G_choices = [('5 second', 'S5'), ('10 second', 'S10'), ('15 second', 'S15'), ('30 second', 'S30'), ('1 minute', 'M1'), ('2 minute', 'M2'), 
                 ('4 minute', 'M4'), ('5 minute', 'M5'), ('10 minute', 'M10'), ('15 minute', 'M15'), ('30 minute', 'M30'), ('1 hour', 'H1'), ('2 hour', 'H2'), ('3 hour', 'H3'), ('4 hour', 'H4'), ('6 hour', 'H6'), ('8 hour', 'H8'), ('12 hour', 'H12'), ('1 day', 'D'), ('1 week', 'W'), ('1 month', 'M')]
    
    G_Choices_reversed = [('S5', '5 second'), ('S10', '10 second'), ('S15', '15 second'), ('S30', '30 second'), ('M1', '1 minute'), ('M2', '2 minute'), ('M4', '4 minute'), ('M5', '5 minute'), ('M10', '10 minute'), ('M15', '15 minute'), ('M30', '30 minute'), ('H1', '1 hour'), ('H2', '2 hour'), ('H3', '3 hour'), ('H4', '4 hour'), ('H6', '6 hour'), ('H8', '8 hour'), ('H12', '12 hour'), ('D', '1 day'), ('W', '1 week'), ('M', '1 month')]



    FX_Pair = models.CharField(default= "USD_CAD", max_length=7, choices=FX_List)
    Granularity = models.CharField(default= 'M2', max_length=9, choices=G_Choices_reversed)
    Start_Date = models.DateTimeField()
    End_Date = models.DateTimeField(auto_now_add=False)



class OANDA_Form(ModelForm):
    class Meta:
        model = OANDA_Request_Paramaters
        fields = "__all__"
    
