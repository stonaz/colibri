from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Book
from profiles.models import UserProfile

class BookListSerializer(serializers.ModelSerializer):
    """
    Book list
    """
    owner_username = serializers.CharField(source='owner.username',read_only=True)
    where_is = serializers.CharField(source='where_is.user',read_only=True)
    
    class Meta:
        model = Book

        fields= (
           'id','author', 'title', 'owner', 'owner_username','comment','note', 'where_is', 'created', 'modified',
            )

      
class BookDetailSerializer(serializers.ModelSerializer):
    """
    Book details
    """
    owner_username = serializers.CharField(source='owner.username',read_only=True)
    where_is = serializers.CharField(source='where_is.user',read_only=True)
    
    class Meta:
        model = Book
        
        fields= (
           'id','author', 'title', 'owner', 'owner_username','comment','note', 'where_is', 'created', 'modified',
            )

