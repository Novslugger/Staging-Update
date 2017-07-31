var serverpath = "";
//var serverpath = "/PASAROperation";


//-------------------------------------------------------------------------------partial events--------------------------------------------------------------------------------------------//
function ddactive_refinery_shorts(partialv_name) {

    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs_shorts/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $("#htab-panel_refine").html(result);
        }
    });
}
function ddactive_refinery(partialv_name) {

    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $("#htab-panel_refine").html(result);
        }
    });
}
function ddactive_rpp(partialv_name) {
    $.ajax({    
        type: 'POST',
        url: serverpath + '/Refinery/refinerytimelog_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });
}
function load_refinery_add_activity() {

    var partialview_link = serverpath + "/Refinery/load_refinery_add_activity/";
    $('#Dialog_Refinery_add_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_refinery_add_csmlog() {

    var partialview_link = serverpath + "/Refinery/load_refinery_add_csmlog/";
    $('#Dialog_Refinery_add_csmlog').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function add_cropshorts_data(partialv_name) {
    var partialview_link = serverpath + "/Refinery/load_refinery_add_crop/";
    $('#Dialog_crop_add_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });
    return false;
}

function edit_cropshorts_data(ActId_) {
    var partialview_link = serverpath + "/Refinery/edit_cropshorts_data/?actid=" + ActId_;
    $('#Dialog_crop_edit_activity').load(partialview_link, function () {
        $(this).dialog('open');
    });
    return false;
}
function load_refinery_downtime(partialv_name) {

    $.ajax({
        type: 'POST',
        url: serverpath + '/Refinery/load_refinery_downtime/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $("#htab-panel_refine").html(result);
        }
    });
}
function load_partial_addmachinedowntime() {

    var partialview_link = serverpath + "/Refinery/ADDnewdowntime_partial/";
    $('#DialogAddMachine_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
function edit_ref_downtimerecord(dt_id_) {
    var partialview_link = serverpath + "/Refinery/edit_ref_downtimerecord/?action_id=" + dt_id_;
    $('#DialogEDITnewdowntime_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });
    return false;
}


function add_prodact_data() {
    var partialview_link = serverpath + "/Refinery/add_prodact_data/";
    $('#Dialog_prod_add_activity').load(partialview_link, function () {
        $(this).dialog('open');
        $('#ui-datepicker-div').hide();
    });
    return false;
}

function edit_prodact_data(ActId_) {
    var partialview_link = serverpath + "/Refinery/edit_prodact_data/?actid=" + ActId_;
    $('#Dialog_prod_edit_activity').load(partialview_link, function () {
        $(this).dialog('open');
        $('#ui-datepicker-div').hide();
    });
    return false;
}

function load_popup_rppeditdate(key_id) {
    var monthyear = $('#ref_rppm_date').val();
    $.ajax({
        url: serverpath + "/Refinery/load_popup_rppeditdate/",
        data: {
            key_id: key_id,
            monthyear: monthyear
        },
        success: function (data) {
            $('#Dialog_Refinery_ProdPlanMonth_EditDate').html(data).dialog('open');
            return false;
        }
    });
}

function edit_prodact_direct_data_(key_id, sdate) {
    var thisblock = $('#load_production_by_block').val();
    $.ajax({
        url: serverpath + "/Refinery/edit_prodact_direct_data_/",
        data: {
            key_id: key_id,
            sdate: sdate,
            thisblock: thisblock
        },
        success: function (data) {
            $('#Dialog_proddirect_edit_activity').html(data).dialog('open');
            return false;
        }
    });
}



//------------------------------------------------------------------------------ End of partial events--------------------------------------------------------------------------------------//



//------------------------------------------------------------------.on events, DOM manipulation .clic,keyup, ETC.--------------------------------------------------------------------------//

$('#refinery_tbl tr').on('click', function () {
    var theval = $(this).find('td:first-child').attr('id');
    var delid = $(this).find('td:nth-child(11)').attr('id');
    var editid = $(this).find('td:nth-child(12)').attr('id');

    beingclicked = theval;

    $('#refinery_tbl td').css('background-color', '#FFFFFF');

    if (lastclicked == 0) {
        $("td#disable_id_" + theval).removeClass();
        $("td#edit_id_" + theval).removeClass();

    } else {

        $("td#disable_id_" + lastclicked).addClass("disable_cfact");
        $("td#edit_id_" + lastclicked).addClass("edit_cfact");

        $("td#disable_id_" + theval).removeClass();
        $("td#edit_id_" + theval).removeClass();

    }

    $(this).children('td').css('background-color', '#FFFF99');

    $("td#disable_id_" + beingclicked).addClass("select_disable_AF_act");
    $("td#edit_id_" + beingclicked).addClass("select_edit_AF_act");

    lastclicked = theval;

});

$('#add_rpp_entry_btn').click(function () {
    add_rpp_row();
});
$('#add_rpp_entry_lnk').click(function () {
    add_rpp_row();
});

//checkking inputs
$(document).on('keyup', 'input[class*="rpp_input"]', function () {

    is_rpp_input($(this));
    setTimeout(check_rpp_input($(this).val(), $(this)), 2000);
    limitText($(this), 1);

});
$(document).on('keyup', 'input[id*="ppd_"]', function () {
    upperCaseF(this);
    limitText($(this), 3);
});


$('#add_ref_act_btn').click(function () {
    load_refinery_add_activity();
});

$('#add_ref_act_lnk').click(function () {
    load_refinery_add_activity();
});
$('#add_ref_csmlog_btn').click(function () {
    load_refinery_add_csmlog();
});
$('#add_ref_csmlog_lnk').click(function () {
    load_refinery_add_csmlog();
});

$(document).on('click', '.tabs.horizontal_ref dd', function () {

    $('.tabs.horizontal_ref dd').removeClass();
    $(this).addClass('active');
    $('.horizontaltabs_ref .tabs dd:first').addClass('active');

});

$('#ref_shift').change(function () {
    if ($(this).on('change')) {
        $('#ref_shift_btn').removeAttr('disabled');

    } else {
        $('#ref_shift_btn').attr('disabled', 'disabled');
    }
});
//---------------------------------------------------------------------End of ".on" events, DOM manipulation .clic,keyup ETC.-------------------------------------------------------//


//----------------------------------------------------------------------function Events--------------------------------------------------------------------------------------------//

// - Select REF Button
function load_refinery_functions() {

    $("#fsfe_log_header").css({ "background-color": "#FFFFCC" });
    $('input[type="text"],textarea,select').css({ "background-color": "#FFFFCC" });
    $('#rfm_select_crew').removeAttr('disabled');

    var interfaceid = $('#uiNo').text();
    switch (interfaceid) {
        case 'shorts':
            load_shorts_blocks();
            break;
        case '1':
            load_ref_manpower_data();
            break;
        case '2':
            load_ref_manpower_data();
            break;
        default:
    }
}

function add_rpp_row() {
    var countTH = $("#rpp_data_tbl tr:first > th").length;
    var cnt = 0;
    var toAppend = '';
    if (countTH > 0) {
        for (var x = 0; x < countTH; x++) {
            toAppend += '<td><input type="text" class="rpp_input" value=""/></td>';
        }

        $('#th_monthdays').after('<tr>' + toAppend + '<td class="rpp_x_tr" onclick="remove_tr(this); return false;">X</td></tr>');
    }
    //+ '<td class="rpp_x_tr" style="cursor:pointer;"><span>X</span></td>'
    //+ '<td><input type="text" class="rpp_in_remarks" disabled="disabled"  value="29/30"/></td>'
    //+ '<td><input type="text" class="rpp_input" disabled="disabled"  value="Plan"/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'
    //+ '<td><input type="text" class="rpp_input"  value=""/></td>'

    //+ '<td><input type="text" class="rpp_in_remarks"  value=""/></td>'

}

function remove_tr($this) {
    $($this).closest('tr').remove();
}


//check capslock
function is_rpp_input(evt) {
    (evt).keypress(function (e) {
        var s = String.fromCharCode(e.which);
        if ((s.toUpperCase() === s && !e.shiftKey) ||
                 (s.toLowerCase() === s && e.shiftKey)) {
            return false;
            alert('Caps Lock is on.');
        }
        return true;
    });
}
//check input limit only 1 character
function limitText(field, maxChar) {
    var ref = $(field),
        val = ref.val();
    if (val.length >= maxChar) {
        ref.val(function () {
            return val.substr(0, maxChar);
        });
    }
}

function check_rpp_input(input, dom) {


    switch (input) {
        case "ST":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('s_rpp_class');
            dom.val('ST');
            //}
            //else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "CP1":
            //var isValid = check_limit_rppd_input(input, dom);
            //if (isValid == true) {
            dom.val('CP');
            dom.addClass('c_rpp_class');
            var get_block = dom.parent().siblings(":first").text();
            if (get_block >= 1 && get_block <= 36) {
                for (var i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input.ppd_input').each(function () {
                        $(this).val('CP');
                        $(this).addClass('c_rpp_class');
                        dom = $(this);
                    });
                }
            } else if (get_block >= 37 && get_block <= 48) {
                for (var x = 0; x < 23; x++) {
                    dom.closest('td').next('td').find('input.ppd_input').each(function () {
                        $(this).val('CP');
                        $(this).addClass('c_rpp_class');
                        dom = $(this);
                    });
                }
            }
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(24).");
            //    dom.removeClass('c_rpp_class');
            //    dom.val('');
            //}
            break;
        case "e":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('e_rpp_class');
            dom.val('e');
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "l":
            //var isValid = check_limit_rpp(input, dom);
            //if (isValid == true) {
            dom.addClass('l_rpp_class');
            dom.val('l');
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
        case "":
            //var isValid = check_limit(input, dom);
            //if (isValid == true) {
            dom.removeClass('s_rpp_class');
            dom.removeClass('c_rpp_class');
            dom.removeClass('e_rpp_class');
            dom.removeClass('l_rpp_class');
            dom.val("");
            //} else {
            //    alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
            //    dom.val('');
            //}
            break;
            //case "r1":
            //    var isValid = check_limit_bulk(input, dom);
            //    if (isValid == true) {
            //        dom.val('r');
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('r');
            //                $(this).addClass('r_class');
            //                //$(this).css({ "background": "#3399ff !important", "color": "black" });
            //                dom = $(this);
            //            });
            //        }
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.removeClass('r_class');
            //        dom.val('');
            //    }
            //    break;
            //case "ca":
            //    var isValid = check_limit(input, dom);
            //    if (isValid == true) {
            //        dom.addClass('ca_class');
            //        dom.val('ca');
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.val('');
            //    }
            //    break;
            //case "ca1":
            //    var isValid = check_limit_bulk(input, dom);
            //    if (isValid == true) {
            //        dom.val('ca');
            //        dom.addClass('ca_class');
            //        //dom.css({ "background": "#000066 !important", "color": "white" });
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('ca');
            //                $(this).addClass('ca_class');
            //                //$(this).css({ "background": "#000066 !important", "color": "white" });
            //                dom = $(this);
            //            });
            //        }
            //    } else {
            //        alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
            //        dom.removeClass('ca_class');
            //        dom.val('');
            //    }
            //    break;
            //case "":
            //    dom.val('');
            //    dom.removeClass();
            //    break;
            //default:
            //    if (input.indexOf('x3') > -1) {
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //    }
            //    else if (input.indexOf('x2') > -1) {
            //        dom.closest('td').next('td').find('input').val('').css({ "background": "white !important" }).closest('td').next('td').find('input').val('').css({ "background": "white !important" })
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //    }
            //    else if (input.indexOf('x1') > -1) {
            //        dom.val('');
            //        dom.removeClass();
            //        //dom.css({ "background": "white !important" });
            //        for (i = 0; i < 19; i++) {
            //            dom.closest('td').next('td').find('input').each(function () {
            //                $(this).val('');
            //                $(this).removeClass();
            //                //$(this).css({ "background": "white !important" });
            //                dom = $(this);
            //            });
            //        }
            //    }
            //    break;
    }
    //var attrid = dom.parent().attr('id');
    //var paramid = attrid.replace('paramid_', '');

    // af_count_target(paramid);
}

function check_limit_rpp(input, dom) {

    var inn = input;
    var dmm = dom;
    var st = "";

}

function load_rpp_month(i, yy) {

    var days = [];

    var m = parseInt(i);
    var y = parseInt(yy);

    days = rpp_getDaysInMonth(m, y);

    $('.th_month_rpp').remove();
    $('#rpp_data_tbl td').parent().remove();
    for (var i = 0; i < days.length; i++) {

        $('#th_monthdays').append('<th class="th_month_rpp">' + days[i].getDate() + '</th>');
    }
}
function rpp_getDaysInMonth(month, year) {
    // Since no month has fewer than 28 days
    var date = new Date(year, month, 1);
    var days = [];
    //console.log('month', month, 'date.getMonth()', date.getMonth());
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;

}
function Get_rpp_MonthName(monthNumber) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber];
}


function load_ref_shorts_row_tab1() {



    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    $('#ref_short_p1 tr').remove();
    $('#ref_short_p1 td').parent().remove();
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {

        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_1_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="crop_' + value.REF_BlockId + '" type="text" class="extratbl_input crop_' + value.REF_BlockId + '" onkeypress="return NumericOnly(event)" value="" disabled="disabled"/></td>';

                });
                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification.
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';

                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p1 tbody').append('<tr><td>Crop</td>' + toAppendtd_crop + '</tr><tr class="p_tr1"><th colspan=' + toAppendth.length + '>Pass 1</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr class="f_tr1"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr class="b_tr1"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                input_shorts_change();
                navigate_cursor_with_arrow_keys();
            }
        });
        ref_shorts_load_data();
        ref_shorts_Crop_load_data();
    }
}


function load_ref_shorts_row_tab2() {

    $('#ref_short_p2 tr').remove();
    $('#ref_short_p2 td').parent().remove();
    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {

        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_2_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="shorts_2_' + value.REF_BlockId + '" type="number" class="extratbl_input crop_' + value.REF_BlockId + '" onkeyup="load_shorts_crop(this.id);" value="" disabled="disabled"/></td>';
                });
                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification. 
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';

                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p2 tbody').append('<tr class="shorts_crop"><td>Crop</td>' + input19 + '</tr><tr class="p_tr2"><th colspan=' + toAppendth.length + '>Pass 2</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr class="f_tr2"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr class="b_tr2"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                $('.shorts_crop').css({ "visibility": "hidden" });
                input_shorts_change();
                ref_shorts_load_data();
                //ref_shorts_Crop_load_data();
                navigate_cursor_with_arrow_keys();
            }
        });
    }
}


