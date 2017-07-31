//var serverpath = '';
var serverpath = '/ActionTracker';
$("#Emphead").change(function () {
    $(".repheadid").val($(this).val());
    $("#repheademailadd").val($('option:selected', this).attr('rheademailad'));
    //$("#repheademailadd").val($(formname).find("#Emphead option:first").attr('rheademailad'));
})

$("#FromImpDate").focus(function () {
   // alert('test');
    $("#FromImpDate").datepicker();
});

$('#EditTaskPage.Employee').keydown(function () {
    captureEmployeekeydown('#EditTaskPage.Employee', '#EditTaskForm');
})

$('#ImplementorFilter.Employee_filter').keydown(function () {
        captureEmployeekeydown_filter('#ImplementorFilter.Employee_filter', '#ImplementorFormFilter');
})


$('#EditTaskActionPage.Employee').keydown(function () {
    captureEmployeekeydown('#EditTaskActionPage.Employee', '#EditTaskActionForm');
  
})

$('#AddTaskActionPage.Employee').keydown(function () {
    captureEmployeekeydown('#AddTaskActionPage.Employee', '#AddTaskActionPage');

})


$('#ReporterPage.Employee').keydown(function () {
    captureEmployeekeydown('#ReporterPage.Employee', '#main');
})

$('#ActorPage.Employee').keydown(function () {
    captureEmployeekeydown('#ActorPage.Employee', '#main_forms');

})




$('#AddActionPage.Employee').keydown(function () {
    captureEmployeekeydown('#AddActionPage.Employee', '#FormId');
})

$('#AddSafetyInspectorPage.Employee').keydown(function () {
    captureEmployeekeydown('#AddSafetyInspectorPage.Employee', '#FormAssignInspect');
})

$('#EditActionPage.Employee').keydown(function () {
    captureEmployeekeydown('#EditActionPage.Employee', '#EditActionFormId');
    
})

$('#EditSafetyInspectorPage.Employee').keydown(function () {
    captureEmployeekeydown('#EditSafetyInspectorPage.Employee', '#EditInspectForm');
})

$('#EditObservationPage.Employee').keydown(function () {
    captureEmployeekeydown('#EditObservationPage.Employee', '#EditObservationForm');
})



$("#sidebar_forms li").click(function () {
     var side_item = $(this).text();
  //  alert($(this).find("#active_sidebar").text());
  //   alert($(this).text());

    if (side_item == "OBSERVATIONS") {
    
        document.location.href = serverpath + '/SafetyTracker/Reporter';


    } else if (side_item == "ACTIONS") {

        document.location.href = serverpath + '/SafetyTracker/ActionForm';
    }
 
})

$("#logo-label").click(function () {
    document.location.href = serverpath + '/SafetyTracker/Index';
})

var filter_count = 0;

function captureEmployeekeydown_filter(textboxidandclass, formclass) {
    $(formclass).find('.emplistdiv_filter').attr({ "title": "selected" });
    var url = serverpath + '/SafetyTracker/EmployeeList/';
    var items = "";
    filter_count = 0;
    $.getJSON(url, { id: $(textboxidandclass).val() }, function (data) {

        $.each(data, function (i, emp) {
            items += "<li class='filterli' value = " + emp.EmployeeId + " >" + emp.Fullname + "</li><p class = 'phidden' >" + emp.DepartmentName + "</p>"
            + "<p class = 'phidden' >" + emp.CompanyId + "</p>" + "<p class = 'phidden'>" + emp.EmailAddress + "</p>";
        });

        $('.emplist_filter').html(items);
    });
    $('.emplistdiv_filter').css({
        "display": "inline",
        "border-style": "none solid solid solid",
        "border-width": "1px",
        "border-color": "#6E6E6E",
        "float": "left",
        "position": "absolute",
        "z-index": "1000",
        "background": "#FFFFFF"
    });

}


function captureEmployeekeydown(textboxidandclass, formclass) {
    $(formclass).find('.emplistdiv').attr({ "title": "selected" });
    var url = serverpath + '/SafetyTracker/EmployeeList/';
    var items = "";

    $.getJSON(url, { id: $(textboxidandclass).val() }, function (data) {
       
        $.each(data, function (i, emp) {
            items += "<li value = " + emp.EmployeeId + " >" + emp.Fullname + "</li><p class = 'phidden' >" + emp.DepartmentName + "</p>"
            + "<p class = 'phidden' >" + emp.CompanyId + "</p>" + "<p class = 'phidden'>" + emp.EmailAddress + "</p>";
        });

        $('.emplist').html(items);
    });
    $('.emplistdiv').css({
        "display": "inline",
        "border-style": "none solid solid solid",
        "border-width": "1px",
        "border-color": "#6E6E6E",
        "float": "left",
        "position": "absolute",
        "z-index": "1000",
        "background": "#FFFFFF"
    });

}

