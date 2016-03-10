from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from gallery.views import GalleryView

urlpatterns = patterns('',
    url(r'^(?P<category>[\w ]+)/$', GalleryView.as_view(), name='gallery_view'),
)
