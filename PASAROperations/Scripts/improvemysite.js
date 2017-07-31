var serverpath = "";
//var serverpath = "/PASAROperation";

var lastclicked = 0;
var beingclicked = 0;
//var appname = '';


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



function cyclestage_count(cycid_) {

    var stagecount_ = $.ajax({
        url: serverpath + '/Operations/CycStageCount/',
        data: { cycid: cycid_ },
        type: 'POST',
        cache: false,
        dataType: 'html',
        context: document.body,
        global: false,
        async: false,
        success: function (stagecount) {
            return stagecount;
        }


    }).responseText;

    return stagecount_;
}


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
    $('#cycletable .tr_cycle_select').remove();
    var cycleselectsdate = $('#startdate').val();
    var cycleselectedate = $('#enddate').val();
    var rowCount;

    cycleselectsdate = cycleselectsdate.substring(0, cycleselectsdate.length - 5);
    cycleselectedate = cycleselectedate.substring(0, cycleselectedate.length - 5);


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
                $('#cycletable tr:last').after('<tr class="tr_cycle_select"><td>' + value.ConverterName + '</td><td class= "cycleselectortime">' + formatDate_js(value.Cycle_Start_Time) + '</td><td  class="cycletablecyclenum"><a href="' + serverpath + '/Operations/CFLogsheet/' + value.CycleId + '/' + cycleselectsdate + '/' + cycleselectedate + '/' + $('#converter').val() + '">' + value.CycleNumber + '</a></td><td class="cyclestatname">' + value.CycleStatusName + '</td></tr>');
            });



            rowCount = $('#cycletable tr').length;



            if (rowCount >= 29) {

                $('#cyclelist').css({ "overflow": "scroll" });
                $('#cyclelist').css({ "overflow-y": "visible" });
                $('#cyclelist').css({ "overflow-x": "hidden" });


            } else {
                $('#cyclelist').css({ "overflow-y": "hidden" });


            }




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

$(document).on('click', '.tabs.vertical dd', function () {
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

$(document).on('click', '.tabs.horizontal dd', function () {
    //$('.tabs.vertical dd').click(function () {

    //alert("test");

    $('.tabs.horizontal dd').removeClass();
    $(this).addClass('active');
    $('.horizontaltabs .tabs dd:first').addClass('active');

    //content = $('.tabs-content').find('div#' + x);
    ////  alert(content);
    //$('.tabs-content div').removeClass();
    //$('.tabs-content div').addClass('content');
    //content.addClass('content active');

});

function formatMonthDate(theDate) {
    var m_names = new Array("January", "February", "March",
"April", "May", "June", "July", "August", "September",
"October", "November", "December");

    var d = new Date(theDate);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var date_string = m_names[curr_month] + " " + curr_date
    + ", " + curr_year;

    return date_string;
}

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

function formatDate_sfp_param(theDate) {

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
        return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + "-" + date.getHours() + "-" + datemin;
    }
}

function formatDate_sfp(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "am";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "pm";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours: */
    h = h < 10 ? "0" + h : h;

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    return date.replace(pattern, h + ":" + m + " " + dd)
}

function formatDate_only(theDate) {

    if (theDate == null) {
        return '-';

    } else {


        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "AM";


        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        // return formatted date time string
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    }
}

function formatDate_only_af(theDate) {

    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    } else {


        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "AM";


        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        // return formatted date time string
        return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    }
}

function formatDate_af_val(theDate) {
    var ms = theDate.substring(6, theDate.length - 2);
    alert(ms);
    if (ms <= 0) {
        alert('test');
    }

}


function formatDate_af(theDate) {


    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    }

    else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "am";

        // find time 
        if (hour >= 12) {
            time = "pm";
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
        return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + hour + ":" + datemin + " " + time;
    }
}

function formatDate_time_only(theDate) {

    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    } else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "am";

        // find time 
        if (hour >= 12) {
            time = "pm";
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
        return hour + ":" + datemin + " " + time;
    }
}

function formatDate_af_24hr(theDate) {


    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    }

    else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "am";

        if (hour < 10) {
            hour = "0" + hour;
        }

        if (mins < 10) {
            mins = "0" + mins;
        }

        // return formatted date time string
        return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + hour + ":" + datemin;
    }
}

function formatDate_time_24h_only(theDate) {

    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    } else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "am";


        if (hour < 10) {
            hour = "0" + hour;
        }

        if (mins < 10) {
            mins = "0" + mins;
        }


        return hour + mins + 'H';
    }
}

function formatDate_hr(theDate) {

    if (theDate == null) {
        return '-';

    } else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var time = "am";

        // find time 
        if (hour >= 12) {
            time = "pm";
        }
        // fix hours format
        if (hour > 12) {
            hour -= 12;
        }
        else if (hour == 0) {
            hour = 12;
        }

        return date.getHours();
    }
}

