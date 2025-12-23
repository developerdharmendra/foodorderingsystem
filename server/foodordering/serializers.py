from rest_framework import serializers
from .models import *


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUser
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'phone', 'address', 'reg_date']


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

class OrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'food', 'quantity']

class MyOrdersListSerializer(serializers.ModelSerializer):
    order_final_status = serializers.SerializerMethodField()

    class Meta:
        model = OrderAddress
        fields = ['order_number', 'order_time', 'order_final_status']
    def get_order_final_status(self,obj):
        return obj.order_final_status or "Waiting for Resturant confirmation"
    
class OrderAddressSerializer(serializers.ModelSerializer):
    payment_mode = serializers.SerializerMethodField()

    class Meta:
        model = OrderAddress
        fields = ['order_number', 'address', 'order_time', 'order_final_status', 'payment_mode']
    def get_payment_mode(self,obj):
        try:
            payment = PaymentDetails.objects.get(order_number=obj.order_number)
            return payment.payment_mode
        except PaymentDetails.DoesNotExist:
            return None
        
class OrderSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model= OrderAddress
        fields = ['id', 'order_number', 'address', 'order_time', 'order_final_status']

class OrderDetailsSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name')
    user_last_name = serializers.CharField(source='user.last_name')
    user_email = serializers.CharField(source='user.email')
    user_mobile = serializers.CharField(source='user.phone')

    class Meta:
        model = OrderAddress
        fields = [
            'order_number',
            'order_time',
            'order_final_status',
            'address',
            'user_first_name',
            'user_last_name',
            'user_email',
            'user_mobile',
        ]

class OrderedFoodSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='food.item_name')
    item_price = serializers.DecimalField(
        source='food.item_price',
        max_digits=10,
        decimal_places=2
    )
    item_image = serializers.ImageField(source='food.item_image')
    quantity = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ['item_name', 'item_price', 'item_image', 'quantity']


class FoodTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTracking
        fields = ['remark', 'status', 'status_date', 'order_cancelled_by_user']

    