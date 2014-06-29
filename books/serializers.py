from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Book,BookHistory,BookWhereIs
from profiles.models import UserProfile

class BookListSerializer(serializers.ModelSerializer):
    """
    Book list
    """
    owner_username = serializers.Field(source='owner.username')
    where_is = serializers.RelatedField(source='where_is.user')
    
    class Meta:
        model = Book

        fields= (
           'id','author', 'title', 'owner', 'owner_username', 'where_is', 'created', 'modified',
            )

      
class BookDetailSerializer(serializers.ModelSerializer):
    """
    Book details
    """
    owner_username = serializers.Field(source='owner.username')
    where_is = serializers.RelatedField(source='where_is.user')
    
    class Meta:
        model = Book
        
        fields= (
           'id','author', 'title', 'owner', 'owner_username', 'where_is', 'created', 'modified',
            )

class BookWhereIsListSerializer(serializers.ModelSerializer):
    """
    Book WhereIs list
    """
    where_is = serializers.Field(source='user.username')
    where_is_email = serializers.Field(source='user.email')
    book_title = serializers.Field(source='book.title')
    book_author = serializers.Field(source='book.author')
    book_owner = serializers.Field(source='book.owner')
    #user_email = serializers.SerializerMethodField('get_user_email')
    #
    #def get_user_email(self, obj):
    #    print obj.user_id
    #    profile= UserProfile.objects.get(user=2)
    #    return profile.email
    
    class Meta:
        model = BookWhereIs

        fields= (
           'book','book_title','book_author','book_owner','user','where_is_email','where_is','created', 'modified',
            )
        #read_only_fields = ('book',)
        

class BookistoryListSerializer(serializers.ModelSerializer):
    """
    Book History list
    """
    #sharer = serializers.Field(source='owner.username')
    #dove_sta = serializers.Field(source='where_is.username')
    took_from_name = serializers.Field(source='took_from.username')
    given_to_name = serializers.Field(source='given_to.username')
    
    class Meta:
        model = BookHistory

        fields= (
           'book','took_from','took_from_name','given_to','given_to_name', 'created', 'modified',
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
        
        

              
