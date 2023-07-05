from django.contrib import admin

from .models import DailyExpense, DailyIncome, MonthlyBudget

# Register your models here.
admin.site.register(DailyExpense)
admin.site.register(DailyIncome)
admin.site.register(MonthlyBudget)
