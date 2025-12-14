from django.urls import path
from .views import *

urlpatterns = [
    path('admin-login/', admin_login_api, name='admin-login'),
    path('add-category/', add_category, name='add-category'),
    path('get-categories/', get_categories, name='get-categories'),
    path('add-food/', add_food, name='add-food'),
    path('get-foods/', get_foods, name='get-foods'),
    
]
