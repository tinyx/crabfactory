from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve

from crabfactory.views import create_user
from chrome_homepage.urls import urlpatterns as chrome_homepage_url
from gallery.urls import urlpatterns as gallery_url
from rest_framework_jwt.views import obtain_jwt_token
from todolist.urls import urlpatterns as todolist_url
from todo_service.urls import urlpatterns as todo_service_url
from wow_monitor.urls import urlpatterns as wow_monitor_url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    # Examples:
    # url(r'^$', 'crabfactory.views.home', name='home'),
    # url(r'^crabfactory/', include('crabfactory.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^todo/', include(todolist_url)),
    url(r'^todo-api/', include(todo_service_url)),
    url(r'^wow-monitor/', include(wow_monitor_url)),
    url(r'^chrome-homepage/', include(chrome_homepage_url)),
    url(r'gallery/', include(gallery_url)),
    url(r'^filer/', include('filer.urls')),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-register/', create_user),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
