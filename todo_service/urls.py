from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns

from todo_service import views

urlpatterns = patterns('',
    url(r'^event-class/$', views.EventClassList.as_view()),
    url(r'^event-class/(?P<pk>[0-9]+)/$', views.EventClassDetail.as_view()),
    url(r'^event/$', views.EventList.as_view()),
    url(r'^event/(?P<pk>[0-9]+)/$', views.EventDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