function load_ref_shorts_row_tab3() {

    $('#ref_short_p3 tr').remove();
    $('#ref_short_p3 td').parent().remove();
    var toAppendth = '';
    var toAppendtd = '';
    var toAppendtd_crop = '';
    var row_emp = $('#ref_row_shift').val();
    if (row_emp > 0) {
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
            url: serverpath + '/Refinery/load_ref_shorts_row/',
            data: {
                row_emp: row_emp,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {

                    toAppendth += '<th>&nbsp;&nbsp;&nbsp;&nbsp;' + value.REF_BlockNo + '&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                    toAppendtd += '<td><input id="shorts_3_' + value.REF_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>';
                    toAppendtd_crop += '<td><input id="shorts_3_' + value.REF_BlockId + '" type="number" class="extratbl_input crop_' + value.REF_BlockId + '" onkeyup="load_shorts_crop(this.id);" value="" disabled="disabled"/></td>';
                });

                var split_crop_input = toAppendtd_crop.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 0 for identification. 
                var split_input = toAppendtd.split('<td><input id="shorts'); //get or find the id of element input in this variable and add number 1 to 18 for identification.           
                var input1 = '', input2 = '', input3 = '', input4 = '', input5 = '', input6 = '', input7 = '', input8 = '', input9 = '';
                var input10 = '', input11 = '', input12 = '', input13 = '', input14 = '', input15 = '', input16 = '', input17 = '', input18 = '', input19 = '';


                for (var sd = 1; sd < split_input.length; sd++) {
                    input1 += '<td><input id="shorts_1' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input2 += '<td><input id="shorts_2' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input3 += '<td><input id="shorts_3' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input4 += '<td><input id="shorts_4' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input5 += '<td><input id="shorts_5' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input6 += '<td><input id="shorts_6' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input7 += '<td><input id="shorts_7' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input8 += '<td><input id="shorts_8' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input9 += '<td><input id="shorts_9' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input10 += '<td><input id="shorts_10' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input11 += '<td><input id="shorts_11' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input12 += '<td><input id="shorts_12' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input13 += '<td><input id="shorts_13' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input14 += '<td><input id="shorts_14' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input15 += '<td><input id="shorts_15' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input16 += '<td><input id="shorts_16' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input17 += '<td><input id="shorts_17' + split_input[sd];
                }
                for (var sd = 1; sd < split_input.length; sd++) {
                    input18 += '<td><input id="shorts_18' + split_input[sd];
                }
                for (var sd = 1; sd < split_crop_input.length; sd++) {
                    input19 += '<td><input id="shorts_0' + split_crop_input[sd];
                }

                $('.ref_short_fixed_cell').show();
                $('#ref_short_p3 tbody').append('<tr class="shorts_crop"><td>Crop</td>' + input19 + '</tr><tr class="p_tr3"><th colspan=' + toAppendth.length + '>Pass 3</th></tr><tr><th>No.</th>' + toAppendth + '</tr>'
                + '<tr id="tr1" class="f_tr3"><td class="rfc_tbltd">1</td>' + input1 + '</tr>'
                + '<tr id="tr2" class="b_tr3"><td class="rfc_tbltd">2</td>' + input2 + '</tr>'
                + '<tr id="tr3"><td class="rfc_tbltd">3</td>' + input3 + '</tr>'
                + '<tr id="tr4"><td class="rfc_tbltd">4</td>' + input4 + '</tr>'
                + '<tr id="tr5"><td class="rfc_tbltd">5</td>' + input5 + '</tr>'
                + '<tr id="tr6"><td class="rfc_tbltd">6</td>' + input6 + '</tr>'
                + '<tr id="tr7"><td class="rfc_tbltd">7</td>' + input7 + '</tr>'
                + '<tr id="tr8"><td class="rfc_tbltd">8</td>' + input8 + '</tr>'
                + '<tr id="tr9"><td class="rfc_tbltd">9</td>' + input9 + '</tr>'
                + '<tr id="tr10"><td class="rfc_tbltd">10</td>' + input10 + '</tr>'
                + '<tr id="tr11"><td class="rfc_tbltd">11</td>' + input11 + '</tr>'
                + '<tr id="tr12"><td class="rfc_tbltd">12</td>' + input12 + '</tr>'
                + '<tr id="tr13"><td class="rfc_tbltd">13</td>' + input13 + '</tr>'
                + '<tr id="tr14"><td class="rfc_tbltd">14</td>' + input14 + '</tr>'
                + '<tr id="tr15"><td class="rfc_tbltd">15</td>' + input15 + '</tr>'
                + '<tr id="tr16"><td class="rfc_tbltd">16</td>' + input16 + '</tr>'
                + '<tr id="tr17"><td class="rfc_tbltd">17</td>' + input17 + '</tr>'
                + '<tr id="tr18"><td class="rfc_tbltd">18</td>' + input18 + '</tr>'
                 );

                load_disable_by_block();
                $('.shorts_crop').css({ "visibility": "hidden" });
                input_shorts_change();
                ref_shorts_load_data();
                //ref_shorts_Crop_load_data();
                navigate_cursor_with_arrow_keys();
            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            }
        });
    }
}

function input_shorts_change() {
    $('input').change(
                  function () {
                      if ($(this).val() == '') {
                          $(this).css({ 'background-color': '#ffffcc' });
                          //$(this).removeClass('changed');
                          $(this).addClass('changed');
                      } else {
                          $(this).css({ 'background-color': '#DFD8D1' });
                          $(this).addClass('changed');
                      }
                  });
}

function load_disable_by_block() {
    $('.refinery_class_table').find('input[id*="shorts_"]').each(function () {
        var attid = $(this).attr('id');
        var paramid = attid.replace('shorts_', '');
        var getp = paramid.split('_');
        var cellno = getp[0];
        var passno = getp[1];
        var blockId = getp[2];

        if (blockId >= 1 && blockId <= 36) {
            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", true); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", true); });
        } else if (blockId == 37) {
            $('input[id*="shorts_1_' + passno + '_37"]').each(function () { $(this).prop("disabled", true); });

            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", false); });

        } else if (blockId == 38) {
            $('input[id*="shorts_1_' + passno + '_38"]').each(function () { $(this).prop("disabled", true); });

            $('input[id*="shorts_15"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_16"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_17"]').each(function () { $(this).prop("disabled", false); });
            $('input[id*="shorts_18"]').each(function () { $(this).prop("disabled", false); });
        }
    });
}

function navigate_cursor_with_arrow_keys() {

    $('input').keydown(function (e) {
        if (e.which == 39) { // right arrow
            $(this).closest('td').next().find('input').focus();

        } else if (e.which == 37) { // left arrow
            $(this).closest('td').prev().find('input').focus();

        } else if (e.which == 40) { // down arrow
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();

        } else if (e.which == 38) { // up arrow
            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
        }
        else if (e.which == 13) { // next line
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
            if ($("#ref_row_shift").val() >= 1 && $("#ref_row_shift").val() <= 4) {
                if ($(this).closest("tr").find("td:first").text() == 14) {
                    var focused;
                    $(":focus").each(function () {
                        focused = this.id;
                    });
                    var paramid = focused.replace('shorts_', '');
                    var getp = paramid.split('_');
                    var passno = getp[1];
                    var blk = getp[2];
                    var cell = getp[0];
                    if (passno == 1) {

                        $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blk >= 33 && blk <= 48 && cell == 14 ) {
                        //    $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //   alert(passno + " " + blk);
                        //}
                    } else if (passno == 2) {
                        $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();   
                        //}
                    } else if (passno == 3) {
                        $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    }

                }
            } else {
                if ($(this).closest("tr").find("td:first").text() == 18) {
                    var focused;
                    $(":focus").each(function () {
                        focused = this.id;
                    });
                    var paramid = focused.replace('shorts_', '');
                    var getp = paramid.split('_');
                    var passno = getp[1];
                    var blockId = getp[2];
                    if (passno == 1) {
                        $("tr.f_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    } else if (passno == 2) {
                        $("tr.f_tr2").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    } else if (passno == 3) {
                        $("tr.f_tr3").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //if (blockId >= 33 && blockId <= 48) {
                        //    $("tr.b_tr1").find('td:eq(' + $(this).closest('td').index() + ')').next().find('input').focus();
                        //}
                    }
                }
            }
        }
    });

}


function load_shorts_crop($this) {

    var id = $('#' + $this);
    var evt = $('#' + $this).attr('class');
    var spt = evt.split(" ");
    var $class = spt[1];
    var this_val = id.val().replace(/[^1-9\.]/g, '');
    $('.' + $class).val(this_val);
    $('.' + $class).addClass("changed");

}
function ref_load_shorts_employeerow() {

    $.ajax({
        url: serverpath + '/Refinery/ref_load_shorts_employeerow',
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                //$('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + ' - ' + value.Fullname + '</option>');
                $('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + '</option>');

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#ref_row_shift > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });
            });
        }
    });
}

function ref_shorts_load_data() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();
    $('input[id*="shorts_"]').each(function () {
        $(this).val('');
        $(this).removeClass('changed');
        $(this).css({ 'background-color': '#ffffcc' });
    });

    $.ajax({
        url: serverpath + '/Refinery/ref_shorts_load_data/',
        data: {
            proddate: proddate,
            shiftId: shiftId,
            row_emp: row_emp
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var REFTH_ShortCount;

                REFTH_ShortCount = value.REFTH_ShortCount == null ? "" : value.REFTH_ShortCount;

                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').val(REFTH_ShortCount);
                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').removeClass('changed');
                $('#shorts_' + value.REFTH_CellNo + '_' + value.REFTH_PassNo + '_' + value.REFTH_BlockId + '').css({ 'background-color': '#ffffcc' });

            });
        }
    });
}

function ref_shorts_Crop_load_data() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();
    $('input[id*="crop_"]').each(function () {
        $(this).val('');
        $(this).removeClass('changed');
        $(this).css({ 'background-color': '#ffffcc' });
    });

    $.ajax({
        url: serverpath + '/Refinery/ref_shorts_Crop_load_data/',
        data: {
            proddate: proddate,
            shiftId: shiftId,
            row_emp: row_emp
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var REFTH_Crop;
                REFTH_Crop = value.REFTH_Crop == null ? "" : value.REFTH_Crop;

                $('#crop_' + value.REFTH_BlockId + '').val(REFTH_Crop);
                $('#crop_' + value.REFTH_BlockId + '').removeClass('changed');
                $('#crop_' + value.REFTH_BlockId + '').css({ 'background-color': '#ffffcc' });

            });
        }
    });
}

function save_ref_shorts() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();

    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (row_emp == 0 || row_emp == '--Select--' || row_emp == '') {

        alert('Please select row.');

    } else {

        $('.refinery_class_table').find('input[id*="shorts_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('shorts_', '');
            var getp = paramid.split('_');
            var short_count = $(this).val();
            var cellno = getp[0];
            var passno = getp[1];
            var blockId = getp[2];

            items.push({
                prodate: proddate,
                shiftno: shiftId,
                passno: passno,
                blockId: blockId,
                row_emp: row_emp,
                cellno: cellno,
                short_count: short_count
            });
        });
        items = JSON.stringify({ 'items': items });
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_shorts/',
            data: items,
            success: function (data) {
                $('.ajax-loader').css("visibility", "hidden");
                alert('Shorts changes now saved.');
                ref_shorts_load_data();
                ref_shorts_Crop_load_data();
            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            }
        });
    }
}

function save_ref_shortsCrop() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var row_emp = $('#ref_row_shift').val();

    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (row_emp == 0 || row_emp == '--Select--' || row_emp == '') {

        alert('Please select row.');

    } else {

        $('.refinery_class_table').find('input[id*="crop_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('crop_', '');
            var getp = paramid.split('_');
            var short_crop = $(this).val();
            var blockId = getp[0];
            items.push({
                pdate: proddate,
                shiftn: shiftId,
                blockno: blockId,
                row_id: row_emp,
                short_crop: short_crop
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_shortsCrop/',
            data: items,
            success: function (data) {
                alert('Shorts crop changes now saved.');
                ref_shorts_Crop_load_data();
            }
        });
    }
}

function save_shorts_data() {
    save_ref_shorts();
    //save_ref_shortsCrop();

}

function load_shorts_blocks() {
    load_ref_shorts_row_tab1();
    load_ref_shorts_row_tab2();
    load_ref_shorts_row_tab3();
}
//--------------------------------------------------------------------------------------------functions for manpower--------------------------------------------------------------------------------------//

// load employee for man power 
function load_ref_employee(deptid) {

    $.ajax({
        url: serverpath + '/Refinery/load_ref_employee/',
        data: {
            deptid: deptid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
                    $(this).append("<option value = " + value.EmployeeId + ">" + value.Fullname + "</option>");
                });
            });
            load_crew_select();
            load_ref_manpower_data();
        }
    });
}


//save employee for man power
function save_ref_manpower() {

    var proddate = $('#ref_proddate').val();
    var shiftId = $('#ref_shift').val();
    var crew_default = $('#rfm_select_crew').val();
    var items = [];

    if (proddate == '' || shiftId == '') {

        alert('Please select date and shift.');

    } else if (crew_default == 0 || crew_default == '--Select--' || crew_default == '') {

        alert('Please select crew.');

    } else {

        $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('ref_manpower_', '');
            var getp = paramid.split('_');
            var empId = $(this).val();
            var roletypeId = getp[0];
            var roleGroupId = getp[1];

            items.push({
                proddate: proddate,
                shiftId: shiftId,
                roletypeId: roletypeId,
                empId: empId,
                roleGroupId: roleGroupId,
                crew_default: crew_default
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_manpower/',
            data: items,
            success: function (data) {
                alert('Manpower changes now saved.');
                load_ref_manpower_data();
            }
        });
    }
}

// load saved data for man power
function load_ref_manpower_data() {

    var prod_date = $("#ref_proddate").val();
    var shiftId = $("#ref_shift").val();
    var rolegroup = $('#uiNo_manpower').text();

    $('select[id*="ref_manpower_"]').each(function () { $(this).val(0) });
    $('#rfm_select_crew').val(0);

    $.ajax({
        url: serverpath + '/Refinery/load_ref_manpower_data/',
        data: {
            proddate: prod_date,
            shiftId: shiftId,
            rolegroup: rolegroup
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#rfm_select_crew').val(value.REFTH_CrewId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroup_Id + '').val(value.REFTH_EmpId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroup_Id + '').removeAttr('disabled');

            });
        }
    });
}

