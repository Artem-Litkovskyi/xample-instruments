from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

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