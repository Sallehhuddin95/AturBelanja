from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import F, Sum
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import MonthlyBudget
from ..serializers import MonthlyBudgetSerializer, MonthlyBudgetSerializerWithTotalBudget


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBudgetByMonthAndYear(request):
    month = request.GET.get('month')
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    budget = MonthlyBudget.objects.filter(
        month=month, year=year, userId=userId)
    serializer = MonthlyBudgetSerializer(budget, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTotalBudgets(request):
    userId = request.GET.get('userId')
    budgets = MonthlyBudget.objects.filter(userId=userId)
    serializer = MonthlyBudgetSerializerWithTotalBudget(budgets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBudgetByYear(request):
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    budgets = MonthlyBudget.objects.filter(year=year, userId=userId)

    # Create a dictionary to store the unique budgets for each month
    unique_budgets = {}

    for budget in budgets:
        # Create a unique identifier for each month
        month_key = f"{budget.month}-{budget.year}"

        if month_key not in unique_budgets:
            # Add the budget to the dictionary if it's the first one for the month
            unique_budgets[month_key] = budget

    # Retrieve the unique budgets from the dictionary
    unique_budgets = list(unique_budgets.values())

    serializer = MonthlyBudgetSerializerWithTotalBudget(
        unique_budgets, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBudget(request, pk):
    budget = MonthlyBudget.objects.get(id=pk)
    serializer = MonthlyBudgetSerializer(instance=budget, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBudget(request, pk):
    budget = MonthlyBudget.objects.get(id=pk)
    budget.delete()
    return Response('Budget item deleted')
