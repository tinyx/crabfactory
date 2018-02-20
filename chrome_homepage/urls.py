from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns

from chrome_homepage import views

urlpatterns = patterns('',
    url(r'(?P<profile_guid>[-\w]+)/$', views.ChromeHomepage.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
