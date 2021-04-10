from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('category/<str:pk>/', views.getProductsByCategory, name="products-by-category"),

    path('<str:pk>/', views.getProduct, name="product"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('<str:pk>/reviewed/', views.checkIfUserReviewed, name="check-if-user-reviewed"),
]