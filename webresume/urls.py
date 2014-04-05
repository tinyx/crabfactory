from django.conf.urls import patterns, url
from webresume import views

urlpatterns = patterns('',
    url(r'^person/$', views.PersonList.as_view()),
    url(r'^person/(?P<pk>[0-9]+)/$', views.PersonDetail.as_view()),
    url(r'^education/$', views.EducationList.as_view()),
    url(r'^education/(?P<pk>[0-9]+)/$', views.EducationDetail.as_view()),
    url(r'^work_experience/$', views.WorkExperienceList.as_view()),
    url(r'^work_experience/(?P<pk>[0-9]+)/$', views.WorkExperienceDetail.as_view()),
    url(r'^skill/$', views.SkillList.as_view()),
    url(r'^skill/(?P<pk>[0-9]+)/$', views.SkillDetail.as_view()),
    url(r'^project_in_edu/$', views.ProjectInEducationList.as_view()),
    url(r'^project_in_edu/(?P<pk>[0-9]+)/$', views.ProjectInEducationDetail.as_view()),
    url(r'^project_in_exp/$', views.ProjectInExperienceList.as_view()),
    url(r'^project_in_exp/(?P<pk>[0-9]+)/$', views.ProjectInExperienceDetail.as_view()),
)
