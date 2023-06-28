from django.db import models

# Create your models here.

# very class represent table in database
# every attribute represent column in table
# every object represent row in table


class DailyExpense(models.Model):

    # declare userId give user if a default value of 1
    userId = models.IntegerField(default=0)
    date = models.DateField()
    detail = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    note = models.TextField()
    price = models.FloatField()
    payment = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.detail[0:50]


class DailyIncome(models.Model):
    userId = models.IntegerField(default=0)
    date = models.DateField()
    amount = models.FloatField()
    category = models.CharField(max_length=100)
    payment = models.CharField(max_length=100)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.note[0:50]


class MonthlyBudget(models.Model):
    userId = models.IntegerField(default=0)
    month = models.IntegerField()
    year = models.IntegerField()
    budget = models.FloatField()
    category = models.CharField(default='', max_length=100)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category[0:50]
