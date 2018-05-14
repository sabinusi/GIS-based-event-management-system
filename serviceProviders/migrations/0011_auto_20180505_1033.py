# Generated by Django 2.0.4 on 2018-05-05 07:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('serviceProviders', '0010_auto_20180505_1029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagecomments',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceProviders.Images'),
        ),
        migrations.AlterField(
            model_name='services',
            name='name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Sname', to='serviceProviders.ServiceName'),
        ),
        migrations.AlterField(
            model_name='videocomments',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceProviders.Videos'),
        ),
    ]