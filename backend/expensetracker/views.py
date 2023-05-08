from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DailyExpense
from .serializers import DailyExpenseSerializer

# Create your views here.

@api_view(['GET'])
def getExpenses(request):
    dailyExpense = DailyExpense.objects.all()
    serializer = DailyExpenseSerializer(dailyExpense, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getExpensesByMonthAndYear(request):
    month = request.GET.get('month')
    year = request.GET.get('year')
    dailyExpense = DailyExpense.objects.filter(date__month=month, date__year=year)
    print(month, year)
    serializer = DailyExpenseSerializer(dailyExpense, many=True)
    return Response(serializer.data)