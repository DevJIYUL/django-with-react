from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Post
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny] # FIXME 인증 적용