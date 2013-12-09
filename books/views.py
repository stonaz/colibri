from django.shortcuts import render
from django.views.generic import ListView

from .models import Book

# Create your views here.

class BookList(ListView):
    model = Book
