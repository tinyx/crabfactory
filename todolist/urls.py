from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from todolist import views

urlpatterns = patterns('',
    url(r'^cover/$', \
        TemplateView.as_view(template_name='todo_cover.html'), name='todo_cover'),
    url(r'^login/$', views.todo_login, name='todo_login'),
    url(r'^reg/$', views.todo_reg, name='todo_reg'),
    url(r'^main/$', \
        login_required(TemplateView.as_view(template_name='todo_main.html')), name='todo_main'),
)
