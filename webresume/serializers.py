from rest_framework import serializers
from webresume.models import Person, Education, WorkExperience,\
        Skill, Project


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'email', 'description', 'public')


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


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'website', 'start_date', 'end_date', 'description')
