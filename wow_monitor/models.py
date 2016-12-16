from django.db import models


class Character(models.Model):
    name = models.CharField(max_length=250)
    server_name = models.CharField(max_length=250)
    head = models.TextField(blank=True, null=True)
    neck = models.TextField(blank=True, null=True)
    back = models.TextField(blank=True, null=True)
    chest = models.TextField(blank=True, null=True)
    wrist = models.TextField(blank=True, null=True)
    hands = models.TextField(blank=True, null=True)
    waist = models.TextField(blank=True, null=True)
    legs = models.TextField(blank=True, null=True)
    feet = models.TextField(blank=True, null=True)
    finger1 = models.TextField(blank=True, null=True)
    finger2 = models.TextField(blank=True, null=True)
    trinket1 = models.TextField(blank=True, null=True)
    trinket2 = models.TextField(blank=True, null=True)
    mainHand = models.TextField(blank=True, null=True)
    artifactTraits = models.TextField(blank=True, null=True)

