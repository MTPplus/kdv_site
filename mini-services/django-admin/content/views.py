"""API views: returns all site content as a single JSON payload."""
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

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
from .serializers import (
    SiteSettingsSerializer,
    HeroBlockSerializer,
    ProductSerializer,
    HomeServiceSerializer,
    HomeProjectSerializer,
    ProviderBlockSerializer,
    AboutPageSerializer,
    ServiceItemSerializer,
    ProjectItemSerializer,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def full_content(request):
    """Return ALL site content in one JSON payload.

    The Next.js frontend calls this on every page load and falls back to
    its bundled static data if this endpoint is unreachable.
    """
    settings = SiteSettings.load()
    hero = HeroBlock.load()
    provider = ProviderBlock.load()
    about = AboutPage.load()

    payload = {
        'settings': SiteSettingsSerializer(settings).data,
        'hero': HeroBlockSerializer(hero).data,
        'products': ProductSerializer(Product.objects.all(), many=True).data,
        'home_services': HomeServiceSerializer(HomeService.objects.all(), many=True).data,
        'home_projects': HomeProjectSerializer(HomeProject.objects.all(), many=True).data,
        'provider': ProviderBlockSerializer(provider).data,
        'about': AboutPageSerializer(about).data,
        'service_items': ServiceItemSerializer(ServiceItem.objects.all(), many=True).data,
        'project_items': ProjectItemSerializer(ProjectItem.objects.all(), many=True).data,
        # Static lists kept client-side (clients/news/certificates) — not editable
        'clients': [
            '/images/dvkran/2023__09__partner-1.png',
            '/images/dvkran/2023__09__partner-2.png',
            '/images/dvkran/2023__09__partner-3.png',
            '/images/dvkran/2023__09__partner-4.png',
            '/images/dvkran/2023__09__partner-5.png',
        ],
        'certificates': (
            [f'/images/dvkran/2023__05__sert{i}.jpg' for i in range(15, 0, -1)]
            + [f'/images/dvkran/2023__05__review{i}.jpg' for i in range(5, 0, -1)]
        ),
        'yandex_map_src': settings.yandex_map_src,
    }
    return JsonResponse(payload)


@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    """Health-check endpoint."""
    return JsonResponse({'ok': True})
