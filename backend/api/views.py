import os

from django.http import FileResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
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


# --- HOME PAGE ---
@api_view(['GET'])
@permission_classes([AllowAny])
def home_page_view(request):
    home_page = get_object_or_404(HomePage)
    serializer = HomePageGetSerializer(home_page, context={'request': request})
    return Response(serializer.data)


# --- AUTHENTICATION ---
@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
@ensure_csrf_cookie
def session_view(request):
    csrf_token = get_token(request)

    if not request.user.is_authenticated:
        return Response({
            'isAuthenticated': False,
            'csrfToken': csrf_token
        })

    serializer = UserGetSerializer(request.user)
    return Response({
        'isAuthenticated': True,
        'isAdmin': request.user.is_staff,
        'csrfToken': csrf_token,
        **serializer.data
    })


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if not email or not password:
        return Response('Please provide email and password', status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)
    if user is None:
        return Response('Invalid credentials', status=status.HTTP_400_BAD_REQUEST)

    login(request, user)
    
    serializer = UserGetSerializer(request.user)
    return Response({
        'isAuthenticated': True,
        'isAdmin': request.user.is_staff,
        **serializer.data,
    })


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
def logout_view(request):
    logout(request)
    return Response({'isAuthenticated': False})


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def signup_view(request):
    serializer = UserCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(format_serializer_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# --- ACCOUNT ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def account_update_view(request):
    serializer = UserUpdateSerializer(
        instance=request.user,
        data=request.data,
        context={'request': request},
        partial=True
    )

    if not serializer.is_valid():
        return Response(format_serializer_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    serializer.save()

    if 'new_password' in request.data:
        update_session_auth_hash(request, request.user)

    serializer = UserGetSerializer(request.user)
    return Response(serializer.data)


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
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def products_view(request, category=None):
    # Apply category filter
    if category:
        category = category.upper()
        if category not in dict(Product.Category.choices):
            return Response('Invalid category', status=status.HTTP_400_BAD_REQUEST)
        products = Product.objects.filter(category=category)
    else:
        products = Product.objects.all()

    # Get info about purchased products
    purchased_products_ids = []
    if request.user.is_authenticated:
        purchased_products_ids.extend(map(lambda l: l.product.id, License.objects.filter(user=request.user)))

    serializer = ProductGetShortSerializer(products, context={'request': request}, many=True)
    data = [
        {
            **product,
            'purchased': product['id'] in purchased_products_ids
        }
        for product in serializer.data
    ]

    return Response(data)


@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([SessionAuthentication])
def product_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)
    audio_demos = AudioDemo.objects.filter(product=product_id)
    screenshot_areas = ScreenshotArea.objects.filter(product=product_id)

    purchased = False
    if request.user.is_authenticated:
        purchased = len(License.objects.filter(user=request.user, product=product)) > 0

    data = {
        'title': product.title,
        'subtitle': product.subtitle,
        'category': product.category,
        'description': product.description,
        'sys_req': product.sys_req,
        'price': product.price,
        'purchased': purchased,
        'file_url': product.file.url,
        'file_demo_url': product.file_demo.url,
        'screenshot_url': product.screenshot.url,
        'audio_demos': [
            {
                'title': i.title,
                'file_url': i.file.url,
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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
@authentication_classes([SessionAuthentication])
def delete_product_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    return Response('Product deleted successfully', status=status.HTTP_200_OK)


# --- SHOP ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def buy_product_view(request, product_id=None):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response('Product not found', status=status.HTTP_404_NOT_FOUND)

    if License.objects.filter(user=request.user, product=product).exists():
        return Response('User already owns a license for this product', status=status.HTTP_200_OK)

    new_license = License.objects.create(user=request.user, product=product)
    new_order = Order.objects.create(user=request.user, product=product, price=product.price)

    return Response({
        'license_id': new_license.id,
        'order_id': new_order.id,
        'price': product.price,
        'created_at': new_order.created_at
    }, status=status.HTTP_201_CREATED)


# --- DOWNLOADS ---
@api_view(['GET'])
def download_product_demo_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)

    try:
        file_path = product.file_demo.path
        file_name = os.path.split(file_path)[1]
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=file_name)
    except FileNotFoundError:
        return Response('File not found', status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def download_product_full_view(request, product_id=None):
    product = get_object_or_404(Product, id=product_id)

    try:
        License.objects.get(user=request.user, product=product)
    except Product.DoesNotExist:
        return Response('User doesn\'t own a license for this product', status=status.HTTP_400_BAD_REQUEST)

    try:
        file_path = product.file.path
        file_name = os.path.split(file_path)[1]
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=file_name)
    except FileNotFoundError:
        return Response('File not found', status=status.HTTP_404_NOT_FOUND)


# --- MANAGEMENT ---
@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser])
def update_home_page_view(request):
    home_page = HomePage.objects.first()

    if home_page:
        serializer = HomePageUpdateSerializer(home_page, data=request.data, partial=True)
    else:
        serializer = HomePageUpdateSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(format_serializer_errors(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK if home_page else status.HTTP_201_CREATED)