function formatDate_min(theDate) {

    if (theDate == null) {
        return '-';

    } else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var hour = date.getHours();
        var mins = date.getMinutes() + '';

        // fix minutes format
        if (mins.length == 1) {
            mins = "0" + mins;
        }

        if (date.getMinutes() <= 9) {

            datemin = "0" + date.getMinutes();
        } else {
            datemin = date.getMinutes();
        }

        return date.getMinutes();
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
    var tuyere_measure = $('#input_tuyere_measure').val();
    var tuyerestat = $('#tuyerestat').val();
    var tuyerestat_desc = $('#tuyerestat option:selected').text();
    var tuyerecycid = $('#tuyere_cycid').text();

    if (tuyere_measure > 60) {

        alert('Error: Tuyere Measurement cannot be greater than 60.');

    } else {
        $.ajax({
            url: serverpath + '/Operations/Change_Tuyere/',
            data: {
                cycid: tuyerecycid,
                tuy_num: tuyerenum,
                tuy_statid: tuyerestat,
                tuy_measurement: tuyere_measure
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

    }

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
                    $('#tuyere_td_measurement_' + value.TuyereNumber).text('');


                } else if (value.Tuyere_State_Symbol == 'B') {
                    $('#tuyere_td_' + value.TuyereNumber).text(value.Tuyere_State_Symbol);
                    $('#tuyere_td_' + value.TuyereNumber).removeClass();
                    $('#tuyere_td_' + value.TuyereNumber).addClass('block_tuy');

                    block_tuy_count = block_tuy_count + 1;
                    $('#tuyere_td_measurement_' + value.TuyereNumber).text('');

                } else if (value.Tuyere_State_Symbol == 'N') {
                    $('#tuyere_td_' + value.TuyereNumber).text('');
                    $('#tuyere_td_' + value.TuyereNumber).removeClass();
                    $('#tuyere_td_measurement_' + value.TuyereNumber).text(value.TuyereMeasurement);
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

    var cycid_ = parseInt($('#cyc_cycid').text());
    var cycstatid = parseInt($('#cyc_statval').text());
    var cycstatval = $('#cfstatus_cycledetail').text();

    var msg;

    if (yesorno == 1) {
        switch (cycstatid) {

            case 1:
                msg = "Are you sure you want to End the Cycle? *NOTE: THIS WILL SEND DATA TO PI!";
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
    } else if (yesorno == 1) {
        cycstatid = cycstatid + 1;
    } else if (yesorno == 0 && cycstatid == 1) {
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
            beforeSend: function () {

                $('#loading_div').removeClass('hidden_div');
                $('#loading_div').addClass('modal_div');
            },
            complete: function () {
                $('#loading_div').addClass('hidden_div');
                $('#loading_div').removeClass('modal_div');
            },

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
    var bool_skimmer5 = $('#Skimmer5list').prop("disabled");
    var bool_skimmer6 = $('#Skimmer6list').prop("disabled");
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
        var skim5 = $('#Skimmer5list').val();
        var skim6 = $('#Skimmer6list').val();
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
                skimmer5id: skim5,
                skimmer6id: skim6,
                operatorid: optrid,
                supervisor_bool: bool_supervisor,
                skimmer1_bool: bool_skimmer1,
                skimmer2_bool: bool_skimmer2,
                skimmer3_bool: bool_skimmer3,
                skimmer4_bool: bool_skimmer4,
                skimmer5_bool: bool_skimmer5,
                skimmer6_bool: bool_skimmer6,
                operator_bool: bool_operator

            },
            type: 'POST',
            cache: false,
            success: function (data) {
                alert('Shift now added.');
                populate_7to7shift(shiftdate_);
                populate_3Shift(shiftdate_);

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

                $('#emplyeeshiftsched_table3shift tr:last').after('<tr><td>' + empshiftsched_date + '</td><td>' + value.EmployeeRoleName + '</td><td>' + remove_null_fromshift(value.Shift7to3) + '</td><td>' + remove_null_fromshift(value.Shift3to11) + '</td><td>' + remove_null_fromshift(value.Shift11to7) + '</td></tr>');
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
            //cyc_active_stage(cycid, stageid);
            check_cycle_with_stage(stageid);

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
            //cyc_active_stage(cycid, stageid_);
            //cyc_activity_perstage(cycid, stageid_);
            check_cycle_with_stage(stageid_);
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

    $('.cftable tr[id*="tr_act"]').remove();

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

    if (stageid_ == 0) {
        $('#assign_sup').text('');
        $('#assign_opt').text('');
        $('#assign_skim').text('');

    } else {

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

                if (data == '') {
                    $('#assign_sup').text(' -');
                    $('#assign_opt').text(' -');
                    $('#assign_skim').text(' -');

                } else {
                    $.each(data, function (index, value) {

                        if (value.EmployeeRoleStageId == 1) { $('#assign_sup').text(value.Fullname); }
                        else if (value.EmployeeRoleStageId == 2) { $('#assign_opt').text(value.Fullname); }
                        else if (value.EmployeeRoleStageId == 3) { $('#assign_skim').text(value.Fullname); }

                    });
                }
            }
        });

    }
}




function zerovalue(thevalue) {

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

function zerovalue_comma(thevalue) {

    var nozero;

    if (thevalue == 0 || thevalue == '' || thevalue == null) {

        nozero = "-";
    } else {

        if (thevalue % 1 == 0) {
            nozero = commaSeparateNumber(thevalue);
        } else {
            nozero = commaSeparateNumber(thevalue.toFixed(2));
        }



    }

    return nozero;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
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

function zerovalue_null_af(thevalue) {

    var nozero;

    if (thevalue == null || thevalue == 0) {

        nozero = '';
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

    }
    else if (end_date <= start_date) {

        $('#error_msg_time').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('.duration_span').text('ERROR');


    }


    else {
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

    } else if (end_date <= start_date) {

        $('#error_msg_time_edit').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
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

    } else if (end_date <= start_date) {

        $('#error_msg_time_im').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('.duration_span').text('ERROR');


    } else {
        $('#error_msg_time_im').html('Correct: <b>End Time</b> is Good.');
        $('.duration_span').text(the_dur);
    }
}

//----- Add Act -----
$(document).on('change', '#end_time_hr_input', function () {
    getDUration();
});

$(document).on('change', '#end_time_min_input', function () {
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
        var skim5_shift = $('#TypeShiftlist_Skimmer5').val();
        var skim6_shift = $('#TypeShiftlist_Skimmer6').val();

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
                shift_skimmer5id: skim5_shift,
                shift_skimmer6id: skim6_shift,
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

                } else if (value.EmployeeRoleId == 7) {
                    $('#Skimmer5list').prop("disabled", false);

                } else if (value.EmployeeRoleId == 8) {
                    $('#Skimmer6list').prop("disabled", false);

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
    $('#Skimmer5list').prop("disabled", true);
    $('#Skimmer6list').prop("disabled", true);
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

                if (value.AirFlow.toFixed(2) < 25000) {
                    $(dialogname + ' .table_airflow tr:last').after('<tr class = "selected_tr_airflow_' + rownum + '"><td class="td_right">' + rownum + '</td><td>' + value.TimeAirflow.substring(0, 16) + '</td><td class="td_centervalue less25">' + value.AirFlow.toFixed(2) + '</td></tr>');

                } else {

                    $(dialogname + ' .table_airflow tr:last').after('<tr class = "selected_tr_airflow_' + rownum + '"><td class="td_right">' + rownum + '</td><td class="td_center">' + value.TimeAirflow.substring(0, 16) + '</td><td class="td_centervalue">' + value.AirFlow.toFixed(2) + '</td></tr>');

                }



            });

        }
    });

    $(dialogname + ' .aflow_msg').css("color", "#000000");
    $(dialogname + ' .airflow_checkbox').prop("disabled", false);



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
    var forEndTime_msg = "Please input correct End Time, it should be greater than the start time.";

    var checkbox_airflow_prop = $(dialog + ' .airflow_checkbox').prop('disabled');
    var checkbox_airflow_checked = $(dialog + ' .airflow_checkbox').is(':checked');

    var fsfe_prop = $(dialog + ' .fsfe_charge_input').prop('disabled');
    var cf_prop = $(dialog + ' .cf_charge_input').prop('disabled');
    var af_prop = $(dialog + ' .af_charge_input').prop('disabled');

    var fsfe_val = $(dialog + ' .fsfe_charge_input').val();
    var cf_val = $(dialog + ' .cf_charge_input').val();
    var af_val = $(dialog + ' .af_charge_input').val();

    var desc_val = $(dialog + ' #Act_Desc_div').text();

    var sulfur_val = $.isNumeric($(dialog + ' .sulfur_input').val());

    // alert(sulfur_val);

    //    alert(checkbox_airflow_checked);


    //alert(fsfe_prop);
    //alert(cf_prop);
    //alert(af_prop);

    //alert(fsfe_val);
    //alert(cf_val);
    //alert(af_val);




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
        //else if (actcode_msg == 'B' && fsfe_val > cf_val) {

        //    $(dialog + ' .fsfe_charge_input').css('background-color', '#FFA8A8');
        //    alert('ERROR: ' + desc_val + ' FSFE value should be greater than CF.');
        //    return 0;
        //}

    else if (actcode_msg == 'N' && cf_val <= af_val) {

        $(dialog + ' .cf_charge_input').css('background-color', '#FFA8A8');
        alert('ERROR: ' + desc_val + ' CF value should be greater than AF.');
        return 0;
    }

    else if (actcode_msg == 'N' && sulfur_val == false) {

        $(dialog + ' .sulfur_input').css('background-color', '#FFA8A8');
        alert('ERROR: S, ppm cannot be blank or non-numeric.');
        return 0;
    }




    else if (actcode_msg == 'L' && cf_val == 0) {

        var answer = confirm("Are you sure you want to input 0 value for CF Slag Skimming Activity?");

        if (answer) { return 1; }
        else { return 0; }

    } else if ((actcode_msg == 'DO' || actcode_msg == 'DOL' || actcode_msg == 'DOP') && (cf_val > 10)) {

        alert('ERROR: ' + desc_val + ' cannot be greater than 10 value weight.');

    }
    else if (fsfe_prop == false && fsfe_val == 0) {
        $(dialog + ' .fsfe_charge_input').css('background-color', '#FFA8A8');
        alert('ERROR: ' + desc_val + ' cannot have a zero weight (0) FSFE value.');
        return 0;
    }

    else if (cf_prop == false && cf_val == 0) {
        $(dialog + ' .cf_charge_input').css('background-color', '#FFA8A8');
        alert('ERROR: ' + desc_val + ' cannot have a zero weight (0) CF value.');
        return 0;
    }

    else if (af_prop == false && af_val == 0) {
        $(dialog + ' .af_charge_input').css('background-color', '#FFA8A8');
        alert('ERROR: ' + desc_val + ' cannot have a zero weight (0) AF value.');
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
    sulfurval_ = parseFloat(sulfurval_).toFixed(2);
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
    if (actdur_ == 0) {
        alert('Error: Duration cannot be zero.');
    }
    else {
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

    var cycstat = $('#cyc_statval').text();

    if (check_ongoing_cyc()) {

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
    }
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

    var partialview_link = serverpath + "/Operations/InsertMidActivity_Partial/?cycleid_actparam=" + cycleid + "&actid=" + ActId_;


    $('#DialogInsertMid_Activity').load(partialview_link, function () {



        if ($('#hideme').text() == 'HIDE') {

            //$('#second_div').css({ "margin-left": "45px" });
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


//list CF
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

                //link
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

    if (check_ongoing_cyc()) {

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

}
$('#compute_btn').live('click', function () {

    var matte = $('#testinput_matte').val();
    var mattegrade = $('#testinput_mattegrade').val();
    var fe_ratio = $('#testinput_silicaratio').val();

    var var1;
    var var2;
    var silica_reqd;
    var slag_reqd;

    //var1 = (matte * ((mattegrade * (-0.6816) + 56.701))) / 100;
    //var1 = (matte * ((mattegrade * (-0.740343) + 59.0877))) / 100;
    var1 = (matte * ((mattegrade * (-0.6467) + 53.948))) / 100;

    //var2 = (fe_ratio / 0.8906);
    var2 = (fe_ratio / 0.96);

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

    $('#cflogsheet_silicareqd tbody tr').remove();

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

                $('#cflogsheet_silicareqd tbody').append('<tr><td class="hide_td">' + value.ActivityId + '</td><td class="hide_td" id="fesilca_matte_computed_' + value.ActivityId + '">' + value.CF_Quantity_Value + '</td><td class="hide_td" id="fesilca_mattegrade_computed_' + value.ActivityId + '">' + zerovalue_null(value.MatteGrade_Value) + '</td><td class="td_left">' + value.Material + '</td><td id="fesilca_matte_' + value.ActivityId + '">' + value.CF_Quantity.toFixed(2) + '</td><td><input type="text" id= "fesilica_mattegrade_' + value.ActivityId + '" class="silica_add_input" value= ' + zerovalue_null(value.Original_MatteGrade) + ' onclick="get_mg_val(this.id);return false;" /></td><td id ="fesilca_sereqd_' + value.ActivityId + '">' + value.SilicaReqd.toFixed(2) + '</td><td id ="fesilca_slagreqd_' + value.ActivityId + '">' + value.SlagReqd.toFixed(2) + '</td></tr>');

                sum_silica_ = parseFloat(value.SilicaReqd.toFixed(2)) + parseFloat(sum_silica_);
                sum_slag_ = parseFloat(value.SlagReqd.toFixed(2)) + parseFloat(sum_slag_);



            });

            $('#cflogsheet_silicareqd tbody').append('<tr><td id="total_right" colspan = 3>Total: </td><td id = "sum_silica"></td><td id = "sum_slag"></td></tr>');
            sum_silica_additions(sum_silica_, sum_slag_);


        }
    });
}



function sum_silica_additions(sum_silica, sum_slag) {

    $('#sum_silica').text(sum_silica.toFixed(2));
    $('#sum_slag').text(sum_slag.toFixed(2));
}



function Change_CF_SilicaRatio() {



    if (check_ongoing_cyc()) {

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
}
$('#refresh_silica_computation').click(function () {
    //  refresh_calc();

    var stageid_ = $('#stageid_value').val();
    fesilica_populate_cflogsheet_tbl(stageid_);



});


function refresh_calc() {

    $('#sum_silica').text('0.00');
    $('#sum_slag').text('0.00');

    $('#cflogsheet_silicareqd').find('td:nth-child(1)').each(function (index) {

        fesilca_additions($(this).text());

    });
}


function fesilca_additions(actid) {

    //fesilca_matte_' + value.ActivityId + '


    var matte = $('#fesilca_matte_computed_' + actid).text();
    //var mattegrade = $('#fesilca_mattegrade_computed_' + actid).val();
    var mattegrade = $('#fesilica_mattegrade_' + actid).val();
    var fe_ratio = $('#fesilica_CF_list option:selected').text();


    //alert(matte);
    // alert(mattegrade);

    var var1;
    var var2;
    var silica_reqd;
    var slag_reqd;

    //var1 = (matte * ((mattegrade * (-0.6823) + 57.716))) / 100;
    //var1 = (matte * ((mattegrade * (-0.740343) + 59.0877))) / 100;
    var1 = (matte * ((mattegrade * (-0.6467) + 53.948))) / 100;

    //var2 = (fe_ratio / 0.8906);
    var2 = (fe_ratio / 0.96);

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

    if (check_ongoing_cyc()) {

        themsg = 'Are you sure you want to save all the values in Matte Grade?';

        var answer = confirm(themsg);

        if (answer) {


            $('#cflogsheet_silicareqd').find('td:nth-child(1)').each(function (index) {

                Save_MultipleMatteGrade($(this).text());

            });

            alert('Matte Grade now saved.');
            refresh_calc();

        } else { }

    }
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

    var partialview_link = serverpath + "/Operations/Change_StartDate_Partial/?cycid=" + cycleid;



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

    var today_time = new Date();

    var csdate_hr = $('#start_time_hr_cstime').val();
    var csdate_min = $('#start_time_min_cstime').val();

    var totalmin = parseInt(csdate_min, 10) + parseInt(cur_cycle_dur, 10);

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
    var futuredate_err = 'ERROR: Date Cannot be in the Future.';

    // alert(totalmin);
    // alert(prev_cyc_etime);


    if (cur_cyc_status != 'On Going') {
        alert(ongoing_err);
        $('#cstime_message').text(ongoing_err);

    } else if (csdate_date > today_time) {
        alert(futuredate_err);
        $('#cstime_message').text(futuredate_err);

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

        var date1 = cstime.toUTCString();

        date1 = date1.substr(0, date1.length - 3);

        date1 = date1 + 'GMT';
        //alert(date1);

        $.ajax({
            url: serverpath + '/Operations/change_cycle_starttime/',
            data: {
                cycid: cycid_,
                starttime: date1
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

    if (check_ongoing_cyc()) {

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
}

$('#change_employee_assign_btn').live('click', function () {

    var cycleid_ = $('#cyc_cycid').text();
    var stageid_ = $('#stageid_value').val();
    var supid_ = $('#suplist option:selected').val();
    var opid_ = $('#optlist option:selected').val();
    var skimid_ = $('#skimlist option:selected').val();

    // alert(supid_);
    // alert(opid_);
    // alert(skimid_);


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


    document.location.href = thelink;

}
//CF Logsheet 
$('#cycle_list_btn').live('click', function () {

    var campid = $('#camplist').val();


    //alert(campid);

    listofcycles(1, 'table_cf1cycle', campid);
    listofcycles(2, 'table_cf2cycle', campid);
    listofcycles(3, 'table_cf3cycle', campid);
    listofcycles(4, 'table_cf4cycle', campid);




});

function ddactive_fsfe(partialv_name) {
    //$.spin('true');
    $.ajax({
        type: "POST",
        url: serverpath + '/Operations/fsfe_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
            //$.spin('false');
        }
    });
}

function ddactive_smeltplan(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/Operations/fsfe_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });

}

function ddactive_energy(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/Energy/energy_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });

}

function check_cycle_with_stage(stageid_) {

    var result_count;
    var cyc_id = $('#cyc_cycid').text();

    $.ajax({
        type: "POST",
        url: serverpath + '/Operations/Cycle_WithStage/',
        data: { cycid: cyc_id },
        success: function (result) {

            result_count = result;

            if (result >= 1) {
                $('#add_activity_btn').prop("disabled", false);

                load_Cflogsheet(cyc_id, stageid_);



            } else if (result == 0) {
                $('#add_activity_btn').prop("disabled", true);

                load_Cflogsheet(cyc_id, 0);

            }
        }
    });



}


function load_Cflogsheet(cyc_id, stageid) {

    cyc_active_stage(cyc_id, stageid); // - populate Stage Side
    cyc_stage_employee_assign(cyc_id, stageid);  // - populate Employee per Stage
    cyc_activity_perstage(cyc_id, stageid); //  - populate Activity table
    cyc_activity_perstage_daterange(cyc_id, stageid); //  - populate Stage DateRange
    fesilica_populate_cflogsheet_tbl(stageid); // populate fesilica table

}


function load_shift_manpower() {


}

function load_ddtabs_content() {

    alert('test');
}

// - Select FSFE Button

$('#fsfe_shift_btn').live('click', function () {

    $('#fsfe_log_header').css({ "background-color": "#FFFFCC" });


    //enable select crew in Crew Defaults and Man Power
    $('#fsfe_manpower_table select').prop("disabled", false);

    //Tapping Activities
    $('#fsfe_controlrm_mtapper_btn').prop("disabled", false);
    $('#fsfe_tapact_stapper_btn').prop("disabled", false);

    //Flash Dryer Operator
    $('input[type="checkbox"]').removeAttr("disabled", false);

    //Dust Line Tender
    $('input[type="checkbox"]').removeAttr("disabled", false);

    //Cooling Water and Soot Blower Tender
    $('input[type="checkbox"]').removeAttr("disabled", false);

    //Slag Tender
    $('input[type="checkbox"]').removeAttr("disabled", false);

    //Highlights
    $('#txtarea_fsfe_highlights').prop("disabled", false); $('#txtarea_fsfe_turnover').prop("disabled", false);

    //Buildup Management
    $('input[type="number"]').removeAttr("disabled", false);
    $('img').removeAttr("disabled", false);

    //change color when change.
    var fsfe_btn_val = $('#fsfe_shift_btn').val();
    $('input[type="text"],textarea,select').css({ "background-color": "#FFFFCC" });

    //$('FSFcrewdefaultlist').prop("disabled", false);

    var fsfe_shiftdate = $('#fsfe_shiftdate').val();
    var fsfe_stageid = $('#fsfe_shiftdate_select').val();

    var interfaceid = $('#interfaceid').text();

    assign_fsfe_prodid();

    switch (interfaceid) {

        case ('1'):
            load_shift_supervisor();
            check_manpower_select();
            break;
        case ('2'):
            load_fsfe_matte_tapping();
            load_fsfe_slag_tapping();
            break;
        case ('3'):
            load_fsfe_spo();
            break;
        case ('4'):

            break;
        case ('5'):
            load_fsfe_checklist(3);
            break;
        case ('6'):
            load_fsfe_checklist(4);
            break;
        case ('7'):
            load_fsfe_checklist(5);
            break;
        case ('8'):
            load_fsfe_checklist(6);
            break;
        case ('9'):
            load_fsfe_hlight();
            load_fsfe_fpattern();
            break;
        case ('10'):
            load_fsfe_fii_label();
            load_fsfe_fii();
            break;
        case ('11'):
            load_fsfe_equipment_issues();
            break;
        case ('12'):
            load_fsfe_dustline_inspect(fsfe_stageid);
            break;
        case ('13'):
            load_fsf_buildup_daily();
            load_fsf_buildup_shift();
            break;
        default:
            break;

    }

});


function load_shift_supervisor() {

    default_select_clear();


    // 1. Man Power
    select_manpower();

    // 2. Remarks
    //  select_kpi();

    // 3. Regular Crew
    //  load_fsfe_reg_crew();

    // 4. Matte Tapper
    //  load_fsfe_mtapper();

}





function default_select_clear() {

    $('#FSFEEmplist_roleid_1').val('');
    $('#FSFEEmplist_roleid_2').val('');
    $('#FSFEEmplist_roleid_3').val('');
    $('#FSFEEmplist_roleid_4').val('');
    $('#FSFEEmplist_roleid_5').val('');
    $('#FSFEEmplist_roleid_6').val('');
    $('#FSFEEmplist_roleid_8').val('');
    $('#FSFEEmplist_roleid_9').val('');
    $('#FSFEEmplist_roleid_10').val('');
    $('#FSFEEmplist_roleid_11').val('');
    $('#FSFEEmplist_roleid_12').val('');
    $('#FSFEEmplist_roleid_13').val('');
    $('#FSFEEmplist_roleid_14').val('');
    $('#FSFEEmplist_roleid_15').val('');

    $('select[id*="FSFEEmplist_roleid_"]').each(function () {
        $(this).val('');
    });

    //$('#txtarea_kpi1').val('');
    //$('#txtarea_kpi2').val('');
    //$('#txtarea_kpi3').val('');
    //$('#txtarea_kpi4').val('');
    //$('#txtarea_kpi5').val('');



}


//Man power
function select_manpower() {

    var fprod = $('#fsfe_prod_id').val();

    $.ajax({
        url: serverpath + '/Operations/Select_ManPower/',
        data: {
            fsfeprodid: fprod
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#FSFcrewmanpowerlist').val(value.CrewId);
                $('#FSFEEmplist_roleid_' + value.FSFE_Role_Type_Id).val(value.FSFE_Onboard_Employee_Id);

                $('#FSFEEmplist_roleid_' + value.FSFE_Role_Type_Id + 'a').val(value.AddlEmpAId);
                $('#FSFEEmplist_roleid_' + value.FSFE_Role_Type_Id + 'b').val(value.AddlEmpBId);
                check_manpower_select();
            });
        }
    });
    select_manpower_crew();
}

//Crew Defaults 
function select_manpower_crew() {
    //$('select').prop("disabled", false);


    var fprod = $('#fsfe_prod_id').val();

    $.ajax({
        url: serverpath + '/Operations/Select_CrewManPower/',
        data: {
            fsfeprodid: fprod
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#FSFcrewmanpowerlist').val(data.crew_id);

        }
    });

}

function select_kpi() {

    var fprod = $('#fsfe_prod_id').val();

    $.ajax({
        url: serverpath + '/Operations/Select_KPI/',
        data: { fsfeprodid: fprod },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {

                $('#txtarea_kpi' + value.FSFE_Param_Id).val(value.FSFE_KPI_Comment);

            });
        }
    });
}


function getFSFEProd_Id() {

    var fsfe_shiftdate = $('#fsfe_shiftdate').val();
    var fsfe_stageid = $('#fsfe_shiftdate_select').val();

    var fsfe_prod_id = $.ajax({
        url: serverpath + '/Operations/Select_FSFE_Date/',
        data: {
            fsfe_prod_date: fsfe_shiftdate,
            fsfe_stage_id: fsfe_stageid
        },
        type: 'POST',
        cache: false,
        dataType: 'html',
        context: document.body,
        global: false,
        async: false,

        success: function (data) { return data; }
    }).responseText;

    return fsfe_prod_id;

}

$('#fsfe_manpower_btn').live('click', function () {
    FSFE_Change('manpower');
});

$('#savemanpower_link').live('click', function () {
    FSFE_Change('manpower');
});

$('#fsfe_crewdefault_btn').live('click', function () {
    fsf_savecrew();
});

$('#savecrewdefault_link').live('click', function () {
    fsf_savecrew();
});


$('#fsfe_shift_kpi_btn').live('click', function () {
    FSFE_Change('kpi');
});

$('#savekpi_link').live('click', function () {
    FSFE_Change('kpi');
});

$('#add_regcrew_ok_btn').live('click', function () {
    FSFE_Change('regcrew');
});

$('#add_mtapper_ok_btn').live('click', function () {
    FSFE_Change('mtapper');
});
//Add button for matte tapping
$('#add_mtapping_ok_btn').live('click', function () {
    FSFE_Change('mtapping');
});

$('#add_stapping_ok_btn').live('click', function () {
    FSFE_Change('stapping');
});

$('#add_fii_upload_btn').live('click', function () {
    FSFE_Change('fii');
});
//dustline inspections
$('#add_dustline_inspections_upload_btn').live('click', function () {
    FSFE_Change('fsfedustline_inspections');
});

$('#edit_regcrew_ok_btn').live('click', function () {
    edit_regcrew();
});


$('#edit_mtapper_ok_btn').live('click', function () {
    edit_mtapper();
});

$('#edit_mtapping_ok_btn').live('click', function () {
    Mtapping_edit();
});

$('#edit_stapping_ok_btn').live('click', function () {
    Stapping_edit();
});

$('#add_spotap_ok_btn').live('click', function () {
    FSFE_Change('spotap');
});

$('#edit_spotap_ok_btn').live('click', function () {
    spotap_change('edit', '#edit_txtarea_spotap');
});

$('#fsfe_fdopt_add_btn').live('click', function () {
    FSFE_Change('fdopt');
});

$('#fsfe_fdopt_add_link').live('click', function () {
    FSFE_Change('fdopt');
});

$('#fsfe_dustline_add_btn').live('click', function () {
    FSFE_Change('dustline');
});

$('#fsfe_cw_sbtender_add_btn').live('click', function () {
    FSFE_Change('cwandsbtender');
});

$('#fsfe_slagtender_add_btn').live('click', function () {
    FSFE_Change('slagtender');
});

$('#fsfe_savehlight_btn').live('click', function () {
    FSFE_Change('hlight');
});

$('#save_hlight_link').live('click', function () {
    FSFE_Change('hlight');
});

$('#btnUploadFile').live('click', function () {
    FSFE_Change('fpattern');
});

