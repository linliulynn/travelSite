# Generated by Django 2.0.1 on 2018-02-14 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travelapp', '0002_auto_20180213_1412'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journey',
            name='journey_img',
            field=models.TextField(),
        ),
    ]
