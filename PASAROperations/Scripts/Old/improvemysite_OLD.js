var serverpath = "";
var lastclicked = 0;
var beingclicked = 0;


$('#hideme').click(function () {

    if ($("#CFcycleselectorForm").is(":hidden")) {
        $("#CFcycleselectorForm").show("slide", { direction: "left" }, 300);
        $('#hideme').text('HIDE');
        $('#hideme').removeClass();
        $('#hideme').addClass('showform');
        $('#second_div').css({ "float": "" });
        $('#second_div').css({ "margin-left": "280px" });
        $('#Silica_Req_div_cflogsheet').css({ "left": "1490px" });

    } else {
        $('#second_div').css({ "float": "left" });
        $('#second_div').css({ "margin-left": "10px" });
        

     
        $("#CFcycleselectorForm").hide("slide", { direction: "left" }, 300, function () {
            $('#hideme').text('SHOW');
            $('#hideme').removeClass();
            $('#hideme').addClass('hideform');
            $('#Silica_Req_div_cflogsheet').css({ "left": "1260px" });
        });       
    }
});

$('#addcampbtn').click(function () {
    var campaign_current = $('#campaignvalue').text();
    
    var campaign_current_plusone = parseInt(campaign_current) + 1;
  
    $.ajax({
        url: serverpath + '/Operations/AddCampaign/',
        data: { campaign_num: campaign_current_plusone },
        type: 'POST',
        cache: false,
        success: function (data) {

            $('#campaignvalue').text(data.campmax);
            $('#div2').css({ "background": "#CCFFCC" });

        }
    });
});



$('.EditCampaign').click(function () {

    var convid = $(this).attr('id');
    $('#assigncampaign_tbl a').text('');

    var selectList = document.createElement("select");
    selectList.id = "CampSelect";

    var oldcampid = $('#tdcampid_' + convid).text();

    //alert(oldcampid);

    $('#tdcampid_' + convid).empty();
    $('#tdcampid_' + convid).append(selectList);
    
    $.ajax({
        url: serverpath + '/Operations/ViewCampaign/',
        
        type: 'POST',
        cache: false,
        success: function (data) {

            

            $.each(data, function (index, value) {
 $('#CampSelect').append("<option value = " + value.CampaignId + ">" + value.CampaignNumber + "</option>");

            });

            $("#CampSelect").prop("selectedIndex", (oldcampid - 1));
        }
    });

    

    $(this).html('<a href = ' + serverpath + '/Operations/NewCampaign>Cancel</a>');
    $('#tdselect_' + convid).html('<a href="#" onclick="SelectCamp(' + convid + ');return false;">Select</a>');


    $('#tredit_' + convid + ' td').css({ "background": "#E6FFE6" });
    


});

function SelectCamp(convid) {
    //alert('test');
    var campid = $('#CampSelect').val();
 
    $.ajax({
        url: serverpath + '/Operations/EditConverter/',
        data: { paramcampid: campid, paramconverterid: convid },
        type: 'POST',
        cache: false,
        success: function (data) {
            document.location.href = serverpath + '/Operations/NewCampaign';
        }
    });
}



$('#cycle_select_form').submit(function (event) {

    event.preventDefault();
    load_cycle_selector();
 

});

function load_cycle_selector() {
    $('#cycletable td').remove();

    var cycleselectsdate = $('#startdate').val();
    var cycleselectedate = $('#enddate').val();

    cycleselectsdate = cycleselectsdate.substring(0, cycleselectsdate.length-5);
    cycleselectedate = cycleselectedate.substring(0, cycleselectedate.length-5);

    
    $.ajax({

        url: serverpath + '/Operations/CFCycleSelector/',

        data: {
            cyclenum: $('#converter').val(),
            startdate: $('#startdate').val(),
            enddate: $('#enddate').val()
        },

        type: 'POST',
        cache: false,
        success: function (data) {


            $.each(data, function (index, value) {
                $('#cycletable tr:last').after('<tr><td>' + value.ConverterName + '</td><td class= "cycleselectortime">' + formatDate_js(value.Cycle_Start_Time) + '</td><td  class="cycletablecyclenum"><a href="' + serverpath + '/Operations/CFLogsheet/' + value.CycleId + '/' + cycleselectsdate + '/' + cycleselectedate + '/' + $('#converter').val() + '">' + value.CycleNumber + '</a></td><td class="cyclestatname">' + value.CycleStatusName + '</td></tr>');
            });
        }
    });

}

 


//$(function () {
//    $("#datepicker").datepicker();
//});

$(".date_pick").focus(function () {
      $(this).datepicker({ dateFormat: "mm/dd/yy 7:00" });

});

//$('.userinput').click(function () {
    
//    if ($(this).parent().find('td.computed:first').text() == 1) {
        
//    } else {
//       $(this).parent().find('td.computed:first').text('1');
//        $(this).parent().find('td.userinput').html("<input type = 'text' class='inputfields'>");
//    }

//});


$('.tabs dd').click(function () {
   
  //  alert('test');
  //  var x = $(this).find('a').attr('href').replace('#','');
  //  var content;

  ////  alert(x);

  //  $('.horizontaltabs .tabs dd').removeClass();
  //  $(this).addClass('active');

  //  content = $('.tabs-content').find('div#' + x);

  ////  alert(content);

  //  $('.tabs-content div').removeClass();
  //  $('.tabs-content div').addClass('content');
  // content.addClass('content active');

});

$(document).on('click','.tabs.vertical dd',function(){
//$('.tabs.vertical dd').click(function () {

   //alert("test");

    $('.tabs.vertical dd').removeClass();
    $(this).addClass('active');
    $('.horizontaltabs .tabs dd:first').addClass('active');

    //content = $('.tabs-content').find('div#' + x);

    ////  alert(content);

    //$('.tabs-content div').removeClass();
    //$('.tabs-content div').addClass('content');
    //content.addClass('content active');

});

function formatDate(theDate) {

    if (theDate == null) {
        return '-';

    } else {


        var ms = theDate.substring(6, theDate.length - 2);

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
            mins = "00" + mins;
        }

        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        // return formatted date time string
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + datemin;
    }
}

function formatDate_ongoing(theDate, ActivityMode) {

    var endtime_val;

    if (ActivityMode == 2) {

        return 'ON-GOING';

    } else {

        return formatDate(theDate);

    }

}

function format_ongoing(theval, ActivityMode) {

    var endtime_val;

    if (ActivityMode == 2) {

        return '*';

    } else {

        return theval;

    }

}

$('#cycletable th').live('click', function () {

    var th = $(this), thIndex = th.index();
    var table = $(this).parent().parent();

    switch($(this).attr('inverse')){
        case 'false': inverse = true; break;
        case 'true:': inverse = false; break;
        default: inverse = false; break;
    }
    th.attr('inverse',inverse)

    table.find('td').filter(function(){
        return $(this).index() === thIndex;
    }).sortElements(function(a, b){
        return $.text([a]) > $.text([b]) ?
            inverse ? -1 : 1
            : inverse ? 1 : -1;
    }, function(){
        // parentNode is the element we want to move
        return this.parentNode; 
    });
    inverse = !inverse;     
});

$('#cycle_cancel_btn').live('click', function () {
   
    close_addcycle();
    
});

function close_addcycle() {
    var tr_id = $('#cycle_converterid').text();


    $('#tredit_' + tr_id).removeClass('cycle_selected');

    $('#DialogCycle_Select').dialog('close');

}

$('#cycle_ok_btn').live('click', function () {

    var cyclenum = $('#cyclenum_div').text();
    var converter_id = $('#cycle_converterid').text();
    var startdate = $('#cycle_startdate').text();
    var camp_id = $('#cycle_campid').text();

    var sday = Date.today().add(-1).days().toString('MM-dd-yyyy');
    var eday = Date.today().toString('MM-dd-yyyy');



    $.ajax({
        url: serverpath + '/Operations/AddCycle/',
        data: {
            cyclenum_param: cyclenum,
            convid_param: converter_id,
            cycstartdate_param: startdate,
            campid_param: camp_id

        },
        type: 'POST',
        cache: false
        ,
        success: function (data) {
           
            document.location.href = serverpath + '/Operations/CFLogsheet/' + data + '/' + sday + '/' + eday + '/CV1';
          //  var thelink = serverpath + '/Operations/CFLogsheet/' + CycleId + '/' + sday + '/' + eday;
        }
    });

    $('#DialogCycle_Select').dialog('close');

});

$('#tuyere_btn_ok').live('click', function () {


    var tuyerenum = $('#tuyerenum').val();
    var tuyerestat = $('#tuyerestat').val();
    var tuyerestat_desc = $('#tuyerestat option:selected').text();
    var tuyerecycid = $('#tuyere_cycid').text();

    
    $.ajax({
        url: serverpath + '/Operations/Change_Tuyere/',
        data: {
            cycid: tuyerecycid,
            tuy_num: tuyerenum,
            tuy_statid: tuyerestat
        },
        type: 'POST',
        cache: false
        ,
        success: function (data) {
            var tuy_msg = "Tuyere Number: <b>" + tuyerenum + "</b> is now <b>" + tuyerestat_desc + "<b/>.";
            $('#tuyere_msg').html(tuy_msg);

            populate_tuyere_tbl(tuyerecycid);
    
        }
    });

});

$('#tuyere_btn_cancel').live('click', function () {
    $('#DialogTuyere_Select').dialog('close');
});

function populate_tuyere_tbl(cycleid) {

    var block_tuy_count = 0;
    var clog_tuy_count = 0;

    $.ajax({
        url: serverpath + '/Operations/Populate_Tuyere/',
        data: {
            cycid: cycleid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (i, value) {

                if (value.Tuyere_State_Symbol == 'C') {
                    $('#tuyere_td_' + value.TuyereNumber).text(value.Tuyere_State_Symbol);
                    $('#tuyere_td_' + value.TuyereNumber).removeClass();
                    $('#tuyere_td_' + value.TuyereNumber).addClass('clog_tuy');

                    clog_tuy_count = clog_tuy_count + 1;
                   
                
                } else if (value.Tuyere_State_Symbol == 'B') {
                    $('#tuyere_td_' + value.TuyereNumber).text(value.Tuyere_State_Symbol);
                    $('#tuyere_td_' + value.TuyereNumber).removeClass();
                    $('#tuyere_td_' + value.TuyereNumber).addClass('block_tuy');

                    block_tuy_count = block_tuy_count + 1;

                } else if (value.Tuyere_State_Symbol == 'N') {
                    $('#tuyere_td_' + value.TuyereNumber).text('');
                    $('#tuyere_td_' + value.TuyereNumber).removeClass();
                }

          
            });

            $('#cftuyere_blockcount').text(block_tuy_count);
            $('#cftuyere_clogcount').text(clog_tuy_count);

        }
    });

}

