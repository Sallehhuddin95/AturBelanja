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
