from django.contrib import admin

from gallery.models import Image, Category

# Register your models here.
class ImageAdmin(admin.ModelAdmin):
    pass

class ImageInline(admin.StackedInline):
    extra = 1
    model = Image

class CategoryAdmin(admin.ModelAdmin):
    inlines = [ImageInline,]

admin.site.register(Image)
admin.site.register(Category, CategoryAdmin)
