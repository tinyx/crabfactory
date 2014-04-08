from webresume.models import Person, Education, WorkExperience,\
        Skill, Project
from webresume.serializers import PersonSerializer, EducationSerializer,\
        WorkExperienceSerializer, SkillSerializer, ProjectSerializer
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
        user_id = self.request.QUERY_PARAMS.get('user_id', None)
        queryset = self.queryset
        if user_id is not None:
            queryset = queryset.filter(person__user__id=user_id)
        return queryset

    def pre_save(self, obj):
        user = self.request.user
        obj.person = Person.objects.filter(user=user)[0]

class PersonList(CustomedPermissionModelForPerson, generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def get_queryset(self):
        user_id = self.request.QUERY_PARAMS.get('user_id', None)
        queryset = self.queryset
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        return queryset

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


class ProjectList(CustomedPermissionModel, generics.ListCreateAPIView, SharedMethodMixin):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetail(CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
