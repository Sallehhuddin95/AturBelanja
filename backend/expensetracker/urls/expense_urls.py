from django.urls import path
# from expensetracker.views import expense_views as views
from ..views import expense_views as views

urlpatterns = [
    # path('', views.getExpenses, name='expense-records'),
    path('', views.getExpensesByMonthAndYear, name='expense-month-year'),
    path('add/', views.addExpense, name='expense-add'),
    path('delete/<str:pk>/', views.deleteExpense, name='expense-delete'),
]
