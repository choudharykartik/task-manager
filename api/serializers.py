from rest_framework import serializers
from .models import Task,Appuser
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields = '__all__'
class ApppuserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appuser
        fields = '__all__'
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def create(self,validated_data):
        user = Appuser.objects.create(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()
        return user