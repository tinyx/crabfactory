from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from todolist.models import Event
from datetime import date, timedelta
ALERT_DAYS = [timedelta(-1), timedelta(0), timedelta(1), timedelta(7), timedelta(30)]

class Command(BaseCommand):
    help = """This is a cron job for sending event due alert email everyday.
            You should not run this manually."""
    def handle(self, *args, **options):
        for user in User.objects.all():
            for event in Event.objects.filter(eventclass__user=user):
                if event.duedate - date.today() in ALERT_DAYS:
                    print event
                    # Here is where should send the email
        return