$('#fsfe_equipment_issues_btn').live('click', function () {
    FSFE_Change('fsfequipment_issues');
});

$('#save_equipment_issues_link').live('click', function () {
    FSFE_Change('fsfequipment_issues');
});
$('#edit_dustline_inspections_upload_btn').live('click', function () {
    FSFE_Change('edit_fsfedustline_inspections');
});

$('#fsf_bldup_save_btn').live('click', function () {
    FSFE_Change('save_fsf_bldup');

});


function FSFE_Change(option) {
    var fprod = $('#fsfe_prod_id').val();

    if (fprod == 0) {
        alert('Please select Date and Shitf.');
    } else {

        switch (option) {
            //manpower
            case ('manpower'):

                save_change_manpower();

                break;
            case ('kpi'):

                save_change_kpi();

                break;

            case ('regcrew'):

                save_regcrew();

                break;

            case ('mtapper'):

                save_mtapper();

                break;

            case ('mtapping'):

                Mtapping_add();

                break;

            case ('stapping'):

                Stapping_add();

                break;

            case ('spotap'):

                spotap_change('add', '#txtarea_spotap');

                break;

            case ('fdopt'):

                save_fdopt(3, 'FD Operator Checklist');

                break;

            case ('dustline'):

                save_fdopt(4, 'Dust Line Tender Checklist');

                break;

            case ('cwandsbtender'):

                save_fdopt(5, 'Cooling Water and Soot Blower Tender Checklist');

                break;

            case ('slagtender'):

                save_fdopt(6, 'Slag Tender Checklist');

                break;

            case ('hlight'):

                save_hlight();

                break;

            case ('fpattern'):

                save_fpattern();

                break;
            //fii
            case ('fii'):

                save_fii();

                break;
            //manpower
            case ('fsfcrew_manpower'):

                fsf_crewmanpower_autopop();

                break;
            //equipment issues
            case ('fsfequipment_issues'):

                save_equipment_issues();

                break;
            //dustline inspections
            case ('fsfedustline_inspections'):

                save_dustline_inspections();

                break;
                //dustline inspections
            case ('edit_fsfedustline_inspections'):

                save_edit_dustline_inspections();

                break;

            case ('save_fsf_bldup'):

                save_fsf_bldup();

                break;



            default:
                break;
        }
    }
}


function save_regcrew() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_empid_ = $('#regularcrew_ddl').val();
    var fsfe_special_act_ = $('#add_regcrew_txtarea').val();

    $.ajax({

        url: serverpath + '/Operations/Add_FSFE_RegCrew/',
        data: {

            fsfe_prodid: fsfe_prodid_,
            empid: fsfe_empid_,
            special_act: fsfe_special_act_
        },

        type: 'POST',
        cache: false,
        success: function (data) {


        }
    });
    alert('FSFE Regular Crew now added.');
    $('#DialogRegularCrew_Select').dialog('close');

    load_fsfe_reg_crew();
}

function save_mtapper() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_empid_ = $('#mtapper_ddl').val();
    var fsfe_mtapper_ = $('#add_mtappernum_txtb').val();


    $.ajax({

        url: serverpath + '/Operations/Add_FSFE_Mtapper/',
        data: {

            fsfe_prodid: fsfe_prodid_,
            tapper_num: fsfe_mtapper_,
            empid: fsfe_empid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            if (data == 0) {

                alert('Matte Tapper now added.');
                $('#DialogMatteTapper_Select').dialog('close');

                load_fsfe_mtapper();

            } else {
                alert('Matte Tapper not added existing Tapper Number already.');
            }

        }
    });

}

function check_mtapper_duplicate() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_mtapper_ = $('#add_mtappernum_txtb').val();

    $.ajax({

        url: serverpath + '/Operations/Check_Tappernum/',
        data: {

            fsfe_prodid: fsfe_prodid_,
            tapper_num: fsfe_mtapper_,

        },

        type: 'POST',
        cache: false,
        success: function (data) {

        }
    });
    alert('Matte Tapper now added.');
    $('#DialogMatteTapper_Select').dialog('close');

    load_fsfe_mtapper();

}



function edit_regcrew() {

    var regcrewid_ = $('#regcrew_id').text();
    var fsfe_empid_ = $('#edit_regularcrew_ddl').val();
    var fsfe_special_act_ = $('#edit_regcrew_txtarea').val();

    $.ajax({

        url: serverpath + '/Operations/Edit_FSFE_RegCrew/',
        data: {

            reg_crewid: regcrewid_,
            empid: fsfe_empid_,
            special_act: fsfe_special_act_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

        }
    });
    alert('FSFE Regular Crew now Edited.');
    $('#DialogRegularCrewEdit_Select').dialog('close');

    load_fsfe_reg_crew();
}


function edit_mtapper() {

    var mtapper_id_ = $('#mtapper_id').text();
    var fsfe_empid_ = $('#edit_mtapper_ddl').val();
    var mtapper_num = $('#edit_mtappernum_txtb').val();
    var slagblow = $('#add_slagblow').val();
    var cfno = $('#add_cfno').val();
    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $.ajax({

        url: serverpath + '/Operations/Edit_FSFE_Mtapper/',
        data: {
            mtapper_id: mtapper_id_,
            empid: fsfe_empid_,
            tappernum: mtapper_num,
            slagblow: slagblow_,
            cfno: cfno_,
            fsfe_prodid: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            if (data == 0) {

                alert('Matte Tapper now edited.');
                $('#DialogMatteTapperEdit_Select').dialog('close');

                load_fsfe_mtapper();

            } else {
                alert('Matte Tapper not editted, Tapper Number already exist.');
            }
        }
    });
    // alert('FSFE Matte Tapper now Edited.');
    // $('#DialogMatteTapperEdit_Select').dialog('close');

    // load_fsfe_mtapper();
}



//function save_change_manpower() {

//    var fsfe_prodid_ = $('#fsfe_prod_id').val();



//    var crewid_ = $('#FSFcrewmanpowerlist').val();

//    var emp1_ = $('#FSFEEmplist_roleid_1').val();
//    var emp2_ = $('#FSFEEmplist_roleid_2').val();
//    var emp3_ = $('#FSFEEmplist_roleid_3').val();
//    var emp4_ = $('#FSFEEmplist_roleid_4').val();
//    var emp5_ = $('#FSFEEmplist_roleid_5').val();
//    var emp6_ = $('#FSFEEmplist_roleid_6').val();
//    var emp7_ = $('#FSFEEmplist_roleid_7').val();
//    var emp8_ = $('#FSFEEmplist_roleid_8').val();
//    var emp9_ = $('#FSFEEmplist_roleid_9').val();
//    var emp10_ = $('#FSFEEmplist_roleid_10').val();
//    var emp11_ = $('#FSFEEmplist_roleid_11').val();
//    var emp12_ = $('#FSFEEmplist_roleid_12').val();
//    var emp13_ = $('#FSFEEmplist_roleid_13').val();
//    var emp14_ = $('#FSFEEmplist_roleid_14').val();
//    var emp15_ = $('#FSFEEmplist_roleid_15').val();

//    $.ajax({

//        url: serverpath + '/Operations/Assign_ManPower/',
//        data: {
//            fsfeprodid: fsfe_prodid_,
//            crewid: crewid_,
//            emp1: emp1_, emp2: emp2_, emp3: emp3_, emp4: emp4_, emp5: emp5_,
//            emp6: emp6_, emp7: emp7_, emp8: emp8_, emp9: emp9_, emp10: emp10_,
//            emp11: emp11_, emp12: emp12_, emp13: emp13_, emp14: emp14_, emp15: emp15_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {
//            alert('FSFE Man Power now saved.');
//        }
//    });
//}

function save_change_manpower() {
    var date_ = $('#fsfe_shiftdate').val();
    var shiftid_ = $('#fsfe_shiftdate_select').val();

    var crew_ = $('#FSFcrewmanpowerlist').val();

    if (crew_ != "") {
        //first set and send data and shift
        $.ajax({
            url: serverpath + '/Operations/Save_ShiftAssign/',
            data: {
                date: date_,
                shiftid: shiftid_,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                //then send with crewid
                $.ajax({
                    url: serverpath + '/Operations/getProdId/',
                    data: {
                        date: date_,
                        shiftid: shiftid_,
                        crewid: crew_
                    },
                    type: 'POST',
                    cache: false,
                    success: function (data) {
                        var shiftassignid_ = data;
                        //delete existing data
                        $.ajax({
                            url: serverpath + '/Operations/Delete_Crew/',
                            data: {
                                prodid: data
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                                var items = [];

                                $('#fsfe_manpower_table select[id*="FSFEEmplist_roleid_"]').each(function () {
                                    var attrid = $(this).attr('id');

                                    var roletypeid_ = attrid.replace('FSFEEmplist_roleid_', '');
                                    var empid_ = $(this).val();

                                    var empaid_ = $('#FSFEEmplist_roleid_' + roletypeid_ + 'a').val();
                                    var empbid_ = $('#FSFEEmplist_roleid_' + roletypeid_ + 'b').val();

                                    items.push({
                                        shiftassignid: shiftassignid_,
                                        roletypeid: roletypeid_,
                                        empid: empid_,
                                        empaid: empaid_,
                                        empbid: empbid_
                                    });
                                });

                                if (items.length != 0) {
                                    items = JSON.stringify({ 'items': items })

                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        type: 'POST',
                                        url: serverpath + '/Operations/Assign_ManPower/',
                                        data: items,
                                        success: function (data) {
                                            alert('Man Power now saved.');
                                        }
                                    });
                                    $('select').change(function () {
                                        //$(this).css({ 'background-color': '#DFD8D1' });
                                        $(this).addClass('changed');
                                    });
                                }
                                else
                                    alert('No changes were made.');
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        alert('Select Crew First.');
        $('#FSFcrewmanpowerlist').focus();

    }
}




function save_change_kpi() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    var comments2_ = $('#txtarea_kpi2').val();
    var comments3_ = $('#txtarea_kpi3').val();
    var comments4_ = $('#txtarea_kpi4').val();
    var comments5_ = $('#txtarea_kpi5').val();


    $.ajax({

        url: serverpath + '/Operations/Assign_KPI/',
        data: {
            fsfeprodid: fsfe_prodid_, kpi_comments2: comments2_, kpi_comments3: comments3_,
            kpi_comments4: comments4_, kpi_comments5: comments5_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('FSFE KPI Remarks now saved.');
        }
    });
}


$('#fsfe_shift_regcrew_btn').live('click', function () {
    load_partial_regcrew();
});


$('#save_regcrew_link').live('click', function () {

    load_partial_regcrew();
});


$('#fsfe_shift_mtapper_btn').live('click', function () {
    load_partial_mtapper();
});


$('#save_mtapper_link').live('click', function () {

    load_partial_mtapper();
});

//MAtte Tapping
$('#fsfe_controlrm_mtapper_btn').live('click', function () {

    load_partial_mtapping();

}); $('#fsfe_controlrm_mtapper_link').live('click', function () {

    load_partial_mtapping();

});

$('#fsfe_controlrm_mtapper_link').live('click', function () {

    load_partial_mtapping();

});
//End Matte Tapping
//Slag Tapping
$('#fsfe_tapact_stapper_btn').live('click', function () {

    load_partial_stapping();

});

$('#fsfe_tapact_stapper_link').live('click', function () {

    load_partial_stapping();

});


$('#fsfe_spotap_btn').live('click', function () {

    load_partial_spotap();

});

$('#fsfe_fpattern_btn').live('click', function () {
    load_partial_fpattern();
});

$('#save_fpattern_link').live('click', function () {
    load_partial_fpattern();
});

$('#fsfe_fii_btn').live('click', function () {
    load_partial_fii();
});

$('#save_fii_link').live('click', function () {
    load_partial_fii();
});

//Dustline Inspections
$('#add_dustline_inspections_btn').live('click', function () {
    load_partial_dustline_inspections();
});
$('#add_dustline_inspections_link').live('click', function () {
    load_partial_dustline_inspections();
});
//End Dustline Inspections
$('#add_sfp_entry_lnk').live('click', function () {
    load_partial_sfp();
});



function load_partial_mtapping() {

    var partialview_link = serverpath + "/Operations/MatteTapping_Partial";
    $('#DialogMatteTapping_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_stapping() {

    var partialview_link = serverpath + "/Operations/SlagTapping_Partial";
    $('#DialogSlagTapping_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}



function load_partial_spotap() {

    var partialview_link = serverpath + "/Operations/SPOTapping";
    $('#DialogSPOTap_Select').load(partialview_link, function () {
        $(this).dialog('open');

    });

    return false;
}


function load_partial_regcrew() {

    var partialview_link = serverpath + "/Operations/NewRegular_Partial";
    $('#DialogRegularCrew_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_tuyere(cycid) {

    if (check_ongoing_cyc()) {
        var partialview_link = serverpath + "/Operations/NewTuyere_Partial/?cycid=" + cycid;

        $('#DialogTuyere_Select').load(partialview_link, function () {
            if ($('#hideme').text() == 'HIDE') {
                $('#second_div').css({ "float": "" });
            } else {
                $('#second_div').css({ "margin-left": "45px" });
                $('#second_div').css({ "float": "" });
            }
            $(this).dialog('open');
        });

        return false;
    }
}




function load_partial_mtapper() {

    var partialview_link = serverpath + "/Operations/MatteTapper_Partial";
    $('#DialogMatteTapper_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_edit_regcrew(regcrewid_) {


    var partialview_link = serverpath + "/Operations/EditRegularCrew_Partial/?regcrew_id=" + regcrewid_;
    $('#DialogRegularCrewEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_edit_mtapper(mtapperid_) {


    var partialview_link = serverpath + "/Operations/EditMtapper_Partial/?mtapperid=" + mtapperid_;
    $('#DialogMatteTapperEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_edit_fpattern(fpatternid_) {

    var partialview_link = serverpath + "/Operations/EditFPattern_Partial/?fpatternid=" + fpatternid_;
    $('#DialogHighlightEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_edit_mtapping(mtappingid_) {

    var partialview_link = serverpath + "/Operations/EditMatteTapping_Partial/?mtappingid=" + mtappingid_;
    $('#DialogMatteTappingEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_edit_stapping(stappingid_) {

    var partialview_link = serverpath + "/Operations/EditSlagTapping_Partial/?stappingid=" + stappingid_;
    $('#DialogSlagTappingEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_edit_spotapping(spotapid_) {

    var partialview_link = serverpath + "/Operations/EditSPOTapping/?spotapid=" + spotapid_;
    $('#DialogSPOTapEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//Dustline Inspections
function load_partial_edit_dustline_inspect(dustlineinspectid_) {

    var partialview_link = serverpath + "/Operations/EditDustline_Inspection_Partial/?dustlineinspectid=" + dustlineinspectid_;
    $('#DialogDustlineInspectEdit_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
 //End

function assign_fsfe_prodid() {
    var fsfe_prodid;
    fsfe_prodid = getFSFEProd_Id();
    fsfe_prodid = fsfe_prodid.substring(1, fsfe_prodid.length - 1);
    $('#fsfe_prod_id').val(fsfe_prodid);

}

function load_partial_fpattern() {

    var partialview_link = serverpath + "/Operations/NewFPattern_Partial";
    $('#DialogHighlight_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_fii() {

    var partialview_link = serverpath + "/Operations/NewFII_Partial";
    $('#DialogFII_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_dustline_inspections() {

    var partialview_link = serverpath + "/Operations/NewDustline_Inspections_Partial";
    $('#DialogDustline_Inspections_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

$('#fsfe_shiftdate_select').change(function () {

    assign_fsfe_prodid();

});

function load_fsfe_reg_crew() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $('#fsfe_regularcrew_table td').remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_RegularCrew/',

        data: { fsfe_ProdId: fsfe_prodid_ },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_regularcrew_table tr:last').after('<tr><td>' + value.Fullname + '</td><td>' + value.FSFE_RegularCrew_Special_Activity + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_regcrew(' + value.FSFE_RegularCrew_Id + ');return false;">X</a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_regcrew(' + value.FSFE_RegularCrew_Id + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

                //load_partial_edit_regcrew

            });

        }
    });
}

function delete_regcrew(regcrewid_) {

    var msg = "Do you want to delete this record?";

    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_RegCrew/',
            data: { fsfe_regcrewid: regcrewid_ },
            type: 'POST',
            cache: false,
            success: function (data) {

            }
        });

        alert('Record now deleted.');
        load_fsfe_reg_crew();
    }
}

function delete_mtapper(mtapper_id) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_Mtapper/',
            data: { fsfe_mtapperid: mtapper_id },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_mtapper();
    }
}

function delete_mtapping(mtapping_id) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_Mtapping/',
            data: { fsfe_mtappingid: mtapping_id },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_matte_tapping();
    }
}

function delete_stapping(stapping_id) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_Stapping/',
            data: { fsfe_stappingid: stapping_id },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_slag_tapping();
    }
}

function delete_spotap(spotapid_) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_SPOTap/',
            data: { spotapid: spotapid_ },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_spo();
    }
}

function delete_fpattern(fpattern_id_) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_FPattern/',
            data: { fpattern_id: fpattern_id_ },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_fpattern();
    }
}

//Delete Dustline Inspections
function delete_dustline_inspect(dustlineinspect_id_) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_FSFE_Dustline_Inspections/',
            data: { dustlineinspect_id: dustlineinspect_id_ },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_dustline_inspect();
    }
}

function delete_dsi(dsi_id_) {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

        $.ajax({
            url: serverpath + '/Operations/Delete_DSI/',
            data: { dsi_id: dsi_id_ },
            type: 'POST',
            cache: false,
            success: function (data) {
            }
        });

        alert('Record now deleted.');
        load_fsfe_dustline_inspect();
    }
}

function load_fsfe_mtapper() {

    var msg = "Do you want to delete this record?";
    var answer = confirm(msg);

    if (answer) {

    $.ajax({
            url: serverpath + '/Operations/Delete_DSI/',
            data: { dsi_id: dsi_id_ },
        type: 'POST',
        cache: false,
        success: function (data) {
            }
            });

        alert('Record now deleted.');
        load_fsfe_dustline_inspect();
        }
}


    
//    var fsfe_prodid_ = $('#fsfe_prod_id').val();

//    $('#fsfe_mattetapper_table td').remove();

//    $.ajax({
//        url: serverpath + '/Operations/FSFE_Load_MatteTapper/',

//        data: { fsfe_ProdId: fsfe_prodid_ },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            $.each(data, function (index, value) {

//                $('#fsfe_mattetapper_table tr:last').after('<tr><td>'
//                    + value.Tapper_Number + '</td><td>'
//                    + value.Fullname + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_mtapper('
//                    + value.FSFE_MatteTapperId + ');return false;">X</a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_mtapper('
//                    + value.FSFE_MatteTapperId + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

//            });

//        }
//    });
//}


//Tapping Activites
function load_fsfe_matte_tapping() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var i = 1;

    $('#fsfe_controlrm_mattetapper_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_MatteTapping/',

        data: { fsfe_ProdId: fsfe_prodid_ },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                //$('#fsfe_controlrm_mattetapper_table tr:last').after('<tr><td>'
                //    + i + '</td><td>' + formatDate(value.FSFE_Matte_StartDate) + '</td><td>'
                //    + formatDate(value.FSFE_Matte_EndDate) + '</td><td>'
                //    + value.Launder + '</td><td>'
                //    + value.Mtapper + '</td><td>'
                //    + value.FSFE_Matte_Temp + '</td><td>'
                //    + zerovalue(value.MatteVolume) + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_mtapping('
                //    + value.FSFE_MatteTapId + ');return false;"><u>Delete</u></a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_mtapping('
                //    + value.FSFE_MatteTapId + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

                $('#fsfe_controlrm_mattetapper_table tr:last').after('<tr><td>' + i + '</td><td>'
                    + formatDate(value.FSFE_Matte_CalledDate) + '</td><td>'
                    + formatDate(value.FSFE_Matte_StartDate) + '</td><td>'
                    + formatDate(value.FSFE_Matte_EndDate) + '</td><td>'
                    + value.Launder + '</td><td>'
                    + value.Mtapper + '</td><td>'
                    + zerovalue(value.MatteTemp) + '</td><td>'
                    + zerovalue(value.MatteVolume) + '</td><td>'
                    + value.FSFE_Matte_CFNo + '</td><td>'
                    + value.FSFE_Matte_SlagBlow + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_mtapping('
                    + value.FSFE_MatteTapId + ');return false;"><u>Delete</u></a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_mtapping('
                    + value.FSFE_MatteTapId + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

                i = i + 1;

            });

            //$('#launderno_ms').prop('disabled', true);

            //$('#launderno').multiselect({
            //    selectedText: '# of selected',
            //});
        }
    });
}

