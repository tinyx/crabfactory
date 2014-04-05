from rest_framework import serializers
from webresume.models import Person, Education, WorkExperience,\
        Skill, ProjectInEducation, ProjectInExperience

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'email', 'description')


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('id', 'name', 'start_date', 'end_date', 'major', 'degree')


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = ('id', 'name', 'title', 'website', 'start_date', 'end_date', 'description')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'rank')


class ProjectInEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInEducation
        fields = ('id', 'name', 'website', 'start_date', 'end_date', 'description', 'education')


class ProjectInExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInExperience
        fields = ('id', 'name', 'website', 'start_date', 'end_date', 'description', 'work_experience')

