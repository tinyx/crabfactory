var circle_chart_displayed = false;

$(window).load(function() {
    $("body").removeClass("preload");

});

$(function() {
    $(".knob").knob({
        'displayInput': false,
        'height': 400,
        'bgColor': 'rgba(0, 0, 0, 0)',
    });
});

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
    console.log(anchor);
    $.scrollTo(anchor, 500);
};

var circle_chart_content = $('#content_3');
(function($) {
    var s = skrollr.init({
        render: function(data) {
            if(!circle_chart_displayed) {
                if(circle_chart_content.hasClass('skrollable-after')) {
                    //display circle chart
                    display_all_circle_charts();
                    circle_chart_displayed = true;
                    $('.skill_background').delay(1000).fadeIn('slow');
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
    display_circle_chart('#html5', 75);
    display_circle_chart('#css3', 65);
    display_circle_chart('#javascript', 60);
    display_circle_chart('#ui_design', 50);
    display_circle_chart('#angularjs', 30);
    display_circle_chart('#django', 75);
    display_circle_chart('#postgres', 55);
    display_circle_chart('#asp_dot_net', 40);
}