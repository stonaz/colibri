from django import forms
from django.contrib.auth.models import User

from books.models import Book,UserProfile

class BookForm(forms.ModelForm):
    title = forms.CharField(max_length=128, help_text="Titolo:")
    author = forms.CharField(max_length=128, help_text="Autore:")

    # An inline class to provide additional information on the form.
    class Meta:
        # Provide an association between the ModelForm and a model
        model = Book


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('address','phone', 'picture')