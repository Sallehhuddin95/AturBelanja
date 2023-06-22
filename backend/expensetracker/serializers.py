from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework_simplejwt.tokens import RefreshToken
from .models import DailyExpense, DailyIncome, MonthlyBudget


# User serializer
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_isAdmin(self, obj):
        isAdmin = obj.is_staff
        return isAdmin

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class DailyExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyExpense
        fields = '__all__'


class DailyIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyIncome
        fields = '__all__'


class MonthlyBudgetSerializer(serializers.ModelSerializer):
    # allow Note to be blank
    note = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = MonthlyBudget
        fields = '__all__'

# get all budget for a given month and year, calculate total budget, get created date, get updated date


class MonthlyBudgetSerializerWithTotalBudget(MonthlyBudgetSerializer):
    total_budget = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MonthlyBudget
        fields = ('id', 'month', 'year', 'total_budget',
                  'created_at', 'updated_at')

    # get total budget for a given month and year
    def get_total_budget(self, obj):
        total_budget = MonthlyBudget.objects.filter(month=obj.month, year=obj.year).aggregate(
            total_budget=Sum('budget')).get('total_budget')
        return total_budget

    # get created date. Created date is the date when the first budget is created for a given month and year
    def get_created_at(self, obj):
        created_at = MonthlyBudget.objects.filter(
            month=obj.month, year=obj.year).order_by('created_at').first().created_at
        return created_at

    # get updated date. Updated date is the date when the last budget is updated for a given month and year
    def get_updated_at(self, obj):
        updated_at = MonthlyBudget.objects.filter(
            month=obj.month, year=obj.year).order_by('updated_at').last().updated_at
        return updated_at
