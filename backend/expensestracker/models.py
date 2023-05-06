from django.db import models

# Create your models here.
# very class represent table in database
# every attribute represent column in table
# every object represent row in table

class DailyExpense(models.Model):
    date = models.DateField()
    detail = models.CharField(max_length=100)
    amount = models.FloatField()
    payment_method = models.CharField(max_length=100)
    note = models.TextField()
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.note[0:50]