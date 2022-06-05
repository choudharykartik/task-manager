from django.contrib import admin
from django.urls import path,include
from .views import *

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tasks',TaskList,basename='tasks')
urlpatterns = [
    path('', home,name='home'),
    path('', include(router.urls)),
]
