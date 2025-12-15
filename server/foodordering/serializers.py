from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'creation_date']

class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only=True)
    item_image = serializers.ImageField(use_url=True,required=False)
    is_available = serializers.BooleanField(default=True, required=False)
    class Meta:
        model = Food
        fields = ['id', 'category', 'category_name', 'item_name', 'item_price', 'item_description', 'item_image', 'item_quantity', 'is_available']   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'address', 'password', 'reg_date']