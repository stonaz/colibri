from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Book,UserProfile



class BookListSerializer(serializers.ModelSerializer):
    """
    Book list
    """
    sharer = serializers.Field(source='user.username')
    dove_sta = serializers.Field(source='where_is.username')
    #nodes = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_list', slug_field='slug')
    #geojson = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_geojson', slug_field='slug')
    
    class Meta:
        model = Book

        fields= (
           'id','user','where_is', 'sharer', 'author', 'title', 'dove_sta', 'created', 'modified',
            )
        
class BookDetailSerializer(serializers.ModelSerializer):
    """
    Book details
    """
    sharer = serializers.Field(source='user.username')
    dove_sta = serializers.Field(source='where_is.username')
    #nodes = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_list', slug_field='slug')
    #geojson = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_geojson', slug_field='slug')
    
    class Meta:
        model = Book
        
        fields= (
           'id','user','where_is', 'sharer', 'author', 'title', 'dove_sta', 'created', 'modified',
            )   
        
class UserProfileListSerializer(serializers.ModelSerializer):
    """
    User profiles list
    """
    email = serializers.Field(source='user.email')
    username = serializers.Field(source='user.username')

    #dove_sta = serializers.Field(source='where_is.username')
    
    class Meta:
        model = UserProfile

        fields= (
           'username','email', 'address','phone'
            )
        
        

              
