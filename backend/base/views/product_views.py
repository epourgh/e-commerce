from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review, Category
from base.serializers import ProductSerializer

from rest_framework import status

# Create your views here.

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsByCategory(request, pk):      
    upper = int(request.GET.get('loadProductsCount', None))

    category = Category.objects.get(_id=pk)
    allproductsByCategory = Product.objects.filter(category=category)
    products = allproductsByCategory[0:upper]

    serializer = ProductSerializer(products, many=True)

    print(len(serializer.data))
    print(len(allproductsByCategory))

    size = True if (len(serializer.data) == len(allproductsByCategory)) else False

    return Response({'data': serializer.data, 'isEndOfFeed': size })

@api_view(['GET'])
def getProduct(request, pk):
    product=Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkIfUserReviewed(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        return Response('reviewed')
    else:
        return Response('not reviewed')
        