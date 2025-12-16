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