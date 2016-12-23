import json

from django.http import HttpResponse
from rest_framework import generics

from wow_monitor.models import Character, SimcRank


def simc_ranks(request, server_name, name):
    character = Character.objects.filter(server_name=server_name, name=name)
    if character:
        result = []
        for simc in SimcRank.objects.filter(character=character).order_by('rating_time'):
            result.append({
                'dps_rank': simc.dps_rank,
                'rating_time': simc.rating_time.isoformat()
            })
        return HttpResponse(json.dumps(result),\
                            content_type='application/json')
    return HttpResponse(json.dumps([]), content_type='application/json')
