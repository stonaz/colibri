from django.shortcuts import render,render_to_response,get_object_or_404
from django.template import RequestContext

from books.models import Book

def angular_index(request):    
    context = RequestContext(request)
    count = Book.objects.count()
    
    return render_to_response(
            'angular/index.html', {'count':count},context
)
