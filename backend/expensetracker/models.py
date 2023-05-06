from django.db import models

# Create your models here.

# very class represent table in database
# every attribute represent column in table
# every object represent row in table

class DailyExpense(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    detail = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    note = models.TextField()
    payment = models.CharField(max_length=100)

    def __str__(self):
        return self.detail[0:50]
