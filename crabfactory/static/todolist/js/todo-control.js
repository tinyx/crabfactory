var dragging;
var showDoneList = 0;
var sortedby = 0; //0 = order, 1 = duedate, 2 = priority
var generalHintWindowHandler = -1;

$(document).ready(function() {
    initial();
    displayClasses();
});

var initial = function() {
    $.blockUI.defaults.message = "<img src='../../static/todolist/img/busy.gif'/>";
    $.blockUI.defaults.css.background = "rgba(0,0,0,0)";
    $.blockUI.defaults.css.border = "rgba(0,0,0,0)";
    $.blockUI.defaults.overlayCSS.opacity = 0;
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != "") {
                    var cookies = document.cookie.split(";");
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + "=")) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            }
        }
    });
    $("#calender").datepicker({
      showOn: "focus",
      nextText: "",
      prevText: "",
      showButtonPanel: true,
      constrainInput: true,
      dateFormat: 'yy-mm-dd',
    });
    $("#calender").datepicker("setDate", "Now");
    $("#class-list").sortable({
        placeholder: "sortable-placeholder",
        items: "li:not(.unclassified)",
        update: updateClassesOrder,
    });
    $("#event-list").sortable({
        placeholder: "sortable-placeholder",
        update: updateEventsOrder,
    });
    $("#recycle-bin-label").droppable({
        connectToSortable: "#class-list, #event-list",
        hoverClass: "recycle-on-drop",
        tolerance: "touch",
        drop: drop,
    });
}

var displayClasses = function (){
    $.blockUI();
    $.get("class/get/", function(data) {
        $.unblockUI();
        var result = data.data;
        var classList = $("#class-list");
        for(var i = 0; i < result.length; i++) {
            if(0 === i)
                classList.append(getNewClassTable(result[i].name, result[i].id, "unclassified"));
            else
                classList.append(getNewClassTable(result[i].name, result[i].id, "classesli"));
        }
        $("#class-list").sortable("refresh");
        $(".unclassified").addClass("selected");
        displayEvents();
    })
}

var updateClassesOrder = function() {
    $.blockUI();
    var postData = {};
    var i = 1;
    $("#class-list li").each(function () {
        var id = $(this).attr("id");
        var order = i++;
        postData[id] = order;
    });
    $.post("class/order/", postData)
        .done(function(data) {
            $.unblockUI();
        });
}

var getNewClassTable = function(name, id, liCssClass) {
    var classLi = $("<li/>", {
        "class": liCssClass,
        "id": id,
    }).click(clickClass)
        .mouseover(classLiMouseOver)
        .mouseout(classLiMouseOut);
    var classTable = $("<table/>", {
        "cellPadding": 0,
        "cellSpacing": 0,
    });
    var classTr = $("<tr/>");
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
    }).mouseover(classDelMouseOver)
        .mouseout(classDelMouseOut);
    if("classesli" === liCssClass) {
        delDiv.click(clickDelClass);
        delDiv.css("visibility", "hidden");
        delTd.append(delDiv);
    }
    classTr.append(nameTd);
    classTr.append(delTd);
    classTable.append(classTr);
    classLi.append(classTable);
    return classLi;
}

var clickClass = function() {
    $("#class-list>.selected").removeClass("selected");
    $(this).addClass("selected");
    displayEvents();
}

var classLiMouseOver = function() {
    $(this).find(".del-div").css("visibility", "visible");
}

var classLiMouseOut = function() {
    $(this).find(".del-div").css("visibility", "hidden");
}

var classDelMouseOver = function() {
    $("#class-list").find("li#" + $(this).attr("id") + " .class-name-div").css("text-decoration","line-through");
}

var classDelMouseOut = function() {
    $("#class-list").find("li#" + $(this).attr("id") + " .class-name-div").css("text-decoration","none");
}

var clickDelClass = function() {
    event.stopPropagation();
    var id = $(this).attr('id');
    var name = $("[classtextid=" + id + "]").text();
    var r=confirm("You sure you wanna delete the class " + name + "?");
    if (r==true) {
        $("#class-list>#" + id).remove();
        deleteClass(id);
    }
    else {
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
    }
}

