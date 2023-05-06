from django.urls import path
from . import views

urlpatterns = [
    path('expense-records', views.getDailyExpense, name='index'),
]