function load_fsfe_slag_tapping() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var i = 1;


    $('#fsfe_tapact_slagtap_table td').parent().remove();
    //$('#fsfe_tapact_slagtap_table td').remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_SlagTapping/',

        data: { fsfe_ProdId: fsfe_prodid_ },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_tapact_slagtap_table tr:last').after('<tr><td>'
                    + i + '</td><td>' + formatDate(value.SlagTap_ReadyTime) + '</td><td>' + formatDate(value.SlagTap_StartTime) + '</td><td>'
                    + formatDate(value.SlagTap_EndTime) + '</td><td>'
                    + value.Launder1 + ' - '
                    + value.Launder2 + '</td><td>'
                    + value.SlagTender1Name + ', ' + value.SlagTender2Name + '</td><td>'
                    + value.SlagPotNo + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_stapping('
                    + value.SlagTapId + ');return false;"><u>Delete</u></a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_stapping('
                    + value.SlagTapId + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

                i = i + 1;

            });
        }
    });
}


$('#add_regcrew_close_btn').live('click', function () {

    $('#DialogRegularCrew_Select').dialog('close');

});

$('#edit_regcrew_close_btn').live('click', function () {

    $('#DialogRegularCrewEdit_Select').dialog('close');

});

$('#edit_mtapper_close_btn').live('click', function () {

    $('#DialogMatteTapperEdit_Select').dialog('close');

});

$('#add_mtapping_close_btn').live('click', function () {

    $('#DialogMatteTapping_Select').dialog('close');

});

$('#edit_mtapping_close_btn').live('click', function () {

    $('#DialogMatteTappingEdit_Select').dialog('close');

});

$('#edit_stapping_close_btn').live('click', function () {

    $('#DialogSlagTappingEdit_Select').dialog('close');

});

$('#add_stapping_close_btn').live('click', function () {

    $('#DialogSlagTapping_Select').dialog('close');

});


//$('#add_spotap_close_btn').live('click', function () {

//    $('#DialogSPOTap_Select').dialog('close');

//});

//$('#edit_spotap_close_btn').live('click', function () {

//    $('#DialogSPOTapEdit_Select').dialog('close');

//});

//matte tapping
$("#DialogMatteTapping_Select #add_launder1").live('keyup', function (e) {

    var launder1 = $("#DialogMatteTapping_Select #add_launder1").val();


    if (e.keyCode == 9) { }

    else if (!$.isNumeric(launder1)) {

        alert('Numbers only.');
        $("#DialogMatteTapping_Select #add_launder1").val('');

    } else {
        $("#DialogMatteTapping_Select #add_launder2").val(parseInt(launder1) + 1);
        load_assign_launder("#DialogMatteTapping_Select");
    }
});

//Matte Tapper
$("#DialogMatteTappingEdit_Select #add_launder1").live('keyup', function () {

    var launder1 = $("#DialogMatteTappingEdit_Select #add_launder1").val();

    if (!$.isNumeric(launder1)) {
        alert('Numbers only.');
        $("#DialogMatteTappingEdit_Select #add_launder1").val('');

    } else {
        $("#DialogMatteTappingEdit_Select #add_launder2").val(parseInt(launder1) + 1);
        load_assign_launder("#DialogMatteTappingEdit_Select");
    }
});

//$("#DialogSlagTapping_Select #add_slag_laddlepit").live('keyup', function (e) {

//    var pitnum = $("#DialogSlagTapping_Select #add_slag_laddlepit").val();
//    if (e.keyCode == 9) { }

//    else if (!$.isNumeric(pitnum)) {

//        alert('Numbers only.');
//        $("#DialogSlagTapping_Select #add_slag_laddlepit").val('');

//    } else if (parseInt(pitnum) >= 3) {
//        alert('1 or 2 only.');
//        $("#DialogSlagTapping_Select #add_slag_laddlepit").val('');
//        $("#DialogSlagTapping_Select #stender_emp").text('');
    
//    }

//    else {
//        $("#DialogSlagTapping_Select #stender_emp").val("ok");
//        load_assign_slagtender("#DialogSlagTapping_Select", parseInt(pitnum) + 8);
//    }
//});

//slag tapping
$("#DialogSlagTapping_Select #add_slag_laddlepit").live('keyup', function (e) {

    var pitnum = $("#DialogSlagTapping_Select #add_slag_laddlepit").val();
    if (e.keyCode == 9) { }

    else if (!$.isNumeric(pitnum)) {

        alert('Numbers only.');
        $("#DialogSlagTapping_Select #add_slag_laddlepit").val('');

        //} else if (parseInt(pitnum) >= 3) {
        //    alert('1 or 2 only.');
        //    $("#DialogSlagTapping_Select #add_slag_laddlepit").val('');
        //    $("#DialogSlagTapping_Select #stender_emp").text('');

    }

    else {
        $("#DialogSlagTapping_Select #add_slag_laddlepit2").val(parseInt(pitnum) + 1);
        load_assign_slagtender("#DialogSlagTapping_Select");
    }
});

//slag edit 
$("#DialogSlagTappingEdit_Select #add_slag_laddlepit").live('keyup', function () {

    var pitnum = $("#DialogSlagTappingEdit_Select #add_slag_laddlepit").val();
    //if (e.keyCode == 9) { }

    if (!$.isNumeric(pitnum)) {
        alert('Numbers only.');
        $("#DialogSlagTappingEdit_Select #add_slag_laddlepit").val('');

    //} else if (parseInt(pitnum) >= 3) {
    //    alert('1 or 2 only.');
    //    $("#DialogSlagTappingEdit_Select #add_slag_laddlepit").val('');
    //    $("#DialogSlagTappingEdit_Select #stender_emp").text('');

    }

    else {
        $("#DialogSlagTappingEdit_Select #add_slag_laddlepit2").val(parseInt(pitnum) + 1);
        load_assign_slagtender("#DialogSlagTappingEdit_Select");
    }
});




$("#DialogMatteTappingEdit_Select #add_launder1").live('keyup', function () {

    var launder1 = $("#DialogMatteTappingEdit_Select #add_launder1").val();

    if (!$.isNumeric(launder1)) {
        alert('Numbers only.');
        $("#DialogMatteTappingEdit_Select #add_launder1").val('');

    } else {
        $("#DialogMatteTappingEdit_Select #add_launder2").val(parseInt(launder1) + 1);
        load_assign_launder("#DialogMatteTappingEdit_Select");
    }
});

