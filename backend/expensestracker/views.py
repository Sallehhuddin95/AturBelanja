from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DailyExpense
from .serializers import ExpenseSerializer

# Create your views here.
@api_view(['GET'])
def getDailyExpense(request):
    expenses = DailyExpense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)
