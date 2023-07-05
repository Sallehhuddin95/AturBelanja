from django.shortcuts import render
from rest_framework.response import Response
from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import DailyExpense
from ..serializers import DailyExpenseSerializer, MonthlyExpenseSerializerWithTotalExpense

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
    userId = request.GET.get('userId')
    dailyExpense = DailyExpense.objects.filter(
        date__month=month, date__year=year, userId=userId)
    serializer = DailyExpenseSerializer(dailyExpense, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getExpenseByYear(request):
    year = request.GET.get('year')
    userId = request.GET.get('userId')
    expenses = DailyExpense.objects.filter(userId=userId)

    # Create a dictionary to store the unique expenses for each month
    unique_expenses = {}

    for expense in expenses:
        # Extract the year and month from the date object
        year_month = f"{expense.date.year}-{expense.date.month}"

        if expense.date.year == int(year):
            if year_month not in unique_expenses:
                # Add the expense to the dictionary if it's the first one for the month
                unique_expenses[year_month] = expense

    # Retrieve the unique expenses from the dictionary
    unique_expenses = list(unique_expenses.values())

    serializer = MonthlyExpenseSerializerWithTotalExpense(
        unique_expenses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addExpense(request):
    print(request.data.get('price'))
    expense = DailyExpense.objects.create(
        userId=request.data.get('userId'),
        date=request.data.get('date'),
        detail=request.data.get('detail'),
        category=request.data.get('category'),
        note=request.data.get('note'),
        price=request.data.get('price'),
        payment=request.data.get('payment')
    )

    serializer = DailyExpenseSerializer(expense, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteExpense(request, pk):
    expense = DailyExpense.objects.get(id=pk)
    expense.delete()
    return Response('Expense Deleted')


@api_view(['PUT'])
def updateExpense(request, pk):
    data = request.data
    expense = DailyExpense.objects.get(id=pk)
    # expense.userId = 1
    expense.date = data['date']
    expense.detail = data['detail']
    expense.category = data['category']
    expense.note = data['note']
    expense.price = data['price']
    expense.payment = data['payment']
    expense.save()
    serializer = DailyExpenseSerializer(expense, many=False)
    return Response(serializer.data)
