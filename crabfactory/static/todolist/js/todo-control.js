$(document).ready(function() {
    initial();
    displayClasses();
});

function initial() {
    $.blockUI.defaults.message = '<img src="../../static/todolist/img/busy.gif"/>';
    $.blockUI.defaults.css.background = 'rgba(0,0,0,0)';
    $.blockUI.defaults.css.border = 'rgba(0,0,0,0)';
    $.blockUI.defaults.overlayCSS.opacity = 0;
}

function displayClasses() {
    $.blockUI();
    $.get("class/get", function(data) {
        $.unblockUI();
        var result = data.data;
        var classList = $("#class-list");
        for(var i = 0; i < result.length; i++) {
            if(0 == i)
                classList.append(getNewClassTable(result[i].name, result[i].id, "unclassified"));
            else
                classList.append(getNewClassTable(result[i].name, result[i].id, "classesli"));
        }
        //classes handler
        //$(".sortableClasses").sortable().bind('sortupdate', updateClassesOrder);
        //$(".unclassified").sortable("destroy");
        //$(".unclassified").attr("draggable", "false");
        //$(".unclassified").addClass("selected");
    })
}

function getNewClassTable(name, id, liCssClass) {
    var classLi = $("<li/>", {
        "class": liCssClass,
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
        delDiv.style.visibility="hidden";
        delTd.append(delDiv);
    }
    classTr.append(nameTd);
    classTr.append(delTd);
    classTable.append(classTr);
    classLi.append(classTable);
    return classLi;
}
