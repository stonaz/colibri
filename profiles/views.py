import json
from django.shortcuts import render
from django.core.mail import send_mail
from django.http import Http404
from django.contrib.auth import login, logout
from django.utils.http import base36_to_int
from django.utils.translation import ugettext_lazy as _
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
            return False
        else:
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
    permission_classes = (IsNotAuthenticated, )
    serializer_class = LoginSerializer
    
    def post(self, request, format=None):
        """ authenticate """
        serializer = self.serializer_class(data=request.DATA)
        
        if serializer.is_valid():
            login(request, serializer.instance)
            user = serializer.instance
        
            if request.DATA.get('remember'):
                # TODO: remember configurable
                request.session.set_expiry(60 * 60 * 24 * 7 * 3)
            else:
                request.session.set_expiry(0)
                
            return Response({
                'detail': _(u'Logged in successfully'),
                'username': user.username,
                'user' : user.id
            })
        
        return Response(serializer.errors, status=400)
    
    def permission_denied(self, request):
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
    
    def post_save(self, obj, created):

        super(AccountSignIn, self).post_save(obj)

        if created:
            obj.set_password(obj.password)
            obj.save()
            profile=UserProfile(user=obj)
            profile.save()
            #user = authenticate(username=obj.password, password=obj.password)
            #login(request,user)
            

account_signin = AccountSignIn.as_view()


def SendMail(request):
    """
    Send mail
    """
    #authentication_classes = (TokenAuthentication, SessionAuthentication)
    #permission_classes = (IsAuthenticated, )

    body = json.loads(request.body)
    print body
    #subject = "Colibri notification - %s %s " % ('libro','autore')
    #message = "test"
    #mail_to = "test@io.net"
    #sender= "test@io.net"
    #print subject
    send_mail('Subject', 'Message', 'from@example.com',['john@example.com', 'jane@example.com'])
    #send_mail("test", "message", 'booksharing@colibri.org',['booksharing@colibri.org'], fail_silently=False)
    #self._send_mail()
    return Response({ 'detail': _(u'Mail sent') })

#send_mail = SendMail.as_view()