//load saved crew defaults for man power
function load_ref_crewlist_manpower() {

    var default_crew = $('#rfm_select_crew').val();

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).val(0);
        $(this).removeClass('changed');
    });

    $.ajax({
        url: serverpath + '/Refinery/load_ref_crewlist_manpower/',
        data: {
            default_crew: default_crew
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').val(value.REFTH_EmpId);
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').addClass('changed');
            });
        }
    });
}

//enable select tag of employee man power
function enable_rfm_select_manpower() {

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).removeAttr("disabled");
    });
    load_ref_crewlist_manpower();
}

//enable select tag of crew man power if date and shift already selected
function enable_select_crew_manpower() {

    var prod_date = $("#ref_proddate").val();
    var shiftId = $("#ref_shift").val();

    if (prod_date == '' || shiftId == '') {
        $('#rfm_select_crew').prop("disabled", true);
        $('select[id*="ref_manpower_"]').each(function () {
            $(this).prop("disabled", true);
        });
    }
}

//---------------------------------------------------------------------------------functions for crew defaults----------------------------------------------------------------------------------------//

//load crew(team) for crew defaults
function load_crew_select() {

    $('select[id*="rfm_select_crew"]').each(function () { $(this).val(0); });

    $.ajax({
        url: serverpath + '/Refinery/load_crew_select/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $("#rfm_select_crew").append("<option value=" + value.REFTH_CrewId + ">" + value.REFTH_CrewName + "</option>");

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#rfm_select_crew > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });
        }
    });
}

// load employee for crew defaults
function load_ref_employee_crew_default(deptid) {

    $.ajax({
        url: serverpath + '/Refinery/load_ref_employee/',
        data: {
            deptid: deptid,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('.refinery_manpower_table').find('select[id*="ref_manpower_"]').each(function () {
                    $(this).append("<option value = " + value.EmployeeId + ">" + value.Fullname + "</option>");

                });
            });
            load_crew_select();
        }
    });
}

//save crew for crew defaults
function save_ref_default_manpower() {

    var default_crew = $('#rfm_select_crew').val();
    var items = [];

    if (default_crew == 0 || default_crew == '--Select--' || default_crew == '') {
        alert('Please select crew.');
    } else {
        $('.refinery_manpower_table').find('select[id*="ref_manpower_"].changed').each(function () {
            var attid = $(this).attr('id');
            var paramid = attid.replace('ref_manpower_', '');
            var getp = paramid.split('_');
            var empId = $(this).val();
            var roletypeId = getp[0];
            var roleGroupId = getp[1];

            items.push({
                cd_roleGroupId: roleGroupId,
                cd_roletypeId: roletypeId,
                cd_default_crew: default_crew,
                cd_empId: empId
            });
        });

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: serverpath + '/Refinery/save_ref_default_manpower/',
            data: items,
            success: function (data) {
                alert('Crew defaults changes now saved.');
                load_ref_default_manpower();
            }
        });
    }
}

//load saved crew defaults
function load_ref_default_manpower() {

    var default_crew = $('#rfm_select_crew').val();

    $('select[id*="ref_manpower_"]').each(function () { $(this).val(0) });

    $.ajax({
        url: serverpath + '/Refinery/load_ref_default_manpower/',
        data: {
            default_crew: default_crew
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#ref_manpower_' + value.REFTH_RoleTypeId + '_' + value.REFTH_RoleGroupId + '').val(value.REFTH_EmpId);
            });
        }
    });
}

//enable select tag of employee crew defaults
function enable_rfm_select() {

    $('select[id*="ref_manpower_"]').each(function () {
        $(this).removeAttr("disabled");
    });
    load_ref_default_manpower();
}


function validation_ref_shorts_crop_add() {

    var add_s_date = new Date($('#Dialog_crop_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_crop_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_add_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_crop_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_crop_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_add_activity #end_time_min_ref_add_act').val();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_crop_add_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_crop_add_activity #addbtn_ref_crop').attr('disabled', true);
    } else {
        $('#Dialog_crop_add_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_crop_add_activity #addbtn_ref_crop').attr('disabled', false);

    }

}


function validation_ref_shorts_crop_edit() {

    var add_s_date = new Date($('#Dialog_crop_edit_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_crop_edit_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_edit_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_crop_edit_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_crop_edit_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_edit_activity #end_time_min_ref_add_act').val();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_crop_edit_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_crop_edit_activity #addbtn_ref_crop').attr('disabled', true);
    } else {
        $('#Dialog_crop_edit_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_crop_edit_activity #addbtn_ref_crop').attr('disabled', false);

    }

}

function add_ref_crop() {


    var crop = '';
    var blockid = $('#Dialog_crop_add_activity #blockid').val();
    var cropid = $('#Dialog_crop_add_activity #cropid').val();
    var elapsedKAH_crop = $('#Dialog_crop_add_activity #elapsedKAH_crop').val();

    var s_date = new Date($('#Dialog_crop_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_crop_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_add_activity #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_crop_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_crop_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_add_activity #end_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");



    $.ajax({
        url: afserverpath + '/Refinery/add_ref_crop/',
        data: {
            blockid: blockid,
            cropid: cropid,
            start_date: start_date,
            end_date: end_date,
            elapsedKAH_crop: elapsedKAH_crop,
            crop: crop

        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_crop_add_activity').dialog('close');
            alert('Data now saved.');
            load_data_ref_crop($('#ref_crop_date').val());
            //load_data_ref_crop_nofilter();
        }
    });
}



function edit_ref_crop() {


    var crop = $('#Dialog_crop_edit_activity #cropid_edit').text();
    var blockid = $('#Dialog_crop_edit_activity #blockid').val();
    var cropid = $('#Dialog_crop_edit_activity #cropid').val();
    var elapsedKAH_crop = $('#Dialog_crop_edit_activity #elapsedKAH_crop_edit').val();

    var s_date = new Date($('#Dialog_crop_edit_activity #start_date_ref_edit_act').val());
    var s_hr = $('#Dialog_crop_edit_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_crop_edit_activity #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_crop_edit_activity #end_date_ref_edit_act').val());
    var end_hr = $('#Dialog_crop_edit_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_crop_edit_activity #end_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");



    $.ajax({
        url: afserverpath + '/Refinery/edit_ref_crop/',
        data: {
            blockid: blockid,
            cropid: cropid,
            start_date: start_date,
            end_date: end_date,
            elapsedKAH_crop: elapsedKAH_crop,
            crop: crop
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_crop_edit_activity').dialog('close');
            alert('Data now saved.');
            load_data_ref_crop($('#ref_crop_date').val());
            //load_data_ref_crop_nofilter();

        }
    });
}


function load_data_ref_crop(date_) {

    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop/',

        data: {
            date: date_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });
}


function load_data_ref_crop_nofilter() {

    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_nofilter/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });
}


function delete_cropshorts_data(ActId_) {


    themsg = 'Are you sure you want to delete this ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_cropshorts_data/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                load_data_ref_crop($('#ref_crop_date').val());
                //load_data_ref_crop_nofilter();

            }
        });
    }
}

