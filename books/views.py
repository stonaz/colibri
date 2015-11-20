import json
from django.shortcuts import render,render_to_response,get_object_or_404
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse,Http404
from django.forms import ModelForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q

from rest_framework import generics, permissions, authentication
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .serializers import *
from .permissions import IsOwnerOrReadOnly,IsOwner

from books.models import Book,BookHistory,BookWhereIs
from profiles.models import UserProfile


def ui_index(request):
    
    context = RequestContext(request)
    count = Book.objects.count()
    
    return render_to_response(
            'ui_books.html', {'count':count},context
)



#Serializers Views

class BookList(generics.ListCreateAPIView):
    """
    ### GET
    
    Retrieve list of books.
    
    ### POST
    
    Create new book if authorized (admins and allowed users only).
    """
    
    authentication_classes = (SessionAuthentication,TokenAuthentication)
    serializer_class= BookListSerializer
    permission_classes = (IsAuthenticated, )

    
    def get_queryset(self):
        """
        Optionally restricts the returned results
        by filtering against a `search` query parameter in the URL.
        """
        #print self.request.user
        current_user = self.request.user
        
        queryset = Book.objects.all().exclude(owner=self.request.user).exclude(where_is__user=self.request.user)
        # retrieve value of querystring parameter "search"
        search = self.request.query_params.get('search', None)
        
        if search is not None:
            search_query = (
                Q(author__icontains=search) | Q(title__icontains=search)
            )
            # add instructions for search to queryset
            queryset = queryset.filter(search_query)
        
        return queryset

book_list = BookList.as_view()


class UserBookList(generics.ListCreateAPIView):
    """
    ### GET
    
    Retrieve list of books of a user.
        
    """
    
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= BookListSerializer
    permission_classes = (IsAuthenticated, )
    
    def perform_create(self, serializer):
        """ determine user when node is added """
        if serializer.instance is None:
            serializer.save(owner=self.request.user)
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return Book.objects.all().filter(owner=user_id)

user_book_list = UserBookList.as_view()


class UserBookDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    ### GET
    
    Retrieve details of books of a user.
        
    """
    
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly )
    authentication_classes = (SessionAuthentication,)
    serializer_class= BookDetailSerializer
    model=Book
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        book_id = self.kwargs.get('pk', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return Book.objects.all().filter(owner=user_id).filter(id=book_id)

user_book_detail = UserBookDetail.as_view()


class BookWhereIsDetail(generics.RetrieveUpdateAPIView):
    """
    ### GET
    
    Retrieve and update where a book is now.
        
    """
    
    permission_classes = (IsAuthenticated, )
    authentication_classes = (SessionAuthentication,TokenAuthentication)
    serializer_class = BookWhereIsListSerializer
    model = BookWhereIs
    lookup_field = 'book'
      
    
    def get_queryset(self):
        book_id = self.kwargs.get('book', None)
        try:
            book=Book.objects.get(id=book_id)
        except Exception:
            raise Http404(_('Not found'))
        return BookWhereIs.objects.all().filter(book=book)
    
    def put(self, request, *args, **kwargs):
        """ Change property where_is of a book """
        body = json.loads(request.body) 
        #print body
        book_id = kwargs['book']
        book = Book.objects.get(pk=book_id)
        #print book
        book_where_is = BookWhereIs.objects.get(book=book)
        user = User.objects.get(pk=body['user'])
        user_id= user.id
        #print user
        book_where_is.user = user
        book_where_is.save()
        return Response({ 'user': user_id }, status=201)

book_where_is = BookWhereIsDetail.as_view()


class BookHistoryList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve history of a book.
        
    """
    
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated, IsOwner,)
    serializer_class = BookistoryListSerializer
    model = BookHistory
    
    def get_queryset(self):
        book_id = self.kwargs.get('book', None)
        try:
            book=Book.objects.get(id=book_id)
        except Exception:
            raise Http404(_('Not found'))
        if book.owner != self.request.user:
            message = {'detail': 'Not authorized'}
            raise PermissionDenied(detail=None)
        return BookHistory.objects.all().filter(book=book)

book_history_list = BookHistoryList.as_view()


class UserHoldingBookList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve list of books a user is currently holding.
        
    """
    
    authentication_classes = (SessionAuthentication,)
    serializer_class= BookWhereIsListSerializer
    model=BookWhereIs
    permission_classes = (IsAuthenticated, )
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return BookWhereIs.objects.all().filter(user=user_id).exclude(book__owner=self.request.user)

user_holding_book_list = UserHoldingBookList.as_view()


