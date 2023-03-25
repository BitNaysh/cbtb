from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static


from .views import health_check

schema_view = get_schema_view(
    openapi.Info(
        title="DRF Auth",
        default_version='v1',
        description="Django Rest Framework Authentication API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@dummy.local"),
        license=openapi.License(name="BSD License"),

    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/health-check", health_check, name='health-check'),
    path("api/auth/", include('authentication.urls')),
    path("api/user/", include('user.urls')),
    path("api/compare_face/", include('ocr.urls')),
    path("api/train_image/", include('face_recog.urls')),
    path('api-auth/', include('rest_framework.urls'))
]

urlpatterns += [
    re_path(r'^api/docs/$', schema_view.with_ui('swagger',
                                                cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^api/redocs/$', schema_view.with_ui('redoc',
                                                  cache_timeout=0), name='schema-redoc'),
]

urlpatterns += [*static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)]
print(settings.MEDIA_URL)
print(settings.MEDIA_ROOT)