function load_assign_launder(dialogname) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var launder1_ = $(dialogname + " #add_launder1").val();
    var launder2_ = $(dialogname + " #add_launder2").val();

    $.ajax({
        url: serverpath + '/Operations/Select_Launder_Tapper/',

        data: {
            fsfe_ProdId: fsfe_prodid_,
            launder1: launder1_,
            launder2: launder2_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $(dialogname + ' #mttaper1_emp').text('Not assigned.');
            $(dialogname + ' #mttaper2_emp').text('Not assigned.');
            $(dialogname + ' #mttaper1_empid').text(0);
            $(dialogname + ' #mttaper2_empid').text(0);

            $.each(data, function (index, value) {

                if (value.Tapper_Number == launder1_) {

                    $(dialogname + ' #mttaper1_emp').text(value.Fullname);

                } else if (value.Tapper_Number == launder2_) {

                    $(dialogname + ' #mttaper2_emp').text(value.Fullname);
                }

                if (launder1_ == 1 && value.FSFE_Role_Type_Id == 6) {
                    $(dialogname + ' #mttaper1_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper1_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 1 && value.FSFE_Role_Type_Id == 7) {
                    $(dialogname + ' #mttaper2_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper2_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 2 && value.FSFE_Role_Type_Id == 7) {
                    $(dialogname + ' #mttaper1_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper1_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 2 && value.FSFE_Role_Type_Id == 8) {
                    $(dialogname + ' #mttaper2_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper2_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 3 && value.FSFE_Role_Type_Id == 8) {
                    $(dialogname + ' #mttaper1_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper1_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 3 && value.FSFE_Role_Type_Id == 9) {
                    $(dialogname + ' #mttaper2_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper2_empid').text(value.FSFE_Onboard_Employee_Id);
                } else if (launder1_ == 4 && value.FSFE_Role_Type_Id == 9) {
                    $(dialogname + ' #mttaper1_emp').text(value.Fullname);
                    $(dialogname + ' #mttaper1_empid').text(value.FSFE_Onboard_Employee_Id);
                }


            });

        }
    });
}

//function load_assign_slagtender(dialogname, roletypeid) {

//    var fsfe_prodid_ = $('#fsfe_prod_id').val();
   
//    $.ajax({
//        url: serverpath + '/Operations/Select_Slag_Tender/',

//        data: {
//            fsfe_ProdId: fsfe_prodid_,
//            roletypeid: roletypeid
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            $(dialogname + ' #stender_emp').text('Not Assigned Yet.');

//            $.each(data, function (index, value) {

//                $(dialogname + ' #stender_emp').text(value.Fullname);

//            });

//        }
//    });
//}
function load_assign_slagtender(dialogname) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    var slagtender1_ = $(dialogname + " #add_slag_laddlepit").val();
    var slagtender2_ = $(dialogname + " #add_slag_laddlepit2").val();


    $.ajax({
        url: serverpath + '/Operations/Select_Slag_Tender/',

        data: {
            fsfe_prodId: fsfe_prodid_,
            //roletypeid: roletypeid,
            slagtender1: slagtender1_,
            slagtender2: slagtender2_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $(dialogname + ' #stender_emp').text('Not assigned.');
            $(dialogname + ' #stender_emp2').text('Not assigned.');
            $(dialogname + ' #stender_emp_id').text(0);
            $(dialogname + ' #stender_emp2_id').text(0);

            $.each(data, function (index, value) {

                if (slagtender1_ == 1 && value.FSFE_Role_Type_Id == 10) {
                    $(dialogname + ' #stender_emp').text(value.Fullname);
                    $(dialogname + ' #stender_emp_id').text(value.FSFE_Onboard_Employee_Id);
                } else if (slagtender1_ == 1 && value.FSFE_Role_Type_Id == 11) {
                    $(dialogname + ' #stender_emp2').text(value.Fullname);
                    $(dialogname + ' #stender_emp2_id').text(value.FSFE_Onboard_Employee_Id);
                } else if (slagtender1_ == 2 && value.FSFE_Role_Type_Id == 11) {
                    $(dialogname + ' #stender_emp').text(value.Fullname);
                    $(dialogname + ' #stender_emp_id').text(value.FSFE_Onboard_Employee_Id);
                } else if (slagtender1_ == 2 && value.FSFE_Role_Type_Id == 12) {
                    $(dialogname + ' #stender_emp2').text(value.Fullname);
                    $(dialogname + ' #stender_emp2_id').text(value.FSFE_Onboard_Employee_Id);
                } else if (slagtender1_ == 3 && value.FSFE_Role_Type_Id == 12) {
                    $(dialogname + ' #stender_emp').text(value.Fullname);
                    $(dialogname + ' #stender_emp_id').text(value.FSFE_Onboard_Employee_Id);
                }



            });

        }
    });
}


function Mtapping_add() {

    var sdate = new Date($('#start_date_input').val());
    var shr = $('#start_time_hr_input').val();
    var smin = $('#start_time_min_input').val();

    var edate = new Date($('#end_date_input').val());
    var ehr = $('#end_time_hr_input').val();
    var emin = $('#end_time_min_input').val();


    //mtapping_check("#DialogMatteTapping_Select", sdate, shr, smin, edate, ehr, emin, 'add');

    //for called date and time..
    var cdate = new Date($('#called_date').val());
    var chr = $('#start_time_calledhr_input').val();
    var cmin = $('#start_time_calledmin_input').val();


    mtapping_check("#DialogMatteTapping_Select", sdate, shr, smin, edate, ehr, emin, cdate, chr, cmin, 'add');

}

function Stapping_add() {

    var sdate = new Date($('#slag_start_date_input').val());
    var shr = $('#start_time_hr_input_stap').val();
    var smin = $('#start_time_min_input_stap').val();

    var edate = new Date($('#slag_end_date_input').val());
    var ehr = $('#end_time_hr_input_stap').val();
    var emin = $('#end_time_min_input_stap').val();


    //for ready date and time..
    var rdate = new Date($('#ready_date').val());
    var rhr = $('#start_time_readyhr_input').val();
    var rmin = $('#start_time_readymin_input').val();

    stapping_check("#DialogSlagTapping_Select", sdate, shr, smin, edate, ehr, emin, rdate, rhr, rmin, 'add');

}

function mtapping_check(dialogname, sdate, shr, smin, edate, ehr, emin, cdate, chr, cmin, mode) {

    var launder1_ = $(dialogname + " #add_launder1").val();
    var launder2_ = $(dialogname + " #add_launder2").val();

    var checktime;


    sdate = sdate.add({
        minutes: smin,
        hours: shr
    });

    edate = edate.add({
        minutes: emin,
        hours: ehr
    });

    //for called date and time
    cdate = cdate.add({
        minute: cmin,
        hours: chr
    });


    var sdate_ = sdate.toString("ddd, dd MMM yyyy H:mm:ss ");
    var edate_ = edate.toString("ddd, dd MMM yyyy H:mm:ss ");

    var cdate_ = cdate.toString("ddd, dd MMM yyyy H:mm:ss ");


    if (edate < sdate) { checktime = false; }
    else { checktime = true; }

    if (checktime == true && launder1_ != '' && launder2_ != '') {

        if (mode == 'add') {

            save_mtapping(dialogname, sdate_, edate_, cdate_);

        } else if (mode == 'edit') {
            edit_mtapping(dialogname, sdate_, edate_, cdate_);
        }

    } else {
        alert('Please answer correctly all fields: Start time should be less than End time.  / Key in "0" when Launder not in use.');
    }

}


function stapping_check(dialogname, sdate, shr, smin, edate, ehr, emin, rdate, rhr, rmin, mode) {

    //var slagtemp_ = $(dialogname + " #add_slagtemp").val();
    //var slagladdlepit_ = $(dialogname + " #add_slag_laddlepit").val();

    var launder1_ = $(dialogname + " #add_slag_laddlepit").val();
    var launder2_ = $(dialogname + " #add_slag_laddlepit2").val();
    //var slagtender1_ = $(dialogname + "#stender_emp").val();
    //var slagtender2_ = $(dialogname + "#stender_emp2").val();

    var checktime;

    sdate = sdate.add({
        minutes: smin,
        hours: shr
    });

    edate = edate.add({
        minutes: emin,
        hours: ehr
    });

    //for ready date and time
    rdate_ = rdate.add({
        minute: rmin,
        hours: rhr
    });


    var sdate_ = sdate.toString("ddd, dd MMM yyyy H:mm:ss ");
    var edate_ = edate.toString("ddd, dd MMM yyyy H:mm:ss ");

    var rdate_ = rdate.toString("ddd, dd MMM yyyy H:mm:ss ");

    if (edate < sdate) { checktime = false; }
    else { checktime = true; }


    if (checktime == true && launder1_ != '' && launder2_ != '') {

        if (mode == 'add') {

            save_stapping(sdate_, edate_, rdate_);

        } else if (mode == 'edit') {

            edit_stapping("#DialogSlagTappingEdit_Select", sdate_, edate_, rdate_);
        }

    } else {
        alert('Please answer correctly all fields: Start time should be less than End time. / Key in "0" when Launder not in use.');
    }

}

function spotap_change(mode, textarea) {

    var validate = $('.validation_flag').text();

    if ((validate == 1 || validate == 11)) {
        if (mode == 'add') { save_spotap(); }
        else if (mode == 'edit') { edit_spotap(); }

    } else if (validate == '') {
        if (mode == 'add') { $('#DialogSPOTap_Select').dialog('close'); }
        else if (mode == 'edit') { $('#DialogSPOTapEdit_Select').dialog('close'); }
    }

    else {
        if ($(textarea).val() == '') {

            $(textarea).css({ "background-color": "#FFC4C4" });
            alert('You need to fill in some comments.');
        } else {
            if (mode == 'add') { save_spotap(); }
            else if (mode == 'edit') { edit_spotap(); }
        }
    }

}

function Mtapping_edit() {

    var sdate = new Date($('#start_date_input_mtapedit').val());
    var shr = $('#start_time_hr_input_mtapedit').val();
    var smin = $('#start_time_min_input_mtapedit').val();

    var edate = new Date($('#end_date_input_mtapedit').val());
    var ehr = $('#end_time_hr_input_mtapedit').val();
    var emin = $('#end_time_min_input_mtapedit').val();

    //for called date and time..
    var cdate = new Date($('#DialogMatteTappingEdit_Select #called_date').val());
    var chr = $('#DialogMatteTappingEdit_Select #start_time_calledhr_input').val();
    var cmin = $('#DialogMatteTappingEdit_Select #start_time_calledmin_input').val();


    mtapping_check("#DialogMatteTappingEdit_Select", sdate, shr, smin, edate, ehr, emin, cdate, chr, cmin, 'edit');

}


function Stapping_edit() {

    var sdate = new Date($('#start_date_input_stapedit').val());
    var shr = $('#start_time_hr_input_stapedit').val();
    var smin = $('#start_time_min_input_stapedit').val();

    var edate = new Date($('#end_date_input_stapedit').val());
    var ehr = $('#end_time_hr_input_stapedit').val();
    var emin = $('#end_time_min_input_stapedit').val();

    //for ready date and time..
    var rdate = new Date($('#DialogSlagTappingEdit_Select #ready_date').val());
    var rhr = $('#DialogSlagTappingEdit_Select #start_time_readyhr_input').val();
    var rmin = $('#DialogSlagTappingEdit_Select #start_time_readymin_input').val();

    stapping_check("#DialogSlagTappingEdit_Select", sdate, shr, smin, edate, ehr, emin, rdate, rhr, rmin, 'edit');

        }


//saving matte tapping
function save_mtapping(dialogname, start_date_tap, end_date_tap, cdate) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var launder1_ = $(dialogname + " #add_launder1").val();
    var launder2_ = $(dialogname + " #add_launder2").val();
    var mattetemp_ = $(dialogname + " #add_mattetemp").val();
    var mattevol_ = $(dialogname + " #add_mattevolume").val();
    var matteslagblow_ = $(dialogname + " #add1_slagblow").val();
    var mattecfno_ = $(dialogname + " #add1_cfno").val();
    var mtapper1 = $(dialogname + " #mttaper1_empid").text();
    var mtapper2 = $(dialogname + " #mttaper2_empid").text();


    //var cdate_ = $("#called_date").val();

    //} else if (mode == 'edit') {
    //    edit_mtapping(dialogname, sdate_, edate_);
    //}

    if (mtapper1 != '') {

        save_mtapper_crew(fsfe_prodid_, launder1_, mtapper1);
    }

    if (mtapper2 != '') {
        save_mtapper_crew(fsfe_prodid_, launder2_, mtapper2);
    }



    if (mattetemp_ == "") {
        mattetemp_ = 0;
    }

    if (mattevol_ == "") {
        mattevol_ = 0;
    }

    $.ajax({
        url: serverpath + '/Operations/Add_Mtapping/',
        data: {
            fsfe_prodid: fsfe_prodid_,
            tapping_startdate: start_date_tap,
            tapping_enddate: end_date_tap,
            tapping_called: cdate,
            launder1: launder1_,
            launder2: launder2_,
            MatteTemp: mattetemp_,
            MatteVol: mattevol_,
            MatteSlagBlow: matteslagblow_,
            MatteCFNo: mattecfno_
        },
        type: 'POST',
        cache: false,
        success: function (data) {



            alert('Matte Tapping now added.');
            $('#DialogMatteTapping_Select').dialog('close');

            load_fsfe_matte_tapping();

        }
    });
}

//function save_stapping(start_date_tap, end_date_tap) {

//    var fsfe_prodid_ = $('#fsfe_prod_id').val();
//    var laddlepitnum_ = $("#add_slag_laddlepit").val();
//    //var slagtemp_ = $("#add_slagtemp").val();

//    //if (slagtemp_ == "") {
        
//    //    slagtemp_ = 0;
//    //}


//    $.ajax({
//        url: serverpath + '/Operations/Add_Stapping/',
//        data: {
//            fsfe_prodid: fsfe_prodid_,
//            stapping_startdate: start_date_tap,
//            stapping_enddate: end_date_tap,
//            laddlepitnum: laddlepitnum_,
//            //SlagTemp: slagtemp_
//        },
//        type: 'POST',
//        cache: false,
//        success: function (data) {

//                alert('Slag Tapping now added.');
//                $('#DialogSlagTapping_Select').dialog('close');

//                load_fsfe_slag_tapping();
           
//        }
//    });
//}
function save_stapping(start_date_tap, end_date_tap, rdate) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    //var laddlepitnum_ = $("#add_slag_laddlepit" + "#add_slag_laddlepit2").val();
    var launder1_ = $("#add_slag_laddlepit").val();
    var launder2_ = $("#add_slag_laddlepit2").val();
    var slagpotno = $('#add_slogpotno').val();
    var slagtender1_ = $('#DialogSlagTapping_Select #stender_emp_id').text();
    var slagtender2_ = $('#DialogSlagTapping_Select #stender_emp2_id').text();
    //var slagtender1_ = $("#stender_emp").val();
    //var slagtender2_ = $("#stender_emp2").val();
    //var slagtender1_ = $(dialogname + " #add_slag_laddlepit").val
    //var slagtender1_ = $(dialogname + " #add_slag_laddlepit2").val();
    //var slagtemp_ = $("#add_slagtemp").val();

    //if (slagtemp_ == "") {

    //    slagtemp_ = 0;
    //}


    $.ajax({
        url: serverpath + '/Operations/Add_Stapping/',
        data: {
            fsfe_prodid: fsfe_prodid_,
            stapping_readytime: rdate,
            stapping_startdate: start_date_tap,
            stapping_enddate: end_date_tap,
            launder1: launder1_,
            launder2: launder2_,
            slagpotno: slagpotno,
            slagtender1: slagtender1_,
            slagtender2: slagtender2_

        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Slag Tapping now added.');
            $('#DialogSlagTapping_Select').dialog('close');

            load_fsfe_slag_tapping();

        }
    });
}

function save_hlight() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var highl_ = $("#txtarea_fsfe_highlights").val();
    var turnover_ = $("#txtarea_fsfe_turnover").val();

    $.ajax({
        url: serverpath + '/Operations/Add_FSFE_Highlights/',
        data: {
            fsfe_prodid: fsfe_prodid_,
            highl: highl_,
            turnover: turnover_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('FSFE Highlights now added.');
        }
    });
}




function save_fdopt(paramgroupid, interface_name) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_params_ = generate_params();


    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Checklist_Save/',
        data: {
            fsfe_prodid: fsfe_prodid_,
            fsfe_paramgroupid: paramgroupid,
            fsfe_params: fsfe_params_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Data for ' + interface_name + ' now added.');

        }
    });
}

function save_spotap() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var sdate = new Date($('#start_date_input').val());
    var shr = $('#start_time_hr_input').val();
    var smin = $('#start_time_min_input').val();

    sdate = sdate.add({
        minutes: smin,
        hours: shr
    });

    var sdate_ = sdate.toString("ddd, dd MMM yyyy h:mm:ss ");

    var h1_ = $('#spotap_h1_input').val();
    var h2_ = $('#spotap_h2_input').val();
    var scumlevel_ = $('#scumlvl_input').val();
    var slagtemp_ = $('#slagtemp_input').val();
    var spotap_comment_ = $('#txtarea_spotap').val();

    $.ajax({
        url: serverpath + '/Operations/Add_FSFE_SPOTap/',
        data: {
            fsfe_prodid: fsfe_prodid_,
            matteslagdate: sdate_,
            h1: h1_,
            h2: h2_,
            scum_lvl: scumlevel_,
            slag_temp: slagtemp_,
            spotap_comment: spotap_comment_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('SPO Tapping now added.');
            $('.validation_flag').empty();
            $('#DialogSPOTap_Select').dialog('close');

            load_fsfe_spo();
        }
    });
}

function edit_spotap() {

    var sdate = new Date($('#start_date_input_mtapedit').val());
    var shr = $('#start_time_hr_input_mtapedit').val();
    var smin = $('#start_time_min_input_mtapedit').val();

    sdate = sdate.add({
        minutes: smin,
        hours: shr
    });

    var spotapping_id_ = $('#spotapping_id').text();

    var sdate_ = sdate.toString("ddd, dd MMM yyyy h:mm:ss ");

    var h1_ = $('#edit_spotap_h1_input').val();
    var h2_ = $('#edit_spotap_h2_input').val();
    var scumlevel_ = $('#edit_scumlvl_input').val();
    var slagtemp_ = $('#edit_slagtemp_input').val();
    var spotap_comment_ = $('#edit_txtarea_spotap').val();


    $.ajax({
        url: serverpath + '/Operations/Edit_FSFE_SPOTap/',
        data: {
            fsfe_spotap_matteslag: spotapping_id_,
            matteslagdate: sdate_,
            h1: h1_,
            h2: h2_,
            scum_lvl: scumlevel_,
            slag_temp: slagtemp_,
            spotap_comment: spotap_comment_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('SPO Tapping now edited.');
            $('.validation_flag').empty();
            $('#DialogSPOTapEdit_Select').dialog('close');

            load_fsfe_spo();
        }
    });
}


//Edit Matte Tapping
function edit_mtapping(dialogname, start_date_tap, end_date_tap,cdate) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_matte_tapping_id = $('#mtapping_id').text();
    var launder1_ = $(dialogname + " #add_launder1").val();
    var launder2_ = $(dialogname + " #add_launder2").val();
    var mattetemp_ = $(dialogname + " #add_mattetemp").val();
    var mattevol_ = $(dialogname + " #add_mattevolume").val();
    var matteslagblow_ = $(dialogname + " #add_slagblow").val();
    var mattecfno_ = $(dialogname + " #add_cfno").val();
    var mtapper1 = $(dialogname + " #mttaper1_empid").text();
    var mtapper2 = $(dialogname + " #mttaper2_empid").text();
    

    if (mtapper1 != '') {

        save_mtapper_crew(fsfe_prodid_, launder1_, mtapper1);
    }

    if (mtapper2 != '') {
        save_mtapper_crew(fsfe_prodid_, launder2_, mtapper2);
    }




    if (mattetemp_ == "") {
        mattetemp_ = 0;
    }
    if (mattevol_ == "") {
        mattevol_ = 0;
    }

    //$.ajax({
    //    url: serverpath + '/Operations/Edit_Mtapping/',
    //    data: {
    //        fsfe_matte_tapid: fsfe_matte_tapping_id,
    //        tapping_startdate: start_date_tap,
    //        tapping_enddate: end_date_tap,
    //        launder1: launder1_,
    //        launder2: launder2_,
    //        matte_temp: mattetemp_,
    //        matte_vol: mattevol_
    //    },
    //    type: 'POST',
    //    cache: false,
    //    success: function (data) {

    //        alert('Matte Tapping now edited.');
    //        $('#DialogMatteTappingEdit_Select').dialog('close');

    //        load_fsfe_matte_tapping();

    $.ajax({
        url: serverpath + '/Operations/Edit_Mtapping/',
        data: {
            fsfe_matte_tapid: fsfe_matte_tapping_id,
            tapping_called: cdate,
            tapping_startdate: start_date_tap,
            tapping_enddate: end_date_tap,
            launder1: launder1_,
            launder2: launder2_,
            matte_temp: mattetemp_,
            matte_vol: mattevol_,
            MatteSlagBlow: matteslagblow_,
            MatteCFNo: mattecfno_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Matte Tapping now edited.');
            $('#DialogMatteTappingEdit_Select').dialog('close');

            load_fsfe_matte_tapping();
           
        }
    });
}

