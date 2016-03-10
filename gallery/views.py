from django.shortcuts import render
from django.http import Http404
from django.views.generic import TemplateView

from gallery.models import Category

# Create your views here.

class GalleryView(TemplateView):
    template_name = 'gallery.html'

    def get_context_data(self, **kwargs):
        category_name = kwargs.get('category')
        category = Category.objects.filter(name__iexact=category_name).first()
        if not category:
            category = Category.objects.all().order_by('order').first()
        context = super(GalleryView, self).get_context_data(**kwargs)
        context['current_category'] = category
        context['categories'] = Category.objects.all().order_by('order')
        context['images'] = category.image_set.all().order_by('order')
        return context
