from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework.authtoken import views


admin.autodiscover()

#from books import views

urlpatterns = patterns('books.views',
    
    #url(r'^$', 'ui_index',name='ui-index'),
    
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
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    #url(r'^docs/', include('rest_framework_swagger.urls')),
    
)  

urlpatterns += patterns('profiles.views',
    url(r'^api/v1/account/login/$', 'account_login', name='api_account_login'),
    url(r'^api/v1/account/logout/$', 'account_logout', name='api_account_logout'),
    url(r'^api/v1/account/signin/$', 'account_signin', name='api_account_signin'),
    url(r'^api/v1/account/password/reset/$', 'account_password_reset_request_key', name='api_account_password_reset_request_key'),
    url(r'^api/v1/account/password/reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<key>.+)/$', 'account_password_reset_from_key', name='api_account_password_reset_from_key'),
    url(r'^api/v1/user_profile/$', 'user_profile_list' ,name='user_profile_list'),
    url(r'^api/v1/(?P<user>[-\w]+)/user_profile/$', 'user_profile_detail' ,name='user_profile_detail'),
    url(r'^sendmail/$', 'send_mail_api', name='api_send_mail'),

)

urlpatterns += patterns('ui.views',
    url(r'^$', 'ui_index',name='ui-index'),

)

urlpatterns += patterns('angular.views',
    url(r'^angular', 'angular_index',name='angular_index'),

)

urlpatterns += patterns('profiles.html_views',
    url(r'^account/password/reset/(?P<uidb36>[0-9A-Za-z]+)-(?P<key>.+)/$',
            'password_reset_from_key',
            name='account_password_reset_from_key'),

) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


#if settings.DEBUG:
#       urlpatterns += patterns(
#                'django.views.static',
#                (r'media/(?P<path>.*)',
#                'serve',
#                {'document_root': settings.MEDIA_ROOT}), )


