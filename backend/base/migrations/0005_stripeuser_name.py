# Generated by Django 3.1.6 on 2021-04-06 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_auto_20210405_2117'),
    ]

    operations = [
        migrations.AddField(
            model_name='stripeuser',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]