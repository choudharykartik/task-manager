from django.contrib import admin

# Register your models here.
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display= ('id','name','description','priority','create_date','due_date','modified_date')
    list_filter = ('priority','create_date')
    search_fields = ('name','description')
    