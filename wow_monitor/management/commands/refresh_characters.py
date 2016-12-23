from django.core.management.base import BaseCommand
from wow_monitor.models import Character, SimcRank

class Command(BaseCommand):
    help = """This is a cron job for refreshing all wow characters."""
    def handle(self, *args, **options):
        for c in Character.objects.all():
            updated = False
            print 'Checking {}'.format(c.name)
            old_c_dict = c.to_dict()
            new_c_dict = c.fetch_from_battlenet().to_dict()
            for key in old_c_dict:
                if new_c_dict[key] != old_c_dict[key]:
                    updated = True
                    # Run simc here
            if not updated:
                print 'Nothing changed for character {}'.format(c.name)
            else:
                print 'Difference found for character {}'.format(c.name)
        return