function edit_stapping(dialogname, start_date_tap, end_date_tap, rdate) {

    var fsfe_slag_tapping_id = $('#stapping_id').text();
    var launder1_ = $("#add_slag_laddlepit").val();
    var launder2_ = $("#add_slag_laddlepit2").val();
    var slogpotno = $('#edit_slogpotno').val();
    var slagtender1_ = $(dialogname +' #stender_emp_id').text();
    var slagtender2_ = $(dialogname +' #stender_emp2_id').text();
    //var laddlepitnum_ = $(dialogname + " #add_slag_laddlepit").val();
    //var slagtemp_ = $(dialogname + " #add_slagtemp").val();

    //if (slagtemp_ == "") {

    //    slagtemp_ = 0;
    //}


    $.ajax({
        url: serverpath + '/Operations/Edit_Stapping/',
        data: {
            fsfe_slagtapid: fsfe_slag_tapping_id,
            stapping_readytime: rdate,
            stapping_startdate: start_date_tap,
            stapping_enddate: end_date_tap,
            launder1: launder1_,
            launder2: launder2_,
            slogpotno: slogpotno,
            slagtender1: slagtender1_,
            slagtender2: slagtender2_

            //laddlepitnum: laddlepitnum_,
            //slag_temp: slagtemp_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Slag Tapping now edited.');
            $('#DialogSlagTappingEdit_Select').dialog('close');

            load_fsfe_slag_tapping();

        }
    });
}

function load_fsfe_spo() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $('#fsfe_spotap_table td').remove();
    // $('#fsfe_spotap_table .tr_cycle_select').remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_SPOTap/',

        data: { fsfe_ProdId: fsfe_prodid_ },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_spotap_table tr:last').after('<tr><td>' + formatDate(value.MatteSlagDate) + '</td><td>' + value.H1 + '</td><td>' + value.H2 + '</td><td>' + value.ScumLevel + '</td><td>' + value.MatteLevel + '</td><td>' + value.SlagLevel + '</td><td>' + value.Temperature + '</td><td>' + value.SPOTap_Comment + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_spotap(' + value.FSFE_MatteSlagId + ');return false;">X</a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_spotapping(' + value.FSFE_MatteSlagId + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');



            });

        }
    });
}

$("#spotap_h1_input").live('keyup', function () {

    var valcheck = $('#spotap_h1_input').val();
    spo_tap_computer(valcheck, '#spotap_h1_input');

});


$("#spotap_h2_input").live('keyup', function () {

    var valcheck = $('#spotap_h2_input').val();
    spo_tap_computer(valcheck, '#spotap_h2_input');

});

$("#scumlvl_input").live('keyup', function () {

    var valcheck = $('#scumlvl_input').val();
    spo_tap_computer(valcheck, '#scumlvl_input');

});

$("#slagtemp_input").live('keyup', function () {

    var valcheck = $('#slagtemp_input').val();
    spo_tap_computer(valcheck, '#slagtemp_input');

});

//

$("#edit_spotap_h1_input").live('keyup', function () {

    var valcheck = $('#edit_spotap_h1_input').val();
    spo_tap_computer_edit(valcheck, '#edit_spotap_h1_input');

});


$("#edit_spotap_h2_input").live('keyup', function () {

    var valcheck = $('#edit_spotap_h2_input').val();
    spo_tap_computer_edit(valcheck, '#edit_spotap_h2_input');

});

$("#edit_scumlvl_input").live('keyup', function () {

    var valcheck = $('#edit_scumlvl_input').val();
    spo_tap_computer_edit(valcheck, '#edit_scumlvl_input');

});

$("#edit_slagtemp_input").live('keyup', function () {

    var valcheck = $('#edit_slagtemp_input').val();
    spo_tap_computer_edit(valcheck, '#edit_slagtemp_input');

});

$("#edit_txtarea_spotap").live('keyup', function () {

    var valcheck = $('#edit_slagtemp_input').val();
    spo_tap_computer_edit(valcheck, '#edit_slagtemp_input');

});

$("#txtarea_spotap").live('keyup', function () {

    var valcheck = $('#slagtemp_input').val();
    spo_tap_computer(valcheck, '#slagtemp_input');

});


function spo_tap_computer(valcheck, change_keyup) {

    var mattelevel;
    var slaglevel;

    var h1 = $('#spotap_h1_input').val();
    var h2 = $('#spotap_h2_input').val();
    var scumlevel = $('#scumlvl_input').val();
    var slagtemp = $('#slagtemp_input').val();


    if (h1 == '') { h1 = 0; }
    if (h2 == '') { h2 = 0; }
    if (scumlevel == '') { scumlevel = 0; }

    h1 = parseFloat(h1);
    h2 = parseFloat(h2);
    scumlevel = parseFloat(scumlevel);

    mattelevel = 308 - h2;
    slaglevel = h2 - h1 - scumlevel;

    if (!$.isNumeric(valcheck)) {

        if (valcheck == '') { } else {
            alert('Numbers only.');
            $(change_keyup).val('');
        }

    } else {
        $('#spotap_mattelvl_input').text(mattelevel + ' cm');
        $('#spotap_slaglvl_input').text(slaglevel + ' cm');

        spotap_validationmsg(scumlevel, mattelevel, slaglevel, slagtemp);
    }

}

function spo_tap_computer_edit(valcheck, change_keyup) {

    var mattelevel;
    var slaglevel;

    var h1 = $('#edit_spotap_h1_input').val();
    var h2 = $('#edit_spotap_h2_input').val();
    var scumlevel = $('#edit_scumlvl_input').val();
    var slagtemp = $('#edit_slagtemp_input').val();


    if (h1 == '') { h1 = 0; }
    if (h2 == '') { h2 = 0; }
    if (scumlevel == '') { scumlevel = 0; }

    h1 = parseFloat(h1);
    h2 = parseFloat(h2);
    scumlevel = parseFloat(scumlevel);

    mattelevel = 308 - h2;
    slaglevel = h2 - h1 - scumlevel;

    if (!$.isNumeric(valcheck)) {

        if (valcheck == '') { } else {
            alert('Numbers only.');
            $(change_keyup).val('');
        }

    } else {
        $('#spotap_mattelvl_input').text(mattelevel + ' cm');
        $('#spotap_slaglvl_input').text(slaglevel + ' cm');

        spotap_validationmsg(scumlevel, mattelevel, slaglevel, slagtemp);
    }

}




function spotap_validationmsg(scumlevel, mattelevel, slaglevel, slagtemp) {

    var themsg = '';

    $('.validation_msg_spotap').empty();


    if (slaglevel > 20 && slaglevel < 80) {
    } else { themsg = '- Slag level is <b>' + slaglevel + ' cm</b>, it is out of range.<br/>'; }

    if (mattelevel > 50 && mattelevel < 100) {
    } else { themsg = themsg + '- Matte level is <b>' + mattelevel + ' cm</b>, it is out of range.<br/>'; }

    if (scumlevel > 2 && scumlevel < 30) {
    } else { themsg = themsg + '- Scum level is <b>' + scumlevel + ' cm</b>, it is out of range.<br/>'; }

    if (slagtemp > 1100 && slagtemp < 1400) {
    } else { themsg = themsg + '- Slag Temp is <b>' + slagtemp + ' degC</b>, it is out of range.<br/>'; }

    if (themsg == '') {
        themsg = 'All Data are on Range!';
        $('.validation_msg_div').css({ "background-color": "" });
        $('.validation_msg_div').css({ "color": "" });
        $('.validation_msg_div').css({ "background-color": "#FFFFFF" });
        $('.validation_msg_div').css({ "color": "#00AA55" });
        $('.validation_flag').empty();
        $('.validation_flag').text(1);

    } else {
        themsg = '<b>WARNING!</b><br/><br/>' + themsg;
        $('.validation_msg_div').css({ "background-color": "" });
        $('.validation_msg_div').css({ "color": "" });
        $('.validation_msg_div').css({ "background-color": "#FFFFCC" });
        $('.validation_msg_div').css({ "color": "#FF0000" });
        $('.validation_flag').empty();
        $('.validation_flag').text(0);
    }

    $('.validation_msg_spotap').html(themsg);
}

function load_fsfe_checklist(paramgroupid) {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var paramgroupid_ = paramgroupid;

    uncheck_all();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Checklist/',

        data: {
            fsfe_ProdId: fsfe_prodid_,
            fsfe_paramgroupid: paramgroupid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#cbox_' + value.FSFE_Param_Id).prop("checked", true);

            });
        }
    });
}

function load_fsfe_hlight() {
    clear_fsfe();

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Highlights/',

        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.FSFE_Param_Id == 135) {

                    $('#txtarea_fsfe_highlights').val(value.FSFE_KPI_Comment);

                } else if (value.FSFE_Param_Id == 136) {
                    $('#txtarea_fsfe_turnover').val(value.FSFE_KPI_Comment);
                }

            });
        }
    });
}

function uncheck_all() {
    var i = $("#fsfe_shift_div input:checkbox");

    i.each(function () {
        $(this).prop("checked", false);
    });

}

function generate_params() {

    var i = $("#fsfe_shift_div input:checkbox");

    var cbox_id;
    var params = '';

    i.each(function () {

        if ($(this).is(":checked")) {
            cbox_id = $(this).attr('id');
            cbox_id = cbox_id.substring(5);

            cbox_id = ', ' + cbox_id;

            params = cbox_id + params;

        }
    });
    params = params.substring(2);

    return params;

}



function save_fpattern() {
    var data = new FormData();

    var files = $("#fileUpload").get(0).files;

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_remarks_ = $('#add_fpattern_txtarea').val();

    var fsfe_paramid = 137;

    var fsfe_mode_ = 'FPattern';

    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }

    var ajaxRequest = $.ajax({
        type: 'POST',
        url: serverpath + '/api/fileupload/uploadfile?fsfe_prodid=' + fsfe_prodid_ + '&fsfe_paramid=' + fsfe_paramid + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {

    });
    alert('Flame Pattern now Added.');
    $('#DialogHighlight_Select').dialog('close');
    load_fsfe_fpattern();
}

//fii
function save_fii() {
    var data = new FormData();

    var files = $("#fileUploadFII").get(0).files;

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    var fsfe_remarks_ = $('#add_fii_txtarea').val();

    var fsfe_paramid = $('#fsfefii_spot_ddl').val();

    var fsfe_mode_ = 'FII';

    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }

    var ajaxRequest = $.ajax({
        type: 'POST',
        url: serverpath + '/api/fileupload/UploadFileFII?fsfe_prod_id=' + fsfe_prodid_ + '&fsfe_paramid=' + fsfe_paramid + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {

    });
    alert('FII Inspection now Added.');
    $('#DialogFII_Select').dialog('close');
    load_fsfe_fii();
}


$('#edit_fpattern_btn').live('click', function () {

    edit_fpattern();

});

$('#edit_dustline_insp_btn').live('click', function () {

    edit_dustline_inspect();
});

function load_fsfe_fpattern() {

    var fsfe_prodid_ = $('#fsfe_prod_id').val();


    $('#fsfe_flamepattern_table td').remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Fpattern/',

        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {


                $('#fsfe_flamepattern_table tr:last').after('<tr><td>'
                    + html_img_fpattern(value.FSFE_ProdId, value.ImagePath)
                    + '</td><td>' + value.Remark + '<td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_fpattern('
                    + value.FSFE_FPatternFII_Id + ');return false;"><u>Delete</u></a>&nbsp;</td><td>&nbsp;<a class="" href="#" onclick="load_partial_edit_fpattern('
                    + value.FSFE_FPatternFII_Id + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

            });
        }
    });
}

function html_img_fpattern(FSFE_ProdId, valImagePath) {

    var imagepath = serverpath + '/OperationPicture/FPattern/';
    var img_html;

    if (valImagePath == 'no-image' || valImagePath == null) {
        img_html = valImagePath;

    } else {
        img_html = '<img src="' + imagepath + FSFE_ProdId + '/' + valImagePath + '" class="fpattern_img" />';
    }

    return img_html;

}

$('#fpattern_editpic').live('click', function () {

    var cbox_stat = $('#fpattern_editpic').val();

    if ($(this).is(':checked')) {

        $("#fileUpload_edit").prop("disabled", false);
    } else {
        $("#fileUpload_edit").prop("disabled", true);
    }

});


function edit_fpattern() {
    var data = new FormData();

    var files = $("#fileUpload_edit").get(0).files;
    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var fsfe_fpatternid_ = $('#fsfe_fpatternid').text();

    var fsfe_remarks_ = $('#edit_fpattern_txtarea').val();
    var fsfe_mode_;

    var cbox_mode = $('#fpattern_editpic').is(':checked');

    if (cbox_mode == true) {

        fsfe_mode_ = 'FPattern';
    } else if (cbox_mode == false) {
        fsfe_mode_ = 'no-image';
    }

    if (files.length > 0) {
        data.append("UploadedImageEdit", files[0]);
    }

    var ajaxRequest = $.ajax({
        type: 'POST',
        url: serverpath + '/api/fileupload/EditUploadFile?fsfe_prodid=' + fsfe_prodid_ + '&fsfe_fpatternid=' + fsfe_fpatternid_ + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {

    });
    alert('Flame Pattern now Editted.');
    $('#DialogHighlightEdit_Select').dialog('close');
    load_fsfe_fpattern();
}

//
function load_fsfe_fii() {
   

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    $('#table_fsfe_fii td').parent().remove();
   

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_FII/',

        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {


                //$('#table_fsfe_fii tr:last').after('<tr class="tr_data"><td class="tdclass_fii_param_name" colspan = "3" id="not">'
                //    + value.FSFE_Param_Name + '</td></tr><tr><td>'
                //    + html_img_fii(value.FSFE_ProdId, value.ImagePath)
                //    + '</td><td>'
                //    + format_null(value.Remark)
                //    + '</td><td>'
                //    + format_null(value.Guideline)
                //    + '</td></tr>');

                $('#table_fsfe_fii tr:last').after('<tr class="tr_data"><td class="tdclass_fii_param_name" colspan = "3" id="not">'
                    + value.FSFE_Param_Name + '</td></tr><tr><td>'
                    + html_img_fii(value.FSFE_ProdId, value.ImagePath)
                    + '</td><td>'
                    + format_null(value.Remark)
                    + '</td><td>'
                    + format_null(value.Guideline)
                    + '</td></tr>');

                //$('#table_fsfe_fii tr:last').after('<tr class="tr_data"><td class="tdclass_fii_param_name" colspan = "3" id="not">'
                //  + value.FSFE_Param_Name + '</td></tr><tr><td>'
                //  + html_img_fii(value.FSFE_ProdId, value.ImagePath) + '</td><td>'
                //  + format_null(value.Remark) + '</td><td>'
                //  + format_null(value.Guideline) + '</td><td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_dustline_inspect('
                //  + value.FSFE_FPatternFII_Id + ');return false;"><u>Delete</u></a>&nbsp;</td><td>&nbsp;<a class="edit_regcrew" href="#" onclick="load_partial_edit_dustline_inspect('
                //  + value.FSFE_FPatternFII_Id + ');return false;"><u>Edit</u></a>&nbsp;</td></tr>');

            });
           
        }

    });
        }

function clear_fsfe() {
    //alert('test');
    //$('#fsfe_label_date').each(function () {
    //    $(this).attr('text', "");
    //});

    //$('#fsfe_label_shift').each(function () {
    //    $(this).attr('text', "");
    //});

    //$('#fsfe_label_shiftmgr').each(function () {
    //    $(this).attr('text', "");
    //});

    //$('#fsfe_label_spolead').each(function () {
    //    $(this).attr('text', "");
    //});

    //$('#fsfe_label_fdopt').each(function () {
    //    $(this).attr('text', "");
    //});
    //
    $('#table_fii_label').each(function () {
        $(this).attr('text', "");
    });

    $('#txtarea_fsfe_highlights').each(function () {
        $(this).attr('value', "");
    });

    $('#txtarea_fsfe_turnover').each(function () {
        $(this).attr('value', "");
    });

}





function format_null(changeval) {

    var theval;

    if (changeval == null) {

        theval = '-';


    } else {
        theval = changeval;
    }
    return theval;
}

function html_img_fii(FSFE_ProdId, valImagePath) {
    var imagepath = serverpath + '/OperationPicture/FII/';
    var img_html;

    if (valImagePath == 'no-image' || valImagePath == null) {
        img_html = 'no-image';

    } else {
        img_html = '<img src="' + imagepath + FSFE_ProdId + '/' + valImagePath + '" class="fpattern_img" />';
    }

    return img_html;

}

