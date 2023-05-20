from rest_framework.serializers import ModelSerializer
from .models import DailyExpense, DailyIncome


class DailyExpenseSerializer(ModelSerializer):
    class Meta:
        model = DailyExpense
        fields = '__all__'


class DailyIncomeSerializer(ModelSerializer):
    class Meta:
        model = DailyIncome
        fields = '__all__'