function cyc_stat_select(cycstat) {

    $('#aref_stat1').text('');
    $('#aref_stat2').text('');
    $('#aref_stat3').text('');


    $('#aref_stat' + cycstat).text('Select');


    $('#aref_remarks1').text('');
    $('#aref_remarks2').text('');
    $('#aref_remarks3').text('');
    
    if (cycstat == 1) {
        $('#aref_remarks' + cycstat).text('Not Yet Finished.');
    }

    else if (cycstat == 2) {
        $('#aref_remarks1').text('Finished.');
        $('#aref_remarks' + cycstat).text('Not Yet Checked.');
    }

    else if (cycstat == 3) {
        $('#aref_remarks1').text('Finished.');
        $('#aref_remarks2').text('Checked.');
        $('#aref_remarks' + cycstat).text('Not Yet Loaded.');
    }

    else if (cycstat == 4) {
        $('#aref_stat3').text('Select');
        $('#aref_remarks1').text('Finished.');
        $('#aref_remarks2').text('Checked.');
        $('#aref_remarks3').text('Loaded.');
    }
    
}

$('.aref_stat').click(function () {
    
    var selectval = $(this).text();
    var cyc_statid = $('#cyc_statval').text();

    if (selectval == 'Select') {
        $(this).text('Cancel');
        $(this).parent().parent().find('td.cyc_stat_option:first').html('<a href="#" onclick="change_cycstat(1);return false;">Yes</a> &nbsp; &nbsp; &nbsp; <a href="#" onclick="change_cycstat(0);return false;">No</a>');
    } else {
        cyc_stat_select(cyc_statid);
    }    
});

function change_cycstat(yesorno) {

    var cycid_ =  parseInt($('#cyc_cycid').text());
    var cycstatid = parseInt($('#cyc_statval').text());
    var cycstatval = $('#cfstatus_cycledetail').text();

    var msg;

    if (yesorno == 1) {
        switch (cycstatid) {

            case 1:
                msg = "Are you sure you want to End the Cycle?";
                break;

            case 2:
                msg = 'Are you sure you have Checked All the data in the Cycle?';
                break;

            case 3:
                msg = 'Are you sure that Data is now loaded to BI?';
                break;

            case 4:
                msg = 'Are you sure that Data is now loaded to BI?';
                break;
        }
    } else if (yesorno == 0) {
        switch (cycstatid) {

            case 1:
                msg = "Are you sure you want to have the Cycle in On-Going?";
                break;

            case 2:
                msg = 'Are you sure you want the Cycle back to On-Going?';
                break;

            case 3:
                msg = 'Are you sure you want the Cycle be back to Un-Checked?';
                break;

            case 4:
                msg = 'Are you sure that Data is not yet loaded to BI?';
                break;
        }
    }

  

    if (yesorno == 1 && cycstatid == 4) {
        cycstatid;
    } else if (yesorno == 1 ) {
        cycstatid = cycstatid + 1;
    }else if (yesorno == 0 && cycstatid == 1) {
        cycstatid;
    } else if (yesorno == 0) {
        cycstatid = cycstatid - 1;
    }

    var answer = confirm(msg);

    if (answer) {
        $.ajax({
            url: serverpath + '/Operations/EditCycleStat/',
            data: {
                cycid: cycid_,
                statid: cycstatid
            },
            type: 'POST',
            cache: false,
            success: function (data) {
             

                $.each(data, function (index, value) {

                    $('#cyc_statval').text(value.CycleStatId);
                    $('#cfstatus_cycledetail').text(value.CycleStatusName);

                    //alert(value.Cycle_End_Time);
                    $('#cfendtitme_cycledetail').text(formatDate(value.Cycle_End_Time));
                   // alert(value.CycleStatusName);
                   // $('#cfstatus_cycledetail').text('Test');
                   // $('#CampSelect').append("<option value = " + value.CampaignId + ">" + value.CampaignNumber + "</option>");

                });


                cyc_stat_select(cycstatid);

            }
        });

    }
    else {
       
    }

}

$('#employee_shift_btn_ok').click(function () {

    var shiftdate_ = $('#date_employeeform').val();
    
    var bool_supervisor = $('#Supervisorlist').prop("disabled");
    var bool_skimmer1 = $('#Skimmer1list').prop("disabled");
    var bool_skimmer2 = $('#Skimmer2list').prop("disabled");
    var bool_skimmer3 = $('#Skimmer3list').prop("disabled");
    var bool_skimmer4 = $('#Skimmer4list').prop("disabled");
    var bool_operator = $('#Operatorlist').prop("disabled");

   
    if (shiftdate_ == '') {
        alert('Please Enter a valid date.');

    }
    else {

        var shiftid_ = $('#Shiftlist').val();
        var supid = $('#Supervisorlist').val();
        var skim1 = $('#Skimmer1list').val();
        var skim2 = $('#Skimmer2list').val();
        var skim3 = $('#Skimmer3list').val();
        var skim4 = $('#Skimmer4list').val();
        var optrid = $('#Operatorlist').val();


        $.ajax({
            url: serverpath + '/Operations/EmployeeShift_Assign/',
            data: {
                shiftdate: shiftdate_,
                shiftid: shiftid_,
                supervisorid: supid,
                skimmer1id: skim1,
                skimmer2id: skim2,
                skimmer3id: skim3,
                skimmer4id: skim4,
                operatorid: optrid,
                supervisor_bool: bool_supervisor,
                skimmer1_bool: bool_skimmer1,
                skimmer2_bool: bool_skimmer2,
                skimmer3_bool: bool_skimmer3,
                skimmer4_bool: bool_skimmer4,
                operator_bool: bool_operator

            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Shift now added.');
               
            }
        });
    }

});

$('#employee_shiftsched_btn_ok').click(function () {

    var empshiftsched_date = $('#date_employeeshiftsched').val();
    if (empshiftsched_date == '') {
        alert('Please Enter a valid date.');

    }
    else {
        populate_7to7shift(empshiftsched_date);
        populate_3Shift(empshiftsched_date);
    }
   
});

function populate_7to7shift(empshiftsched_date) {

        $('#employeeshiftsched_table td').remove();

        $.ajax({
            url: serverpath + '/Operations/EmployeeShiftSched7to7/',

            data: {
                shiftdate_param: empshiftsched_date
            },

            type: 'POST',
            cache: false,
            success: function (data) {

              

                $.each(data, function (index, value) {

                    $('#employeeshiftsched_table tr:last').after('<tr><td>' + empshiftsched_date + '</td><td>' + value.EmployeeRoleName + '</td><td>' + remove_null_fromshift(value.Shift7amto7pm) + '</td><td>' + remove_null_fromshift(value.Shift7pmto7am) + '</td></tr>');
                });
            }
        });

}

function populate_3Shift(empshiftsched_date) {

    $('#emplyeeshiftsched_table3shift td').remove();

    $.ajax({
        url: serverpath + '/Operations/EmployeeShiftSched3Shift/',

        data: {
            shiftdate_param: empshiftsched_date
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#emplyeeshiftsched_table3shift tr:last').after('<tr><td>' + empshiftsched_date + '</td><td>' + value.EmployeeRoleName + '</td><td>' + remove_null_fromshift(value.Shift7to3) + '</td><td>' + remove_null_fromshift(value.Shift3to11) + '</td><td>' + remove_null_fromshift(value.Shift11to7) +'</td></tr>');
            });
        }
    });

}


function remove_null_fromshift(shiftname) {

    var shiftname_val;

    if (shiftname == null) {
        shiftname_val = '-';

    } else {

        shiftname_val = shiftname;
    }

    return shiftname_val;
}


function add_cfstage(stageid) {

    var cycid = $('#cyc_cycid').text();
    $('#stageid_value').val(stageid);
    var StageName_ = $('#td_stage_' + stageid).text();

    $.ajax({
        url: serverpath + '/Operations/AddCFStage/',

        data: {
            cycid_param: cycid,
            stageid_param: stageid
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            
            alert('CF Stage: ' + StageName_ + " now successfully added!");

            $('#DialogAdd_Stage').dialog('close');
            cyc_active_stage(cycid, stageid);
        }
    });

}

function edit_cfstage_stat(cyclestageid_, disable_enable, stageid_) {

    var themsg;
    var cycid = $('#cyc_cycid').text();
    $('#stageid_value').val(stageid_);

    if (disable_enable == 1) {

        themsg = 'Stage now Enable.';

    } else if (disable_enable == 0) {
     themsg = 'Stage now Disabled.';
    
    }

    $.ajax({
        url: serverpath + '/Operations/EditCycleStage/',

        data: {
            cycstageid_param: cyclestageid_,
            trueorfalse: disable_enable
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert(themsg);

            $('#DialogAdd_Stage').dialog('close');
            cyc_active_stage(cycid, stageid_);
            cyc_activity_perstage(cycid, stageid_)

        }
    });

    

}

function ddactive(stageid) {

    

    var cycid = $('#cyc_cycid').text();

    $('.tabs.vertical dd').removeClass();
    $('#ddcycstage_' + stageid).addClass('active');

    cyc_activity_perstage(cycid, stageid);
    cyc_activity_perstage_daterange(cycid, stageid);

    cyc_stage_employee_assign(cycid, stageid);

    $(stageid_value).val(stageid);

    fesilica_populate_cflogsheet_tbl(stageid);

    //$('.horizontaltabs .tabs dd:first').addClass('active');

    //content = $('.tabs-content').find('div#' + x);

    ////  alert(content);

    //$('.tabs-content div').removeClass();
    //$('.tabs-content div').addClass('content');
    //content.addClass('content active');

}

