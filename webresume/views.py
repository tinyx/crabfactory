from webresume.models import Person, Education, WorkExperience,\
        Skill, ProjectInEducation, ProjectInExperience
from webresume.serializers import PersonSerializer, EducationSerializer,\
        WorkExperienceSerializer, SkillSerializer, ProjectInEducationSerializer,\
        ProjectInExperienceSerializer
from webresume.permissions import IsOwnerOrReadOnly, PersonIsOwnerOrReadOnly
from rest_framework import generics, permissions


class CustomedPermissionModel():
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)


class CustomedPermissionModelForPerson():
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          PersonIsOwnerOrReadOnly)


class SharedMethodMixin():
    def get_queryset(self):
        user = self.request.QUERY_PARAMS.get('username', None)
        queryset = self.queryset
        if user is not None:
            queryset = queryset.filter(person__username=user)
        return queryset

    def pre_save(self, obj):
        user = self.request.user
        obj.person = Person.objects.filter(user=user)[0]

class PersonList(CustomedPermissionModelForPerson, generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def pre_save(self, obj):
        obj.user = self.request.user


class PersonDetail(CustomedPermissionModelForPerson, generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class EducationList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()


class EducationDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class WorkExperienceList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class WorkExperienceDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class SkillList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class SkillDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectInEducationList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    queryset = ProjectInEducation.objects.all()
    serializer_class = ProjectInEducationSerializer


class ProjectInEducationDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectInEducation.objects.all()
    serializer_class = ProjectInEducationSerializer


class ProjectInExperienceList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    queryset = ProjectInExperience.objects.all()
    serializer_class = ProjectInExperienceSerializer


class ProjectInExperienceDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectInExperience.objects.all()
    serializer_class = ProjectInExperienceSerializer
