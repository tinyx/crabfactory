from django.conf.urls import patterns, url
from webresume import views

urlpatterns = patterns('',
    url(r'^person/$', views.PersonCreate.as_view()),
    url(r'^person/(?P<pk>[0-9]+)/$', views.PersonDetail.as_view()),
    url(r'^education/$', views.EducationCreate.as_view()),
    url(r'^education/(?P<pk>[0-9]+)/$', views.EducationDetail.as_view()),
    url(r'^work_experience/$', views.WorkExperienceCreate.as_view()),
    url(r'^work_experience/(?P<pk>[0-9]+)/$', views.WorkExperienceDetail.as_view()),
    url(r'^skill/$', views.SkillCreate.as_view()),
    url(r'^skill/(?P<pk>[0-9]+)/$', views.SkillDetail.as_view()),
    url(r'^project_in_edu/$', views.ProjectInEducationCreate.as_view()),
    url(r'^project_in_edu/(?P<pk>[0-9]+)/$', views.ProjectInEducationDetail.as_view()),
    url(r'^project_in_exp/$', views.ProjectInExperienceCreate.as_view()),
    url(r'^project_in_exp/(?P<pk>[0-9]+)/$', views.ProjectInExperienceDetail.as_view()),
)
