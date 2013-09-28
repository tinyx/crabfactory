from django.conf.urls import patterns, include, url
from todolist import views

urlpatterns = patterns('',
    url(r'^cover/$', views.TodoIndexView.as_view(template_name='todo_cover.html',
                                         title='2do-List'), name='todo_cover'),
    url(r'^login/$', views.TodoIndexView.as_view(template_name='todo_cover.html',
                                         title='2do-List | Login'), name='todo_login'),
    url(r'^reg/$', views.TodoIndexView.as_view(template_name='todo_cover.html',
                                         title='2do-List | Register'), name='todo_reg'),
    url(r'^main/$', views.TodoIndexView.as_view(template_name='todo_cover.html',
                                         title='2do-List'), name='todo_main'),

)
