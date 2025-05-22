import json

from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from .serializers import RegisterSerializer, AccountUpdateSerializer


def format_serializer_errors(errors):
    formated = {}

    for field in errors:
        message = ' '.join(errors[field])
        formated[field] = message.capitalize().rstrip('.')

    return formated


# --- AUTHENTICATION ---
@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({
        'isAuthenticated': True,
        'username': request.user.username,
        'email': request.user.email,
    })


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({
        'username': request.user.username,
        'email': request.user.email,
    })


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
        return JsonResponse({'detail': format_serializer_errors(serializer.errors)}, status=400)

    serializer.save()

    return JsonResponse(serializer.data)


# --- ACCOUNT INFO ---
@require_POST
@login_required
def account_update_view(request):
    data = json.loads(request.body)
    serializer = AccountUpdateSerializer(
        instance=request.user,
        data=data,
        context={'request': request},
        partial=True  # Allow partial updates (e.g., just email)
    )

    if not serializer.is_valid():
        return JsonResponse({'detail': format_serializer_errors(serializer.errors)}, status=400)

    serializer.save()

    # Ensure session remains active if password changed
    if 'new_password' in data:
        update_session_auth_hash(request, request.user)
    return JsonResponse({'detail': 'Account updated successfully.'})