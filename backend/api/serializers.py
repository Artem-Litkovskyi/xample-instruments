from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
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