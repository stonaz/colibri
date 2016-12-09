from .models import UserProfile


def now():
    """ returns the current date and time in UTC format (datetime object) """
    return datetime.utcnow().replace(tzinfo=utc)

def create_profile(strategy, details, response, user, *args, **kwargs):
    print details
    # username = kwargs['details']['username']
    # user_object = User.objects.get(username=username)
    if UserProfile.objects.filter(user=user).exists():
        pass
    else:
        new_profile = UserProfile(user=user)
        new_profile.save()
    return kwargs