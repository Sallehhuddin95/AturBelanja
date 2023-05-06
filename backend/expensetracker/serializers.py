from rest_framework.serializers import ModelSerializer
from .models import DailyExpense

class DailyExpenseSerializer(ModelSerializer):
    class Meta:
        model = DailyExpense
        fields = '__all__'