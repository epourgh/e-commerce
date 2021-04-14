from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress, StripeUser, Refund
from base.serializers import ProductSerializer, OrderSerializer, StripeSerializer, RefundSerializer

from rest_framework import status
from datetime import datetime

import stripe
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
uspsUsername = os.getenv('USPS_API_USERNAME')

stripe.api_key = os.getenv('STRIPE_KEY')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    print(request.user)
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Make payment

        stripe.PaymentIntent.confirm(
            data['paymentIntentId'],
            payment_method=data['paymentMethodId'],
        )

        # (2) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
            isPaid=True
        )

        # (3) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (4) Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['id'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['product']['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        print('serializing')
        try:
            refund = Refund.objects.get(order=order)
        except Refund.DoesNotExist:
            refund = None
        
        print(refund)
        if user.is_staff or order.user == user:
            orderSerializer = OrderSerializer(order, many=False)
            if refund:
                print('has refunds')
                refundSerializer = RefundSerializer(refund, many=False)
                results = { 'order': orderSerializer.data, 'refund': refundSerializer.data }
            else: 
                print('no refunds')
                results = { 'order': orderSerializer.data, 'refund': {} }

            return Response(results)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request, pk):

    user = request.user
    upper = int(pk)

    allOrders = user.order_set.all()
    orders = allOrders.order_by('_id').reverse()[0:upper]
    serializer = OrderSerializer(orders, many=True)

    print(len(serializer.data))
    print(len(allOrders))

    size = True if (len(serializer.data) == len(allOrders)) else False
    return Response({'data': serializer.data, 'isEndOfFeed': size })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setPaymentIntent(request, pk):

    amount = int(round(float(request.data['totalPrice']), 2)*100)
    
    user = request.user
    customerId=StripeUser.objects.get(user=user)
    serializerCUID = StripeSerializer(customerId, many=False)

    # Either retrieve User's Stripe CUID
    if serializerCUID['cuid'].value:
        customer = stripe.Customer.retrieve(serializerCUID['cuid'].value)
    else:
        customer = stripe.Customer.create(
            name=request.data['name'],
            email=request.data['email'],
        )
        customerId.cuid = customer.id
        customerId.save()

    # Make payment intent with CUID
    charge = stripe.PaymentIntent.create(
        customer=customer,
        amount=amount,
        currency='USD',
        description="payment for products",
        payment_method=request.data['paymentMethodId'],
    )

    return Response({ 'paymentIntentId': charge.id, 'paymentMethodId': request.data['paymentMethodId'] })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    # (1) User confirms payment intent

    stripe.PaymentIntent.confirm(
        request.data['paymentIntentId'],
        payment_method=request.data['paymentMethodId'],
    )

    # (2) Set isPaid to 'True'

    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Successfully paid.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requestRefund(request, pk):

    print('attempt')

    refund = Refund.objects.create(
        order=Order.objects.get(_id=pk),
        stripeUser=StripeUser.objects.get(user=request.user),
        userComment=request.data['userComment']
    )

    return Response('successfully requested refund')