from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from todo_service.models import Event, EventClass
from todo_service.serializers import EventSerializer, EventClassSerializer
from todo_service.permissions import IsOwner


# Create your views here.
class EventClassList(generics.ListCreateAPIView):
    queryset = EventClass.objects.all()
    serializer_class = EventClassSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventClassDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventClass.objects.all()
    serializer_class = EventClassSerializer
    permission_classes = (IsAuthenticated, IsOwner)


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated, IsOwner)
