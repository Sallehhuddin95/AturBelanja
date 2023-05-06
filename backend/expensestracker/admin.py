from django.contrib import admin

# Register your models here.
from .models import DailyExpense
# add table to admin panel in db
admin.site.register(DailyExpense)