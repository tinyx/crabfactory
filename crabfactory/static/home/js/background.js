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
    var scale_factor = win_width / 1213; //'1213' is the width on my screen
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

var projects_info = {
    '2-do_list': ['0 0', //project_info_background position
                  '0 0', //project_snap position
                  ['A website managing things to do', //project description
                   'Using Django in the backend',
                   'First time trying LESS',
                   'Design and drawing all images by myself',
                  ]
                 ],
};

var display_project = function(project_name) {
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

    //display_locator
    /*
        The chain 'addClass().delay().queue()' is used because
        'addClass().delay().removeClass()' is not working
        In this way, the animation class would be removed after the animation finished
    */
    $('#project_locator').addClass('project_locator_focus').delay(1000).queue(function() {
        $(this).removeClass('project_locator_focus');
        //display_background
        project_locator_background.fadeTo('slow', 1, function() {
            //display_snap
            project_snap.fadeTo('slow', 1);
        });
    });
}

display_project('2-do_list');