$(document).ready(function () {
  // Init the cover background
  var cover_canvas_handler = new CoverCanvasHandler();
  cover_canvas_handler.init_background();

  // Init the scroll
  $('div.cover').on('mousewheel', $.throttle(25, function (event) {
    if (event.deltaY < 0) {
      $('div.content').addClass('display');
      //$('.down-arrow').addClass('display');
    }
  }));

  $('div.content_wrapper').on('mousewheel', $.throttle(25, function (event) {
    if ($(this).scrollTop() == 0 && event.deltaY > 0) {
      $('div.content').removeClass('display');
    }
  }));

  // Init scroll to events
  $('.nav-collapse').find('li').on('click', function () {
    if ($(this).index() !== 0) {
      $('div.content').addClass('display');
      $('.content_wrapper').scrollTo($('.content_wrapper .section_label').eq($(this).index() - 1), {
        duration: '.6s'
        , offset: {
          top: -30
        }
      });
    } else {
      $('div.content').removeClass('display');
    }
  });

  // Init skill page
  initSkill();

  // Init project page
  initProject();

  // Init scroll animations
  $('.content_wrapper').on('scroll', $.throttle(25, function () {
    $('.life_event_block').each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.8 &&
        $(this).find('.life_event_icon').hasClass('is_hidden')) {
        $(this).find('.life_event_icon, .life_event_content').removeClass('is_hidden').addClass('bounce_in');
      }
    });

    $('div.skill').each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.8 &&
        !$(this).find('.skill_timeline').hasClass('expand-in')) {
        $(this).find('.skill_timeline').addClass('expand-in');
        $(this).find('.skill_point_event').each(function () {
          var fadeInDelay = $(this).data('fade-in-delay');
          var pointEvent = $(this);
          setTimeout(function () {
            pointEvent.fadeIn();
          }, fadeInDelay);
        });
      }
    });
  }));
});