$('#IMSlist').change(function () {

   // alert('test');
   // alert($(this).val());

        $.ajax({
            url: serverpath + '/SafetyTracker/dropdownimsAssign/',
            data: { output: $(this).val() },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#main_forms').find("#imsresponsible").empty();

                $.each(data, function (index, value) {
                    $('#imsresponsible').text(value.Fullname);
                    $('#myObservation_ResponsibleEmployeeId').val(value.AssignUser);
                    $('#imsemailadd').text(value.EmailAddress);
                });
                
            }
        });
})



$('#filter_div').find('.emplist_filter').delegate('li', 'click', function () {
    filter_count = filter_count + 1;

    if (filter_count == 1) {
     
        emplistliclick_filter($(this), '#filter_div');
    }
   
})


$('#AddTaskActionForm').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#AddTaskActionForm');
})


$('#EditTaskActionForm').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#EditTaskActionForm');
})


$('#EditTaskForm').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#EditTaskForm');
})


$('#main').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#main');
})

$('#main_forms').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#main_forms');


    if ($('.repid').val() == 0) {

    } else {
        $('#validateActionby').text(' Ok');
        $('#validateActionby').css('color','green');
    }

})

$('#FormId').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#FormId');
})

$('#EditActionFormId').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#EditActionFormId');
})

$('#FormAssignInspect').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#FormAssignInspect');
})

$('#EditInspectForm').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#EditInspectForm');
})

$('#EditObservationForm').find('.emplist').delegate('li', 'click', function () {
    emplistliclick($(this), '#EditObservationForm');
})

function emplistliclick(liclick, formname) {
    var name = $(liclick).text();
    var repdept = $(liclick).next().text();
    var groupid = $(liclick).next().next().text();
    var emailadd = $(liclick).next().next().next().text();

    //  var groupid = $(this).val();
 
    $('.empfrom').html("Of <b>" + repdept + "</b><p id= 'reporter_emailadd'>" + emailadd + "</p>");
    $(".Employee").val(name);

    $('.emplist li').remove();
    $('.emplistdiv').css("display", "none");
    $('.emplistdiv').attr({ "title": "unselected" });
    $(".repid").val($(liclick).val());
   $("#reporter_oldname").val(name);
	

    popdropdownlist(groupid, formname);

}


function emplistliclick_filter(liclick, formname) {
    var name = $(liclick).text();
    var repdept = $(liclick).next().text();
    var groupid = $(liclick).next().next().text();
    var emailadd = $(liclick).next().next().next().text();

    $('.empfrom_filter').html("Of <b>" + repdept + "</b><p id= 'reporter_emailadd'>" + emailadd + "</p>");
    $(".Employee_filter").val(name);

    $('.emplist_filter li').remove();
    $('.emplistdiv_filter').css("display", "none");
    $('.emplistdiv_filter').attr({ "title": "unselected" });
    $(".repid_filter").val($(liclick).val());

 
  
}




function popdropdownlist(groupid, formname) {
    var empheadgroup = groupid;

    $.ajax({
        url: serverpath + '/SafetyTracker/dropdownEmpHead/',
        data: { output: empheadgroup },
        type: 'POST',
        cache: false,
        success: function (data) {

            $(formname).find("#Emphead").empty();

            $.each(data, function (index, value) {
                $(formname).find("#Emphead").append("<option value = " + value.EmployeeId + " rheademailad = " + value.EmailAddress + ">" + value.Fullname + "</option>");

            });

            $(".repheadid").val($(formname).find("#Emphead option:first").val());
            //alert($(formname).find("#Emphead option:first").attr('rheademailad'));
            $("#repheademailadd").val($(formname).find("#Emphead option:first").attr('rheademailad'));
        }
    });
}




$(document).delegate('.Employee', 'focus', function () {
  
     if ($('.emplistdiv').attr("title") == "selected") {
        $('.emplist li').remove();
        $('.emplistdiv').css("display", "none");
        $('.emplistdiv').attr({ "title": "unselected" });
  
    }
})


$('#myTask_Title').focus(function () {
    if ($(this).val() == "Title..") { $(this).val(""); }
});

$('#myTask_Title').blur(function () {
    if ($(this).val() == "") { $(this).val("Title.."); }
});

$('#myTask_Task1').focus(function () {
    if ($(this).val() == "Task..") { $(this).val(""); }
});

$('#myTask_Task1').blur(function () {
    if ($(this).val() == "") { $(this).val("Task.."); }
});

$('#myTask_Remarks').focus(function () {
    if ($(this).val() == "Remarks..") { $(this).val(""); }
});

$('#myTask_Remarks').blur(function () {
    if ($(this).val() == "") { $(this).val("Remarks.."); }
});





// myObservation_Activity onfocus and blur
$('#myObservation_Activity').focus(function () {
    if ($(this).val() == "Activity..") { $(this).val(""); }
});

$('#myObservation_Activity').blur(function () {
    if ($(this).val() == "") { $(this).val("Activity.."); }
});

// myObservation_Observations onfocus and blur
$('#myObservation_Observations').focus(function () {
    if ($(this).val() == "Observation..") { $(this).val(""); }
});

$('#myObservation_Observations').blur(function () {
    if ($(this).val() == "") { $(this).val("Observation.."); }
});

