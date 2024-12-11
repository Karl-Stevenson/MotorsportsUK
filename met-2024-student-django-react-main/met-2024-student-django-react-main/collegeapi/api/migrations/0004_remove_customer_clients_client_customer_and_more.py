# Generated by Django 5.1.4 on 2024-12-11 12:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_customer_sales_representatives_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='clients',
        ),
        migrations.AddField(
            model_name='client',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.customer'),
        ),
        migrations.AlterField(
            model_name='location',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.customer'),
        ),
    ]
