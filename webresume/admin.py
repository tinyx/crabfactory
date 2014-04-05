from django.contrib import admin
from webresume.models import Person, Education, WorkExperience,\
        Skill, ProjectInEducation, ProjectInExperience


class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'public')
    search_fields = ('first_name', 'last_name')
    list_filter = ('public',)


class EducationAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'major', 'degree')
    search_fields = ('name',)
    list_filter = ('major', 'degree',)


class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'start_date', 'end_date')
    search_fields = ('name',)


class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank')
    search_fields = ('name',)


class ProjectInEducationAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'education')
    search_fields = ('name',)


class ProjectInExperienceAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'work_experience')
    search_fields = ('name',)

admin.site.register(Person, PersonAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(WorkExperience, WorkExperienceAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(ProjectInEducation, ProjectInEducationAdmin)
admin.site.register(ProjectInExperience, ProjectInExperienceAdmin)
