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

from .serializers import *
from .permissions import IsOwnerOrReadOnly

from books.forms import *
from books.models import Book,BookHistory,BookWhereIs
from profiles.models import UserProfile

@login_required
def take_book(request,id):
    
    context = RequestContext(request)
    book_id=id
    #book_id=request.GET.get('id')
    book=get_object_or_404(BookWhereIs,book_id=book_id)
    print book.user
    #sharer=User.objects.get(username=book.user)
    borrower=get_object_or_404(User,username=book.user)
    borrower_email=borrower.email
    
    borrower_profile=get_object_or_404(UserProfile,user=borrower.id)
    if borrower_profile.phone != "" and borrower_profile.public_phone is True:
        borrower_phone=borrower_profile.phone
    else:
        borrower_phone="Non disponibile"
        
    print borrower_phone

    return render_to_response(
            'take_book.html',{'book': book,
                              'borrower':borrower,
                              'borrower_phone':borrower_phone
                              },
            context)

@login_required
def confirm_book(request,id):
    
    context = RequestContext(request)
    book_id=id
    #book_id=request.GET.get('id')
    book=get_object_or_404(BookWhereIs,book_id=book_id)
    print book.user
    #sharer=User.objects.get(username=book.user)
    sharer=get_object_or_404(User,username=book.user)
    borrower=get_object_or_404(User,username=book.user)
    borrower_email=borrower.email
    sharer_email=sharer.email
    borrower_profile=get_object_or_404(UserProfile,user=borrower.id)

    book.where_is=request.user
    book.save()
    
    return render_to_response(
            'confirm_book.html',{'book': book,
                              'borrower':borrower,
                              },
            context)

@login_required
def index(request):
    
    context = RequestContext(request)
    
    return render_to_response(
            'index.html',
            context)

#@login_required
def ui_index(request):
    
    context = RequestContext(request)
    
    return render_to_response(
            'ui_books.html', context
)

@login_required
def mybooks(request):
    
    context = RequestContext(request)
    
    return render_to_response(
            'mybooks.html',
            context)

@login_required
def add_book(request):
    # Get the context from the request.
    context = RequestContext(request)

    # A HTTP POST?
    if request.method == 'POST':
        form = AddBookForm(request.POST)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new category to the database.
            book=form.save(commit=False)
            book.owner=request.user
            #book.where_is=request.user
            book.save()

            # Now call the index() view.
            # The user will be shown the homepage.
            return HttpResponseRedirect('/')
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = AddBookForm()

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    return render_to_response('add_book.html', {'form': form}, context)

@login_required
def update_book(request,id):
    # Get the context from the request.
    context = RequestContext(request)
    book_id=id
    #book_id=request.GET.get('id')
    book=get_object_or_404(Book,owner= request.user,id=book_id)

    # A HTTP POST?
    if request.method == 'POST':
        form = UpdateBookForm(request.POST,instance=book)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new category to the database.
            book=form.save(commit=False)
            book.owner=request.user
            book.save()
            #print book.where_is
    #        borrower=User.objects.get(username=book.where_is)
    #        mail_to="essetizeta@gmail.com"
    #        send_mail('Subject here', 'Here is the message.', 'booksharing@colibri.org',
    #[mail_to], fail_silently=False)
            # Now call the index() view.
            # The user will be shown the homepage.
            return HttpResponseRedirect('/mybooks/')
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = UpdateBookForm(instance=book)

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    return render_to_response('update_book.html', {'form': form}, context)

@login_required
def delete_book(request,id):
    # Get the context from the request.
    context = RequestContext(request)
    book_id=id
    #book_id=request.GET.get('id')
    book=get_object_or_404(Book,owner= request.user,id=book_id)

    # A HTTP POST?
    if request.method == 'POST':
        form = DeleteBookForm(request.POST,instance=book)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new category to the database.
            book.delete()

            # Now call the index() view.
            # The user will be shown the homepage.
            return HttpResponseRedirect('/books/')
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = DeleteBookForm(instance=book)

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    #context.book=book
    return render_to_response('delete_book.html', {'form': form,'book': book}, context)

def user_login(request):
    # Like before, obtain the context for the user's request.
    context = RequestContext(request)

    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'POST':
        # Gather the username and password provided by the user.
        # This information is obtained from the login form.
        username = request.POST['username']
        password = request.POST['password']

        # Use Django's machinery to attempt to see if the username/password
        # combination is valid - a User object is returned if it is.
        user = authenticate(username=username, password=password)

        # If we have a User object, the details are correct.
        # If None (Python's way of representing the absence of a value), no user
        # with matching credentials was found.
        if user is not None:
            # Is the account active? It could have been disabled.
            if user.is_active:
                # If the account is valid and active, we can log the user in.
                # We'll send the user back to the homepage.
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                # An inactive account was used - no logging in!
                return HttpResponse("Your account is disabled.")
        else:
            # Bad login details were provided. So we can't log the user in.
            print "Invalid login details: {0}, {1}".format(username, password)
            return HttpResponse("Invalid login details supplied.")

    # The request is not a HTTP POST, so display the login form.
    # This scenario would most likely be a HTTP GET.
    else:
        # No context variables to pass to the template system, hence the
        # blank dictionary object...
        return render_to_response('login.html', {}, context)

