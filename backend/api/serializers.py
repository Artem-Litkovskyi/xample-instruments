from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import *


User = get_user_model()


def _get_image_url(obj, request, image_field_name):
    image = getattr(obj, image_field_name)
    if image and request:
        return 'http://0.0.0.0:8000' + image.url  # Quick fix
        # return request.build_absolute_uri(image.url)
    return None


class HomePageSerializer(serializers.ModelSerializer):
    hero_image_url = serializers.SerializerMethodField()
    category_instruments_image_url = serializers.SerializerMethodField()
    category_effects_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = (
            'hero_title', 'hero_subtitle', 'hero_link', 'hero_image_url',
            'category_instruments_image_url', 'category_effects_image_url',
        )

    def get_hero_image_url(self, obj):
        return _get_image_url(obj, self.context.get('request'), 'hero_image')

    def get_category_instruments_image_url(self, obj):
        return _get_image_url(obj, self.context.get('request'), 'category_instruments_image')

    def get_category_effects_image_url(self, obj):
        return _get_image_url(obj, self.context.get('request'), 'category_effects_image')


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate(self, data):
        # Create a mock user to pass into validate_password
        user = User(
            email=data.get('email'),
            username=data.get('username')
        )

        try:
            validate_password(data['password'], user=user)
        except ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})

        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AccountUpdateSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'old_password', 'new_password']

    def validate(self, data):
        # Get the existing user
        user = self.context['request'].user

        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password or new_password:
            if not old_password or not new_password:
                raise serializers.ValidationError('Both old and new password are required.')

            if not user.check_password(old_password):
                raise serializers.ValidationError({'old_password': 'Current password is incorrect.'})

            try:
                validate_password(new_password, user=user)
            except ValidationError as e:
                raise serializers.ValidationError({'new_password': e.messages})

        return data

    def update(self, instance, validated_data):
        validated_data.pop('old_password', None)
        new_password = validated_data.pop('new_password', None)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        if new_password:
            instance.set_password(new_password)

        instance.save()

        return instance


class ProductUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'subtitle', 'category', 'description', 'sys_req', 'price', 'file', 'file_demo', 'screenshot']


class LicenseSerializer(serializers.ModelSerializer):
    license_id = serializers.IntegerField(source='id')
    product_id = serializers.IntegerField(source='product.id')
    product_title = serializers.CharField(source='product.title')

    class Meta:
        model = License
        fields = ['license_id', 'product_id', 'product_title']


class OrderSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='id')
    product_title = serializers.CharField(source='product.title')
    created_at = serializers.DateTimeField()
    price = serializers.IntegerField()

    class Meta:
        model = License
        fields = ['order_id', 'product_title', 'created_at', 'price']