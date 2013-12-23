from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

from books import views

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.index, name='index'),
    url(r'^books/$', views.book_list,name='books'),
    url(r'^add_book/$', views.add_book, name='add_book'),
    url(r'^update_book/(?P<id>\d+)/$', views.update_book, name='update_book'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    
    url(r'^api/v1/books/$', views.book_list ,name='book_list'),
    url(r'^api/v1/(?P<user>[-\w]+)/books/$', views.user_book_list ,name='user_book_list'),
    url(r'^api/v1/user_profile/$', views.user_profile_list ,name='user_profile_list'),
    url(r'^api/v1/(?P<user>[-\w]+)/user_profile/$', views.user_profile_list ,name='user_profile_list'),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
        urlpatterns += patterns(
                'django.views.static',
                (r'media/(?P<path>.*)',
                'serve',
                {'document_root': settings.MEDIA_ROOT}), )