function cyc_active_stage(cycid, stageid_) {

    $('.tabs.vertical dd').remove();

    $.ajax({
        url: serverpath + '/Operations/Cycle_ActiveStage/',

        data: {
            cycid_param: cycid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                    $('.tabs.vertical').append('<dd id="ddcycstage_' + value.StageId + '" ><a href="#" onclick="ddactive(' + value.StageId + ');return false;">' + value.StageName + '</a></dd>');

            });
            $('#ddcycstage_' + stageid_).addClass('active');

            
        }
    });



}


function cyc_activity_perstage(cycid_, stageid_) {
 //   $('.tabs.vertical dd').remove();
   
    $('.cftable td').remove();

    $.ajax({
        url: serverpath + '/Operations/ActivityperStage/',

        data: {
            cycleid_actparam: cycid_,
            stageid_actparam: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
        
            $.each(data, function (index, value) {
                
                $('.cftable tr:last').after('<tr id="tr_act' + value.ActivityId + '"><td class="hide_td">' + value.ActivityId + '</td><td>' + value.ActivityDesc + '</td></td><td class= "cftdcenter">' + value.ActivityCodeName + '</td><td class= "cftdcenter">' + formatDate(value.StartTime) + '</td><td class= "cftdcenter enddate_' + value.ActivityMode + '">' + formatDate_ongoing(value.EndTime, value.ActivityMode) + '</td><td class= "cftdcenter enddate_' + value.ActivityMode + '">' + format_ongoing(value.ActDuration, value.ActivityMode) + '</td><td class= "cftdcenter">' + zerovalue(value.FSFE_Quantity) + '</td><td class= "cftdcenter">' + zerovalue(value.CF_Quantity) + '</td><td class= "cftdcenter">' + zerovalue(value.AF_Quantity) + '</td><td></td><td>' + value.ActComment + '</td><td id= "disable_id' + value.ActivityId + '" class="disable_cfact" onclick="Disable_btn_activity(\'' + value.ActivityDesc + '\',' + value.ActivityId + ');return false;"></td><td  id= "edit_id' + value.ActivityId + '" class="edit_cfact" onclick="Edit_btn_activity(' + value.ActivityId + ');return false;"></td><td  id= "insertmiddle_id' + value.ActivityId + '"  class="insertmiddle_cfact" onclick="InsertMiddle_btn_activity (' + value.ActivityId + ');return false;"></td></tr>');

            });
          
        }
    });
}

function cyc_stage_employee_assign(cycid_, stageid_) {

    $('.cftable td').remove();

    $.ajax({
        url: serverpath + '/Operations/ActivityperStage_Employee/',

        data: {
            cycleid_actparam: cycid_,
            stageid_actparam: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.EmployeeRoleStageId == 1) { $('#assign_sup').text(value.Fullname); }
                else if (value.EmployeeRoleStageId == 2) { $('#assign_opt').text(value.Fullname); }
                else if (value.EmployeeRoleStageId == 3) { $('#assign_skim').text(value.Fullname); }

            });

        }
    });
}




function  zerovalue(thevalue){

    var nozero;



    if (thevalue == 0) {

        nozero = "-";
    } else {

        if (thevalue % 1 == 0) {
            nozero = thevalue;
        } else {
            nozero = thevalue.toFixed(2);
        }

        

    }

    return nozero;
}

function zerovalue_null(thevalue) {

    var nozero;

    if (thevalue == null || thevalue == '') {

        nozero = 0;
    } else {
        nozero = thevalue;


    }

    return nozero;
}

function zerovalue_qty(thevalue, disable_enable) {

    var nozero;
    
    if (disable_enable == true) { nozero = 0; } else {

        if (thevalue == "") {

            nozero = 0;
        } else {

            nozero = thevalue;

        }
    }

    return nozero;
}

function cyc_activity_perstage_daterange(cycid_, stageid_) {

    $.ajax({
        url: serverpath + '/Operations/ActivityperStageDateRange/',
        data: {
            cycleid_actparam: cycid_,
            stageid_actparam: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#starttime_perstage_tab').text(formatDate(data.StartDateTime));
            $('#endtime_perstage_tab').text(formatDate(data.EndDateTime));
            
        }
    });

}

function getDUration() {

    var start_date = new Date($('#start_time_value').text());

    $('.duration_span').text('');
    

    var end_date = new Date($('#end_date_input').val());
    var end_hr = $('#end_time_hr_input').val();
    var end_min = $('#end_time_min_input').val();

   
    end_date = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var the_dur = Math.floor((end_date - start_date) / 60000);

    if (end_date > Date.now()) {

        $('#error_msg_time').html('ERROR: <b>End Time</b> cannot be set to a future date.');
        $('.duration_span').text('ERROR');

    } else if (end_date < start_date) {

        $('#error_msg_time').html('ERROR: <b>End Time</b> is lesser than the <b>Start Time</b>.');
        $('.duration_span').text('ERROR');


    } else {
        $('#error_msg_time').html('Correct: <b>End Time</b> is Good.');
        $('.duration_span').text(the_dur);
    }
}

function getDUration_editact() {

    var start_date = new Date($('#start_time_value_editact').text());

    $('.duration_span').text('');

   
    var end_date = new Date($('#end_date_input_editact').val());
    var end_hr = $('#end_time_hr_input_editact').val();
    var end_min = $('#end_time_min_input_editact').val();

    end_date = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var the_dur = Math.floor((end_date - start_date) / 60000);

    if (end_date > Date.now()) {

        $('#error_msg_time_edit').html('ERROR: <b>End Time</b> cannot be set to a future date.');
        $('.duration_span').text('ERROR');

    } else if (end_date < start_date) {

        $('#error_msg_time_edit').html('ERROR: <b>End Time</b> is lesser than the <b>Start Time</b>.');
        $('.duration_span').text('ERROR');


    } else {
        $('#error_msg_time_edit').html('Correct: <b>End Time</b> is Good.');
        $('.duration_span').text(the_dur);
    }
}

//---- Insert Middle
function getDuration_im_act() {

    var start_date = new Date($('#start_time_value_im_act').text());

    $('.duration_span').text('');

    var end_date = new Date($('#end_date_input_im_act').val());
    var end_hr = $('#end_time_hr_input_im_act').val();
    var end_min = $('#end_time_min_input_im_act').val();

    end_date = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var the_dur = Math.floor((end_date - start_date) / 60000);

    if (end_date > Date.now()) {

        $('#error_msg_time_im').html('ERROR: <b>End Time</b> cannot be set to a future date.');
        $('.duration_span').text('ERROR');

    } else if (end_date < start_date) {

        $('#error_msg_time_im').html('ERROR: <b>End Time</b> is lesser than the <b>Start Time</b>.');
        $('.duration_span').text('ERROR');


    } else {
        $('#error_msg_time_im').html('Correct: <b>End Time</b> is Good.');
        $('.duration_span').text(the_dur);
    }
}

//----- Add Act -----
$(document).on('change','#end_time_hr_input',function(){
    getDUration();
});

$(document).on('change','#end_time_min_input',function(){
    getDUration();
});

$(document).on('change', '#end_date_input', function () {
    getDUration();
});


//----- Edit Act -----
$(document).on('change', '#end_date_input_editact', function () {
    getDUration_editact();
});

$(document).on('change', '#end_time_hr_input_editact', function () {
    getDUration_editact();
});

$(document).on('change', '#end_time_min_input_editact', function () {
    getDUration_editact();
});


//----- Edit IM Act -----
$(document).on('change', '#end_date_input_im_act', function () {
    getDuration_im_act();
});

$(document).on('change', '#end_time_hr_input_im_act', function () {
    getDuration_im_act();
});

$(document).on('change', '#end_time_min_input_im_act', function () {
    getDuration_im_act();
});




$('.act_code_desc_td').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();
    var af_val = $(this).closest('td').next('td').next('td').next('td').text();
    var cf_val = $(this).closest('td').next('td').next('td').text();
    var fsfe_val = $(this).closest('td').next('td').text();

    //var af_val = $(this).closest('td').next('td').next('td').text();
    //var cf_val = $(this).closest('td').prev('td').prev('td').prev('td').text();
    //var fsfe_val = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();

   var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

   act_code_intel(actcode_val, '#' + dialogparent);

    
  
    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');


    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

    validation_charge(fsfe_val, cf_val, af_val);
    validation_peract(actcode_val);


});

function validate_sulfur(actcode_) {
    if (actcode_ == 'N' || actcode_ == 'n') {
        $(".sulfur_input").prop("disabled", false);
        $(".sulfur_input").removeClass("False_input_tbox");
        $(".sulfur_input").addClass("True_input_tbox");
       
    } else {
        $(".sulfur_input").prop("disabled", true);
        $(".sulfur_input").removeClass("True_input_tbox");
        $(".sulfur_input").addClass("False_input_tbox"); 
    }

    var sulfurval = $('#cf_cyclesulfur').text();
    $(".sulfur_input").val(sulfurval);
    
}


function validation_peract(actcode_val) {

    if (actcode_val == 'N' || actcode_val == 'n') {
        $(".sulfur_input").prop("disabled", false);
        $(".sulfur_input").removeClass("False_input_tbox");
        $(".sulfur_input").addClass("True_input_tbox");

    } else {
        $(".sulfur_input").prop("disabled", true);
        $(".sulfur_input").removeClass("True_input_tbox");
        $(".sulfur_input").addClass("False_input_tbox");
    }

   

}









function validation_charge(fsfe_val, cf_val, af_val) {
    if (fsfe_val == "True") {
        $(".fsfe_charge_input").prop("disabled", false);
    } else {
        $(".fsfe_charge_input").prop("disabled", true);
    }

    if (cf_val == "True") {
        $(".cf_charge_input").prop("disabled", false);
    } else {
        $(".cf_charge_input").prop("disabled", true);
    }

    if (af_val == "True") {
        $(".af_charge_input").prop("disabled", false);
    } else {
        $(".af_charge_input").prop("disabled", true);
    }

    $(".fsfe_charge_input").removeClass("False_input_tbox");
    $(".cf_charge_input").removeClass("False_input_tbox");
    $(".af_charge_input").removeClass("False_input_tbox");

    $(".fsfe_charge_input").removeClass("True_input_tbox");
    $(".cf_charge_input").removeClass("True_input_tbox");
    $(".af_charge_input").removeClass("True_input_tbox");


    $(".fsfe_charge_input").addClass(fsfe_val + "_input_tbox");

    $(".cf_charge_input").addClass(cf_val + "_input_tbox");

    $(".af_charge_input").addClass(af_val + "_input_tbox");

}