// myObservation_ReporterImmediateAction onfocus and blur
$('#myObservation_ReporterImmediateAction').focus(function () {
    if ($(this).val() == "Reporter Immediate Action..") { $(this).val(""); }
});

$('#myObservation_ReporterImmediateAction').blur(function () {
    if ($(this).val() == "") { $(this).val("Reporter Immediate Action.."); }
});

// myObservation_Location onfocus and blur
$('#myObservation_Location').focus(function () {
    if ($(this).val() == "Location..") { $(this).val(""); }
});

$('#myObservation_Location').blur(function () {
    if ($(this).val() == "") { $(this).val("Location.."); }
});

$('#EditObservationForm').submit(function () {
    $('#DialogEditObservation').dialog('close');
 
    $.ajax({

        url: serverpath + '/SafetyTracker/EditObservationData/',
        cache: false,
        data: {
            paramObsId: $('#HiddenObservationId').val(),
            paramRepoterId: $('.repid').val(),
            paramReporterHeadId: $('.repheadid').val(),           
            paramObservation: $('#ObservationFieldEdit').val(),
            paramActivity: $('#ActivityFieldEdit').val(),
            paramReportImmediate: $('#ReportImmediateFieldEdit').val(),
            paramLocation: $('#LocationFieldEdit').val(),
            paramObservationDate: $('#Observationdate').val(),
            paramimsid: $('#IMSlist').val(),
            paramurgencyid: $('#Risklist').val()
            ,paramresponsibleempid: $('#myObservation_ResponsibleEmployeeId').val()

        },
        type: 'POST',
        success: function (data) {
            $.each(data, function (index, observationdata) {
                $("#observation_" + observationdata.ObservationId).find(".impReporter h2").text(observationdata.Reporter);
                $("#observation_" + observationdata.ObservationId).find(".impDeptname span").text(observationdata.DepartmentName);
                $("#observation_" + observationdata.ObservationId).find(".impDate").text(formatDate(observationdata.ObservationDate));

                $("#observation_" + observationdata.ObservationId).find(".impReporterHead b").text(observationdata.ReporterHead);

                $("#observation_" + observationdata.ObservationId).find(".impObservation span").text(observationdata.Observations);
                $("#observation_" + observationdata.ObservationId).find(".impActivity span").text(observationdata.Activity);
                $("#observation_" + observationdata.ObservationId).find(".impLocation b").text(observationdata.Location);
                $("#observation_" + observationdata.ObservationId).find(".impReporterImmediate span").text(observationdata.ReporterImmediateAction);

                $("#observation_" + observationdata.ObservationId).find(".impUrgency b").text(observationdata.UrgencyName);
                $("#observation_" + observationdata.ObservationId).find(".impCategory b").text(observationdata.IMSTypeName);
                $("#observation_" + observationdata.ObservationId).find(".impResponsibleEmp b").text(observationdata.ResponsibleEmployee);
            });
        }
    }
    );
    return false;
});

$('#EditTaskForm').submit(function () {
    $('#DialogEditTask').dialog('close');
  
    $.ajax({

        url: serverpath + '/SafetyTracker/EditTaskData/',
        cache: false,
        data: {
            paramTaskId: $('#HiddenTaskId').val(), 
            paramTitle: $('#TaskTitleField').val(),  
            paramDepartmentId: $('#DepartmentId').val(), 
            paramDateEntered: $('#TaskDateEntered').val(),
            paramTaskActionbyId: $('.repid').val(),
            paramTask: $('#TaskFieldEdit').val(),  
            paramTaskStatusId: $('#TaskStatusId').val(),
            paramTaskTypeId: $('#TaskTypeId').val(),
            paramDateCompletion: $('#TaskDateCompleted').val(), 
            paramDateExtended: $('#TaskDateExtended').val(), 
            paramDateActual: $('#TaskDateActualCompletion').val(), 
            paramRemarks: $('#TaskRemarkEdit').val()

        },
        type: 'POST',
        success: function (data) {
            $.each(data, function (index, taskdata) {
                $("#Task_" + taskdata.TaskId).find(".taskTitle h2").text(taskdata.Title);
                $("#Task_" + taskdata.TaskId).find(".taskDepartment_div h3").text(taskdata.TaskDepartment);
                $("#Task_" + taskdata.TaskId).find(".taskDateEntered_div span").text(formatDate(taskdata.TaskDateEntered));
                $("#Task_" + taskdata.TaskId).find(".taskbyName_div h3").text(taskdata.TaskbyName);
                $("#Task_" + taskdata.TaskId).find(".taskentries_task p").text(taskdata.Task);

                $("#Task_" + taskdata.TaskId).find(".taskstatus_div h3").text(taskdata.Status);
                $("#Task_" + taskdata.TaskId).find(".tasktype_div h3").text(taskdata.TaskTypeName);

                $("#Task_" + taskdata.TaskId).find(".taskcompletiondate_div h3").text(formatDate(taskdata.TaskCompletionDate));
                $("#Task_" + taskdata.TaskId).find(".taskextendeddate_div h3").text(formatDate(taskdata.TaskExtendedDueDate));
                $("#Task_" + taskdata.TaskId).find(".taskactualdate_div h3").text(formatDate(taskdata.TaskActualCompletionDate));

                $("#Task_" + taskdata.TaskId).find(".taskentries_remarks p").text(taskdata.Remarks);

            });
        }
    }
    );
    return false;
});