var deleteClass = function(id) {
    $.blockUI();
    var postData = {};
    postData.classId = id;
    $.post("class/remove/", postData)
        .done(function() {
            updateClassesOrder();
            $.unblockUI();
            $(".unclassified").trigger("click");
        });
}

var addNewClass = function() {
    $.blockUI();
    var postData = {};
    var className = $("#add-new-class-input").val();
    if("" === className) {
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
            $("#class-list").sortable("refresh");
            $.unblockUI();
        });
}

var classOnKeyDown = function() {
    if(event.keyCode === 13)
        addNewClass();
    else return event.keyCode;
}

var displayEvents = function() {
    $.blockUI();
    postData = {
        "classId": $("#class-list>.selected").attr("id"),
    }
    $("#current-class>p").text($("#class-list>.selected").find(".class-name-div").text());
    $.get("event/get/", postData)
        .done(function(data) {
            displayEventsHelper(data.data);
            $.unblockUI();
        });
}

var displayEventsHelper = function(data) {
    $("#event-list").html("");
    $("#done-list").html("");
    if(0 === data.length) {
        $("#event-list").html("There is no item to display.");
        return;
    }
    if(0 === sortedby) { //sorted by order
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
    }
    else if(1 === sortedby) { //sorted by duedate
        data.sort(function (a,b) {return a["duedate"] > b["duedate"] ? 1 : 0;});
    }
    else if(2 === sortedby) { //sorted by priority
        data.sort(function (a,b) {return a["priority"] < b["priority"] ? 1 : 0;});
    }

    for(var i = 0; i < data.length; i++) {
        $("#event-list").append(getNewEventTable(data[i].id, data[i].priority, data[i].done, data[i].duedate, data[i].content));
    }

    if(0 === sortedby) { //sorted by order
        $("#event-list").sortable("enable");
        $("#event-list").sortable("refresh");
        $("#event-list").removeClass("undraggable");
    }
    else { //sorted by other ways
        $("#event-list").sortable("disable");
        $("#event-list").addClass("undraggable");
    }
    if(1 === showDoneList) displayDoneList();
}

var getNewEventTable = function(eventid, priority, done, duedate, content) {
    var newLi = $("<li/>", {
        "id": eventid,
        "class": "event-li",
    });
    var newTable = $("<table/>", {
        "cellPadding": 0,
        "cellSpacing": 0,
        "class": "event-table",
    });
    var newRow = $("<tr/>");

    //priority icon
    var priorityDiv = $("<div/>", {
        "id": eventid,
        "class": "event-pri pri" + priority,
        "priority": priority,
    }).mouseover(showPriPicker)
        .mouseout(removePriPicker);
    newRow.append($("<td/>", {
        "class": "event-pri-td",
    }).append(priorityDiv));

    //checkbox
    var checkBox = $("<input/>", {
        "id": eventid,
        "class": "event-check",
        "type": "checkBox",
    });//.click(checkEvent);
    newRow.append($("<td/>", {
        "class": "event-check-td",
    }).append(checkBox));

    //text div
    var textInput = $("<input/>", {
        "id": eventid,
        "class": "event-text",
        "value": content,
    });//.onblur(editEvent);
    newRow.append($("<td/>", {
        "class": "event-text-td",
    }).append(textInput));

    //duedate icon
    var dueDateDiv = $("<div/>", {
        "id": eventid,
        "class": "event-due",
    });
    var gap = getRestDays(duedate);
    var dueText;
    if(gap < 0) { //overdue
        $(dueDateDiv).addClass("event-overdue");
        if(gap === -1) {
            dueText = "Overdue 1 day";
        }
        else {
            dueText = "Overdue " + gap * -1 + " days";
        }
    }
    else if(gap === 0) {//due today
        dueDateDiv.addClass("event-due-today");
        dueText =  "Due today";
    }
    else if(gap === 1) {//due tomorrow
        dueDateDiv.addClass("event-due-shortly");
        dueText = "Due tomorrow";
    }
    else if(gap > 0 && gap < 10) {//due in short days
        dueDateDiv.addClass("event-due-shortly");
        dueText =  "Due in " + gap + " days";
    }
    else if(gap >=10 && gap < 30) {//due in longer time
        dueDateDiv.addClass("event-due-longer");
        dueText =  "Due in " + gap + " days";
    }
    else if(gap >= 30) {//do not worry now
        dueDateDiv.addClass("event-due-very-long");
        dueText =  "Due in " + gap + " days";
    }
    dueDateDiv.html(dueText);
    newRow.append($("<td/>", {
        "class": "event-due-td",
    }).append(dueDateDiv));

    //delete icon
    var deleteDiv = $("<div/>", {
        "id": eventid,
        "class": "event-del",
    }).click(clickDelEvent)
        .mouseover(classDelMouseOver)
        .mouseout(classDelMouseOut);
    newRow.append($("<td/>", {
        "class": "event-del-td",
    }).append(deleteDiv));

    newLi.append(newTable.append(newRow));
    return newLi;
}

