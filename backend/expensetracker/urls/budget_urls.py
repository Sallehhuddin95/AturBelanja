from django.urls import path
from ..views import budget_view as views

urlpatterns = [
    path('', views.getBudgetByMonthAndYear, name='budget-month-year'),
    path('all/', views.getTotalBudgets, name='budget-all'),
    path('year/', views.getBudgetByYear, name='budget-year'),
    path('add/', views.addBudget, name='budget-add'),
    path('update/<str:pk>/', views.updateBudget, name='budget-update'),
    path('delete/<str:pk>/', views.deleteBudget, name='budget-delete'),

]
