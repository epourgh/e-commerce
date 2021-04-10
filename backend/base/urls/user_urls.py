from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="users-profile-update"),
    path('', views.getUsers, name="users"),
    path('users/', views.getUsersWithoutPermission, name="users-no-permission"),

    path('favorites/', views.getFavorites, name='user-favorites'),
    path('favorite/add/<str:pk>/', views.setFavorite, name='add-favorite'),
    path('favorite/remove/<str:pk>/', views.unsetFavorite, name='remove-favorite'),
    path('favorite/<str:pk>/', views.getFavoriteById, name='user-favorite-by-id'),
]