var uid;
var guideStep = 0;
var generalHintWindowHandler = -1;
function setUid(id) {
    uid = id;
    //alert(uid);
}

//display classes
function displayClasses() {
    $.blockUI();
    var path = 'UpdateData.asmx/downloadClasses';
    var argInStr = {};
    argInStr.uid = uid;
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: displayClassesHelper,
        });
}

function displayClassesHelper(dataInJSON) {
    var result = dataInJSON.d;
    var resultInJSON = eval('(' + result + ')');
    //alert(resultInJSON[1].classOrder);
    var classList = document.getElementById("classList");
    for(var i = 0; i < resultInJSON.length; i++) {
        if(0 == i)
            classList.appendChild(getNewClassTable(resultInJSON[i].className, resultInJSON[i].classID, "unclassified", "unclassifiedText", "unclassifiedDel"));
        else
            classList.appendChild(getNewClassTable(resultInJSON[i].className, resultInJSON[i].classID, "classesli", "classesliText", "classesliDel"));
    }
    //classes handler
    $(".sortableClasses").sortable().bind('sortupdate', updateClassesOrder);
    $(".unclassified").sortable("destroy");
    $(".unclassified").attr("draggable", "false");
    $(".unclassified").addClass("selected");
    $.unblockUI();
    displayEvents();
}

function clickClass() {
    $(".sortableClasses>.selected").removeClass("selected");
    $(this).addClass("selected");
    displayEvents();
}

function clickDelClass() {
    event.stopPropagation();
    //$(".sortableClasses>.selected").removeClass("selected");
    var id = $(this).attr('classdelid');
    //$("[classliid=" + id + "]").addClass("selected");
    var name = $("[classtextid=" + id + "]").text();
    var r=confirm("You sure you wanna delete the class " + name + "?");
    if (r==true)
    {
        $("[classliid=" + id + "]").remove();
        deleteClass(id);
    }
    else
    {
        //nothing
    }
}

function showAddNewClassInput() {
    $("#addNewClassInput").slideToggle("middle");
}

function addNewClass() {
    $.blockUI();
    var path = 'UpdateData.asmx/addNewClass';
    var argInStr = {};
    var className = $("#newClassInput").val();
    if("" == className) {
        alert("Class name should not be empty.");
        $.unblockUI();
        return;
    }
    argInStr.className = className;
    argInStr.userId = uid;
    argInStr.order = $(".classesliText").length + 1;
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function(resultInJSON){
                $("#newClassInput").val("");
                var classList = document.getElementById("classList");
                classList.appendChild(getNewClassTable(className, resultInJSON.d, "classesli", "classesliText", "classesliDel"));
                $(".sortableClasses").sortable('destroy');
                $(".sortableClasses").sortable().bind('sortupdate', updateClassesOrder);
                $(".unclassified").sortable("destroy");
                $.unblockUI();
            },
        });
}

function updateClassesOrder() {
    $.blockUI();
    var argInStr = {};
    argInStr.dataElements = "";
    var i = 0;
    $(".sortableClasses li").each(function () {
        var id = $(this).attr("classLiID");
        var order = i++;
        var str = id + ',' + order + ';';
        argInStr.dataElements += str;
    });
    var path = 'UpdateData.asmx/updateClasses';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: $.unblockUI(),
        });
}

function deleteClass(id) {
    $.blockUI();
    var argInStr = {};
    argInStr.classId = id;
    var path = 'UpdateData.asmx/deleteClass';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (){
                    updateClassesOrder();
                    $.unblockUI();
                    $(".unclassified").trigger("click");
                },
        });
}

