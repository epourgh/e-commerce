# Generated by Django 3.1.6 on 2021-04-07 21:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_order_trackingnumber'),
    ]

    operations = [
        migrations.CreateModel(
            name='Refund',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requestedAt', models.DateTimeField(auto_now_add=True)),
                ('userComment', models.CharField(blank=True, max_length=200, null=True)),
                ('isReviewed', models.BooleanField(default=False)),
                ('isAccepted', models.BooleanField(default=False)),
                ('storeResponse', models.CharField(blank=True, max_length=200, null=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order')),
                ('stripeUser', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.stripeuser')),
            ],
        ),
    ]
