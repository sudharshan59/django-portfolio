from django.conf import settings
from django.contrib import admin  # from django.contrib import admin  # 
from django.conf.urls.static import static  
from django.views.static import serve
from django.urls import path, include, re_path  # ← Add re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
]

# Only for Render free tier (not scalable)
if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]