function getNewClassTable(name, id, liCssClass, textCssClass, delCssClass) {
    var newLi = document.createElement("li");
    var newTable = document.createElement("table");
    newTable.cellPadding = 0;
    newTable.cellSpacing = 0;
    newTable.setAttribute("class", liCssClass + "Table");
    newRow = newTable.insertRow();
    newLi.setAttribute("classLiID", id);
    newLi.setAttribute("class", liCssClass);
    newLi.onclick = clickClass;
    newLi.onmouseover = classLiMouseOver;
    newLi.onmouseout = classLiMouseOut;

    //text div
    newCell = newRow.insertCell();
    newCell.className = "classNameTd";
    var textDiv = document.createElement("div");
    textDiv.setAttribute("class",textCssClass);
    textDiv.setAttribute("classTextID", id);
    $(textDiv).text(name);
    newCell.appendChild(textDiv);
    newLi.appendChild(newTable);
    
    //delete icon
    newCell = newRow.insertCell(-1);
    newCell.className = "classDelTd";
    var deleteDiv = document.createElement("div");
    deleteDiv.setAttribute("classDelID", id);
    deleteDiv.setAttribute("class", delCssClass);
    deleteDiv.onmouseover = classDelMouseOver;
    deleteDiv.onmouseout = classDelMouseOut;
    deleteDiv.innerHTML = "";
    if("classesli" == liCssClass) {
        deleteDiv.onclick = clickDelClass;
        deleteDiv.style.visibility="hidden";
        newCell.appendChild(deleteDiv);
    }

    return newLi;
}

function classLiMouseOver(ev) {
    var id = $(this).attr('classliid');
    $("[classDelID=" + id + "]").css("visibility", "visible");
}

function classLiMouseOut(ev) {
    var id = $(this).attr('classliid');
    $("[classDelID=" + id + "]").css("visibility", "hidden");
}

function classDelMouseOver(ev) {
    var id = $(this).attr('classDelID');
    $("[classtextid=" + id + "]").css("text-decoration","line-through");
}

function classDelMouseOut(ev) {
    var id = $(this).attr('classDelID');
    $("[classtextid=" + id + "]").css("text-decoration","none");
}

function addNewEvent() {
    $.blockUI();
    var selectedClass = $(".sortableClasses>.selected");
    if(0 == selectedClass.length) {
        //no class has been selected yet
        alert("Please select one class to add this event.");
    }
    else {
        var argInStr = {};
        argInStr.userId = uid;
        argInStr.classId = selectedClass.attr("classliid");
        argInStr.eventOrder = getEventsOrder();
        argInStr.dueDate = $("#calender").val();
        argInStr.content = $("#addEventText").val();
        if("" == argInStr.content || "" == argInStr.dueDate) {
            $.unblockUI();
            alert("Please check your input.");
            return;
        }
        else {
            var path = 'UpdateData.asmx/addNewEvent';
            $.ajax 
                ({
                    type: 'POST',
                    url: path,
                    data: $.toJSON(argInStr),
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function(resultInJSON){
                        $("#addEventText").val("");
                        var eventList = document.getElementById("eventList");
                        if("There is no item to display." == eventList.innerHTML)
                            eventList.innerHTML = "";
                        eventList.appendChild(getNewEventsTable(resultInJSON.d, 0, 0, argInStr.dueDate, argInStr.content));
                        $(".sortableEvents").sortable('destroy');
                        $(".sortableEvents").sortable().bind('sortupdate', updateEventsOrder);
                        $.unblockUI();
                    },
                });
        }
    }
}

function getEventsOrder() {
    var i = 0;
    $(".sortableEvents li").each(function () {
        i++;
    });
    return i;
}

//display events
function displayEvents() {
    $.blockUI(); 
    var path = 'UpdateData.asmx/downloadEvents';
    var argInStr = {};
    argInStr.userid = uid;
    argInStr.classid = $(".sortableClasses>.selected").attr("classliid");
    argInStr.done = 0;
    $("#currentClass>p").text($("[classtextid=" + argInStr.classid + "]").text());
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: displayEventsHelper,
        });
}

