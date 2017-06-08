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
        try:
            new_profile = UserProfile(user=user,profile_email=details['email'])
        except Exception:
            response = HttpResponse("Esiste già un utente con questa e-mail")
        new_profile.save()
    return kwargs

