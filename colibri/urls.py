from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from books.views import BookList

urlpatterns = patterns('',
    # Examples:
    url(r'^books/$', BookList.as_view()),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