var eventOnKeyDown = function() {
    if(event.keyCode == 13)
        addNewEvent();
    else return event.keyCode;
}

var addNewEvent = function() {
    $.blockUI();
    var selectedClass = $("#class-list>.selected");
    if(0 === selectedClass.length) {
        //no class has been selected yet
        alert("Please select one class to add this event.");
    }
    else {
        var postData = {};
        postData.classId = selectedClass.attr("id");
        postData.order = $("#event-list li").length + 1;
        postData.dueDate = $("#calender").val();
        postData.content = $("#add-event-text").val();

        $.post("event/add/", postData)
            .done(function(data) {
                var result = data.data;
                $("#add-event-text").val("");
                var eventList = $("#event-list");
                if("There is no item to display." === eventList.html())
                    eventList.html("");
                eventList.append(getNewEventTable(result, 0, 0, postData.dueDate, postData.content));
                $("#event-list").sortable("refresh");
                $.unblockUI();
            });
    }
}

var updateEventsOrder = function() {
    $.blockUI();
    var postData = {};
    var i = 1;
    $("#event-list li").each(function () {
        var id = $(this).attr("id");
        var order = i++;
        postData[id] = order;
    });
    $.post("event/order/", postData)
        .done(function(data) {
            $.unblockUI();
        });
}

var getRestDays = function(dueDate) {
    var date = new Date(dueDate);
    var today = new Date();
    var gap = parseInt((date.getTime() - today.getTime()) / 86400000);
    return gap;
}

var showPriPicker = function(ev) {
    if(isMouseLeaveOrEnter(ev, this)) {
        var eventid = $(this).attr("id");
        var priPickerTable = $("<table/>", {
            "id": eventid,
            "class": "pri-picker",
            "style": "display: none",
        }).append(
            $("<tr/>").append($("<td/>", {
                "class": "cell3",
            }).click(function() {
                //updateEventPri(eventid, 3);
            }))
            .append($("<td/>", {
                "class": "cell2",
            }).click(function() {
                //updateEventPri(eventid, 2);
            }))
        ).append(
            $("<tr/>").append($("<td/>", {
                "class": "cell1",
            }).click(function() {
                //updateEventPri(eventid, 1);
            }))
            .append($("<td/>", {
                "class": "cell0",
            }).click(function() {
                //updateEventPri(eventid, 0);
            }))
        );

        $(this).append(priPickerTable);
        $(priPickerTable).fadeIn("fast");
        showPriHintWindow();
     }
     else return;
}

var removePriPicker = function(ev) {
    if(isMouseLeaveOrEnter(ev,this)) {
        var eventid = $(this).attr("id");
        $("#" + eventid + ".pri-picker").remove();
        hidePriHintWindow();
    }
    else return;
}

var isMouseLeaveOrEnter = function(ev, handler) {   
    if (ev.type != 'mouseout' && ev.type != 'mouseover') return false;   
    var reltg = ev.relatedTarget ? ev.relatedTarget : ev.type == 'mouseout' ? ev.toElement : ev.fromElement;   
    while (reltg && reltg != handler)   
        reltg = reltg.parentNode;   
    return (reltg != handler);   
}