function displayEventsHelper(dataInJSON) {
    var result = dataInJSON.d;
    var resultInJSON = eval('(' + result + ')');
    $("#eventList").html("");
    $("#doneList").html("");
    if(0 == resultInJSON.length) {
        $.unblockUI(); 
        $("#eventList").html("There is no item to display.");
        if(1 == showDoneList) displayDoneList();
        return;
    }
    if(0 == sortedby) { //sorted by order
        
    }
    else if(1 == sortedby) { //sorted by duedate
        resultInJSON.sort(function (a,b) {return a["dueDate"] > b["dueDate"] ? 1 : 0;});
    }
    else if(2 == sortedby) { //sorted by priority
        resultInJSON.sort(function (a,b) {return a["priority"] < b["priority"] ? 1 : 0;});
    }
    
    for(var i = 0; i < resultInJSON.length; i++) {
        eventList.appendChild(getNewEventsTable(resultInJSON[i].eventID, resultInJSON[i].priority, resultInJSON[i].done, timeFormatter(resultInJSON[i].dueDate), resultInJSON[i].content));
    }
    
    if(0 == sortedby) { //sorted by order
        $(".sortableEvents").sortable().bind('sortupdate', updateEventsOrder);
        $(".sortableEvents").removeClass("undraggable");
    }
    else { //sorted by other ways
        $(".sortableEvents").addClass("undraggable");
    }
    $.unblockUI(); 
    if(1 == showDoneList) displayDoneList();
}

function getNewEventsTable(eventid, priority, done, duedate, content) {
    var newLi = document.createElement("li");
    var newTable = document.createElement("table");
    newTable.cellPadding = 0;
    newTable.cellSpacing = 0;
    newTable.className = "eventTable";
    newRow = newTable.insertRow();
    newLi.setAttribute("eventLiID", eventid);
    newLi.setAttribute("class", "eventli");

    //priority icon
    newCell = newRow.insertCell(-1);
    newCell.className = "eventPriTd";
    var priorityDiv = document.createElement("div");
    priorityDiv.setAttribute("eventPriID", eventid);
    priorityDiv.setAttribute("class", "eventliPri pri"+priority);
    priorityDiv.setAttribute("eventPriority", priority);
    priorityDiv.onmouseover = showPriPicker;
    priorityDiv.onmouseout = removePriPicker;
    newCell.appendChild(priorityDiv);

    //checkbox
    newCell = newRow.insertCell(-1);
    newCell.className = "eventCheckTd";
    var checkBox = document.createElement("input");
    checkBox.setAttribute("eventCheckID", eventid);
    checkBox.setAttribute("class", "eventliCheck");
    checkBox.setAttribute("type","checkBox");
    checkBox.onclick = checkEvent;
    newCell.appendChild(checkBox);

    //text div
    newCell = newRow.insertCell(-1);
    newCell.className = "eventTextTd";
    var textInput = document.createElement("input");
    textInput.setAttribute("eventTextID", eventid);
    textInput.setAttribute("class","eventliText");
    textInput.onblur = editEvent;
    textInput.value = content;
    newCell.appendChild(textInput);

    //duedate icon
    newCell = newRow.insertCell(-1);
    newCell.className = "eventDueTd";
    var duedateDiv = document.createElement("div");
    duedateDiv.setAttribute("eventDueID", eventid);
    duedateDiv.setAttribute("class", "eventliDue");
    duedateDiv.setAttribute("eventDueDate", duedate);
    var gap = getRestDays(duedate);
    var dueText;
    if(gap < 0) { //overdue
        $(duedateDiv).addClass("eventOverdue");
        if(gap == -1) {
            dueText = "Overdue 1 day";  
        }
        else {
            dueText = "Overdue " + gap * -1 + " days";
        }
    }
    else if(gap == 0) {//due today
        $(duedateDiv).addClass("eventDueToday");
        dueText =  "Due today";
    }
    else if(gap == 1) {//due tomorrow
        $(duedateDiv).addClass("eventDueShortly");
        dueText = "Due tomorrow";
    }
    else if(gap > 0 && gap < 10) {//due in short days
        $(duedateDiv).addClass("eventDueShortly");
        dueText =  "Due in " + gap + " days";
    }
    else if(gap >=10 && gap < 30) {//due in longer time
        $(duedateDiv).addClass("eventDueLonger");
        dueText =  "Due in " + gap + " days";
    }
    else if(gap >= 30) {//do not worry now
        $(duedateDiv).addClass("eventDueVeryLong");
        dueText =  "Due in " + gap + " days";
    }
    duedateDiv.innerHTML = dueText;;
    newCell.appendChild(duedateDiv);
    
    //delete icon
    newCell = newRow.insertCell(-1);
    newCell.className = "eventDelTd";
    var deleteDiv = document.createElement("div");
    deleteDiv.setAttribute("eventDelID", eventid);
    deleteDiv.setAttribute("class", "eventliDel");
    deleteDiv.onclick = clickDelEvent;
    newCell.appendChild(deleteDiv);

    newLi.appendChild(newTable);
    
    return newLi;
}

