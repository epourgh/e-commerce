# Generated by Django 3.1.6 on 2021-04-06 02:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_stripeuser_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stripeuser',
            name='name',
        ),
    ]
