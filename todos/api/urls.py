
from django.urls import path, include
from . import views

urlpatterns = [

    path('', views.apiOverview, name='api-overview'),
    path('task-list/', views.tasklist, name='List'),
    path('task-detail/<str:pk>/', views.taskDetail, name='Detail View'),
    path('task-create/', views.taskCreate, name='Create'),
    path('task-update/<str:pk>/', views.taskUpdate, name='Update'),
    path('task-delete/<str:pk>/', views.taskDelete, name='Delete'),


]
