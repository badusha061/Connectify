from django.contrib import admin
from django.urls import path , include
from rest_framework.routers import DefaultRouter
from user_auth.api.views import UserRegistration


router = DefaultRouter()
router.register(r"user", UserRegistration, basename='register')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('user_auth.api.urls')),
]
