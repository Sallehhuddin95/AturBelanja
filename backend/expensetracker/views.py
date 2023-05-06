from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DailyExpense
from .serializers import DailyExpenseSerializer

# Create your views here.

@api_view(['GET'])
def getDailyExpense(request):
    dailyExpense = DailyExpense.objects.all()
    serializer = DailyExpenseSerializer(dailyExpense, many=True)
    return Response(serializer.data)