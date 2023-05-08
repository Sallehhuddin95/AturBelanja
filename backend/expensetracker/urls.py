from django.urls import path
from . import views

urlpatterns = [
    path('all-expense-records', views.getExpenses, name='expense-records'),
    path('expense-records', views.getExpensesByMonthAndYear, name='expense-month-year'),
]