from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import DailyExpense
from ..serializers import DailyExpenseSerializer

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
    print(f"Year: {year}")
    print(f"Month: {month}")
    dailyExpense = DailyExpense.objects.filter(
        date__month=month, date__year=year)
    print(month, year)
    serializer = DailyExpenseSerializer(dailyExpense, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addExpense(request):
    print(request.data.get('price'))
    expense = DailyExpense.objects.create(
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
    expense.date = data['date']
    expense.detail = data['detail']
    expense.category = data['category']
    expense.note = data['note']
    expense.price = data['price']
    expense.payment = data['payment']
    expense.save()
    serializer = DailyExpenseSerializer(expense, many=False)
    return Response(serializer.data)
