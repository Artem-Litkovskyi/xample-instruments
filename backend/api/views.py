import os

from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie

from .serializers import *
from .models import *


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
    serializer = SignUpSerializer(data=request.data)
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def my_licenses_view(request):
    licenses = License.objects.filter(user=request.user)
    serializer = LicenseSerializer(licenses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def my_orders_view(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# --- PRODUCTS ---
@api_view(['GET'])
def products_view(request, category=None):
    if category:
        category = category.upper()
        if category not in dict(Product.Category.choices):
            return Response(
                {'error': 'Invalid category'},
                status=status.HTTP_400_BAD_REQUEST
            )
        products = Product.objects.filter(category=category)
    else:
        products = Product.objects.all()

    data = [
        {
            'id': product.id,
            'title': product.title,
            'subtitle': product.subtitle,
            'price': product.price,
            'screenshot': 'http://0.0.0.0:8000' + product.screenshot.url,  # Quick fix
            # 'screenshot': request.build_absolute_uri(product.screenshot.url),
        }
        for product in products
    ]

    return Response(data)


@api_view(['GET'])
def product_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)
    audio_demos = AudioDemo.objects.filter(product=product_id)
    screenshot_areas = ScreenshotArea.objects.filter(product=product_id)

    data = {
        'title': product.title,
        'subtitle': product.subtitle,
        'description': product.description,
        'sys_req': product.sys_req,
        'price': product.price,
        'file': 'http://0.0.0.0:8000' + product.file.url,  # Quick fix
        'file_demo': 'http://0.0.0.0:8000' + product.file_demo.url,  # Quick fix
        'screenshot': 'http://0.0.0.0:8000' + product.screenshot.url,  # Quick fix
        'audio_demos': [
            {
                'title': i.title,
                'file': 'http://0.0.0.0:8000' + i.file.url,  # Quick fix
            }
            for i in audio_demos
        ],
        'screenshot_areas': [
            {
                'title': i.title,
                'description': i.description,
                'x': i.x,
                'y': i.y,
                'width': i.width,
                'height': i.height,
            }
            for i in screenshot_areas
        ]
    }

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def buy_view(request, product_id=None):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    if License.objects.filter(user=request.user, product=product).exists():
        return Response({'detail': 'User already owns a license for this product'}, status=status.HTTP_200_OK)

    new_license = License.objects.create(user=request.user, product=product)
    new_order = Order.objects.create(user=request.user, product=product, price=product.price)

    return Response({
        'detail': 'License and order created successfully',
        'license_id': new_license.id,
        'order_id': new_order.id,
        'price': product.price,
        'created_at': new_order.created_at
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def download_product_demo_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)

    try:
        file_path = product.file_demo.path
        file_name = os.path.split(file_path)[1]
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=file_name)
    except FileNotFoundError:
        return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def download_product_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)

    try:
        License.objects.get(user=request.user, product=product)
    except Product.DoesNotExist:
        return Response({'detail': 'User doesn\'t own a license for this product'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        file_path = product.file.path
        file_name = os.path.split(file_path)[1]
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=file_name)
    except FileNotFoundError:
        return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
