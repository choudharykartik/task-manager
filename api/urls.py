from django.contrib import admin
from django.urls import path,include
from .views import *

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views


router = DefaultRouter()
router.register(r'tasks',TaskList,basename='tasks')
router.register('auth',UserViewSet,basename='auth')
urlpatterns = [
    path('login', views.obtain_auth_token),
    path('', home,name='home'),
    path('', include(router.urls)),
]