$('#DialogInsertMid_Activity .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel(actcode_val, '#DialogInsertMid_Activity');

    var fsfe_val = $('#DialogInsertMid_Activity .fsfe_charge_input').prop('disabled');
    var cf_val = $('#DialogInsertMid_Activity .cf_charge_input').prop('disabled');
    var af_val = $('#DialogInsertMid_Activity .af_charge_input').prop('disabled');

   // validation_charge(toTitleCase(fsfe_val), toTitleCase(cf_val), toTitleCase(af_val));
   validation_peract(actcode_val);

});

$('#DialogEdit_Activity .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();

    act_code_intel(actcode_val, '#DialogEdit_Activity');

    var fsfe_val = $('#DialogEdit_Activity .fsfe_charge_input').prop('disabled');
    var cf_val = $('#DialogEdit_Activity .cf_charge_input').prop('disabled');
    var af_val = $('#DialogEdit_Activity .af_charge_input').prop('disabled');

    // validation_charge(toTitleCase(fsfe_val), toTitleCase(cf_val), toTitleCase(af_val));
    validation_peract(actcode_val);
});

$('#DialogAdd_Activity .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel(actcode_val, '#DialogAdd_Activity');

    var fsfe_val = $('#DialogAdd_Activity .fsfe_charge_input').prop('disabled');
    var cf_val = $('#DialogAdd_Activity .cf_charge_input').prop('disabled');
    var af_val = $('#DialogAdd_Activity .af_charge_input').prop('disabled');
    
    validation_peract(actcode_val);
   // validation_charge(toTitleCase(fsfe_val), toTitleCase(cf_val), toTitleCase(af_val));
    

});


function act_code_intel(actcode_val, dialogname) {

    $(dialogname + ' .act_add_code_input').val(actcode_val);

    $(dialogname + ' #Act_Desc_div').html('Invalid Code.');
   
    $.ajax({
        url: serverpath + '/Operations/ActivityCode_Intellisense/',

        data: {
            actcode_param: actcode_val
        },

        type: 'post',
        cache: false,
        success: function (data) {
            $(dialogname + ' #Act_Desc_div').text(data.ActivityDesc);
            $(dialogname + ' .actcode_id').val(data.ActivityCodeId);
            $(dialogname + ' .actcode_id').text(data.ActivityCodeId);
            
            validation_charge(toTitleCase(data.FSFE_Charge), toTitleCase(data.CF_Charge), toTitleCase(data.AF_Charge));
        }
    });

}



$('#act_code_table th').live('click', function () {

    var th = $(this), thIndex = th.index();
    var table = $(this).parent().parent();

    switch ($(this).attr('inverse')) {
        case 'false': inverse = true; break;
        case 'true:': inverse = false; break;
        default: inverse = false; break;
    }
    th.attr('inverse', inverse)

    table.find('td').filter(function () {
        return $(this).index() === thIndex;
    }).sortElements(function (a, b) {
        return $.text([a]) > $.text([b]) ?
            inverse ? -1 : 1
            : inverse ? 1 : -1;
    }, function () {
        // parentNode is the element we want to move
        return this.parentNode;
    });
    inverse = !inverse;
});

$('#employee_typeshift_btn_ok').click(function () {

    var shiftdate_ = $('#date_assignshiftform').val();

    if (shiftdate_ == '') {
        alert('Please Enter a valid date.');

    }
    else {

        var supid_shift = $('#TypeShiftlist_Supervisor').val();

        var skim1_shift = $('#TypeShiftlist_Skimmer1').val();
        var skim2_shift = $('#TypeShiftlist_Skimmer2').val();
        var skim3_shift = $('#TypeShiftlist_Skimmer3').val();
        var skim4_shift = $('#TypeShiftlist_Skimmer4').val();

        var optrid_shift = $('#TypeShiftlist_Operator').val();

        
        $.ajax({
            url: serverpath + '/Operations/TypeShift_Assign/',
            data: {
                shiftdate: shiftdate_,
                shift_supervisorid: supid_shift,
                shift_skimmer1id: skim1_shift,
                shift_skimmer2id: skim2_shift,
                shift_skimmer3id: skim3_shift,
                shift_skimmer4id: skim4_shift,
                shift_operatorid: optrid_shift
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Type Shift now added.');

            }
        });
    }

});


$("#date_employeeform").change(function () {

    var shiftdate_ = $(this).val();
    var num_shift = 0;

    var append_list = $('#Shiftlist');
    $('#Shiftlist').prop("disabled", false);
    $("#typeshift_span").text("");

    disablelist_employee();

    $.ajax({
        url: serverpath + '/Operations/Populate_AvailableShift/',
        data: {
            shiftdate: shiftdate_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
          
            $("#Shiftlist option").each(function () {
                $(this).remove();
            });

            $.each(data, function (index, value) {

                $('#Shiftlist').append("<option value = " + value.ShiftSchedId + " data-value2 = " + value.TypeShiftId + ">" + value.ShiftName + "</option>");
                num_shift = num_shift + 1;
           
                if (index == 0) {
                    $("#typeshift_span").text(value.TypeShiftName);
                }
            })

            if (num_shift == 0) {

                alert('No Shift Type Assigned yet.');
                $('#Shiftlist').prop("disabled", true);

            } else {
                $('#Shiftlist').prop("disabled", false);
            }
        }
    });
});

$('#Shiftlist').change(function () {

    var shift_type_ = $(this).find(':selected').data('value2');
    var shiftdate_ = $("#date_employeeform").val();

    var num_shift = 0;

    disablelist_employee();

    $.ajax({
        url: serverpath + '/Operations/AssignResponsible_Shift/',
        data: {
            shiftdate: shiftdate_,
            shift_type: shift_type_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

           

            $.each(data, function (index, value) {

                num_shift = num_shift + 1;

                if (value.EmployeeRoleId == 1) {
                    $('#Supervisorlist').prop("disabled", false);

                } else if (value.EmployeeRoleId == 2) {
                    $('#Skimmer1list').prop("disabled", false);

                } else if (value.EmployeeRoleId == 3) {
                    $('#Skimmer2list').prop("disabled", false);

                } else if (value.EmployeeRoleId == 4) {
                    $('#Operatorlist').prop("disabled", false);

                } else if (value.EmployeeRoleId == 5) {
                    $('#Skimmer3list').prop("disabled", false);

                } else if (value.EmployeeRoleId == 6) {
                    $('#Skimmer4list').prop("disabled", false);

                }
        

            })

            if (num_shift == 0) {
                $('#employee_shift_btn_ok').prop("disabled", true);
            } else {
                $('#employee_shift_btn_ok').prop("disabled", false);
            }
        }
    });

});

function disablelist_employee() {
    $('#employee_shift_btn_ok').prop("disabled", true);

    $('#Supervisorlist').prop("disabled", true);
    $('#Skimmer1list').prop("disabled", true);
    $('#Skimmer2list').prop("disabled", true);
    $('#Skimmer3list').prop("disabled", true);
    $('#Skimmer4list').prop("disabled", true);
    $('#Operatorlist').prop("disabled", true);
}

function cyc_ongoing(cycid_) {

    $.ajax({
        url: serverpath + '/Operations/Select_Cycle_Ongoing/',
        data: {
            cycid: cycid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            if (data == 1) {
                $('#add_activity_btn').prop("disabled", true);
            } else {
                $('#add_activity_btn').prop("disabled", false);
            }
            //$('#starttime_perstage_tab').text(formatDate(data.StartDateTime));
            
        }
    });

}

function plus_15min(thetime) {

    var thedate_time = new Date(thetime);

    return thedate_time.add({
        minutes: 15
    }).toString('M/d/yyyy h:mm tt');

}

function minus_15min(thetime) {

    var thedate_time = new Date(thetime);

    return thedate_time.add({
        minutes: -15
    }).toString('M/d/yyyy h:mm tt');

}

function getEndTime_Activity(startdate, enddate, endhr, endmin) {

    var start_date = new Date(startdate);

    //$('.duration_span').text('');

    

    var end_date = new Date(enddate);
    var end_hr = endhr;
    var end_min = endmin;

    end_date = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

  //  alert(enddate);

    return end_date;
}


//---- Add Activity ----

$('#ongoing_checkbox').live('click', function () {
  

    if ($(this).is(':checked')) {

        $('#end_date_input').datepicker('disable');
        $('#end_time_hr_input').prop("disabled", true);
        $('#end_time_min_input').prop("disabled", true);

        $('.duration_span').text(0);
     
    } else {

        $('#end_date_input').datepicker('enable');
        $('#end_time_hr_input').prop("disabled", false);
        $('#end_time_min_input').prop("disabled", false);
        $('.duration_span').text(0);

    }
});

//---- Edit Activity ----

$('#ongoing_checkbox_editact').live('click', function () {

    if ($(this).is(':checked')) {

        $('#end_date_input_editact').datepicker('disable');
        $('#end_time_hr_input_editact').prop("disabled", true);
        $('#end_time_min_input_editact').prop("disabled", true);

        $('.duration_span').text(0);

    } else {

        $('#end_date_input_editact').datepicker('enable');
        $('#end_time_hr_input_editact').prop("disabled", false);
        $('#end_time_min_input_editact').prop("disabled", false);
        $('.duration_span').text(0);
    }
});

//---- Insert Middle Activity ----

$('#ongoing_checkbox_im_act').live('click', function () {

    if ($(this).is(':checked')) {

        $('#end_date_input_im_act').datepicker('disable');
        $('#end_time_hr_input_im_act').prop("disabled", true);
        $('#end_time_min_input_im_act').prop("disabled", true);

        $('.duration_span').text(0);

    } else {

        $('#end_date_input_im_act').datepicker('enable');
        $('#end_time_hr_input_im_act').prop("disabled", false);
        $('#end_time_min_input_im_act').prop("disabled", false);
        $('.duration_span').text(0);
    }
});

