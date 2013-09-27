from todolist.models import Event, EventClass

def get_event_classes(request, user_id):
    return True

def get_events(request, user_id, class_id):
    return True

def add_event_class(request, user_id):
    return True

def add_event(request, user_id, class_id):
    return True

def remove_event_class(request, class_id):
    return True

def remove_event(request, event_id):
    return True

def update_event_classes_order(request, user_id):
    return True

def update_events_order(request, user_id, class_id):
    return True
