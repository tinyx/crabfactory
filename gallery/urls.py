from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from gallery.views import GalleryView, MotionView

urlpatterns = patterns('',
    url(r'^cn/$', GalleryView.as_view(template_name='gallery_cn.html'), name='gallery_view'),
    url(r'^cn/motion/$', MotionView.as_view(template_name='motion_cn.html'), name='gallery_view'),
    url(r'^cn/(?P<category>[\w ]+)/$', GalleryView.as_view(template_name='gallery_cn.html'), name='gallery_view'),
    url(r'^$', GalleryView.as_view(), name='gallery_view'),
    url(r'^motion/$', MotionView.as_view(), name='motion_view'),
    url(r'^(?P<category>[\w ]+)/$', GalleryView.as_view(), name='gallery_view')
)
