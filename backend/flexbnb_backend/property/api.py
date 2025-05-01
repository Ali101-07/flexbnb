from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Property
from .forms import PropertyForm
from .serializers import PropertiesListSerializer

CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:3000',  # Frontend origin
]
CORS_ALLOW_CREDENTIALS = True

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    properties = Property.objects.all()
    serializer = PropertiesListSerializer(properties, many=True)
    
    return JsonResponse({
        'data': serializer.data,
    })
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_property(request):
    try:
        form = PropertyForm(request.POST, request.FILES)
        
        if form.is_valid():
            property = form.save(commit=False)
            property.landlord = request.user
            property.save()

            return JsonResponse({
                'success': True,
                'message': 'Property created successfully',
                'property': {
                    'id': str(property.id),
                    'title': property.title,
                    'description': property.description,
                    'price_per_night': property.price_per_night,
                    'bedrooms': property.bedrooms,
                    'bathrooms': property.bathrooms,
                    'guests': property.guests,
                    'country': property.country,
                    'country_code': property.country_code,
                    'category': property.category,
                    'image_url': property.image.url if property.image else None,
                    'landlord': property.landlord.id,
                    'created_at': property.created_at,
                }
            }, status=201)
        else:
            return JsonResponse({
                'success': False,
                'message': 'Invalid form data',
                'errors': form.errors,
            }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e),
        }, status=500)