$('#FormId').submit(function () {
    $('#DialogAddAction').dialog('close');
  
    var reporter_emailad = $('#reporter_emailadd').text();
    var reporterhead_emailad = $('#FormId').find("#Emphead option:first").attr('rheademailad');

    var actorname = $('#AddActionPage').val();
    var actorheadname =  $('#Emphead :selected').text();


  //  alert(reporter_emailad);
  //  alert(reporterhead_emailad);

  //  alert($('#AddActionPage').val());
  //  alert($('#Emphead :selected').text());

    $.ajax({
       
        url: serverpath + '/SafetyTracker/AddAction/',
        data: {
            paramObsId: $('#HiddenobsId').val(),
            paramActorId: $('.repid').val(),
            paramActorHeadId: $('.repheadid').val(),
            paramActionDate: $('#Actiondate').val(),
            paramAction1: $('#ActionField').val(),
            paramActionStatusId: 1,  
            paramWRWONo: $('#WOWRField').val(),
            param_reporter_emailad: reporter_emailad,
            param_reporterhead_emailad: reporterhead_emailad,

            paramActorName: actorname,
            paramActorHeadName: actorheadname


        },
        type: 'POST',
        success: function (data) {
            //   alert("test");
            var ActionObj = "<div class = 'ReportObjfeed'>";

            var actionIdval = $('#HiddenobsId').val();

            $("#act_" + actionIdval + ".ActionsTaken").empty();

            $.each(data, function (index, value) {        
                ActionObj += loadActionObjects(actionIdval, value.Actor, value.DepartmentName,
                        value.ActionId, value.ActionDate, value.Action, value.WRWONo, value.ActorHead, value.ActionSafetyInspectorId,
                        value.Status,
                        value.SafetyInspectorName, value.SafetyInspectorDeptName, value.ActionSafetyInspectorId, value.AssignInspectorDate,
                        value.SafetyComments, value.ConcernTypeName
                        );

                $("#act_" + actionIdval + ".ActionsTaken").html(ActionObj);
                $("#act_" + actionIdval + ".ActionsTaken").append("</div>");
            });
        }
    });
  
    return false;
});


$('#AddTaskActionForm').submit(function () {
    $('#DialogAddTaskAction').dialog('close');

    $.ajax({

        url: serverpath + '/SafetyTracker/AddTaskAction/',
        data: {
            paramtaskid: $('#HiddenTaskId').val(),
            paramtaskactiondate: $('#TaskActiondate').val(),
            paramtaskactedbyid: $('.repid').val(),
            paramtaskaction: $('#TaskActionField').val(),
            paramstatusid: $('#StatusId').val()

        },
        type: 'POST',
        success: function (data) {
            //   alert("test");
            var ActionObj = "<div class = 'ReportObjfeed'>";

            var TaskIdval = $('#HiddenTaskId').val();

            $("#act_" + TaskIdval + ".ActionsTaken").empty();

            $.each(data, function (index, value) {

                var tasknewdate = formatDate(value.TaskActionDate);

                ActionObj += loadTaskActiondataObjects(value.TaskActionId, value.TaskActionbyName,
                        value.DepartmentName, tasknewdate, value.TaskAction, value.Status);
          

                $("#act_" + TaskIdval + ".ActionsTaken").html(ActionObj);
                $("#act_" + TaskIdval + ".ActionsTaken").append("</div>");

            });
        }
    });

    return false;
});


$('#FormAssignInspect').submit(function () {
    $('#DialogAssignInspector').dialog('close');
   
    $.ajax({

        url: serverpath + '/SafetyTracker/AddAssignInspector/',
        cache: false,
        data: {
           paramActionId: $('#HiddenActionAssignInspectId').val(),
           paramSafetyInspectorId: $('.repid').val(),
           paramTypeofConcernId: $('.typeofconcernid').val(),
            paramSafetyComment: $('#SafetyCommentsField').val(),
            paramActionDate: $('#Actiondate1').val(),
            paramActionStatus: $('.actionstatid').val()
            
            //paramActionStatus: $('.actionstatid').val()         
        },
        type: 'POST',
        success: function (data) {
            var safetyinspectobj = "";
                       
            $.each(data, function (index, value) {
                var actionIdval = value.ActionId;
                            
                safetyinspectobj += loadSafetyInspectorObjects(value.SafetyInspectorName, value.SafetyInspectorDeptName, value.ActionSafetyInspectorId,
                    value.AssignInspectorDate, value.SafetyComments, value.ConcernTypeName, value.Status);
               // $("#safe_" + actionIdval + ".safetyobj").empty();
                $("#safe_" + actionIdval + ".safetyobj").html(safetyinspectobj);
                $("#safe_" + actionIdval + ".safetyobj").append("</div>");
            });
        }
    }
    );
    return false;
});