@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)

    # Take the user back to the homepage.
    return HttpResponseRedirect('/login/')

def register(request):
    # Get the request's context.
    context = RequestContext(request)

    # A boolean value for telling the template whether the registration was successful.
    # Set to False initially. Code changes value to True when registration succeeds.
    registered = False

    # If it's a HTTP POST, we're interested in processing form data.
    if request.method == 'POST':
        # Attempt to grab information from the raw form information.
        # Note that we make use of both UserForm and UserProfileForm.
        user_form = UserForm(data=request.POST)

        if user_form.is_valid():
            # Save the user's form data to the database.
            user = user_form.save()

            # Now we hash the password with the set_password method.
            # Once hashed, we can update the user object.
            user.set_password(user.password)
            user.save()

            # Now sort out the UserProfile instance.
            profile=UserProfile()
            profile.user = user

            # Now we save the UserProfile model instance.
            profile.save()

            # Update our variable to tell the template registration was successful.
            registered = True

        # Invalid form or forms - mistakes or something else?
        # Print problems to the terminal.
        # They'll also be shown to the user.
        else:
            print user_form.errors

    # Not a HTTP POST, so we render our form using two ModelForm instances.
    # These forms will be blank, ready for user input.
    else:
        user_form = UserForm()

    # Render the template depending on the context.
    return render_to_response(
            'register.html',
            {'user_form': user_form,  'registered': registered},
            context)

def update_profile(request):
    # Like before, get the request's context.
    context = RequestContext(request)

    # A boolean value for telling the template whether the update was successful.
    # Set to False initially. Code changes value to True when update succeeds.
    updated = False
    user=request.user
    user_profile=UserProfile.objects.get(user=request.user.id)
    # If it's a HTTP POST, we're interested in processing form data.
    if request.method == 'POST':
        # Attempt to grab information from the raw form information.
        # Note that we make use of both UserForm and UserProfileForm.
        user_form = UserForm(data=request.POST,instance=user)
        profile_form = UserProfileForm(data=request.POST,instance=user_profile)

        # If the two forms are valid...
        if user_form.is_valid() and profile_form.is_valid():
            # Save the user's form data to the database.
            user = user_form.save()

            # Now we hash the password with the set_password method.
            # Once hashed, we can update the user object.
            user.set_password(user.password)
            user.save()

            # Now sort out the UserProfile instance.
            # Since we need to set the user attribute ourselves, we set commit=False.
            # This delays saving the model until we're ready to avoid integrity problems.
            profile = profile_form.save(commit=False)
            profile.user = user

            # Did the user provide a profile picture?
            # If so, we need to get it from the input form and put it in the UserProfile model.
            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']

            # Now we save the UserProfile model instance.
            profile.save()

            # Update our variable to tell the template update was successful.
            updated = True

        # Invalid form or forms - mistakes or something else?
        # Print problems to the terminal.
        # They'll also be shown to the user.
        else:
            print user_form.errors, profile_form.errors

    # Not a HTTP POST, so we render our form using two ModelForm instances.
    # These forms will be blank, ready for user input.
    else:
        user_form = UserForm(instance=user)
        profile_form = UserProfileForm(instance=user_profile)

    # Render the template depending on the context.
    return render_to_response(
            'update_profile.html',
            {'user_form': user_form, 'profile_form': profile_form,'updated': updated},
            context)

#Serializers Views

class BookList(generics.ListCreateAPIView):
    """
    ### GET
    
    Retrieve list of books.
    
    ### POST
    
    Create new book if authorized (admins and allowed users only).
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= BookListSerializer
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
    def get_queryset(self):
        """
        Optionally restricts the returned results
        by filtering against a `search` query parameter in the URL.
        """
        #print self.request.user
        queryset = Book.objects.all().exclude(owner=self.request.user)
        
        # retrieve value of querystring parameter "search"
        author = self.request.QUERY_PARAMS.get('author', None)
        title= self.request.QUERY_PARAMS.get('title', None)
        
        if author is not None:
            search_query = (
                Q(author__icontains=author) 
            )
            # add instructions for search to queryset
            queryset = queryset.filter(search_query)
        
        if title is not None:
            search_query = (
                Q(title__icontains=title) 
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
    #model=Book
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
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
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
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
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2       
    
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
        print body
        book_id = kwargs['book']
        book = Book.objects.get(pk=book_id)
        print book
        book_where_is = BookWhereIs.objects.get(book=book)
        print book_where_is
        print request.POST
        user = User.objects.get(pk=body['user'])
        user_id= user.id
        print user
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
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
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
    serializer_class= BookListSerializer
    #model=Book
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
    def get_queryset(self):
        user = self.kwargs.get('user', None)
        try:
            user_id=User.objects.get(username=user)
        except Exception:
            raise Http404(_('Not found'))
        return Book.objects.all().exclude(user=user_id).filter(where_is=user_id)

user_holding_book_list = UserHoldingBookList.as_view()

class UserProfileList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve user profiles.
        
    """
    
    #permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly, )
    authentication_classes = (authentication.SessionAuthentication,)
    serializer_class= UserProfileListSerializer
    #model=Book
    #pagination_serializer_class = PaginatedRicetteListSerializer
    #paginate_by_param = 'limit'
    #paginate_by = 2
    
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
