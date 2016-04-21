from todolist.models import Event, EventClass

class EventClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventClass
        fields = ('id', 'user', 'name', 'order')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'eventclass', 'order', 'priority', 'content', 'duedate', 'done')