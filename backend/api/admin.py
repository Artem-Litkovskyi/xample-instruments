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
