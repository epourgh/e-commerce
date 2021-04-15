from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import StripeUser, Favorite, Product
from base.serializers import ProductSerializer, UserSerializer, StripeSerializer, UserSerializerWithToken, FavoriteSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    return Response()

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        customerId = StripeUser.objects.create(
            user=user,
            name=data['email']
        )

        serializer = UserSerializerWithToken(user, many=False)
        serializerCUID = StripeSerializer(customerId, many=False)

        results = {
            'id': serializer.data['id'],
            '_id': serializer.data['_id'], 
            'username': serializer.data['username'],
            'email': serializer.data['email'],
            'name': serializer.data['name'],
            'isAdmin': serializer.data['isAdmin'],
            'cuid': serializerCUID.data['cuid']
        }

        return Response(results, status=status.HTTP_200_OK)

    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data

    customerId=StripeUser.objects.get(user=user)
    customerId.name = data['email']
    customerId.save()

    serializer = UserSerializerWithToken(user, many=False)

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
 
    user.save()

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    customerId=StripeUser.objects.get(user=user)
    serializer = UserSerializer(user, many=False)
    serializerCUID = StripeSerializer(customerId, many=False)
    
    results = {
        'id': serializer.data['id'],
        '_id': serializer.data['_id'], 
        'username': serializer.data['username'],
        'email': serializer.data['email'],
        'name': serializer.data['name'],
        'isAdmin': serializer.data['isAdmin'],
        'cuid': serializerCUID.data['cuid']
    }

    return Response(results, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUsersWithoutPermission(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setFavorite(request, pk):
    
    product = Product.objects.get(_id=pk)

    favorite = Favorite.objects.create(
        product=product,
        user=request.user
    )

    product.numFavorites = product.numFavorites + 1
    product.save()

    return Response('Successfully added to favorites')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unsetFavorite(request, pk):
    
    product = Product.objects.get(_id=pk)

    Favorite.objects.filter(
            product=product,
        user=request.user
    ).delete()


    product.numFavorites = product.numFavorites - 1
    product.save()

    return Response('Successfully removed from favorites')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavorites(request):

    upper = int(request.GET.get('loadFavoritesCount', None))
    user = request.user
    favoritesAll = user.favorite_set.all()
    favorites = favoritesAll[0:upper]
    serializer = FavoriteSerializer(favorites, many=True)
    
    my_list = list()

    for item in favorites:
        serialized = ProductSerializer(item.product)
        my_list.append(serialized.data)
    
    print(my_list)

    size = True if (len(my_list) == len(favoritesAll)) else False

    return Response({'data': my_list, 'isEndOfFeed': size })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavoriteById(request, pk):

    user = request.user
    product = Product.objects.get(_id=pk)

    if user.favorite_set.filter(product=product).exists():
        return Response('liked')
    else: 
        return Response(None)
