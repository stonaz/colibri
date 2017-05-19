from django.shortcuts import render,render_to_response,get_object_or_404
from django.template import RequestContext
from django.conf import settings

from books.models import Book

def angular_index(request):    
    context = RequestContext(request)
    count = Book.objects.count()
    SITE_URL = settings.SITE_URL
    return render_to_response(
            'angular/index.html', {'count':count,'SITE_URL':SITE_URL},context
)