function timeFormatter(value) {

    var da = new Date(parseInt(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]));
    var month = da.getMonth() + 1;
    var date = da.getDate();
    var year = da.getFullYear();
    if(month <= 9)
        month = "0" + month;
    if(date <= 9)
        date = "0" + date;
    if(year <= 9)
        year = "0" + year;
    return month + "/" + date + "/" + year;
}

function getRestDays(dueDate) {
    var date = new Date(dueDate);
    var today = new Date();
    var gap = parseInt((date.getTime() - today.getTime()) / 86400000);
    return gap;
}

function updateEventsOrder() {
    $.blockUI();
    var argInStr = {};
    argInStr.dataElements = "";
    var i = 0;
    $(".sortableEvents li").each(function () {
        var id = $(this).attr("eventLiID");
        var order = i++;
        var str = id + ',' + order + ';';
        argInStr.dataElements += str;
    });
    if(0 == i) {
        $.unblockUI();
        return;
    }
    var path = 'UpdateData.asmx/updateEventsOrder';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: $.unblockUI,
        });
}

function clickDelEvent() {
    if(0 != sortedby) {
        alert("Please sort items by order first.");
        return;
    }
    var id = $(this).attr('eventDelID');
    var r=confirm("You sure you wanna delete this event?");
    if (r==true)
    {
        $("[eventliid=" + id + "]").remove();
        deleteEvent(id);
    }
    else
    {
        //nothing
    }
}

function deleteEvent(id) {
    if(0 == $(".eventli").length)
            $("#eventList").text("There is no item to display.");
    if(0 == $(".doneeventli").length)
            $("#doneList").text("There is no item to display.");
    $.blockUI();
    var argInStr = {};
    argInStr.eventId = id;
    var path = 'UpdateData.asmx/deleteEvent';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (){
                        $.unblockUI();
                        updateEventsOrder();
                     }
        });
}

function editEvent(event) {
    $.blockUI();
    var id = $(this).attr('eventtextid');
    var argInStr = {};
    argInStr.eventId = id;
    argInStr.dueDate =  $("[eventDueId=" + id + "]").attr("eventDueDate");
    argInStr.priority = 0;
    argInStr.content = $("[eventTextId=" + id + "]").val();
    argInStr.done = 0;
    
    if("" == argInStr.content) {
        $.unblockUI();
        alert("Event could not be null.");
        return;
    }
    //alert(argInStr.eventId + argInStr.dueDate + argInStr.content);
    var path = 'UpdateData.asmx/updateEvent';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: $.unblockUI,
        });
}

function checkEvent() {
    if(0 != sortedby) {
        $(this).attr("checked", false);
        alert("Please sort items by order first.");
        return;
    }
    $.blockUI();
    var id = $(this).attr('eventcheckid');
    var argInStr = {};
    argInStr.eventId = id;
    
    var path = 'UpdateData.asmx/checkEvent';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (){
                        $.unblockUI();
                        $("[eventliid=" + id + "]").remove();
                        if(0 == $(".eventli").length)
                            $("#eventList").text("There is no item to display.");
                        updateEventsOrder();
                        if(1 == showDoneList) displayDoneList();
                     }
        });
}

