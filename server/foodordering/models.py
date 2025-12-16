from django.db import models

# Create your models here.
class RegisterUser(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    address = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    reg_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name
    
class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category_name
    
class Food(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_description = models.TextField(max_length=500)
    item_image = models.ImageField(upload_to='food_images/')
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return self.item_name

class Order(models.Model):
    user = models.ForeignKey(RegisterUser, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_order_placed = models.BooleanField(default=False)
    order_number = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return f"Order {self.order_number} by {self.user}"
    