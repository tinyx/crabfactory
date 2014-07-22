$("window").load(function() {
    $("body").removeClass("preload");
});

(function($) {
    var s = skrollr.init({
        render: function(data) {
        }
    });
})(jQuery)

var scroll_to = function(anchor) {
    console.log(anchor);
    $.scrollTo(anchor, 500);
}
