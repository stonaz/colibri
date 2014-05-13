from django.contrib import admin
from models import Book,BookHistory,UserProfile

# Register your models here.
admin.site.register(Book)
admin.site.register(BookHistory)
admin.site.register(UserProfile)