function searchin_crop(input, tbl) {
    var input = $('#search_shortscrop option:selected');

    $(tbl).each(function () {
        if ($(this).find('td').eq(0).text() == $('#search_shortscrop option:selected').text()) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function load_data_ref_crop_sdate() {

    var sdate = $('#cropdate_filter').val();
    var blockid = $('#search_shortscrop').val();
    var monthyear = $('#ref_crop_date').val();
    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_sdate/',

        data: {
            sdate: sdate,
            blockid: blockid,
            monthyear: monthyear
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;


                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });

}


function load_data_ref_crop_block() {

    var blockid = $('#search_shortscrop').val();
    var monthyear = $('#ref_crop_date').val();
    $('#ref_crop_table td').parent().remove();

    $.ajax({
        url: serverpath + '/Refinery/load_data_ref_crop_block/',

        data: {

            blockid: blockid,
            monthyear: monthyear
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var shift = value.REFTH_StartShiftId == null ? "-" : value.REFTH_StartShiftId;
                var REFTH_ElapsedKAH = value.REFTH_ElapsedKAH == null ? "-" : value.REFTH_ElapsedKAH;

                $('#ref_crop_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockPair + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_CropNo + '</td>'
                    + '<td class="dfault_crop">' + REFTH_ElapsedKAH + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateStart) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_DateEnd) + '</td>'
                    + '<td class="dfault_crop">' + shift + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + value.REFTH_CropId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + value.REFTH_CropId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_crop_table', 30);
            });
        }
    });

}
function load_partial_ADDnewdowntime() {

    var partialview_link = serverpath + '/Refinery/load_partial_ADDnewdowntime';
    $('#DialogADDnewdowntime_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
function load_partial_ADDnewreason() {

    var partialview_link = serverpath + '/Refinery/load_partial_ADDnewreason';
    $('#DialogADDnewdowntimereason_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
$('#reflink_downtimemonitoring_id').on('click', function () {

    load_partial_ADDnewdowntime();

});
$('#dvReasonLink').on('click', function () {

    load_partial_ADDnewreason();

});

function load_allMachineDowntime() {
    $.ajax({
        url: serverpath + '/Refinery/load_allMDMonitoring/',
        data: {
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#ref_downtime_maintable td').parent().remove();

            $.each(data, function (index, value) {

                //***this code is for calling/displaying data from the controller
                //datetime,machine,code,trouble,remarks,stop,start,downtime,responsiblity
                $('#ref_downtime_maintable tr:last').after('<tr id="trid_' + value.REFTH_MachineDowntimeId + '">'
                    + '<td> ' + formatDate(value.REFTH_MDDate) + '</td>'
                    + '<td>' + value.REFTH_MachineCode + '</td>'
                    + '<td>' + value.REFTH_MDReasonCode + '</td>'
                    + '<td style="text-align:justify">' + value.REFTH_MDReasonDesc + '</td>'
                    + '<td>' + value.REFTH_MDRemarks + '</td>'
                    + '<td>' + formatDate(value.REFTH_MDStartTime) + '</td>'
                    + '<td>' + formatDate(value.REFTH_MDEndTime) + '</td>'
                    + '<td title="View me!" id="minutes_id_' + value.REFTH_MachineDowntimeId + '" onclick="dt_minutesvalue(this.id)">' + value.REFTH_MDDowntimeMin + '</td>'
                     + '<td><select id="tridres_' + value.REFTH_MachineDowntimeId + '"/></td>'
                    + '<td><a id="resplistedit" style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="edit_resp_dt(' + value.REFTH_MachineDowntimeId + ');edit_ref_downtimerecord(' + value.REFTH_MachineDowntimeId + ');return false;">&#x270E;</a></td>'
                    + '<td><a style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="delete_downtime_data(' + value.REFTH_MachineDowntimeId + ');return false;">&#x274E;</a></td></tr>'

                     );
            });
            append_responsible();
        }

    });
}
function load_allMachineDowntimeFilter() {
    var dt_date = $('#ref_downtimemonitoringid').val();

    $.ajax({
        url: serverpath + '/Refinery/load_allMachineDowntimeFilter/',
        data: {
            dt_date: dt_date
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#ref_downtime_maintable td').parent().remove();

            $.each(data, function (index, value) {

                //this code is for calling/displaying data from the controller
                //datetime,machine,code,trouble,remarks,stop,start,downtime,responsiblity
                $('#ref_downtime_maintable tr:last').after('<tr id="trid_' + value.REFTH_MachineDowntimeId + '">'
                    + '<td> ' + formatDate(value.REFTH_MDDate) + '</td>'
                    + '<td>' + value.REFTH_MachineCode + '</td>'
                    + '<td>' + value.REFTH_MDReasonCode + '</td>'
                    + '<td>' + value.REFTH_MDReasonDesc + '</td>'
                    + '<td>' + value.REFTH_MDRemarks + '</td>'
                    + '<td>' + formatDate(value.REFTH_MDStartTime) + '</td>'
                    + '<td>' + formatDate(value.REFTH_MDEndTime) + '</td>'
                    + '<td title="View me!" id="minutes_id_' + value.REFTH_MachineDowntimeId + '" onclick="dt_minutesvalue(this.id)">' + value.REFTH_MDDowntimeMin + '</td>'
                    + '<td><select id="tridres_' + value.REFTH_MachineDowntimeId + '"/></td>'
                    + '<td><a style="font-size:15px;color:rgba(224, 11, 14, 1);" href="#" onclick="edit_ref_downtimerecord(' + value.REFTH_MachineDowntimeId + ');return false;">&#x270E;</a></td>'
                    + '<td><a style="font-size:15px;color:rgba(224, 11, 14, 1);" href="#" onclick="delete_downtime_data(' + value.REFTH_MachineDowntimeId + ');return false;">&#x274E;</a></td></tr>'

                     );
            });
            append_responsible();
        }
    });
}


function ref_downtime_diff() {

    var timestop_date = new Date($('#ref_DowntimeTimeStop_ID').val());
    var timestop_hr = $('#load_TimeStophr').val();
    var timestop_min = $('#load_TimeStophrmin').val();

    var timestart_date = new Date($('#ref_DowntimeStartTime_ID').val());
    var timestart_hr = $('#load_StartTimehr').val();
    var timestart_min = $('#load_StartTimemin').val();

    timestop_dateval = timestop_date.add({
        minutes: timestop_min,
        hours: timestop_hr
    });

    timestart_dateval = timestart_date.add({

        minutes: timestart_min,
        hours: timestart_hr
    });

    var dt = Math.floor((timestart_dateval - timestop_dateval) / 60000);
    var h = Math.floor(dt / 60);
    var m = dt % 60;
    var diffdowntime = (h + '.' + m);
    $('#ref_downtimemins_id').val(dt);
    $('#ref_downtime_id').val(diffdowntime);
    var dt1 = Math.floor((timestart_dateval - timestart_dateval) / 60000);

    //var c = $('#dt_eachid').val();
    //if (c < 0 || c > 0 || c != "") {
    var rows = $("input[id*='append_res_']").length;
    rows += 1;
    var totdtime = $('#ref_downtimemins_id').val();
    var aresp_id = $('#responsible_id').val();
    var q = totdtime / rows;
    $('#appendRes_id').find("input[id*='append_min_']").each(function () {
        $(this).val(q.toFixed(2));
        $('#dt_eachid').text(q.toFixed(2));
    });
    //    });
    //} else {
    //}
    if (dt > 0) {
        $("input[id='elec_id']").removeAttr("disabled")
        $("input[id='mech_id']").removeAttr("disabled")
        $("input[id='instru_id']").removeAttr("disabled")
        $("input[id='ops_id']").removeAttr("disabled")
    } else {
        $("input[id='elec_id']").prop("disabled", true);
        $("input[id='mech_id']").prop("disabled", true);
        $("input[id='instru_id']").prop("disabled", true);
        $("input[id='ops_id']").prop("disabled", true);
    }


}
function ref_savedowntime() {

    var flag = $('#save_flag').text();
    if (flag > 1 || flag != "-") {//Multiple saving
        var mins_val = $('#ref_downtimemins_id').val();
        var ref_dt = new Date($('#ref_DowntimeAddCurrentDate_ID').val());
        var ref_dt_hr = $('#load_RefCurrentTIDhour').val();
        var ref_dt_min = $('#load_RefCurrentTIDminutes').val();
        ref_newdt = ref_dt.add({
            minutes: ref_dt_min,
            hours: ref_dt_hr
        });
        var current_dt = ref_newdt.toString("ddd, dd MMM yyyy H:mm:ss");

        var ref_mid = $('#ref_selMachineID').val();
        var ref_resid = $('#hidden_tcode_id').text();

        var ref_stopdt = new Date($('#ref_DowntimeTimeStop_ID').val());
        var ref_stopdt_hr = $('#load_TimeStophr').val();
        var ref_stopdt_min = $('#load_TimeStophrmin').val();
        ref_newstopdt = ref_stopdt.add({
            minutes: ref_stopdt_min,
            hours: ref_stopdt_hr
        });
        var stop_dt = ref_newstopdt.toString("ddd, dd MMM yyyy H:mm:ss");

        var ref_startdt = new Date($('#ref_DowntimeStartTime_ID').val());
        var ref_startdt_hr = $('#load_StartTimehr').val();
        var ref_startdt_min = $('#load_StartTimemin').val();
        ref_newstartdt = ref_startdt.add({
            minutes: ref_startdt_min,
            hours: ref_startdt_hr
        });
        var start_dt = ref_newstartdt.toString("ddd, dd MMM yyyy H:mm:ss");

        //var resp_id = $('#sel_tbl_list').val();
        var resp_id = 0;
        var mdid = 0;
        var ref_rem = $('#ref_dtremarksid_').val();
        if (ref_rem == "") {//empty remarks
            ref_rem = "No remarks";
            $.ajax({
                url: serverpath + '/Refinery/ref_savedowntime/',
                data: {
                    mdid: mdid,
                    current_dt: current_dt,
                    ref_mid: ref_mid,
                    ref_resid: ref_resid,
                    stop_dt: stop_dt,
                    start_dt: start_dt,
                    mins_val: mins_val,
                    ref_rem: ref_rem,
                    resp_id: resp_id,
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    var mid_ = parseInt(data[0].MID);
                    if (flag > 1 || flag != "-") {
                        //this is for saving into other table for mid and responsible id
                        var resp_id_1 = $('#sel_tbl_list').val();
                        $.ajax({
                            url: serverpath + '/Refinery/ref_savedowntime_resp/',
                            data: {
                                mid_: mid_,
                                resp_id_1: resp_id_1
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                                //THIS IS FOR SAVING MULTIPLE RESPONSIBLE
                                var container = [];
                                $('#addmult').find("input[id*='append_resid_']").each(function () {
                                    var resp_id1 = $(this).val();

                                    container.push({
                                        mid_: mid_,
                                        resp_id1: resp_id1,
                                    });
                                });
                                if (container.length != 0) {

                                    container = JSON.stringify({ 'container': container });
                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        type: 'POST',
                                        url: serverpath + '/Refinery/ref_tablesavedowntime/',
                                        data: container,
                                        success: function (data) {
                                            load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                                            append_responsible();
                                            alert("Data succesfully save!");
                                            $('#ref_selMachineID').val("");
                                            $('#ref_machine_code').text("-");
                                            $('#ref_trouble_code').text("-");
                                            $('#ref_trouble_desc').text("-");
                                            $('#sel_tbl_list').val("");
                                            $('#ref_downtimemins_id').val("0");
                                            $('#ref_dtremarksid_').val("");
                                            $('#responsible_id').val("");
                                            $('#responsible_id').prop("disabled", true);
                                            $('#dt_eachid').text("");
                                            $('#cnt_id').text("");
                                            $('#save_flag').text("-");
                                            $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                                if ($(this).val() != null || $(this).val() != "") {
                                                    $(this).closest('tr').remove();
                                                }
                                            });
                                        }
                                    })
                                }
                            }
                        });
                    } else if (flag == 1 || flag == "-") {
                        var resp_id_1 = $('#sel_tbl_list').val();
                        $.ajax({
                            url: serverpath + '/Refinery/ref_savedowntime_resp/',
                            data: {
                                mid_: mid_,
                                resp_id_1: resp_id_1
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                                load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                                append_responsible();
                                alert("Data succesfully save!");
                                $('#ref_selMachineID').val("");
                                $('#ref_machine_code').text("-");
                                $('#ref_trouble_code').text("-");
                                $('#ref_trouble_desc').text("-");
                                $('#sel_tbl_list').val("");
                                $('#ref_downtimemins_id').val("0");
                                $('#ref_dtremarksid_').val("");
                                $('#responsible_id').val("");
                                $('#responsible_id').prop("disabled", true);
                                $('#dt_eachid').text("");
                                $('#cnt_id').text("");
                                $('#save_flag').text("-");
                                $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                    if ($(this).val() != null || $(this).val() != "") {
                                        $(this).closest('tr').remove();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else { // not empty remarks
            $.ajax({
                url: serverpath + '/Refinery/ref_savedowntime/',
                data: {
                    mdid: mdid,
                    current_dt: current_dt,
                    ref_mid: ref_mid,
                    ref_resid: ref_resid,
                    stop_dt: stop_dt,
                    start_dt: start_dt,
                    mins_val: mins_val,
                    ref_rem: ref_rem,
                    resp_id: resp_id
                },

                type: 'POST',
                cache: false,
                success: function (data) {
                    var mid_ = parseInt(data[0].MID);
                    if (flag > 1 || flag != "-") {
                        //this is for saving into other table for mid and responsible id
                        var resp_id_1 = $('#sel_tbl_list').val();
                        $.ajax({
                            url: serverpath + '/Refinery/ref_savedowntime_resp/',
                            data: {
                                mid_: mid_,
                                resp_id_1: resp_id_1
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                                //THIS IS FOR SAVING MULTIPLE RESPONSIBLE
                                var container = [];
                                $('#addmult').find("input[id*='append_resid_']").each(function () {
                                    var resp_id1 = $(this).val();

                                    container.push({
                                        mid_: mid_,
                                        resp_id1: resp_id1,
                                    });
                                });
                                if (container.length != 0) {

                                    container = JSON.stringify({ 'container': container });
                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        type: 'POST',
                                        url: serverpath + '/Refinery/ref_tablesavedowntime/',
                                        data: container,
                                        success: function (data) {
                                            load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                                            append_responsible();
                                            alert("Data succesfully save!");
                                            $('#ref_selMachineID').val("");
                                            $('#ref_machine_code').text("-");
                                            $('#ref_trouble_code').text("-");
                                            $('#ref_trouble_desc').text("-");
                                            $('#sel_tbl_list').val("");
                                            $('#ref_downtimemins_id').val("0");
                                            $('#ref_dtremarksid_').val("");
                                            $('#responsible_id').val("");
                                            $('#responsible_id').prop("disabled", true);
                                            $('#dt_eachid').text("");
                                            $('#cnt_id').text("");
                                            $('#save_flag').text("-");
                                            $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                                if ($(this).val() != null || $(this).val() != "") {
                                                    $(this).closest('tr').remove();
                                                }
                                            });
                                        }
                                    })
                                }
                            }
                        });
                    } else if (flag == 1 || flag == "-") {
                        var resp_id_1 = $('#sel_tbl_list').val();
                        $.ajax({
                            url: serverpath + '/Refinery/ref_savedowntime_resp/',
                            data: {
                                mid_: mid_,
                                resp_id_1: resp_id_1
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                                load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                                append_responsible();
                                alert("Data succesfully save!");
                                $('#ref_selMachineID').val("");
                                $('#ref_machine_code').text("-");
                                $('#ref_trouble_code').text("-");
                                $('#ref_trouble_desc').text("-");
                                $('#sel_tbl_list').val("");
                                $('#ref_downtimemins_id').val("0");
                                $('#ref_dtremarksid_').val("");
                                $('#responsible_id').val("");
                                $('#responsible_id').prop("disabled", true);
                                $('#dt_eachid').text("");
                                $('#cnt_id').text("");
                                $('#save_flag').text("-");
                                $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                    if ($(this).val() != null || $(this).val() != "") {
                                        $(this).closest('tr').remove();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    } else {//else flag//normal SAVING DOWNTIME
        var mins_val = $('#ref_downtimemins_id').val();
        var ref_dt = new Date($('#ref_DowntimeAddCurrentDate_ID').val());
        var ref_dt_hr = $('#load_RefCurrentTIDhour').val();
        var ref_dt_min = $('#load_RefCurrentTIDminutes').val();
        ref_newdt = ref_dt.add({
            minutes: ref_dt_min,
            hours: ref_dt_hr
        });
        var current_dt = ref_newdt.toString("ddd, dd MMM yyyy H:mm:ss");

        var ref_mid = $('#ref_selMachineID').val();
        var ref_resid = $('#hidden_tcode_id').text();

        var ref_stopdt = new Date($('#ref_DowntimeTimeStop_ID').val());
        var ref_stopdt_hr = $('#load_TimeStophr').val();
        var ref_stopdt_min = $('#load_TimeStophrmin').val();
        ref_newstopdt = ref_stopdt.add({
            minutes: ref_stopdt_min,
            hours: ref_stopdt_hr
        });
        var stop_dt = ref_newstopdt.toString("ddd, dd MMM yyyy H:mm:ss");

        var ref_startdt = new Date($('#ref_DowntimeStartTime_ID').val());
        var ref_startdt_hr = $('#load_StartTimehr').val();
        var ref_startdt_min = $('#load_StartTimemin').val();
        ref_newstartdt = ref_startdt.add({
            minutes: ref_startdt_min,
            hours: ref_startdt_hr
        });
        var start_dt = ref_newstartdt.toString("ddd, dd MMM yyyy H:mm:ss");

        //var resp_id = $('#sel_tbl_list').val();
        var resp_id = 0;
        var mdid = 0;
        var ref_rem = $('#ref_dtremarksid_').val();
        if (ref_rem == "") {//empty remarks
            ref_rem = "No remarks";
            $.ajax({
                url: serverpath + '/Refinery/ref_savedowntime/',
                data: {
                    mdid: mdid,
                    current_dt: current_dt,
                    ref_mid: ref_mid,
                    ref_resid: ref_resid,
                    stop_dt: stop_dt,
                    start_dt: start_dt,
                    mins_val: mins_val,
                    ref_rem: ref_rem,
                    resp_id: resp_id,
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    //this is for saving into other table for mid and responsible id
                    var mid_ = parseInt(data[0].MID);
                    var resp_id_1 = $('#sel_tbl_list').val();
                    $.ajax({
                        url: serverpath + '/Refinery/ref_savedowntime_resp/',
                        data: {
                            mid_: mid_,
                            resp_id_1: resp_id_1
                        },
                        type: 'POST',
                        cache: false,
                        success: function (data) {
                            load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                            append_responsible();
                            alert("Data succesfully save!");
                            $('#ref_selMachineID').val("");
                            $('#ref_machine_code').text("-");
                            $('#ref_trouble_code').text("-");
                            $('#ref_trouble_desc').text("-");
                            $('#sel_tbl_list').val("");
                            $('#ref_downtimemins_id').val("0");
                            $('#ref_dtremarksid_').val("");
                            $('#responsible_id').val("");
                            $('#responsible_id').prop("disabled", true);
                            $('#dt_eachid').text("");
                            $('#cnt_id').text("");
                            $('#save_flag').text("-");
                            $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                if ($(this).val() != null || $(this).val() != "") {
                                    $(this).closest('tr').remove();
                                }
                            });

                        }
                    });
                }
            });
        } else { // not empty remarks
            $.ajax({
                url: serverpath + '/Refinery/ref_savedowntime/',
                data: {
                    mdid: mdid,
                    current_dt: current_dt,
                    ref_mid: ref_mid,
                    ref_resid: ref_resid,
                    stop_dt: stop_dt,
                    start_dt: start_dt,
                    mins_val: mins_val,
                    ref_rem: ref_rem,
                    resp_id: resp_id
                },

                type: 'POST',
                cache: false,
                success: function (data) {
                    //this is for saving into other table for mid and responsible id
                    var mid_ = parseInt(data[0].MID);
                    var resp_id_1 = $('#sel_tbl_list').val();
                    $.ajax({
                        url: serverpath + '/Refinery/ref_savedowntime_resp/',
                        data: {
                            mid_: mid_,
                            resp_id_1: resp_id_1
                        },
                        type: 'POST',
                        cache: false,
                        success: function (data) {
                            load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                            append_responsible();
                            alert("Data succesfully save!");
                            $('#ref_selMachineID').val("");
                            $('#ref_machine_code').text("-");
                            $('#ref_trouble_code').text("-");
                            $('#ref_trouble_desc').text("-");
                            $('#sel_tbl_list').val("");
                            $('#ref_downtimemins_id').val("0");
                            $('#ref_dtremarksid_').val("");
                            $('#responsible_id').val("");
                            $('#responsible_id').prop("disabled", true);
                            $('#dt_eachid').text("");
                            $('#cnt_id').text("");
                            $('#save_flag').text("-");
                            $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
                                if ($(this).val() != null || $(this).val() != "") {
                                    $(this).closest('tr').remove();
                                }
                            });
                        }
                    })
                }
            });
        }
    }
}
function edited_ref_downtimerecord() {
    var cnter_ = $('#track_cntAddRes').text();

    var ref_curdt = new Date($('#ref_editcurdate_id').val());
    var ref_curdt_hr = $('#ref_curedit_hr').val();
    var ref_curdt_min = $('#ref_curedit_min').val();
    ref_curnewdt = ref_curdt.add({
        minutes: ref_curdt_min,
        hours: ref_curdt_hr
    });
    var editcurrent_dt = ref_curnewdt.toString("ddd, dd MMM yyyy H:mm:ss");
    //------------compressed--------------------//
    var ref_etimeidstop = new Date($('#ref_editdtstop_id').val());
    var ref_etimeidstop_hr = $('#load_editTimeStophr').val();
    var ref_etimeidstop_min = $('#load_editTimeStopmin').val();
    ref_edtimeidstop = ref_etimeidstop.add({
        minutes: ref_etimeidstop_min,
        hours: ref_etimeidstop_hr
    });
    var edittstop_dt = ref_edtimeidstop.toString("ddd, dd MMM yyyy H:mm:ss");
    //-------------compressed-------------------//

    var ref_etimeidstart = new Date($('#ref_editdtstart_id').val());
    var ref_etimeidstart_hr = $('#load_editStartTimehr').val();
    var ref_etimeidstart_min = $('#load_editStartTimemin').val();
    ref_edtimeidstart = ref_etimeidstart.add({
        minutes: ref_etimeidstart_min,
        hours: ref_etimeidstart_hr
    });
    var edittstart_dt = ref_edtimeidstart.toString("ddd, dd MMM yyyy H:mm:ss");
    //-----------compressed-------------------//
    var ref_machineid = $('#ref_seleditmachineid').val();
    var ref_cnumid = $('#ref_seleditreasonid').val();
    var ref_remarksid = $('#ref_editdtremarksid').val();

    var ref_dtminsid = $('#ref_editdowntimemins_id').val();
    //var ref_respid = $('#ref_selResponsible').val();
    var ref_respid = 0;
    var ref_hide_id = $('#hidden_machineid_edit').text();

    $.ajax({
        url: serverpath + '/Refinery/edited_ref_downtimerecord/',
        data: {
            ref_hide_id: ref_hide_id,
            editcurrent_dt: editcurrent_dt,
            ref_machineid: ref_machineid,
            ref_cnumid: ref_cnumid,
            edittstop_dt: edittstop_dt,
            edittstart_dt: edittstart_dt,
            ref_dtminsid: ref_dtminsid,
            ref_remarksid: ref_remarksid,
            ref_respid: ref_respid
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            var mid_ = parseInt(data[0].MID);
            //this is for saving into other table for mid and responsible id
            //THIS IS FOR SAVING MULTIPLE RESPONSIBLE   
            var container = [];
            $('#loadeditResp').find("select[id*='tridrespsd_']").each(function () {
                var resp_id_1 = $(this).val();
                container.push({
                    mid_1: mid_,
                    resp_id_1: resp_id_1,
                });
            });
            if (container.length != 0) {

                container = JSON.stringify({ 'container': container });
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: serverpath + '/Refinery/ref_tablesavedowntime_edt/',
                    data: container,
                    success: function (data) {
                        if (cnter_ != "") {
                            var container = [];
                            $('#loadeditResp').find("select[id*='add_resp_id']").each(function () {
                                var resp_id_1 = $(this).val();
                                container.push({
                                    mid_1: mid_,
                                    resp_id_1: resp_id_1,
                                });
                            });
                            if (container.length != 0) {

                                container = JSON.stringify({ 'container': container });
                                $.ajax({
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: 'json',
                                    type: 'POST',
                                    url: serverpath + '/Refinery/ref_tablesavedowntime_edt_adding/',
                                    data: container,
                                    success: function (data) {
                                        load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                                        $('#DialogEDITnewdowntime_Select').dialog('close');
                                        alert("Data succesfully edited!");
                                        $('#track_cntAddRes').text("");
                                    }
                                })
                            }

                        } else {
                            load_allMachineDowntime($('#ref_downtimemonitoringid').val());
                            $('#DialogEDITnewdowntime_Select').dialog('close');
                            alert("Data succesfully edited!");
                        }
                    }
                })
            }

        }
    });
}

function ref_editdowntime_diff() {
    var ref_timeidstop = new Date($('#ref_editdtstop_id').val());
    var ref_timeidstop_hr = $('#load_editTimeStophr').val();
    var ref_timeidstop_min = $('#load_editTimeStopmin').val();


    var ref_timeidstart = new Date($('#ref_editdtstart_id').val());
    var ref_timeidstart_hr = $('#load_editStartTimehr').val();
    var ref_timeidstart_min = $('#load_editStartTimemin').val();

    edit_stop_date = ref_timeidstop.add({
        minutes: ref_timeidstop_min,
        hours: ref_timeidstop_hr
    });

    edit_start_date = ref_timeidstart.add({
        minutes: ref_timeidstart_min,
        hours: ref_timeidstart_hr
    });

    var dt = Math.floor((edit_start_date - edit_stop_date) / 60000);
    var h = Math.floor(dt / 60);
    var m = dt % 60;
    var diffdowntime_edit = (h + '.' + m);
    $('#ref_editdowntimemins_id').val(dt);
}
function validate_add_dt() {
    //selected_checkbox = $("input[type='checkbox']:checked").length;
    //if (selected_checkbox == 0) {
    //    alert("Please check empty fields and checkboxes")
    //} else {
    var val_machineid = $('#ref_selMachineID').val();
    var val_reasonid = $('#hidden_tcode_id').text();
    var val_dtmins = $('#ref_downtimemins_id').val();
    //$('#tbl_idcheckminrem').find("input[name*='chk_']:checked").each(function () {
    //    var responsible_val = $(this).val();
    //    var x = parseInt($(this).closest('td').next().find('input').val());
    //    var getid_minsval_val = $(this).closest('td').next().find('input').attr('id');
    //    var ref_rem_val = $('#' + getid_minsval_val).closest('td').next().find('textarea').val();

    //    var mins = [];
    //    var total = 0;
    //    for (var i = 0; i < mins.length; i++) {
    //        total += mins[i];
    //    }
    if (val_machineid == "") {
        alert("Please select machine")
    } else if (val_reasonid == "") {
        alert("Please select trouble reasons from the list")
    } else if ((val_dtmins <= 0) || (val_dtmins == "")) {
        alert("Invalid! Start time must be greater than Stop time")
    }
        //else if (val_dtmins != total) {
        //    alert("Invalid! Total breakdown minutes is not equal to total downtime minutes")
        //}
    else {
        ref_savedowntime();
    }
    //});

}
//}

function validate_edit_dt() {

    var val_ref_cnumid = $('#ref_seleditreasonid').val();
    var val_ref_dtminsid = $('#ref_editdowntimemins_id').val();
    var val_ref_respid = $('#ref_selResponsible').val();
    var val_ref_remarksid = $('#ref_editdtremarksid').val();

    if (val_ref_cnumid == "") {
        alert("Please select trouble description!");
    } else if (val_ref_dtminsid == "") {
        alert("Please select start time!");
    } else if (val_ref_dtminsid <= 0) {
        alert("Invalid! Start time must be greater than or equal to time stop!");
    } else if (val_ref_respid == "") {
        alert("Please input responsibility! eg.Mechanical, Electrical etc.");
    } else if (val_ref_remarksid == "") {
        alert("Please input a remarks!");
    } else {

        edited_ref_downtimerecord();
    }
}

function delete_downtime_data(ActId_) {
    message = 'Are you sure you want to delete this record ?';

    var answer = confirm(message);

    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_downtime_data/',
            data: {
                action_id: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                load_allMachineDowntime($('#ref_downtimemonitoringid').val());
            }
        });
    }
}
function ref_loadallreason_dt() {

    $.ajax({
        url: serverpath + '/Refinery/ref_loadallreason_dt/',
        data: {
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#ref_reason_id td').parent().remove();
            $.each(data, function (index, value) {
                $('#ref_reason_id tr:last').after('<tr id="trid_' + value.REFTH_MDReasonId + '">'
                    + '<td title="Code"> ' + value.REFTH_MDReasonCode + '</td>'
                    + '<td title="Description">' + value.REFTH_MDReasonDesc + '</td></tr>'
                    //+ '<td align="center"><a href="#" onclick="(' + value.REFTH_MDReasonId + ');return false;"><img src="/Content/edit_btn.gif"></a></td>'
                    //+ '<td><a href="#" onclick="(' + value.REFTH_MDReasonId + ');return false;"><img width="26" src="/Content/del.png"></a></td></tr>'

                 );
            });
            //paginate('ref_reason_id', 10)
        }
    });
}
function ref_searchany_dt(search_id, tbl_name) {

    $(search_id).keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(tbl_name), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}
function dt_minutesvalue(min_id) {
    var minutesvalue = $('#' + min_id).text();
    var hm = minutesvalue / 60;
    alert("Number of hours:\t" + hm);
}

function ref_searchany_reason(search_reason, tbl_namer) {

    $(search_reason).keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(tbl_namer), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}
function ref_ifExistCode() {
    //var reason_code = document.getElementById('#ref_reasoncode_id').val();
    var reason_code = $('#ref_reasoncode_id').val();

    $.ajax({
        url: serverpath + '/Refinery/ref_ifExistCode/',
        data: {
            reason_code: reason_code
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.REFTH_MDReasonId > 0) {
                alerta = 'Code already exist! Are you sure you want to update the data?';
                var msg = confirm(alerta)
                if (msg) {
                    var rid = data.REFTH_MDReasonId
                    var ref_rcode = $('#ref_reasoncode_id').val();
                    var ref_rcodedesc = $('#ref_reasoncodedesc_id').val();
                    $.ajax({

                        url: serverpath + '/Refinery/ref_savereason/',
                        data: {
                            ref_rcode: ref_rcode,
                            ref_rcodedesc: ref_rcodedesc,
                            rid: rid
                        },
                        type: 'POST',
                        cache: false,
                        success: function (data) {
                            //$('#DialogADDnewdowntimereason_Select').dialog('close');
                            //ref_loadallreason_dt($('#ref_reason_id').val())
                            alert('Data has been successfuly Save!');
                            //$('#DialogADDnewdowntimereason_Select').dialog('open');
                            $('#ref_reasoncode_id').val('');
                            $('#ref_reasoncodedesc_id').val('');
                            rid = '';
                        }
                    });
                }
            } else {
                var rrid = '';
                var rref_rcode = $('#ref_reasoncode_id').val();
                var rref_rcodedesc = $('#ref_reasoncodedesc_id').val();
                $.ajax({

                    url: serverpath + '/Refinery/ref_savereason/',
                    data: {
                        ref_rcode: rref_rcode,
                        ref_rcodedesc: rref_rcodedesc,
                        rid: rrid
                    },
                    type: 'POST',
                    cache: false,
                    success: function (data) {
                        //$('#DialogADDnewdowntimereason_Select').dialog('close');
                        alert('Data has been successfuly Save!');
                        //$('#DialogADDnewdowntimereason_Select').dialog('open');
                        //ref_loadallreason_dt();
                        $('#ref_reasoncode_id').val('');
                        $('#ref_reasoncodedesc_id').val('');

                    }
                });

            }

        }
    });
}
function ref_val_reason() {
    var val_ref_rescod = $('#ref_reasoncode_id').val();
    var val_ref_rescoddesc = $('#ref_reasoncodedesc_id').val();

    if (val_ref_rescod == "") {
        alert("Opps!Reason Code field is empty!");
    } else if (val_ref_rescoddesc == "") {
        alert("Opps!Description field is empty!");
    } else {

        ref_ifExistCode();
    }
}
//New
function ref_loadallreason_dtime() {

    var mid_ = $('#ref_selMachineID').val();

    $.ajax({
        url: serverpath + '/Refinery/ref_loadallreason_dtime/',
        data: {
            mid_: mid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#ref_load_reasons td').parent().remove();
            $.each(data, function (index, value) {
                $('#ref_load_reasons tr:last').after('<tr id="trid_' + value.REFTH_MDReasonId + '">'
                    + '<td style="text-align:center;font-weight:bold;font-size:14px; border: 1px solid #e1e1e1 !important;"> ' + value.REFTH_MDReasonCode + '</td>'
                    + '<td class="get_prev" style=" border: 1px solid #e1e1e1 !important;">' + value.REFTH_MDReasonDesc + '</td>'
                    + '<td class="get_prev" style=" border: 1px solid #e1e1e1 !important;">' + value.REFTH_ResponsibleDesc + '</td>'
                    + '<td style="text-align:center;width:20px; border: 1px solid #e1e1e1 !important;"><a style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="edit_ref_downtimereason(' + value.REFTH_MDReasonId + ');return false;">&#x270E</a></td></tr>'
                 );
            });
            //paginate('ref_reason_id', 10)
        }
    });
}
function ref_loadallreason_dtime_def() {

    $.ajax({
        url: serverpath + '/Refinery/ref_loadallreason_dtime_def/',

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#ref_load_reasons td').parent().remove();
            $.each(data, function (index, value) {
                $('#ref_load_reasons tr:last').after('<tr id="trid_' + value.REFTH_MDReasonId + '">'
                    + '<td  style="text-align:center;font-weight:bold;font-size:14px; border: 1px solid #e1e1e1 !important;"> ' + value.REFTH_MDReasonCode + '</td>'
                    + '<td  class="get_prev"style=" border: 1px solid #e1e1e1 !important;">' + value.REFTH_MDReasonDesc + '</td>'
                    + '<td class="get_prev" style=" border: 1px solid #e1e1e1 !important;">' + value.REFTH_ResponsibleDesc + '</td>'
                    + '<td  style="text-align:center;width:20px; border: 1px solid #e1e1e1 !important;"><a style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="edit_ref_downtimereason(' + value.REFTH_MDReasonId + ');return false;">&#x270E</a></td></tr>'
                 );
            });
            //paginate('ref_reason_id', 10)
        }
    });
}
function edit_ref_downtimereason(dt_id_) {

    var partialview_link = serverpath + "/Refinery/edit_ref_downtimereason/?actionid_=" + dt_id_;
    $('#Dialog_EditDTreason_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
function trigger_select() {

    var mid_ = $('#ref_selMachineID').val();
    $.ajax({
        url: serverpath + '/Refinery/trigger_select/',
        data: {
            mid_: mid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $("#ref_reasoncode > option").remove();
            $("#ref_reasoncode").append("<option value='0'>--Select--</option>");

            $.each(data, function (index, value) {

                $("#ref_reasoncode").append("<option value=" + value.REFTH_MDReasonId + ">" + value.REFTH_MDReasonCode + "</option>");
                //$('#ref_trouble_desc').text(value.REFTH_MDReasonDesc);

                //remove duplicate data in selectbox
                var SelectMachine = {};
                $("#ref_reasoncode > option").each(function () {
                    if (SelectMachine[this.value]) {
                        $(this).remove();
                    } else {
                        SelectMachine[this.value] = this.text;
                    }
                });

            });
        }
    });
}
function trigger_machinecode_select() {

    var mid_code = $('#ref_selMachineID').val();

    if (mid_code == "") {
        ref_loadallreason_dtime();
        $('#ref_machine_code').text("-")
    } else if (mid_code == 4 || mid_code == 3) {

        $.ajax({
            url: serverpath + '/Refinery/trigger_machinecode_select/',
            data: {
                mid_code: mid_code
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_machine_code').text(value.REFTH_MachineCode);
                });
            }
        });

    } else {
        $.ajax({
            url: serverpath + '/Refinery/trigger_machinecode_select/',
            data: {
                mid_code: mid_code
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_machine_code').text(value.REFTH_MachineCode);
                });
            }
        });

    }
}
$("#ref_load_reasons tr").live("click", function () {

    var param = $(this).attr('id');
    var getp = param.replace("trid_", "");
    var ids = getp;
    $('#sel_tbl_list').prop("disabled", false);
    $.ajax({
        url: serverpath + '/Refinery/trans_codeto_label/',
        data: {
            ids: ids
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#ref_trouble_code').text(value.REFTH_MDReasonCode);
                $('#ref_trouble_desc').text(value.REFTH_MDReasonDesc);
                $('#hidden_tcode_id').text(value.REFTH_MDReasonId);
                //$('#coderesponsible_id').text(value.REFTH_ResponsibleDesc);
                $('#sel_tbl_list').val(value.REFTH_ResponsibleId);
            });
        }
    });
});

