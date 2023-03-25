from django.urls import path, include

from .views import TrainMediaViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'media', TrainMediaViewSet, basename='media')
urlpatterns = router.urls
