from django.db import models
from django.contrib.auth.models import User

class EventClass(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length = 20)
    order = models.IntegerField()

    def __unicode__(self):
        return '%s:%s' % (self.user, self.name)

    @classmethod
    def get_classes_by_user(cls, user):
        """
        Return a list of eventclasses based on
        the given user id
        """
        return cls.objects.filter(user__pk=user)

    class Meta:
        verbose_name = 'Event Class'
        verbose_name_plural = 'Event Classes'

class Event(models.Model):
    HIGH = 'H'
    MEDIUM = 'M'
    NORMAL = 'N'
    LOW = 'L'
    EVENT_PRIORITY_LIST = (
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (NORMAL, 'Normal'),
        (LOW, 'Low'),
    )
    eventclass = models.ForeignKey(EventClass)
    order = models.IntegerField()
    priority = models.CharField(max_length = 20, \
                                choices = EVENT_PRIORITY_LIST, default = NORMAL)
    content = models.TextField()
    duedate = models.DateTimeField()
    done = models.BooleanField(default = False)

    def __unicode__(self):
        return '%s' % (self.content)

    def to_dict(self):
        """
        Return the information of the event
        in the format of dictionary
        """
        return {
            'order': self.order,
            'priority': self.priority,
            'content': self.content,
            'duedate': self.duedate,
            'done': self.done,
        }

    @classmethod
    def get_events_by_class(cls, eventclass):
        """
        Return a list of events based on the
        given eventclass id
        """
        return map(lambda x: x.to_dict() \
                   for x in cls.objects.filter(eventclass__pk=eventclass))

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