function rem_keypress($this) {
    $('#tbl_idcheckminrem').find("input[name*='chk_']:checked").each(function () {
        var responsible = $(this).val();
        var mins_id = $(this).closest('td').next().find('input').attr("id");
        var rem_val = $("#" + mins_id).closest('td').next().find('textarea').val();
        if (rem_val == "" || rem_val == null) {
            $("#ref_addDowntime_id").prop('disabled', true);
        }
        else {
            $("#ref_addDowntime_id").prop('disabled', false);
        }
    });
}
function ref_edit_new_reason_() {
    var edit_newres_code = $('#edit_res_code').val();
    var edit_newres_desc = $('#edit_res_desc').val();
    var edit_newres_codeid = $('#hidden_reasonid').text();
    var edit_newres_machid = $('#hidden_machineid').text();
    var edit_newres_respid = $('#ref_editresp').val();
    if (edit_newres_desc == "") {
        alert("Invalid! Make sure to enter description!")
    } else {
        $.ajax({
            url: serverpath + '/Refinery/ref_edit_new_reason_/',
            data: {
                edit_code: edit_newres_code,
                edit_desc: edit_newres_desc,
                edit_codeid: edit_newres_codeid,
                edit_machid: edit_newres_machid,
                edit_respid: edit_newres_respid,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                ref_loadallreason_dtime_def();
                $('#Dialog_EditDTreason_Select').dialog('close');
                alert('Data succesfully edit! Refresh to see changes.');

            }
        });
    }
}
function ref_searchany_res(search_idres, ref_load_reasons) {

    $(search_idres).keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(ref_load_reasons), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}