$('#EditActionFormId').submit(function () {
    $('#DialogEditAction').dialog('close');

    $.ajax({

        url: serverpath + '/SafetyTracker/EditActionData/',
        cache: false,
        data: {
            paramActionId: $('#HiddenactionId').val(),
            paramActorId: $('.repid').val(),
            paramActorHeadId: $('.repheadid').val(),
            paramActionDate: $('#Actiondate').val(),
            paramAction1: $('#ActionFieldEdit').val(),
            paramWRWONo: $('#WOWRFieldEdit').val(),
            paramActionStatus: $('.actionstatid').val()

        },
        type: 'POST',
        success: function (data) {


            $.each(data, function (index, safetyval) {
                $("'#action_" + safetyval.ActionId + ".actionobj' p.actionactor").text(safetyval.Actor);
                $("'#action_" + safetyval.ActionId + ".actionobj' i.actionDepartment").text(safetyval.DepartmentName);
                $("'#action_" + safetyval.ActionId + ".actionobj' span.ActionDateAction").text(formatDate(safetyval.ActionDate));
                $("'#action_" + safetyval.ActionId + ".actionobj' span.ActionDataField").text(safetyval.Action);
                $("'#action_" + safetyval.ActionId + ".actionobj' span.ActionWRWONoField").text(safetyval.WRWONo);
                $("'#action_" + safetyval.ActionId + ".actionobj' span.ActionRepHeadField").text(safetyval.ActorHead);
                $("'#safe_" + safetyval.ActionId + ".safetyobj'").find("span.Actionstatusfield").text(safetyval.Status);
            });
        }
    }
    );

    return false;
});


$('#EditTaskActionForm').submit(function () {
    $('#DialogEditTaskAction').dialog('close');

    $.ajax({

        url: serverpath + '/SafetyTracker/EditTaskActionData/',
        cache: false,
        data: {
            paramTaskActionId: $('#HiddenTaskActionId').val(), 
            paramTaskActionDate: $('#EditTaskActiondate').val(),
            paramTaskActionbyId:  $('.repid').val(), 
            paramTaskAction: $('#EditTaskActionField').val(), 
            paramTaskActionStatusId: $('#StatusId').val()

        },
        type: 'POST',
        success: function (data) {
         

            $.each(data, function (index, value) {

                //alert(value.TaskActionbyName);

                $("'#action_" + value.TaskActionId + ".actionobj' p.actionactor").text(value.TaskActionbyName);
                $("'#action_" + value.TaskActionId + ".actionobj' i.actionDepartment").text(value.DepartmentName);
                $("'#action_" + value.TaskActionId + ".actionobj' span.ActionDateAction").text(formatDate(value.TaskActionDate));
                $("'#action_" + value.TaskActionId + ".actionobj' span.ActionDataField").text(value.TaskAction);
                $("'#action_" + value.TaskActionId + ".actionobj' span.Actionstatusfield").text(value.Status);

            });

        }

    });

    return false;
});




$('#EditInspectForm').submit(function () {
    $('#DialogEditInspector').dialog('close');

    $.ajax({

        url: serverpath + '/SafetyTracker/EditInspectorData/',
        cache: false,
        data: {
            paramActionId: $('#HiddenActionId1').val(),
            paramActionSafetyInspectorId: $('#HiddenActionSafetyInspectId').val(),
            paramSafetyInspectorId: $('.repid').val(),
            paramtypeofconcernid: $('.typeofsafetyinspectconcernid').val(),
            paramsafetycomments: $('#SafetyCommentsFieldEdit').val(),
            paramActionDate: $('#ActionSafetyInspectdateId').val(),
            paramActionStatus: $('.safetyInspectstatid').val()

        },
        type: 'POST',
        success: function (data) {


            $.each(data, function (index, value) {
                $("'#safe_" + value.ActionId + ".safetyobj' p.safetyinspectoractor").text(value.SafetyInspectorName);
                $("'#safe_" + value.ActionId + ".safetyobj' i.safetyinspectDepartment").text(value.SafetyInspectorDeptName);
                $("'#safe_" + value.ActionId + ".safetyobj' span.SafetyInspectDate").text(formatDate(value.AssignInspectorDate));
                $("'#safe_" + value.ActionId + ".safetyobj' span.SafetyCommentsDataField").text(value.SafetyComments);
                $("'#safe_" + value.ActionId + ".safetyobj' span.SafetyInspectConcern").text(value.ConcernTypeName);
                $("'#safe_" + value.ActionId + ".safetyobj'").find("span.Actionstatusfield").text(value.Status);
            });

        }
    }

    );

    return false;
});



