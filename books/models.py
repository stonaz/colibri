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
    user= models.ForeignKey(User)
    title = models.CharField( _("Titolo"),max_length=100)
    author = models.CharField( _("Autore"),max_length=100)
    
    def __unicode__(self):
        return self.title