function trigger_machinecode_select_edit() {

    var mid_code = $('#ref_seleditreasonid').val();

    //if (mid_code == "") {
    //    ref_loadallreason_dtime();
    //    $('#ref_machine_code').text("-")
    if (mid_code == 4 || mid_code == 3) {

        $.ajax({
            url: serverpath + '/Refinery/trigger_machinecode_select_edit/',
            data: {
                mid_code: mid_code
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_troubledesc').text(value.REFTH_MDReasonDesc);
                });
            }
        });

    } else {
        $.ajax({
            url: serverpath + '/Refinery/trigger_machinecode_select_edit/',
            data: {
                mid_code: mid_code
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_troubledesc').text(value.REFTH_MDReasonDesc);
                });
            }
        });

    }
}
function AddTreason_Select() {

    var partialview_link = serverpath + '/Refinery/AddTreason_Select';
    $('#Dialog_AddTreason_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
function trigger_troublemcode_select() {

    var mid_ = $('#ref_troublemid').val();

    if (mid_ == "") {
        $('#ref_tmcode').text("-")
    } else if (mid_ == 4 || mid_ == 3) {

        $.ajax({
            url: serverpath + '/Refinery/trigger_troublemcode_select/',
            data: {
                mid_: mid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_tmcode').text(value.REFTH_MachineCode);
                });
            }
        });

    } else {
        $.ajax({
            url: serverpath + '/Refinery/trigger_troublemcode_select/',
            data: {
                mid_: mid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#ref_tmcode').text(value.REFTH_MachineCode);
                });
            }
        });

    }
}


function load_block_prod_plan_month() {

    $.ajax({
        url: serverpath + '/Refinery/load_block_prod_plan_month/',
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#rppmothly_crop1_data_tbl td').parent().remove();
            $('#rppmothly_crop2_data_tbl td').parent().remove();
            $('#rppmothly_crop3_data_tbl td').parent().remove();
            $('#rppmothly_crop4_data_tbl td').parent().remove();
            $.each(data, function (index, value) {
                $('#rppmothly_crop1_data_tbl tr:last').after('<tr class="rppmtr">'
                        + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                        + '<td class="dfault_crop"><input id="ppm_crop_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                       //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                       );
                $('#rppmothly_crop2_data_tbl tr:last').after('<tr class="rppmtr">'
                       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                      );
                $('#rppmothly_crop3_data_tbl tr:last').after('<tr class="rppmtr">'
                       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                      );
                $('#rppmothly_crop4_data_tbl tr:last').after('<tr class="rppmtr">'
                       + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '_crop" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '_datetime" type="text" class="extratbl_input rppm_datetime" readonly="readonly" onclick="load_popup_rppeditdate(' + value.REFTH_BlockId + ');return false;"/></td>'
                       + '<td class="dfault_crop"><input id="ppm_crop_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input" onkeypress="return NumericOnly(event)" value=""/></td>'
                      //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                      //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                      );
            });
            var date = $('#ref_rppm_date').val();
            load_data_prod_plan_month(date);
            navigate_cursor_with_arrow_keys();
        }
    });

}


function load_data_prod_plan_month() {
    $('#rppmothly_crop1_data_tbl').find('input[id*="ppm_"]').each(function () {
        $(this).val("");
    });
    $('#rppmothly_crop2_data_tbl').find('input[id*="ppm_"]').each(function () {
        $(this).val("");
    });
    $('#rppmothly_crop3_data_tbl').find('input[id*="ppm_"]').each(function () {
        $(this).val("");
    });
    $('#rppmothly_crop4_data_tbl').find('input[id*="ppm_"]').each(function () {
        $(this).val("");
    });
    var monthyear = $('#ref_rppm_date').val();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_plan_month/',
        data: { monthyear: monthyear },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#ppm_crop_1_' + value.REFTH_BlockNo1 + '_crop').val(value.REFTH_CropNo);
                $('#ppm_crop_1_' + value.REFTH_BlockNo2 + '_crop').val(value.REFTH_CropNo);
                $('#ppm_crop_1_' + value.REFTH_BlockNo1 + '_datetime').val(formatDate(value.REFTH_DateStart));
                $('#ppm_crop_1_' + value.REFTH_BlockNo2 + '_datetime').val(formatDate(value.REFTH_DateStart));

            });
        }
    });

}

function load_block_prod_plan_daily() {

    $.ajax({
        url: serverpath + '/Refinery/load_block_prod_plan_month/',
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#rpp_tbl_daily td').parent().remove();
            $.each(data, function (index, value) {
                $('#rpp_tbl_daily tr:last').after('<tr class="rppmtr">'
                        + '<td class="rfc_tbltd">' + value.REFTH_BlockNo + '</td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'

                        + '<td class="dfault_crop"><input id="ppd_1_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_2_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_3_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_4_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_5_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_6_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_7_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_8_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_9_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_10_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_11_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_12_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_13_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_14_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_15_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_16_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_17_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_18_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_19_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_20_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_21_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_22_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_23_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_24_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_25_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_26_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_27_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_28_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_29_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_30_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_31_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_32_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_33_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_34_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_35_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_36_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_37_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_38_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_39_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_40_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_41_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_42_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_43_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_44_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_45_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_46_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_47_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_48_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_49_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_50_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_51_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_52_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_53_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_54_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_55_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_56_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_57_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_58_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_59_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_60_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_61_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_62_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_63_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_64_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_65_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_66_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_67_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_68_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_69_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_70_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_71_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_72_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_73_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_74_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_75_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_76_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_77_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_78_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_79_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_80_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_81_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_82_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_83_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_84_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_85_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_86_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_87_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_88_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_89_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_90_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_91_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_92_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_93_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_94_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_95_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppd_96_' + value.REFTH_BlockId + '" type="text" class="extratbl_input ppd_input"  value=""/></td>'
                        + '<td class="dfault_crop"><input id="ppdremarks_97_' + value.REFTH_BlockId + '" type="text" class="extratbl_input"  value=""/></td>'
                //+ '<td class="crop_del_btn"><a href="#" onclick="delete_cropshorts_data(' + 1 + ');return false;">Delete</a></td>'
                //+ '<td class="crop_edit_btn"><a href="#" onclick="edit_cropshorts_data(' + 1 + ');return false;">Edit</a></td></tr>'
                       );

            });
            navigate_cursor_with_arrow_keys();
        }
    });
}
function upperCaseF(a) {
    a.value = a.value.toUpperCase();
    check_rpp_input($(a).val(), $(a));
}

function check_limit_rppd_input(input, dom) {
    var isValid = true;
    var count = 0;

    var isBreak = false;
    var $this = dom;

    var $prev_td = $this.closest('td').prev('td');
    var prev_td_val = $prev_td.find('input').val();
    if (input.indexOf(prev_td_val) > -1 && prev_td_val != "") {
        isValid = false;
    }

    return isValid;
}
function load_refineryproducitonplan_graph() {
    $("#load_production_by_block").val(0);
    drawChart_plan();
    drawChart_actual();
}
function load_production_by_block() {
    drawChart_planbyblock();
    drawChart_actualbyblock();
}

//----production plan chart function-----//
//    'ST': '#00b300',//GREEN
//    'CP': '#ffea00',//YELLOW
//    'EF': '#cc0000',//RED
//    'LT': '#0080ff',//BLUE
//    'AC': '#a5682a',//BROWN
//    'MD': '#861286',//VIOLET
//    'KR': '#ffa500',//ORANGE
//   'OFF': '#000000'//BLACK

function drawChart_plan() {

    var container = document.getElementById('timeLineGraph_plan');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();


    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_graphdata/',
        data: {
            select_date: select_date,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                // assumes "word" is a string and "count" is a number
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {

                    var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                    var sdate = str_sdate.split(',');
                    var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                    var edate = str_edate.split(',');

                    dataTable.addRow([' Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);

                });

                //$.ajax({
                //    url: serverpath + '/Refinery/get_productionplan_graphdata/',
                //    data: { select_date: select_date },
                //    type: 'POST',
                //    cache: false,
                //    success: function (data) {

                //        $.each(data, function (index, value) {

                //            var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                //            var sdate = str_sdate.split(',');
                //            var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                //            var edate = str_edate.split(',');

                //            dataTable.addRow([value.REFTH_PPId + ' Block ' + value.REFTH_BlockId + ' Actual', value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1], sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1], edate[2], edate[3], edate[4]), ]);

                //        });

                //    }

                //});

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                    //width: '500px',
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);

                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    edit_prodact_direct_data_(rowno, select_date)
                }
            } else {
                $("#timeLineGraph_plan").text("Nothing to display.");
            }
        }
    });




    //var container = document.getElementById('timeLineGraph');
    //var chart = new google.visualization.Timeline(container);
    //var dataTable = new google.visualization.DataTable();

    //dataTable.addColumn({ type: 'string', id: 'Role' });
    //dataTable.addColumn({ type: 'string', id: 'Name' });
    //dataTable.addColumn({ type: 'string', role: 'style' });
    //dataTable.addColumn({ type: 'date', id: 'Start' });
    //dataTable.addColumn({ type: 'date', id: 'End' }); 
    //str_startdate = startdate.replace(/^"|"$/g, '');
    //str_enddate = enddate.replace(/^"|"$/g, '');

    //dataTable.addRows([

    //   [block, actcode, colorstyle, new Date(2017, 01, 1, 8, 03), new Date(2017, 01, 1, 8, 05)]

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #2', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #2', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #2', 'EF', '#cc0000', new Date(2017, 0, 1, 7, 12), new Date(2017, 0, 1, 8, 11)],

    //]);
    //var rowHeight = 41;
    //var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
    //var options = {
    //    timeline: {
    //        groupByRowLabel: true,
    //        rowLabelStyle: {
    //            fontName: 'Roboto Condensed',
    //            fontSize: 14,
    //            color: '#333333'
    //        },
    //        barLabelStyle: {
    //            fontName: 'Roboto Condensed',
    //            fontSize: 14
    //        }
    //    },
    //    avoidOverlappingGridLines: true,
    //    height: chartHeight,
    //    width: '100%',
    //};

    //chart.draw(dataTable, options);
}

function drawChart_planbyblock() {

    var container = document.getElementById('timeLineGraph_plan');
    var chart = new google.visualization.Timeline(container);

    var select_date = $('#rpp_daily_date').val();
    var thisblock = $('#load_production_by_block').val();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_graphdatablock/',
        data: {
            select_date: select_date,
            thisblock: thisblock
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockId != null) {
                        var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow([' Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);

                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    edit_prodact_direct_data_(rowno, select_date)
                }
            } else {
                $("#timeLineGraph_plan").text("Nothing to display.");
            }
        }
    });
}





