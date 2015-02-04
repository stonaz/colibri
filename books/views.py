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
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .serializers import *
from .permissions import IsOwnerOrReadOnly

#from books.forms import *
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
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,authentication.TokenAuthentication)
    serializer_class= BookListSerializer
    permission_classes = (IsAuthenticated, )
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
    def get_queryset(self):
        """
        Optionally restricts the returned results
        by filtering against a `search` query parameter in the URL.
        """
        #print self.request.user
        current_user = self.request.user
        
        queryset = Book.objects.all().exclude(owner=self.request.user).exclude(where_is__user=self.request.user)
        #print self.request.QUERY_PARAMS
        # retrieve value of querystring parameter "search"
        search = self.request.QUERY_PARAMS.get('search', None)
        
        if search is not None:
            #print search
            search_query = (
                Q(author__icontains=search) | Q(title__icontains=search)
            )
            # add instructions for search to queryset
            queryset = queryset.filter(search_query)
        
        return queryset

book_list = BookList.as_view()

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    ### 
    
    Details of books of a user.
        
    """
    
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= BookDetailSerializer
    model=Book
    
    #def get_queryset(self):
    #    user = self.kwargs.get('user', None)
    #    try:
    #        user_id=User.objects.get(username=user)
    #    except Exception:
    #        raise Http404(_('Not found'))
    #    return Book.objects.all().filter(user=user_id)

book_detail = BookDetail.as_view()


class UserBookList(generics.ListCreateAPIView):
    """
    ### GET
    
    Retrieve list of books of a user.
        
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= BookListSerializer
    permission_classes = (IsAuthenticated, )
    
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
    authentication_classes = (authentication.SessionAuthentication,)
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
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class = BookWhereIsListSerializer
    model = BookWhereIs
    lookup_field = 'book'
      
    
    def get_queryset(self):
        book = self.kwargs.get('book', None)
        try:
            book_id=Book.objects.get(id=book)
        except Exception:
            raise Http404(_('Not found'))
        return BookWhereIs.objects.all().filter(book=book)
    
    def put(self, request, *args, **kwargs):
        """ Post a service request ( requires authentication) """
        body = json.loads(request.body) 
        #print body
        book_id = kwargs['book']
        book = Book.objects.get(pk=book_id)
        #print book
        book_where_is = BookWhereIs.objects.get(book=book)
        #print book_where_is
        #print request.POST
        user = User.objects.get(pk=body['user'])
        user_id= user.id
        #print user
        book_where_is.user = user
        book_where_is.save()
        return Response({ 'user': user_id }, status=201)
        
        #kwargs['book'] = book
        #super(BookWhereIsDetail, self).update(request, *args, **kwargs)

book_where_is = BookWhereIsDetail.as_view()


class BookHistoryList(generics.ListCreateAPIView):
    """
    ### GET
    
    Retrieve history of a book.
        
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class = BookistoryListSerializer
    model = BookHistory
    
    def get_queryset(self):
        book = self.kwargs.get('book', None)
        try:
            book_id=Book.objects.get(id=book)
        except Exception:
            raise Http404(_('Not found'))
        return BookHistory.objects.all().filter(book=book)

book_history_list = BookHistoryList.as_view()


class UserHoldingBookList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve list of books of a user.
        
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= BookWhereIsListSerializer
    model=BookWhereIs
    permission_classes = (IsAuthenticated, )
    
    def get_queryset(self):
        book = self.kwargs.get('book', None)
        try:
            book_id=Book.objects.get(id=book)
        except Exception:
            raise Http404(_('Not found'))
        return BookWhereIs.objects.all().filter(book=book)
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return BookWhereIs.objects.all().filter(user=user_id).exclude(book__owner=self.request.user)

user_holding_book_list = UserHoldingBookList.as_view()

class UserProfileList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve user profiles.
        
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= UserProfileListSerializer
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return UserProfile.objects.all().filter(user=user_id)    
        #queryset=get_queryset_or_404(UserProfile.objects.all(),{ 'user': user_id})
        #return queryset

user_profile_list = UserProfileList.as_view()

