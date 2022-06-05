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


class TaskList(viewsets.ViewSet):
    

    def list(self,request):
        queryset = Task.objects.all()
        serializer = TaskSerializer(queryset,many=True)
        return Response(serializer.data)

    def create(self,request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self,request,pk=None):
        queryset = Task.objects.get_object_or_404(pk=pky)
        task = get_object_or_404(queryset,pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data,status=status.HTTP_200_OK)


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
