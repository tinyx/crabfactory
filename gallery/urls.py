from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from gallery.views import GalleryView, MotionView

urlpatterns = patterns('',
    url(r'^$', GalleryView.as_view(), name='gallery_view'),
    url(r'^motion/$', MotionView.as_view(), name='motion_view'),
    url(r'^(?P<category>[\w ]+)/$', GalleryView.as_view(), name='gallery_view')
)
