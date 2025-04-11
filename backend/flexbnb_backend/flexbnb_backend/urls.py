from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to FlexBnB!")  # Simple homepage response

urlpatterns = [
    path('', home),  # Route for '/'
    path('admin/', admin.site.urls),
    path('api/properties/', include('property.urls')),
] +static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
