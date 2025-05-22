from django.urls import path

from . import views


urlpatterns = [
    path('session/', views.session_view, name='api_session'),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('signup/', views.signup_view, name='api_signup'),
    path('account_update/', views.account_update_view, name='api_account_update'),
]