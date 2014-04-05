from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from todolist.urls import urlpatterns as todolist_url
from webresume.urls import urlpatterns as webresume_url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'crabfactory.views.home', name='home'),
    # url(r'^crabfactory/', include('crabfactory.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^todo/', include(todolist_url)),
    url(r'^webresume/', include(webresume_url)),
)
urlpatterns += staticfiles_urlpatterns()