var showGeneralHintWindow = function(msg) {
    var left = document.body.clientWidth / 2 - 270;
    $("#general-hint-window>p").text(msg);
    $("#general-hint-window").css("left", left+"px");
    $("#general-hint-window").fadeIn("fast");
    if(generalHintWindowHandler != -1) {
        clearInterval(generalHintWindowHandler);
    }
    generalHintWindowHandler = setInterval(hideGeneralHintWindow, 5000);
}

var hideGeneralHintWindow = function() {
    if(generalHintWindowHandler != -1) {
        clearInterval(generalHintWindowHandler);
        generalHintWindowHandler = -1;
    }
    if($("#general-hint-window").css("display") == "none") {
        return;
    }
    $("#general-hint-window").fadeOut("fast");
}

var showPriHintWindow = function() {
    var left = document.body.clientWidth / 2 - 200;
    $("#pri-hint-window").css("left", left+"px");
    $("#pri-hint-window").stop(false, true);
    if($("#general-hint-window").css("display") != "none") {
        hideGeneralHintWindow();
    }
    $("#pri-hint-window").fadeIn("fast");
}

var hidePriHintWindow = function() {
    $("#pri-hint-window").stop(false, true);
    $("#pri-hint-window").fadeOut("fast");
}

var resortEvents = function(type) {
    $(".sorted-by-icon").filter(".selected").removeClass("selected");
    if("order" == type) {
        $(".sorted-by-icon").filter(".sorted-by-order").addClass("selected");
        sortedby = 0;
        showGeneralHintWindow("Now the events are sorted by user order, you can rearrange or edit them now.");
    }
    else if("duedate" == type) {
        $(".sorted-by-icon").filter(".sorted-by-duedate").addClass("selected");
        sortedby = 1;
        showGeneralHintWindow("Now the events are sorted by due date, they cannot be changed or dragged right now.");
    }
    else if("priority" == type) {
        $(".sorted-by-icon").filter(".sorted-by-priority").addClass("selected");
        sortedby = 2;
        showGeneralHintWindow("Now the events are sorted by priority, they cannot be changed or dragged right now.");
    }
    displayEvents();
}

var clickDelEvent = function() {
    if(0 != sortedby) {
        alert("Please sort items by order first.");
        return;
    }
    var id = $(this).attr('id');
    var r=confirm("You sure you wanna delete this event?");
    if (r==true)
    {
        $("#event-list>li#" + id).remove();
        deleteEvent(id);
    }
    else
    {
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
    }
}

var deleteEvent = function(id) {
    if(0 == $("#event-list>li:not(.sortable-placeholder)").length)
        $("#event-list").html("There is no item to display.");
    if(0 == $("#done-list>li:not(.sortable-placeholder)").length)
        $("#done-list").html("There is no item to display.");
    $.blockUI();
    var postData = {};
    postData.eventId = id;
    $.post("event/remove/", postData)
        .done(function() {
            $.unblockUI();
            updateEventsOrder();
        })
}

var drop = function(ev, ui) {
    var dropClass = ui.draggable.attr("class");
    var id = ui.draggable.attr("id");
    if(dropClass.toString().indexOf("classesli") > -1) {
        var name = ui.draggable.text();
        var r=confirm("You sure you wanna delete the class " + name + "?");
        if (r==true)
        {
            ui.draggable.remove();
            deleteClass(id);
        }
        else
        {
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
        }
    }
    else if(dropClass.toString().indexOf("doneeventli") > -1) {
        var r=confirm("You sure you wanna delete this event?");
        if (r==true)
        {
            ui.draggable.remove();
            deleteEvent(id);
        }
        else
        {
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
        }
    }
    else if(dropClass.toString().indexOf("event-li") > -1) {
        var r=confirm("You sure you wanna delete this event?");
        if (r==true)
        {
            ui.draggable.remove();
            deleteEvent(id);
        }
        else
        {
        //   --|||
        //  |-.-|  Nothing I can do here...
        //   ---
        }
    }
}