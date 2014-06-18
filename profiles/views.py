from django.shortcuts import render
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