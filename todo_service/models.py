from django.db import models
from django.contrib.auth.models import User

class EventClass(models.Model):
    owner = models.ForeignKey(User, related_name='todo_service_eventclass_user')
    name = models.CharField(max_length = 20)

    def __unicode__(self):
        return '%s:%s' % (self.owner, self.name)

    class Meta:
        verbose_name = 'Event Class'
        verbose_name_plural = 'Event Classes'

        
class Event(models.Model):
    owner = models.ForeignKey(User)
    eventclass = models.ForeignKey(EventClass)
    priority = models.IntegerField(default = 0)
    content = models.TextField()
    duedate = models.DateField()
    done = models.BooleanField(default = False)

    def __unicode__(self):
        return '%s' % (self.content)

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

