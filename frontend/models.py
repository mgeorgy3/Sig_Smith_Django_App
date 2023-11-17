
from django.db import models
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from django.contrib.auth.models import User
from django_cryptography.fields import encrypt

class User_Extension(User):
    #user = models.OneToOneField(User, on_delete=models.CASCADE)
    #USERNAME_FIELD = models.CharField(max_length=50)
    OANDA_API_KEY = encrypt(models.CharField(max_length=100))
    OANDA_TOKEN = encrypt(models.CharField(max_length=100))


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User_Extension
        fields = ["username", "email", "OANDA_API_KEY", "OANDA_TOKEN", "password1", "password2"]
