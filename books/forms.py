from django import forms
from books.models import Book

class BookForm(forms.ModelForm):
    title = forms.CharField(max_length=128, help_text="Titolo:")
    author = forms.CharField(max_length=128, help_text="Autore:")

    # An inline class to provide additional information on the form.
    class Meta:
        # Provide an association between the ModelForm and a model
        model = Book