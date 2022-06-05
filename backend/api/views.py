from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view,APIView 
from rest_framework import generics,mixins



# Create your views here.
def home(request):
    return HttpResponse('Welcome to my Task App')


class TaskList(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)


class TaskDetail(generics.GenericAPIView,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'
    def get(self,request,id):
        return self.retrieve(request,id)
    def put(self,request,id):
        return self.update(request,id)
    def delete(self,request,id):
        return self.destroy(request,id)