function drawChart_actual() {

    var container = document.getElementById('timeLineGraph_actual');
    var chart = new google.visualization.Timeline(container);


    var select_date = $('#rpp_daily_date').val();


    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_graphdata_Actual/',
        data: {
            select_date: select_date,

        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                // assumes "word" is a string and "count" is a number
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockId != null) {
                        var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow(['Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                //$.ajax({
                //    url: serverpath + '/Refinery/get_productionplan_graphdata/',
                //    data: { select_date: select_date },
                //    type: 'POST',
                //    cache: false,
                //    success: function (data) {

                //        $.each(data, function (index, value) {

                //            var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                //            var sdate = str_sdate.split(',');
                //            var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                //            var edate = str_edate.split(',');

                //            dataTable.addRow([value.REFTH_PPId + ' Block ' + value.REFTH_BlockId + ' Actual', value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1], sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1], edate[2], edate[3], edate[4]), ]);

                //        });

                //    }

                //});

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                    //width: '500px',
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);

                chart.draw(dataTable, options);
                //google.visualization.events.addListener(chart, 'select', click_edit);
                //function click_edit() {
                //    var selection = chart.getSelection();
                //    var message = '';
                //    var rowno = '';
                //    for (var i = 0; i < selection.length; i++) {
                //        var item = selection[i];
                //        if (item.row != null && item.column != null) {
                //            var str = dataTable.getFormattedValue(item.row, item.column);
                //            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.row != null) {
                //            var str = dataTable.getFormattedValue(item.row, 0);
                //            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.column != null) {
                //            var str = dataTable.getFormattedValue(0, item.column);
                //            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                //            rowno += item.row;
                //        }
                //    }
                //    if (message == '') {
                //        message = 'nothing';
                //    }
                //    alert(rowno);
                //}
            } else {
                $("#timeLineGraph_actual").text("Nothing to display.");
            }
        }
    });
}


function load_sample() {
    var container = document.getElementById('timeLineGraph_sample');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'Role' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    var items = [{
        block: '1',
        code: 'ST',
        color: '#00b300',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 05',
        flag: 'Plan'
    }, {
        block: '1',
        code: 'ST',
        color: '#00b300',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 15',
        flag: 'Actual'
    }, {
        block: '2',
        code: 'KR',
        color: '#ffa500',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 05',
        flag: 'Plan'
    }, {
        block: '2',
        code: 'KR',
        color: '#ffa500',
        startdate: '2017, 0, 1, 8, 03',
        enddate: '2017, 0, 1, 8, 10',
        flag: 'Actual'
    }];

    for (var i = 0; i < items.length; i++) {

        var str_date = items[i].startdate;
        var sdate = str_date.split(',');
        var end_date = items[i].enddate;
        var edate = end_date.split(',');

        if (items[i].flag == "Plan") {

            dataTable.addRows([
                             ["Plan " + items[i].block, items[i].code, items[i].color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4])
                             ],
            ]);
        } else {
            dataTable.addRows([
                    ["Actual " + items[i].block, items[i].code, items[i].color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4])
                    ],
            ]);

        }
    }
    //dataTable.addRows([
    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #1', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #1', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #1', 'LT', '#0080ff', new Date(2017, 0, 1, 7), new Date(2017, 0, 1, 9)],

    //['Block #2', 'ST', '#00b300', new Date(2017, 0, 1, 8, 03), new Date(2017, 0, 1, 8, 05)],
    //['Block #2', 'KR', '#ffa500', new Date(2017, 0, 1, 8, 45), new Date(2017, 0, 1, 9)],
    //['Block #2', 'EF', '#cc0000', new Date(2017, 0, 1, 7, 12), new Date(2017, 0, 1, 8, 11)],

    //]);
    var rowHeight = 41;
    var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
    var options = {
        timeline: {
            groupByRowLabel: true,
            rowLabelStyle: {
                fontName: 'Roboto Condensed',
                fontSize: 14,
                color: '#333333'
            },
            barLabelStyle: {
                fontName: 'Roboto Condensed',
                fontSize: 14
            }
        },
        avoidOverlappingGridLines: true,
        height: chartHeight,
        width: '100%',
    };

    chart.draw(dataTable, options);
}


function drawChart_actualbyblock() {

    var container = document.getElementById('timeLineGraph_actual');
    var chart = new google.visualization.Timeline(container);


    var select_date = $('#rpp_daily_date').val();
    var thisblock = $('#load_production_by_block').val();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_graphdatablock_Actual/',
        data: {
            select_date: select_date,
            thisblock: thisblock
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockId != null) {
                        var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow(['Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });
                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: true,
                    height: chartHeight,
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);
                chart.draw(dataTable, options);
                //google.visualization.events.addListener(chart, 'select', click_edit);
                //function click_edit() {
                //    var selection = chart.getSelection();
                //    var message = '';
                //    var rowno = '';
                //    for (var i = 0; i < selection.length; i++) {
                //        var item = selection[i];
                //        if (item.row != null && item.column != null) {
                //            var str = dataTable.getFormattedValue(item.row, item.column);
                //            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.row != null) {
                //            var str = dataTable.getFormattedValue(item.row, 0);
                //            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                //            rowno += item.row;
                //        } else if (item.column != null) {
                //            var str = dataTable.getFormattedValue(0, item.column);
                //            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                //            rowno += item.row;
                //        }
                //    }
                //    if (message == '') {
                //        message = 'nothing';
                //    }
                //    alert(rowno);
                //}
            } else {
                $("#timeLineGraph_actual").text("Nothing to display.");
            }
        }
    });
}


function drawChart_dataweek(iMonth, iYear) {

    var container = document.getElementById('timeLineGraph_week');
    var chart = new google.visualization.Timeline(container);
    var thisdate = $("#rpp_input_date").val();

    $.ajax({
        url: serverpath + '/Refinery/get_productionplan_dataweek/',
        data: {
            thisdate: thisdate
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            if (data.length != 0) {
                $(".ref_text_label").removeAttr('style');
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Role' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'string', role: 'style' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });

                $.each(data, function (index, value) {
                    if (value.REFTH_BlockId != null) {
                        var str_sdate = format_RP_Date(value.REFTH_ProductionStartDate);
                        var sdate = str_sdate.split(',');
                        var str_edate = format_RP_Date(value.REFTH_ProductionEndDate);
                        var edate = str_edate.split(',');

                        dataTable.addRow(['Block ' + value.REFTH_BlockId, value.REFTH_ActCode, value.REFTH_Style_Color, new Date(sdate[0], sdate[1] - 1, sdate[2], sdate[3], sdate[4]), new Date(edate[0], edate[1] - 1, edate[2], edate[3], edate[4]), ]);
                    }
                });

                var rowHeight = 50;
                var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                var options = {
                    timeline: {
                        groupByRowLabel: true,
                        rowLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12,
                            color: '#333333'
                        },
                        barLabelStyle: {
                            fontName: 'verdana',
                            fontSize: 12
                        }
                    },
                    avoidOverlappingGridLines: false,
                    height: chartHeight,
                };

                var view = new google.visualization.DataView(dataTable);
                view.setColumns([0, 1, 2, 3, 4, ]);
                chart.draw(dataTable, options);
                google.visualization.events.addListener(chart, 'select', click_edit);
                function click_edit() {
                    var selection = chart.getSelection();
                    var message = '';
                    var rowno = '';
                    for (var i = 0; i < selection.length; i++) {
                        var item = selection[i];
                        if (item.row != null && item.column != null) {
                            var str = dataTable.getFormattedValue(item.row, item.column);
                            message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.row != null) {
                            var str = dataTable.getFormattedValue(item.row, 0);
                            message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
                            rowno += item.row;
                        } else if (item.column != null) {
                            var str = dataTable.getFormattedValue(0, item.column);
                            message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
                            rowno += item.row;
                        }
                    }
                    if (message == '') {
                        message = 'nothing';
                    }
                    //alert(rowno);
                }
            } else {
                $("#timeLineGraph_week").text("Nothing to display.");
            }
        }
    });
}


function format_RP_Date(theDate) {

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
        return parseInt(date.getFullYear()) + ',' + parseInt(date.getMonth() + 1) + ',' + parseInt(date.getDate()) + ',' + parseInt(date.getHours()) + ',' + parseInt(datemin);
    }
}

$('.ref_code_desc_td').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();

    var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

    Refinery_ActivityCode(actcode_val, '#' + dialogparent);



    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');


    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

});

function Refinery_ActivityCode(actcode_val, dialogname) {

    $(dialogname + ' #REFTH_PP_Actcode').val(actcode_val);
    $(dialogname + ' #REFTH_ActCodeDesc').html('Invalid Code.');
    $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "#FFFFCC" });
    $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "black" });
    var con_time = $(dialogname + ' #error_msg_time_ref').text();
    $.ajax({
        url: serverpath + '/Refinery/Refinery_ActivityCode/',

        data: {
            actcode_param: actcode_val
        },
        type: 'post',
        cache: false,
        success: function (data) {
            var con_desc = $(dialogname + ' #REFTH_ActCodeDesc').text(data.REFTH_ActCodeDesc);
            $(dialogname + ' #REFTH_PP_Actcode_Id').text(data.REFTH_PPcodeId);
            if (con_desc == "Invalid Code." || con_time == "ERROR: End Time is lesser than or equal to Start Time.") {
                $(dialogname + ' #btn_prod').attr('disabled', true);
            } else {
                $(dialogname + ' #btn_prod').attr('disabled', false);
            }
            if (data.REFTH_ActCode == actcode_val) {
                $(dialogname + ' #REFTH_PP_Actcode').css({ "background-color": "" + data.REFTH_Style_Color + "" });
                $(dialogname + ' #REFTH_PP_Actcode').css({ "color": "white" });
            }
            validation_ref_prodact_add();
            validation_ref_prodact_edit("REFTH_PP_Actcode");
        }
    });
}
function upperCase_actcode(a) {
    a.value = a.value.toUpperCase();
}

function load_data_prod_act() {
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}
function load_data_prod_act_bydate(id) {
    var date_val = $("#" + id).val();
    var monthyear = $("#rpp_input_date").val();
    var block_val = $("#load_production_by_block").val();
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_bydate/',
        data: {
            date_val: date_val,
            monthyear: monthyear,
            block_val: block_val
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}
function load_data_prod_act_byblock(id) {
    var block_val = $("#" + id).val();
    var monthyear = $("#rpp_input_date").val();
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_byblock/',
        data: {
            block_val: block_val,
            monthyear: monthyear
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}


function load_data_prod_act_bymonthyear(select) {
    $('#ref_prod_act_table td').parent().remove();
    $.ajax({
        url: serverpath + '/Refinery/load_data_prod_act_bymonthyear/',
        data: {
            monthyear: select
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                var note = value.REFTH_Remarks == null ? "-" : value.REFTH_Remarks;
                $('#ref_prod_act_table tr:last').after('<tr><td class="dfault_crop">'
                    + value.REFTH_BlockId + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCode + '</td>'
                    + '<td class="dfault_crop">' + value.REFTH_ActCodeDesc + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionStartDate) + '</td>'
                    + '<td class="dfault_crop">' + formatDate(value.REFTH_ProductionEndDate) + '</td>'
                    + '<td class="dfault_crop">' + note + '</td>'
                    + '<td class="crop_del_btn"><a href="#" onclick="delete_prodact_data(' + value.REFTH_PPId + ');return false;">Delete</a></td>'
                    + '<td class="crop_edit_btn"><a href="#" onclick="edit_prodact_data(' + value.REFTH_PPId + ');return false;">Edit</a></td></tr>'
                    );
                paginate('ref_prod_act_table', 30);
            });
        }
    });
}

function add_ref_prodact() {

    var ref_id = '';
    var blockid = $('#Dialog_prod_add_activity #blockid').val();
    var REFTH_PP_Actcode_Id = $('#Dialog_prod_add_activity #REFTH_PP_Actcode_Id').text();
    var ref_prodact_note = $("#Dialog_prod_add_activity #ref_prodact_note").val();

    var s_date = new Date($('#Dialog_prod_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_prod_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_prod_add_activity #start_time_min_ref_add_act').val();

    var end_date = new Date($('#Dialog_prod_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_prod_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_prod_add_activity #end_time_min_ref_add_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/add_ref_prodact/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                start_date: start_date,
                end_date: end_date,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_prod_add_activity').dialog('close');
                alert('Data now saved.');
                load_data_prod_act();
            }
        });
    }
}

function edit_ref_prodact($this) {

    var dialogparent = "#" + $($this).closest('div.ui-dialog-content').attr('id');

    var ref_id = $(dialogparent + " #REFTH_PPId").text();
    var blockid = $(dialogparent + ' #blockid').val();
    var REFTH_PP_Actcode_Id = $(dialogparent + ' #REFTH_PP_Actcode_Id').text();
    var ref_prodact_note = $(dialogparent + " #ref_prodact_note").val();

    var s_date = new Date($(dialogparent + ' #start_date_ref_edit_act').val());
    var s_hr = $(dialogparent + ' #start_time_hr_ref_edit_act').val();
    var s_min = $(dialogparent + ' #start_time_min_ref_edit_act').val();

    var end_date = new Date($(dialogparent + ' #end_date_ref_edit_act').val());
    var end_hr = $(dialogparent + ' #end_time_hr_ref_edit_act').val();
    var end_min = $(dialogparent + ' #end_time_min_ref_edit_act').val();

    add_start_date_ = s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date_ = end_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var start_date = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");
    var end_date = add_end_date_.toString("ddd, dd MMM yyyy H:mm:ss ");

    if (blockid == "" || blockid == 0 || REFTH_PP_Actcode_Id == "") {

        alert("Please select block or Activity code.");
    } else {

        $.ajax({
            url: serverpath + '/Refinery/edit_ref_prodact/',
            data: {
                ref_id: ref_id,
                blockid: blockid,
                REFTH_PP_Actcode_Id: REFTH_PP_Actcode_Id,
                start_date: start_date,
                end_date: end_date,
                ref_prodact_note: ref_prodact_note
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                if (dialogparent == "#Dialog_prod_edit_activity") {
                    $('#Dialog_prod_edit_activity').dialog('close');
                    load_data_prod_act();
                } else {
                    $('#Dialog_proddirect_edit_activity').dialog('close');
                    if ($('#load_production_by_block').val() > 0) {
                        load_production_by_block();
                    } else {
                        drawChart_plan();
                        drawChart_actual();
                    }
                }
                alert('Data now saved.');
            }
        });
    }
}
function delete_prodact_data(ActId_) {
    themsg = 'Are you sure you want to delete this ?';
    var answer = confirm(themsg);
    if (answer) {
        $.ajax({
            url: serverpath + '/Refinery/delete_prodact_data/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                load_data_prod_act();
            }
        });
    }
}

function validation_ref_prodact_add() {

    var add_s_date = new Date($('#Dialog_prod_add_activity #start_date_ref_add_act').val());
    var s_hr = $('#Dialog_prod_add_activity #start_time_hr_ref_add_act').val();
    var s_min = $('#Dialog_prod_add_activity #start_time_min_ref_add_act').val();


    var add_e_date = new Date($('#Dialog_prod_add_activity #end_date_ref_add_act').val());
    var end_hr = $('#Dialog_prod_add_activity #end_time_hr_ref_add_act').val();
    var end_min = $('#Dialog_prod_add_activity #end_time_min_ref_add_act').val();
    var con_desc = $('#Dialog_prod_add_activity #REFTH_ActCodeDesc').text();

    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });
    if (con_desc == "Invalid Code.") {
        $('#Dialog_prod_add_activity #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $('#Dialog_prod_add_activity #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_prod_add_activity #btn_prod').attr('disabled', true);
    } else {
        $('#Dialog_prod_add_activity #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_prod_add_activity #btn_prod').attr('disabled', false);

    }

}