function formatDate(ActionDate) {

    if (ActionDate != null) { 

    var ms = ActionDate.substring(6, ActionDate.length - 2);

    var date = new Date(parseInt(ms));
    var hour = date.getHours();
    var mins = date.getMinutes() + '';
    var time = "AM";

    // find time 
    if (hour >= 12) {
        time = "PM";
    }
    // fix hours format
    if (hour > 12) {
        hour -= 12;
    }
    else if (hour == 0) {
        hour = 12;
    }
    // fix minutes format
    if (mins.length == 1) {
        mins = "0" + mins;
    }
    // return formatted date time string
    return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

    }

}

var newArray = new Array();
var TaskArray = new Array();
var ImagesArray = new Array();
var all;
var allimage;

function testAction() {
    

    $("#FromImpDateFilter").datepicker({ dateFormat: 'm-d-yy' });
    $("#ToImpDateFilter").datepicker({ dateFormat: 'm-d-yy' });

    var i = 0;
    var x = 0;


   all = loadActions();
   allimage = loadImages();
   x = allimage - 1;

    GetObsImages(x);

   ActsTaken(i);

    // $("#ActionsTaken .").text("test");
    // $("#act_1012.ActionsTaken").text("test");
}

function onloadTask() {

    $("#FromTaskDateFilter").datepicker({ dateFormat: 'm-d-yy' });
    $("#ToTaskDateFilter").datepicker({ dateFormat: 'm-d-yy' });

    var i = 0;

    all = loadTasks();

    TaskActsTaken(i);
}


function loadActionObjects(actionIdval, Actor, DepartmentName,
                            ActionId, ActionDate, Action, WRWONo, ActorHead, ActionSafetyInspectorId,
                            Actstatus, 
                            SafetyInspectorName, SafetyInspectorDeptName, ActionSafetyInspectorId, AssignInspectorDate,
                            SafetyComments, ConcernTypeName
                            
                            ) {

    var url2 = serverpath + '/SafetyTracker/AddActionInspector/?actionid1=' + ActionId;
   

    var actionobject = "";
    
    actionobject += "<div class = 'ReportperObjfeed'>";
    actionobject += loadActiondataObjects(ActionId, Actor, DepartmentName, formatDate(ActionDate), Action, WRWONo, ActorHead);

    if (ActionSafetyInspectorId == null) {
        actionobject += "<div class='safetyobj' id = 'safe_" + ActionId + "' >";
        actionobject += "<div class='onelinefeed'><div class='actionstatus'>Action Status: <span class='Actionstatusfield'>" + Actstatus + "</span></div>";
        actionobject += "<div><div class='editactionlink'> <a href='" + url2 + "' class = 'AssignInspect'>Assign Inspector</a></div> </div></div>";
        actionobject += "</div>";
         
    } else {
        actionobject += "<div class='safetyobj' id = 'safe_" + ActionId + "' >";
        actionobject += loadSafetyInspectorObjects(SafetyInspectorName, SafetyInspectorDeptName, ActionSafetyInspectorId, AssignInspectorDate,
                            SafetyComments, ConcernTypeName, Actstatus, ActionId);
        actionobject += "</div>";
    }
    actionobject += "</div>";
    return actionobject;
}


function loadTaskActiondataObjects(TaskActionId, TaskActionbyName, DepartmentName, TaskActionDate, TaskAction, Status) {
    
    //(ActionId, Actor, DepartmentName, newDate, Action, WRWONo, ActorHead) 

    var url3 = serverpath + '/SafetyTracker/EditTaskAction/?taskactioneditid=' + TaskActionId;

    var Actdataobject = "";
   
    Actdataobject = "<div class = 'TaskperObjfeed'><div class='actionobj' id = 'action_" + TaskActionId + "'><div class='onelinefeed'><div class='actorobject'><p class='actionactor'>" + TaskActionbyName + "</p></div>";
    Actdataobject += "<div class='editactionlink'><a href='" + url3 + "' class='EditAct'>Edit Action</a></div></div>";
    Actdataobject += "<div> of <i class='actionDepartment'>" + DepartmentName + "</i> made an Action.</div>";
    Actdataobject += "<div> Action # " + TaskActionId + "</div>";

    Actdataobject += "<div> Action Date: <span class='ActionDateAction'>" + TaskActionDate + "</span></div>";
    Actdataobject += "<div> Action: <span class='ActionDataField'>" + TaskAction + "</span></div>";
    Actdataobject += "<div class = 'actionstatus'> Action Status: <span class='Actionstatusfield'>" + Status + "</span></div>";
    Actdataobject += "<br/></div></div>";
    return Actdataobject;

}


