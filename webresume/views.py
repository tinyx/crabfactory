from webresume.models import Person, Education, WorkExperience,\
        Skill, ProjectInEducation, ProjectInExperience
from webresume.serializers import PersonSerializer, EducationSerializer,\
        WorkExperienceSerializer, SkillSerializer, ProjectInEducationSerializer,\
        ProjectInExperienceSerializer
from webresume.permissions import IsOwnerOrReadOnly
from rest_framework import generics, permissions


class CustomedPermissionModel():
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)


class PersonCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = PersonSerializer


class PersonDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class EducationCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = EducationSerializer


class EducationDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class WorkExperienceCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = WorkExperienceSerializer


class WorkExperienceDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class SkillCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = SkillSerializer


class SkillDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectInEducationCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = ProjectInEducationSerializer


class ProjectInEducationDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectInEducation.objects.all()
    serializer_class = ProjectInEducationSerializer


class ProjectInExperienceCreate(CustomedPermissionModel, generics.CreateAPIView):
    serializer_class = ProjectInExperienceSerializer


class ProjectInExperienceDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectInExperience.objects.all()
    serializer_class = ProjectInExperienceSerializer
