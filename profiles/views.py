import json
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import Http404,HttpResponse
from django.contrib.auth import login, logout
from django.utils.http import base36_to_int
from django.utils.translation import ugettext_lazy as _
from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import generics
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .serializers import *
from .models import UserProfile

class IsNotAuthenticated(IsAuthenticated):
    """
Restrict access only to unauthenticated users.
"""
    def has_permission(self, request, view, obj=None):
        if request.user and request.user.is_authenticated():           
            #print ('here')
            return False
        else:
            #print ('there')

            return True

# Create your views here.
class AccountLogin(generics.GenericAPIView):
    """
    Log in
    
    **Parameters**:
    
     * username
     * password
     * remember
    """
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    #permission_classes = (IsNotAuthenticated, )
    serializer_class = LoginSerializer
    
    def post(self, request, format=None):
        """ authenticate """
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            login(request, serializer.instance)
            user = serializer.instance
        
            #if request.DATA.get('remember'):
            #    # TODO: remember configurable
            #    request.session.set_expiry(60 * 60 * 24 * 7 * 3)
            #else:
            #    request.session.set_expiry(0)
                
            return Response({
                'detail': _(u'Logged in successfully'),
                'username': user.username,
                'user' : user.id
            })
        
        return Response(serializer.errors, status=400)
    
    def permission_denied(self, request):
        print ('give 403')
        raise exceptions.PermissionDenied(_("You are already authenticated"))

account_login = AccountLogin.as_view()


class AccountLogout(APIView):
    """
    Log out
    """
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    
    def post(self, request, format=None):
        """ clear session """
        logout(request)
        return Response({ 'detail': _(u'Logged out successfully') })

account_logout = AccountLogout.as_view()

class AccountSignIn(generics.ListCreateAPIView):
    """
Return profile of current authenticated user or return 401.
### POST
Create a new user account.

"""
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    model = User
    serializer_class = UserCreateSerializer
    
    
    #def get(self, request, *args, **kwargs):
    #    """ return profile of current user if authenticated otherwise 401 """
    #    serializer = self.serializer_reader_class
    #    
    #    if request.user.is_authenticated():
    #        return Response(serializer(request.user, context=self.get_serializer_context()).data)
    #    else:
    #        return Response({ 'detail': _('Authentication credentials were not provided') }, status=401)
    
    queryset = User.objects.all()
    
    def post_save(self, obj, created):

        super(AccountSignIn, self).post_save(obj)

        if created:
            clear_password = obj.password
            obj.set_password(obj.password)
            obj.save()
            profile =UserProfile(user=obj)
            profile.save()
            message = "Benvenuto su Colibri\n"
            message += "Username: %s  \n" % obj.username
            message += "Password: %s  " % clear_password
            send_mail("Registrazione a CoLibri", message, 'colibribooksharing@gmail.com',[obj.email])
            #user = authenticate(username=obj.password, password=obj.password)
            #login(request,user)
            

account_signin = AccountSignIn.as_view()


class UserProfileList(generics.ListAPIView):
    """
    ### GET
    
    Retrieve user profiles.
        
    """
    
    authentication_classes = (SessionAuthentication,)
    serializer_class = UserProfileSerializer
    model = UserProfile
    queryset = UserProfile.objects.all()   

user_profile_list = UserProfileList.as_view()


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    """
    ### GET
    
    Retrieve user profiles.
        
    """
    
    authentication_classes = (SessionAuthentication,)
    serializer_class = UserProfileSerializer
    model = UserProfile
    lookup_field = 'user'
    queryset = UserProfile.objects.all()
    
    def get_object(self):
        queryset = self.get_queryset()
        username = self.kwargs.get('user', None)
        user = User.objects.get(username=username)
        print 'test ' +username
        #filter = {}
        #for field in self.multiple_lookup_fields:
        #    filter[field] = self.kwargs[field]
    
        obj = get_object_or_404(queryset, user=user)
        #self.check_object_permissions(self.request, obj)
        return obj  

user_profile_detail = UserProfileDetail.as_view()


class SendMail(generics.ListCreateAPIView):
    """
    Send mail
    """
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    #permission_classes = (IsAuthenticated, )
    def post(self,request):
        data = request.POST
        #print request.POST['book_author']
        #print data
        subject = "Colibri notification - %s %s " % (data['book_title'],data['book_author'])
        sender = request.user.email
        #print sender
        message = data['message']
        send_mail(subject, message, sender,[data['where_is_email']])
        #send_mail("test", "message", 'booksharing@colibri.org',['booksharing@colibri.org'], fail_silently=False)
        #response_data = {}
        return Response({})

send_mail_api = SendMail.as_view()