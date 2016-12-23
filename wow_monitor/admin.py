from django.contrib import admin

from models import Character, SimcRank

class CharacterAdmin(admin.ModelAdmin):
    pass

class SimcRankAdmin(admin.ModelAdmin):
    pass

admin.site.register(Character)
admin.site.register(SimcRank)
