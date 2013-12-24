from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
# Create your models here.

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
    user= models.ForeignKey(User,related_name="sharer")
    title = models.CharField( _("Titolo"),max_length=100,help_text=_("Titolo"))
    author = models.CharField( _("Autore"),max_length=100,help_text=_("Autore"))
    where_is = models.ForeignKey(User,related_name="where_is",help_text=_("Da chi sta"))
    
    def __unicode__(self):
        return self.title
    
    class Meta:
        ordering = ['-modified']

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