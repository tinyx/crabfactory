from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from webresume import views

urlpatterns = patterns('',
    url(r'^person/?$', views.PersonList.as_view(), name='person_list'),
    url(r'^person/(?P<pk>[0-9]+)/?$', views.PersonDetail.as_view(), name='person_detail'),
    url(r'^education/?$', views.EducationList.as_view(), name='education_list'),
    url(r'^education/(?P<pk>[0-9]+)/?$', views.EducationDetail.as_view(), name='education_detail'),
    url(r'^work_experience/?$', views.WorkExperienceList.as_view(), name='work_experience_list'),
    url(r'^work_experience/(?P<pk>[0-9]+)/?$', views.WorkExperienceDetail.as_view(), name='work_experience_detail'),
    url(r'^skill/?$', views.SkillList.as_view(), name='skill_list'),
    url(r'^skill/(?P<pk>[0-9]+)/?$', views.SkillDetail.as_view(), name='skill_detail'),
    url(r'^project/?$', views.ProjectList.as_view(), name='project_list'),
    url(r'^project/(?P<pk>[0-9]+)/?$', views.ProjectDetail.as_view(), name='project_detail'),
    url(r'^edit/?$', login_required(TemplateView.as_view(template_name='webresume_edit.html')), name='webresume_edit'),
)
