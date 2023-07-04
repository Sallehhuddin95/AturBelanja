from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from ..models import DailyIncome
from ..serializers import DailyIncomeSerializer, MonthlyIncomeSerializerWithTotalIncome


@api_view(['GET'])
def getIncomeByMonthAndYear(request):
    month = request.GET.get('month')
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    dailyIncome = DailyIncome.objects.filter(
        date__month=month, date__year=year, userId=userId)
    serializer = DailyIncomeSerializer(dailyIncome, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getIncomesByYear(request):
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    incomes = DailyIncome.objects.filter(userId=userId)

    # Create a dictionary to store the unique incomes for each month
    unique_incomes = {}

    for income in incomes:
        # Create a unique identifier for each month
        month_key = f"{income.date.month}-{income.date.year}"

        if income.date.year == int(year):
            if month_key not in unique_incomes:
                # Add the income to the dictionary if it's the first one for the month
                unique_incomes[month_key] = income

    # Retrieve the unique incomes from the dictionary
    unique_incomes = list(unique_incomes.values())

    serializer = MonthlyIncomeSerializerWithTotalIncome(
        unique_incomes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addIncome(request):
    income = DailyIncome.objects.create(
        userId=request.data.get('userId'),
        date=request.data.get('date'),
        category=request.data.get('category'),
        note=request.data.get('note'),
        amount=request.data.get('amount'),
        payment=request.data.get('payment')
    )
    serializer = DailyIncomeSerializer(income, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateIncome(request, pk):
    data = request.data
    income = DailyIncome.objects.get(id=pk)
    # income.userId = 1
    income.date = data['date']
    income.category = data['category']
    income.note = data['note']
    income.amount = data['amount']
    income.payment = data['payment']
    income.save()
    return Response('Income Updated')


@api_view(['DELETE'])
def deleteIncome(request, pk):
    income = DailyIncome.objects.get(id=pk)
    income.delete()
    return Response('Income Deleted')