function displayDoneListStarter() {
    showDoneList = 1 ^ showDoneList;
    if(1 == showDoneList) {
        $(".showDoneListTitle>p").text("Hide Done Events");
        displayDoneList();
    }
    else {
        $(".showDoneListTitle>p").text("Show Done Events");
        $("#doneList").html("");
    }
}

function displayDoneList() {
    $.blockUI(); 
    var path = 'UpdateData.asmx/downloadEvents';
    var argInStr = {};
    argInStr.userid = uid;
    argInStr.classid = $(".sortableClasses>.selected").attr("classliid");
    argInStr.done = 1;
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: displayDoneEventsHelper,
        });
}

function displayDoneEventsHelper(dataInJSON) {
    var result = dataInJSON.d;
    var resultInJSON = eval('(' + result + ')');
    $("#doneList").html("");
    for(var i = 0; i < resultInJSON.length; i++) {
        doneList.appendChild(getNewDoneEventsTable(resultInJSON[i].eventID, timeFormatter(resultInJSON[i].dueDate), resultInJSON[i].content));
    }
    if(0 == i)
        $("#doneList").html("There is no item to display.");
    $.unblockUI();
}

function getNewDoneEventsTable(eventid, duedate, content) {
    var newLi = document.createElement("li");

    newLi.setAttribute("doneEventLiID", eventid);
    newLi.setAttribute("class", "doneeventli");
    newLi.setAttribute("draggable", "true");
    newLi.setAttribute("ondrag","dragging = $(this)");

    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "doneEventDiv");
    //text div
    var textDiv = document.createElement("div");
    textDiv.setAttribute("doneeventTextID", eventid);
    textDiv.setAttribute("class","doneeventliText");
    textDiv.innerHTML = content;
    newDiv.appendChild(textDiv);
    //duedate icon
    var duedateDiv = document.createElement("div");
    duedateDiv.setAttribute("doneEventDueID", eventid);
    duedateDiv.setAttribute("class", "doneeventliDue");
    duedateDiv.innerHTML = "Done at " + duedate;
    newDiv.appendChild(duedateDiv);
    newLi.appendChild(newDiv);
    
    return newLi;
}

function enterRecycle(ev) {
    $('.recycleBin').addClass('recycleOnDrop');
}

function leaveRecycle(ev) {
    $('.recycleBin').removeClass('recycleOnDrop');
}
function allowDrop(ev) {
    ev.preventDefault();
    $('.recycleBin').addClass('recycleOnDrop');
}

function drop(ev) {
    $(".recycleBin").removeClass("recycleOnDrop");
    if(dragging) {
    var dropClass = dragging.attr("class");
        if(dropClass.toString().indexOf("classesli") > -1) {
            var id = dragging.attr('classliid');
            var name = $("[classtextid=" + id + "]").text();
            var r=confirm("You sure you wanna delete the class " + name + "?");
            if (r==true)
            {
                $("[classliid=" + id + "]").remove();
                deleteClass(id);
            }
            else
            {
                //nothing
            }
        }
        else if(dropClass.toString().indexOf("doneeventli") > -1) {
            var id = dragging.attr('doneeventliid');
            var r=confirm("You sure you wanna delete this event?");
            if (r==true)
            {
                $("[doneeventliid=" + id + "]").remove();
                deleteEvent(id);
            }
            else
            {
                //nothing
            }
        }
        else if(dropClass.toString().indexOf("eventli") > -1) {
            var id = dragging.attr('eventliid');
            var r=confirm("You sure you wanna delete this event?");
            if (r==true)
            {
                $("[eventliid=" + id + "]").remove();
                deleteEvent(id);
            }
            else
            {
                //nothing
            }
        }
    }          
}

