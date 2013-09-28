from todolist.models import Event, EventClass
from django.views.generic.base import TemplateView

class TodoIndexView(TemplateView):
    title = None

    def get_context_data(self,**kwargs):
        context = super(TodoIndexView, self).get_context_data(**kwargs)
        title = self.title
        context['title'] = title
        return context

def get_event_classes(request, user_id):
    """
    Get the classes of the given user id
    """
    return True

def get_events(request, user_id, class_id):
    """
    Get the events of the given class id
    """
    return True

def add_event_class(request, user_id):
    return True

def add_event(request, user_id, class_id):
    return True

def update_event_class(request, class_id):
    return True

def update_event(request, event_id):
    return True

def remove_event_class(request, class_id):
    return True

def remove_event(request, event_id):
    return True

def update_event_classes_order(request, user_id):
    return True

def update_events_order(request, user_id, class_id):
    return True
