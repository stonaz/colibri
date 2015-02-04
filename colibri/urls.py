from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework.authtoken import views


admin.autodiscover()

#from books import views

urlpatterns = patterns('books.views',
    
    url(r'^$', 'ui_index',name='ui-index'),
    
    url(r'^api/v1/books/$', 'book_list' ,name='book_list'),
    #url(r'^api/v1/books/(?P<pk>[-\d\.]+)/$', 'book_detail' ,name='book_detail'),
    #url(r'^api/v1/books/(?P<pk>[-\d\.]+)$', 'book_detail' ,name='book_detail'),
    url(r'^api/v1/(?P<user>[-\w\.]+)/books/$', 'user_book_list' ,name='user_book_list'),
    url(r'^api/v1/(?P<user>[-\w\.]+)/books/(?P<pk>[-\d\.]+)/$', 'user_book_detail' ,name='user_book_detail'),
    url(r'^api/v1/(?P<user>[-\w\.]+)/books/(?P<pk>[-\d\.]+)$', 'user_book_detail' ,name='user_book_detail'),
    url(r'^api/v1/book_where_is/(?P<book>[-\d\.]+)/$', 'book_where_is' ,name='book_where_is'),
    url(r'^api/v1/book_where_is/(?P<book>[-\d\.]+)$', 'book_where_is' ,name='book_where_is'),
    url(r'^api/v1/book_history/(?P<book>[-\d\.]+)/$', 'book_history_list' ,name='book_history_list'),
    url(r'^api/v1/(?P<user>[-\w\.]+)/borrowed_books/$', 'user_holding_book_list' ,name='user_holding_book_list'),
    url(r'^api/v1/user_profile/$', 'user_profile_list' ,name='user_profile_list'),
    url(r'^api/v1/(?P<user>[-\w]+)/user_profile/$', 'user_profile_list' ,name='user_profile_list'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token)
)  

urlpatterns += patterns('profiles.views',
    url(r'^api/v1/account/login/$', 'account_login', name='api_account_login'),
    url(r'^api/v1/account/logout/$', 'account_logout', name='api_account_logout'),
    url(r'^api/v1/account/signin/$', 'account_signin', name='api_account_signin'),
    url(r'^sendmail/$', 'send_mail_api', name='api_send_mail'),

    #url(r'^sendmail/$', 'SendMail', name='api_send_mail'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


#if settings.DEBUG:
#       urlpatterns += patterns(
#                'django.views.static',
#                (r'media/(?P<path>.*)',
#                'serve',
#                {'document_root': settings.MEDIA_ROOT}), )