function loadSafetyInspectorObjects(SafetyInspectorName, SafetyInspectorDeptName, ActionSafetyInspectorId, AssignInspectorDate,
                            SafetyComments, ConcernTypeName, Actstatus, ActionId) {

    var safeinspectobject = "";
    var url4 = serverpath + '/SafetyTracker/EditInspector/?actionsafetyid=' + ActionSafetyInspectorId;

    safeinspectobject += "<div>ASSIGNED AUDITOR</div><div><p class='safetyinspectoractor'>" + SafetyInspectorName + "</p></div>";
    safeinspectobject += "<div> of <i class='safetyinspectDepartment'>" + SafetyInspectorDeptName + "</i> is Assigned Auditor.</div>";
    safeinspectobject += "<div> Inspection Date: <span class = 'SafetyInspectDate'>" + formatDate(AssignInspectorDate) + "</span></div>";
    safeinspectobject += "<div>Comments: <span class='SafetyCommentsDataField'>" + SafetyComments + "</span></div>";
    safeinspectobject += "<div> Type of Concern: <span class ='SafetyInspectConcern'>" + ConcernTypeName + "</span></div>";
    safeinspectobject += "<br><div><a href='" + url4 + "' class='EditInspect'>Edit..</a></div>";
    safeinspectobject += "<div class='actionstatus'>Action Status: <span class='Actionstatusfield'>" + Actstatus + "</span></div>";
    return safeinspectobject;

}

function loadActiondataObjects(ActionId, Actor, DepartmentName, newDate, Action, WRWONo, ActorHead) {

    var url3 = serverpath + '/SafetyTracker/EditAction/?actioneditid=' + ActionId;

    var Actdataobject = "";
    Actdataobject = "<div class='actionobj' id = 'action_" + ActionId + "'><div class='onelinefeed'><div class='actorobject'><p class='actionactor'>" + Actor + "</p></div>";
    Actdataobject += "<div class='editactionlink'><a href='" + url3 + "' class='EditAct'>Edit Action</a></div></div>";
    Actdataobject += "<div> of <i class='actionDepartment'>" + DepartmentName + "</i> made an Action.</div>";
    Actdataobject += "<div> Action # " + ActionId + "</div>";

    Actdataobject += "<div> Action Date: <span class='ActionDateAction'>" + newDate + "</span></div>";
    Actdataobject += "<div> Action: <span class='ActionDataField'>" + Action + "</span></div>";
    Actdataobject += "<div> WO/WR Number: <span class='ActionWRWONoField'>" + WRWONo + "</span></div>";
    Actdataobject += "<br><div> Responsible Head: <span class='ActionRepHeadField'>" + ActorHead + "</span></div></div>";

    return Actdataobject;

}


function ActsTaken(i) {
    if (i < all) {
        $.ajax({
            url: serverpath + '/SafetyTracker/ActionsTaken/',
            //url: '@Url.Action("ActionsTaken","SafetyTracker")',
            data: { observationID: newArray[i] },
            type: 'POST',
            success: function (data) {
                
                var ActionObj = "<div class = 'ReportObjfeed'>";
                $.each(data, function (index, value) {

                    var actionIdval = value.ActionId;
                    var actdate = new Date(value.ActionDate);
                    var actmonth = actdate.getMonth();

                    ActionObj += loadActionObjects(actionIdval, value.Actor, value.DepartmentName,
                            value.ActionId, value.ActionDate, value.Action, value.WRWONo, value.ActorHead, value.ActionSafetyInspectorId,
                            value.Status,
                            value.SafetyInspectorName, value.SafetyInspectorDeptName, value.ActionSafetyInspectorId, value.AssignInspectorDate,
                            value.SafetyComments, value.ConcernTypeName
                            );

                    $("#act_" + newArray[i] + ".ActionsTaken").html(ActionObj);
                   
                }

                );
                $("#act_" + newArray[i] + ".ActionsTaken").append("</div>");
                i++;
                ActsTaken(i);

            }
        });
    }

};


function TaskActsTaken(i) {
    if (i < all) {
        $.ajax({
            url: serverpath + '/SafetyTracker/TaskActionsTaken/',
            data: { taskID: TaskArray[i] },
            type: 'POST',
            success: function (data) {

                var ActionObj = "<div class = 'ReportObjfeed'>";
               
                $.each(data, function (index, value) {

                    var tasknewdate = formatDate(value.TaskActionDate);
                   // var actmonth = actdate.getMonth();

                    ActionObj += loadTaskActiondataObjects(value.TaskActionId, value.TaskActionbyName,
                        value.DepartmentName, tasknewdate, value.TaskAction, value.Status);

                    $("#act_" + TaskArray[i] + ".ActionsTaken").html(ActionObj);

                }

                );
                $("#act_" + TaskArray[i] + ".ActionsTaken").append("</div>");
                i++;
                TaskActsTaken(i);

            }
        });
    }

};


function GetObsImages(x) {
    
    var a = 0;
    var ImagesObsHtml = "";
    var imagepath = serverpath + '/PictureUpload/Observation/';
  

   //alert(x);

    if (a <= x) {
       
        $.ajax({
            url: serverpath + '/SafetyTracker/GetImagesObservation/',
            //url: '@Url.Action("ActionsTaken","SafetyTracker")',
            data: { iobsID: ImagesArray[x] },
            type: 'POST',
            success: function (data) {
             
                

                $.each(data, function (index, value) {
                   
                  //  alert(ImagesArray[x]);
                    ImagesObsHtml += "<a class='anoborder' href='" + serverpath + '/SafetyTracker/ViewPictureSlider/?observationid=' + ImagesArray[x] + "&imgobsidparam=" + value.ImgObsid + "&imgfname=" + value.ImgObsfname + "'><div class='image1'><img width='350' height='250' class = 'impImagesrc' src= '" + imagepath + ImagesArray[x] + "/" + value.ImgObsfname + "' /></div></a>";

                        $("#imgobs_" + ImagesArray[x] + ".impImage").html(ImagesObsHtml);
                    }
                );
             
                x--;
              //  alert(x);
                GetObsImages(x);
               
            }
        });
    }
};


