from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie

from .serializers import RegisterSerializer, AccountUpdateSerializer


def format_serializer_errors(errors):
    formated = {}

    for field in errors:
        message = ' '.join(errors[field])
        formated[field] = message.capitalize().rstrip('.')

    return formated


# --- AUTHENTICATION ---
@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return Response({'isAuthenticated': False})
    return Response({
        'isAuthenticated': True,
        'username': request.user.username,
        'email': request.user.email,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'detail': 'Please provide email and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)

    if user is None:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)
    return Response({
        'isAuthenticated': True,
        'username': request.user.username,
        'email': request.user.email,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def logout_view(request):
    logout(request)
    return Response({
        'isAuthenticated': False,
        'detail': 'Successfully logged out'
    })


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def signup_view(request):
    serializer = RegisterSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({'detail': format_serializer_errors(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# --- ACCOUNT INFO ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def account_update_view(request):
    serializer = AccountUpdateSerializer(
        instance=request.user,
        data=request.data,
        context={'request': request},
        partial=True
    )

    if not serializer.is_valid():
        return Response({'detail': format_serializer_errors(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()

    if 'new_password' in request.data:
        update_session_auth_hash(request, request.user)

    return Response({
        'username': request.user.username,
        'email': request.user.email,
        'detail': 'Account updated successfully.'
    })