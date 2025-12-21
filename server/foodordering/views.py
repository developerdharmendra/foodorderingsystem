from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import *
import random
from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from xhtml2pdf import pisa

# Create your views here.
@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        return Response({'message': 'Login successful', "username": username }, status=status.HTTP_200_OK)
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def add_category(request):
    category_name = request.data.get('category_name')
    if Category.objects.filter(category_name=category_name).exists():
        return Response({'message': 'Category already exists'}, status=status.HTTP_400_BAD_REQUEST)
    Category.objects.create(category_name=category_name)
    return Response({'message': 'Category added successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_food(request):
    try:
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Food item added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_foods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def orders_not_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def orders_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status='Order Confirmed').order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def food_being_prepared(request):
    orders = OrderAddress.objects.filter(order_final_status='Food being prepared').order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def food_pickup(request):
    orders = OrderAddress.objects.filter(order_final_status='Food Pickup').order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def food_delivered(request):
    orders = OrderAddress.objects.filter(order_final_status='Food Delivered').order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def order_cancelled(request):
    orders = OrderAddress.objects.filter(order_final_status='Order Cancelled').order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def all_orders(request):
    orders = OrderAddress.objects.all().order_by('-order_time')
    serializer = OrderSummarySerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# frontend 
@api_view(['GET'])
def food_search(request):
    query = request.GET.get('q', '')
    foods = Food.objects.filter(item_name__icontains=query)
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def random_foods(request):
    foods = list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    serializer = FoodSerializer(limited_foods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def food_details(request,id):
    try:
        food = get_object_or_404(Food, id=id)
        serializer = FoodSerializer(food)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Food.DoesNotExist:
        return Response({'message': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def register_user(request):
    try:
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        phone = request.data.get('phone')
        address = request.data.get('address')
        password = request.data.get('password')
        if RegisterUser.objects.filter(email=email).exists() or RegisterUser.objects.filter(phone=phone).exists():
            return Response({'message': 'User email or phone already exists'}, status=status.HTTP_400_BAD_REQUEST)
        RegisterUser.objects.create(first_name=first_name, last_name=last_name, email=email, phone=phone, address=address, password=make_password(password))
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    emailcont = request.data.get('emailcont')
    password = request.data.get('password')
    try:
        user = RegisterUser.objects.get(Q(email=emailcont) | Q(phone=emailcont))
        if check_password(password, user.password):
            return Response({'message': 'Login successful' , "userId": user.id , "userName": f"{user.first_name} {user.last_name}" }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except RegisterUser.DoesNotExist:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def get_user_profile(request, user_id):
    try:
        user = RegisterUser.objects.get(id=user_id)
        serializer = RegisterUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except RegisterUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_user_profile(request, user_id):
    try:
        user = RegisterUser.objects.get(id=user_id)
        
        serializer = RegisterUserSerializer(user, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except RegisterUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def change_user_password(request, user_id):
    try:
        currentPassword = request.data.get('currentPassword')
        newPassword = request.data.get('newPassword')
        user = RegisterUser.objects.get(id=user_id)
        if not check_password(currentPassword, user.password):
            return Response({'message': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(newPassword)
        user.save()
        return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def add_to_cart(request):
    try:
        userId = request.data.get('userId')
        food_id = request.data.get('food_id')

        user = RegisterUser.objects.get(id=userId)
        food = Food.objects.get(id=food_id)
       
        order, created = Order.objects.get_or_create(
            user=user,
            food=food,
            is_order_placed=False,
            defaults={'quantity': 1}
        )
        if not created:
            order.quantity += 1
            order.save()
        return Response({'message': 'Item added to cart successfully'}, status=status.HTTP_201_CREATED)
    except RegisterUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Food.DoesNotExist:
        return Response({'message': 'Food item not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_cart_items(request,user_id):
    try:
        orders= Order.objects.filter(user_id=user_id, is_order_placed=False).select_related('food')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def update_cart_quantity(request):
    orderId = request.data.get('orderId')
    quantity = request.data.get('quantity') 
    try:
        order = Order.objects.get(id=orderId, is_order_placed=False)
        order.quantity = quantity
        order.save()
        return Response({'message': 'Cart quantity updated successfully'}, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_cart_item(requset, id):
    try:
        order = Order.objects.get(id=id, is_order_placed=False)
        order.delete()
        return Response({'message': 'Item deleted successfully'}, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
def make_unique_order_number():
    while True:
        order_number = str(random.randint(100000000, 999999999))
        if not Order.objects.filter(order_number=order_number).exists():
            return order_number

@api_view(['POST'])
def place_order(request):
    userId = request.data.get('userId')
    address = request.data.get('address')
    paymentMode = request.data.get('paymentMode')
    cardNumber = request.data.get('cardNumber')
    expiryDate = request.data.get('expiryDate')
    cvv = request.data.get('cvvv')

    try:
        order = Order.objects.filter(user_id = userId, is_order_placed=False)
        order_number = make_unique_order_number()
        order.update(order_number = order_number, is_order_placed=True)

        OrderAddress.objects.create(
            user_id = userId,
            order_number = order_number,
            address = address,
        )
        PaymentDetails.objects.create(
            user_id = userId,
            order_number = order_number,
            payment_mode = paymentMode,
            card_number =  cardNumber if paymentMode == 'online' else None,
            expiry_date =  expiryDate if paymentMode == 'online' else None,
            cvv =  cvv if paymentMode == 'online' else None,
        )
        return Response({'message': 'Order placed successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_orders(request, user_id):
    orders = OrderAddress.objects.filter(user_id=user_id).order_by('-order_time')
    serializer = MyOrdersListSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def order_by_order_number(request, order_number):
    orders = Order.objects.filter(order_number=order_number, is_order_placed=True).select_related('food')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def order_address(request, order_number):
    order_address = OrderAddress.objects.get(order_number=order_number)
    serializer = OrderAddressSerializer(order_address)
    return Response(serializer.data, status=status.HTTP_200_OK)

def get_invoice(request, order_number):
    orders = (
        Order.objects
        .filter(order_number=order_number, is_order_placed=True)
        .select_related('food')
    )
    
    address = get_object_or_404(OrderAddress, order_number=order_number)
    payment_details = get_object_or_404(PaymentDetails, order_number=order_number)
    user = payment_details.user 

    grand_total = 0
    order_list = []

    for order in orders:
        total_price = order.food.item_price * order.quantity
        grand_total += total_price

        order_list.append({
            'food': order.food,
            'quantity': order.quantity,
            'total_price': total_price,
        })

    context = {
        'order_number': order_number,
        'orders_data': order_list,
        'grand_total': grand_total,
        'address': address,
        'user': user,  
        'payment_mode': payment_details.payment_mode, 
    }

    return render(request, 'invoice.html', context)
