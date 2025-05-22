from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150)
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [email, username]

    objects = CustomUserManager()

    def __str__(self):
        return 'CustomUser (email=%s, username=%s)' % (self.email, self.username)


class Product(models.Model):
    title = models.CharField(max_length=150, unique=True)
    subtitle = models.CharField(max_length=150)
    description = models.CharField(max_length=1000)
    sys_req = models.CharField(max_length=500)
    price = models.PositiveIntegerField()
    file = models.FileField(upload_to='products/full/')
    file_demo = models.FileField(upload_to='products/demo/')
    screenshot = models.ImageField(upload_to='products/screenshots/')

    REQUIRED_FIELDS = [title, subtitle, description, sys_req, price, file, file_demo, screenshot]

    def __str__(self):
        return 'Product (title=%s, price=%s)' % (self.title, self.price)
