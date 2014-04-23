from django.contrib import admin
from webresume.models import Person, Education, WorkExperience,\
        Skill, Project


class PersonAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'public')
    search_fields = ('first_name', 'last_name')
    list_filter = ('public',)


class EducationAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'start_date', 'end_date', 'major', 'degree')
    search_fields = ('name',)
    list_filter = ('major', 'degree',)


class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'title', 'start_date', 'end_date')
    search_fields = ('name',)


class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'rank')
    search_fields = ('name',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'start_date', 'end_date')
    search_fields = ('name',)


admin.site.register(Person, PersonAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(WorkExperience, WorkExperienceAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Project, ProjectAdmin)
