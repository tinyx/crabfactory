from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns

from wow_monitor import views

urlpatterns = patterns('',
    url(r'(?P<server_name>\w+)/(?P<name>\w+)/$', views.simc_ranks),
)

urlpatterns = format_suffix_patterns(urlpatterns)
