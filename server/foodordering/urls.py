from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('admin-login/', admin_login_api, name='admin-login'),
    path('add-category/', add_category, name='add-category'),
    path('get-categories/', get_categories, name='get-categories'),
    path('add-food/', add_food, name='add-food'),
    path('get-foods/', get_foods, name='get-foods'),
    path('food-search/', food_search, name="food_search"),
    path('random-foods/', random_foods, name="random-foods"),
    path('food-details/<int:id>/', food_details, name="food-details"),
    path('add-to-cart/', add_to_cart, name='add-to-cart'),
    path('cart/<int:user_id>/', get_cart_items, name='cart'),
]
