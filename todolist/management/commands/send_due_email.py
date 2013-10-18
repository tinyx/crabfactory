from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = """This is a cron job for sending event due alert email everyday.
            You should not run this manually."""
    def handle(self, *args, **options):
        for user in User.objects.all():
            print user
        return