/*
throttle function, prevent event happening to fast
*/
(function(b,c){var a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


var CoverCanvasHandler = function() {
    var canvas = document.getElementById('cover_canvas');
    if(canvas === null) {
        return;
    }
    var context = canvas.getContext('2d');
    context.lineWidth = 1;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = canvas.width;
    var height = canvas.height;
    var x_lines = 14;
    var y_lines = 8;
    var x_gap = parseInt(width / x_lines);
    var y_gap = parseInt(height / y_lines);
    var x_points = [];
    var y_points = [];
    var breaks = {
        'horizontal': {
        },
        'vertical': {
        }
    };

    this.init_background = function() {
        var draw_inconsistent_line = function(start_x, start_y, end_x, end_y, breaks, context) {
            // We know the line would be either horizontal or vertical,
            // so let's make the logic simpler
            context.strokeStyle = "#ebebeb";
            if(start_x === end_x) {  //vertical
                var last_point = start_y;
                for(var i=0; i<breaks.length; i+=2) {
                    context.moveTo(start_x, last_point);
                    context.lineTo(start_x, breaks[i]);
                    context.stroke();
                    last_point = breaks[i+1];
                }
                context.moveTo(start_x, last_point);
                context.lineTo(start_x, end_y);
                context.stroke();
            }
            else {  //horizontal
                var last_point = start_x;
                for(var i=0; i<breaks.length; i+=2) {
                    context.moveTo(last_point, start_y);
                    context.lineTo(breaks[i], start_y);
                    context.stroke();
                    last_point = breaks[i+1];
                }
                context.moveTo(last_point, start_y);
                context.lineTo(end_x, start_y);
                context.stroke();
            }
        };

        var create_breaks = function (edge) {
            var number_of_breaks = parseInt(Math.random() * 3);  //at most 3 breaks per line
            var break_points = [];
            for(var i=0; i<number_of_breaks*2; i++) {
                break_points.push(parseInt(Math.random() * edge));
            }
            return break_points.sort();
        };

        var x_start_point = parseInt(Math.random() * x_gap);
        for(var i=0; i<x_lines; i++) {
            x_points.push(x_start_point + x_gap * i);
            breaks['vertical'][x_points[i]] = create_breaks(height);
            draw_inconsistent_line(
                x_points[i], 0,
                x_points[i], height,
                breaks['vertical'][x_points[i]],
                context
            );
        }

        var y_start_point = parseInt(Math.random() * y_gap);
        for(var i=0; i<y_lines; i++) {
            y_points.push(y_start_point + y_gap * i);
            breaks['horizontal'][y_points[i]] = create_breaks(width);
            draw_inconsistent_line(
                0, y_points[i],
                width, y_points[i],
                breaks['horizontal'][y_points[i]],
                context
            );
        }
    };

    var get_start_point = function() {
        var result = [];  //[start_x, start_y, direction]
        var direction = ['up', 'down', 'left', 'right'][parseInt(Math.random() * 4)];
        if(direction === 'up') {
            return [x_points[parseInt(Math.random() * x_lines)], height, 'up'];
        }
        else if(direction === 'down') {
            return [x_points[parseInt(Math.random() * x_lines)], 0, 'down'];
        }
        else if(direction === 'left') {
            return [width, y_points[parseInt(Math.random() * y_lines)], 'left'];
        }
        else if(direction === 'right') {
            return [0, y_points[parseInt(Math.random() * y_lines)], 'right'];
        }
    };
}

var initSkill = function() {
  // Init timeline
  (function() {
    var skillData = {
      'timeline': [
        {'title': 'Northeastern University', 'date': new Date(2012, 9, 1)},
        {'title': 'BitSight Coop', 'date': new Date(2013, 6, 1)},
        {'title': 'BitSight Software Engineer', 'date': new Date(2015, 2, 1)},
        {'title': 'Now', 'date': new Date()}
      ],
      'skills': {
        'Web Dev': [
          {'name': 'HTML + CSS + JavaScript', 'startDate': new Date(2012, 9, 1)},
          {'name': 'Django (1.6 & 1.8)', 'startDate': new Date(2013, 6, 1)},
          {'name': 'SASS', 'startDate': new Date(2013, 8, 1)},
          {'name': 'ES6 + React + Redux', 'startDate': new Date(2016, 2, 1)}
        ],
        'Others': [
          {'name': 'Linux', 'startDate': new Date(2012, 9, 1)},
          {'name': 'Git', 'startDate': new Date(2012, 9, 1)},
          {'name': 'Database (MySQL & PostgreSQL)', 'startDate': new Date(2012, 9, 1)}
        ]
      }
    };
    var startTime = skillData['timeline'][0]['date'];
    var totalTime = new Date() - startTime;
    var getPointEvent = function(title, date) {
      var eventHtml = '<div class="skill_point_event">' +
            '<p class="skill_point_event_date">' + date.getFullYear() + '</p>' +
            '<p class="skill_point_event_title">' + title + '</p>' +
            '<div class="skill_point_event_circle"></div>' +
          '</div>';
      var percentage = (date - startTime) / totalTime;
      var pointEvent = $(eventHtml);
      pointEvent.css('left', 'calc(' + percentage * 100 + '% - 55px)');
      pointEvent.data('fade-in-delay', percentage * 1000);
      return pointEvent;
    }
    for(var i=0; i<skillData['timeline'].length; i++) {
      var pointEvent = skillData['timeline'][i];
      $('.skill_timeline_container').append(getPointEvent(pointEvent.title, pointEvent.date));
    }

    var getSkillTimebar = function(name, date) {
      var skillTimebarHTML = '<div class="skill_timebar">' +
            '<div class="skill_timebar_bar"></div>' +
            '<p class="skill_timebar_name">' + name + '</p>' +
          '</div>';
      var percentage = (new Date() - date) / totalTime;
      var skillTimebar = $(skillTimebarHTML);
      skillTimebar.find('.skill_timebar_bar').css('width', percentage * 100 + '%');
      return skillTimebar;
    }
    for(var skillCategory in skillData['skills']) {
      var skills = skillData['skills'][skillCategory];
      var skillCategoryContainer = $('<div class="skill_timebar_category"/>');
      skillCategoryContainer.append($('<p class="skill_timebar_category_label">' + skillCategory + '</p>'))
      for(var i=0; i<skills.length; i++) {
        skillCategoryContainer.append(getSkillTimebar(skills[i].name, skills[i].startDate));
      }
      $('.skill_timebar_container').append(skillCategoryContainer);
    }
  })();

  // Init background
  (function(){
    particlesJS("skill-particles", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#bbb"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#acacac"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.4,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#acacac",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "events": {
          "onhover": {
            "enable": false,
          },
          "onclick": {
            "enable": false,
          },
          "resize": false
        }
      },
      "retina_detect": true
    });
  })();
}

var initProject = function() {
  var projects = [
    {
      name: '2-do list',
      techstack: 'Django HTML jQuery SCSS',
      description: 'My first website/single-page-app, originally built with ASP.NET, \
                    rewrote with Django.',
      url: 'http://todo.crabfactory.net',
      img: './static/img/todo_list_demo.png',
    },
    {
      name: 'Crabfactory',
      techstack: 'HTML JavaScript SCSS',
      description: 'The website you are browsing right now. \
                    Personal portfolio website, purely focused on frontend.',
      url: 'http://crabfactory.net',
      img: './static/img/crabfactory_demo.png',
    },
    {
      name: 'Todo list v2',
      techstack: 'Django React Redux Material-UI',
      description: 'Experimental project for learning React + Redux techstack. \
                    Also built a micro service to support the client.',
      url: 'http://todov2.crabfactory.net',
      img: './static/img/todo_v2_demo.png',
    },
    {
      name: 'Gallery',
      techstack: 'Django JavaScript CSS',
      description: 'A gallery website for my artist friend',
      url: 'http://gallery.crabfactory.net',
      img: './static/img/gallery_demo.png',
    }
  ];
  for(var i=0; i<projects.length; i++) {
    var project =
      '<div class="project_block">' +
        '<div class="project_detail">' +
          '<h4>' + projects[i].name + '</h4>' +
          '<p>Built with ' + projects[i].techstack + '</p>' +
          '<p>' + projects[i].description + '</p>' +
          '<a href=' + projects[i].url + ' target="_blank">View</p>' +
        '</div>' +
      '</div>';
    var projectHtml = $(project);
    projectHtml.css('background-image', 'url(' + projects[i].img + ')');
    $('.row.projects').append(projectHtml);
  }
}