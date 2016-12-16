from django.contrib import admin

from models import Character

class CharacterAdmin(admin.ModelAdmin):
    pass

admin.site.register(Character)
