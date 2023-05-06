from django.urls import path
from . import views

urlpatterns = [
    path('dailyexpense/', views.getDailyExpense, name='getDailyExpense'),
]