from django.contrib.auth.models import User
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
    user= models.ForeignKey(User,related_name="sharer")
    title = models.CharField( _("Titolo"),max_length=100,help_text=_("Titolo"))
    author = models.CharField( _("Autore"),max_length=100,help_text=_("Autore"))
    where_is = models.ForeignKey(User,related_name="where_is",help_text=_("Da chi sta"))
    
    def __unicode__(self):
        return self.title
    
    class Meta:
        ordering = ['-modified']
        
    def save(self,*args, **kwargs):
        print self.title
        # Place code here, which is excecuted the same
        # time the ``pre_save``-signal would be
        if self.pk:
            old_obj = Book.objects.get(pk=self.pk)

        # Call parent's ``save`` function
        super(Book, self).save(*args, **kwargs)
        try:
            old_obj
        except NameError:
            old_obj = None
        if old_obj :
            if old_obj.where_is != self.where_is:
                new_entry = BookHistory(book=old_obj,took_from=old_obj.where_is,given_to=self.where_is)
                new_entry.save()
        
        #print(new_entry.id)
        # Place code here, which is excecuted the same
        # time the ``post_save``-signal would be

        
class BookHistory( TimeStamped_Model):
    book= models.ForeignKey(Book)
    took_from = models.ForeignKey(User,related_name="took_from",help_text=_("Preso da"))
    given_to = models.ForeignKey(User,related_name="given_to",help_text=_("Dato a"))
    
    #def __unicode__(self):
    #    return self.title
    
    class Meta:
        ordering = ['-modified']
            