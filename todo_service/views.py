from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from todo_service.models import Event, EventClass
from todo_service.serializers import EventSerializer, EventClassSerializer
from todo_service.permissions import IsOwner


# Create your views here.
class EventClassList(generics.ListCreateAPIView):
    serializer_class = EventClassSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return EventClass.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventClassDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventClassSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return EventClass.objects.filter(owner=self.request.user)


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)
