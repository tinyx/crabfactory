from django.views.generic import TemplateView
from django.http import Http404

from crabfactory.models import Profile


class ChromeHomepage(TemplateView):
    template_name = 'chrome_homepage.html'

    def get_context_data(self, **kwargs):
        profile_guid = kwargs.get('profile_guid')
        print profile_guid
        try:
            Profile.objects.get(guid=profile_guid)
            return super(ChromeHomepage, self).get_context_data(**kwargs)
        except Profile.DoesNotExist:
          raise Http404
