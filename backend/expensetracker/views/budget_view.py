from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import MonthlyBudget
from ..serializers import MonthlyBudgetSerializer


@api_view(['GET'])
def getBudgetByMonthAndYear(request):
    month = request.GET.get('month')
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    budget = MonthlyBudget.objects.filter(
        month=month, year=year, userId=userId)
    serializer = MonthlyBudgetSerializer(budget, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addBudget(request):
    budget = MonthlyBudget.objects.create(
        userId=request.data.get('userId'),
        month=request.data.get('month'),
        year=request.data.get('year'),
        category=request.data.get('category'),
        budget=request.data.get('budget'),
        note=request.data.get('note')
    )
    serializer = MonthlyBudgetSerializer(budget, many=False)
    return Response(serializer.data)
