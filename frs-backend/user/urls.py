from django.urls import path, include

from .views import CustomUserCreateView, CustomUserDetailView, CustomUserUpdateView


urlpatterns = [
    path('register/', CustomUserCreateView.as_view(), name="register-user"),
    path('me/', CustomUserDetailView.as_view(), name="get-current-user"),
    path('me/update/', CustomUserUpdateView.as_view(),
         name="update-current-user")
]
