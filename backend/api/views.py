from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view,APIView 
from rest_framework import generics,mixins,viewsets
from django.shortcuts import get_object_or_404



# Create your views here.
def home(request):
    return HttpResponse('Welcome to my Task App')


class TaskList(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer 
    

    