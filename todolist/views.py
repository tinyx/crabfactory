from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic.base import TemplateView
from todolist.models import Event, EventClass
from todolist.forms import TodoUserForm

def todo_login(request):
    """
    If this is a POST request, try to login
    with the given username and password
    Otherwise, return the login page
    """
    error_info = ''
    if request.POST:
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('todo_main'))
        error_info = 'Your username and password doesn\'t match, please try again.'
    logout(request)
    return render_to_response('todo_login.html', \
                              {'error_info': error_info, }, \
                              RequestContext(request))

def todo_reg(request):
    """
    If this is a POST request, try to register
    the user with the given user information
    Otherwise, return the register page
    """
    error_info = ''
    if request.POST:
        todo_user_form = TodoUserForm(request.POST)
        error_info = todo_user_form.errors
        if todo_user_form.is_valid():
            new_user = todo_user_form.save()
            return HttpResponseRedirect(reverse('todo_main'))
    return render_to_response('todo_reg.html', \
                              {'error_info': error_info, }, \
                              RequestContext(request))

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
