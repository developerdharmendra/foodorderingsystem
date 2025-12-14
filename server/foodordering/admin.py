from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'address', 'password', 'reg_date')
admin.site.register(User, UserAdmin)

admin.site.register(Category)
admin.site.register(Food)
