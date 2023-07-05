from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from ..models import DailyIncome
from ..serializers import DailyIncomeSerializer, MonthlyIncomeSerializerWithTotalIncome


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def updateIncome(request, pk):
    try:
        income = DailyIncome.objects.get(id=pk)
        print('Original Data:', request.data)
        serializer = DailyIncomeSerializer(instance=income, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print('Updated Data:', serializer.data)
        return Response(serializer.data)
    except DailyIncome.DoesNotExist:
        return Response({'error': 'Income not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print('Error:', e)
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteIncome(request, pk):
    income = DailyIncome.objects.get(id=pk)
    income.delete()
    return Response('Income Deleted')
