# Generated by Django 4.0.5 on 2022-07-17 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_task_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
