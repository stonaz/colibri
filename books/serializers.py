from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Book



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