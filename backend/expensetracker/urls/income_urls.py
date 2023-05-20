from django.urls import path
# from expensetracker.views import expense_views as views
from ..views import income_views as views


urlpatterns = [
    path('', views.getIncomeByMonthAndYear, name='income-month-year'),
]
