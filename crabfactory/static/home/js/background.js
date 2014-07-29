$(window).load(function() {
    $("body").removeClass("preload");

});

(function($) {
    var s = skrollr.init({
        render: function(data) {
        }
    });
})(jQuery)

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
