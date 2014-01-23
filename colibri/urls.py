from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

from books import views

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.index, name='index'),
    url(r'^books/$', views.book_list,name='books'),
    url(r'^mybooks/$', views.mybooks,name='mybooks'),
    url(r'^add_book/$', views.add_book, name='add_book'),
    url(r'^update_book/(?P<id>\d+)/$', views.update_book, name='update_book'),
    url(r'^delete_book/(?P<id>\d+)/$', views.delete_book, name='delete_book'),
    url(r'^take_book/(?P<id>\d+)/$', views.take_book, name='take_book'),
    url(r'^confirm_book/(?P<id>\d+)/$', views.confirm_book, name='confirm_book'),
    
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    
    url(r'^update_profile/$', views.update_profile, name='update_profile'),
    
    url(r'^api/v1/books/$', views.book_list ,name='book_list'),
    url(r'^api/v1/(?P<user>[-\w\.]+)/books/$', views.user_book_list ,name='user_book_list'),
    url(r'^api/v1/(?P<user>[-\w]+)/holding_books/$', views.user_holding_book_list ,name='user_holding_book_list'),
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
