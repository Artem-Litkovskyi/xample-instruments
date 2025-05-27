from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea

from .models import *


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ('email', 'username', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'groups')

    search_fields = ('email', 'username')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price')
    list_filter = ('category',)

    search_fields = ('title', 'subtitle', 'description')
    ordering = ('title',)

    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'subtitle', 'category', 'description', 'sys_req', 'price')
        }),
        ('Files', {
            'fields': ('file', 'file_demo')
        }),
        ('Media', {
            'fields': ('screenshot',)
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['description'].widget = Textarea(attrs={'rows': 10, 'cols': 60})
        form.base_fields['sys_req'].widget = Textarea(attrs={'rows': 5, 'cols': 60})
        return form


@admin.register(ScreenshotArea)
class ScreenshotAreaAdmin(admin.ModelAdmin):
    list_display = ('product', 'title')
    list_filter = ('product',)

    search_fields = ('title', 'description')
    ordering = ('product',)

    fieldsets = (
        ('Basic Info', {
            'fields': ('product', 'title', 'description')
        }),
        ('Position', {
            'fields': ('x', 'y', 'width', 'height')
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['description'].widget = Textarea(attrs={'rows': 10, 'cols': 60})
        return form


@admin.register(AudioDemo)
class AudioDemoAdmin(admin.ModelAdmin):
    list_display = ('product', 'title')
    list_filter = ('product',)

    search_fields = ('title',)
    ordering = ('product',)

    fieldsets = (
        ('Basic Info', {
            'fields': ('product', 'title')
        }),
        ('Files', {
            'fields': ('file',)
        }),
    )


@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'product')
    list_filter = ('product',)

    search_fields = ('user',)
    ordering = ('user',)

    fieldsets = (
        (None, {'fields': ('user', 'product')}),
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'price', 'created_at')
    list_filter = ('product',)

    search_fields = ('user',)
    ordering = ('user',)

    fieldsets = (
        (None, {'fields': ('user', 'product', 'price', 'created_at')}),
    )

    readonly_fields = ['created_at']


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'hero_subtitle')

    fieldsets = (
        ('Hero', {
            'fields': ('hero_title', 'hero_subtitle', 'hero_link', 'hero_image')
        }),
        ('Categories', {
            'fields': ('category_instruments_image', 'category_effects_image')
        }),
    )
