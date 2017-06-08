# coding=utf8
# -*- coding: utf8 -*-
# vim: set fileencoding=utf8 :
from .models import UserProfile
from django.http import HttpResponse

def now():
    """ returns the current date and time in UTC format (datetime object) """
    return datetime.utcnow().replace(tzinfo=utc)

def create_profile(strategy, details, response, user, *args, **kwargs):
    print details['email']
    # username = kwargs['details']['username']
    # user_object = User.objects.get(username=username)
    if UserProfile.objects.filter(user=user).exists():
        pass
    else:
        new_profile = UserProfile(user=user,profile_email=details['email'])
        try:
            new_profile.save()
        except Exception:
            response = HttpResponse("Esiste già un utente con questa e-mail")
            return(response)
      
    return kwargs

