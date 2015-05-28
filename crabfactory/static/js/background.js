var introduction_displayed = false;
var circle_chart_displayed = false;
var project_displayed = false;
var contact_displayed = false;

//disable css animation before page loaded
$(window).load(function() {
    $("body").removeClass("preload");
});

//initialize jquery.knob
$(function() {
    $(".knob").knob({
        'displayInput': false,
        'height': 400,
        'bgColor': 'rgba(0, 0, 0, 0)',
    });
});

//resize knob objects while resizing the window
var on_resize = function() {
    var win_width = $(window).width();
    var scale_factor = win_width / 1358.0; //'1358' is the width on my screen
                                         //but the factor seems to be a little to small
    $('.skill_container').css({
        'transform': 'scale(' + scale_factor + ')',
        '-moz-transform': 'scale(' + scale_factor + ')',
        '-webkit-transform': 'scale(' + scale_factor + ')',
    });

    var normal_icon_height = $('#intro_icon').width();
    $('#menu_bar').height(normal_icon_height * 1.7); //'1.7' is calculated by 125px / 74px
}

$(document).ready(on_resize);

$(window).bind('resize', on_resize);

var scroll_to = function(anchor) {
    $.scrollTo(anchor, 500, {offset: 5});
};

var display_circle_chart = function(skill_id, skill_value) {
    $(skill_id).animate({value: skill_value}, {
        duration: 1000,
        easing: 'swing',
        step: function() {
            $(skill_id).val(Math.ceil(this.value)).change();
        }
    });
};

var display_all_circle_charts = function() {
    //Frontend skills
    display_circle_chart('#html5', 75);
    display_circle_chart('#css3', 65);
    display_circle_chart('#javascript', 60);
    display_circle_chart('#ui_design', 50);
    display_circle_chart('#angularjs', 30);
    //Backend skills
    setTimeout(function() {
        display_circle_chart('#django', 75);
        display_circle_chart('#postgres', 55);
        display_circle_chart('#asp_dot_net', 40);
    }, 1000);
}

$('#slide-2').waypoint(function() {
    if(!introduction_displayed) {
        introduction_displayed = true;
        $('#introduction_title').fadeOut('slow', function() {
            $('#basic_info_container, #detail_info_container').fadeIn('slow');
        });   
    }
});

$('#slide-3').waypoint(function() {
    if(!circle_chart_displayed) {
        circle_chart_displayed = true;
        $('#skill_title').fadeOut('slow', function() {
            $('#skill_wrapper').fadeIn('slow', function() {
                $('#front_end_icon, #back_end_icon').fadeIn('slow', function() {
                    display_all_circle_charts();
                    $('#front_end_skill_background').delay(1000).fadeIn('slow');
                    $('#back_end_skill_background').delay(2000).fadeIn('slow');
                });
            });
        })
    }
});

$('#slide-4').waypoint(function() {
    if(!project_displayed) {
        project_displayed = true;
        $('#project_title').fadeOut('slow', function() {
            $('#project_menu, #project_content_wrapper').fadeIn('slow');
        });   
    }
});

$('#slide-5').waypoint(function() {
    if(!contact_displayed) {
        contact_displayed = true;
        $('#contact_title').fadeOut('slow', function() {
            $('#boston_map, #contact_me, #postscript, #contact_links').fadeIn('slow');
        });   
    }
});

//play animation when the page is located in slide-3
var circle_chart_content = $('#content_3');
(function($) {
    /*
    var s = skrollr.init({
        render: function(data) {
            if(!circle_chart_displayed) {
                if(circle_chart_content.hasClass('skrollable-after')) {
                    //display circle chart
                    display_all_circle_charts();
                    circle_chart_displayed = true;
                    $('#front_end_skill_background').delay(1000).fadeIn('slow');
                    $('#back_end_skill_background').delay(2000).fadeIn('slow');
                }
            }
        }
    });
    */
})(jQuery)

var projects_info = {
    'todo_list': ['0 0', //project_info_background position
                  '0 0', //project_snap position
                  ['A website managing things to do', //project description
                   'Using Django in the backend',
                   'First time trying LESS',
                   'Design and drawing all images by myself',
                  ]
                 ],
    'crabfactory': ['0 100%',
                    '0 100%',
                  ['The website you are currently exploring',
                   'Mainly focus on the front-end',
                   'Using a lot of CSS3 animations',
                   'Draw all the icons and images by myself',
                  ]
                 ],
    'web_resume': ['100% 0',
                   '100% 0',
                  ['A webpage for quickly creating a personal portfolio',
                   'A project for learning AngularJS',
                   'Combine AngularJS and Django Restful Framework',
                  ]
                 ],
};

var transition_locked = false;

var scroll_up_project = function(project_name) {
        /*
    Things to do:
        1. Append all the elements before the selected one to the end of the list
        2. Move all the items in the list
        3. Add 'selected' class to the selected element
    */
    transition_locked = true;
    var selected_project = $('#' + project_name + '_li');
    var projects = $('#project_list li');
    var last_project = projects.last();
    var index = selected_project.index();
    var previous_projects = selected_project.prevAll();
    previous_projects.each(function(i) {
        var clone_project = $(this).clone();
        clone_project.removeClass('selected');
        clone_project.css('top', 26 * (previous_projects.length - i) + 74 + '%');
        clone_project.insertAfter(last_project);
        clone_project.focus();
    });
    var started_position = -22 - 26 * index;
    $('#project_list li').each(function(i) {
        if (i == 0) {
            $(this).css('top', started_position + '%');
        } else if (i < index) {
            $(this).css('top', 22 + i * 26 + started_position + '%');
        } else if (i == index) {
            $(this).css('top', 0 + '%');
            $(this).addClass('selected');
        } else {
            $(this).css('top', 44 + i * 26 + started_position + '%');
        }
    });
    previous_projects.each(function() {
        $(this).remove();
        transition_locked = false;
    });
}

var scroll_up_project_thread_protecter = function(project_name) {
    if (transition_locked) {
    } else {
        if ($('#' + project_name + '_li').hasClass('selected')) {
        } else {
            scroll_up_project(project_name);
            $('.project_content.selected').removeClass('selected').addClass('out');
            $('#' + project_name +'_content').addClass('selected');
        }
    }
}

var select_project = function(project_name) {
    scroll_up_project_thread_protecter(project_name);
}