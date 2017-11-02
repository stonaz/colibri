from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _

from profiles.models import UserProfile
# Create your models here.

def populateBookHistory(entry):
    pass

class TimeStamped_Model(models.Model):
    """ 
    An abstract base class model that 
    provides self-updating created 
    and modified fields. 
    """ 
    created = models.DateTimeField(  auto_now_add=True) 
    modified = models.DateTimeField( auto_now=True) 
    
    class Meta: 
        abstract = True


class Book( TimeStamped_Model):
    owner= models.ForeignKey(User,related_name="sharer")
    title = models.CharField( _("Titolo"),max_length=100,help_text=_("Titolo"))
    author = models.CharField( _("Autore"),max_length=100,help_text=_("Autore"))
    comment = models.TextField( _("Commenti"),help_text=_("Commenti"),blank=True,null=True)
    note = models.TextField( _("Note"),help_text=_("Note"),blank=True,null=True)
    
    def __unicode__(self):
        return self.title
    
    class Meta:
        ordering = ['author']
        

        

            