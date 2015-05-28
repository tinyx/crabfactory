from webresume.models import Person, Education, WorkExperience,\
        Skill, Project
from webresume.serializers import PersonSerializer, EducationSerializer,\
        WorkExperienceSerializer, SkillSerializer, ProjectSerializer
from webresume.permissions import IsOwnerOrReadOnly
from rest_framework import generics, permissions


class CustomedPermissionModel():
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)


class SharedMethodMixin():
    paginate_by = None
    def get_queryset(self):
        user_id = self.request.QUERY_PARAMS.get('user_id', None)
        queryset = self.queryset
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        else:
            queryset = queryset.filter(user=self.request.user)
        return queryset

    def pre_save(self, obj):
        obj.user = self.request.user


class PersonList(SharedMethodMixin, CustomedPermissionModel, generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonDetail(SharedMethodMixin, CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class EducationList(SharedMethodMixin, CustomedPermissionModel, generics.ListCreateAPIView):
    serializer_class = EducationSerializer
    queryset = Education.objects.all().order_by('start_date')


class EducationDetail(SharedMethodMixin, CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all().order_by('start_date')
    serializer_class = EducationSerializer


class WorkExperienceList(SharedMethodMixin, CustomedPermissionModel, generics.ListCreateAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class WorkExperienceDetail(SharedMethodMixin, CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer


class SkillList(SharedMethodMixin, CustomedPermissionModel, generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class SkillDetail(SharedMethodMixin, CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectList(SharedMethodMixin, CustomedPermissionModel, generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetail(SharedMethodMixin, CustomedPermissionModel, generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
