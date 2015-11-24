from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import utc
from django.utils.translation import ugettext_lazy as _
from django.utils.http import int_to_base36
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator as token_generator

from django.conf import settings

def now():
    """ returns the current date and time in UTC format (datetime object) """
    return datetime.utcnow().replace(tzinfo=utc)

class UserProfile(models.Model):
    # This line is required. Links UserProfile to a User model instance.
    user = models.OneToOneField(User)

    # The additional attributes we wish to include.
    address = models.CharField( _("Indirizzo"),max_length=100,null=True,blank=True)
    phone = models.CharField( _("Tel"),max_length=15,null=True,blank=True)
    picture = models.ImageField(upload_to='profile_images', blank=True)
    public_email = models.BooleanField(default=False)
    public_phone = models.BooleanField(default=False)
    public_address = models.BooleanField(default=False)
    # Override the __unicode__() method to return out something meaningful!
    def __unicode__(self):
        return self.user.username
    
    
class PasswordResetManager(models.Manager):
    """ Password Reset Manager """

    def create_for_user(self, user):
        """ create password reset for specified user """
        # support passing email address too
        if type(user) is unicode:
            user = User.objects.get(email=user)

        temp_key = token_generator.make_token(user)

        # save it to the password reset model
        password_reset = PasswordReset(user=user, temp_key=temp_key)
        password_reset.save()
        print user.id
        print int_to_base36(5000)
        # send the password reset email
        subject = _("Password reset email sent")
        message = render_to_string("profiles/email_messages/password_reset_key_message.txt", {
            "user": user,
            "uid": int_to_base36(user.id),
            "temp_key": temp_key,
            "site_url": settings.SITE_URL,
            "site_name": settings.SITE_NAME
        })
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

        return password_reset


class PasswordReset(models.Model):
    """
    Password reset Key
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("user"))

    temp_key = models.CharField(_("temp_key"), max_length=100)
    timestamp = models.DateTimeField(_("timestamp"), default=now)
    reset = models.BooleanField(_("reset yet?"), default=False)

    objects = PasswordResetManager()

    class Meta:
        verbose_name = _('password reset')
        verbose_name_plural = _('password resets')
        app_label = 'profiles'

    def __unicode__(self):
        return "%s (key=%s, reset=%r)" % (
            self.user.username,
            self.temp_key,
            self.reset
        )
