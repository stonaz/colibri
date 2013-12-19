from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

from books import views

urlpatterns = patterns('',
    # Examples:
    url(r'^home/$', views.index,name='index'),
    url(r'^books/$', views.BookList.as_view(),name='books'),
    url(r'^add_book/$', views.add_book, name='add_book'), 
    # url(r'^blog/', include('blog.urls')),
    url(r'^register/$', views.register, name='register'),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
        urlpatterns += patterns(
                'django.views.static',
                (r'media/(?P<path>.*)',
                'serve',
                {'document_root': settings.MEDIA_ROOT}), )
