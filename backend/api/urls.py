from django.urls import path

from . import views


urlpatterns = [
    path('home_page/', views.home_page_view, name='api_home_page'),

    path('session/', views.session_view, name='api_session'),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('signup/', views.signup_view, name='api_signup'),

    path('update_account/', views.account_update_view, name='api_update_account'),
    path('my_licenses/', views.my_licenses_view, name='api_my_licenses'),
    path('my_orders/', views.my_orders_view, name='api_my_orders'),

    path('products/', views.products_view, name='api_products'),
    path('products/<str:category>/', views.products_view, name='api_products_by_category'),
    path('product/<int:product_id>/', views.product_view, name='api_product'),

    path('buy_product/<int:product_id>/', views.buy_product_view, name='api_buy_product'),

    path('download_product_demo/<int:product_id>/', views.download_product_demo_view, name='api_download_product_demo'),
    path('download_product_full/<int:product_id>/', views.download_product_full_view, name='api_download_product_full'),

    path('update_home_page/', views.update_home_page_view, name='api_update_home_page'),
    path('delete_product/<int:product_id>/', views.delete_product_view, name='api_delete_product'),
]