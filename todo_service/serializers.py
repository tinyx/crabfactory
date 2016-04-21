from rest_framework import serializers

from todo_service.models import Event, EventClass

class EventClassSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = EventClass
        fields = ('id', 'owner', 'name')

class EventSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Event
        fields = ('id', 'owner', 'eventclass', 'priority', 'content', 'duedate', 'done')