function showPriPicker(ev) {
    if(isMouseLeaveOrEnter(ev, this)) {
        var eventid = $(this).attr("eventpriid");
        var priPickerTable = document.createElement("table");
        priPickerTable.setAttribute("pickerID", eventid);
        priPickerTable.setAttribute("class", "priPicker");
        priPickerTable.setAttribute("style", "display:none");
        var newRow = priPickerTable.insertRow();
        newRow.className = "priPickerRow";
        var cell3 = newRow.insertCell();
        cell3.className = "priPickerCell cell3";
        cell3.onclick = function() {
            updateEventPri(eventid, 3);
        }
        var cell2 = newRow.insertCell();
        cell2.className = "priPickerCell cell2";
        cell2.onclick = function() {
            updateEventPri(eventid, 2);
        }
        newRow = priPickerTable.insertRow();
        newRow.className = "priPickerRow";
        var cell1 = newRow.insertCell();
        cell1.className = "priPickerCell cell1";
        cell1.onclick = function() {
            updateEventPri(eventid, 1);
        }
        var cell0 = newRow.insertCell();
        cell0.className = "priPickerCell cell0";
        cell0.onclick = function() {
            updateEventPri(eventid, 0);
        }


        $(this).append(priPickerTable);
        $(priPickerTable).fadeIn("fast");
        showPriHintWindow();
     }
     else return;
}

function removePriPicker(ev) {
    if(isMouseLeaveOrEnter(ev,this)) {
        var eventid = $(this).attr("eventpriid");
        $("[pickerID="+eventid+"]").remove();
        hidePriHintWindow();
    }
    else return;
}

function isMouseLeaveOrEnter(e, handler) {   
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;   
    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;   
    while (reltg && reltg != handler)   
        reltg = reltg.parentNode;   
    return (reltg != handler);   
}

function updateEventPri(id, pri) {
    hidePriHintWindow();
    $("[pickerID="+id+"]").remove();
    if(0 != sortedby) {
        alert("Please sort items by order first.");
        return;
    }
    $.blockUI();
    var argInStr = {};
    argInStr.eventId = id;
    argInStr.dueDate =  $("[eventDueId=" + id + "]").attr("eventDueDate");
    argInStr.priority = pri;
    argInStr.content = $("[eventTextId=" + id + "]").val();
    argInStr.done = 0;

    var path = 'UpdateData.asmx/updateEvent';
    $.ajax
        ({
            type: 'POST',
            url: path,
            data: $.toJSON(argInStr),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function () {
                $("[eventpriid="+id+"]").attr("class", "eventliPri pri"+pri);
                $.unblockUI();
            }
        });
}

function resortEvents(type) {
    $(".sortedbyicon").filter(".selected").removeClass("selected");
    if("order" == type) {
        $(".sortedbyicon").filter(".sortedbyorder").addClass("selected");
        sortedby = 0;
        showGeneralHintWindow("Now the events are sorted by user order, you can rearrange or edit them now.");
    }
    else if("duedate" == type) {
        $(".sortedbyicon").filter(".sortedbyduedate").addClass("selected");
        sortedby = 1;
        showGeneralHintWindow("Now the events are sorted by due date, they cannot be changed or dragged right now.");
    }
    else if("priority" == type) {
        $(".sortedbyicon").filter(".sortedbypriority").addClass("selected");
        sortedby = 2;
        showGeneralHintWindow("Now the events are sorted by priority, they cannot be changed or dragged right now.");
    }
    displayEvents();
}

function showGeneralHintWindow(msg) {
    var left = document.body.clientWidth / 2 - 270;
    $(".generalHintWindow>p").text(msg);
    $(".generalHintWindow").css("left", left+"px");
    $(".generalHintWindow").fadeIn("fast");
    if(generalHintWindowHandler != -1) {
        clearInterval(generalHintWindowHandler);
    }
    generalHintWindowHandler = setInterval(hideGeneralHintWindow, 5000);
}

