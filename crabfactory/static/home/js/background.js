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

var scroll_to = function(anchor) {
    console.log(anchor);
    $.scrollTo(anchor, 500);
};

var circle_chart_content = $("#content_3");
(function($) {
    var s = skrollr.init({
        render: function(data) {
            if(!circle_chart_displayed) {
                if(circle_chart_content.hasClass('skrollable-after')) {
                    //display circle chart
                    display_all_circle_charts();
                    circle_chart_displayed = true;
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
}