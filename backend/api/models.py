from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=1000,null=True,blank=True)
    priority = models.IntegerField(default=5,null=True,blank=True)
    due_date = models.DateTimeField(blank=True,null=True)
    create_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)