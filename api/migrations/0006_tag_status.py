# Generated by Django 4.0.5 on 2022-09-18 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_tag_tagtaskmapping'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='status',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
