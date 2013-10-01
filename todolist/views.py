from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.db.models import F
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic.base import TemplateView
from todolist.models import Event, EventClass
from todolist.forms import TodoUserForm
from todolist import constants
import json

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
        error_info = constants.NAME_PASSWORD_DOESNT_MATCH_MSG
    logout(request)
    return render_to_response('todo_login.html',\
                              {'error_info': error_info, },\
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
        if todo_user_form.is_valid():
            new_user = todo_user_form.save()
            # Create the 'Default' Class for the new user
            default_class = EventClass.objects.create(name='Default', order='0', user=new_user)
            new_user = authenticate(username=request.POST['username'],\
                                    password=request.POST['password1'])
            login(request, new_user)
            return HttpResponseRedirect(reverse('todo_main'))
        error_info = todo_user_form.errors
    return render_to_response('todo_reg.html', \
                              {'error_info': error_info, }, \
                              RequestContext(request))

def get_event_classes(request):
    """
    Get the classes of the given user id
    """
    if request.user.is_authenticated():
        response = {}
        response['data'] = map(lambda x: {  'id': x.id,\
                                            'name': x.name,\
                                            'order': x.order,},
                               EventClass.objects.filter(user=request.user)\
                                                    .order_by('order'))
        return HttpResponse(json.dumps(response),\
                            content_type='application/json')
    return render_to_response('todo_login.html',\
                              {'error_info': constants.SESSION_EXPIRED_MSG, },\
                              RequestContext(request))

def add_event_class(request):
    """
    Add a new event class to the given user
    """
    if request.user.is_authenticated():
        class_name = request.POST.get('className', None)
        class_order = request.POST.get('order', None)
        new_event_class = EventClass.objects.\
                                create( user=request.user,
                                        name=class_name,
                                        order=class_order)
        response = {}
        response['data'] = new_event_class.id
        return HttpResponse(json.dumps(response),\
                            content_type='application/json')
    return render_to_response('todo_login.html',\
                              {'error_info': constants.SESSION_EXPIRED_MSG, },\
                              RequestContext(request))

def update_event_classes_order(request):
    """
    Update the order of the event classes of the
    given user. There should be a dictionary in the request
    containing id and order or each event class
    """
    if request.user.is_authenticated():
        for event_class_id in request.POST:
            print event_class_id
            print request.POST[event_class_id]
            EventClass.objects.filter(id=event_class_id).\
                    update(order=request.POST[event_class_id])
        response = {}
        return HttpResponse(json.dumps({}),\
                            content_type='application/json')
    return render_to_response('todo_login.html',\
                              {'error_info': constants.SESSION_EXPIRED_MSG, },\
                              RequestContext(request))

def remove_event_class(request):
    """
    Remove the given event class, and update the
    order of the rest classes
    """
    if request.user.is_authenticated():
        class_id = request.POST.get('classId', None)
        event_class = EventClass.objects.get(id=class_id)
        EventClass.objects.filter(user=request.user).\
                            filter(order__gt=event_class.order).\
                            update(order=F('order')-1)
        event_class.delete()
        return HttpResponse(json.dumps({}),\
                            content_type='application/json')
    return render_to_response('todo_login.html',\
                              {'error_info': constants.SESSION_EXPIRED_MSG, },\
                              RequestContext(request))

def get_events(request, user_id, class_id):
    """
    Get the events of the given class id
    """
    return True

def add_event(request, user_id, class_id):
    return True

def update_event(request, event_id):
    return True

def remove_event(request, event_id):
    return True

def update_events_order(request, user_id, class_id):
    return True