$('#stime_btn').live('click', function () {

    load_stime_airflow($('#start_time_value').text(), '#DialogAdd_Activity');

});

$('#stime_editact_btn').live('click', function () {

    load_stime_airflow($('#start_time_value_editact').text(), '#DialogEdit_Activity');

});

$('#stime_insertmid_btn').live('click', function () {

    load_stime_airflow($('#start_time_value_im_act').text(), '#DialogInsertMid_Activity');

});


function load_stime_airflow(stime, dialogname) {

    var start_time = stime;
    var start_time_plus15min = plus_15min(start_time);
    var start_time_minus15min = minus_15min(start_time);

    airflow_populate_tbl(start_time_plus15min, start_time_minus15min, dialogname);
}


$('#etime_btn').live('click', function () {

    var start_time = getEndTime_Activity($('#start_time_value').text(), $('#end_date_input').val(), $('#end_time_hr_input').val(), $('#end_time_min_input').val());
    var start_time_plus15min = plus_15min(start_time);
    var start_time_minus15min = minus_15min(start_time);

    airflow_populate_tbl(start_time_plus15min, start_time_minus15min, '#DialogAdd_Activity');

});



$('#etime_editact_btn').live('click', function () {

    var start_time = getEndTime_Activity($('#start_time_value_editact').text(), $('#end_date_input_editact').val(), $('#end_time_hr_input_editact').val(), $('#end_time_min_input_editact').val());
    var start_time_plus15min = plus_15min(start_time);
    var start_time_minus15min = minus_15min(start_time);

    airflow_populate_tbl(start_time_plus15min, start_time_minus15min, '#DialogEdit_Activity');

});

$('#etime_insertmid_btn').live('click', function () {

    var start_time = getEndTime_Activity($('#start_time_value_im_act').text(), $('#end_date_input_im_act').val(), $('#end_time_hr_input_im_act').val(), $('#end_time_min_input_im_act').val());
    var start_time_plus15min = plus_15min(start_time);
    var start_time_minus15min = minus_15min(start_time);

    airflow_populate_tbl(start_time_plus15min, start_time_minus15min, '#DialogInsertMid_Activity');

});


function airflow_populate_tbl(start_time_plus15min, start_time_minus15min, dialogname) {
    var rownum = 0;
    
    var conv_num = $('#cfnum_cycledetail').text();
    var blowername_;


    if (conv_num == 1) { blowername_ = 'F-D99A'; }
    else if (conv_num == 2) { blowername_ = 'F-D99B'; }
    else if (conv_num == 3) { blowername_ = 'F-D99C'; }
    else if (conv_num == 4) { blowername_ = 'F-D99D'; }

   // alert(conv_num);
   

    $(dialogname + ' .table_airflow td').remove();

    $.ajax({

        url: serverpath + '/Operations/Select_AirFlow/',

        data: {
            start_date: start_time_plus15min,
            end_date: start_time_minus15min,
            blowername: blowername_

        },

        type: 'POST',
        cache: false,
        success: function (data) {
        
            $.each(data, function (index, value) {

                rownum = rownum + 1;

                if (value.AirFlow.toFixed(2) < 25) {
                    $(dialogname + ' .table_airflow tr:last').after('<tr class = "selected_tr_airflow_' + rownum + '"><td class="td_right">' + rownum + '</td><td>' + value.TimeAirflow.substring(0, 16) + '</td><td class="td_centervalue less25">' + value.AirFlow.toFixed(2) + '</td></tr>');

                } else {

                    $(dialogname + ' .table_airflow tr:last').after('<tr class = "selected_tr_airflow_' + rownum + '"><td class="td_right">' + rownum + '</td><td class="td_center">' + value.TimeAirflow.substring(0, 16) + '</td><td class="td_centervalue">' + value.AirFlow.toFixed(2) + '</td></tr>');

                }

               

            });
            $(dialogname + ' .aflow_msg').css("color", "#000000");
            $(dialogname + ' .airflow_checkbox').prop("disabled", false);
        }
    });

   
    


}


$('#addact_btn').live('click', function () {
    //addactivity();
    validation_perbtn('add', '#DialogAdd_Activity');
});

$('#editact_btn').live('click', function () {
    validation_perbtn('edit', '#DialogEdit_Activity');
});

$('#imact_btn').live('click', function () {
    validation_perbtn('insertmid', '#DialogInsertMid_Activity');
});

function validation_perbtn(changetype, dialog) {

    var actcodedesc_msg;
    var actcode_msg;
    var actduration_msg;
    var validator_msg;
    var comment_msg;

    actcodedesc_msg = $(dialog + ' #Act_Desc_div').text();
    actduration_msg = $(dialog + ' .duration_span').text();
    comment_msg = $(dialog + ' #comments_textarea_input').text();
    actcode_msg = $(dialog + ' .act_add_code_input').val();

    validator_msg = validatormsg_perbtn(actcodedesc_msg, actduration_msg, comment_msg, actcode_msg, dialog);

    if (validator_msg == 1) {

        if (changetype == "add") {
            addactivity();
        }
        else if (changetype == "edit") { editactivity(); }
        else if (changetype == "insertmid") { insertmiddleactivity(); }

        } else {

        }

}

function validatormsg_perbtn(Activity_val, Endtime_val, comment_msg, actcode_msg, dialog) {
    var forDK_msg = "Please input a Comment for the said Activity.";
    var forCA_msg1 = "Please review Air Flow data and check the checkbox 'I have reviewed Airflow' before we can add it.";
    var forCA_msg2 = "Please check the checkbox 'I reviewed Airflow data' before we can add it.";
    var forActivity_msg = "Please input a correct Activity Code.";
    var forEndTime_msg = "Please input correct End Time, it should be greater than or equal to the start time.";
    
    var checkbox_airflow_prop = $(dialog + ' .airflow_checkbox').prop('disabled');
    var checkbox_airflow_checked = $(dialog + ' .airflow_checkbox').is(':checked');

//    alert(checkbox_airflow_checked);


    actcode_msg = actcode_msg.toUpperCase();

    if (Activity_val == '' || Activity_val == 'Invalid Code.') {
        $(dialog + ' .act_add_code_input').css('background-color', '#FFA8A8');

        alert(forActivity_msg);
        return 0;

    } else if (Endtime_val == 'ERROR') {
        alert(forEndTime_msg);
        return 0;
    }
    else if ((actcode_msg == 'DK' && comment_msg == '-') || (actcode_msg == 'DK' && comment_msg == '')) {
        $(dialog + ' #comments_textarea_input').css('background-color', '#FFA8A8');
        alert(forDK_msg);
  
        return 0;

    } else if (actcode_msg == 'CA' && checkbox_airflow_prop == true) {
        alert(forCA_msg1);
        return 0;

    } else if (actcode_msg == 'CA' && checkbox_airflow_checked == false) {
        alert(forCA_msg2);
        return 0;
    }

    else {

        return 1;
    }
}
function addactivity() {
    var fsfe_val = $('.fsfe_charge_input').prop('disabled');
    var cf_val = $('.cf_charge_input').prop('disabled');
    var af_val = $('.af_charge_input').prop('disabled');

    var cycid_ = $('#cyc_cycid').text();
    var actccodeid_ = $('.actcode_id').val();

    var actdur_ = $('#DialogAdd_Activity .duration_span').text();
    //var actdur_ = $('.duration_span').text();
    var fsfe_qty_param = zerovalue_qty($('.fsfe_charge_input').val(), fsfe_val);
    var cf_qty_param = zerovalue_qty($('.cf_charge_input').val(), cf_val);
    var af_qty_param = zerovalue_qty($('.af_charge_input').val(), af_val);
    var act_comments_param = $('#comments_textarea_input').text();
    var stageid_ = $('#stageid_addact').text();
    var sulfurval_ = $('#DialogAdd_Activity .sulfur_input').val();
    sulfurval_ =  parseFloat(sulfurval_).toFixed(2);
    // var ongoing_id_param = 1;

    //   alert(actdur_);

    var ongoing_id_param = $("#ongoing_checkbox").attr("checked") ? 2 : 1;
    //  alert(ongoing_id);

    $.ajax({
        url: serverpath + '/Operations/Insert_Activity/',
        data: {
            cycleid: cycid_,
            actcodeid: actccodeid_,
            actdur: actdur_,
            fsfe_qty: fsfe_qty_param,
            cf_qty: cf_qty_param,
            af_qty: af_qty_param,
            act_comment: act_comments_param,
            stageid: stageid_,
            actmodeid: ongoing_id_param,
            sulfurval: sulfurval_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#DialogAdd_Activity').dialog('close');
            $('#cf_cyclesulfur').text(sulfurval_);
            reload_StageData(cycid_, stageid_);

            alert('Activity Added!');
        }
    });
}

function editactivity() {
    var fsfe_val = $('#DialogEdit_Activity .fsfe_charge_input').prop('disabled');
    var cf_val = $('#DialogEdit_Activity .cf_charge_input').prop('disabled');
    var af_val = $('#DialogEdit_Activity .af_charge_input').prop('disabled');

    var actid_ = $('#actid_editact').val();

    var actccodeid_ = $('#DialogEdit_Activity .actcode_id').text();
    var actdur_ = $('#DialogEdit_Activity .duration_span').text();
    var fsfe_qty_param = zerovalue_qty($('#DialogEdit_Activity .fsfe_charge_input').val(), fsfe_val);
    var cf_qty_param = zerovalue_qty($('#DialogEdit_Activity .cf_charge_input').val(), cf_val);
    var af_qty_param = zerovalue_qty($('#DialogEdit_Activity .af_charge_input').val(), af_val);
    var act_comments_param = $('#DialogEdit_Activity #comments_textarea_input').text();

    var ongoing_id_param = $("#DialogEdit_Activity #ongoing_checkbox_editact").attr("checked") ? 2 : 1;

    var cycid_ = $('#cyc_cycid').text();
    var stageid_ = $('#stageid_editact').text();

    var sulfurval_param = $('#DialogEdit_Activity .sulfur_input').val();
    sulfurval_param = parseFloat(sulfurval_param).toFixed(2);

    //alert(actid_);
    //alert(actccodeid_);
    //alert(actdur_);
    //alert(fsfe_qty_param);
    //alert(cf_qty_param);
    //alert(af_qty_param);
    //alert(act_comments_param);
    //alert(ongoing_id_param);


    //  alert(ongoing_id);

    $.ajax({
        url: serverpath + '/Operations/EditActivity/',
        data: {
            actid: actid_,
            actcodeid: actccodeid_,
            actdur: actdur_,
            fsfe_qty: fsfe_qty_param,
            cf_qty: cf_qty_param,
            af_qty: af_qty_param,
            act_comment: act_comments_param,
            actmodeid: ongoing_id_param,
            sulfurval: sulfurval_param
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#DialogEdit_Activity').dialog('close');
            reload_StageData(cycid_, stageid_);
        
            $('#cf_cyclesulfur').text(sulfurval_param);

            alert('Activity Edited!');


        }
    });
}