function validation_ref_prodact_edit($this) {

    var this_dialog = "#" + $("#" + $this).closest('div.ui-dialog-content').attr('id');

    var add_s_date = new Date($(this_dialog + ' #start_date_ref_edit_act').val());
    var s_hr = $(this_dialog + ' #start_time_hr_ref_edit_act').val();
    var s_min = $(this_dialog + ' #start_time_min_ref_edit_act').val();


    var add_e_date = new Date($(this_dialog + ' #end_date_ref_edit_act').val());
    var end_hr = $(this_dialog + ' #end_time_hr_ref_edit_act').val();
    var end_min = $(this_dialog + ' #end_time_min_ref_edit_act').val();
    var con_desc = $(this_dialog + ' #REFTH_ActCodeDesc').text();


    add_start_date = add_s_date.add({
        minutes: s_min,
        hours: s_hr
    });

    add_end_date = add_e_date.add({
        minutes: end_min,
        hours: end_hr
    });
    if (con_desc == "Invalid Code.") {
        $(this_dialog + ' #btn_prod').attr('disabled', true);
    } else if (add_end_date <= add_start_date || add_start_date >= add_end_date) {
        $(this_dialog + ' #error_msg_time_ref').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $(this_dialog + ' #btn_prod').attr('disabled', true);
    } else {
        $(this_dialog + ' #error_msg_time_ref').html('Correct: <b>Time</b> is Good.');
        $(this_dialog + ' #btn_prod').attr('disabled', false);

    }

}
function searchin_ref_prodact(search_id, tblname) {
    $(search_id).keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($(tblname), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
}
function trigger_getMaxCode_select() {
    var str;
    var maxcode = 0;
    var letter;
    var con;
    var number = 0;
    var tmid_ = $('#ref_troublemid').val();
    if (tmid_ == "") {
        $('#ref_maxtcode').val("-")
    } else if (tmid_ == 4 || tmid_ == 3) {

        $.ajax({
            url: serverpath + '/Refinery/trigger_getMaxCode_select/',
            data: {
                tmid_: tmid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                str = data.REFTH_MDReasonCode;
                str = str.replace(/[^0-9]+/ig, "");//Outputs '123....n'
                number = parseInt(str) + 1;
                letter = 'CN';
                con = letter + '' + number
                $('#ref_maxtcode').val(con)
            }
        });

    } else if (tmid_ == 1) {
        $.ajax({
            url: serverpath + '/Refinery/trigger_getMaxCode_select/',
            data: {
                tmid_: tmid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                str = data.REFTH_MDReasonCode;
                str = str.replace(/[^0-9]+/ig, "");//Outputs '123....n'
                number = parseInt(str) + 1;
                letter = 'C';
                con = letter + '' + number
                $('#ref_maxtcode').val(con)

            }
        });
    } else if (tmid_ == 2) {
        $.ajax({
            url: serverpath + '/Refinery/trigger_getMaxCode_select/',
            data: {
                tmid_: tmid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                str = data.REFTH_MDReasonCode;
                str = str.replace(/[^0-9]+/ig, "");//Outputs '123....n'
                number = parseInt(str) + 1;
                letter = 'A';
                con = letter + '' + number
                $('#ref_maxtcode').val(con)
            }
        });
    } else if (tmid_ == 5) {
        $.ajax({
            url: serverpath + '/Refinery/trigger_getMaxCode_select/',
            data: {
                tmid_: tmid_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                str = data.REFTH_MDReasonCode;
                str = str.replace(/[^0-9]+/ig, "");//Outputs '123....n'
                number = parseInt(str) + 1;
                letter = 'S';
                con = letter + '' + number
                $('#ref_maxtcode').val(con)

            }
        });
    }
}
function partial_savenewtrouble() {
    var maxCODE = $('#ref_maxtcode').val();
    var newCODEDESC = $('#ref_tcodedesc').val();
    var selMID = $('#ref_troublemid').val();
    var tresponid = $('#trespid').val();
    if (maxCODE == "") {
        alert("Invalid, Select a machine first!")
    } else if (newCODEDESC == "") {
        alert("Please supply a trouble code description!")
    } else if (tresponid == "") {
        alert("Please select responsible for inputted trouble!")
    } else {
        $.ajax({
            url: serverpath + '/Refinery/partial_savenewtrouble/',
            data: {
                maxCODE: maxCODE,
                newCODEDESC: newCODEDESC,
                selMID: selMID,
                tresponid: tresponid,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                ref_loadallreason_dtime_def();
                $('#Dialog_AddTreason_Select').dialog('close');
                alert(maxCODE + ' with description' + newCODEDESC + ' has been saved!');

            }
        });
    }
}
function additional_resp() {
    var cnter = parseInt($('#cnt_id').text());
    var rows = $("input[id*='append_res_']").length;
    rows += 1;
    var totdtime = $('#ref_downtimemins_id').val();
    var aresp_id = $('#responsible_id').val();
    var q = totdtime / rows;
    $('#save_flag').text(rows);
    $.ajax({
        url: serverpath + '/Refinery/additional_resp/',
        data: {
            aresp_id: aresp_id
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                for (var j = 1; j <= cnter; j++) {

                    if ($('#append_res_' + j).val() == "") {
                        $('#append_res_' + j).val(value.REFTH_ResponsibleDesc);
                        $('#append_resid_' + j).val(value.REFTH_ResponsibleId);
                        $('#appendRes_id').find("input[id*='append_min_']").each(function () {
                            $(this).val(q.toFixed(2));
                            $('#dt_eachid').text(q.toFixed(2));

                        });

                        break;
                    } else if ($('#append_res_' + j).val() == value.REFTH_ResponsibleDesc) {

                        var subcnter = cnter - 1;
                        $('#cnt_id').text(subcnter);
                        remove_empty_tr()
                        alert("Cant take duplicate responsible");
                        break;

                    } else if ($('#append_res_' + j).val() != value.REFTH_ResponsibleDesc) {
                        //$('#append_res_' + j).val(value.REFTH_ResponsibleDesc);
                        //break;

                    }

                }

            });

        }
    });
}

function AddResponsible_Select() {

    var partialview_link = serverpath + '/Refinery/AddResponsible_Select';
    $('#Dialog_AddResponsible_Select').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
function LoadResponsibleList() {

    $.ajax({
        url: serverpath + '/Refinery/LoadResponsibleList/',
        data: {
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#list_responsibleId td').parent().remove();
            $.each(data, function (index, value) {
                $('#list_responsibleId tr:last').after('<tr id="trid_' + value.REFTH_ResponsibleId + '">'
                    + '<td>' + value.REFTH_ResponsibleDesc + '</td>'
                    + '<td><a style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="EditResponsible(' + value.REFTH_ResponsibleId + ')";return false;">&#x270E;</a></td></tr>'
                     );
            });
        }
    });
}
function AddNewResponsible() {
    var addedit = $('#hide_edit_res').text();
    if (addedit == 0 || addedit == "") {
        var new_resid = $('#new_rid').val();
        $.ajax({
            url: serverpath + '/Refinery/AddNewResponsible/',
            data: {
                new_resid: new_resid
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                LoadResponsibleList();
                $('#new_rid').val("");
                alert(data);
            }
        });
    } else if (addedit > 0) {
        var res_id = $('#hide_edit_res').text();
        var res_desc = $('#new_rid').val();
        $.ajax({
            url: serverpath + '/Refinery/EditNewResponsible/',
            data: {
                res_id: res_id,
                res_desc: res_desc
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                LoadResponsibleList();
                $('#new_rid').val("");
                alert(data);
            }
        });

    }
}
function EditResponsible(rid_) {
    //var edit_resid = $('#new_rid').val();
    $.ajax({
        url: serverpath + '/Refinery/EditResponsible/',
        data: {
            edit_resid: rid_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#ref_add_edit_respon').val("Edit");
                $('#hide_edit_res').text(value.REFTH_ResponsibleId);
                $('#new_rid').val(value.REFTH_ResponsibleDesc);

            });
        }
    });
}
function Key_ups() {
    var x = $('#new_rid').val();
    if (x == "") {
        $('#hide_edit_res').text("")
        $('#ref_add_edit_respon').val('Add');
    }
}
function selectlist_autochange() {
    var getid_ = $('#ref_seleditreasonid').val();
    $.ajax({
        url: serverpath + '/Refinery/selectlist_autochange/',
        data: {
            getid_: getid_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#ref_selResponsible').val(value.REFTH_ResponsibleId);
            });
        }
    });
}
function remove_empty_tr() {
    $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).closest('tr').remove();
        }
    });
}
function remove_check_tr() {
    $('#appendRes_id').find('input[id*="append_res_"]').each(function () {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).closest('tr').remove();
        }
    });
}
function check_prop(id) {

    if ($("input[id*='ckbremove_']").length == $("input[id*='ckbremove_']:checked").length) {
        $("#ckb_all").prop("checked", "checked");
    } else {
        $("#ckb_all").removeAttr("checked");
    }
    return id;
}
function append_responsible() {

    $.ajax({
        url: serverpath + '/Refinery/append_responsible',
        type: 'POST',
        cache: false,
        success: function (data) {
            $('select[id*="tridres_"] > option').remove();
            $.each(data, function (index, value) {
                //$('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + ' - ' + value.Fullname + '</option>');
                $('#tridres_' + value.REFTH_MachineDowntimeId + '').append('<option value=' + value.REFTH_ResponsibleDesc + '>' + value.REFTH_ResponsibleDesc + '</option>');
                //remove duplicate data in selectbox
                var usedNames = {};
                $("#tridres_ > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });
            });
        }
    });
}
function edit_resp_dt(dt_id_) {
    var dt_id_1 = dt_id_
    $.ajax({
        url: serverpath + '/Refinery/edit_resp_dt/',
        data: {
            dt_id_1: dt_id_1,
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#loadeditResp td').parent().remove();
            var cnt = 0;
            $.each(data, function (index, value) {
                //***this code is for calling/displaying data from the controller
                $('#loadeditResp tr:last').after('<tr id="tridresp_' + value.REFTH_ResponsibleId + '" class="trs">'
                    + '<td id="app_edit_add"><select class="respawn selectRound" style="width:175px;" id="tridrespsd_' + cnt + '"><option value="0">--Select--</option></select></td>'
                    //+ '<td><a id="resplistedit" style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="";return false;"></a></td>'
                    + '<td><a id="rem_onclick_' + value.REFTH_ResponsibleId + '" style="font-size:15px;color:rgba(224, 11, 14, 1);"href="#" onclick="delete_resp_edit(' + value.REFTH_ResponsibleId + ',this.id)";return false;">&#x274E;</a></td></tr>'

                   );
                append_responsible_edit(cnt, value.REFTH_ResponsibleId);
                cnt = cnt + 1;

            });
            var count = $("select[id*='tridrespsd_']").length;
            $('#track_cntRes').text(count);
            check_duplicate_selection();
            //&#x270E;
        }

    });

}


function append_responsible_edit(cnt, REFTH_ResponsibleId) {

    $.ajax({
        url: serverpath + '/Refinery/append_responsible_edit',
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                //$('#ref_row_shift').append('<option value=' + value.REFTH_RowNo + '>' + value.REFTH_RowNo + ' - ' + value.Fullname + '</option>');
                $('#tridrespsd_' + cnt).append('<option value=' + value.REFTH_ResponsibleId + '>' + value.REFTH_ResponsibleDesc + '</option>');
                //remove duplicate data in selectbox
                var usedNames = {};
                $("#tridrespsd_" + cnt + " > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });
            $('#tridrespsd_' + cnt).val(REFTH_ResponsibleId);
        }
    });
}
function delete_resp_edit(resp_id, thisid) {
    var track_cnt_res = $('#track_cntRes').text();
    var ref_hide_id = $('#hidden_machineid_edit').text();
    if (track_cnt_res == 1) {

        alert("Opps, unable to delete record!");
        return false;
    } else {
        $.ajax({
            url: serverpath + '/Refinery/delete_resp_edit/',
            data: {
                resp_id: resp_id,
                ref_hide_id: ref_hide_id
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $('#' + thisid).closest("tr").remove();
                alert("Data has been deleted!");
            }
        });
    }
}
function check_duplicate_selection() {

    $(".selectRound").on('change', function (e) {
        var tralse = true;
        var selectRound_arr = []; // for contestant name
        $('.selectRound').each(function (k, v) {
            var getVal = $(v).val();
            //alert(getVal);
            if (getVal && $.trim(selectRound_arr.indexOf(getVal)) != -1) {
                tralse = false;
                //it should be if value 1 = value 1 then alert, and not those if -select- = -select-. how to avoid those -select-
                alert('Responsible must not be thesame!');
                //$(v).val("");
                $("#edit_downtimedata").attr("disabled", "disabled");
                return false;
            } else {
                selectRound_arr.push($(v).val());
                $("#edit_downtimedata").removeAttr("disabled");
            }
        });
        if (!tralse) {
            return false;
        }
    });
}
function append_responsible_edit_add() {
    $("#edit_downtimedata").attr("disabled", "disabled");
    $.ajax({
        url: serverpath + '/Refinery/append_responsible_edit_add',
        type: 'POST',
        cache: false,
        success: function (data) {
            var sel = $('<tr>').appendTo("#loadeditResp");
            var sell = $('<select  id="add_resp_id" class="selectRound"><option value="0">--select--</option>').appendTo(sel);
            var seltd = $('<td>').appendTo(sel);
            $.each(data, function (index, value) {
                sell.append('<option value=' + value.REFTH_ResponsibleId + '>' + value.REFTH_ResponsibleDesc + '</option>');
            });
            seltd.append('<a id="trm_" style="font-size:15px;color:rgba(224, 11, 14, 1);" href="#" osnclick="remove_add_res(this.id);return false;">&#x274E;</a>')
            var count = $("select[id*='add_resp_id']").length;
            $('#track_cntAddRes').text(count);
            check_duplicate_selection();
        }
    });
}
function remove_add_res(thisid) {
    $("#" + thisid).closest("tr").remove();
}

//------------------------------------------------end of function-------------------------------------------------------------////

