from django.shortcuts import render
from django.http import Http404
from django.views.generic import TemplateView
from rest_framework import generics

from gallery.models import Category, Image
from gallery.serializers import CategorySerializer, ImageSerializer

# Create your views here.

class GalleryView(TemplateView):
    template_name = 'gallery.html'

    def get_context_data(self, **kwargs):
        category_name = kwargs.get('category')
        category = Category.objects.filter(name__iexact=category_name).first()
        if not category:
            category = Category.objects.all().order_by('order').first()
        if not category:
            raise Http404
        context = super(GalleryView, self).get_context_data(**kwargs)
        context['current_category'] = category
        context['categories'] = Category.objects.all().order_by('order')
        context['images'] = category.image_set.all().order_by('order')
        return context

class MotionView(TemplateView):
    template_name = 'motion.html'

    def get_context_data(self, **kwargs):
        context = super(MotionView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all().order_by('order')
        context['current_category'] = 'motion'
        return context

class CategoryListView(generics.ListAPIView):
    permission_classes = ()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all().order_by('order')

class ImageListView(generics.ListAPIView):
    permission_classes = ()
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.all().order_by('order')
