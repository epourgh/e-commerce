from django.urls import path
from base.views import order_views as views

urlpatterns = [

    # path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/<str:pk>', views.getMyOrders, name='myorders'),

    # path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/refund/', views.requestRefund, name='order-refund'),

    path('<str:pk>/paymentintent/', views.setPaymentIntent, name='payment-intent'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]