function hideGeneralHintWindow() {
    if(generalHintWindowHandler != -1) {
        clearInterval(generalHintWindowHandler);
        generalHintWindowHandler = -1;
    }
    if($(".generalHintWindow").css("display") == "none") return;
    $(".generalHintWindow").fadeOut("fast");
}

function showPriHintWindow() {
    var left = document.body.clientWidth / 2 - 200;
    $(".priHintWindow").css("left", left+"px");
    $(".priHintWindow").stop(false, true);
    if($(".generalHintWindow").css("display") != "none")
        hideGeneralHintWindow();
    $(".priHintWindow").fadeIn("fast");
}

function hidePriHintWindow() {
    $(".priHintWindow").stop(false, true);
    $(".priHintWindow").fadeOut("fast");
}

function classOnKeyDown() {
    if(event.keyCode == 13)
        addNewClass();
    else return event.keyCode;
}

function eventOnKeyDown() {
    if(event.keyCode == 13)
        addNewEvent();
    else return event.keyCode;
}

function showUserGuide() {
    $(".userGuideContainer").fadeIn();
    guideStep = 0;
    userGuideControl();
}

function userGuideControl() {
    $(".userGuideContainer").children().css("display","none");
    if(0 == guideStep) { //display classes guide
        $(".userGuideContainer").bind("click", userGuideControl);
        var left = $(".classesLabel").offset().left - 5;
        var top = $(".classesLabel").offset().top - 100;
        $(".displayClassGuide").css("left", left+"px");
        $(".displayClassGuide").css("top", top+"px");
        $(".displayClassGuide").fadeIn();
        guideStep++;
    }
    else if(1 == guideStep) { //add class guide
        var left = $(".addNewClass").offset().left - 5;
        var top = $(".addNewClass").offset().top - 135;
        $(".addClassGuide").css("left", left+"px");
        $(".addClassGuide").css("top", top+"px");
        $(".addClassGuide").fadeIn();
        guideStep++;
    }
    else if(2 == guideStep) { //display events guide
        var left = $(".currentClass").offset().left - 100;
        var top = $(".currentClass").offset().top - 200;
        $(".displayEventGuide").css("left", left+"px");
        $(".displayEventGuide").css("top", top+"px");
        $(".displayEventGuide").fadeIn();
        guideStep++;
    }
    else if(3 == guideStep) { //sort events guide
        var left = $(".sortedByIcons").offset().left - 130;
        var top = $(".sortedByIcons").offset().top - 90;
        $(".sortEventGuide").css("left", left+"px");
        $(".sortEventGuide").css("top", top+"px");
        $(".sortEventGuide").fadeIn();
        guideStep++;
    }
    else if(4 == guideStep) { //add event guide
        var left = $(".addNewEventPanel.down").offset().left - 15;
        var top = $(".addNewEventPanel.down").offset().top - 250;
        $(".addEventGuide").css("left", left+"px");
        $(".addEventGuide").css("top", top+"px");
        $(".addEventGuide").fadeIn();
        guideStep++;
    }
    else if(5 == guideStep) { //remove guide
        var left = $(".recycleBin").offset().left - 5;
        var top = $(".recycleBin").offset().top - 135;
        $(".removeGuide").css("left", left+"px");
        $(".removeGuide").css("top", top+"px");
        $(".removeGuide").fadeIn();
        guideStep++;
    }
    else if(6 == guideStep) { //done event guide
        var left = $(".showDoneListTitle").offset().left - 80;
        var top = $(".showDoneListTitle").offset().top - 230;
        $(".doneEventGuide").css("left", left+"px");
        $(".doneEventGuide").css("top", top+"px");
        $(".doneEventGuide").fadeIn();
        guideStep++;
    }
    else {
        $(".userGuideContainer").unbind("click");
        $(".userGuideContainer").fadeOut();
    }
}