function insertmiddleactivity() {
    var fsfe_val = $('#DialogInsertMid_Activity .fsfe_charge_input').prop('disabled');
    var cf_val = $('#DialogInsertMid_Activity .cf_charge_input').prop('disabled');
    var af_val = $('#DialogInsertMid_Activity .af_charge_input').prop('disabled');

    var prev_actid_ = $('#actid_im_act').val();

    var actccodeid_ = $('#DialogInsertMid_Activity .actcode_id').text();
    var actdur_ = $('#DialogInsertMid_Activity .duration_span').text();
    var fsfe_qty_param = zerovalue_qty($('#DialogInsertMid_Activity .fsfe_charge_input').val(), fsfe_val);
    var cf_qty_param = zerovalue_qty($('#DialogInsertMid_Activity .cf_charge_input').val(), cf_val);
    var af_qty_param = zerovalue_qty($('#DialogInsertMid_Activity .af_charge_input').val(), af_val);
    var act_comments_param = $('#DialogInsertMid_Activity #comments_textarea_input').text();

    var ongoing_id_param = $("#DialogInsertMid_Activity #ongoing_checkbox_im_act").attr("checked") ? 2 : 1;

    var cycid_ = $('#cyc_cycid').text();
    var stageid_ = $('#stageid_imact').text();

    var sulfurval_param = $('#DialogInsertMid_Activity .sulfur_input').val();
    var sulfurval_param = parseFloat(sulfurval_param).toFixed(2);

    //alert(prev_actid_);
    //    alert(actccodeid_);
    //alert(actdur_);

    //alert(fsfe_qty_param);
    //alert(cf_qty_param);
    //alert(af_qty_param);

    //  alert(cycid_);
    //   alert(stageid_);

    $.ajax({
        url: serverpath + '/Operations/Insert_Middle_Activity/',
        data: {
            prev_actid: prev_actid_,
            cycleid: cycid_,
            actcodeid: actccodeid_,
            actdur: actdur_,
            fsfe_qty: fsfe_qty_param,
            cf_qty: cf_qty_param,
            af_qty: af_qty_param,
            act_comment: act_comments_param,
            stageid: stageid_,
            actmodeid: ongoing_id_param,
            sulfurval: sulfurval_param
        },

        type: 'POST',
        cache: false,
        success: function (data) {


            $('#DialogInsertMid_Activity').dialog('close');
            reload_StageData(cycid_, stageid_);
            $('#cf_cyclesulfur').text(sulfurval_param);

        }
    });

}

$('#addact_close').live('click', function () {
    $('#DialogAdd_Activity').dialog('close');
    $('body').css('overflow', 'scroll');
});

$('#editact_close').live('click', function () {
    $('#DialogEdit_Activity').dialog('close');
});

$('#imact_close').live('click', function () {
    $('#DialogInsertMid_Activity').dialog('close');


});

function reload_StageData(cycid, stageid) {

    lastclicked = 0;

    cyc_ongoing(cycid); // - disable Add Activity btn
    cyc_active_stage(cycid, stageid); // - populate Stage Side
    cyc_activity_perstage(cycid, stageid); //  - populate Activity table
    cyc_activity_perstage_daterange(cycid, stageid); //  - populate Stage DateRange
    fesilica_populate_cflogsheet_tbl(stageid); //  - populate Silica Reqd
}



$('.cftable tr').live('click', function () {
    
   
  
    var theval = $(this).find('td:first-child').text();
    beingclicked = theval;

    $('.cftable td').css('background-color', '#FFFFFF');
    //alert('select: '+theval);
    if (lastclicked == theval) {
       
    } else {
        if (lastclicked == 0) {
            $('#disable_id' + theval).removeClass();
            $('#edit_id' + theval).removeClass();
            $('#insertmiddle_id' + theval).removeClass();
            

        } else {
            $('#disable_id' + lastclicked).addClass('disable_cfact');
            $('#edit_id' + lastclicked).addClass('edit_cfact');
            $('#insertmiddle_id' + lastclicked).addClass('insertmiddle_cfact');


            $('#disable_id' + theval).removeClass();
            $('#edit_id' + theval).removeClass();
            $('#insertmiddle_id' + theval).removeClass();
        }
    }
    $(this).children('td').css('background-color', '#FFFF99');
    $('#disable_id' + theval).addClass('select_disable_cfact');
    $('#edit_id' + theval).addClass('select_edit_cfact');
    $('#insertmiddle_id' + theval).addClass('select_insertmiddle_cfact');

    lastclicked = theval;

});

$('#CF_CycleTuyere_div').live('click', function () {

    $('.cftable td').css('background-color', '#FFFFFF');
    $('#disable_id' + beingclicked).addClass('disable_cfact');
    $('#edit_id' + beingclicked).addClass('edit_cfact');
    $('#edit_id' + beingclicked).addClass('select_edit_cfact');

    $('#insertmiddle_id' + beingclicked).addClass('insertmiddle_cfact');
    
    $('#insertmiddle_id' + beingclicked).addClass('select_insertmiddle_cfact');
});


function Disable_btn_activity(ActDesc, ActId_) {
   
    themsg = 'Are you sure you want to delete the Activity: ' + ActDesc + ' ?';

    var answer = confirm(themsg);

    var cycid_ = $('#cyc_cycid').text();
    var stageid_ = $('#stageid_value').val();
  
    if (answer) {
        $.ajax({
            url: serverpath + '/Operations/Deactive_Activity/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                reload_StageData(cycid_, stageid_);

            }
        });

    }
    else {

    }
 
}

function Edit_btn_activity(ActId_) {

    var cycleid = $('#cyc_cycid').text();

    var partialview_link = serverpath + "/Operations/EditActivity_Partial/?cycleid_actparam=" + cycleid + "&actid=" + ActId_;

   // alert(ActId_);


    $('#DialogEdit_Activity').load(partialview_link, function () {

        if ($('#hideme').text() == 'HIDE') {
            $('#second_div').css({ "float": "" });
        } else {
            $('#second_div').css({ "margin-left": "45px" });
            $('#second_div').css({ "float": "" });
        }

        $(this).dialog('open');


        var actcode = $('#DialogEdit_Activity .act_add_code_input').val();

        //alert(actcode);

        $('#actid_editact').val(ActId_);
        var fsfe_val = $('#DialogEdit_Activity .fsfe_charge_input').prop('disabled');
        var cf_val = $('#DialogEdit_Activity .cf_charge_input').prop('disabled');
        var af_val = $('#DialogEdit_Activity .af_charge_input').prop('disabled');
      

     //   alert('test');
            validate_sulfur(actcode);

        validation_charge(toTitleCase(fsfe_val), toTitleCase(cf_val), toTitleCase(af_val));
        
    });
    return false;
}

function InsertMiddle_btn_activity(ActId_) {

    var cycleid = $('#cyc_cycid').text();

    var partialview_link = serverpath +  "/Operations/InsertMidActivity_Partial/?cycleid_actparam=" + cycleid + "&actid=" + ActId_;


    $('#DialogInsertMid_Activity').load(partialview_link, function () {

        if ($('#hideme').text() == 'HIDE') {
            $('#second_div').css({ "float": "" });
        } else {
            $('#second_div').css({ "margin-left": "45px" });
            $('#second_div').css({ "float": "" });
        }

        $(this).dialog('open');

        $('#actid_im_act').val(ActId_);

        $("#DialogInsertMid_Activity .sulfur_input").addClass("False_input_tbox");

        $("#DialogInsertMid_Activity .sulfur_input").val($('#cf_cyclesulfur').text());
        $("#DialogInsertMid_Activity .sulfur_input").prop("disabled", true);

        //$('#actid_editact').val(ActId_);
        //var fsfe_val = $('#DialogEdit_Activity .fsfe_charge_input').prop('disabled');
        //var cf_val = $('#DialogEdit_Activity .cf_charge_input').prop('disabled');
        //var af_val = $('#DialogEdit_Activity .af_charge_input').prop('disabled');
        //validation_charge(toTitleCase(fsfe_val), toTitleCase(cf_val), toTitleCase(af_val));

    });
    return false;
}



function toTitleCase(str) {
    if (str == true) {
        return str = 'True';
    } else {
        return str = 'False';
    }
}



function listofcycles(cfnum_, cftable, campid_) {
    
    $('.' + cftable + ' td').remove();

    var sday = Date.today().add(-1).days().toString('MM-dd-yyyy');
    var eday = Date.today().toString('MM-dd-yyyy');
  
  
//    alert(tday);
//    alert(sday);

    $.ajax({
        url: serverpath + '/Operations/CycleList/',

        data: {
            cfnum: cfnum_,
            campid: campid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

              //  var test = new Date(value.Cycle_Start_Time);
               

                $('.' + cftable + ' tr:last').after('<tr><td class="hide_td">' + value.CycleId + '</td><td>' + formatDate_js(value.Cycle_Start_Time) + '</td></td><td>' + formatDate_js(value.Cycle_End_Time) + '</td><td class="cyc_num"><a href = ' + serverpath + '/Operations/CFLogsheet/' + value.CycleId + '/' + sday + '/' + eday + '/CV' + cfnum_ + '>' + value.CycleNumber + '</a></td><td>' + value.CycleStatusName + '</td></tr>');

            });

        }
    });
}


