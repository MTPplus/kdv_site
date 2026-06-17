"""URL configuration for admin_project."""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse, HttpResponseRedirect

from content.views import full_content, health


def preview_redirect(request):
    """Preview opens the Next.js site in a new tab.
    For now, redirect to localhost:3000 (the Next.js dev server).
    """
    return HttpResponseRedirect('http://localhost:3000/')


def admin_home(request):
    """A small landing page at / that links to admin and preview."""
    return HttpResponse("""
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>КРАН-ДВ — Admin</title>
  <style>
    body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 60px 20px; }
    .wrap { max-width: 720px; margin: 0 auto; background: #fff; padding: 40px 50px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    h1 { color: #e85235; margin-top: 0; }
    .row { display: flex; gap: 16px; margin: 24px 0; }
    a.btn { display: inline-block; padding: 14px 28px; background: #e85235; color: #fff; text-decoration: none; font-weight: 600; }
    a.btn:hover { background: #d34225; }
    a.btn.alt { background: #171717; }
    a.btn.alt:hover { background: #000; }
    .hint { color: #7b7b7b; font-size: 14px; margin-top: 20px; line-height: 1.6; }
    code { background: #f0f0f0; padding: 2px 6px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>КРАН-ДВ — Admin Dashboard</h1>
    <p>Manage all site content here. Changes are immediately served to the Next.js frontend via the JSON API.</p>
    <div class="row">
      <a class="btn" href="/admin/">Open Django Admin</a>
      <a class="btn alt" href="/preview/" target="_blank">Preview site →</a>
    </div>
    <p class="hint">
      <strong>Admin login:</strong> admin / admin<br>
      <strong>API endpoint:</strong> <code>/api/content/</code><br>
      <strong>Next.js site:</strong> <code>http://localhost:3000/</code>
    </p>
  </div>
</body>
</html>
""")


urlpatterns = [
    path('', admin_home, name='admin-home'),
    path('admin/', admin.site.urls),
    path('api/content/', full_content, name='api-content'),
    path('api/health/', health, name='api-health'),
    path('preview/', preview_redirect, name='preview'),
]
