from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
    path('', home,name='home'),
    path('task/', TaskList.as_view(),name='task'),
    path('task/<id>', TaskDetail.as_view(),name='task_detail'),
]