function formatDate_js(theDate) {

    var tdate = formatDate(theDate);

    if (tdate == '-') {
        return '-';
    } else {
        
        var t1date = new Date(tdate).toString('dd-MMM-yy HH:mm');
        return t1date;
    }
}

function Remove_Sulfur(cycid) {

    themsg = 'Are you sure you want to Remove Sulfur, ppm on this Cycle?';

    var answer = confirm(themsg);

    var cycid_ = $('#cyc_cycid').text();

  
    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/EditSulfur/',
            data: {
                actcodeid: 58, cycid: cycid_, sulfurval: 0
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#cf_cyclesulfur').text(0);
                alert('Sulfur value now zero.');
            }
        });

    }
    else {
       
    }

}
$('#compute_btn').live('click', function () {

    var matte = $('#testinput_matte').val();
    var mattegrade = $('#testinput_mattegrade').val();
    var fe_ratio = $('#testinput_silicaratio').val();

    var var1;
    var var2;
    var silica_reqd;
    var slag_reqd;

    var1 = (matte * ((mattegrade * (-0.6816) + 56.701)))/100;

    var2 = (fe_ratio / 0.95);

    silica_reqd = var1 * var2;
    slag_reqd = silica_reqd * (132 / 60) * 2;


    silica_reqd = silica_reqd.toFixed(2);
    slag_reqd = slag_reqd.toFixed(2);

    $('#silica_reqd_ans').text(silica_reqd);
    $('#slag_reqd_ans').text(slag_reqd);


    //alert(matte);
    //alert(mattegrade);
    //alert(fe_ratio);
    //alert('test');

});

function fesilica_exist(fesilica_val_) {

    var count_val = $.ajax({
        url: serverpath + '/Operations/fesilica_value_exist/',
        data: {
            fesilica_val: fesilica_val_
        },
        type: 'POST',
        cache: false,
        dataType: 'html',
        context: document.body,
        global: false,
        async: false,

        success: function (data) { return data; }
    }).responseText;

    return count_val;

}


$('#addsilica_btn').click(function () {
    // alert('test');

    var fesilica_val_ = $('#input_addsilica_value').val();
    var reason_ = $('#textarea_addsilica_reason').text();
    var changeby_ = $('#select_addsilica_changeby').val();
    var fesilica_count = fesilica_exist(fesilica_val_);

    reason_ = reason_ + ' -Add new Fe Silica value: ' + fesilica_val_ + '.';

    // alert(fesilica_val);
    // alert(reason);
    // alert(changeby);

    if (fesilica_count >= 1) {
        alert('Fe Silica Ratio already exist.');
    } else {
        $.ajax({
            url: serverpath + '/Operations/AddFeSilica/',
            data: {
                fesilica_val: fesilica_val_,
                reason: reason_,
                changeby: changeby_,
                changetypeid: 2


            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('New Fe Silcia Ration Added.');
                document.location.href = serverpath + '/Operations/SilicaRequired';
            }
        });
    }
});

function changelog_FeSilica() {
    //   $('.tabs.vertical dd').remove();

    $('#changelog_tbl td').remove();

    $.ajax({
        url: serverpath + '/Operations/Changelog_Fesilica/',

        data: {},

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#changelog_tbl tr:last').after('<tr><td>' + value.ChangelogId + '</td><td>' + value.ChangeType + '</td><td>' + formatDate_js(value.Changelogtimestamp) + '</td><td class="td_reason">' + value.Reason + '</td><td>' + value.Fullname + '</td></tr>');

            });

        }
    });
}

function SetDefault_populate_tbl() {

    $('#setform_default_tbl td').remove();

    $.ajax({
        url: serverpath + '/Operations/SetDefault_Tbl/',
        data: {},

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#setform_default_tbl tr:last').after('<tr><td>' + value.IronSilicaRatio + '</td><td>' + value.Reason + '</td><td>' + value.Fullname + '</td><td>' + formatDate_js(value.Changelogtimestamp) + '</td></tr>');

            });

        }
    });
}

function Fesilica_Edit_populate_tbl() {

    $('#editsilica_tbl td').remove();

    $.ajax({
        url: serverpath + '/Operations/SilicaFormulaEdit_tbl/',
        data: {},

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                
                $('#editsilica_tbl tr:last').after('<tr><td>' + value.IronSilicaRatio.toFixed(2) + '</td><td><a href="#" onclick="select_fesilica(' + value.SilicaFormulaId + ',' + value.IronSilicaRatio.toFixed(2) + ');return false;">Select</a></td></tr>');

            });
        }
    });
}


function select_fesilica(fesilicaid, fesilica_val) {

    $('#input_editsilica_value').val(fesilica_val);
    $('#editsilicaid_hide').val(fesilicaid);
    $('#editsilicaval_prev_hide').val(fesilica_val);
}


$('#setdefault_btn').click(function () {
    
    var fesilica_id_ = $('#fesilica_list option:selected').val();
    var fesilica_val_ = $('#fesilica_list option:selected').text();
    var reason_ = $('#textarea_setdefault_reason').text();
    var changeby_ = $('#select_setdefault_changeby').val();
  

    reason_ = reason_ + ' -Set Default value to: ' + fesilica_val_ + '.';

    //alert(fesilica_id_);
    // alert(fesilica_val_);
    // alert(reason_);
    // alert(changeby_);

        $.ajax({
            url: serverpath + '/Operations/SetDefaultFeSilica/',
            data: {
                fesilicaid: fesilica_id_,
                reason: reason_,
                changeby: changeby_,
                changetypeid: 1

            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Fe Silica Ratio: ' + fesilica_val_ + ' Now Set to Default.');
                document.location.href = serverpath + '/Operations/SilicaRequired';
            }
        });
    
});


$('#editsilica_btn').click(function () {

    var fesilica_id_ = $('#editsilicaid_hide').val();
    var fesilica_preval_ = $('#editsilicaval_prev_hide').val();

    var fesilica_val_ = $('#input_editsilica_value').val();

    var reason_ = $('#textarea_editsilica_reason').text();
    var changeby_ = $('#select_editsilica_changeby').val();


    reason_ = reason_ + ' -Change from ' + fesilica_preval_ + ' to ' + fesilica_val_ + '.';

    //alert(fesilica_id_);
    // alert(fesilica_val_);
    // alert(reason_);
    // alert(changeby_);

    $.ajax({
        url: serverpath + '/Operations/EditFeSilica/',
        data: {
            fesilicaid: fesilica_id_,
            fesilica: fesilica_val_,
            reason: reason_,
            changeby: changeby_,
            changetypeid: 3


        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Fe Silica Ratio Now Edited.');
            document.location.href = serverpath + '/Operations/SilicaRequired';
        }
    });

});

$('#changelog_refresh_btn').click(function () {
    changelog_FeSilica();
});

function fesilica_populate_cflogsheet_tbl(stageid_) {

    var cycid_ = $('#cyc_cycid').text();
    var sum_silica_ = 0;
    var sum_slag_ = 0;

    $('#cflogsheet_silicareqd td').remove();

    $.ajax({
        url: serverpath + '/Operations/SilicaReqd_tbl/',
        data: {
            cycid: cycid_,
            stageid: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {

                $('#cflogsheet_silicareqd  tr:last').after('<tr><td class="hide_td">' + value.ActivityId + '</td><td class="td_left">' + value.Material + '</td><td id="fesilca_matte_' + value.ActivityId + '">' + value.CF_Quantity + '</td><td><input type="text" id= "fesilica_mattegrade_' + value.ActivityId + '" class="silica_add_input" value= ' + zerovalue_null(value.MatteGrade) + ' /></td><td id ="fesilca_sereqd_' + value.ActivityId + '">' + value.SilicaReqd.toFixed(2) + '</td><td id ="fesilca_slagreqd_' + value.ActivityId + '">' + value.SlagReqd.toFixed(2) + '</td></tr>');

                sum_silica_ = parseFloat(value.SilicaReqd.toFixed(2)) + parseFloat(sum_silica_);
                sum_slag_ = parseFloat(value.SlagReqd.toFixed(2)) + parseFloat(sum_slag_);
               

            });

            $('#cflogsheet_silicareqd  tr:last').after('<tr><td id="total_right" colspan = 3>Total: </td><td id = "sum_silica"></td><td id = "sum_slag"></td></tr>');
            sum_silica_additions(sum_silica_, sum_slag_);


        }
    });
}

function sum_silica_additions(sum_silica, sum_slag) {
 
    $('#sum_silica').text(sum_silica.toFixed(2));
    $('#sum_slag').text(sum_slag.toFixed(2));
}



function Change_CF_SilicaRatio() {

    var fesilica_id_ = $('#fesilica_CF_list option:selected').val();
    var fesilica_val_ = $('#fesilica_CF_list option:selected').text();

    //alert('test');
    //alert(fesilica_id_);
    //alert(fesilica_val_);
    themsg = 'Are you sure you want to Change Iron Silica Ratio to: ' + fesilica_val_ + '?';

    var answer = confirm(themsg);

    var cycid_ = $('#cyc_cycid').text();


    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/EditCycle_SilicaRatio/',
            data: {
                cycid: cycid_, fesilica_id: fesilica_id_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Iron Silica Ratio now changed.');
             //   document.location.href = serverpath + '/Operations/CFLogSheet/' + cycid_;
                cf_logsheet_link();

            }
        });

    }
    else {
    }
}
$('#refresh_silica_computation').click(function () {
   
    $('#sum_silica').text('0.00');
    $('#sum_slag').text('0.00');

    $('#cflogsheet_silicareqd').find('td:nth-child(1)').each(function (index) {
      
        fesilca_additions($(this).text());

    });

});

