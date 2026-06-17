"""
Django admin configuration for site content.
Each singleton block (SiteSettings, HeroBlock, etc.) is editable in one place.
Ordered items (Product, HomeService, HomeProject, ServiceItem, ProjectItem) use
inline editing with drag-to-reorder via the `order` field.
"""
from django.contrib import admin

from .models import (
    SiteSettings,
    HeroBlock,
    Product,
    HomeService,
    HomeProject,
    ProviderBlock,
    AboutPage,
    ServiceItem,
    ProjectItem,
)


# ---------- Singleton-style admin (only one row allowed) ----------
class SingletonModelAdmin(admin.ModelAdmin):
    """Prevent adding more than one instance; redirect to the singleton on add."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Phones', {
            'fields': ('phone', 'phone_additional'),
        }),
        ('Emails', {
            'fields': ('email', 'email_office'),
        }),
        ('Footer address (RU / EN)', {
            'fields': ('address_footer_ru', 'address_footer_en'),
        }),
        ('Office address (RU / EN)', {
            'fields': ('address_office_ru', 'address_office_en'),
        }),
        ('Copyright (RU / EN)', {
            'fields': ('copyright_ru', 'copyright_en'),
        }),
        ('External URLs', {
            'fields': ('reference_list_url', 'yandex_map_src'),
        }),
    )


@admin.register(HeroBlock)
class HeroBlockAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Title (RU / EN)', {
            'fields': ('title_ru', 'title_en'),
        }),
        ('Description (RU / EN)', {
            'fields': ('description_ru', 'description_en'),
        }),
        ('CTA button label (RU / EN)', {
            'fields': ('cta_label_ru', 'cta_label_en'),
        }),
    )


@admin.register(ProviderBlock)
class ProviderBlockAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Title (RU / EN)', {
            'fields': ('title_ru', 'title_en'),
        }),
        ('Paragraphs RU (one per line, blank line = new paragraph)', {
            'fields': ('paragraphs_ru',),
        }),
        ('Paragraphs EN', {
            'fields': ('paragraphs_en',),
        }),
    )


@admin.register(AboutPage)
class AboutPageAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Page title (RU / EN)', {
            'fields': ('title_ru', 'title_en'),
        }),
        ('Main text RU (blank line = new paragraph)', {
            'fields': ('text_ru',),
            'classes': ('wide',),
        }),
        ('Main text EN', {
            'fields': ('text_en',),
            'classes': ('wide',),
        }),
        ('Director signature (RU / EN)', {
            'fields': ('signature_ru', 'signature_en'),
        }),
        ('Industries title (RU / EN)', {
            'fields': ('industry_title_ru', 'industry_title_en'),
        }),
        ('Industries list RU (one per line)', {
            'fields': ('industries_ru',),
            'classes': ('wide',),
        }),
        ('Industries list EN', {
            'fields': ('industries_en',),
            'classes': ('wide',),
        }),
        ('"Today" title (RU / EN)', {
            'fields': ('mt_today_title_ru', 'mt_today_title_en'),
        }),
        ('"Today" tiles RU (one per line)', {
            'fields': ('mt_today_tiles_ru',),
            'classes': ('wide',),
        }),
        ('"Today" tiles EN', {
            'fields': ('mt_today_tiles_en',),
            'classes': ('wide',),
        }),
        ('Certificates title (RU / EN)', {
            'fields': ('certs_title_ru', 'certs_title_en'),
        }),
    )


# ---------- Ordered list admin ----------
class OrderedModelAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'order', 'image')
    list_editable = ('order',)
    list_display_links = ('__str__',)
    ordering = ['order']
    search_fields = ('title_ru', 'title_en')


@admin.register(Product)
class ProductAdmin(OrderedModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('title_ru', 'title_en', 'image', 'order'),
        }),
    )


@admin.register(HomeService)
class HomeServiceAdmin(OrderedModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('title_ru', 'title_en', 'image', 'order'),
        }),
    )


@admin.register(HomeProject)
class HomeProjectAdmin(OrderedModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('title_ru', 'title_en', 'text_ru', 'text_en', 'image', 'order'),
        }),
    )


@admin.register(ServiceItem)
class ServiceItemAdmin(OrderedModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('title_ru', 'title_en', 'image', 'order'),
        }),
    )


@admin.register(ProjectItem)
class ProjectItemAdmin(OrderedModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('case_ru', 'case_en', 'case_en_label', 'title_ru', 'title_en', 'image', 'order'),
        }),
    )
