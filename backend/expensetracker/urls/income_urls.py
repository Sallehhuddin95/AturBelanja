from django.urls import path
# from expensetracker.views import expense_views as views
from ..views import income_views as views


urlpatterns = [
    path('', views.getIncomeByMonthAndYear, name='income-month-year'),
    path('year/', views.getIncomesByYear, name='income-year'),
    path('add/', views.addIncome, name='income-add'),
    path('update/<str:pk>/', views.updateIncome, name='income-update'),
    path('delete/<str:pk>/', views.deleteIncome, name='income-delete'),

]
