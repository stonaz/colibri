from django import forms
from django.forms import widgets
from django.contrib.auth.models import User

from books.models import Book,UserProfile

class BookForm(forms.ModelForm):
    

    # An inline class to provide additional information on the form.
    class Meta:
        # Provide an association between the ModelForm and a model
        model = Book
        exclude=['user']
        
class DeleteBookForm(forms.ModelForm):
    class Meta:
        model = Book
        exclude=['user']


class UserForm(forms.ModelForm):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'password', 'email', )


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('address','phone', 'picture','public_email',)