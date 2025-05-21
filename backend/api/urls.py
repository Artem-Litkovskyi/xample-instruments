from django.urls import path

from . import views


urlpatterns = [
    path('session/', views.session_view, name='api_session'),
    path('whoami/', views.whoami_view, name='api_whoami'),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('signup/', views.signup_view, name='api_signup'),
]