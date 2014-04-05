from django.db import models
from django.contrib.auth.models import User


class Person(models.Model):
    """
    Information of the user itself
    """
    user = models.ForeignKey(User)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=256, unique=True)
    description = models.TextField(null=True, blank=True)
    public = models.BooleanField(default=False)

    def __unicode__(self):
        return "%s %s" % (self.first_name, self.last_name)


class Education(models.Model):
    """
    Information of education
    """
    person = models.ForeignKey(Person)
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    major = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)

    def __unicode__(self):
        return '%s, %s, %s' % (self.name, self.major, self.degree)


class WorkExperience(models.Model):
    """
    Information of experience
    Like companies user stayed
    Or organizations user worked for
    """
    person = models.ForeignKey(Person)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    website = models.TextField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    description = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return '%s, %s' % (self.name, self.title)


class Skill(models.Model):
    """
    Working skills
    """
    AVAILABLE_RANK = (
        (0, 'Know a little'),
        (1, 'Know the basic'),
        (2, 'Familiar with'),
        (3, 'Experienced'),
        (4, 'Mastered'),
    ) # Ranks for the level of mastering
    person = models.ForeignKey(Person)
    name = models.CharField(max_length=100)
    rank = models.IntegerField(choices=AVAILABLE_RANK, default=0)

    def __unicode__(self):
        return '%s' % self.name


class Project(models.Model):
    """
    Projects done by user
    Could be done in education
    Or in experience
    """
    person = models.ForeignKey(Person)
    name = models.CharField(max_length=100)
    website = models.TextField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return '%s' % self.name

    class Meta:
        abstract = True


class ProjectInEducation(Project):
    """
    Projects done in education time
    """
    education = models.ForeignKey(Education)


class ProjectInExperience(Project):
    """
    Projects done in experience time
    """
    work_experience = models.ForeignKey(WorkExperience)