function load_fsfe_fii_label() {
    clear_fsfe();

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $('#fsfe_label_date').text('-');
    $('#fsfe_label_shift').text('-');
    $('#fsfe_label_shiftmgr').text('-');
    $('#fsfe_label_spolead').text('-');
    $('#fsfe_label_fdopt').text('-');
    //$('#table_fsfe_fii td').remove();


    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_FII_label/',

        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_label_date').text(formatDate_only(value.FSFE_Prod_Date));

                $('#fsfe_label_time').text(formatDate_time_only(value.StartShiftDate) + ' - ' + formatDate_time_only(value.EndShiftDate));


                $('#fsfe_label_shift').text(value.ShiftSched);

                if (value.FSFE_Role_Type_Id == 1) {
                    $('#fsfe_label_scre').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 2) {
                    $('#fsfe_label_jcre').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 3) {
                    $('#fsfe_label_fieldman').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 14) {
                    $('#fsfe_label_furnaceman').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 15) {
                    $('#fsfe_label_dustline').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 4) {
                    $('#fsfe_label_steamdry').text(value.Fullname);
                }

                //$('#fsfe_label_scre').text('scre');
                //$('#fsfe_label_jcre').text('jcre');
                //$('#fsfe_label_fieldman').text('fieldman');
                //$('#fsfe_label_furnaceman').text('furnaceman');
                //$('#fsfe_label_dustline').text('dustline');
                //$('#fsfe_label_steamdry').text('steamdry');


                if (value.FSFE_Role_Type_Id == 1) {
                    $('#fsfe_label_shiftmgr').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 4) {
                    $('#fsfe_label_spolead').text(value.Fullname);
                }
                else if (value.FSFE_Role_Type_Id == 9) {
                    $('#fsfe_label_fdopt').text(value.Fullname);
                }
            });
        }
    });
}

$(document).on('change', '#tuyerestat', function () {

    var stat = $('#tuyerestat').val();

    //alert(a);
    if (stat == 1 || stat == 2) {
        $('#input_tuyere_measure').prop('disabled', true);
        $('#input_tuyere_measure').val(0);
        $('#input_tuyere_measure').css('background', '#000000');

    } else {
        $('#input_tuyere_measure').prop('disabled', false);
        $('#input_tuyere_measure').css('background', '#FFFFFF');
    }



});


$('#add_activity_btn').live('click', function () {
    var test = this.href;

    var cycid = $('#cyc_cycid').text();



    if (check_ongoing_cyc()) {

        var partialview_link = serverpath + "/Operations/AddActivity_Partial/?cycleid_actparam=" + cycid + "&stageid_actparam=" + $(stageid_value).val();


        $('#DialogAdd_Activity').load(partialview_link, function () {

            if ($('#hideme').text() == 'HIDE') {
                $('#second_div').css({ "float": "" });
            } else {
                $('#second_div').css({ "margin-left": "45px" });
                $('#second_div').css({ "float": "" });
            }

            $(this).dialog('open');

            $('body').css('overflow', 'hidden');

            $(".fsfe_charge_input").addClass("False_input_tbox");
            $(".cf_charge_input").addClass("False_input_tbox");
            $(".af_charge_input").addClass("False_input_tbox");
            $(".sulfur_input").addClass("False_input_tbox");

            $(".sulfur_input").val($('#cf_cyclesulfur').text());


            $(".fsfe_charge_input").prop("disabled", true);
            $('.cf_charge_input').prop("disabled", true);
            $('.af_charge_input').prop("disabled", true);
            $(".sulfur_input").prop("disabled", true);

        });
        return false;

    }
});

function check_ongoing_cyc() {

    var cycstat = $('#cyc_statval').text();
    var cycid = $('#cyc_cycid').text();

    var stagecount = cyclestage_count(cycid);

    var i;

    if (stagecount == 0) {

        alert('ERROR: Please Add a Stage first!');
        i = false;
    }
    else if (cycstat != 1) {

        alert('ERROR: You can only modify on-going cycles!');
        i = false;

    } else {
        i = true;
    }

    return i;
}


function check_ongoing_cyc_stage() {

    var cycstat = $('#cyc_statval').text();

    var i;

    if (cycstat != 1) {

        alert('ERROR: You can only modify on-going cycles!');
        i = false;

    } else {
        i = true;
    }

    return i;
}



$('#add_new_stage_btn').live('click', function () {

    var cycid = $('#cyc_cycid').text();

    if (check_ongoing_cyc_stage()) {
        var partialview_link = serverpath + "/Operations/AddStage_Partial/?cycid_param=" + cycid;

        $('#DialogAdd_Stage').load(partialview_link, function () {
            if ($('#hideme').text() == 'HIDE') {
                $('#second_div').css({ "float": "" });
            } else {
                $('#second_div').css({ "margin-left": "45px" });
                $('#second_div').css({ "float": "" });
            }
            $(this).dialog('open');
        });
        return false;
    }
});

//Select Crew Defaults and load data
$(document).on('change', '#FSFcrewdefaultlist', function () {
    clear_css();
    var crewid_ = $(this).val();


    $.ajax({
        url: serverpath + '/Operations/Populate_CrewShift/',
        data: {
            crewid: crewid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#FSFEEmplist_crewroleid_' + value.FSFE_Role_Type_Id).val(value.CompanyId);

            })
        }
    });
    function clear_css() {
        $('select').each(function () {
            $(this).css('background', "");
        });
    }
});
//Select Man Power and load data
$(document).on('change', '#FSFcrewmanpowerlist', function () {

    FSFE_Change('fsfcrew_manpower');

});

function fsf_crewmanpower_autopop() {

    var crewid_ = $('#FSFcrewmanpowerlist').val();

    $.ajax({
        url: serverpath + '/Operations/Populate_CrewShift/',
        data: {
            crewid: crewid_,

        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#FSFEEmplist_roleid_' + value.FSFE_Role_Type_Id).val(value.CompanyId);

            })
            check_manpower_select();
        }
    });

}
//SAving Crew Defaults
//function fsf_savecrew() {

//    } else {

//    var crewid_ = $('#FSFcrewdefaultlist').val();

//    if (crewid_ == '') {

//        alert('Please select a Crew first.');

//    } else {

//        var emp1_ = $('#FSFEEmplist_crewroleid_1').val();
//        var emp2_ = $('#FSFEEmplist_crewroleid_2').val();
//        var emp3_ = $('#FSFEEmplist_crewroleid_3').val();
//        var emp4_ = $('#FSFEEmplist_crewroleid_4').val();
//        var emp5_ = $('#FSFEEmplist_crewroleid_5').val();
//        var emp6_ = $('#FSFEEmplist_crewroleid_6').val();
//        var emp7_ = $('#FSFEEmplist_crewroleid_7').val();
//        var emp8_ = $('#FSFEEmplist_crewroleid_8').val();
//        var emp9_ = $('#FSFEEmplist_crewroleid_9').val();
//        var emp10_ = $('#FSFEEmplist_crewroleid_10').val();
//        var emp11_ = $('#FSFEEmplist_crewroleid_11').val();
//        var emp12_ = $('#FSFEEmplist_crewroleid_12').val();
//        var emp13_ = $('#FSFEEmplist_crewroleid_13').val();
//        var emp14_ = $('#FSFEEmplist_crewroleid_14').val();
//        var emp15_ = $('#FSFEEmplist_crewroleid_15').val();


//        $.ajax({

//            url: serverpath + '/Operations/Assign_CrewDefault/',
//            data: {
//                crewid: crewid_,
//                emp1: emp1_,
//                emp2: emp2_,
//                emp3: emp3_,
//                emp4: emp4_,
//                emp5: emp5_,
//                emp6: emp6_,
//                emp7: emp7_,
//                emp8: emp8_,
//                emp9: emp9_,
//                emp10: emp10_,
//                emp11: emp11_,
//                emp12: emp12_,
//                emp13: emp13_,
//                emp14: emp14_,
//                emp15: emp15_
//            },

//            type: 'POST',
//            cache: false,
//            success: function (data) {
//                alert('Crew Default now saved.');
//            }
//        });
//    }
//}

function fsf_savecrew() {
    var crew_ = $('#FSFcrewdefaultlist').val();
    var items = [];
    if (crew_ != "") {
        $('select[id*="FSFEEmplist_crewroleid_"].changed').each(function () {
            var attrid = $(this).attr('id');

            var roletypeid_ = attrid.replace('FSFEEmplist_crewroleid_', '');
            var empid_ = $(this).val();
            items.push({
                crewid: crew_,
                roletypeid: roletypeid_,
                empid: empid_
            });

        });

        if (items.length != 0) {
            items = JSON.stringify({ 'items': items })

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: serverpath + '/Operations/Assign_CrewDefault/',
                data: items,
                success: function (data) {
                    alert('Crew Default now saved.');
                }

            });
        }
        else
            alert('No changes were made.');
    }
    else {
        alert('Select Crew First.');
        $('#FSFcrewdefaultlist').focus();
    }
}

function load_fsfe_equipment_issues() {

    $('#table_fsfe_equipment_issues td[id*="paramid"] textarea').remove();

    $('#table_fsfe_equipment_issues td[id*="paramid"]').each(function () {
        $(this).append('<textarea rows="4" class="no_border_textarea"></textarea>');
    });

    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    $('#no_border_textarea').css({ "background-color": "#FFFFCC" });

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Equipment_Issues/',
        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#paramid_' + value.FSFE_Param_Id + ' textarea').val(value.FSFE_Param_Value);



            });
        }
    });
}

//save equipment issues
function save_equipment_issues() {
    var date_ = $('#fsfe_shiftdate').val();
    var shiftid_ = $('#fsfe_shiftdate_select').val();

    //var crew_ = $('#FSFcrewmanpowerlist').val();


    //first set and send data and shift
    $.ajax({
        url: serverpath + '/Operations/Save_ShiftAssign/',
        data: {
            date: date_,
            shiftid: shiftid_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            //then send with crewid
            $.ajax({
                url: serverpath + '/Operations/getIssuesProdId/',
                data: {
                    date: date_,
                    shiftid: shiftid_,
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    var shiftassignid_ = data;
                    var items = [];

                    $('#table_fsfe_equipment_issues td[id*="paramid_"]').each(function () {
                        var attrid = $(this).attr('id');
                        var paramid_ = attrid.replace('paramid_', '');
                        var paramval_ = $(this).find('textarea').val();

                        if (paramval_ != "") {
                            items.push({
                                paramid: paramid_,
                                prodid: data,
                                paramdate: date_,
                                paramval: paramval_
                            });
                        }
                    });

                    if (items.length != 0) {
                        items = JSON.stringify({ 'items': items })

                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: serverpath + '/Operations/Save_Equipment_Issues/',
                            data: items,
                            success: function (data) {
                                alert('Equipment Issues now saved.');
                            }
                        });
                        $('textarea').change(function () {
                            //$(this).css({ 'background-color': '#DFD8D1' });
                            $(this).addClass('changed');
                        });
                    }
                    else
                        alert('No changes were made.');

                }
            });
        }
    });

}


function get_shift_time(shiftid) {
    var period_time = [];

    switch (shiftid) {
        case '1':
            period_time.push('11:00 PM');
            period_time.push('7:00 AM');
            break;
        case '2':
            period_time.push('7:00 AM');
            period_time.push('3:00 PM');
            break;
        case '3':
            period_time.push('3:00 PM');
            period_time.push('11:00 PM');
            break;
        default:
            break;
    }

    return period_time;
}

//dustline inspect
function load_fsfe_dustline_inspect(shiftid) {

    //$("#fsfe_shift_btn").click(function () {
    //    $("#start_period").append("<td>Appended item</td>");
    //});
    var period_time = get_shift_time(shiftid);



    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    $('#table_fsfe_equipment_issues td[id*="paramid"]').each(function () {
        $(this).append('<textarea rows="4" class="no_border_textarea"></textarea>');
    });

    $('#table_fsfe_dustline_inspections td').remove();

    $.ajax({
        url: serverpath + '/Operations/FSFE_Load_Dustline_Inspect/',

        data: {
            fsfe_ProdId: fsfe_prodid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#start_period').text(period_time[0]);
            $('#end_period').text(period_time[1]);
            //$.each(data, function (index, value) {

            //    $('#table_fsfe_dustline_inspections tr:last').after('<tr><td>'
            //        + html_img_vwdinspect(value.FSFE_ProdId, value.ImagePath) + '</td><td>'
            //        + value.Remark + '</td></tr>');

            //});
            $.each(data, function (index, value) {


                $('#table_fsfe_dustline_inspections th[id*="param_' + value.FSFE_ParamId + '"]').after('<td id="param_ ">'
                    + value.InspectionTime + '</td><td>'
                    + html_img_vwdinspect(value.FSFE_ProdId, value.ImagePath)
                    + '</td><td>'
                    + value.Remark + '<td>&nbsp;<a class="delete_regcrew" href="#" onclick="delete_dsi('
                    + value.FSFE_DustlineInspection_Id + ');return false;"><u>Delete</u></a></td><td><a class="edit_regcrew" href="#" onclick="load_partial_edit_dustline_inspect('
                    + value.FSFE_DustlineInspection_Id + ');return false;"><u>Edit</u><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1></a></td>');

            });
        }
    });
}

function html_img_vwdinspect(FSFE_ProdId, valImagePath) {
    var imagepath = serverpath + '/OperationPicture/Dustinline_Inspections/';
    var img_html;

    if (valImagePath == 'no-image' || valImagePath == null) {
        img_html = valImagePath;

    } else {
        img_html = '<img src="' + imagepath + FSFE_ProdId + '/' + valImagePath + '" class="dustline_inspection_img" />';
    }

    return img_html;

}



//dustline inspections
function save_dustline_inspections() {

    var data = new FormData();

    var files = $("#fileUploadDustline_Inspections").get(0).files;

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    var fsfe_remarks_ = $('#add_dustline_inspections_txtarea').val()

    var add_min = $('#start_time_min_input').val();

    var add_hr = $('#start_time_hr_input').val();

    var fsfe_inspectiontime_ = (add_hr + ':' + add_min).toString("HH:mm");

    var fsfe_paramid_ = $('#fsfedustline_arealist_ddl').val();

    var fsfe_mode_ = 'Dustinline_Inspections';

    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }
    //fsfe_inspectiontime_ = "1314sfa";

    var ajaxRequest = $.ajax({
        //url: serverpath + '/Operations/UploadFileFII?fsfe_prod_id=' + fsfe_prodid_ + '&fsfe_paramid=' + fsfe_paramid + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        type: 'POST',
        url: serverpath + '/API/FileUpload/DSIUpload?fsfe_prod_id=' + fsfe_prodid_ + '&fsfe_inspectiontime=' + fsfe_inspectiontime_ + '&fsfe_paramid=' + fsfe_paramid_ + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        //data: {
        //    fsfe_prodid: fsfe_prodid_,
        //    fsfe_inspectiontime: fsfe_inspectiontime_,
        //    fsfe_paramid: fsfe_paramid_,
        //    fsfe_remarks: fsfe_remarks_,
        //    fsfe_mode: fsfe_mode_
        //},
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {
    alert('Dustline Inspection now Added.');
    $('#DialogDustline_Inspections_Select').dialog('close');
        $('#DialogDustlineInspectEdit_Select').dialog('close');
    load_fsfe_dustline_inspect();
    });

}
function check_manpower_select() {
    $('#fsfe_manpower_table select').each(function () {
        var id = $(this).attr('id');
        var val = $(this).val();
        if (val == "") {
            $('#fsfe_manpower_table_2').find('select[id="' + id + 'a"]').prop('disabled', false);
            $('#fsfe_manpower_table_2').find('select[id="' + id + 'b"]').prop('disabled', false);
        }
        else {
            $('#fsfe_manpower_table_2').find('select[id="' + id + 'a"]').prop('disabled', true);
            $('#fsfe_manpower_table_2').find('select[id="' + id + 'b"]').prop('disabled', true);
        }
    });
}


// select Shift:
$(document).ready(function () {
    $('#fsfe_shiftdate_select').change(function () {
        if ($(this).on('change')) {
            $('#fsfe_shift_btn').removeAttr('disabled');

        } else {
            $('#fsfe_shift_btn').attr('disabled', 'disabled');
        }
    });
});

