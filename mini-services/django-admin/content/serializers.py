"""Serializers for site content API."""
from rest_framework import serializers

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


def split_paragraphs(text):
    """Split a block of text into paragraphs by blank lines."""
    if not text:
        return []
    return [p.strip() for p in text.split('\n\n') if p.strip()]


def split_lines(text):
    """Split a block of text into lines (one item per line)."""
    if not text:
        return []
    return [line.strip() for line in text.split('\n') if line.strip()]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'phone', 'phone_additional', 'email', 'email_office',
            'address_footer_ru', 'address_footer_en',
            'address_office_ru', 'address_office_en',
            'copyright_ru', 'copyright_en',
            'reference_list_url', 'yandex_map_src',
        ]


class HeroBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBlock
        fields = [
            'title_ru', 'title_en',
            'description_ru', 'description_en',
            'cta_label_ru', 'cta_label_en',
        ]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title_ru', 'title_en', 'image', 'order']


class HomeServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeService
        fields = ['id', 'title_ru', 'title_en', 'image', 'order']


class HomeProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeProject
        fields = ['id', 'title_ru', 'title_en', 'text_ru', 'text_en', 'image', 'order']


class ProviderBlockSerializer(serializers.ModelSerializer):
    paragraphs_ru = serializers.SerializerMethodField()
    paragraphs_en = serializers.SerializerMethodField()

    class Meta:
        model = ProviderBlock
        fields = ['title_ru', 'title_en', 'paragraphs_ru', 'paragraphs_en']

    def get_paragraphs_ru(self, obj):
        return split_paragraphs(obj.paragraphs_ru)

    def get_paragraphs_en(self, obj):
        return split_paragraphs(obj.paragraphs_en)


class AboutPageSerializer(serializers.ModelSerializer):
    text_ru = serializers.SerializerMethodField()
    text_en = serializers.SerializerMethodField()
    industries_ru = serializers.SerializerMethodField()
    industries_en = serializers.SerializerMethodField()
    mt_today_tiles_ru = serializers.SerializerMethodField()
    mt_today_tiles_en = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = [
            'title_ru', 'title_en',
            'text_ru', 'text_en',
            'signature_ru', 'signature_en',
            'industry_title_ru', 'industry_title_en',
            'industries_ru', 'industries_en',
            'mt_today_title_ru', 'mt_today_title_en',
            'mt_today_tiles_ru', 'mt_today_tiles_en',
            'certs_title_ru', 'certs_title_en',
        ]

    def get_text_ru(self, obj):
        return split_paragraphs(obj.text_ru)

    def get_text_en(self, obj):
        return split_paragraphs(obj.text_en)

    def get_industries_ru(self, obj):
        return split_lines(obj.industries_ru)

    def get_industries_en(self, obj):
        return split_lines(obj.industries_en)

    def get_mt_today_tiles_ru(self, obj):
        # Tiles have no separate icons in DB; use placeholder icons in client
        items = split_lines(obj.mt_today_tiles_ru)
        return [{'text': item, 'icon': f'/images/dvkran/dev__res{i + 1}.svg'} for i, item in enumerate(items)]

    def get_mt_today_tiles_en(self, obj):
        items = split_lines(obj.mt_today_tiles_en)
        return [{'text': item, 'icon': f'/images/dvkran/dev__res{i + 1}.svg'} for i, item in enumerate(items)]


class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = ['id', 'title_ru', 'title_en', 'image', 'order']


class ProjectItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectItem
        fields = [
            'id', 'case_ru', 'case_en', 'case_en_label',
            'title_ru', 'title_en', 'image', 'order',
        ]
