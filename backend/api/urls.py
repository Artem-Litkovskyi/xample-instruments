from django.urls import path

from . import views


urlpatterns = [
    path('session/', views.session_view, name='api_session'),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('signup/', views.signup_view, name='api_signup'),
    path('account_update/', views.account_update_view, name='api_account_update'),
    path('my_products/', views.my_products_view, name='api_my_products'),
    path('my_orders/', views.my_orders_view, name='api_my_orders'),
    path('products/', views.products_view, name='api_products'),
    path('products/<str:category>/', views.products_view, name='api_products_by_category'),
    path('product/<int:product_id>/', views.product_view, name='api_product'),
]