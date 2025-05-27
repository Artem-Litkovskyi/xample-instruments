from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
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
        return self.email


class Product(models.Model):

    class Category(models.TextChoices):
        INSTRUMENT = 'INSTRUMENT', _('Instrument')
        EFFECT = 'EFFECT', _('Effect')

    title = models.CharField(max_length=150, unique=True)
    subtitle = models.CharField(max_length=150)
    category = models.CharField(choices=Category.choices)
    description = models.CharField(max_length=1000)
    sys_req = models.CharField(max_length=500)
    price = models.PositiveIntegerField()
    file = models.FileField(upload_to='products/full/')
    file_demo = models.FileField(upload_to='products/demo/')
    screenshot = models.ImageField(upload_to='products/screenshots/')

    def __str__(self):
        return self.title


class ScreenshotArea(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=1000)
    x = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    y = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    width = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    height = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return '%s: %s (screenshot area)' % (self.product, self.title)


class AudioDemo(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=1000)
    file = models.FileField(upload_to='products/audio/')

    def __str__(self):
        return '%s: %s (audio demo)' % (self.product, self.title)


class License(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return '%s has a license for %s' % (self.user, self.product)


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s bought %s for %s cents at %s' % (self.user, self.product, self.price, self.created_at)


class HomePage(models.Model):
    hero_title = models.CharField(max_length=150)
    hero_subtitle = models.CharField(max_length=150)
    hero_link = models.CharField(max_length=150)
    hero_image = models.ImageField(upload_to='home/')

    category_instruments_image = models.ImageField(upload_to='home/')
    category_effects_image = models.ImageField(upload_to='home/')

    def __str__(self):
        return self.hero_title