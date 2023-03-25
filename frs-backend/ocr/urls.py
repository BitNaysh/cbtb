from django.urls import path, include

from .views import MediaViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'media', MediaViewSet, basename='media')
urlpatterns = router.urls
