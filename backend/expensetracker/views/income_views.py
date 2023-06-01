from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import DailyIncome
from ..serializers import DailyIncomeSerializer


@api_view(['GET'])
def getIncomeByMonthAndYear(request):
    month = request.GET.get('month')
    year = request.GET.get('year')
    dailyIncome = DailyIncome.objects.filter(
        date__month=month, date__year=year)
    serializer = DailyIncomeSerializer(dailyIncome, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addIncome(request):
    income = DailyIncome.objects.create(
        userId=1,
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
    income.userId = 1
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
