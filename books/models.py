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
    
    def __unicode__(self):
        return self.title
    
    class Meta:
        ordering = ['-modified']
        
    def save(self,*args, **kwargs):
        #print self.title
        # Place code here, which is excecuted the same
    
        # Call parent's ``save`` function
        super(Book, self).save(*args, **kwargs)
    
        # Place code here, which is excecuted the same
        # time the ``post_save``-signal would be
        try:
            book_where_is = BookWhereIs.objects.get(book=self)
        except BookWhereIs.DoesNotExist:
            book_where_is = BookWhereIs(book=self,user=self.owner)
            book_where_is.save()


class BookWhereIs( TimeStamped_Model):
    book= models.OneToOneField(Book,related_name="where_is",help_text=_("Da chi sta"))
    user = models.ForeignKey(User)
    
    #def __unicode__(self):
    #    return self.user
    
    class Meta:
        ordering = ['-modified']

    def save(self,*args, **kwargs):
        #print self.user
    # Place code here, which is excecuted the same
        # time the ``pre_save``-signal would be
        if self.pk:
            update = True
            old_obj = BookWhereIs.objects.get(pk=self.pk)
        # Call parent's ``save`` function
        super(BookWhereIs, self).save(*args, **kwargs)
        try:
            update
        except NameError:
            update = None
        if update :
            if old_obj.user != self.user:
                new_entry = BookHistory(book=self.book,took_from=old_obj.user,given_to=self.user)
                new_entry.save()
                #print self.book.owner
                mail_to=old_obj.user.email
                subject = "Colibri notification - %s %s " % (self.book.title, self.book.author)
                message = "%s ha preso in prestito il libro " % self.user.username
                message += "Puoi contattarlo all'indirizzo email: %s " % self.user.email
                if self.book.owner != self.user:
                    send_mail(subject, message, 'booksharing@colibri.org',[mail_to], fail_silently=False)
                

        
class BookHistory( TimeStamped_Model):
    book= models.ForeignKey(Book)
    took_from = models.ForeignKey(User,related_name="took_from",help_text=_("Preso da"))
    given_to = models.ForeignKey(User,related_name="given_to",help_text=_("Dato a"))
    
    #def __unicode__(self):
    #    return self.book
    
    class Meta:
        ordering = ['-modified']
        

            