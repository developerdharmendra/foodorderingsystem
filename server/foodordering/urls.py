from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('user/<int:user_id>/', get_user_profile, name="get-user"),
    path('update-user/<int:user_id>/', update_user_profile, name="update-user"),
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
    path('update-cart-quantity/', update_cart_quantity, name='update-cart-quantity'),
    path('delete-cart-item/<int:id>/', delete_cart_item, name='delete-cart-item'),
    path('place-order/', place_order, name='place-order'),
    path('orders/<int:user_id>/', user_orders, name='user_orders'),
    path('orders/by-order-number/<str:order_number>', order_by_order_number, name='by-order-number'),
    path('orders/address/<str:order_number>', order_address, name='order_address'),
    path('invoice/<str:order_number>', get_invoice, name='get_invoice'),
]
