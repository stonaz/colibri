from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

from books import views

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.user_login, name='login'),
    url(r'^books/$', views.book_list,name='books'),
    url(r'^add_book/$', views.add_book, name='add_book'), 
    # url(r'^blog/', include('blog.urls')),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
        urlpatterns += patterns(
                'django.views.static',
                (r'media/(?P<path>.*)',
                'serve',
                {'document_root': settings.MEDIA_ROOT}), )