function fesilca_additions(actid) {

    //fesilca_matte_' + value.ActivityId + '
    
    var matte = $('#fesilca_matte_' + actid).text();
    var mattegrade = $('#fesilica_mattegrade_' + actid).val();
    var fe_ratio = $('#fesilica_CF_list option:selected').text();
    
    //alert(matte);
    //alert(mattegrade);

    var var1;
    var var2;
    var silica_reqd;
    var slag_reqd;

    var1 = (matte * ((mattegrade * (-0.6816) + 56.701))) / 100;

    var2 = (fe_ratio / 0.95);

    silica_reqd = var1 * var2;
    slag_reqd = silica_reqd * (132 / 60) * 2;


    silica_reqd = silica_reqd.toFixed(2);
    slag_reqd = slag_reqd.toFixed(2);

    $('#fesilca_sereqd_' + actid).text(silica_reqd);
    $('#fesilca_slagreqd_' + actid).text(slag_reqd);

    if (isNaN(silica_reqd)) {
        silica_reqd = 0;
    } else {
        silica_reqd = silica_reqd;
    }

    if (isNaN(slag_reqd)) {
        slag_reqd = 0;
    } else {
        slag_reqd = slag_reqd;
    }


   
    var sum_silica = parseFloat(silica_reqd) + parseFloat($('#sum_silica').text());
    var sum_slag = parseFloat(slag_reqd) + parseFloat($('#sum_slag').text());

    
    $('#sum_silica').text(sum_silica.toFixed(2));
    $('#sum_slag').text(sum_slag.toFixed(2));

}



$('#save_mattegrade').click(function () {

    themsg = 'Are you sure you want to save all the values in Matte Grade?';

    var answer = confirm(themsg);

    if (answer) {


        $('#cflogsheet_silicareqd').find('td:nth-child(1)').each(function (index) {

            Save_MultipleMatteGrade($(this).text());

        });

        alert('Matte Grade now saved.');
    } else { }

});

function Save_MultipleMatteGrade(actid_) {

    var mattegrade_ = $('#fesilica_mattegrade_' + actid_).val();
    mattegrade_ = zerovalue_null(mattegrade_);

        $.ajax({
            url: serverpath + '/Operations/Change_MatteGrade_Multiple/',
            data: {
                actid: actid_, mattegrade: mattegrade_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                
            }
        });


}

function Change_StartDate() {

    var cycleid = $('#cyc_cycid').text();

    var partialview_link = serverpath +  "/Operations/Change_StartDate_Partial/?cycid=" + cycleid;

   

    $('#DialogChange_StartDate').load(partialview_link, function () {

        if ($('#hideme').text() == 'HIDE') {
            $('#second_div').css({ "float": "" });
        } else {
            $('#second_div').css({ "margin-left": "45px" });
            $('#second_div').css({ "float": "" });
        }

        $(this).dialog('open');

        changestartdate_populate_cflogsheet_tbl();

    });
}


function changestartdate_populate_cflogsheet_tbl() {

    var cycid_ = $('#cyc_cycid').text();


    $('#cstartdate_table td').remove();

    $.ajax({
        url: serverpath + '/Operations/ChangeStartDate_tbl/',
        data: {
            cycid: cycid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {

                if (value.CycleOrder == 'prev') {
                    $('#cstartdate_table  tr:last').after('<tr><td>Previous Cycle</td><td>' + value.CycleNumber + '</td><td class="thedates">' + formatDate(value.Cycle_Start_Time) + '</td><td class="thedates" id="prev_cycle_endtime">' + formatDate(value.Cycle_End_Time) + '</td><td>' + zerovalue_null(value.CycleTotalDur) + '</td><td>' + value.CycleStatusName + '</td></tr>');

                } else if (value.CycleOrder == 'cur') {

                    $('#cstartdate_table  tr:last').after('<tr id="cur_td"><td>Current Cycle</td><td>' + value.CycleNumber + '</td><td class="thedates">' + formatDate(value.Cycle_Start_Time) + '</td><td class="thedates">' + formatDate(value.Cycle_End_Time) + '</td><td id="cur_cycle_dur">' + zerovalue_null(value.CycleTotalDur) + '</td><td id="cur_cycle_status">' + value.CycleStatusName + '</td></tr>');

                }

                else if (value.CycleOrder == 'next') {

                    $('#cstartdate_table  tr:last').after('<tr><td>Next Cycle</td><td>' + value.CycleNumber + '</td><td class="thedates" id="next_cycle_endtime">' + formatDate(value.Cycle_Start_Time) + '</td><td class="thedates">' + formatDate(value.Cycle_End_Time) + '</td><td>' + zerovalue_null(value.CycleTotalDur) + '</td><td>' + value.CycleStatusName + '</td></tr>');
                }
            });
        }
    });
}

$('#cstime_change_btn').live('click', function () {

    var cur_cyc_status = $('#cur_cycle_status').text();
    var cur_cycle_dur = $('#cur_cycle_dur').text();
    var prev_cyc_etime = new Date($('#prev_cycle_endtime').text());
    var next_cyc_stime = $('#next_cycle_endtime').text();

   

    var csdate_date = new Date($('#start_date_input_cstime').val());
    var cur_etime = new Date($('#start_date_input_cstime').val());

    var csdate_hr = $('#start_time_hr_cstime').val();
    var csdate_min = $('#start_time_min_cstime').val();

    var totalmin = parseInt(csdate_min, 10) + parseInt(cur_cycle_dur,10);

    csdate_date = csdate_date.add({
        minutes: csdate_min,
        hours: csdate_hr
    });

   

    cur_etime = cur_etime.add({
        minutes: totalmin,
        hours: csdate_hr
    });

    
    var ongoing_err = 'ERROR: Cycle Needs to be On Going so you can change Start Time.';
    var prevless_err = 'ERROR: Current Cycle Start Time cannot be less than or equal to the Previous Cycle End Time.';
    var nextgreater_err = 'ERROR: Current Cycle Start Time cannot be greater than or equal to the Next Cycle Start Time.';

    // alert(totalmin);
   // alert(prev_cyc_etime);
  

    if (cur_cyc_status != 'On Going') {
        alert(ongoing_err);
        $('#cstime_message').text(ongoing_err);

    } else if (csdate_date <= prev_cyc_etime) {
        alert(prevless_err);
        $('#cstime_message').text(prevless_err);
    
    } else if (next_cyc_stime != '') {
        next_cyc_stime = new Date(next_cyc_stime);

        if (csdate_date >= next_cyc_stime) {

            alert(nextgreater_err);
            $('#cstime_message').text(nextgreater_err);
        }
        else {

            change_start_time(csdate_date, cur_etime);
        }


    } else {
        change_start_time(csdate_date, cur_etime);
    }



});

function change_start_time(cstime, cetime) {

    var next_cyc_stime = new Date($('#next_cycle_endtime').text());
    var cycid_ = $('#cyc_cycid').text();
    
    var warningcyc_overlap_err = 'WARNING: Current Cycle End Time is overlapping Next Cycle Start Time. Please correct.';


    if (cetime > next_cyc_stime) {
    
        alert(warningcyc_overlap_err);
        $('#cstime_message').text(warningcyc_overlap_err);
        
        
    } else {


        $.ajax({
            url: serverpath + '/Operations/change_cycle_starttime/',
            data: {
                cycid: cycid_,
                starttime: cstime.toUTCString()
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Start Time now Changed.');
                $('#DialogChange_StartDate').dialog('close');
                cf_logsheet_link();

            }
        });
        
    }  
}

function Change_EmployeeStage_Assign() {

    var cycleid_ = $('#cyc_cycid').text();
   var stageid_ = $('#stageid_value').val();

//   alert(cycleid_);
//   alert(stageid_);


   var partialview_link = serverpath + "/Operations/Change_AssignEmployeeStage_Partial/?cycleid=" + cycleid_ + "&stageid=" + stageid_;
  //var partialview_link = "/Operations/Change_AssignEmployeeStage_Partial/";



    $('#DialogChange_EmployeeAssign').load(partialview_link, function () {

        if ($('#hideme').text() == 'HIDE') {
            $('#second_div').css({ "float": "" });
        } else {
            $('#second_div').css({ "margin-left": "45px" });
            $('#second_div').css({ "float": "" });
        }

        $(this).dialog('open');

    });
}

$('#change_employee_assign_btn').live('click', function () {

    var cycleid_ = $('#cyc_cycid').text();
    var stageid_ = $('#stageid_value').val();
    var supid_ = $('#suplist option:selected').val();
    var opid_ = $('#optlist option:selected').val();
    var skimid_ = $('#skimlist option:selected').val();


    $.ajax({
        url: serverpath + '/Operations/Change_EmployeeStage_Assign/',
        data: {
            cycid: cycleid_,
            stageid: stageid_,
            supid: supid_,
            opid: opid_,
            skimid: skimid_

        },
        type: 'POST',
        cache: false
        ,
        success: function (data) {
            $.each(data, function (index, value) {

                if (value.EmployeeRoleStageId == 1) { $('#assign_sup').text(value.Fullname); }
                else if (value.EmployeeRoleStageId == 2) { $('#assign_opt').text(value.Fullname); }
                else if (value.EmployeeRoleStageId == 3) { $('#assign_skim').text(value.Fullname); }


            });
        }
    });

    $('#DialogChange_EmployeeAssign').dialog('close');

});

function cf_logsheet_link() {

    var CycleId = $('#cyc_cycid').text();

    var cycleselectsdate = $('#startdate').val();
    var cycleselectedate = $('#enddate').val();


    cycleselectsdate = cycleselectsdate.substring(0, cycleselectsdate.length - 5);
    cycleselectedate = cycleselectedate.substring(0, cycleselectedate.length - 5);



    var thelink = serverpath + '/Operations/CFLogsheet/' + CycleId + '/' + cycleselectsdate + '/' + cycleselectedate + '/' + $('#converter').val();


    document.location.href =  thelink;

}

$('#cycle_list_btn').live('click', function () {
  
    var campid = $('#camplist').val();
  

    //alert(campid);

    listofcycles(1, 'table_cf1cycle', campid);
    listofcycles(2, 'table_cf2cycle', campid);
    listofcycles(3, 'table_cf3cycle', campid);
    listofcycles(4, 'table_cf4cycle', campid);
    
});

function ddactive_fsfe(partialv_name) {
  
    $.ajax({
        type:"POST",
        url: serverpath + '/Operations/fsfe_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result){
            $('#htab-panel1').html(result);
        }
    });

}