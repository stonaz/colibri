from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from books import views

urlpatterns = patterns('',
    # Examples:
    url(r'^books/$', views.BookList.as_view(),name='books'),
    url(r'^add_book/$', views.add_book, name='add_book'), # NEW MAPPING!
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
