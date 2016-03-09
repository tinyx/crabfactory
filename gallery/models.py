from django.db import models

# Create your models here.
class Image(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, help_text='The name of the image')
    description = models.TextField(null=True, blank=True, help_text='The description that will appear under the image')
    category = models.ForeignKey('Category', help_text='The category of this image')
    order = models.IntegerField(default=0, null=False, blank=False, help_text='The order of this image under the category')
    annotation = models.TextField(null=True, blank=True, help_text='Write something to remind you which image this is')
    image_file = models.ImageField(null=False, blank=False, max_length=5000, help_text='The image file')

class Category(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, help_text='The name of the category')
    order = models.IntegerField(default=0, null=False, blank=False, help_text='The order of this category')
