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


class MonthlyExpenseSerializerWithTotalExpense(serializers.ModelSerializer):
    total_value = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    month = serializers.SerializerMethodField(read_only=True)
    year = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DailyExpense
        fields = ('id', 'month', 'year', 'total_value',
                  'created_at', 'updated_at')

    # Get month from the date field
    def get_month(self, obj):
        return obj.date.month

    # Get year from the date field
    def get_year(self, obj):
        return obj.date.year

    # Get total expense for a given month and year
    def get_total_value(self, obj):
        total_value = DailyExpense.objects.filter(date__month=obj.date.month, date__year=obj.date.year).aggregate(
            total_value=Sum('price')).get('total_value')
        return total_value

    # Get created date. Created date is the date when the first expense is created for a given month and year
    def get_created_at(self, obj):
        created_at = DailyExpense.objects.filter(
            date__month=obj.date.month, date__year=obj.date.year).order_by('created_at').first().created_at
        return created_at

    # Get updated date. Updated date is the date when the last expense is updated for a given month and year
    def get_updated_at(self, obj):
        updated_at = DailyExpense.objects.filter(
            date__month=obj.date.month, date__year=obj.date.year).order_by('updated_at').last().updated_at
        return updated_at


class MonthlyIncomeSerializerWithTotalIncome(serializers.ModelSerializer):
    total_value = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    month = serializers.SerializerMethodField(read_only=True)
    year = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DailyIncome
        fields = ('id', 'month', 'year', 'total_value',
                  'created_at', 'updated_at')

    # Get month from the date field
    def get_month(self, obj):
        return obj.date.month

    # Get year from the date field
    def get_year(self, obj):
        return obj.date.year

    # Get total expense for a given month and year
    def get_total_value(self, obj):
        total_value = DailyIncome.objects.filter(date__month=obj.date.month, date__year=obj.date.year).aggregate(
            total_value=Sum('amount')).get('total_value')
        return total_value

    # Get created date. Created date is the date when the first expense is created for a given month and year
    def get_created_at(self, obj):
        created_at = DailyIncome.objects.filter(
            date__month=obj.date.month, date__year=obj.date.year).order_by('created_at').first().created_at
        return created_at

    # Get updated date. Updated date is the date when the last expense is updated for a given month and year
    def get_updated_at(self, obj):
        updated_at = DailyIncome.objects.filter(
            date__month=obj.date.month, date__year=obj.date.year).order_by('updated_at').last().updated_at
        return updated_at


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
    total_value = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MonthlyBudget
        fields = ('id', 'month', 'year', 'total_value',
                  'created_at', 'updated_at')

    # get total budget for a given month and year
    def get_total_value(self, obj):
        total_value = MonthlyBudget.objects.filter(month=obj.month, year=obj.year).aggregate(
            total_value=Sum('budget')).get('total_value')
        return total_value

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