function load_fsfe_targets_tbl_names() {
    clear_consumable();
    $('.targets_tabs-menu li').remove();
    $.ajax({
        url: serverpath + '/Operations/FSFE_Targets_Group/',
        data: {
            groupname: "Limits"
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li><a href="#fsfetarget_tab-' + value.id + '">' + value.FSFE_Param + '</a></li>');
                $('.targets_tab').append('<div id="fsfetarget_tab-' + value.id + '"  class="targets_tab-content"><table class="af_tbl" id="fsfetarget_' + value.id + '"><tr><th colspan="4">' + value.FSFE_Param + '</th></tr><tr><th style="width: 150px;">Name</th><th>Target</th><th>LL</th><th>UL</th></tr></table></div>');
            });

            $.ajax({

                url: serverpath + '/Operations/FSFE_Targets_tbl_names/',
                type: 'POST',
                cache: false,
                success: function (data) {

                    $.each(data, function (index, value) {
                        $('#fsfetarget_' + value.FSFE_ParamGroupId + ' tr:last').after('<tr class="tr_data"><td id="paramname_' + value.FSFE_Param_Id + '"' +
                            '>' + value.FSFE_Param_Name + '</td><td class="fsfetarget_td" id="paramid_' + value.FSFE_Param_Id + '_1"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="fsfell_td" id="paramid_' + value.FSFE_Param_Id + '_2"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="fsfeul_td" id="paramid_' + value.FSFE_Param_Id + '_3"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                        //$('.af_tbl tr').each(function () {
                        //    $(this).nextUntil('tr.header').hide();
                        //});
                    });

                    $.ajax({

                        url: serverpath + '/Operations/FSFE_Targets_tbl_data/',
                        type: 'POST',
                        cache: false,
                        success: function (data) {

                            $.each(data, function (index, value) {
                                //alert('success');
                                $("#paramid_" + value.FSFE_ParamId + "_" + value.FSFE_Target_ValueTypeId + " input").attr('value', value.FSFE_Target_NumValue);
                            });

                        }
                    });
                }
            });
            $('.targets_tabs-menu li:first').addClass('current');
            $('.targets_tab div').css({ "display": "none" });
            $('.targets_tab div:first-child').css({ "display": "block" });
        }
    });
}

$('#fsfe_targets_save_btn').live('click', function () {
    var items = [];

    $('table[id*="fsfetarget"]').each(function () {
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];
            var group_ = params[2];
            var numval_ = $(this).find('input').val();

            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    paramid: paramid_,
                    group: group_,
                    numval: numval_
                })
            }
        });
    });

    if (items.length != 0) {
        items = JSON.stringify({ 'items': items })

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/Operations/Save_FSFETargets',
            data: items,
            success: function (data) {
                alert('Targets now saved.');
                load_fsfe_targets_tbl_names();
            }
        });
    }

});

function clear_comments() {
    $("#ui-datepicker-div").hide();
    $('textarea').val('').removeClass('changed');
    $('td input').val('').removeClass('changed').removeAttr('style');
    $('td').removeClass('changed');
}

function load_fsfe_comments() {
    clear_comments();

    var date_ = $('#comments_date').val();
    $.ajax({
        url: serverpath + '/Operations/Load_FSFE_Comments/',
        data: {
            date: date_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.FSFE_ParamId == 439 || value.FSFE_ParamId == 440)
                    $('#paramid_' + value.FSFE_ParamId).val(value.FSFE_Comment_Val);
                else
                    $('#paramid_' + value.FSFE_ParamId + ' input').val(value.FSFE_Comment_Val);
            });
        }
    });
}


function load_fsfe_targets_tbl_names() {
    clear_consumable();
    $('.targets_tabs-menu li').remove();
    $.ajax({
        url: serverpath + '/Operations/FSFE_Targets_Group/',
        data: {
            groupname: "Limits"
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li><a href="#fsfetarget_tab-' + value.id + '">' + value.FSFE_Param + '</a></li>');
                $('.targets_tab').append('<div id="fsfetarget_tab-' + value.id + '"  class="targets_tab-content"><table class="af_tbl" id="fsfetarget_' + value.id + '"><tr><th colspan="4">' + value.FSFE_Param + '</th></tr><tr><th style="width: 150px;">Name</th><th>Target</th><th>LL</th><th>UL</th></tr></table></div>');
            });

            $.ajax({

                url: serverpath + '/Operations/FSFE_Targets_tbl_names/',
                type: 'POST',
                cache: false,
                success: function (data) {

                    $.each(data, function (index, value) {
                        $('#fsfetarget_' + value.FSFE_ParamGroupId + ' tr:last').after('<tr class="tr_data"><td id="paramname_' + value.FSFE_Param_Id + '"' +
                            '>' + value.FSFE_Param_Name + '</td><td class="fsfetarget_td" id="paramid_' + value.FSFE_Param_Id + '_1"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="fsfell_td" id="paramid_' + value.FSFE_Param_Id + '_2"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="fsfeul_td" id="paramid_' + value.FSFE_Param_Id + '_3"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                        //$('.af_tbl tr').each(function () {
                        //    $(this).nextUntil('tr.header').hide();
                        //});
                    });

                    $.ajax({

                        url: serverpath + '/Operations/FSFE_Targets_tbl_data/',
                        type: 'POST',
                        cache: false,
                        success: function (data) {

                            $.each(data, function (index, value) {
                                //alert('success');
                                $("#paramid_" + value.FSFE_ParamId + "_" + value.FSFE_Target_ValueTypeId + " input").attr('value', value.FSFE_Target_NumValue);
                            });

                        }
                    });
                }
            });
            $('.targets_tabs-menu li:first').addClass('current');
            $('.targets_tab div').css({ "display": "none" });
            $('.targets_tab div:first-child').css({ "display": "block" });
        }
    });
}

$('#fsfe_targets_save_btn').live('click', function () {
    var items = [];

    $('table[id*="fsfetarget"]').each(function () {
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];
            var group_ = params[2];
            var numval_ = $(this).find('input').val();

            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    paramid: paramid_,
                    group: group_,
                    numval: numval_
                })
            }
        });
    });

    if (items.length != 0) {
        items = JSON.stringify({ 'items': items })

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/Operations/Save_FSFETargets',
            data: items,
            success: function (data) {
                alert('Targets now saved.');
                load_fsfe_targets_tbl_names();
            }
        });
    }

});

function clear_comments() {
    $("#ui-datepicker-div").hide();
    $('textarea').val('').removeClass('changed');
    $('td input').val('').removeClass('changed').removeAttr('style');
    $('td').removeClass('changed');
}

function load_fsfe_comments() {
    clear_comments();

    var date_ = $('#comments_date').val();
    $.ajax({
        url: serverpath + '/Operations/Load_FSFE_Comments/',
        data: {
            date: date_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.FSFE_ParamId == 439 || value.FSFE_ParamId == 440)
                    $('#paramid_' + value.FSFE_ParamId).val(value.FSFE_Comment_Val);
                else
                    $('#paramid_' + value.FSFE_ParamId + ' input').val(value.FSFE_Comment_Val);
            });
        }
    });
}

$('#comments_save_btn').live('click', function () {
    var date_ = $('#comments_date').val();
    var delete_success = false;
    $.ajax({
        url: serverpath + '/Operations/Delete_FSFE_Comments/',
        data: {
            date: date_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            delete_success = true;
            var items = [];
            var save_success = false;
            $('[id*="paramid_"]').each(function () {
                var attrid = $(this).attr('id');
                var paramid_ = attrid.replace('paramid_', '');
                var strval_;
                if (paramid_ == "439" || paramid_ == "440")
                    strval_ = $(this).val();
                else
                    strval_ = $(this).find('input').val();

                if (strval_ != "") {
                    items.push({
                        date: date_,
                        paramid: paramid_,
                        strval: strval_
                    });
                }
            });

            if (items.length != 0) {
                items = JSON.stringify({ 'items': items })

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: serverpath + '/Operations/Save_FSFE_Comments',
                    data: items,
                    success: function (data) {
                        save_success = true;
                    }
                });
            }
            if (delete_success == true || save_success == true) {
                alert('Comments now saved.');
                load_fsfe_comments();
            }
        }
    });
});

function load_fsf_buildup_shift() {
    $('td[id*="paramid_"] input').removeClass('changed').css({ "background": "#FFFFCC !important" }).val("");

    var date_ = $('#fsfe_shiftdate').val();
    var shift_ = $('#fsfe_shiftdate_select').val();
    var prodid_;
        $.ajax({
        url: serverpath + '/Operations/FSF_getProdId/',
        data: {
            date: date_,
            shiftid: shift_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            prodid_ = data[0];
            $('#prodid').text(prodid_);

            //Load Shift Data
            $.ajax({
                url: serverpath + '/Operations/Load_FSFE_BuildUp_Shift/',
            data: {
                    prodid: prodid_
            },
                type: 'POST',
                cache: false,
                success: function (data) {
                    $.each(data, function (index, value) {
                        $('#paramid_' + value.FSFE_Param_Id + ' input').val(value.FSFE_Buildup_Shift_Val);
                    });
    }
            });

        }
    });
    }

function load_fsf_buildup_daily() {
    var date_ = $('#fsfe_shiftdate').val();
    $.ajax({
        url: serverpath + '/Operations/Load_FSFE_BuildUp_Daily/',
        data: {
            date: date_,
        },
        type: 'POST',
            cache: false,
            success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.FSFE_Param_Id + ' input').val(value.FSFE_Buildup_Daily_Val);
            });
            }
        });
}

function save_fsf_bldup() {
    var date_ = $('#fsfe_shiftdate').val();
    var success_daily = false;
    var success_shift = false;

    var items = [];
    $('#fsf_bldup_tbl1 td input').each(function () {
        var attrid = $(this).parent('td').attr('id');
        var paramid_ = attrid.replace('paramid_', '');
        var numval_ = $(this).val();

        if (numval_ != "") {
            items.push({
                date: date_,
                paramid: paramid_,
                numval: numval_
            });
        }

    });

    if (items.length != 0) {
        items = JSON.stringify({ 'items': items })

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/Operations/Save_Buildup_Daily',
            data: items,
            success: function (data) {
                success_daily = true;

                var prodid_ = $('#prodid').text();
                var items_shift = [];
                $('#fsf_bldup_tbl2 td input.changed').each(function () {
                    var attrid = $(this).parent('td').attr('id');
                    var paramid_ = attrid.replace('paramid_', '');
                    var numval_ = $(this).val();

                    if (numval_ != "") {
                        items_shift.push({
                            paramid: paramid_,
                            prodid: prodid_,
                            numval: numval_
                        });
                    }

                });

                if (items_shift.length != 0) {
                    items_shift = JSON.stringify({ 'items_shift': items_shift })

                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        type: 'POST',
                        url: serverpath + '/Operations/Save_Buildup_Shift',
                        data: items_shift,
                        success: function (data) {
                            success_shift = true;
                        }
                    });
                }

                if (success_daily == true || success_shift == true) {
                    alert('Data now saved.');
                    load_fsf_buildup_daily();
                    load_fsf_buildup_shift();
                }
            }
        });

    } else {
        //$('#fsfe_shift_btn').attr('disabled', 'disabled');
    }
}

//$(".silica_add_input").live('click', function () {
//    cfpopup_partial(cfpopup_partial);
//    var get_id = $('#get_mgval').text($('.silica_add_input').val());
//    var getid = $('.silica_add_input').id();
//    alert(getid);

//    //alert('pop up!');
//});

function get_mg_val(val) {
    var cycid = $('#cyc_cycid').text();

    cfpopup_partial(val, cycid);
    //alert(val);
}


//AF partial Activity
function cfpopup_partial(val, cycid) {
    var actid = val.replace("fesilica_mattegrade_", "");
    
    var partialview_link1 = serverpath + "/Operations/cfpopup_partial/?actid=" + actid + "&cycid=" + cycid;
    $('#Dialog_AddCF_mg').load(partialview_link1, function () {
        $(this).dialog('open');
        $('#get_mgval').text(val);
        $('body').css('overflow', 'hidden');

        //load_cfmg_popup();
        //$('#mg_table td').css('background', 'red');
        //$('#mg_table td').css('font-style', 'normal');
    });
    ///alert('partial fire!');
    return false;
}

$(".mg_val").live('click', function () {
    //alert('hahah');
    //var matte_grade = $('#mg_val').text();
    var matte_grade = $(this).closest('td').text();
    //alert(matte_grade);

    
    var get_val = $('#get_mgval').text();

    //alert(get_val);
   
    //get_val.val(matte_grade);

    $('#' + get_val).val(matte_grade);

    $('#Dialog_AddCF_mg').dialog('close');


});

$('#manual_mtgrade_btn').live('click', function () {
    var matte_grade = $('#manual_mtgrade').val();

    var get_val = $('#get_mgval').text();

    $('#' + get_val).val(matte_grade);

    $('#Dialog_AddCF_mg').dialog('close');
});;

//function load_cfmg_popup(cycid_) {
//   //alert('haha');
   

//    $.ajax({
//        url: serverpath + '/Operations/load_cfmg_popup/',

//        data: {
//            //timestamp: timestamp,
//            //MatteGrade: MatteGrade
//            cycid: cycid_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            $.each(function (index, value) {

//                var timestamp = (value.timestamp);
//                var MatteGrade = (value.MatteGrade);

//                $('#mgtable tr:last').after('<tr id="mg_table"><td class="border_color">1</td><td class="border_color">'
//                 + timestamp + '</td><td class="border_color">'
//                 + MatteGrade + '</td><td class="border_color"><b></tr>'
//                         );
//            });

//        }
//    });

//}

function save_mtapper_crew(fsfe_prodid, launder, mtapperid) {

    $.ajax({

        url: serverpath + '/Operations/save_mtapper_crew/',
        data: {

            fsfe_prodid: fsfe_prodid,
            launder: launder,
            mtapperid: mtapperid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            //if (data == 0) {

            //    alert('Matte Tapper now added.');
            //    $('#DialogMatteTapper_Select').dialog('close');

            //    load_fsfe_mtapper();

            //} else {
            //    alert('Matte Tapper not added existing Tapper Number already.');
            //}

        }
    });

}


//save edit dustline inspections

function save_edit_dustline_inspections() {

    var data = new FormData();

    var files = $("#fileUploadDustline_Inspections_edit").get(0).files;

    var fsfe_prodid_ = $('#fsfe_prod_id').val();

    var fsfe_remarks_ = $('#edit_dustline_inspections_txtarea').val()

    var add_min = $('#edit_start_time_min_input').val();

    var add_hr = $('#edit_start_time_hr_input').val();

    var fsfe_inspectiontime_ = (add_hr + ':' + add_min).toString("HH:mm");

    var fsfe_paramid_ = $('#fsfedustline_arealist_ddl').val();

    var fsfe_mode_ = 'Dustinline_Inspections';

    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }
    //fsfe_inspectiontime_ = "1314sfa";

    var ajaxRequest = $.ajax({
        //url: serverpath + '/Operations/UploadFileFII?fsfe_prod_id=' + fsfe_prodid_ + '&fsfe_paramid=' + fsfe_paramid + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        type: 'POST',
        url: serverpath + '/API/FileUpload/DSIUpload?fsfe_prod_id=' + fsfe_prodid_ + '&fsfe_inspectiontime=' + fsfe_inspectiontime_ + '&fsfe_paramid=' + fsfe_paramid_ + '&fsfe_remarks=' + fsfe_remarks_ + '&fsfe_mode=' + fsfe_mode_,
        //data: {
        //    fsfe_prodid: fsfe_prodid_,
        //    fsfe_inspectiontime: fsfe_inspectiontime_,
        //    fsfe_paramid: fsfe_paramid_,
        //    fsfe_remarks: fsfe_remarks_,
        //    fsfe_mode: fsfe_mode_
        //},
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (xhr, textStatus) {
        alert('Dustline Inspection now Added.');
        $('#DialogDustline_Inspections_Select').dialog('close');
        $('#DialogDustlineInspectEdit_Select').dialog('close');
        load_fsfe_dustline_inspect();
    });
}


//inspectime dustline 
function load_fsfe_dustline_inspectime() {


    var fsfe_prodid_ = $('#fsfe_prod_id').val();
    var dustlineinspectId = $('#dustlineinspectId').text();

    $.ajax({
        url: serverpath + '/Operations/load_fsfe_dustline_inspectime/',

        data: {
            fsfe_ProdId: fsfe_prodid_,
            dustlineinspectId: dustlineinspectId
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var sd = value.InspectionTime;
                var sp = sd.split(":");
                var t1 = sp[0];
                var t2 = sp[1];

                $('#edit_start_time_min_input').val(t2);
                $('#edit_start_time_hr_input').val(t1);

            });
        }
    });
}
