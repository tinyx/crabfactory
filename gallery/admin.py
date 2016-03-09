from django.contrib import admin

from gallery.models import Image, Category

# Register your models here.
class ImageAdmin(admin.ModelAdmin):
    pass

class ImageInline(admin.TabularInline):
    model = Image

class CategoryAdmin(admin.ModelAdmin):
    inlines = [ImageInline]

admin.site.register(Image)
admin.site.register(Category)
