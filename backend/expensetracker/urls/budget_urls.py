from django.urls import path
from ..views import budget_view as views

urlpatterns = [
    path('', views.getBudgetByMonthAndYear, name='budget-month-year'),
    path('add/', views.addBudget, name='budget-add'),
    path('update/<str:pk>/', views.updateBudget, name='budget-update'),
]
