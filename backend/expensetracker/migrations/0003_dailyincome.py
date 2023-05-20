# Generated by Django 4.0.4 on 2023-05-19 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expensetracker', '0002_rename_amount_dailyexpense_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyIncome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount', models.FloatField()),
                ('category', models.CharField(max_length=100)),
                ('payment', models.CharField(max_length=100)),
                ('note', models.TextField()),
            ],
        ),
    ]