function loadTasks() {
  
    var arraytask = 0;

    for (var i = 0; i < $(".TaskId").length; i++) {

        if ($(".TaskActionCount:eq(" + i + ")").val() == '0') {
            $(".ActionsTaken:eq(" + i + ")").text("No actions yet.");

        } else {
            TaskArray[arraytask] = $(".TaskId:eq(" + i + ")").val();
            arraytask++;
        }
    }
    return arraytask++;
}



function loadActions() {
    var obseration_ID;
    var arrayi = 0;

    for (var i = 0; i < $(".ObsrvId").length; i++) {

        if ($(".ObsActioncount:eq(" + i + ")").val() == '0') {
            $(".ActionsTaken:eq(" + i + ")").text("No actions yet.");

        } else {
            newArray[arrayi] = $(".ObsrvId:eq(" + i + ")").val();
            arrayi++;
        }
    }
    return arrayi++;
}


function loadImages() {
    var inc = 0;
    for (var i = 0; i < $(".ObsrvId").length; i++) {

        if ($(".ObsPicturecount:eq(" + i + ")").val() == '0') {
            $(".impImage:eq(" + i + ")").text("No Image.");

        } else {

            ImagesArray[inc] = $(".ObsrvId:eq(" + i + ")").val();

           

            inc++;

        }
    }
    return inc++;
}


//$('#ImplementorFormFilter').submit(function () {
$("#SearchImp").click(function () {

    var category = $('#IMSTypeFilter').val();
    var itemspage = $('#ItemViewFilter').val();

    var sdate = $("#FromImpDateFilter").val();
    var edate = $("#ToImpDateFilter").val();
    var empname = $("#ImplementorFilter.Employee").val();

    var cbox_cat = $("#CategoryAll").prop('checked');

    var empid;

   // alert(cbox_cat);
    if (empname == "") {
        empid = 0;

    } else {
        empid = $(".repid_filter").val();
    }

    if (cbox_cat == true) {
        category = 0;

    }
    

    

    //alert($(".repid").val());


   
    if (sdate == null || edate == null || sdate == "" || edate == "") {
        alert("Please Fill in the Date Range.");
        //document.location.href = serverpath + '/SafetyTracker/Implementor/Filter/' + category + '/' + itemspage;
    } else if (empid != null) {
    document.location.href = serverpath + '/SafetyTracker/Implementor/Filter/' + category + '/' + itemspage + '/' + sdate + '/' + edate + '/' + empid;

    } else
    {
        document.location.href = serverpath + '/SafetyTracker/Implementor/Filter/' + category + '/' + itemspage + '/' + sdate + '/' + edate;
    }
 //   $("#datedata").data("test", { first: sdate });
    $("#empdata").data("empname", { first: empname });
    
  //  $('#IMSTypeFilter').val(category);
  //  $('#ItemViewFilter').val(itemspage);

    $("#ImplementorFilter.Employee").text($("#empdata").data("empname").first);
  //  $("#ToImpDateFilter").text(edate);

 //   $("#ImplementorFilter.Employee").val(edate);



})

$("#SearchTask").click(function () {

    var dept = $('#DepartmentFilter').val();
    var tasktype = $('#TasktypeFilter').val();

    var sdate = $("#FromTaskDateFilter").val();
    var edate = $("#ToTaskDateFilter").val();


    if (sdate == null || edate == null || sdate == "" || edate == "") {
        alert("Please Fill in the Date Range.");
    } else {
        document.location.href = serverpath + '/SafetyTracker/Task/TaskFilter/' + dept + '/' + tasktype + '/' + sdate + '/' + edate;

    }
   // $("#datedata").data("test", { first: sdate });

    $('#DepartmentFilter').val(dept);
    $('#TasktypeFilter').val(tasktype);

    //$("#FromImpDateFilter").text($("#datedata").data("test").first);
    $("#FromTaskDateFilter").text(sdate);
    $("#ToTaskDateFilter").text(edate);

})


function formatfilterdate(ActionDate) {

    var ms = ActionDate.substring(6, ActionDate.length);



    var date = new Date(parseInt(ActionDate));

    var hour = date.getHours();
    var mins = date.getMinutes() + '';
    var time = "AM";

    // find time 
    if (hour >= 12) {
        time = "PM";
    }
    // fix hours format
    if (hour > 12) {
        hour -= 12;
    }
    else if (hour == 0) {
        hour = 12;
    }
    // fix minutes format
    if (mins.length == 1) {
        mins = "0" + mins;
    }
    // return formatted date time string
    return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
}