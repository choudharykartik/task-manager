from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import TaskSerializer,ApppuserSerializer
from .models import Appuser, Task
from rest_framework.decorators import api_view,APIView 
from rest_framework import generics,mixins,viewsets
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated,AllowAny


# Create your views here.
def home(request):
    return HttpResponse('Welcome to my Task App')


class TaskList(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer 
    permission_classes =[IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = Appuser.objects.all()
    serializer_class = ApppuserSerializer 
    permission_classes =[AllowAny]
    

    