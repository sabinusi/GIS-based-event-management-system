# Generated by Django 2.0.2 on 2018-04-30 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serviceProviders', '0006_auto_20180429_1551'),
    ]

    operations = [
        migrations.AddField(
            model_name='serviceproviders',
            name='pic_url',
            field=models.FileField(blank=True, null=True, upload_to='serviceProviderImages/%Y/%m/%d'),
        ),
    ]
