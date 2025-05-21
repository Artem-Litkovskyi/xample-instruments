import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from .serializers import RegisterSerializer


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({
        'isAuthenticated': True,
        'username': request.user.username
    })


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'username': request.user.username})


@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({'detail': 'Please provide email and password'}, status=400)

    user = authenticate(username=email, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials'}, status=400)

    login(request, user)
    return JsonResponse({'username': request.user.username})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You are not logged in'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out'})


@require_POST
def signup_view(request):
    data = json.loads(request.body)
    serializer = RegisterSerializer(data=data)

    if not serializer.is_valid():
        detail = {}

        for field in serializer.errors:
            message = ' '.join(serializer.errors[field])
            detail[field] = message.capitalize().rstrip('.')

        return JsonResponse({'detail': detail}, status=400)

    serializer.save()

    return JsonResponse(serializer.data)