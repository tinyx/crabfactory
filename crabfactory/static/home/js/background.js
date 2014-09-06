var circle_chart_displayed = false;

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
    var scale_factor = win_width / 1413; //'1213' is the width on my screen
                                         //but the factor seems to be a little to small
    $('#front_end_skill, #back_end_skill').css({
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
    $.scrollTo(anchor, 500);
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

//play animation when the page is located in slide-3
var circle_chart_content = $('#content_3');
(function($) {
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
                  ['The website you are currently exporing',
                   'Mainly focus on front-end',
                   'Using a lot of CSS3 animations',
                   'Draw all the icons and images by myself',
                  ]
                 ],
    'web_resume': ['100% 0',
                   '100% 0',
                  ['A webpage for quickly creating a personal portfolio',
                   'A project for trying trying AngularJS',
                   'Combine AngularJS and Django Restful Framework',
                  ]
                 ],
};

var display_project = function(project_name) {
    //make content visible
    $('#project_content').css('display', 'block');
    
    //hide other logos
    $('.project_icons').not('#' + project_name + '_icon').fadeOut();

    //move logo to the correct position
    $('#' + project_name + '_icon').animate({
        'left': '23%',
    }, function() {
        display_project_details(project_name);
    });
}

var display_project_details = function(project_name) {
    var project_info = projects_info[project_name];

    //pre-calc
    var project_locator_background = $('#project_locator_background');
    project_locator_background.css({
        'background-position': project_info[0],
    });
    
    var project_snap = $('#project_snap');
    project_snap.css({
        'background-position': project_info[1],
    });
    
    var project_description = $('#project_description');
    for(var index in project_info[2]) {
        project_description.append($('<p/>').text(project_info[2][index]));
    }
    /*
    To play the animations one by one, the functions need to be nested
    */
    //display locator
    var project_locator = $('#project_locator');
    project_locator.removeClass('project_animation_standby').addClass('project_locator_focus');
    project_locator.one('webkitAnimationEnd mozAnimationEnd animationend', function(e) {
        project_locator.removeClass('project_locator_focus');
        
        //display locator_background
        project_locator_background.removeClass('project_animation_standby').addClass('project_fade_in');
        project_locator_background.one('webkitAnimationEnd mozAnimationEnd animationend', function(e) {
            project_locator_background.removeClass('project_fade_in');
            
            //display snapshot
            project_snap.removeClass('project_animation_standby').addClass('project_snap_slide_in');
            project_snap.one('webkitAnimationEnd mozAnimationEnd animationend', function(e) {
                project_snap.removeClass('project_snap_slide_in');
                
                //display description
                project_description.removeClass('project_animation_standby').addClass('project_description_flip');
                project_description.one('webkitAnimationEnd mozAnimationEnd animationend', function(e) {
                    project_description.removeClass('project_description_flip');
                    
                    //display back button
                    var project_back = $('#project_back');
                    project_back.removeClass('project_animation_standby').addClass('project_fade_in');
                    project_back.one('webkitAnimationEnd mozAnimationEnd animationend', function(e) {
                        project_back.removeClass('project_fade_in');
                    });
                });
            });
        });
    });
    
}

var back_to_project_menu = function() {
    //make detail elements invisible
    $("#project_locator, #project_locator_background, #project_snap, #project_description, #project_back").addClass('project_animation_standby');
    //clear description node
    $('#project_description').empty();
    //remove all the content
    $('#project_content').css('display', 'none');
    //reset the position of the icons
    /*
    This is really ugly, but so far I have no better ideas
    */
    $('#crabfactory_icon').animate({
        'left': '20%',
    });
    $('#todo_list_icon').animate({
        'left': '44%',
    });
    $('#web_resume_icon').animate({
        'left': '66%',
    });
    //show all icons
    $('.project_icons').fadeIn();
}
