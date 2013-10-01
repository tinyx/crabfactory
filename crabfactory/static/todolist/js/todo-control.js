$(document).ready(function() {
    initial();
    displayClasses();
});

function initial() {
    $.blockUI.defaults.message = '<img src="../../static/todolist/img/busy.gif"/>';
    $.blockUI.defaults.css.background = 'rgba(0,0,0,0)';
    $.blockUI.defaults.css.border = 'rgba(0,0,0,0)';
    $.blockUI.defaults.overlayCSS.opacity = 0;
    $.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                 }
             }
         }
         return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});
}

function displayClasses() {
    $.blockUI();
    $.get("class/get/", function(data) {
        $.unblockUI();
        var result = data.data;
        var classList = $("#class-list");
        for(var i = 0; i < result.length; i++) {
            if(0 == i)
                classList.append(getNewClassTable(result[i].name, result[i].id, "unclassified"));
            else
                classList.append(getNewClassTable(result[i].name, result[i].id, "classesli"));
        }
        $("#class-list").sortable({
            placeholder: "sortable-placeholder",
            items: "li:not(.unclassified)",
        });//.bind('sortupdate', updateClassesOrder);
        $(".unclassified").addClass("selected");
    })
}

function getNewClassTable(name, id, liCssClass) {
    var classLi = $("<li/>", {
        "class": liCssClass,
        "id": id,
    });
    var classTable = $("<table/>", {
        "cellPadding": 0,
        "cellSpacing": 0,
        "class": "li-table",
    });

    var classTr = $("<tr/>", {
        "id": id,
        "class": "li-tr",
        //"onclick": clickClass,
        //"onmouseover": classLiMouseOver,
        //"onmouseout": classLiMouseOut,
    });

    //name div
    var nameTd = $("<td/>", {
        "class": "class-name-td",
    }).append($("<div/>", {
        "class": "class-name-div",
        "html": name,
    }));

    //delete icon
    var delTd = $("<td/>", {
        "class": "del-td",
    });
    var delDiv = $("<div/>", {
        "id": id,
        "class": "del-div",
        //"onmouseover": classDelMouseOver,
        //"onmouseout": classDelMouseOut,
    });
    if("classesli" == liCssClass) {
        //delDiv.onclick(clickDelClass);
        delDiv.css("display", "hidden");
        delTd.append(delDiv);
    }
    classTr.append(nameTd);
    classTr.append(delTd);
    classTable.append(classTr);
    classLi.append(classTable);
    return classLi;
}

function addNewClass() {
    $.blockUI();
    var postData = {};
    var className = $("#add-new-class-input").val();
    if("" == className) {
        alert("Class name should not be empty.");
        $.unblockUI();
        return;
    }
    postData.className = className;
    postData.order = $(".classesliText").length + 1;
    $.post("class/add/", postData)
        .done(function(data) {
            var result = data.data;
            $("#add-new-class-input").val("");
            $("#class-list").append(getNewClassTable(className, result, "classesli"));
            //$(".sortableClasses").sortable('destroy');
            //$(".sortableClasses").sortable().bind('sortupdate', updateClassesOrder);
            //$(".unclassified").sortable("destroy");
            $.unblockUI();
        })
}

function classOnKeyDown() {
    if(event.keyCode == 13)
        addNewClass();
    else return event.keyCode;
}
