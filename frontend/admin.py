# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User_Extension

admin.site.register(User_Extension)


