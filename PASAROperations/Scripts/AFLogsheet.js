var afserverpath = "";
//var afserverpath = "/PASAROperation";

var selected = 0;
var aflotid_ddl = $('#aflot_ddl').val();
var lastclicked = 0;
var beingclicked = 0;

function SelectProdYear(AFnumId) {

    var prodyearid1 = $(ProdYearlist1).val();
    var prodyearid2 = $(ProdYearlist2).val();

    var prodyearid;

    if (AFnumId == 1) {
        prodyearid = prodyearid1;
    } else if (AFnumId == 2) {
        prodyearid = prodyearid2;
    }


    $.ajax({
        url: afserverpath + '/AnodeFurnace/EditProdYear/',
        data: { afnumid: AFnumId, prodyearid: prodyearid },
        type: 'POST',
        cache: false,
        success: function (data) {
            document.location.href = afserverpath + '/AnodeFurnace/AssignYear';
            alert('Prod Year for AF num:' + AFnumId + 'now saved!');
        }
    });
}

$('#af_createlotnum_btn,#af_createlotnum_btn1').live('click', function () {
    load_partial_createlotnum();
});

$('#createlot_link,#createlot_link1').live('click', function () {
    load_partial_createlotnum();
});
//NewAF
$('#newaf_createlotnum_btn').live('click', function () {
    newload_partial_createlotnum();
});

$('#newcreatelot_link').live('click', function () {
    newload_partial_createlotnum();
});

$('#af_blister_rcv_btn').live('click', function () {
    af_lot_checker('addblister');
});

$('#afblister_link').live('click', function () {
    af_lot_checker('addblister');
});

$('#af_manpower_btn').live('click', function () {
    af_lot_checker('manpower');

});

$('#af_manpower_link').live('click', function () {
    af_lot_checker('manpower');
});

$('#af_stage_btn').live('click', function () {
    af_lot_checker('afstage');

});

$('#af_stage_link').live('click', function () {
    af_lot_checker('afstage');

});

$('#mould_casting_time_btn').live('click', function () {
    af_lot_checker('mould_cast_time');

});

$('#mould_casting_time_link').live('click', function () {
    af_lot_checker('mould_cast_time');

});


$('#casting_time_btn').live('click', function () {
    af_lot_checker('cast_time');

});

$('#casting_time_link').live('click', function () {
    af_lot_checker('cast_time');

});

$('#casting2nd_time_btn').live('click', function () {
    af_lot_checker('cast2nd_time');

});

$('#casting2nd_time_link').live('click', function () {
    af_lot_checker('cast2nd_time');

});




$('#casting_manpower_btn').live('click', function () {
    af_lot_checker('cast_manpower');

});

$('#casting_manpower_link').live('click', function () {
    af_lot_checker('cast_manpower');

});

$('#mreplacement_imgbtn').live('click', function () {
    af_lot_checker('cast_mouldreplace');

});

$('#afqig_imgbtn').live('click', function () {
    af_lot_checker('af_qig');

});

$('#afqig_link').live('click', function () {
    af_lot_checker('af_qig');

});

$('#save_reftargets_btn').live('click', function () {
    af_lot_checker('af_targets');

});

$('#save_reftargets_link').live('click', function () {
    af_lot_checker('af_targets');

});

$('#qig_others_imgbtn').live('click', function () {
    af_lot_checker('qig_others_imgbtn');
});


//--------------add reworked--------------------//
$('#reworked_add_btn').live('click', function () {
    load_partial_reworked();
});

$('#adds_datetime_bp').live('click', function () {
    load_partial_addstartdatetime();
});

$('#adde_datetime_bp').live('click', function () {
    load_partial_addenddatetime();
});
$('#reworked_add_lnk').live('click', function () {
    load_partial_reworked();
});
//-----------------end--------------------------//

//--------------add anode Charged---------------//

$('#ancharged_add_btn').live('click', function () {
    load_partial_anodecharged();
});

$('#ancharged_add_lnk').live('click', function () {
    load_partial_anodecharged();
});

//-------------------end------------------------//






$('#adds_datetime_bp').live('click', function () {
    load_partial_addstartdatetime();
});

$('#adde_datetime_bp').live('click', function () {
    load_partial_addenddatetime();
});



function load_partial_manpower() {

    var partialview_link = afserverpath + "/AnodeFurnace/ManPower_Partial/?aflotid=" + aflotid_ddl;
    $('#Dialog_AFManPower').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_afstage() {

    var partialview_link = afserverpath + "/AnodeFurnace/AFStage_Partial/?aflotid=" + aflotid_ddl;
    $('#Dialog_AFStage').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_createlotnum() {

    var partialview_link = afserverpath + "/AnodeFurnace/CreateLot_Partial";
    $('#Dialog_CreateLotNum').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//NewAF
function newload_partial_createlotnum() {

    var partialview_link = afserverpath + "/AnodeFurnace/NewCreateLot_Partial";
    $('#Dialog_CreateLotNum').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

//-----------------------add reworked-------------------------------//
function load_partial_reworked() {

    var partialview_link1 = afserverpath + "/AnodeFurnace/Add_AFreworked_Partial";
    $('#dialog_reworked_add').load(partialview_link1, function () {
        $(this).dialog('open');
    });

    return false;
}
//---------------------------end-----------------------------------//

//-----------------------add Anode Charged-------------------------//
function load_partial_anodecharged() {

    var partialview_link = afserverpath + "/AnodeFurnace/Add_anodecharged_Partial";
    $('#dialog_ancharged_add').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//--------------------------end------------------------------------//


//-----------------------add reworked-------------------------------//
function load_partial_reworked() {

    var partialview_link1 = afserverpath + "/AnodeFurnace/Add_AFreworked_Partial";
    $('#dialog_reworked_add').load(partialview_link1, function () {
        $(this).dialog('open');
    });

    return false;
}
//---------------------------end-----------------------------------//

//-----------------------add Anode Charged-------------------------//
function load_partial_anodecharged() {

    var partialview_link = afserverpath + "/AnodeFurnace/Add_anodecharged_Partial";
    $('#dialog_ancharged_add').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//--------------------------end------------------------------------//



function load_partial_afblister() {

    var partialview_link = afserverpath + "/AnodeFurnace/Add_AFBlister_Partial";
    $('#Dialog_AFBlisterAdd').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_editlotnum() {

    var partialview_link = afserverpath + "/AnodeFurnace/EditLot_Partial";
    $('#Dialog_EditLotNum').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//NewAF
function load_partial_editlotnum() {

    var partialview_link = afserverpath + "/AnodeFurnace/NewEditLot_Partial";
    $('#Dialog_NewEditLotNum').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_mouldcastingtime() {

    var aflotid = $('#aflot_ddl').val();

    var partialview_link = afserverpath + "/AnodeFurnace/MouldCastingTime_Partial/?aflotid=" + aflotid;

    $('#Dialog_MouldCastingTime').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_castingtime() {

    var aflotid = $('#aflot_ddl').val();

    var partialview_link = afserverpath + "/AnodeFurnace/CastingTime_Partial/?aflotid=" + aflotid;

    $('#Dialog_CastingTime').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_casting2ndtime() {

    var aflotid = $('#aflot_ddl').val();

    var partialview_link = afserverpath + "/AnodeFurnace/Casting2ndTime_Partial/?aflotid=" + aflotid;

    //$('#Dialog2nd_CastingTime').load(partialview_link, function () {
    //    $(this).dialog('open');
    //});
    var cast_start1sttime = $('#cast_starttime_td').text();

    if (cast_start1sttime != "-") {
        $('#Dialog2nd_CastingTime').load(partialview_link, function () {
            $(this).dialog('open');
        });
    } else {
        alert('Input 1st Casting Time first.');
    }

    return false;
}

function load_partial_castingmanpower() {

    var partialview_link = afserverpath + "/AnodeFurnace/CastingManPower_Partial/";
    $('#Dialog_CastingManPower').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

function load_partial_castingmouldreplace() {

    var partialview_link = afserverpath + "/AnodeFurnace/CastingMouldReplace_Partial/";
    $('#Dialog_MouldReplace').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


function load_partial_afqig() {

    var partialview_link = afserverpath + "/AnodeFurnace/AFQIG_Partial/";
    $('#Dialog_QIGInspect').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}
//add start date time for blsiter prep
function load_partial_addstartdatetime() {

    var partialview_link = afserverpath + "/AnodeFurnace/StartBlisterDateTime_Partial/";
    $('#Dialog_StartDateTimeBP').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

//add end date time for blister prep
function load_partial_addenddatetime() {

    var partialview_link = afserverpath + "/AnodeFurnace/EndBlisterDateTime_Partial/";
    $('#Dialog_EndDateTimeBP').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


$('#afnum_ddl').live('change', function () {

    var afid = $('#afnum_ddl').val();

    var maxlotaf1 = $('#maxlotaf1').text();
    var maxlotaf2 = $('#maxlotaf2').text();

    if (afid == 1) {

        $('#createlot_span').text(maxlotaf1);

    } else if (afid == 2) {
        $('#createlot_span').text(maxlotaf2);
    }

});

$('#add_clotnum_ok_btn').live('click', function () {

    var afid = $('#afnum_ddl').val();
    var lotnum = $('#createlot_span').text();
    var prodyear;

    if (afid == 1) {

        prodyear = $('#maxaf1prodyear').text();

    } else if (afid == 2) {
        prodyear = $('#maxaf2prodyear').text();
    }


    $.ajax({

        url: afserverpath + '/AnodeFurnace/Add_LotNum/',
        data: {

            af_numid: afid,
            prodyearid: prodyear,
            af_lotnum: lotnum
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            document.location.href = afserverpath + '/AnodeFurnace/AFLotLists';
            alert('Lot now added.');
        }
    });
});

//function view_aflot_edit_partial(afid) {
//    var partialview_link = afserverpath + "/AnodeFurnace/EditLot_Partial/?aflotid=" + afid;
//    $('#Dialog_EditLotNum').load(partialview_link, function () {
//        $(this).dialog('open');
//    });

//    return false;
//}
//NewAF
function view_aflot_edit_partial(afid) {
    if (End_Lot_Validation()) {
        var partialview_link = afserverpath + "/AnodeFurnace/NewEditLot_Partial/?aflotid=" + afid;
        $('#Dialog_NewEditLotNum').load(partialview_link, function () {
            $(this).dialog('open');
        });

        return false;
    }
}

//$('#edit_clotnum_ok_btn').live('click', function () {


//    var aflotid_ = $('#aflotid').text();
//    var afnumid_ = $('#afnum_edit_ddl').val();
//    var afstatusid_ = $('#afstatus_ddl').val();

//    $.ajax({

//        url: afserverpath + '/AnodeFurnace/Edit_AFLot/',
//        data: {

//            af_lotid: aflotid_,
//            afnumid: afnumid_,
//            afstatusid: afstatusid_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {
//            document.location.href = afserverpath + '/AnodeFurnace/CreateLotNo';
//            alert('Lot now edited.');
//        }
//    });
//});
//New AF

$('#newedit_clotnum_ok_btn').live('click', function () {
    save_endlot();
});

function save_endlot() {


    if (End_Lot_Confirmation()) {

        $('#Dialog_NewEditLotNum').dialog('close');
        var aflotid_ = $('#aflotid').text();
        var afnumid_ = $('#afnum_edit_ddl').val();
        var afstatusid_ = $('#afstatus_ddl').val();
        var sday = Date.today().add(-1).days().toString('MM-dd-yyyy');
        var eday = Date.today().toString('MM-dd-yyyy');

        $.ajax({

            url: afserverpath + '/AnodeFurnace/Edit_AFLot/',
            data: {

                af_lotid: aflotid_,
                afnumid: afnumid_,
                afstatusid: afstatusid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                //alert('Changes now saved.');

                load_status_aflot(aflotid_);


            }
        });
    }

}

$('#select_aflot_btn').live('click', function () {


    $('#aflot_div').css({ "background-color": "#FFFFCC" });
    $('input[type="text"], td,textarea,select').css({ "background-color": "#FFFFCC" });
    $('#total').css({ "background-color": "#FFFFFF" });
    selected = 1;
    load_af_page();


});

$('#select_date').live('click', function () {

    //$('#aflot_div').css({ "background-color": "#DE9C39" });
    $('#aflot_div').css({ "background-color": "#FFFFCC" });
    $('tr, input[type="text"], select,option, td').css({ "background-color": "#FFFFCC" });
    $('td.df').css({ "background-color": "#ffffff" });
    $('td input ').removeAttr('disabled');
    $('select').removeAttr('disabled');
    $('#btn_inv').removeAttr('disabled');
    selected = 1;
    load_af_page();
});




function load_af_page() {
    //$('#total').css({ "background-color": "#FFFFFF" });
    var pathname = window.location.pathname;
    var afpage = pathname.replace(afserverpath + '/AnodeFurnace/', '');

    switch (afpage) {

        case 'AFBlisterReceive':
            af_lotdetail();
            load_afblister_tbl();

            break;

        case 'AFRefining':
            af_lotdetail();
            load_afrefining_data();
            load_aflims_data();

            load_aflimstarget_data();
            load_pitarget_data();
            load_afpi_data();



            break;


        case 'AFCasting':
            af_lotdetail();
            load_afcasting_data();

            break;

        case 'AFQIG':
            af_lotdetail_qig();
            qig_remarks_query();
            qig_customer_query();
            qig_others_query();
            qig_weight_query();
            qig_ar_query();
            qig_twc_query();
            load_afqig_data_rework();
            load_afgrade_a();
            load_afgrade_b();
            load_afqig_data_cast();
            load_afqig_data_reject();
            load_afqig_data_rework_cw2();
            load_afqig_data_cast_cw2();
            load_afgrade_a_cw2();
            load_afgrade_b_cw2();
            load_afqig_data_reject_cw2();


            break;

        case "AFTargets":
            af_lotdetail();
            load_targets();
            break;

        case "Inventory":
            load_inventory();
            //findTotals();
            break;

        case "ReworkedAnodes":
            load_reworked_table();

            break;
        case "AnodeCharged":
            load_ancharged_table();

            break;

        case "AnodeReClass":
            load_reclass();
            break;

        case "WeightDistribution":
            load_data_wd_errorlist();
            load_lot_data();
            break;


    }


}


$('#btn_inv').live('click', function () {
    //findTotals();
    //load_inventory_tables();
    var afinv_date_ = $('#thedate').val();
    af_inventory_tbl_data(afinv_date_);
    findTotals_inv();
    specify_cell();
});

function findTotals() {
    $(".af_tbl tr:not(:first)").each(function () {
        row_total = 0;
        $(".add:input", this).each(function () {
            row_total += Number($(this).val());
        });
        if (row_total != 0)
            $(".total", this).attr('value', row_total);
    });

    calculate_totals('ref');
    calculate_totals('lpg');
    calculate_totals('apm');
    calculate_totals('rth');
    calculate_totals('oth');

    calculate_inv_total();
}

function calculate_inv_total() {
    var total = 0;

    //var good = parseInt($('#ref_good_sum_table').val()) + parseInt($('#apm_good_sum_table').val()) + parseInt($('#lpg_good_sum_table').val()) + parseInt($('#rth_good_sum_table').val() + parseInt($('#oth_good_sum_table').val()));

    var gradeA = parseInt($('#ref_gradeA_sum_table').val()) + parseInt($('#apm_gradeA_sum_table').val()) + parseInt($('#lpg_gradeA_sum_table').val()) + parseInt($('#rth_gradeA_sum_table').val() + parseInt($('#oth_gradeA_sum_table').val()));

    var gradeB = parseInt($('#ref_gradeB_sum_table').val()) + parseInt($('#apm_gradeB_sum_table').val()) + parseInt($('#lpg_gradeB_sum_table').val()) + parseInt($('#rth_gradeB_sum_table').val() + parseInt($('#oth_gradeB_sum_table').val()));


    var rew = parseInt($('#ref_rew_sum_table').val()) + parseInt($('#apm_rew_sum_table').val()) + parseInt($('#lpg_rew_sum_table').val()) + parseInt($('#rth_rew_sum_table').val() + parseInt($('#oth_rew_sum_table').val()));
    var reworked = parseInt($('#ref_reworked_sum_table').val()) + parseInt($('#apm_reworked_sum_table').val()) + parseInt($('#lpg_reworked_sum_table').val()) + parseInt($('#rth_reworked_sum_table').val() + parseInt($('#oth_reworked_sum_table').val()));
    var rej = parseInt($('#ref_rej_sum_table').val()) + parseInt($('#apm_rej_sum_table').val()) + parseInt($('#lpg_rej_sum_table').val()) + parseInt($('#rth_rej_sum_table').val() + parseInt($('#oth_rej_sum_table').val()));

    total = gradeA + gradeB + rew + reworked + rej;

    //$('#good_total').val(good);

    $('#gradeA_total').val(gradeA);
    $('#gradeB_total').val(gradeB);

    $('#rew_total').val(rew);
    $('#reworked_total').val(reworked);
    $('#rej_total').val(rej);
    $('#total_total').val(total);
}


function calculate_totals(id) {

    var id_ = id;
    $('#' + id_ + ' tr:not(:first, not:eq(1) td').each(function () {
        var $td = $(this);
        // var goodTotal = 0, reworkableTotal = 0, reworkedTotal = 0, rejectTotal = 0, totalTotal = 0;
        var gradeA = 0, gradeB = 0, reworkableTotal = 0, reworkedTotal = 0, rejectTotal = 0, totalTotal = 0;


        //$('#' + id_ + ' .add[id*="good_"]').each(function () {
        //    goodTotal += Number($(this).val());
        //});
        $('#' + id_ + ' .add[id*="gradeA_"]').each(function () {
            gradeA += Number($(this).val());
        });
        $('#' + id_ + ' .add[id*="gradeB_"]').each(function () {
            gradeB += Number($(this).val());
        });

        $('#' + id_ + ' .add[id*="reworkable_"]').each(function () {
            reworkableTotal += Number($(this).val());
        });
        $('#' + id_ + ' .add[id*="reworked_"]').each(function () {
            reworkedTotal += Number($(this).val());
        });
        $('#' + id_ + ' .add[id*="reject_"]').each(function () {
            rejectTotal += Number($(this).val());
        });
        $('#' + id_ + ' .total[id*="total_"]').each(function () {
            totalTotal += Number($(this).val());
        });


        //$('#' + id_ + '_good_sum_table').val(goodTotal);

        $('#' + id_ + '_gradeA_sum_table').val(gradeA);
        $('#' + id_ + '_gradeB_sum_table').val(gradeB);
        $('#' + id_ + '_rew_sum_table').val(reworkableTotal);
        $('#' + id_ + '_reworked_sum_table').val(reworkedTotal);
        $('#' + id_ + '_rej_sum_table').val(rejectTotal);

        totalTotal = parseInt(gradeA) + parseInt(gradeB) + parseInt(reworkableTotal) + parseInt(reworkedTotal) + parseInt(rejectTotal);
        $('#' + id_ + '_total_sum_table').val(totalTotal);



    });



    $('.tbl_inventory_anode  tr:not(:first, not:eq(1) td').each(function () {

        var ovtotal = 0;
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var e = 0;

        $('.tbl_inventory_anode .add[id*="gradeA_"]').each(function () {
            a += Number($(this).val());
        });
        $('.tbl_inventory_anode .add[id*="gradeB_"]').each(function () {
            b += Number($(this).val());
        });
        $('.tbl_inventory_anode .add[id*="reworkable_"]').each(function () {
            c += Number($(this).val());
        });
        $('.tbl_inventory_anode .add[id*="reworked_"]').each(function () {
            d += Number($(this).val());
        });
        $('.tbl_inventory_anode .add[id*="reject_"]').each(function () {
            e += Number($(this).val());
        });

        $('#gradeA_total').val(a);
        $('#gradeB_total').val(b);
        $('#rew_total').val(c);
        $('#reworked_total').val(d);
        $('#rej_total').val(e);

        ovtotal = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e);

        $('#total_total').val(ovtotal);
    });

}

function load_inventory() {
    clear_inv_tbl();
    clear_inv_select();
    clear_css();
    reload_inv();

    var afinv_date_ = $('#thedate').val();

    //alert(afinv_date_);
    //alert('here');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFInventory_emp_data/',
        data: {
            afinv_date: afinv_date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#af_' + value.AF_ParamId).val(value.EmployeeValue);
                $('#af_' + value.AF_ParamId).val(value.EmployeeValue);
                $('#af_' + value.AF_ParamId).val(value.EmployeeValue);
            });

        }

    });

    $('#gradeA_total').val(0);
    $('#gradeB_total').val(0);
    $('#rew_total').val(0);
    $('#reworked_total').val(0);
    $('#rej_total').val(0);

    af_inventory_tbl_data(afinv_date_);
    findTotals_inv();
    //load_inventory_numtbl(afinv_date_);  
    //load_inventory_strtbl(afinv_date_);


}
//table
function clear_inv_tbl() {
    //alert('test');
    $('.af_tbl input,.tbl_inventory_anode input').each(function () {
        $(this).attr('value', "");
    });


}
//select
function clear_inv_select() {
    //alert('test');
    $('.floating-box select, textarea, .af_tbl input, td').each(function () {
        $(this).attr('value', "");
    });

}
function clear_css() {
    $('.af_tbl, input, td ,select,textarea,.right_div_tbl th,.tbl_inventory_anode input').each(function () {
        $(this).css('background', 'border-color', 'background-color', "");
        $(this).removeClass('changed');


    });
}

function reload_inv() {
    $('.tbl_inventory_anode input').each(function () {
        $(this).css('background-color', '#ffffcc');
    });
}


function load_inventory_numtbl(afinv_date_) {
    //clear_inv_tbl();
    //clear_inv_select();
    //clear_css();
    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFInventory_tblnum_data/',
        data: {
            afinv_date: afinv_date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                //var val = value.PrevDate;
                //var ticks_string = val.substring(6);
                //var ticks_num = parseInt(ticks_string);
                var date = formatDate_only(value.PrevDate);

                //load_inventory_numtbl(date);

                $('#gradeA_' + value.AF_ParamId).attr('value', value.NumValue);
                $('#gradeB_' + value.AF_ParamId).attr('value', value.NumValue);
                $('#total_' + value.AF_ParamId).attr('value', value.NumValue);
                //$('#good_' + value.AF_ParamId).attr('value', value.NumValue);
                $('#reworkable_' + value.AF_ParamId).attr('value', value.NumValue);
                $('#reworked_' + value.AF_ParamId).attr('value', value.NumValue);
                $('#reject_' + value.AF_ParamId).attr('value', value.NumValue);

            });

        }

    });


}

function load_inventory_strtbl(afinv_date_) {
    clear_inv_tbl();
    clear_inv_select();
    clear_css();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFInventory_tblstr_data/',
        data: {
            afinv_date: afinv_date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#goodlot_' + value.AF_ParamId).attr('value', value.StringValue);
                $('#reworkablelot_' + value.AF_ParamId).attr('value', value.StringValue);
                $('#reworkedlot_' + value.AF_ParamId).attr('value', value.StringValue);
                $('#rejectlot_' + value.AF_ParamId).attr('value', value.StringValue);

            });

        }

    });
}

function Save_Inv_Emp() {
    var inventory_date = $('#thedate').val();
    var items = [];

    //$('#ref, #lpg, #apm, #rth, #oth').find('td').each(function () {
    //    $(this).find('input').each(function () {
    //        if ($(this).val() != "") {
    //            var id = $(this).attr('id');
    //            var item = parseInt($(this).attr('id').match(/\d+/));
    //            items.push({
    //                date: inventory_date,
    //                id: item,
    //                Str_Val: getString(item, id),
    //                Num_Val: getNum(item, id)
    //            })
    //        }
    //    });
    //});

    //items = JSON.stringify({ 'items': items });

    //$.ajax({
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: 'json',
    //    type: 'POST',
    //    url: afserverpath + '/AnodeFurnace/Save_Inventory',
    //    data: items,
    //    success: function (data) {
    //        alert('Inventory data now saved.');
    //    }
    //});

    var ins1 = $('#af_86.changed').val();
    var sup1 = $('#af_87.changed').val();
    var rev1 = $('#af_88.changed').val();


    if (ins1) {
        var ins = ins1;
        var sup = $('select#af_87').val();
        var rev = $('select#af_88').val();
    }

    else if (sup1) {
        var sup = sup1;
        var ins = $('select#af_86').val();
        var rev = $('select#af_88').val();
    }

    else if (rev1) {
        var rev = rev1;
        var ins = $('select#af_86').val();
        var sup = $('select#af_87').val();
    }


    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Inv_Emp/',
        data: {
            date: inventory_date,
            empid1: ins,
            empid2: sup,
            empid3: rev,
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Inventory employee now saved.');
            load_inventory();
            $('select').removeClass('changed');
        }
    });

}

function getString(i, id) {
    var str = "";
    var val = $('#' + id).val();

    if (!$.isNumeric(val))
        str = val;
    //alert(i);
    //var str = "";
    //if ($('#goodlot_' + i).val() != "")
    //    str = $('#goodlot_' + i).val();

    //if ($('#reworkablelot_' + i).val() != "")
    //    str = $('#reworkablelot_' + i).val();

    //if ($('#reworkedlot_' + i).val() != "")
    //    str = $('#reworkedlot_' + i).val();

    //if ($('#rejectlot_' + i).val() != "")
    //    str = $('#rejectlot_' + i).val();

    return str;
}

function getNum(i, id) {
    var num = -1;
    var val = $('#' + id).val();

    if ($.isNumeric(val))
        num = val;
    //alert(i);
    //var num = 0;

    //if ($('#total_' + i).val() != "")
    //    num = $('#total_' + i).val();

    //if ($('#good_' + i).val() != "")
    //    num = $('#good_' + i).val();

    //if ($('#reworkable_' + i).val() != "")
    //    num = $('#reworkable_' + i).val();

    //if ($('#reworked_' + i).val() != "")
    //    num = $('#reworked_' + i).val();

    //if ($('#reject_' + i).val() != "")
    //    num = $('#reject_' + i).val();

    return num;
}

function load_targets() {

    var aflotid_ = $('#aflot_ddl').val();

    //$('#edit_target_btn').prop("disabled", false);
    //$('#aftarget_ddl').prop("disabled", false);
    //$("#save_target_btn").prop("disabled", false);
    //$('#savetolot_target_btn').prop('disabled', false);
    //$('#saveasnew_target_btn').prop('disabled', false);

    $.ajax({

        url: afserverpath + '/AnodeFurnace/AFTargets_data/',
        data: {
            aflotid: aflotid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                //alert('success');
                $("#aftarget_ddl").attr('value', value.AF_Target_DefaultId);
            });

            load_aftarget_tbl();
        }
    });

}

$('#aftarget_ddl').live('change', 'prop', function () {

    var target_defid = $('#aftarget_ddl').val();
    $('#aflot_ddl').prop('disabled', false);
    $('#save_target_btn').prop('disabled', false);
    $('#saveasnew_target_btn').prop('disabled', false);

    load_aftarget_tbl();

});

function load_aftarget_tbl() {
    var target_defid = $('#aftarget_ddl').val();
    //alert(target_defid);

    $.ajax({

        url: afserverpath + '/AnodeFurnace/AFTargets_tbl/',
        data: {
            afdefaultid: target_defid
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                //alert(value.AF_ParamId);
                $('#ptargetmin_' + value.AF_ParamId).text("0");
                $('#ptargetmax_' + value.AF_ParamId).text("0");

                $('#ptargetmin_' + value.AF_ParamId).text(value.AFTargetVal_Min);
                $('#ptargetmax_' + value.AF_ParamId).text(value.AFTargetVal_Max);
            });

        }
    });
}

$('#edit_target_btn').live('click', function () {
    $('.select').each(
            function () {
                if ($(this).find('input').length) {
                    $(this).text($(this).find('input').val());
                    $('.xx').html('<img src="/Content/edit_btn.gif" title="Edit">').fadeIn(); $('#edit_target_btn').prop("value", 'Edit');
                }
                else {
                    var t = $(this).text();
                    $(this).html($('<input type="number" onkeypress="return NumericOnly(event)"/>', { 'value': t }).val(t));
                    $('#edit_target_btn').prop("value", 'Done');
                }
            });

    $('input').focus(function () {
        $(this).select();
    });

    $('.selectdate').each(
        function () {
            if ($(this).find('input').length) {
                $(this).text($(this).find('input').val());
            }
            else {
                var t = $(this).text();
                $(this).html($('<input type="date"/>', { 'value': t }).val(t));
                //$('.xx').html('<img src="/Content/done-icon.png">');
            }
        });
});

function save_target(target_defid) {
    var target_defid_ = target_defid
    var targets = [];

    for (i = 123; i <= 158; i++) {
        if (i == 136 || i == 150 || i == 153)
            i++;
        targets.push({
            defid: target_defid_,
            id: i,
            min: $("#ptargetmin_" + i).text(),
            max: $("#ptargetmax_" + i).text()
        })
    }

    targets = JSON.stringify({ 'targets': targets });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/Save_AFTarget',
        data: targets,
        success: function (data) {
            alert('Target data now saved.');
        }
    });

}

$('#save_target_btn').live('click', function () {
    var target_defid_ = $('#aftarget_ddl').val();
    var null_entry = false;
    $('.select').each(function () {
        if ($(this).text() == "") {
            null_entry = true;
            $(this).css({ "border-color": "red" });
        }
    });
    if (!null_entry) {
        save_target(target_defid_);
        $('.select').css({ "border-color": "#C0C0C0" });
        $('.select').css({ "background-color": "white" });
    } else {
        alert('ERROR: All entries must be filled.');
        $('.changed').css({ "border-color": "red" });
    }
});

$('#aflot_ddl').live('change', function () {
    $('#savetolot_target_btn').prop('disabled', false);
    load_targets();
});

$('#savetolot_target_btn').live('click', function () {
    var aflotid_ = $('#aflot_ddl').val();
    var def_targetid_ = $('#aftarget_ddl').val();
    //alert(aflotid_ + " " + def_targetid_)
    $.ajax({
        url: afserverpath + '/AnodeFurnace/SavetoLot_AFTarget/',
        data: {
            aflotid: aflotid_,
            def_targetid: def_targetid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Target data now saved to current Lot No. ' + aflotid_ + '.');
        }
    });
});

$('#saveasnew_target_btn').live('click', function () {
    var date = Date.now();
    var day = date.getDate();
    var month = date.getMonthName();
    var target_name = prompt('Desired name for new Targets.', 'Default Target ' + month + ' ' + day);

    if (target_name != null) {
        $.ajax({
            url: afserverpath + '/AnodeFurnace/SaveNew_AFTarget/',
            data: {
                afdefaultname: target_name
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                var defaultid_;

                $.ajax({
                    url: afserverpath + '/AnodeFurnace/AFTarget_Default/',
                    data: {
                        aftargetname: target_name
                    },

                    type: 'POST',
                    cache: false,
                    success: function (data) {
                        //$.each(data, function (index, value) {
                        defaultid_ = data
                        //});
                        save_target(defaultid_);
                    }
                });
                //alert('New Target Default has been added.');

                $('#aftarget_ddl').prepend("<option value = " + data + ">" + target_name + "</option>");
            }
        });


    }

});


function af_lotdetail() {
    var aflotid_ = $('#aflot_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Select_AFLot/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#afnum_span').text(value.AF_NumId);
                $('#aflot_status_span').text(value.AF_StatusName);
                $('#aflotnum_lbl').text(value.AFLotNo);
                $('#aflotid_').text(value.AF_LotId);

            });
        }
    });

}

function af_lotdetail_qig() {
    var aflotid_ = $('#aflot_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Select_AFLot/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#afnum_span').text(value.AF_NumId);
                $('#aflot_status_span').text(value.AF_StatusName);
                $('#aflotnum_lbl').text(value.AFLotNo);
                $('#aflotid_').text(value.AF_LotId);


                $('#date_cast_qig').text(formatDate_only(value.CastStartTime));
                $('#stime_cast_qig').text(formatDate_time_24h_only(value.CastStartTime));
                $('#etime_cast_qig').text(formatDate_time_24h_only(value.LotEndTime));
                $('#lot_cast_qig').text(value.AFLotNo);

            });
        }
    });

}

function load_afblister_tbl() {

    var aflotid_ = $('#aflot_ddl').val();

    $('#afblister_tbl td').remove();
    $('#afblister_tbl .trdata').remove();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFBlister_Receive_tbl/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            var length = data.length;
            var start_time;
            var end_time;
            $.each(data, function (index, value) {

                $('#afblister_tbl tr:last').after('<tr class = "trdata bls_time"><td id="bls_start">' + formatDate(value.AF_BlisterReceive_StartTime) + '</td><td id="bls_end">' + formatDate(value.AF_BlisterReceive_EndTime) + '</td><td>' + value.ConverterName + '</td><td>' + value.CycleNumber + '</td><td>' + value.AF_BlisterReceive_Wt + '</td><td>' + value.CycleSulfur + '</td><td>' + value.AF_BlisterReceive_Temp + '</td><td><a href="#" onclick="load_afblister_edit(' + value.AF_BlisterReceiveId + ');return false;">&nbsp;&nbsp;&nbsp;<u>Edit</u>&nbsp;&nbsp;&nbsp;</a></td><td><a href="#" onclick="delete_afblister(' + value.AF_BlisterReceiveId + ');return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td></tr>');
                if (index == 0)
                    start_time = value.AF_BlisterReceive_StartTime;
                if (index == length - 1)
                    end_time = value.AF_BlisterReceive_EndTime;
            });
            $('.trboldtop').remove();
            load_afblister_tbl_belowdetails(start_time, end_time);
        }
    });



}

function load_afblister_tbl_belowdetails(s_time, e_time) {

    var aflotid_ = $('#aflot_ddl').val();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/afblister_wt_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#afblister_tbl tr:last').after('<tr class="trboldtop"><td class="text_increase" rowspan = "4" colspan="3">* * * Last blister cycle should be prioritized by crane. Must be 30mins only.</br><label style="margin-left: 20px; width: 100px; float:left;">Delay Reason: </label><select name="delay_blister" id="delay_blister" style="float: left; width: 50%; margin-left: 10px;" disabled="disabled" value="' + data.DelayReasonID + '"></select><img type="button" style="float:right;" id="blstr_dly_savebtn" class="save_btn_img_smalls" src="../Images/diskette.png" title="Save Blister Delay Reason" disabled = "disabled"/></td><td class="td_left_blister"><b>Total</b></td><td id="afblister_total">' + data.AF_BlisterReceive_Wt + '</td><td class="grayarea" rowspan = "4" colspan = "4"></td></tr>' +
        '<tr class = "trdata"><td class="td_left_blister"><b>Slag (MT)</b></td><td class="td_tbox"><div class="afblister_tbox_div"><input type="text" class="afblister_tbox" id= "afblister_slag_tbox" value = ' + data.SkimSlag + ' /></div> <img id="saveafblister_mt_imgbtn" class="save_btn_img_small" src="../Images/diskette.png" disabled="disabled" /></td></tr>' + '<tr class = "trdata"><td class="td_left_blister"><b>AF to AF (MT)</b></td><td><input type="text" class="afblister_tbox" id= "afblister_aftoaf_tbox" value = ' + data.AFtoAF + ' /></td></tr>' + '<tr class = "trdata"><td class="td_left_blister"><b>Net</b></td><td id="afblister_net">' + data.BlisterNet + '</td></tr>');
            var reasonid = data.DelayReasonID;
            $.ajax({
                url: afserverpath + '/AnodeFurnace/Blister_Delay_Reasons/',
                type: 'POST',
                data: { delaygroupid: 4 },
                cache: false,
                success: function (data) {
                    $.each(data, function (index, value) {
                        $('#delay_blister').append($("<option />").val(value.AF_DelayReasonId).text(value.DelayReason));
                    });
                    $('#delay_blister').attr('value', reasonid);
                }
            });

            check_time_gap(s_time, e_time, 'blister');

        }
    });



}

$('#blstr_dly_savebtn').live('click', function () {
    var aflotid_ = $('#aflot_ddl').val();
    var delayreasonid_ = $('#delay_blister').attr('value');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Blister_Delay/',
        data: {
            aflotid: aflotid_,
            delayreasonid: delayreasonid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Blister Delay saved.');
        }
    });

});

function load_afblister_edit(afbrcvid) {

    //alert(afb_rcvid);
    var partialview_link = afserverpath + "/AnodeFurnace/EditAFBlister_Partial/?afbrcvId=" + afbrcvid;
    $('#Dialog_AFBlisterEdit').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


$('#cvnum_ddl').live('change', function () {

    var cvnumid = $('#cvnum_ddl').val();
    $('#cvcycle_ddl').empty();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/CF_Cyles/',
        data: {
            cvid: cvnumid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#cvcycle_ddl').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
            });

        }
    });

});

$('#cvcycle_ddl').live('change', function () {

    var cycid = $('#cvcycle_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Cycle_sulfur/',
        data: {
            cycleid_: cycid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#lbl_sulfur').text(data.CycleSulfur);

        }
    });

});

function delete_afblister(af_brcivid_) {

    var answer = confirm('Are you sure you want to delete this?');



    if (answer) {

        $.ajax({
            url: afserverpath + '/AnodeFurnace/Delete_BlisterReceive/',
            data: {
                af_brcivid: af_brcivid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                load_afblister_tbl();
                alert('Blister Receive now Deleted.');

            }
        });
    }

}

$('#add_afblister_ok_btn').live('click', function () {

    add_afblister();
});

function add_afblister() {

    var aflotid_ = $('#aflotid_').text();
    var cycleid_ = $('#cvcycle_ddl').val();

    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    var add_end_date = new Date($('#end_date_input').val());
    var add_end_min = $('#end_time_min_input').val();
    var add_end_hr = $('#end_time_hr_input').val();

    var add_blister_temp = $('#add_blister_temp').val();
    var add_blister_wt = $('#add_blister_wt').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_end_date = add_end_date.add({
        minutes: add_end_min,
        hours: add_end_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_end_date_ = add_end_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var prev_et;

    prev_et = $('tr.trdata').eq(0).find('td').eq(1).text()
    //alert(prev_et);

    var isValidDate = dateChecker(add_start_date, add_end_date);

    isValidDate = check_prev_process_time(prev_et, isValidDate, add_start_date);

    if (isValidDate == 1 && add_blister_wt > 0 && add_blister_wt <= 300) {

        // alert('test');
        $.ajax({
            url: afserverpath + '/AnodeFurnace/Add_BlisterReceive/',
            data: {
                af_lotid: aflotid_,
                cycleid: cycleid_,
                starttime: add_start_date_,
                endtime: add_end_date_,
                blistertemp: add_blister_temp,
                blisterwt: add_blister_wt
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                $('#Dialog_AFBlisterAdd').dialog('close');

                load_afblister_tbl();
                alert('Blister now added.');
            }
        });

    } else if (isValidDate == 2) {
        alert('Must not input future time.');
    } else if (isValidDate == 1 && add_blister_wt <= 0) {
        alert('Weight must not be equal to 0.');
    } else if (isValidDate == 1 && (add_blister_wt >= 301)) {
        alert('Weight must not be greater than 300.');
    } else if (isValidDate == 4) {
        alert('Input Times must be greater than previous Times');
    } else {
        alert('End Time must be greater than Start Time.');
    }

}



$('#edit_afblister_ok_btn').live('click', function () {

    var afb_rcvid_ = $('#Dialog_AFBlisterEdit #afblister_rcvId').text();
    var cycleid_ = $('#Dialog_AFBlisterEdit #cvcycle_ddl').val();

    var add_start_date = new Date($('#Dialog_AFBlisterEdit #start_date_input_mtapedit').val());
    var add_start_min = $('#Dialog_AFBlisterEdit #start_time_min_input').val();
    var add_start_hr = $('#Dialog_AFBlisterEdit #start_time_hr_input').val();

    var add_end_date = new Date($('#Dialog_AFBlisterEdit #end_date_input_mtapedit').val());
    var add_end_min = $('#Dialog_AFBlisterEdit #end_time_min_input').val();
    var add_end_hr = $('#Dialog_AFBlisterEdit #end_time_hr_input').val();

    var add_blister_temp = $('#Dialog_AFBlisterEdit #add_blister_temp').val();
    var add_blister_wt = $('#Dialog_AFBlisterEdit #add_blister_wt').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_end_date = add_end_date.add({
        minutes: add_end_min,
        hours: add_end_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_end_date_ = add_end_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var prev_et;

    prev_et = $('tr.trdata').eq(1).find('td').eq(1).text()

    var isValidDate = dateChecker(add_start_date, add_end_date);

    if (isValidDate == 1 && add_blister_wt > 0) {

        if (isValidDate == 1 && add_blister_wt > 0 && add_blister_wt <= 300) {

            $.ajax({
                url: afserverpath + '/AnodeFurnace/Edit_BlisterReceive/',
                data: {
                    af_brcivid: afb_rcvid_,
                    cycleid: cycleid_,
                    starttime: add_start_date_,
                    endtime: add_end_date_,
                    blistertemp: add_blister_temp,
                    blisterwt: add_blister_wt
                },

                type: 'POST',
                cache: false,
                success: function (data) {
                    $('#Dialog_AFBlisterEdit').dialog('close');

                    load_afblister_tbl();
                    alert('Blister Receive now Edited.');
                }
            });

        } else if (isValidDate == 2) {
            alert('Must not input future time.');
        } else if (isValidDate == 1 && (add_blister_wt <= 0)) {
            alert('Weight must not be equal to 0.');
        } else if (isValidDate == 1 && (add_blister_wt >= 301)) {
            alert('Weight must not be greater than 300.');
        } else if (isValidDate == 4) {
            alert('Input Times must be greater than previous Times');
        } else {
            alert('End Time must be greater than Start Time.');
        }

    }
});

function load_afrefining_data() {

    var aflotid_ = $('#aflot_ddl').val();
    ////for af phase 2
    //var aflotid_ = $('#lotid').text();

    clear_css();
    clear_delays_css();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFRefining_data/',
        data: {
            aflotid: aflotid_,

        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                $('#stdate_refining').text(formatDate_only_af(value.ST_Skim1st));
                $('#etdate_refining').text(formatDate_only_af(value.ET_Polling));
                $('#sttime_refining').text(formatDate_time_only(value.ST_Skim1st));
                $('#ettime_refining').text(formatDate_time_only(value.ET_Polling));

                $('#stdate_casting').text(formatDate_only_af(value.ST_Casting));
                $('#etdate_casting').text(formatDate_only_af(value.ET_Casting));
                $('#sttime_casting').text(formatDate_time_only(value.ST_Casting));
                $('#ettime_casting').text(formatDate_time_only(value.ET_Casting));

                //Operator
                if (value.ST_ROperator1 == null && value.ST_ROperator2 == null) {
                    $('#st_roperator').text('-');
                }
                else if (value.ST_ROperator2 == '-') {
                    // alert(value.ST_ROperator2);
                    $('#st_roperator').text(value.ST_ROperator1);
                } else {
                    $('#st_roperator').text(value.ST_ROperator1 + ' / ' + value.ST_ROperator2);
                }



                if (value.ET_ROperator1 == null && value.ET_ROperator2 == null) {
                    $('#et_roperator').text('-');
                }
                else if (value.ET_ROperator2 == '-') {
                    $('#et_roperator').text(value.ET_ROperator1);
                } else {
                    $('#et_roperator').text(value.ET_ROperator1 + ' / ' + value.ET_ROperator2);
                }


                if (value.ST_COperator1 == null && value.ST_COperator2 == null) {
                    $('#st_coperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_coperator').text(value.ST_COperator1);
                } else {
                    $('#st_coperator').text(value.ST_COperator1 + ' / ' + value.ST_COperator2);
                }



                if (value.ET_COperator1 == null && value.ET_COperator2 == null) {
                    $('#et_coperator').text('-');
                }
                else if (value.ET_COperator2 == '-') {
                    $('#et_coperator').text(value.ET_COperator1);
                } else {
                    $('#et_coperator').text(value.ET_COperator1 + ' / ' + value.ET_COperator2);
                }

                //Supervisor
                if (value.ST_RSupervisor1 == null && value.ST_RSupervisor2 == null) {
                    $('#st_rsupervisor').text('-');
                }
                else if (value.ST_RSupervisor2 == '-') {
                    $('#st_rsupervisor').text(value.ST_RSupervisor1);
                } else {
                    $('#st_rsupervisor').text(value.ST_RSupervisor1 + ' / ' + value.ST_RSupervisor2);
                }


                if (value.ET_RSupervisor1 == null && value.ET_RSupervisor2 == null) {
                    $('#et_rsupervisor').text('-');
                }
                else if (value.ET_RSupervisor2 == '-') {
                    $('#et_rsupervisor').text(value.ET_RSupervisor1);
                } else {
                    $('#et_rsupervisor').text(value.ET_RSupervisor1 + ' / ' + value.ET_RSupervisor2);
                }

                if (value.ST_CSupervisor1 == null && value.ST_CSupervisor2 == null) {
                    $('#st_csupervisor').text('-');
                }
                else if (value.ST_CSupervisor2 == '-') {
                    $('#st_csupervisor').text(value.ST_CSupervisor1);
                } else {
                    $('#st_csupervisor').text(value.ST_CSupervisor1 + ' / ' + value.ST_CSupervisor2);
                }

                if (value.ET_CSupervisor1 == null && value.ET_CSupervisor2 == null) {
                    $('#et_csupervisor').text('-');
                }
                else if (value.ET_CSupervisor2 == '-') {
                    $('#et_csupervisor').text(value.ET_CSupervisor1);
                } else {
                    $('#et_csupervisor').text(value.ET_CSupervisor1 + ' / ' + value.ET_CSupervisor2);
                }

                $('#st_skim1st').text(formatDate_af(value.ST_Skim1st));
                $('#et_skim1st').text(formatDate_af(value.ET_Skim1st));
                $('#st_skim2nd').text(formatDate_af(value.ST_Skim2nd));
                $('#et_skim2nd').text(formatDate_af(value.ET_Skim2nd));
                $('#st_skimheatup').text(formatDate_af(value.ST_SkimHeatup));
                $('#et_skimheatup').text(formatDate_af(value.ET_SkimHeatup));


                $('#st_oxpartial').text(formatDate_af(value.ST_OxPartial));
                $('#et_oxpartial').text(formatDate_af(value.ET_OxPartial));
                $('#st_ox1st').text(formatDate_af(value.ST_Ox1st));
                $('#et_ox1st').text(formatDate_af(value.ET_Ox1st));
                $('#st_ox2nd').text(formatDate_af(value.ST_Ox2nd));
                $('#et_ox2nd').text(formatDate_af(value.ET_Ox2nd));
                $('#st_oxheatup').text(formatDate_af(value.ST_OxHeatup));
                $('#et_oxheatup').text(formatDate_af(value.ET_OxHeatup));

                $('#st_poll1st').text(formatDate_af(value.ST_Poll1st));
                $('#et_poll1st').text(formatDate_af(value.ET_Poll1st));
                $('#st_poll2nd').text(formatDate_af(value.ST_Poll2nd));
                $('#et_poll2nd').text(formatDate_af(value.ET_Poll2nd));
                $('#st_pollheatup').text(formatDate_af(value.ST_PollHeatup));
                $('#et_pollheatup').text(formatDate_af(value.ET_PollHeatup));

                $('#skimtemp').text(value.TempSkim);
                $('#oxtemp').text(value.TempOx);
                $('#polltemp').text(value.TempPoll);

                $('#textb_westtop').val(value.TopWest);
                $('#textb_westbottom').val(value.BottomWest);
                $('#textb_easttop').val(value.TopEast);
                $('#textb_eastbottom').val(value.BottomEast);


                $('#textb_leadbars').val(value.LeadBars);
                $('#textb_scrapanode').val(evaluate_value(value.ScrapAnode));
                $('#textb_shorttuyere').val(value.ShortTuyere);
                $('#textb_leadanodes').val(value.LeadAnode);


                $('#txtarea_ref_remarks').val(value.RefiningComment);

                $('#delay_skim').multiselect({
                    selectedText: '# reason(s) ',
                });
                $('#delay_ox').multiselect({
                    selectedText: '# reason(s) ',
                });
                $('#delay_poll').multiselect({
                    selectedText: '# reason(s) ',
                });
                //$('#delay_skim').val(value.SkimDelay);
                //$('#delay_ox').val(value.OxDelay);
                //$('#delay_poll').val(value.PollDelay);

                $('#st_blister').text(value.ST_Blister);

                add_delete_buttons(value.ET_Skim1st, value.ET_Skim2nd, value.ET_SkimHeatup,
                                  value.ET_OxPartial, value.ET_Ox1st, value.ET_Ox2nd, value.ET_OxHeatup,
                                  value.ET_Poll1st, value.ET_Poll2nd, value.ET_PollHeatup);

                skim_times(value.ST_Skim1st, value.ET_Skim1st, value.ET_Skim2nd, value.ET_SkimHeatup);
                ox_times(value.ST_OxPartial, value.ST_Ox1st,
                         value.ET_OxPartial, value.ET_Ox1st, value.ET_Ox2nd, value.ET_OxHeatup);
                poll_times(value.ST_Poll1st, value.ET_Poll1st, value.ET_Poll2nd, value.ET_PollHeatup);

                //if (formatDate_af(value.ST_Ox2nd) != "-")
                //    $('#date_entry').html('<span>2nd<span class="remote" title="Deletes 2nd Oxidation dates."><img src="/Content/delete_new.png"></span></span>');

                $('.remote').hide().click(function () {
                    delete_date(aflotid_, $(this).attr('class').replace(' remote', ''));
                    $(this).remove();
                });

                $('.af_tbl tr th').hover(
                function () {
                    $(this).find('.remote').show();
                },
                function () {
                    $(this).find('.remote').hide();
                });
                function clear_css() {
                    $('.af_tbl, input, td ,select').each(function () {
                        $(this).css('background', "");
                    });
                }

            });
            $('#consumable_div .input_textbox').css({ "background-color": "#FFFFCC", "width": "100%" });
            $('#tuyere_div .input_textbox').css({ "background-color": "#FFFFCC", "width": "100%" });
        }

    });

    $.ajax({

        url: serverpath + '/AnodeFurnace/Load_DelayReasons/',
        data: {
            aflotid: aflotid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('input[value*="' + value.DelayReasonID + '"]').attr('checked', 'checked');
            });

        }
    });

    function clear_delays_css() {
        $('.af_tbl select').each(function () {
            $(this).attr('value', "");
        });
        $('#delay_skim_ms').prop('disabled', true);
        $('#delay_ox_ms').prop('disabled', true);
        $('#delay_poll_ms').prop('disabled', true);
    }

}

function load_afrefining_data_phase2() {

    var aflotid_ = $('#aflot_ddl').val();
    //for af phase 2
    var aflotid_ = $('#lotid').text();

    clear_css();
    clear_delays_css();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFRefining_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                $('#stdate_refining').text(formatDate_only_af(value.ST_Skim1st));
                $('#etdate_refining').text(formatDate_only_af(value.ET_Polling));
                $('#sttime_refining').text(formatDate_time_only(value.ST_Skim1st));
                $('#ettime_refining').text(formatDate_time_only(value.ET_Polling));

                $('#stdate_casting').text(formatDate_only_af(value.ST_Casting));
                $('#etdate_casting').text(formatDate_only_af(value.ET_Casting));
                $('#sttime_casting').text(formatDate_time_only(value.ST_Casting));
                $('#ettime_casting').text(formatDate_time_only(value.ET_Casting));

                //Operator
                if (value.ST_ROperator1 == null && value.ST_ROperator2 == null) {
                    $('#st_roperator').text('-');
                }
                else if (value.ST_ROperator2 == '-') {
                    // alert(value.ST_ROperator2);
                    $('#st_roperator').text(value.ST_ROperator1);
                } else {
                    $('#st_roperator').text(value.ST_ROperator1 + ' / ' + value.ST_ROperator2);
                }



                if (value.ET_ROperator1 == null && value.ET_ROperator2 == null) {
                    $('#et_roperator').text('-');
                }
                else if (value.ET_ROperator2 == '-') {
                    $('#et_roperator').text(value.ET_ROperator1);
                } else {
                    $('#et_roperator').text(value.ET_ROperator1 + ' / ' + value.ET_ROperator2);
                }


                if (value.ST_COperator1 == null && value.ST_COperator2 == null) {
                    $('#st_coperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_coperator').text(value.ST_COperator1);
                } else {
                    $('#st_coperator').text(value.ST_COperator1 + ' / ' + value.ST_COperator2);
                }



                if (value.ET_COperator1 == null && value.ET_COperator2 == null) {
                    $('#et_coperator').text('-');
                }
                else if (value.ET_COperator2 == '-') {
                    $('#et_coperator').text(value.ET_COperator1);
                } else {
                    $('#et_coperator').text(value.ET_COperator1 + ' / ' + value.ET_COperator2);
                }

                //Supervisor
                if (value.ST_RSupervisor1 == null && value.ST_RSupervisor2 == null) {
                    $('#st_rsupervisor').text('-');
                }
                else if (value.ST_RSupervisor2 == '-') {
                    $('#st_rsupervisor').text(value.ST_RSupervisor1);
                } else {
                    $('#st_rsupervisor').text(value.ST_RSupervisor1 + ' / ' + value.ST_RSupervisor2);
                }


                if (value.ET_RSupervisor1 == null && value.ET_RSupervisor2 == null) {
                    $('#et_rsupervisor').text('-');
                }
                else if (value.ET_RSupervisor2 == '-') {
                    $('#et_rsupervisor').text(value.ET_RSupervisor1);
                } else {
                    $('#et_rsupervisor').text(value.ET_RSupervisor1 + ' / ' + value.ET_RSupervisor2);
                }

                if (value.ST_CSupervisor1 == null && value.ST_CSupervisor2 == null) {
                    $('#st_csupervisor').text('-');
                }
                else if (value.ST_CSupervisor2 == '-') {
                    $('#st_csupervisor').text(value.ST_CSupervisor1);
                } else {
                    $('#st_csupervisor').text(value.ST_CSupervisor1 + ' / ' + value.ST_CSupervisor2);
                }

                if (value.ET_CSupervisor1 == null && value.ET_CSupervisor2 == null) {
                    $('#et_csupervisor').text('-');
                }
                else if (value.ET_CSupervisor2 == '-') {
                    $('#et_csupervisor').text(value.ET_CSupervisor1);
                } else {
                    $('#et_csupervisor').text(value.ET_CSupervisor1 + ' / ' + value.ET_CSupervisor2);
                }

                $('#st_skim1st').text(formatDate_af(value.ST_Skim1st));
                $('#et_skim1st').text(formatDate_af(value.ET_Skim1st));
                $('#st_skim2nd').text(formatDate_af(value.ST_Skim2nd));
                $('#et_skim2nd').text(formatDate_af(value.ET_Skim2nd));
                $('#st_skimheatup').text(formatDate_af(value.ST_SkimHeatup));
                $('#et_skimheatup').text(formatDate_af(value.ET_SkimHeatup));


                $('#st_oxpartial').text(formatDate_af(value.ST_OxPartial));
                $('#et_oxpartial').text(formatDate_af(value.ET_OxPartial));
                $('#st_ox1st').text(formatDate_af(value.ST_Ox1st));
                $('#et_ox1st').text(formatDate_af(value.ET_Ox1st));
                $('#st_ox2nd').text(formatDate_af(value.ST_Ox2nd));
                $('#et_ox2nd').text(formatDate_af(value.ET_Ox2nd));
                $('#st_oxheatup').text(formatDate_af(value.ST_OxHeatup));
                $('#et_oxheatup').text(formatDate_af(value.ET_OxHeatup));

                $('#st_poll1st').text(formatDate_af(value.ST_Poll1st));
                $('#et_poll1st').text(formatDate_af(value.ET_Poll1st));
                $('#st_poll2nd').text(formatDate_af(value.ST_Poll2nd));
                $('#et_poll2nd').text(formatDate_af(value.ET_Poll2nd));
                $('#st_pollheatup').text(formatDate_af(value.ST_PollHeatup));
                $('#et_pollheatup').text(formatDate_af(value.ET_PollHeatup));

                $('#skimtemp').text(value.TempSkim);
                $('#oxtemp').text(value.TempOx);
                $('#polltemp').text(value.TempPoll);

                $('#textb_westtop').val(value.TopWest);
                $('#textb_westbottom').val(value.BottomWest);
                $('#textb_easttop').val(value.TopEast);
                $('#textb_eastbottom').val(value.BottomEast);


                $('#textb_leadbars').val(value.LeadBars);
                $('#textb_scrapanode').val(evaluate_value(value.ScrapAnode));
                $('#textb_shorttuyere').val(value.ShortTuyere);
                $('#textb_leadanodes').val(value.LeadAnode);

                $('#txtarea_ref_remarks').val(value.RefiningComment);

                $('#delay_skim').multiselect({
                    selectedText: '# reason(s) ',
                });
                $('#delay_ox').multiselect({
                    selectedText: '# reason(s) ',
                });
                $('#delay_poll').multiselect({
                    selectedText: '# reason(s) ',
                });
                //$('#delay_skim').val(value.SkimDelay);
                //$('#delay_ox').val(value.OxDelay);
                //$('#delay_poll').val(value.PollDelay);

                $('#st_blister').text(value.ST_Blister);

                add_delete_buttons(value.ET_Skim1st, value.ET_Skim2nd, value.ET_SkimHeatup,
                                  value.ET_OxPartial, value.ET_Ox1st, value.ET_Ox2nd, value.ET_OxHeatup,
                                  value.ET_Poll1st, value.ET_Poll2nd, value.ET_PollHeatup);

                skim_times(value.ST_Skim1st, value.ET_Skim1st, value.ET_Skim2nd, value.ET_SkimHeatup);
                ox_times(value.ST_OxPartial, value.ST_Ox1st,
                         value.ET_OxPartial, value.ET_Ox1st, value.ET_Ox2nd, value.ET_OxHeatup);
                poll_times(value.ST_Poll1st, value.ET_Poll1st, value.ET_Poll2nd, value.ET_PollHeatup);

                //if (formatDate_af(value.ST_Ox2nd) != "-")
                //    $('#date_entry').html('<span>2nd<span class="remote" title="Deletes 2nd Oxidation dates."><img src="/Content/delete_new.png"></span></span>');

                $('.remote').hide().click(function () {
                    delete_date(aflotid_, $(this).attr('class').replace(' remote', ''));
                    $(this).remove();
                });

                $('.af_tbl tr th').hover(
                function () {
                    $(this).find('.remote').show();
                },
                function () {
                    $(this).find('.remote').hide();
                });
                function clear_css() {
                    $('.af_tbl, input, td ,select').each(function () {
                        $(this).css('background', "");
                    });
                }

            });
            $('#consumable_div .input_textbox').css({ "background-color": "#FFFFCC", "width": "100%" });
            $('#tuyere_div .input_textbox').css({ "background-color": "#FFFFCC", "width": "100%" });
        }

    });

    $.ajax({

        url: serverpath + '/AnodeFurnace/Load_DelayReasons/',
        data: {
            aflotid: aflotid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('input[value*="' + value.DelayReasonID + '"]').attr('checked', 'checked');
            });

        }
    });

    function clear_delays_css() {
        $('.af_tbl select').each(function () {
            $(this).attr('value', "");
        });
        $('#delay_skim_ms').prop('disabled', true);
        $('#delay_ox_ms').prop('disabled', true);
        $('#delay_poll_ms').prop('disabled', true);
    }

}


//Skimming
function skim_times(s_skim1, e_skim1, e_skim2, e_skimh) {
    var first = s_skim1;
    var last;

    if (e_skim1 != "-" && e_skim1 != "" && e_skim1 != "/Date(-2209017600000)/")
        last = e_skim1;
    if (e_skim2 != "-" && e_skim2 != "" && e_skim2 != "/Date(-2209017600000)/")
        last = e_skim2;
    if (e_skimh != "-" && e_skimh != "" && e_skimh != "/Date(-2209017600000)/")
        last = e_skimh;

    check_time_gap(first, last, "skim");
}
//Oxidation
function ox_times(s_oxp, s_ox1, e_oxp, e_ox1, e_ox2, e_oxh) {
    var first;
    var last;

    //if (s_oxp != "-" && s_oxp != "" && s_oxp != "/Date(-2209017600000)/")
    //    first = s_oxp;
    //else
    if (s_ox1 != "-" && s_ox1 != "" && s_ox1 != "/Date(-2209017600000)/")
        first = s_ox1;

    //if (e_oxp != "-" && e_oxp != "" && e_oxp != "/Date(-2209017600000)/")
    //    last = e_oxp;
    if (e_ox1 != "-" && e_ox1 != "" && e_ox1 != "/Date(-2209017600000)/")
        last = e_ox1;
    if (e_ox2 != "-" && e_ox2 != "" && e_ox2 != "/Date(-2209017600000)/")
        last = e_ox2;
    if (e_oxh != "-" && e_oxh != "" && e_oxh != "/Date(-2209017600000)/")
        last = e_oxh;

    check_time_gap(first, last, "ox");
}
//Poling
function poll_times(s_poll1, e_poll1, e_poll2, e_pollh) {
    var first = s_poll1;
    var last;

    if (e_poll1 != "-" && e_poll1 != "" && e_poll1 != "/Date(-2209017600000)/")
        last = e_poll1;
    if (e_poll2 != "-" && e_poll2 != "" && e_poll2 != "/Date(-2209017600000)/")
        last = e_poll2;
    if (e_pollh != "-" && e_pollh != "" && e_pollh != "/Date(-2209017600000)/")
        last = e_pollh;

    check_time_gap(first, last, "poll");
}





function check_time_gap(first, last, part) {
    var time_gap = Date.daysBetween(new Date(formatDate_af(first)), new Date(formatDate_af(last)));
    switch (part) {
        case 'skim':
            if (time_gap[2] > 30 || time_gap[0] > 0 || time_gap[1] > 0) {
                //disable dropdown here
                $('#delay_skim_ms').prop('disabled', false);
                $('#skim_savebtn').prop('disabled', false);
            }
            break;
        case 'ox':
            if ((time_gap[1] >= 2 && time_gap[2] > 0) || time_gap[0] > 0) {
                //disable dropdown here
                $('#delay_ox_ms').prop('disabled', false);
                $('#oxid_savebtn').prop('disabled', false);
            }
            break;
        case 'poll':
            if ((time_gap[1] >= 2 && time_gap[2] > 30) || time_gap[0] > 0) {
                //disable dropdown here
                $('#delay_poll_ms').prop('disabled', false);
                $('#reduc_savebtn').prop('disabled', false);
            }
        case 'blister':
            if ((time_gap[1] >= 8 && time_gap[2] > 0) || time_gap[0] > 0) {
                $('#delay_blister').prop('disabled', false);
                $('#blstr_dly_savebtn').prop('disabled', false);
            }
            break;
    }

    //alert(Date.daysBetween(new Date(formatDate_af(first)), new Date(formatDate_af(last))));

}

Date.daysBetween = function (date1, date2) {
    var time = [];

    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var hours = Math.floor(difference_ms % 24);
    var days = Math.floor(difference_ms / 24);

    time.push(days);
    time.push(hours);
    time.push(minutes);

    //return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
    return time;
}

function add_delete_buttons(skim1, skim2, skimh, oxp, ox1, ox2, oxh, poll1, poll2, pollh) {
    if (formatDate_af(skim1) != "-")
        $('#skim1').html('<span> 1st <span class="skim1 remote" title="Deletes 1st Skimming dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(skim2) != "-")
        $('#skim2').html('<span>2nd<span class="skim2 remote" title="Deletes 2nd Skimming dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(skimh) != "-")
        $('#skimh').html('<span>Heat-up<span class="skimh remote" title="Deletes Heat up dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');

    if (formatDate_af(oxp) != "-")
        $('#oxp').html('<span>Partial<span class="oxp remote" title="Deletes Patial Oxidation dates." style="float: right;">&nbsp;&nbsp;<img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(ox1) != "-")
        $('#ox1').html('<span>1st<span class="ox1 remote" title="Deletes 1st Oxidation dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(ox2) != "-")
        $('#ox2').html('<span>2nd<span class="ox2 remote" title="Deletes 2nd Oxidation dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(oxh) != "-")
        $('#oxh').html('<span>Heat-up<span class="oxh remote" title="Deletes Heat up dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');

    if (formatDate_af(poll1) != "-")
        $('#poll1').html('<span>1st<span class="poll1 remote" title="Deletes 1st Polling dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(poll2) != "-")
        $('#poll2').html('<span>2nd<span class="poll2 remote" title="Deletes 2nd Polling dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');
    if (formatDate_af(pollh) != "-")
        $('#pollh').html('<span>Heat-up<span class="pollh remote" title="Deletes Heat up dates." style="float: right;"><img src="/Content/Disable.gif"></span></span>');


}

//function replace() {
//    $('select , img').each(function () {
//        $(this).replaceAll('disabled');
//    });
//}

//function clear_skimming() {
//    $('select , img').each(function () {
//        $(this).removeAttr('disabled');
//    });
//}

//function clear_oxidation() {
//    $('select , img').each(function () {
//        $(this).removeAttr('disabled');
//    });
//}

//function clear_reduction() {
//    $('select , img').each(function () {
//        $(this).removeAttr('disabled');
//    });
//}

function delete_date(aflotid_, part_) {
    //alert(aflotid_);
    var paramid_;
    switch (part_) {
        case 'skim1':
            paramid_ = 11;
            break;
        case 'skim2':
            paramid_ = 12;
            break;
        case 'skimh':
            paramid_ = 13;
            break;
        case 'oxp':
            paramid_ = 15;
            break;
        case 'ox1':
            paramid_ = 16;
            break;
        case 'ox2':
            paramid_ = 17;
            break;
        case 'oxh':
            paramid_ = 18;
            break;
        case 'poll1':
            paramid_ = 20;
            break;
        case 'poll2':
            paramid_ = 21;
            break;
        case 'pollh':
            paramid_ = 22;
            break;
    }

    var r = confirm("Are you sure you want to delete date?");

    if (r) {
        $.ajax({
            url: afserverpath + '/AnodeFurnace/Remove_RefStage_Dates/',
            data: {
                aflotid: aflotid_,
                date_param_id: paramid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                $('#date_entry').html('<span>2nd</span>');
                alert('AF Stage Date now deleted.');
                load_afrefining_data();
            }
        });
    }
}

function load_pitarget_data() {

    //for af phase 2
    //var aflotid_ = $('#lotid').text();

    //  var aflotid_ = $('#aflot_ddl').val();
    //  clear_ptarget();
    //  alert('test');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AF_PITarget_data/',

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#ptarget_' + value.AF_ParamId).text(value.AFDisplayTarget);


            });

        }
    });

}

function load_pitarget_data_phase2() {

    //for af phase 2
    var aflotid_ = $('#lotid').text();

    //  var aflotid_ = $('#aflot_ddl').val();
    //  clear_ptarget();
    //  alert('test');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AF_PITarget_data/',

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#ptarget_' + value.AF_ParamId).text(value.AFDisplayTarget);


            });

        }
    });

}

function load_afpi_data() {

    var aflotid_ = $('#aflot_ddl').val();

    //for af phase 2
    //var aflotid_ = $('#lotid').text();

    // clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFPI_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#sk_dpressure').text(zerovalue_comma(value.Skim_Dpressure));
                $('#sk_combair').text(zerovalue_comma(value.Skim_Combust));
                $('#sk_hforate').text(zerovalue_comma(value.Skim_HFOFrate));

                $('#ox_dpressure').text(zerovalue_comma(value.Ox_Dpressure));
                $('#ox_combair').text(zerovalue_comma(value.Ox_Combust));
                $('#ox_hforate').text(zerovalue_comma(value.Ox_HFOFrate));

                $('#red_dpressure').text(zerovalue_comma(value.Red_Dpressure));
                $('#red_combair').text(zerovalue_comma(value.Red_Combust));
                $('#red_lpgrate').text(zerovalue_comma(value.Red_LPGFrate));


                $('#lpg_start').text(zerovalue_comma(value.Red_LPGStart));
                $('#lpg_end').text(zerovalue_comma(value.Red_LPGEnd));
                $('#lpg_consumed').text(zerovalue_comma((value.Red_LPGEnd - value.Red_LPGStart)));

                $('#hfo_start').text(zerovalue_comma(value.HFO_TotalizerStart));
                $('#hfo_end').text(zerovalue_comma(value.HFO_TotalizerEnd));
                $('#hfo_consumed').text(zerovalue_comma((value.HFO_TotalizerEnd - value.HFO_TotalizerStart)));

                $('#lfo_start').text(zerovalue_comma(value.LFO_TotalizerStart));
                $('#lfo_end').text(zerovalue_comma(value.LFO_TotalizerEnd));
                $('#lfo_consumed').text(zerovalue_comma((value.LFO_TotalizerEnd - value.LFO_TotalizerStart)));

            });

        }
    });

}


function load_afpi_data_phase2() {

    var aflotid_ = $('#aflot_ddl').val();

    //for af phase 2
    var aflotid_ = $('#lotid').text();

    // clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFPI_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#sk_dpressure').text(zerovalue_comma(value.Skim_Dpressure));
                $('#sk_combair').text(zerovalue_comma(value.Skim_Combust));
                $('#sk_hforate').text(zerovalue_comma(value.Skim_HFOFrate));

                $('#ox_dpressure').text(zerovalue_comma(value.Ox_Dpressure));
                $('#ox_combair').text(zerovalue_comma(value.Ox_Combust));
                $('#ox_hforate').text(zerovalue_comma(value.Ox_HFOFrate));

                $('#red_dpressure').text(zerovalue_comma(value.Red_Dpressure));
                $('#red_combair').text(zerovalue_comma(value.Red_Combust));
                $('#red_lpgrate').text(zerovalue_comma(value.Red_LPGFrate));


                $('#lpg_start').text(zerovalue_comma(value.Red_LPGStart));
                $('#lpg_end').text(zerovalue_comma(value.Red_LPGEnd));
                $('#lpg_consumed').text(zerovalue_comma((value.Red_LPGEnd - value.Red_LPGStart)));

                $('#hfo_start').text(zerovalue_comma(value.HFO_TotalizerStart));
                $('#hfo_end').text(zerovalue_comma(value.HFO_TotalizerEnd));
                $('#hfo_consumed').text(zerovalue_comma((value.HFO_TotalizerEnd - value.HFO_TotalizerStart)));

                $('#lfo_start').text(zerovalue_comma(value.LFO_TotalizerStart));
                $('#lfo_end').text(zerovalue_comma(value.LFO_TotalizerEnd));
                $('#lfo_consumed').text(zerovalue_comma((value.LFO_TotalizerEnd - value.LFO_TotalizerStart)));

            });

        }
    });

}
function load_aflims_data() {

    var aflotid_ = $('#aflot_ddl').val();
    ////for af phase 2
    //var aflotid_ = $('#lotid').text();

    clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFLIMS_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {




            $.each(data, function (index, value) {


                $('#skO2_target').text(evaluate_value(value.SKT_O2));
                $('#skO2_val').text(evaluate_value(value.SK_O2));

                $('#skS_target').text(evaluate_value(value.SKT_S));
                $('#skS_val').text(evaluate_value(value.SK_S));

                $('#skPb_target').text(evaluate_value(value.SKT_Pb));
                $('#skPb_val').text(evaluate_value(value.SK_Pb));

                $('#skAs_target').text(evaluate_value(value.SKT_As));
                $('#skAs_val').text(evaluate_value(value.SK_As));

                $('#oxO2_target').text(evaluate_value(value.OXT_O2));
                $('#oxO2_val').text(evaluate_value(value.OX_O2));

                $('#oxS_target').text(evaluate_value(value.OXT_S));
                $('#oxS_val').text(evaluate_value(value.OX_S));

                $('#reO2_target').text(evaluate_value(value.RET_O2));
                $('#reO2_val').text(evaluate_value(value.RE_O2));

                $('#reS_target').text(evaluate_value(value.RET_S));
                $('#reS_val').text(evaluate_value(value.RE_S));

            });
        }
    });

}

function load_aflims_data_phase2() {

    var aflotid_ = $('#aflot_ddl').val();
    ////for af phase 2
    var aflotid_ = $('#lotid').text();

    clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFLIMS_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {




            $.each(data, function (index, value) {


                $('#skO2_target').text(evaluate_value(value.SKT_O2));
                $('#skO2_val').text(evaluate_value(value.SK_O2));

                $('#skS_target').text(evaluate_value(value.SKT_S));
                $('#skS_val').text(evaluate_value(value.SK_S));

                $('#skPb_target').text(evaluate_value(value.SKT_Pb));
                $('#skPb_val').text(evaluate_value(value.SK_Pb));

                $('#skAs_target').text(evaluate_value(value.SKT_As));
                $('#skAs_val').text(evaluate_value(value.SK_As));

                $('#oxO2_target').text(evaluate_value(value.OXT_O2));
                $('#oxO2_val').text(evaluate_value(value.OX_O2));

                $('#oxS_target').text(evaluate_value(value.OXT_S));
                $('#oxS_val').text(evaluate_value(value.OX_S));

                $('#reO2_target').text(evaluate_value(value.RET_O2));
                $('#reO2_val').text(evaluate_value(value.RE_O2));

                $('#reS_target').text(evaluate_value(value.RET_S));
                $('#reS_val').text(evaluate_value(value.RE_S));

            });
        }
    });

}
function load_aflimstarget_data() {
    var aflotid_ = $('#aflot_ddl').val();
    //for af phase 2
    //var aflotid_ = $('#lotid').text();

    clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFLIMS_Target_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.AF_ParamId).text(value.AFDisplayText);
            });
        }
    });
}


function load_aflimstarget_data_phase2() {
    var aflotid_ = $('#aflot_ddl').val();
    //for af phase 2
    var aflotid_ = $('#lotid').text();

    clear_limsdata();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFLIMS_Target_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.AF_ParamId).text(value.AFDisplayText);
            });
        }
    });
}

function evaluate_value(value) {
    if (value != null) {
        if (!isNaN(value) && value.toString().indexOf('.') != -1) {
            return parseFloat(value).toFixed(3);
        } else {
            return value;
        }
    }
}

function clear_limsdata() {

    $('#skO2_target').text('');
    $('#skO2_val').text('');

    $('#skS_target').text('');
    $('#skS_val').text('');

    $('#skPb_target').text('');
    $('#skPb_val').text('');

    $('#skAs_target').text('');
    $('#skAs_val').text('');

    $('#oxO2_target').text('');
    $('#oxO2_val').text('');

    $('#oxS_target').text('');
    $('#oxS_val').text('');

    $('#reO2_target').text('');
    $('#reO2_val').text('');

    $('#reS_target').text('');
    $('#reS_val').text('');

}

function clear_ptarget() {

    $('#skO2_target').text('');
    $('#skO2_val').text('');

    $('#skS_target').text('');
    $('#skS_val').text('');

    $('#skPb_target').text('');
    $('#skPb_val').text('');

    $('#skAs_target').text('');
    $('#skAs_val').text('');

    $('#oxO2_target').text('');
    $('#oxO2_val').text('');

    $('#oxS_target').text('');
    $('#oxS_val').text('');

    $('#reO2_target').text('');
    $('#reO2_val').text('');

    $('#reS_target').text('');
    $('#reS_val').text('');

}


function load_afcasting_data() {

    var aflotid_ = $('#aflot_ddl').val();
    var polling_et;

    //$.ajax({
    //    url: afserverpath + '/AnodeFurnace/AFRefining_data/',
    //    data: {
    //        aflotid: aflotid_
    //    },

    //    type: 'POST',
    //    cache: false,
    //    success: function (data) {

    //        $.each(data, function (index, value) {
    //            polling_et = formatDate_af(value.ET_Poll2nd);
    //            $('#poll_et').val(polling_et);
    //            //alert(polling_et);
    //        });
    //    }
    //});

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFCasting_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                polling_et = value.ET_poling;
                $('#poll_et').text(formatDate_af(polling_et));

                $('#mmtemp_start_textb').val(value.MM_STemp);
                $('#mmtemp_mid_textb').val(value.MM_MTemp);
                $('#mmtemp_end_textb').val(value.MM_ETemp);

                $('#mdressing_1st_textb').val(zerovalue(value.Mould_Dens1));
                $('#mdressing_2nd_textb').val(zerovalue(value.Mould_Dens2));
                $('#mdressing_3rd_textb').val(zerovalue(value.Mould_Dens3));

                $('#sminventory_textb').val(value.SMould_Inv_Psr);
                $('#smcasted_textb').val(value.SMould_Inv_Psr_cast);
                $('#crlminventory_textb').val(value.SMould_Inv_Crl);
                $('#crlmcasted_textb').val(value.SMould_Inv_Crl_cast);

                $('#anodecast_mt_textb').val(evaluate_value(value.Tover_Anode_mt));
                $('#anodecast_pcs_textb').val(value.Tover_Anode_pcs);

                $('#txtarea_cast_remarks').val(value.CastingRemark);

                $('#mould_cast_starttime_td').text(formatDate_af(value.MouldCastStart));

                $('#cast_starttime_td').text(formatDate_af(value.CastStart));
                $('#cast_endtime_td').text(formatDate_af(value.CastEnd));

                $('#cast2nd_starttime_td').text(formatDate_af(value.Cast2ndStart));
                $('#cast2nd_endtime_td').text(formatDate_af(value.Cast2ndEnd));



                var cmould1 = value.Wheel1_CastMould == null ? '-' : value.Wheel1_CastMould;
                var cmould2 = value.Wheel2_CastMould == null ? '-' : value.Wheel2_CastMould;

                $('#wheel1_cmould').text(cmould1);
                $('#wheel2_cmould').text(cmould2);


                //Supervisor
                if (value.ST_CSupervisor1 == null && value.ST_CSupervisor2 == null) {
                    $('#st_csupervisor').text('-');
                }
                else if (value.ST_CSupervisor2 == '-') {
                    $('#st_csupervisor').text(value.ST_CSupervisor1);
                } else {
                    $('#st_csupervisor').text(value.ST_CSupervisor1 + ' / ' + value.ST_CSupervisor2);
                }

                if (value.ET_CSupervisor1 == null && value.ET_CSupervisor2 == null) {
                    $('#et_csupervisor').text('-');
                }
                else if (value.ET_CSupervisor2 == '-') {
                    $('#et_csupervisor').text(value.ET_CSupervisor1);
                } else {
                    $('#et_csupervisor').text(value.ET_CSupervisor1 + ' / ' + value.ET_CSupervisor2);
                }


                //Contrl Rm Engineer



                if (value.ST_COperator1 == null && value.ST_COperator2 == null) {
                    $('#st_coperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_coperator').text(value.ST_COperator1);
                } else {
                    $('#st_coperator').text(value.ST_COperator1 + ' / ' + value.ST_COperator2);
                }

                if (value.ET_COperator1 == null && value.ET_COperator2 == null) {
                    $('#et_coperator').text('-');
                }
                else if (value.ET_COperator2 == '-') {
                    $('#et_coperator').text(value.ET_COperator1);
                } else {
                    $('#et_coperator').text(value.ET_COperator1 + ' / ' + value.ET_COperator2);
                }

                //Laddle Operator

                if (value.ST_LOperator1 == null && value.ST_LOperator2 == null) {
                    $('#st_loperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_loperator').text(value.ST_LOperator1);
                } else {
                    $('#st_loperator').text(value.ST_LOperator1 + ' / ' + value.ST_LOperator2);
                }

                if (value.ET_LOperator1 == null && value.ET_LOperator2 == null) {
                    $('#et_loperator').text('-');
                }
                else if (value.ET_LOperator2 == '-') {
                    $('#et_loperator').text(value.ET_LOperator1);
                } else {
                    $('#et_loperator').text(value.ET_LOperator1 + ' / ' + value.ET_LOperator2);
                }


                //Barrite Operator

                if (value.ST_BOperator1 == null && value.ST_BOperator2 == null) {
                    $('#st_boperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_boperator').text(value.ST_BOperator1);
                } else {
                    $('#st_boperator').text(value.ST_BOperator1 + ' / ' + value.ST_BOperator2);
                }

                if (value.ET_BOperator1 == null && value.ET_BOperator2 == null) {
                    $('#et_boperator').text('-');
                }
                else if (value.ET_BOperator2 == '-') {
                    $('#et_boperator').text(value.ET_BOperator1);
                } else {
                    $('#et_boperator').text(value.ET_BOperator1 + ' / ' + value.ET_BOperator2);
                }

                //Crane Operator

                if (value.ST_CraneOperator1 == null && value.ST_CraneOperator2 == null) {
                    $('#st_craneoperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_craneoperator').text(value.ST_CraneOperator1);
                } else {
                    $('#st_craneoperator').text(value.ST_CraneOperator1 + ' / ' + value.ST_CraneOperator2);
                }

                if (value.ET_CraneOperator1 == null && value.ET_CraneOperator2 == null) {
                    $('#et_craneoperator').text('-');
                }
                else if (value.ET_CraneOperator2 == '-') {
                    $('#et_craneoperator').text(value.ET_CraneOperator1);
                } else {
                    $('#et_craneoperator').text(value.ET_CraneOperator1 + ' / ' + value.ET_CraneOperator2);
                }

                //Forklift Operator

                if (value.ST_FOperator1 == null && value.ST_FOperator2 == null) {
                    $('#st_foperator').text('-');
                }
                else if (value.ST_COperator2 == '-') {
                    $('#st_foperator').text(value.ST_FOperator1);
                } else {
                    $('#st_foperator').text(value.ST_FOperator1 + ' / ' + value.ST_FOperator2);
                }

                if (value.ET_FOperator1 == null && value.ET_FOperator2 == null) {
                    $('#et_foperator').text('-');
                }
                else if (value.ET_FOperator2 == '-') {
                    $('#et_foperator').text(value.ET_FOperator1);
                } else {
                    $('#et_foperator').text(value.ET_FOperator1 + ' / ' + value.ET_FOperator2);
                }


                $('.input_textboxc').css({ "background-color": "#FFFFCC" });
                $('.input_textboxc').css({ "width": "100%" });


            });
        }
    });
}


$('#remarks_imgbtn').live('click', function () {

    af_lot_checker('ref_remark');
});

$('#cosumable_imgbtn').live('click', function () {

    af_lot_checker('consumable');
});



$('#tuyere_imgbtn').live('click', function () {

    af_lot_checker('tuyere');
});


$('#mmtemp_imgbtn').live('click', function () {

    af_lot_checker('cast_mmtemp');
});

$('#qig_anode_cust_btn').live('click', function () {

    af_lot_checker('anode_customer');
});



$('#mdressing_imgbtn').live('click', function () {

    af_lot_checker('cast_mdress');
});


$('#sminventory_imgbtn').live('click', function () {

    af_lot_checker('cast_sminventory');
});

$('#tanodes_imgbtn').live('click', function () {

    af_lot_checker('cast_anode_turnover');
});

$('#cast_remarks_imgbtn').live('click', function () {

    af_lot_checker('cast_remarks');
});

$('#qig_remarks_imgbtn').live('click', function () {

    af_lot_checker('qig_remarks');
});

$('#af_inventory_imgbtn').live('click', function () {

    //af_lot_checker('qig_remarks');
});
$('#qig_weight_imgbtn').live('click', function () {

    af_lot_checker('qig_weights');
});

$('#qig_ar_imgbtn').live('click', function () {

    af_lot_checker('qig_ar');
});
$('#qig_twc_imgbtn').live('click', function () {

    af_lot_checker('qig_twc');
});
//afrefining
$('#skim_savebtn').live('click', function () {
    saving_delay('delay_skim', 14, 'Delay');
});
$('#oxid_savebtn').live('click', function () {
    saving_delay('delay_ox', 19, 'Oxidation');
});
$('#reduc_savebtn').live('click', function () {
    saving_delay('delay_poll', 23, 'Polling');
});
////

//delay reason
function saving_delay(part, paramid_, msg) {
    //clear_css();

    var aflotid_ = $('#aflot_ddl').val();
    var items = [];

    //delete
    $.ajax({
        url: afserverpath + '/AnodeFurnace/Delete_Delay/',
        data: {
            aflotid: aflotid_,
            delay_paramid: paramid_,
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            //alert(msg + ' reason now deleted.');

        }
    });

    $('input[id*="' + part + '"]:checked').each(function () {
        items.push({
            cache: false,
            aflotid: aflotid_,
            paramid: paramid_,
            val: $(this).val()
        });
    });

    if (items.length != 0) {
        items = JSON.stringify({ 'items': items });
        //saving
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',

            url: afserverpath + '/AnodeFurnace/Save_Delay/',
            data:
                items,
            aflotid: aflotid_,
            cache: false,
            success: function (data) {
                alert(msg + ' reason now saved.');


            }

        });

    }

    //$.ajax({

    //    //url: afserverpath + '/AnodeFurnace/Save_Delay/',
    //    data: {
    //        aflotid: aflotid_,
    //        delay_paramid: paramid_,
    //        delay_stage: delay_stage_
    //    },

    //    type: 'POST',
    //    cache: false,
    //    success: function (data) {

    //        alert(msg + ' reason now added.');

    //    }
    //});

}


function refining_remark_save() {

    var aflotid_ = $('#aflot_ddl').val();
    var ref_comment_ = $('#txtarea_ref_remarks').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Ref_Remark/',
        data: {
            aflotid: aflotid_,
            ref_comment: ref_comment_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Remarks now saved.');

        }
    });
}

function cast_mmtemp() {

    var aflotid_ = $('#aflot_ddl').val();
    var mmtemp_start_ = $('#mmtemp_start_textb').val();
    var mmtemp_mid_ = $('#mmtemp_mid_textb').val();
    var mmtemp_end_ = $('#mmtemp_end_textb').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Cast_MTemp/',
        data: {
            aflotid: aflotid_,
            mmtemp_start: mmtemp_start_,
            mmtemp_mid: mmtemp_mid_,
            mmtemp_end: mmtemp_end_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Molten Metal Temp saved.');

        }
    });
}


function cast_mdress() {

    var aflotid_ = $('#aflot_ddl').val();
    var mdress1_ = $('#mdressing_1st_textb').val();
    var mdress2_ = $('#mdressing_2nd_textb').val();
    var mdress3_ = $('#mdressing_3rd_textb').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Cast_MDress/',
        data: {
            aflotid: aflotid_,
            mdress1: mdress1_,
            mdress2: mdress2_,
            mdress3: mdress3_ ? mdress3_ : ""
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Mould Dressing Density saved.');

        }
    });
}

function cast_sminventory() {

    var aflotid_ = $('#aflot_ddl').val();
    var sminventory_ = $('#sminventory_textb').val();
    var smcasted_ = $('#smcasted_textb').val();
    var cminventory_ = $('#crlminventory_textb').val();
    var cmcasted_ = $('#crlmcasted_textb').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Cast_SMInventory/',
        data: {
            aflotid: aflotid_,
            sminventory: sminventory_,
            smcasted: smcasted_,
            cminventory: cminventory_,
            cmcasted: cmcasted_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Spare Moulds Inventory saved.');

        }
    });
}

function cast_anode_turnover() {

    var aflotid_ = $('#aflot_ddl').val();
    var anode_mt_ = $('#anodecast_mt_textb').val();
    var anode_pcs_ = $('#anodecast_pcs_textb').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Cast_AnodeTurnOver/',
        data: {
            aflotid: aflotid_,
            anode_mt: anode_mt_,
            anode_pcs: anode_pcs_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Turnover Anode data now saved.');

        }
    });
}

function cast_remarks() {

    var aflotid_ = $('#aflot_ddl').val();
    var cast_remarks_ = $('#txtarea_cast_remarks').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Cast_Remark/',
        data: {
            aflotid: aflotid_,
            cast_comment: cast_remarks_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Casting Remarks now saved.');

        }
    });
}

function qig_remarks() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var qig_remarks_ = $('#txtarea_qig_remarks').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_QIG_Remark/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            qig_remarks: qig_remarks_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('QIG Remarks now saved.');

        }
    });
}

///////////////////-RJ////

//function qig_saverework_imgbtn() {

//    var aflotid_ = $('#aflot_ddl').val();
//    var qig_reworks_ = $('#af_qig_rework_tbl').val();

//    $.ajax({
//        url: afserverpath + '/AnodeFurnace/qig_save_pcs/',
//        data: {
//            aflotid: aflotid_,
//            afparamid: InspectId,
//            afqigtypeid: anodeTypeId,
//            afcw: castingWheelId,
//            afqighrid: hourId,
//            afqighr: val
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            alert('QIG data now saved.');

//            load_afqig_data_rework();
//            load_afqig_data_reject();
//            load_afqig_data_cast();


//        }

//    });
//    alert('QIG data now saved.');
//}
////
//$('#qig_saverework_imgbtn').live('click', function () {

//    af_lot_checker('qig_reworks');
//});





function qig_customer() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var cw1_cust = $('#cw1_cust_ddl_hidden').val();
    var cw1_othr_cust = $('#cw1_cust_othr_ddl_hidden').val();

    var cw2_cust = $('#cw2_cust_ddl_hidden').val();
    var cw2_othr_cust = $('#cw2_cust_othr_ddl_hidden').val();

    var tw1_tot = $('#tw_1').val();
    var tw1_othr = $('#tw_2').val();
    var tw2_tot = $('#tw_3').val();
    var tw2_othr = $('#tw_4').val();

    //var r1 = $('#rework_1').val();
    //var r2 = $('#rework_2').val();
    //var r3 = $('#rework_3').val();
    //var r4 = $('#rework_4').val();

    //var g1 = $('#good_1').val();
    //var g2 = $('#good_2').val();
    //var g3 = $('#good_3').val();
    //var g4 = $('#good_4').val();

    //var re1 = $('#reject_1').val();
    //var re2 = $('#reject_2').val();
    //var re3 = $('#reject_3').val();
    //var re4 = $('#reject_4').val();

    if (cw1_cust != '') {

        //save_qig_customer(aflotid_, 1, cw1_cust, r1, r2, g1, g2, re1, re2);
        save_qig_customer(aflotid_, afdate_, 1, cw1_cust, cw1_othr_cust, tw1_tot, tw1_othr);
    }

    if (cw2_cust != '') {

        save_qig_customer(aflotid_, afdate_, 2, cw2_cust, cw2_othr_cust, tw2_tot, tw2_othr);
    }

    //alert('Customer now saved.');
    qig_customer_query();
}

function save_qig_customer(aflotid_, afdate_, cwid_, custid_, customerotherid_, customerwt_, customerwtother_) {

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_AF_Customer/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            cwid: cwid_,
            customerid: custid_,
            customerotherid: customerotherid_,
            customerwt: customerwt_,
            customerwtother: customerwtother_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            qig_customer_query();

        }
    });
}



function qig_remarks_query() {

    var aflotid_ = $('#aflot_ddl').val();

    $('#txtarea_qig_remarks').val('');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIGRemarks_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#txtarea_qig_remarks').val(data.qig_remarks);

        }
    });
}

function qig_customer_query() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#cw1_cust_ddl').val('');
    $('#cw1_cust_othr_ddl').val('');
    $('#cw2_cust_ddl').val('');
    $('#cw2_cust_othr_ddl').val('');

    $('#cw1_cust_ddl_hidden').val('');
    $('#cw1_cust_othr_ddl_hidden').val('');
    $('#cw2_cust_ddl_hidden').val('');
    $('#cw2_cust_othr_ddl_hidden').val('');

    $('#tw_1').val('');
    $('#tw_2').val('');
    $('#tw_3').val('');
    $('#tw_4').val('');


    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIG_Customer_data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            //$('#cw1_cust_ddl').val(data.CW1_CustomerName);
            //$('#cw1_cust_othr_ddl').val(data.CW1_CustomerNameOther);
            //$('#cw2_cust_ddl').val(data.CW2_CustomerName);
            //$('#cw2_cust_othr_ddl').val(data.CW2_CustomerNameOther);

            //$('#cw1_cust_ddl_hidden').val(data.CW1_CustomerId);
            //$('#cw1_cust_othr_ddl_hidden').val(data.CW1_CustomerIdOther);
            //$('#cw2_cust_ddl_hidden').val(data.CW2_CustomerId);
            //$('#cw2_cust_othr_ddl_hidden').val(data.CW2_CustomerIdOther);
            //if (data.length > 0) {

            $.each(data, function (index, value) {
                if (value.AF_CWId == 1) {
                    $('#cw1_cust_ddl_hidden').val(value.AF_CustomerId ? value.AF_CustomerId : "0");
                    $('#cw1_cust_othr_ddl_hidden').val(value.AF_CustomerId_Othr ? value.AF_CustomerId_Othr : "0");
                    $('#tw_1').val(value.AF_Customer_TotWeight ? value.AF_Customer_TotWeight.toFixed(4) : "");
                    $('#tw_2').val(value.AF_Customer_TotWeight_Othr ? value.AF_Customer_TotWeight_Othr.toFixed(4) : "");
                } else {
                    $('#cw2_cust_ddl_hidden').val(value.AF_CustomerId ? value.AF_CustomerId : "0");
                    $('#cw2_cust_othr_ddl_hidden').val(value.AF_CustomerId_Othr ? value.AF_CustomerId_Othr : "0");
                    $('#tw_3').val(value.AF_Customer_TotWeight ? value.AF_Customer_TotWeight.toFixed(4) : "");
                    $('#tw_4').val(value.AF_Customer_TotWeight_Othr ? value.AF_Customer_TotWeight_Othr.toFixed(4) : "");
                }
            });

        },
        complete: function () {

            //qig_customer_new1();
            //qig_customer_new2();
            //qig_customer_new3();
            //qig_customer_new4();
        }
    });
}

function qig_others_query() {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIG_RDCFLL_data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#paramid_119').attr('value', value.RDC);
                $('#paramid_120').attr('value', value.FLL);
            });
        }
    });
}

function refining_tuyere() {

    var aflotid_ = $('#aflot_ddl').val();
    var twest_ = $('#textb_westtop').val();
    var teast_ = $('#textb_easttop').val();
    var bwest_ = $('#textb_westbottom').val();
    var beast_ = $('#textb_eastbottom').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Ref_Tuyere/',
        data: {
            aflotid: aflotid_,
            twest: twest_,
            teast: teast_,
            bwest: bwest_,
            beast: beast_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Tuyeres now saved.');
        }
    });
}



function refining_consumable() {

    var aflotid_ = $('#aflot_ddl').val();
    var lbars_ = $('#textb_leadbars').val();
    var sanode_ = $('#textb_scrapanode').val();
    var stuyere_ = $('#textb_shorttuyere').val();
    var lanodes_ = $('#textb_leadanodes').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Ref_Consumable/',
        data: {
            aflotid: aflotid_,
            lbars: lbars_,
            sanode: sanode_,
            stuyere: stuyere_,
            lanodes: lanodes_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Consumables now saved.');
        }
    });
}

function af_targets() {
    var aflotid_ = $('#aflot_ddl').val();

    alert('Data now saved.');
}


function af_lot_checker(eventname) {

    var aflotid_ = $('#aflot_ddl').val();



    if (selected == 1) {

        switch (eventname) {

            case 'addblister':
                load_partial_afblister();
                break;

            case 'ref_remark':
                refining_remark_save();
                color_change_div('ref_remarks_div');
                break;

            case 'consumable':
                refining_consumable();
                color_change_div('consumable_div');
                break;

            case 'tuyere':
                refining_tuyere();
                color_change_div('consumable_div');
                break;

            case 'manpower':
                load_partial_manpower();
                break;

            case 'afstage':
                load_partial_afstage();
                break;

            case 'cast_mmtemp':
                cast_mmtemp();
                break;

            case 'cast_mdress':
                cast_mdress();
                break;

            case 'cast_sminventory':
                cast_sminventory();
                break;

            case 'cast_anode_turnover':
                cast_anode_turnover();
                break;

            case 'cast_remarks':
                cast_remarks();
                break;

            case 'mould_cast_time':
                load_partial_mouldcastingtime();
                break;

            case 'cast_time':
                load_partial_castingtime();
                break;

            case 'cast2nd_time':
                load_partial_casting2ndtime();
                break;

            case 'cast_manpower':
                load_partial_castingmanpower();
                break;

            case 'cast_mouldreplace':
                load_partial_castingmouldreplace();
                break;

            case 'af_qig':
                load_partial_afqig();
                break;

            case 'qig_remarks':
                qig_remarks();
                break;

            case 'qig_weights':
                qig_weigts();
                break;

            case 'qig_ar':
                qig_ar();
                break;

            case 'qig_twc':
                qig_twc();
                break;

            case 'anode_customer':
                qig_twc();
                qig_customer();
                break;

            case 'af_targets':
                af_targets();
                break;

            case 'saving_skimming_delay':
                saving_delay();
                break;

                //case 'qig_others_imgbtn':

                //    break;


        }
        color_change_div();


    } else {

        alert('Please select an AF Lot Number!');
    }


}

function color_change_div(divname) {
    // $('#' + divname).css({ "background-color": "#6699FF" });
}

$('#af_stage_ddl').live('change', function () {
    var aflotid_ = $('#aflot_ddl').val();
    var stageid_ = $('#af_stage_ddl').val();

    $('#af_mposition_ddl').prop("disabled", false);

    $.ajax({
        url: afserverpath + '/AnodeFurnace/af_manpower_dtime/',
        data: {
            aflotid: aflotid_,
            stageid: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#st_stagetime').text(formatDate_af(data.AF_Stage_StartDate));
            $('#et_stagetime').text(formatDate_af(data.AF_Stage_EndDate));

        }

    });
});

$('#af_refstage_ddl').live('change', function () {

    var stageid_ = $('#af_refstage_ddl').val();

    $('#af_refstage_phase_ddl').prop("disabled", false);
    $('#afref_phase_temp_textb').prop("disabled", false);
    $('#delay_textarea').prop("disabled", false);
    $('#add_afrefstage_ok_btn').prop("disabled", false);

    $('#af_refstage_phase_ddl').empty();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/RefStage_Phase/',
        data: {
            stageid: stageid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#af_refstage_phase_ddl').append("<option value = " + value.AF_ParamId + ">" + value.AFParamName + "</option>");
            })
            refstage_phase_data();
        }

    });



});

$('#af_refstage_phase_ddl').live('change', function () {

    var refstage_paramid_ = $('#af_refstage_ddl').val();
    var paramid_ = $('#af_refstage_phase_ddl').val();

    var et_1ststage;

    switch (refstage_paramid_) {

        case '2':
            et_1ststage = $('#et_skim1st').text();
            break;
        case '3':
            et_1ststage = $('#et_ox1st').text();
            break;
        case '4':
            et_1ststage = $('#et_poll1st').text();
            break;

    }

    if (paramid_ == 12 || paramid_ == 17 || paramid_ == 21) {
        if (et_1ststage == "-") {
            alert('Input 1st Phase Times first.');
            $('#add_afrefstage_ok_btn').prop("disabled", true);
        }
    } else {
        $('#add_afrefstage_ok_btn').prop("disabled", false);
    }

});

$('#af_mposition_ddl').live('change', function () {
    var aflotid_ = $('#aflot_ddl').val();
    var stageid_ = $('#af_stage_ddl').val();
    var positionid_ = $('#af_mposition_ddl').val();

    $('#startemp_ddl').prop("disabled", false);
    $('#endemp_ddl').prop("disabled", false);

    if (stageid_ == 1) {
        $.ajax({
            url: afserverpath + '/AnodeFurnace/Refining_Emp_List/',
            data: {
                position: positionid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                //alert('change');
                $.each(data, function (index, value) {
                    $('#startemp_ddl').append("<option value = " + value.AF_ParamId + ">" + value.Fullname + "</option>");
                })
                $.each(data, function (index, value) {
                    $('#endemp_ddl').append("<option value = " + value.AF_ParamId + ">" + value.Fullname + "</option>");
                })

            }
            //$.ajax({
            //    url: afserverpath + '/AnodeFurnace/af_manpower_emp/',
            //    data: {
            //        aflotid: aflotid_,
            //        stageid: stageid_,
            //        positionid: positionid_
            //    },

            //    
        });
    } else {
        $.ajax({
            url: afserverpath + '/AnodeFurnace/Casting_Emp_List/',
            data: {
                position: positionid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                //alert('change');
                $.each(data, function (index, value) {
                    $('#startemp_ddl').append("<option value = " + value.AF_ParamId + ">" + value.Fullname + "</option>");
                })
                $.each(data, function (index, value) {
                    $('#endemp_ddl').append("<option value = " + value.AF_ParamId + ">" + value.Fullname + "</option>");
                })

            }
        });
    }

});

$('#add_afmanpower_ok_btn').live('click', function () {


    var aflotid_ = $('#aflot_ddl').val();
    var stageid_ = $('#af_stage_ddl').val();
    var positionid_ = $('#af_mposition_ddl').val();
    var startemp_ = $('#startemp_ddl').val();
    var endemp_ = $('#endemp_ddl').val();

    $.ajax({

        url: afserverpath + '/AnodeFurnace/Save_AF_ManPower/',
        data: {
            aflotid: aflotid_,
            stageid: stageid_,
            positionid: positionid_,
            startemp: startemp_,
            endemp: endemp_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            load_afrefining_data();
            alert('Man Power now saved.');
        }
    });
});

$('#af_refstage_phase_ddl').live('change', function () {
    refstage_phase_data();
});


function refstage_phase_data() {
    var aflotid_ = $('#aflot_ddl').val();
    var refstage_paramid_ = $('#af_refstage_ddl').val();
    var paramid_ = $('#af_refstage_phase_ddl').val();

    var temp_paramid_;
    var delay_paramid_;

    switch (refstage_paramid_) {

        //Skimming
        case '2':
            temp_paramid_ = 8;
            delay_paramid_ = 14;
            break;

            //Oxidation
        case '3':
            temp_paramid_ = 9;
            delay_paramid_ = 19;
            break;

            //Polling
        case '4':
            temp_paramid_ = 10;
            delay_paramid_ = 23;
            break;
    }

    $.ajax({

        url: afserverpath + '/AnodeFurnace/RefStage_Data/',
        data: {
            aflotid: aflotid_,
            paramid: paramid_,
            temp_paramid: temp_paramid_,
            delay_paramid: delay_paramid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#afref_phase_temp_textb').val(data.AF_StagePhase_Temperature);
            $('#delay_textarea').val(data.AF_StagePhase_Delay);

            $('#start_date_input').val(formatDate_only(data.AF_StagePhase_StartDate));
            $('#start_time_hr_input').val(formatDate_hr(data.AF_StagePhase_StartDate));
            $('#start_time_min_input').val(formatDate_min(data.AF_StagePhase_StartDate));
            ;

            $('#end_date_input').val(formatDate_only(data.AF_StagePhase_EndDate));
            $('#end_time_hr_input').val(formatDate_hr(data.AF_StagePhase_EndDate));
            $('#end_time_min_input').val(formatDate_min(data.AF_StagePhase_EndDate));


        }
    });
}

$('#add_afrefstage_ok_btn').live('click', function () {

    var aflotid_ = $('#aflot_ddl').val();
    var refstage_paramid_ = $('#af_refstage_ddl').val();
    var paramid_ = $('#af_refstage_phase_ddl').val();
    var temp_ = $('#afref_phase_temp_textb').val();
    var delay_ = $('#delay_textarea').val();

    //Previous Stage End Date
    var prev_et;

    //First Stage End Date
    var et_1ststagetime;

    //Start Date
    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    //End Date
    var add_end_date = new Date($('#end_date_input').val());
    var add_end_min = $('#end_time_min_input').val();
    var add_end_hr = $('#end_time_hr_input').val();



    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_end_date = add_end_date.add({
        minutes: add_end_min,
        hours: add_end_hr
    });



    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_end_date_ = add_end_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var isValidDate = dateChecker(add_start_date, add_end_date);

    var temp_paramid_;
    var delay_paramid_;

    switch (refstage_paramid_) {

        //Skimming
        case '2':
            temp_paramid_ = 8;
            delay_paramid_ = 14;
            et_1ststagetime = $('#et_skim1st').text();
            break;

            //Oxidation
        case '3':
            temp_paramid_ = 9;
            delay_paramid_ = 19;
            if (paramid_ != 15) {
                et_1ststagetime = $('#et_ox1st').text();
                isValidDate = check_prev_process_time(($('#et_skim2nd').text() != "-") ? $('#et_skim2nd').text() : $('#et_skim1st').text(), isValidDate, add_start_date);
            } else {
                et_1ststagetime = $('#et_oxpartial').text();
                isValidDate = check_prev_process_time(formatDate_af($('#st_blister').text()), isValidDate, add_start_date);
            }
            break;

            //Polling
        case '4':
            temp_paramid_ = 10;
            delay_paramid_ = 23;
            et_1ststagetime = $('#et_poll1st').text();
            isValidDate = check_prev_process_time(($('#et_ox2nd').text() != "-") ? $('#et_ox2nd').text() : $('#et_ox1st').text(), isValidDate, add_start_date);
            break;
    }

    //alert(isValidDate);

    if (paramid_ == 12 || paramid_ == 17 || paramid_ == 21)
        isValidDate = check_cast1sttime(et_1ststagetime, add_start_date, isValidDate);

    if (isValidDate == 1) {

        $.ajax({

            url: afserverpath + '/AnodeFurnace/Save_RefStage_Data/',
            data: {
                aflotid: aflotid_,
                date_paramid: paramid_,
                temp_paramid: temp_paramid_,
                delay_paramid: delay_paramid_,
                startdate_stage: add_start_date_,
                enddate_stage: add_end_date_,
                temp_stage: temp_,
                delay_stage: delay_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                load_afrefining_data();
                alert('AF Stage data now added.');

            }
        });

    } else if (isValidDate == 2) {
        alert('ERROR: Must not input future time.');
    } else if (isValidDate == 3) {
        alert('ERROR: 2nd Phase Times must be greater than 1st Phase Times.');
    } else if (isValidDate == 4 && refstage_paramid_ == 3 && paramid_ == 15) {
        alert('ERROR: Partial must be greater than Start of Blister Recieve: ' + formatDate($('#st_blister').text()));
    } else if (isValidDate == 4 && refstage_paramid_ == 3) {
        alert('ERROR: Oxidation Times must be greater than Skimming Times');
    } else if (isValidDate == 4 && refstage_paramid_ == 4) {
        alert('ERROR: Reduction Times must be greater than Oxidation Times');
    } else if (isValidDate == 0 && refstage_paramid_ == 3) {
        alert('ERROR: Input Skimming Times first.');
    } else if (isValidDate == 0 && refstage_paramid_ == 4) {
        alert('ERROR: Input Oxidation Times first.');
    } else {
        alert('End Time must be greater than Start Time.');
    }

});

function check_prev_process_time(prev_et, current, add_start_date) {
    var p_et = new Date(prev_et);
    var r = current;
    //alert(prev_et + " prev " + add_start_date);
    if (add_start_date <= p_et && prev_et != "") {
        r = 4;
    }
    if (prev_et == "-") {
        r = 0;
    }
    return r;
}

function check_cast1sttime(end_1sttime, start_2ndtime, currentstate) {
    var r = currentstate;
    //alert(end_1sttime + " cast " + end_1sttime);
    if (end_1sttime != "-") {
        if (start_2ndtime <= new Date(end_1sttime)) {
            r = 3;
        }
    }
    else {
        r = 0;
    }
    //else {
    //    r = 4;
    //}

    return r;
}

function check_singledate(date) {
    var current_date = new Date.now();
    if (date > current_date)
        return 2;
    else
        return 1;

}

function dateChecker(start_date, end_date) {
    var current_date = new Date.now();
    if (end_date > start_date) {
        if (start_date > current_date || end_date >= current_date) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return -1;
    }
}

$('#add_mouldcastingtime_ok_btn').live('click', function () {

    //   alert('cat');

    var aflotid_ = $('#aflot_ddl').val();

    //Reduction End Date
    var poll_et = $('#poll_et').text();

    //Start Date
    var add_start_date = new Date($('#Dialog_MouldCastingTime #start_date_input3').val());
    var add_start_min = $('#Dialog_MouldCastingTime #start_time_min_input').val();
    var add_start_hr = $('#Dialog_MouldCastingTime #start_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var isValidDate = check_singledate(add_start_date);

    isValidDate = check_prev_process_time(poll_et, isValidDate, add_start_date);

    if (isValidDate == 1) {

        $.ajax({

            url: afserverpath + '/AnodeFurnace/Save_MouldCastTime_Data/',
            data: {
                aflotid: aflotid_,
                startdate_cast: add_start_date_,
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Mould Casting time now saved.');
                $('#Dialog_MouldCastingTime').dialog('close');

                load_afcasting_data();


            }
        });

    } else if (isValidDate == 2) {
        alert('ERROR: Must not input future time.');
    } else if (isValidDate == 4) {
        alert('ERROR: Input Times must be greater than Reduction End Time: ' + poll_et);
    } else if (isValidDate == 0) {
        alert('ERROR: Reduction Time is not present.');
    } else {
        alert('ERROR: End Time must be greater than Start Time.');
    }

});

$('#add_castingtime_ok_btn').live('click', function () {

    //   alert('cat');

    var aflotid_ = $('#aflot_ddl').val();

    //Reduction End Date
    var mould_cast_starttime = $('#mould_cast_starttime_td').text();

    //Start Date
    var add_start_date = new Date($('#Dialog_CastingTime #start_date_input').val());
    var add_start_min = $('#Dialog_CastingTime #start_time_min_input').val();
    var add_start_hr = $('#Dialog_CastingTime #start_time_hr_input').val();

    //End Date
    var add_end_date = new Date($('#Dialog_CastingTime #end_date_input').val());
    var add_end_min = $('#Dialog_CastingTime #end_time_min_input').val();
    var add_end_hr = $('#Dialog_CastingTime #end_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_end_date = add_end_date.add({
        minutes: add_end_min,
        hours: add_end_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_end_date_ = add_end_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var isValidDate = dateChecker(add_start_date, add_end_date);

    isValidDate = check_cast1sttime(mould_cast_starttime, add_start_date, isValidDate);

    if (isValidDate == 1) {

        $.ajax({

            url: afserverpath + '/AnodeFurnace/Save_CastTime_Data/',
            data: {
                aflotid: aflotid_,
                startdate_cast: add_start_date_,
                enddate_cast: add_end_date_
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Casting time now saved.');
                $('#Dialog_CastingTime').dialog('close');

                load_afcasting_data();


            }
        });

    } else if (isValidDate == 2) {
        alert('ERROR: Must not input future time.');
    } else if (isValidDate == 4) {
        alert('ERROR: Input Times must be greater than Mould Casting Time.');
    } else if (isValidDate == 3) {
        alert("ERROR: 1st Casting Times must be greater than the Mould Casting Times.");
    } else if (isValidDate == 0) {
        alert('ERROR: Input Mould Casting Time first.');
    } else {
        alert('ERROR: End Time must be greater than Start Time.');
    }

});



$('#add_casting2ndtime_ok_btn').live('click', function () {

    //   alert('cat');

    var aflotid_ = $('#aflot_ddl').val();

    //First Casting Dates
    var casting_start_date = new Date($('#cast_starttime_td').text());
    var casting_end_date = new Date($('#cast_endtime_td').text());

    //Start Date
    var add_start_date = new Date($('#Dialog2nd_CastingTime #start_date_input2').val());
    var add_start_min = $('#Dialog2nd_CastingTime #start_time_min_input').val();
    var add_start_hr = $('#Dialog2nd_CastingTime #start_time_hr_input').val();

    //End Date
    var add_end_date = new Date($('#Dialog2nd_CastingTime #end_date_input2').val());
    var add_end_min = $('#Dialog2nd_CastingTime #end_time_min_input').val();
    var add_end_hr = $('#Dialog2nd_CastingTime #end_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_end_date = add_end_date.add({
        minutes: add_end_min,
        hours: add_end_hr
    });


    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_end_date_ = add_end_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var isValidDate = dateChecker(add_start_date, add_end_date);

    isValidDate = check_cast1sttime(casting_end_date, add_start_date, isValidDate);

    if (isValidDate == 1) {

        $.ajax({

            url: afserverpath + '/AnodeFurnace/Save_Cast2ndTime_Data/',
            data: {
                aflotid: aflotid_,
                startdate_cast: add_start_date_,
                enddate_cast: add_end_date_
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Casting time now saved.');
                $('#Dialog_CastingTime').dialog('close');

                load_afcasting_data();


            }
        });

    } else if (isValidDate == 2) {
        alert("ERROR: Must not input future time.");
    } else if (isValidDate == 3) {
        alert("ERROR: 2nd Casting Times must be greater than 1st Casting Times.");
    } else {
        alert("ERROR: End Time must be greater than Start Time.");
    }

});


$('#mouldreplace_ok_btn').live('click', function () {



    var aflotid_ = $('#aflot_ddl').val();
    var afmouldnum_ = $('#mreplace_mouldnum_ddl').val();
    var afwheelnum_ = $('#mreplace_wheel_ddl').val();
    var afmouldstat_ = $('#mreplace_mstatus_ddl').val();


    $.ajax({

        url: afserverpath + '/AnodeFurnace/Save_Cast_WheelMoulding/',
        data: {
            aflotid: aflotid_,
            afmouldnum: afmouldnum_,
            afwheelnum: afwheelnum_,
            afmouldstat: afmouldstat_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            load_afcasting_data();
            alert('Mould replacement data now saved.');

        }
    });
});

//$('#CastPosition_ddl').live('change', function () {
//    var aflotid_ = $('#aflot_ddl').val();
//    var afparamid_ = $('#CastPosition_ddl').val();


//    $.ajax({
//        url: afserverpath + '/AnodeFurnace/af_cast_manpoweremp/',
//        data: {
//            aflotid: aflotid_,
//            afparamid: afparamid_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {


//            $('#cast_startemp_ddl').val(data.StartEmpId);
//            $('#cast_endemp_ddl').val(data.EndEmpId);
//        }

//    });

//});

$('#cmanpower_ok_btn').live('click', function () {


    var aflotid_ = $('#aflot_ddl').val();
    var positionid_ = $('#CastPosition_ddl').val();
    var startemp_ = $('#cast_startemp_ddl').val();
    var endemp_ = $('#cast_endemp_ddl').val();

    $.ajax({

        url: afserverpath + '/AnodeFurnace/Save_AF_CastManPower/',
        data: {
            aflotid: aflotid_,
            positionid: positionid_,
            startemp: startemp_,
            endemp: endemp_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            load_afcasting_data();
            $('#Dialog_CastingManPower').dialog('close');
            alert('Man Power now saved.');
        }
    });
});


function NumericOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 32 && (charCode > 47 && charCode > 57)) {
        return false;

    }
    return true;

}

function IsEnterKey(evt) {
    //evt = (evt) ? evt : window.event;
    var charCode = evt.keyCode ? evt.keyCode : evt.which;
    if (charCode == 13) {
        return true;
    }
    return false;
}

//function onclick(evt) {
//    //evt = (evt) ? evt : window.event;
//    var charCode = evt.keyCode ? evt.keyCode : evt.which;
//    if (charCode == 13) {
//        return true;
//    }
//    return false;
//}




function AlertSave() {

    if (AlertSave(evt)) {


        var aflotid_ = $('#aflot_ddl').val();

        ///alert("aflotid:  " + aflotid_ + "Anode Type: " + anodeTypeId + " Hour Id: " + hourId + " Casting Wheel Id: " + castingWheelId + " Inspect Id: " + InspectId);

        var prefixStr = '';

        if (anodeTypeId == 1)
            prefixStr = 'tbox_rework_';
        else if (anodeTypeId == 3)
            prefixStr = 'tbox_cast_';
        else
            prefixStr = 'tbox_reject_';

        var val = $('#' + prefixStr + anodeTypeId + '_' + hourId + '_' + castingWheelId + '_' + InspectId + '_' + qigothers).val();

        //alert("Value: " + val);
        //alert("aflotid:  " + aflotid_ + "Anode Type: " + anodeTypeId + " Hour Id: " + hourId + " Casting Wheel Id: " + castingWheelId + " Inspect Id: " + InspectId + " QIG Others:" + qigothers);


        $.ajax({
            url: afserverpath + '/AnodeFurnace/qig_save_pcs/',
            data: {
                aflotid: aflotid_,
                afparamid: InspectId,
                afqigtypeid: anodeTypeId,
                afcw: castingWheelId,
                afqighrid: hourId,
                qigothers: qigothers_,
                afqighr: val
            },

            type: 'POST',
            cache: false,
            success: function (data) {


                alert('QIG data now saved.');

                //load_afqig_data_rework();
                //load_afqig_data_reject();
                //load_afqig_data_cast();


            }


        });




        return true;
    }

    alert("Alert Message OnClick");
}

//Save QIG_Reworkables
//$('#qig_save_rew_btn_cw1').live('click', function () {
//    save_qig('af_qig_rework_tbl', 'tbox_rework_', 'Reworkables');
//});
//$('#qig_save_rew_btn_cw2').live('click', function () {
//    save_qig('af_qig_rework_tbl', 'tbox_rework_', 'Reworkables');
//});
//$('#qig_save_rew_btn_cw1').live('click', function () {
//    save_qig_cw2('af_qig_rework_cw2_tbl', 'tbox_rework_', 'Reworkables');
//});
//$('#qig_save_rew_btn_cw2').live('click', function () {
//    save_qig_cw2('af_qig_rework_cw2_tbl', 'tbox_rework_', 'Reworkables');
//});
//Save QIG_Casting
//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_grade_a_tbl', 'tbox_cast_', 'Grade A');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_grade_a_tbl', 'tbox_cast_', 'Grade A');
//});

//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_grade_cw2_a_tbl', 'tbox_cast_', 'Grade A');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_grade_cw2_a_tbl', 'tbox_cast_', 'Grade A');
//});

//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_grade_b_tbl', 'tbox_cast_', 'Grade B');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_grade_b_tbl', 'tbox_cast_', 'Grade B');
//});

//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_grade_cw2_b_tbl', 'tbox_cast_', 'Grade B');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_grade_cw2_b_tbl', 'tbox_cast_', 'Grade B');
//});

//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_casted_tbl', 'tbox_cast_', 'Casting');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_casted_tbl', 'tbox_cast_', 'Casting');
//});
//$('#qig_save_cast_btn_cw1').live('click', function () {
//    save_qig('af_qig_casted_cw2_tbl', 'tbox_cast_', 'Casting');
//});
//$('#qig_save_cast_btn_cw2').live('click', function () {
//    save_qig('af_qig_casted_cw2_tbl', 'tbox_cast_', 'Casting');
//});


//Save QIG_Reject
//$('#qig_save_rej_btn_cw1').live('click', function () {
//    save_qig('af_qig_reject_tbl', 'tbox_reject_', 'Reject');
//});
//$('#qig_save_rej_btn_cw2').live('click', function () {
//    save_qig('af_qig_reject_tbl', 'tbox_reject_', 'Reject');
//});
//$('#qig_save_rej_btn_cw1').live('click', function () {
//    save_qig('af_qig_reject_cw2_tbl', 'tbox_reject_', 'Reject');
//});
//$('#qig_save_rej_btn_cw2').live('click', function () {
//    save_qig('af_qig_reject_cw2_tbl', 'tbox_reject_', 'Reject');
//});

function save_afqig_input() {
    //Save QIG_Reworkables   
    save_qig('af_qig_rework_tbl', 'tbox_rework_', 'Reworkables');
    save_qig_cw2('af_qig_rework_cw2_tbl', 'tbox_rework_', 'Reworkables');
    //Save QIG_Casting      
    save_qig('af_qig_grade_a_tbl', 'tbox_cast_', 'Grade A');
    save_qig('af_qig_grade_cw2_a_tbl', 'tbox_cast_', 'Grade A');
    save_qig('af_qig_grade_b_tbl', 'tbox_cast_', 'Grade B');
    save_qig('af_qig_grade_cw2_b_tbl', 'tbox_cast_', 'Grade B');
    save_qig('af_qig_casted_tbl', 'tbox_cast_', 'Casting');
    save_qig('af_qig_casted_cw2_tbl', 'tbox_cast_', 'Casting');
    //Save QIG_Reject       
    save_qig('af_qig_reject_tbl', 'tbox_reject_', 'Reject');
    save_qig('af_qig_reject_cw2_tbl', 'tbox_reject_', 'Reject');
    alert('Changes now saved.');
    load_af_page();
}

function save_qig(tbl_name, prefix, msg) {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var items = [];

    $('#' + tbl_name).find('input.change').each(function () {
        //$(this).find('input.change').each(function () {
        // $(this).closest('#' + tbl_name).find('input.default').val();
        var attrid = $(this).attr('id');
        var strValue = attrid.replace(prefix, '');
        var params = strValue.split("_");

        var afparamid_ = params[3];
        var afqigtypeid_ = params[0];
        var afcw_ = params[2];
        var afhrid_ = params[1];
        var qigothers_ = $(this).closest('td').next('td').find('input.others').val();
        //var qigothers_ = params[5];
        var val_ = $(this).val();


        // if (val_ != "") {
        items.push({
            aflotid: aflotid_,
            afdate: afdate_,
            afparamid: afparamid_,
            afqigtypeid: afqigtypeid_,
            afcw: afcw_,
            afhrid: afhrid_,
            qigothers: qigothers_,
            val: val_

        })
        // }

    });
    //});
    if (items.length > 0) {
        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            cache: false,
            url: afserverpath + '/AnodeFurnace/Save_QIG',
            data: items,
            success: function (data) {
                //alert('Changes in ' + msg + ' was now saved.');

                //load_afqig_data_rework();
                //load_afgrade_a();
                //load_afgrade_b();
                //load_afqig_data_cast();
                //load_afqig_data_reject();
                //load_afqig_data_rework_cw2();
                //load_afqig_data_cast_cw2();
                //load_afqig_data_reject_cw2();
                //load_afgrade_a_cw2();
                //load_afgrade_b_cw2();
                //load_cast_sum();

            }

        });
    }
}
function save_qig_cw2(tbl_name, prefix, msg) {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var items = [];

    $('#' + tbl_name).find('input.change').each(function () {
        //$(this).find('input.change').each(function () {
        // $(this).closest('#' + tbl_name).find('input.default').val();
        var attrid = $(this).attr('id');
        var strValue = attrid.replace(prefix, '');
        var params = strValue.split("_");

        var afparamid_ = params[3];
        var afqigtypeid_ = params[0];
        var afcw_ = params[2];
        var afhrid_ = params[1];
        var qigothers_ = $(this).closest('td').next('td').find('input.others').val();
        //var qigothers_ = params[5];
        var val_ = $(this).val();


        // if (val_ != "") {
        items.push({
            aflotid: aflotid_,
            afdate: afdate_,
            afparamid: afparamid_,
            afqigtypeid: afqigtypeid_,
            afcw: afcw_,
            afhrid: afhrid_,
            qigothers: qigothers_,
            val: val_

        })
        // }

    });
    //});

    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: afserverpath + '/AnodeFurnace/Save_QIG',
        data: items,
        success: function (data) {
            //alert('Changes in ' + msg + ' was now saved.');

            //load_afqig_data_rework();
            //load_afqig_data_rework_cw2();
            //load_afqig_data_reject();
            //load_afqig_data_cast();
            //load_afqig_data_cast_cw2();
            //load_afgrade_a();
            //load_afgrade_a_cw2();
            //load_afgrade_b();
            //load_afgrade_b_cw2();
            //load_cast_sum();

        }

    });
}

//reworked data QIG - cw1 #1 DONE
function load_afqig_data_rework() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW1_1ST2ROUND = 0;
    var CW1_OTHR_1ST2ROUND = 0;

    var CW1_1H = 0;
    var CW1_OTHR_1H = 0;

    var CW1_2H = 0;
    var CW1_OTHR_2H = 0;

    var CW1_3H = 0;
    var CW1_OTHR_3H = 0;

    var CW1_4H = 0;
    var CW1_OTHR_4H = 0;

    var CW1_5H = 0;
    var CW1_OTHR_5H = 0;

    var CW1_6H = 0;
    var CW1_OTHR_6H = 0;

    var CW1_7H = 0;
    var CW1_OTHR_7H = 0;

    var CW1_8H = 0;
    var CW1_OTHR_8H = 0;

    var CW1_9H = 0;
    var CW1_OTHR_9H = 0;

    var CW1_10H = 0;
    var CW1_OTHR_10H = 0;

    var CW1_TOTAL = 0;
    var CW1_OTHR_TOTAL = 0;


    $('#af_qig_rework_tbl td').remove();
    $('#af_qig_rework_tbl .trdata').remove();
    $('.tr_total_qig').remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 1
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                $('#af_qig_rework_tbl tr:last')
                    .after('<tr id = trqig_' + x + ' class ="trdata"><th>' + x + '</th><th class="td_left">'
                    + value.AFParamName + '</th><td class="af_qig_rework_tbl"><input id="tbox_rework_1_1_1_' + value.AFParamId + '_1" type="text" class="default" value="' + zerovalue_null_af(value.CW1_1ST2ROUND) +
                    '"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_1ST2ROUND) + '" id="tbox_rework_1_1_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_1H) + '" id="tbox_rework_1_2_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_1H) + '" id="tbox_rework_1_2_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_2H) + '" id="tbox_rework_1_3_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_2H) + '" id="tbox_rework_1_3_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_3H) + '" id="tbox_rework_1_4_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_3H) + '" id="tbox_rework_1_4_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_4H) + '" id="tbox_rework_1_5_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_4H) + '" id="tbox_rework_1_5_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_5H) + '" id="tbox_rework_1_6_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_5H) + '" id="tbox_rework_1_6_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_6H) + '" id="tbox_rework_1_7_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_6H) + '" id="tbox_rework_1_7_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_7H) + '" id="tbox_rework_1_8_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_7H) + '" id="tbox_rework_1_8_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_8H) + '" id="tbox_rework_1_9_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_8H) + '" id="tbox_rework_1_9_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_9H) + '" id="tbox_rework_1_10_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_9H) + '" id="tbox_rework_1_10_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_10H) + '" id="tbox_rework_1_11_1_' + value.AFParamId +
                    '_1"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_10H) + '" id="tbox_rework_1_11_1_' + value.AFParamId +
                    '_1"></td><th class="af_qig_rework_tbl"><input type="text" name="rework_cw1_default_total" class="rework_cw1_default_total" value="' + zerovalue_null_af(value.TotalCW1Default) + '" id="tbox_rework_' + value.AFParamId +
                    '_1_1" disabled="true"></th><th class="af_qig_rework_tbl"><input type="text" name="rework_cw1_othr_total" class="rework_cw1_othr_total" value="' + zerovalue_null_af(value.TotalCW1Other) + '" id="tbox_rework_' + value.AFParamId +
                    '_1_2" name="" disabled="true"></th></tr>');

                //if (x <= 15) {


                //}


                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });

                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });




                if (x <= 14) {
                    CW1_1ST2ROUND = CW1_1ST2ROUND + zerovalue_null(value.CW1_1ST2ROUND);
                    CW1_OTHR_1ST2ROUND = CW1_OTHR_1ST2ROUND + zerovalue_null(value.CW1_OTHR_1ST2ROUND);

                    CW1_1H = CW1_1H + zerovalue_null(value.CW1_1H);
                    CW1_OTHR_1H = CW1_OTHR_1H + zerovalue_null(value.CW1_OTHR_1H);

                    CW1_2H = CW1_2H + zerovalue_null(value.CW1_2H);
                    CW1_OTHR_2H = CW1_OTHR_2H + zerovalue_null(value.CW1_OTHR_2H);

                    CW1_3H = CW1_3H + zerovalue_null(value.CW1_3H);
                    CW1_OTHR_3H = CW1_OTHR_3H + zerovalue_null(value.CW1_OTHR_3H);

                    CW1_4H = CW1_4H + zerovalue_null(value.CW1_4H);
                    CW1_OTHR_4H = CW1_OTHR_4H + zerovalue_null(value.CW1_OTHR_4H);

                    CW1_5H = CW1_5H + zerovalue_null(value.CW1_5H);
                    CW1_OTHR_5H = CW1_OTHR_5H + zerovalue_null(value.CW1_OTHR_5H);

                    CW1_6H = CW1_6H + zerovalue_null(value.CW1_6H);
                    CW1_OTHR_6H = CW1_OTHR_6H + zerovalue_null(value.CW1_OTHR_6H);

                    CW1_7H = CW1_7H + zerovalue_null(value.CW1_7H);
                    CW1_OTHR_7H = CW1_OTHR_7H + zerovalue_null(value.CW1_OTHR_7H);

                    CW1_8H = CW1_8H + zerovalue_null(value.CW1_8H);
                    CW1_OTHR_8H = CW1_OTHR_8H + zerovalue_null(value.CW1_OTHR_8H);

                    CW1_9H = CW1_9H + zerovalue_null(value.CW1_9H);
                    CW1_OTHR_9H = CW1_OTHR_9H + zerovalue_null(value.CW1_OTHR_9H);

                    CW1_10H = CW1_10H + zerovalue_null(value.CW1_10H);
                    CW1_OTHR_10H = CW1_OTHR_10H + zerovalue_null(value.CW1_OTHR_10H);

                    CW1_TOTAL = CW1_TOTAL + zerovalue_null(value.TotalCW1Default);
                    CW1_OTHR_TOTAL = CW1_OTHR_TOTAL + zerovalue_null(value.TotalCW1Other);


                }
                //total below
                if (x == 14) {
                    table_total_rework_cw1_qig('#af_qig_rework_tbl', CW1_1ST2ROUND, CW1_OTHR_1ST2ROUND,
                                    CW1_1H, CW1_OTHR_1H,
                                    CW1_2H, CW1_OTHR_2H,
                                    CW1_3H, CW1_OTHR_3H,
                                    CW1_4H, CW1_OTHR_4H,
                                    CW1_5H, CW1_OTHR_5H,
                                    CW1_6H, CW1_OTHR_6H,
                                    CW1_7H, CW1_OTHR_7H,
                                    CW1_8H, CW1_OTHR_8H,
                                    CW1_9H, CW1_OTHR_9H,
                                    CW1_10H, CW1_OTHR_10H,
                                    CW1_TOTAL, CW1_OTHR_TOTAL
                                    );
                }


                x = x + 1;

            });
            $('#af_qig_rework_tbl').find('input[id*="tbox_rework_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });

        }

    });

}




function table_total_rework_cw1_qig(tablename,
    CW1_1ST2ROUND, CW1_OTHR_1ST2ROUND,
    CW1_1H, CW1_OTHR_1H,
    CW1_2H, CW1_OTHR_2H,
    CW1_3H, CW1_OTHR_3H,
    CW1_4H, CW1_OTHR_4H,
    CW1_5H, CW1_OTHR_5H,
    CW1_6H, CW1_OTHR_6H,
    CW1_7H, CW1_OTHR_7H,
    CW1_8H, CW1_OTHR_8H,
    CW1_9H, CW1_OTHR_9H,
    CW1_10H, CW1_OTHR_10H,
    CW1_TOTAL, CW1_OTHR_TOTAL) {

    $(tablename + ' #trqig_14').after('<tr class="tr_total_qig"><td colspan = 2><i>TOTAL</i></td><td>'
        + CW1_1ST2ROUND + '</td><td>' + CW1_OTHR_1ST2ROUND + '</td><td>'
        + CW1_1H + '</td><td>' + CW1_OTHR_1H + '</td><td>'
        + CW1_2H + '</td><td>' + CW1_OTHR_2H + '</td><td>'
        + CW1_3H + '</td><td>' + CW1_OTHR_3H + '</td><td>'
        + CW1_4H + '</td><td>' + CW1_OTHR_4H + '</td><td>'
        + CW1_5H + '</td><td>' + CW1_OTHR_5H + '</td><td>'
        + CW1_6H + '</td><td>' + CW1_OTHR_6H + '</td><td>'
        + CW1_7H + '</td><td>' + CW1_OTHR_7H + '</td><td>'
        + CW1_8H + '</td><td>' + CW1_OTHR_8H + '</td><td>'
        + CW1_9H + '</td><td>' + CW1_OTHR_9H + '</td><td>'
        + CW1_10H + '</td><td>' + CW1_OTHR_10H + '</td><td id="rework_cw1">'
        + CW1_TOTAL + '</td><td id="rework_cw1_other">' + CW1_OTHR_TOTAL + '</td></tr>');

    var sum = $('#rework_cw1').text();
    var sum2 = $('#rework_cw1_other').text();
    $('#rework_1').val(sum);
    $('#rework_2').val(sum2);
}

//reworked data QIG - cw2 #9 DONE
function load_afqig_data_rework_cw2() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW2_1ST2ROUND = 0;
    var CW2_OTHR_1ST2ROUND = 0;

    var CW2_1H = 0;
    var CW2_OTHR_1H = 0;

    var CW2_2H = 0;
    var CW2_OTHR_2H = 0;

    var CW2_3H = 0;
    var CW2_OTHR_3H = 0;

    var CW2_4H = 0;
    var CW2_OTHR_4H = 0;

    var CW2_5H = 0;
    var CW2_OTHR_5H = 0;

    var CW2_6H = 0;
    var CW2_OTHR_6H = 0;

    var CW2_7H = 0;
    var CW2_OTHR_7H = 0;

    var CW2_8H = 0;
    var CW2_OTHR_8H = 0;

    var CW2_9H = 0;
    var CW2_OTHR_9H = 0;

    var CW2_10H = 0;
    var CW2_OTHR_10H = 0;

    var cw2_total = 0;
    var cw2_othr_total = 0;


    $('#af_qig_rework_cw2_tbl td').remove();
    $('#af_qig_rework_cw2_tbl .trdata').remove();
    $('.tr_total_qig').remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 1
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {



                $('#af_qig_rework_cw2_tbl tr:last').after('<tr id = trqig_' + x + ' class ="trdata"><th>' + x + '</th><th class="td_left">' + value.AFParamName +
                            '</th><td class="af_qig_rework_tbl"><input id="tbox_rework_1_1_2_' + value.AFParamId + '_2" type="text" class="default" value="' + zerovalue_null_af(value.CW2_1ST2ROUND) +
                            '"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_1ST2ROUND) + '" id="tbox_rework_1_1_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_1H) + '" id="tbox_rework_1_2_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_1H) + '" id="tbox_rework_1_2_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_2H) + '" id="tbox_rework_1_3_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_2H) + '" id="tbox_rework_1_3_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_3H) + '" id="tbox_rework_1_4_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_3H) + '" id="tbox_rework_1_4_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_4H) + '" id="tbox_rework_1_5_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_4H) + '" id="tbox_rework_1_5_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_5H) + '" id="tbox_rework_1_6_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_5H) + '" id="tbox_rework_1_6_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_6H) + '" id="tbox_rework_1_7_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_6H) + '" id="tbox_rework_1_7_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_7H) + '" id="tbox_rework_1_8_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_7H) + '" id="tbox_rework_1_8_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_8H) + '" id="tbox_rework_1_9_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_8H) + '" id="tbox_rework_1_9_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_9H) + '" id="tbox_rework_1_10_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_9H) + '" id="tbox_rework_1_10_2_' + value.AFParamId +

                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_10H) + '" id="tbox_rework_1_11_2_' + value.AFParamId +
                            '_2"></td><td class="af_qig_rework_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_10H) + '" id="tbox_rework_1_11_2_' + value.AFParamId +
                            '_2"></td><th class="af_qig_rework_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.TotalCW2Default) + '" id="tbox_rework_' + value.AFParamId +
                            '_1_1" name="" disabled="true"></th><th class="af_qig_rework_tbl"><input type="text" class="rj" value="' + zerovalue_null_af(value.TotalCW2Other) + '" id="tbox_rework_' + value.AFParamId +
                            '_1_1" name="" disabled="true"></th></tr>');


                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });

                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });



                if (x <= 14) {
                    CW2_1ST2ROUND = CW2_1ST2ROUND + zerovalue_null(value.CW2_1ST2ROUND);
                    CW2_OTHR_1ST2ROUND = CW2_OTHR_1ST2ROUND + zerovalue_null(value.CW2_OTHR_1ST2ROUND);

                    CW2_1H = CW2_1H + zerovalue_null(value.CW2_1H);
                    CW2_OTHR_1H = CW2_OTHR_1H + zerovalue_null(value.CW2_OTHR_1H);

                    CW2_2H = CW2_2H + zerovalue_null(value.CW2_2H);
                    CW2_OTHR_2H = CW2_OTHR_2H + zerovalue_null(value.CW2_OTHR_2H);

                    CW2_3H = CW2_3H + zerovalue_null(value.CW2_3H);
                    CW2_OTHR_3H = CW2_OTHR_3H + zerovalue_null(value.CW2_OTHR_3H);

                    CW2_4H = CW2_4H + zerovalue_null(value.CW2_4H);
                    CW2_OTHR_4H = CW2_OTHR_4H + zerovalue_null(value.CW2_OTHR_4H);

                    CW2_5H = CW2_5H + zerovalue_null(value.CW2_5H);
                    CW2_OTHR_5H = CW2_OTHR_5H + zerovalue_null(value.CW2_OTHR_5H);

                    CW2_6H = CW2_6H + zerovalue_null(value.CW2_6H);
                    CW2_OTHR_6H = CW2_OTHR_6H + zerovalue_null(value.CW2_OTHR_6H);

                    CW2_7H = CW2_7H + zerovalue_null(value.CW2_7H);
                    CW2_OTHR_7H = CW2_OTHR_7H + zerovalue_null(value.CW2_OTHR_7H);

                    CW2_8H = CW2_8H + zerovalue_null(value.CW2_8H);
                    CW2_OTHR_8H = CW2_OTHR_8H + zerovalue_null(value.CW2_OTHR_8H);

                    CW2_9H = CW2_9H + zerovalue_null(value.CW2_9H);
                    CW2_OTHR_9H = CW2_OTHR_9H + zerovalue_null(value.CW2_OTHR_9H);

                    CW2_10H = CW2_10H + zerovalue_null(value.CW2_10H);
                    CW2_OTHR_10H = CW2_OTHR_10H + zerovalue_null(value.CW2_OTHR_10H);

                    cw2_total = cw2_total + zerovalue_null(value.TotalCW2Default);
                    cw2_othr_total = cw2_othr_total + zerovalue_null(value.TotalCW2Other);


                }
                if (x == 14) {
                    table_total_rework_cw2_qig('#af_qig_rework_cw2_tbl', CW2_1ST2ROUND, CW2_OTHR_1ST2ROUND,
                                    CW2_1H, CW2_OTHR_1H,
                                    CW2_2H, CW2_OTHR_2H,
                                    CW2_3H, CW2_OTHR_3H,
                                    CW2_4H, CW2_OTHR_4H,
                                    CW2_5H, CW2_OTHR_5H,
                                    CW2_6H, CW2_OTHR_6H,
                                    CW2_7H, CW2_OTHR_7H,
                                    CW2_8H, CW2_OTHR_8H,
                                    CW2_9H, CW2_OTHR_9H,
                                    CW2_10H, CW2_OTHR_10H,
                                    cw2_total, cw2_othr_total
                                    );
                }


                x = x + 1;

            });
            $('#af_qig_rework_cw2_tbl').find('input[id*="tbox_rework_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });

        }

    });

}

function table_total_rework_cw2_qig(tablename,
    CW2_1ST2ROUND, CW2_OTHR_1ST2ROUND,
    CW2_1H, CW2_OTHR_1H,
    CW2_2H, CW2_OTHR_2H,
    CW2_3H, CW2_OTHR_3H,
    CW2_4H, CW2_OTHR_4H,
    CW2_5H, CW2_OTHR_5H,
    CW2_6H, CW2_OTHR_6H,
    CW2_7H, CW2_OTHR_7H,
    CW2_8H, CW2_OTHR_8H,
    CW2_9H, CW2_OTHR_9H,
    CW2_10H, CW2_OTHR_10H,
    CW2_TOTAL, CW2_OTHR_TOTAL) {

    $(tablename + ' #trqig_14').after('<tr class="tr_total_qig"><td colspan = 2><i>TOTAL</i></td><td>'
        + CW2_1ST2ROUND + '</td><td>' + CW2_OTHR_1ST2ROUND + '</td><td>'
        + CW2_1H + '</td><td>' + CW2_OTHR_1H + '</td><td>'
        + CW2_2H + '</td><td>' + CW2_OTHR_2H + '</td><td>'
        + CW2_3H + '</td><td>' + CW2_OTHR_3H + '</td><td>'
        + CW2_4H + '</td><td>' + CW2_OTHR_4H + '</td><td>'
        + CW2_5H + '</td><td>' + CW2_OTHR_5H + '</td><td>'
        + CW2_6H + '</td><td>' + CW2_OTHR_6H + '</td><td>'
        + CW2_7H + '</td><td>' + CW2_OTHR_7H + '</td><td>'
        + CW2_8H + '</td><td>' + CW2_OTHR_8H + '</td><td>'
        + CW2_9H + '</td><td>' + CW2_OTHR_9H + '</td><td>'
        + CW2_10H + '</td><td>' + CW2_OTHR_10H + '</td><td id="rework_cw2">'
        + CW2_TOTAL + '</td><td id="rework_cw2_other">' + CW2_OTHR_TOTAL + '</td></tr>');

    var sum = $('#rework_cw2').text();
    var sum2 = $('#rework_cw2_other').text();
    $('#rework_3').val(sum);
    $('#rework_4').val(sum2);
}

//grade A #4 DONE
function load_afgrade_a() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW1_1ST2ROUND = 0;
    var CW1_OTHR_1ST2ROUND = 0;

    var CW1_1H = 0;
    var CW1_OTHR_1H = 0;

    var CW1_2H = 0;
    var CW1_OTHR_2H = 0;

    var CW1_3H = 0;
    var CW1_OTHR_3H = 0;

    var CW1_4H = 0;
    var CW1_OTHR_4H = 0;

    var CW1_5H = 0;
    var CW1_OTHR_5H = 0;

    var CW1_6H = 0;
    var CW1_OTHR_6H = 0;

    var CW1_7H = 0;
    var CW1_OTHR_7H = 0;

    var CW1_8H = 0;
    var CW1_OTHR_8H = 0;

    var CW1_9H = 0;
    var CW1_OTHR_9H = 0;

    var CW1_10H = 0;
    var CW1_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_othr_total = 0;

    $('#af_qig_grade_a_tbl td.td_graded').remove();
    $('#af_qig_grade_a_tbl th.td_graded').remove();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 4
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_grade_a_tbl td:eq(0)').text(zerovalue_null_af(value.CW1_1ST2ROUND));
                $('#af_qig_grade_a_tbl td:eq(1)').text(zerovalue_null_af(value.CW1_OTHR_1ST2ROUND));
                $('#af_qig_grade_a_tbl td:eq(2)').text(zerovalue_null_af(value.CW1_1H));
                $('#af_qig_grade_a_tbl td:eq(3)').text(zerovalue_null_af(value.CW1_OTHR_1H));
                $('#af_qig_grade_a_tbl td:eq(4)').text(zerovalue_null_af(value.CW1_2H));
                $('#af_qig_grade_a_tbl td:eq(5)').text(zerovalue_null_af(value.CW1_OTHR_2H));
                $('#af_qig_grade_a_tbl td:eq(6)').text(zerovalue_null_af(value.CW1_3H));
                $('#af_qig_grade_a_tbl td:eq(7)').text(zerovalue_null_af(value.CW1_OTHR_3H));
                $('#af_qig_grade_a_tbl td:eq(8)').text(zerovalue_null_af(value.CW1_4H));
                $('#af_qig_grade_a_tbl td:eq(9)').text(zerovalue_null_af(value.CW1_OTHR_4H));
                $('#af_qig_grade_a_tbl td:eq(10)').text(zerovalue_null_af(value.CW1_5H));
                $('#af_qig_grade_a_tbl td:eq(11)').text(zerovalue_null_af(value.CW1_OTHR_5H));
                $('#af_qig_grade_a_tbl td:eq(12)').text(zerovalue_null_af(value.CW1_6H));
                $('#af_qig_grade_a_tbl td:eq(13)').text(zerovalue_null_af(value.CW1_OTHR_6H));
                $('#af_qig_grade_a_tbl td:eq(14)').text(zerovalue_null_af(value.CW1_7H));
                $('#af_qig_grade_a_tbl td:eq(15)').text(zerovalue_null_af(value.CW1_OTHR_7H));
                $('#af_qig_grade_a_tbl td:eq(16)').text(zerovalue_null_af(value.CW1_8H));
                $('#af_qig_grade_a_tbl td:eq(17)').text(zerovalue_null_af(value.CW1_OTHR_8H));
                $('#af_qig_grade_a_tbl td:eq(18)').text(zerovalue_null_af(value.CW1_9H));
                $('#af_qig_grade_a_tbl td:eq(19)').text(zerovalue_null_af(value.CW1_OTHR_9H));
                $('#af_qig_grade_a_tbl td:eq(20)').text(zerovalue_null_af(value.CW1_10H));
                $('#af_qig_grade_a_tbl td:eq(21)').text(zerovalue_null_af(value.CW1_OTHR_10H));
                $('#af_qig_grade_a_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW1Default));
                $('#af_qig_grade_a_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW1Other));

                //Grade A
                $('#af_qig_grade_a_tbl th:last').after('<td class="td_graded"><input class="default" id="tbox_cast_4_1_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_2_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_3_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_2H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_2H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_4_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_3H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_3H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_5_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_4H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_4H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_6_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_5H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_5H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_7_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_6H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_6H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_8_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_7H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_7H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_9_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_8H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_8H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_10_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_9H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_9H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_11_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_10H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_10H) +
                    '"></td><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW1Default) +
                    '" disabled="true"></th><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW1Other) +
                    '" disabled="true"></th>');



                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
            });
            $('#af_qig_grade_a_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });
        }

    });
}
// TO BE CONT.
function load_afgrade_a_cw2() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW2_1ST2ROUND = 0;
    var CW2_OTHR_1ST2ROUND = 0;

    var CW2_1H = 0;
    var CW2_OTHR_1H = 0;

    var CW2_2H = 0;
    var CW2_OTHR_2H = 0;

    var CW2_3H = 0;
    var CW2_OTHR_3H = 0;

    var CW2_4H = 0;
    var CW2_OTHR_4H = 0;

    var CW2_5H = 0;
    var CW2_OTHR_5H = 0;

    var CW2_6H = 0;
    var CW2_OTHR_6H = 0;

    var CW2_7H = 0;
    var CW2_OTHR_7H = 0;

    var CW2_8H = 0;
    var CW2_OTHR_8H = 0;

    var CW2_9H = 0;
    var CW2_OTHR_9H = 0;

    var CW2_10H = 0;
    var CW2_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_othr_total = 0;

    $('#af_qig_grade_cw2_a_tbl td.td_graded').remove();
    $('#af_qig_grade_cw2_a_tbl th.td_graded').remove();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 4
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_grade_cw2_a_tbl td:eq(0)').text(zerovalue_null_af(value.CW2_1ST2ROUND));
                $('#af_qig_grade_cw2_a_tbl td:eq(1)').text(zerovalue_null_af(value.CW2_OTHR_1ST2ROUND));
                $('#af_qig_grade_cw2_a_tbl td:eq(2)').text(zerovalue_null_af(value.CW2_1H));
                $('#af_qig_grade_cw2_a_tbl td:eq(3)').text(zerovalue_null_af(value.CW2_OTHR_1H));
                $('#af_qig_grade_cw2_a_tbl td:eq(4)').text(zerovalue_null_af(value.CW2_2H));
                $('#af_qig_grade_cw2_a_tbl td:eq(5)').text(zerovalue_null_af(value.CW2_OTHR_3H));
                $('#af_qig_grade_cw2_a_tbl td:eq(6)').text(zerovalue_null_af(value.CW2_3H));
                $('#af_qig_grade_cw2_a_tbl td:eq(7)').text(zerovalue_null_af(value.CW2_OTHR_3H));
                $('#af_qig_grade_cw2_a_tbl td:eq(8)').text(zerovalue_null_af(value.CW2_4H));
                $('#af_qig_grade_cw2_a_tbl td:eq(9)').text(zerovalue_null_af(value.CW2_OTHR_4H));
                $('#af_qig_grade_cw2_a_tbl td:eq(10)').text(zerovalue_null_af(value.CW2_5H));
                $('#af_qig_grade_cw2_a_tbl td:eq(11)').text(zerovalue_null_af(value.CW2_OTHR_5H));
                $('#af_qig_grade_cw2_a_tbl td:eq(12)').text(zerovalue_null_af(value.CW2_6H));
                $('#af_qig_grade_cw2_a_tbl td:eq(13)').text(zerovalue_null_af(value.CW2_OTHR_6H));
                $('#af_qig_grade_cw2_a_tbl td:eq(14)').text(zerovalue_null_af(value.CW2_7H));
                $('#af_qig_grade_cw2_a_tbl td:eq(15)').text(zerovalue_null_af(value.CW2_OTHR_7H));
                $('#af_qig_grade_cw2_a_tbl td:eq(16)').text(zerovalue_null_af(value.CW2_8H));
                $('#af_qig_grade_cw2_a_tbl td:eq(17)').text(zerovalue_null_af(value.CW2_OTHR_8H));
                $('#af_qig_grade_cw2_a_tbl td:eq(18)').text(zerovalue_null_af(value.CW2_9H));
                $('#af_qig_grade_cw2_a_tbl td:eq(19)').text(zerovalue_null_af(value.CW2_OTHR_9H));
                $('#af_qig_grade_cw2_a_tbl td:eq(20)').text(zerovalue_null_af(value.CW2_10H));
                $('#af_qig_grade_cw2_a_tbl td:eq(21)').text(zerovalue_null_af(value.CW2_OTHR_10H));
                $('#af_qig_grade_cw2_a_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW2Default));
                $('#af_qig_grade_cw2_a_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW2Other));

                //Grade A
                $('#af_qig_grade_cw2_a_tbl th:last').after('<td class="td_graded"><input class="default" id="tbox_cast_4_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_2H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_2H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_3H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_3H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_4H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_4H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_5H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_5H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_6H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_6H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_7H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_7H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_8H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_8H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_9H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_9H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_4_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_10H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_4_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_10H) +
                    '"></td><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW2Default) +
                    '" disabled="true"></th><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW2Other) +
                    '" disabled="true"></th>');



                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
            });
            $('#af_qig_grade_cw2_a_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });

        }

    });
}

//#5
function load_afgrade_b() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW1_1ST2ROUND = 0;
    var CW1_OTHR_1ST2ROUND = 0;

    var CW1_1H = 0;
    var CW1_OTHR_1H = 0;

    var CW1_2H = 0;
    var CW1_OTHR_2H = 0;

    var CW1_3H = 0;
    var CW1_OTHR_3H = 0;

    var CW1_4H = 0;
    var CW1_OTHR_4H = 0;

    var CW1_5H = 0;
    var CW1_OTHR_5H = 0;

    var CW1_6H = 0;
    var CW1_OTHR_6H = 0;

    var CW1_7H = 0;
    var CW1_OTHR_7H = 0;

    var CW1_8H = 0;
    var CW1_OTHR_8H = 0;

    var CW1_9H = 0;
    var CW1_OTHR_9H = 0;

    var CW1_10H = 0;
    var CW1_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_total = 0;

    $('#af_qig_grade_b_tbl td.td_graded').remove();
    $('#af_qig_grade_b_tbl th.td_graded').remove();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 5
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_grade_b_tbl td:eq(0)').text(zerovalue_null_af(value.CW1_1ST2ROUND));
                $('#af_qig_grade_b_tbl td:eq(1)').text(zerovalue_null_af(value.CW1_OTHR_1ST2ROUND));
                $('#af_qig_grade_b_tbl td:eq(2)').text(zerovalue_null_af(value.CW1_1H));
                $('#af_qig_grade_b_tbl td:eq(3)').text(zerovalue_null_af(value.CW1_OTHR_1H));
                $('#af_qig_grade_b_tbl td:eq(4)').text(zerovalue_null_af(value.CW1_2H));
                $('#af_qig_grade_b_tbl td:eq(5)').text(zerovalue_null_af(value.CW1_OTHR_2H));
                $('#af_qig_grade_b_tbl td:eq(6)').text(zerovalue_null_af(value.CW1_3H));
                $('#af_qig_grade_b_tbl td:eq(7)').text(zerovalue_null_af(value.CW1_OTHR_3H));
                $('#af_qig_grade_b_tbl td:eq(8)').text(zerovalue_null_af(value.CW1_4H));
                $('#af_qig_grade_b_tbl td:eq(9)').text(zerovalue_null_af(value.CW1_OTHR_4H));
                $('#af_qig_grade_b_tbl td:eq(10)').text(zerovalue_null_af(value.CW1_5H));
                $('#af_qig_grade_b_tbl td:eq(11)').text(zerovalue_null_af(value.CW1_OTHR_5H));
                $('#af_qig_grade_b_tbl td:eq(12)').text(zerovalue_null_af(value.CW1_6H));
                $('#af_qig_grade_b_tbl td:eq(13)').text(zerovalue_null_af(value.CW1_OTHR_6H));
                $('#af_qig_grade_b_tbl td:eq(14)').text(zerovalue_null_af(value.CW1_7H));
                $('#af_qig_grade_b_tbl td:eq(15)').text(zerovalue_null_af(value.CW1_OTHR_7H));
                $('#af_qig_grade_b_tbl td:eq(16)').text(zerovalue_null_af(value.CW1_8H));
                $('#af_qig_grade_b_tbl td:eq(17)').text(zerovalue_null_af(value.CW1_OTHR_8H));
                $('#af_qig_grade_b_tbl td:eq(18)').text(zerovalue_null_af(value.CW1_9H));
                $('#af_qig_grade_b_tbl td:eq(19)').text(zerovalue_null_af(value.CW1_OTHR_9H));
                $('#af_qig_grade_b_tbl td:eq(20)').text(zerovalue_null_af(value.CW1_10H));
                $('#af_qig_grade_b_tbl td:eq(21)').text(zerovalue_null_af(value.CW1_OTHR_10H));
                $('#af_qig_grade_b_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW1Default));
                $('#af_qig_grade_b_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW1Other));

                //Grade B
                $('#af_qig_grade_b_tbl th:last').after('<td class="td_graded"><input class="default" id="tbox_cast_5_1_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_2_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_3_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_2H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_2H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_4_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_3H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_3H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_5_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_4H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_4H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_6_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_5H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_5H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_7_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_6H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_6H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_8_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_7H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_7H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_9_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_8H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_8H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_10_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_9H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_9H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_11_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_10H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_10H) +
                    '"></td><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW1Default) +
                    '" disabled="true"></th><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW1Other) +
                    '" disabled="true"></th>');





                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
            });
            $('#af_qig_grade_b_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });

        }

    });






}

function load_afgrade_b_cw2() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW2_1ST2ROUND = 0;
    var CW2_OTHR_1ST2ROUND = 0;

    var CW2_1H = 0;
    var CW2_OTHR_1H = 0;

    var CW2_2H = 0;
    var CW2_OTHR_2H = 0;

    var CW2_3H = 0;
    var CW2_OTHR_3H = 0;

    var CW2_4H = 0;
    var CW2_OTHR_4H = 0;

    var CW2_5H = 0;
    var CW2_OTHR_5H = 0;

    var CW2_6H = 0;
    var CW2_OTHR_6H = 0;

    var CW2_7H = 0;
    var CW2_OTHR_7H = 0;

    var CW2_8H = 0;
    var CW2_OTHR_8H = 0;

    var CW2_9H = 0;
    var CW2_OTHR_9H = 0;

    var CW2_10H = 0;
    var CW2_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_total = 0;

    $('#af_qig_grade_cw2_b_tbl td.td_graded').remove();
    $('#af_qig_grade_cw2_b_tbl th.td_graded').remove();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 5
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_grade_cw2_b_tbl td:eq(0)').text(zerovalue_null_af(value.CW2_1ST2ROUND));
                $('#af_qig_grade_cw2_b_tbl td:eq(1)').text(zerovalue_null_af(value.CW2_OTHR_1ST2ROUND));
                $('#af_qig_grade_cw2_b_tbl td:eq(2)').text(zerovalue_null_af(value.CW2_1H));
                $('#af_qig_grade_cw2_b_tbl td:eq(3)').text(zerovalue_null_af(value.CW2_OTHR_1H));
                $('#af_qig_grade_cw2_b_tbl td:eq(4)').text(zerovalue_null_af(value.CW2_2H));
                $('#af_qig_grade_cw2_b_tbl td:eq(5)').text(zerovalue_null_af(value.CW2_OTHR_2H));
                $('#af_qig_grade_cw2_b_tbl td:eq(6)').text(zerovalue_null_af(value.CW2_3H));
                $('#af_qig_grade_cw2_b_tbl td:eq(7)').text(zerovalue_null_af(value.CW2_OTHR_3H));
                $('#af_qig_grade_cw2_b_tbl td:eq(8)').text(zerovalue_null_af(value.CW2_4H));
                $('#af_qig_grade_cw2_b_tbl td:eq(9)').text(zerovalue_null_af(value.CW2_OTHR_4H));
                $('#af_qig_grade_cw2_b_tbl td:eq(10)').text(zerovalue_null_af(value.CW2_OTHR_5H));
                $('#af_qig_grade_cw2_b_tbl td:eq(11)').text(zerovalue_null_af(value.CW2_5H));
                $('#af_qig_grade_cw2_b_tbl td:eq(12)').text(zerovalue_null_af(value.CW2_6H));
                $('#af_qig_grade_cw2_b_tbl td:eq(13)').text(zerovalue_null_af(value.CW2_OTHR_6H));
                $('#af_qig_grade_cw2_b_tbl td:eq(14)').text(zerovalue_null_af(value.CW2_7H));
                $('#af_qig_grade_cw2_b_tbl td:eq(15)').text(zerovalue_null_af(value.CW2_OTHR_7H));
                $('#af_qig_grade_cw2_b_tbl td:eq(16)').text(zerovalue_null_af(value.CW2_8H));
                $('#af_qig_grade_cw2_b_tbl td:eq(17)').text(zerovalue_null_af(value.CW2_OTHR_8H));
                $('#af_qig_grade_cw2_b_tbl td:eq(18)').text(zerovalue_null_af(value.CW2_9H));
                $('#af_qig_grade_cw2_b_tbl td:eq(19)').text(zerovalue_null_af(value.CW2_OTHR_9H));
                $('#af_qig_grade_cw2_b_tbl td:eq(20)').text(zerovalue_null_af(value.CW2_10H));
                $('#af_qig_grade_cw2_b_tbl td:eq(21)').text(zerovalue_null_af(value.CW2_OTHR_10H));
                $('#af_qig_grade_cw2_b_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW2Default));
                $('#af_qig_grade_cw2_b_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW2Other));

                //Grade B
                $('#af_qig_grade_cw2_b_tbl th:last').after('<td class="td_graded"><input class="default" id="tbox_cast_5_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_1ST2ROUND) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_1H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_2H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_2H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_3H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_3H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_4H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_4H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_5H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_5H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_6H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_6H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_7H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_7H) +
                    '"></td><td class="td_graded"><input class="default"  id="tbox_cast_5_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_8H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_8H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_9H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_9H) +
                    '"></td><td class="td_graded"><input class="default" id="tbox_cast_5_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_10H) +
                    '"></td><td class="td_graded"><input class="others" id="tbox_cast_5_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_10H) +
                    '"></td><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW2Default) +
                    '" disabled="true"></th><th class="td_graded"><input type="text" value="' + zerovalue_null_af(value.TotalCW2Other) +
                    '" disabled="true"></th>');





                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
            });
            $('#af_qig_grade_cw2_b_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });
        }

    });






}
//grade A
//function load_afgrade_a() {
//}
//casting #3
function load_afqig_data_cast() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW1_1ST2ROUND = 0;
    var CW1_OTHR_1ST2ROUND = 0;

    var CW1_1H = 0;
    var CW1_OTHR_1H = 0;

    var CW1_2H = 0;
    var CW1_OTHR_2H = 0;

    var CW1_3H = 0;
    var CW1_OTHR_3H = 0;

    var CW1_4H = 0;
    var CW1_OTHR_4H = 0;

    var CW1_5H = 0;
    var CW1_OTHR_5H = 0;

    var CW1_6H = 0;
    var CW1_OTHR_6H = 0;

    var CW1_7H = 0;
    var CW1_OTHR_7H = 0;

    var CW1_8H = 0;
    var CW1_OTHR_8H = 0;

    var CW1_9H = 0;
    var CW1_OTHR_9H = 0;

    var CW1_10H = 0;
    var CW1_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_total = 0;


    //$('#af_qig_casted_tbl td').remove();
    $('#af_qig_casted_tbl td.td_data').remove();
    $('#af_qig_casted_tbl th.td_data').remove();


    ///// Casting 


    //if (aflotid == 70) {

    //}

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 3
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_casted_tbl td:eq(0)').text(zerovalue_null_af(value.CW1_1ST2ROUND));
                $('#af_qig_casted_tbl td:eq(1)').text(zerovalue_null_af(value.CW1_OTHR_1ST2ROUND));
                $('#af_qig_casted_tbl td:eq(2)').text(zerovalue_null_af(value.CW1_1H));
                $('#af_qig_casted_tbl td:eq(3)').text(zerovalue_null_af(value.CW1_OTHR_1H));
                $('#af_qig_casted_tbl td:eq(4)').text(zerovalue_null_af(value.CW1_2H));
                $('#af_qig_casted_tbl td:eq(5)').text(zerovalue_null_af(value.CW1_OTHR_2H));
                $('#af_qig_casted_tbl td:eq(6)').text(zerovalue_null_af(value.CW1_3H));
                $('#af_qig_casted_tbl td:eq(7)').text(zerovalue_null_af(value.CW1_OTHR_3H));
                $('#af_qig_casted_tbl td:eq(8)').text(zerovalue_null_af(value.CW1_4H));
                $('#af_qig_casted_tbl td:eq(9)').text(zerovalue_null_af(value.CW1_OTHR_4H));
                $('#af_qig_casted_tbl td:eq(10)').text(zerovalue_null_af(value.CW1_5H));
                $('#af_qig_casted_tbl td:eq(11)').text(zerovalue_null_af(value.CW1_OTHR_5H));
                $('#af_qig_casted_tbl td:eq(12)').text(zerovalue_null_af(value.CW1_6H));
                $('#af_qig_casted_tbl td:eq(13)').text(zerovalue_null_af(value.CW1_OTHR_6H));
                $('#af_qig_casted_tbl td:eq(14)').text(zerovalue_null_af(value.CW1_7H));
                $('#af_qig_casted_tbl td:eq(15)').text(zerovalue_null_af(value.CW1_OTHR_7H));
                $('#af_qig_casted_tbl td:eq(16)').text(zerovalue_null_af(value.CW1_8H));
                $('#af_qig_casted_tbl td:eq(17)').text(zerovalue_null_af(value.CW1_OTHR_8H));
                $('#af_qig_casted_tbl td:eq(18)').text(zerovalue_null_af(value.CW1_9H));
                $('#af_qig_casted_tbl td:eq(19)').text(zerovalue_null_af(value.CW1_OTHR_9H));
                $('#af_qig_casted_tbl td:eq(20)').text(zerovalue_null_af(value.CW1_10H));
                $('#af_qig_casted_tbl td:eq(21)').text(zerovalue_null_af(value.CW1_Othr_10H));
                $('#af_qig_casted_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW1Default));
                $('#af_qig_casted_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW1Other));

                //Casted Pcs
                $('#af_qig_casted_tbl th:last').after('<td class="td_data"><input class="default" id="tbox_cast_3_1_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1ST2ROUND) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1ST2ROUND) +
                    '"></td><td class="td_data"><input class="default" class="default" id="tbox_cast_3_2_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_1H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_1H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_3_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_2H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_2H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_4_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_3H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_3H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_5_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_4H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_4H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_6_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_5H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_5H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_7_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_6H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_6H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_8_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_7H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_7H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_9_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_8H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_8H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_10_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_9H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_9H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_11_1_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_10H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW1_OTHR_10H) +
                    '"></td><th class="td_data"><input class="casted_cw1" type="text" value="' + zerovalue_null_af(value.TotalCW1Default) +
                    '" disabled="true"></th><th class="td_data"><input class="casted_cw1_othr" type="text" value="' + zerovalue_null_af(value.TotalCW1Other) +
                    '" disabled="true"></th>');






                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
                load_cast_sum();
            });
            $('#af_qig_casted_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });


        }


    });

}



function load_afqig_data_cast_cw2() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW2_1ST2ROUND = 0;
    var CW2_OTHR_1ST2ROUND = 0;

    var CW2_1H = 0;
    var CW2_OTHR_1H = 0;

    var CW2_2H = 0;
    var CW2_OTHR_2H = 0;

    var CW2_3H = 0;
    var CW2_OTHR_3H = 0;

    var CW2_4H = 0;
    var CW2_OTHR_4H = 0;

    var CW2_5H = 0;
    var CW2_OTHR_5H = 0;

    var CW2_6H = 0;
    var CW2_OTHR_6H = 0;

    var CW2_7H = 0;
    var CW2_OTHR_7H = 0;

    var CW2_8H = 0;
    var CW2_OTHR_8H = 0;

    var CW2_9H = 0;
    var CW2_OTHR_9H = 0;

    var CW2_10H = 0;
    var CW2_OTHR_10H = 0;

    var cw1_total = 0;
    var cw2_total = 0;


    //$('#af_qig_casted_tbl td').remove();
    $('#af_qig_casted_cw2_tbl td.td_data').remove();
    $('#af_qig_casted_cw2_tbl th.td_data').remove();


    ///// Casting 


    //if (aflotid == 70) {

    //}

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 3
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#af_qig_casted_cw2_tbl td:eq(0)').text(zerovalue_null_af(value.CW2_1ST2ROUND));
                $('#af_qig_casted_cw2_tbl td:eq(1)').text(zerovalue_null_af(value.CW2_1ST2ROUND));
                $('#af_qig_casted_cw2_tbl td:eq(2)').text(zerovalue_null_af(value.CW2_1H));
                $('#af_qig_casted_cw2_tbl td:eq(3)').text(zerovalue_null_af(value.CW2_1H));
                $('#af_qig_casted_cw2_tbl td:eq(4)').text(zerovalue_null_af(value.CW2_2H));
                $('#af_qig_casted_cw2_tbl td:eq(5)').text(zerovalue_null_af(value.CW2_2H));
                $('#af_qig_casted_cw2_tbl td:eq(6)').text(zerovalue_null_af(value.CW2_3H));
                $('#af_qig_casted_cw2_tbl td:eq(7)').text(zerovalue_null_af(value.CW2_3H));
                $('#af_qig_casted_cw2_tbl td:eq(8)').text(zerovalue_null_af(value.CW2_4H));
                $('#af_qig_casted_cw2_tbl td:eq(9)').text(zerovalue_null_af(value.CW2_4H));
                $('#af_qig_casted_cw2_tbl td:eq(10)').text(zerovalue_null_af(value.CW2_5H));
                $('#af_qig_casted_cw2_tbl td:eq(11)').text(zerovalue_null_af(value.CW2_5H));
                $('#af_qig_casted_cw2_tbl td:eq(12)').text(zerovalue_null_af(value.CW2_6H));
                $('#af_qig_casted_cw2_tbl td:eq(13)').text(zerovalue_null_af(value.CW2_6H));
                $('#af_qig_casted_cw2_tbl td:eq(14)').text(zerovalue_null_af(value.CW2_7H));
                $('#af_qig_casted_cw2_tbl td:eq(15)').text(zerovalue_null_af(value.CW2_7H));
                $('#af_qig_casted_cw2_tbl td:eq(16)').text(zerovalue_null_af(value.CW2_8H));
                $('#af_qig_casted_cw2_tbl td:eq(17)').text(zerovalue_null_af(value.CW2_8H));
                $('#af_qig_casted_cw2_tbl td:eq(18)').text(zerovalue_null_af(value.CW2_9H));
                $('#af_qig_casted_cw2_tbl td:eq(19)').text(zerovalue_null_af(value.CW2_9H));
                $('#af_qig_casted_cw2_tbl td:eq(20)').text(zerovalue_null_af(value.CW2_10H));
                $('#af_qig_casted_cw2_tbl td:eq(21)').text(zerovalue_null_af(value.CW2_10H));
                $('#af_qig_casted_cw2_tbl td:eq(22)').text(zerovalue_null_af(value.TotalCW2Default));
                $('#af_qig_casted_cw2_tbl td:eq(23)').text(zerovalue_null_af(value.TotalCW2Other));

                //Casted Pcs
                $('#af_qig_casted_cw2_tbl th:last').after('<td class="td_data"><input class="default" id="tbox_cast_3_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1ST2ROUND) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_1_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_1ST2ROUND) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_1H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_2_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_1H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_2H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_3_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_2H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_3H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_4_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_3H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_4H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_5_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_4H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_5H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_6_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_5H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_6H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_7_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_6H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_7H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_8_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_7H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_8H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_9_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_8H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_9H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_10_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_9H) +
                    '"></td><td class="td_data"><input class="default" id="tbox_cast_3_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_10H) +
                    '"></td><td class="td_data"><input class="others" id="tbox_cast_3_11_2_' + value.AFParamId + '" type="text" value="' + zerovalue_null_af(value.CW2_OTHR_10H) +
                    '"></td><th class="td_data"><input class="casted_cw2" type="text" value="' + zerovalue_null_af(value.TotalCW2Default) +
                    '" disabled="true"></th><th class="td_data"><input class="casted_cw2_othr" type="text" value="' + zerovalue_null_af(value.TotalCW2Other) +
                    '" disabled="true"></th>');


                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });
                load_cast_sum();
            });
            $('#af_qig_casted_cw2_tbl').find('input[id*="tbox_cast_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });
        }

    });

}
//casted anode summary
function load_cast_sum() {

    //var sum_1st = $('#reject_1').val() - $('#paramid_119').val();
    // var 

    var sum = $('.casted_cw1').val() - $('#rework_1').val() - ($('#reject_1').val() - $('#paramid_119').val());

    var sum2 = $('.casted_cw1_othr').val() - $('#rework_2').val() - ($('#reject_2').val() - $('#paramid_119').val());


    var sum3 = $('.casted_cw2').val() - $('#rework_3').val() - ($('#reject_3').val() - $('#paramid_119').val());

    var sum4 = $('.casted_cw2_othr').val() - $('#rework_4').val() - ($('#reject_4').val() - $('#paramid_119').val());

    $('#good_1').val(sum);
    $('#good_2').val(sum2);
    $('#good_3').val(sum3);
    $('#good_4').val(sum4);

}


//total
function table_total_qig(tablename, cw1_1st2h, cw2_1st2h, cw1_1h, cw2_1h, cw1_2h, cw2_2h, cw1_3h, cw2_3h, cw1_4h, cw2_4h, cw1_5h, cw2_5h, cw1_6h, cw2_6h,
                                        cw1_7h, cw2_7h, cw1_8h, cw2_8h, cw1_9h, cw2_9h, cw1_10h, cw2_10h, cw1_total, cw2_total) {

    $(tablename + ' #trqig_14').after('<tr class="tr_total_qig"><td colspan = 2><i>TOTAL</i></td><td>'
        + cw1_1st2h + '</td><td>'
        + cw2_1st2h + '</td><td>'
        + cw1_1h + '</td><td>'
        + cw2_1h + '</td><td>'
        + cw1_2h + '</td><td>'
        + cw2_2h + '</td><td>'
        + cw1_3h + '</td><td>'
        + cw2_3h + '</td><td>'
        + cw1_4h + '</td><td>'
        + cw2_4h + '</td><td>'
        + cw1_5h + '</td><td>'
        + cw2_5h + '</td><td>'
        + cw1_6h + '</td><td>'
        + cw2_6h + '</td><td>'
        + cw1_7h + '</td><td>'
        + cw2_7h + '</td><td>'
        + cw1_8h + '</td><td>'
        + cw2_8h + '</td><td>'
        + cw1_9h + '</td><td>'
        + cw2_9h + '</td><td>'
        + cw1_10h + '</td><td>'
        + cw2_10h + '</td><td>'
        + cw1_total + '</td><td>'
        + cw2_total + '</td></tr>');

}



//reject #2
function load_afqig_data_reject() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW1_1ST2ROUND = 0;
    var CW1_OTHR_1ST2ROUND = 0;

    var CW1_1H = 0;
    var CW1_OTHR_1H = 0;

    var CW1_2H = 0;
    var CW1_OTHR_2H = 0;

    var CW1_3H = 0;
    var CW1_OTHR_3H = 0;

    var CW1_4H = 0;
    var CW1_OTHR_4H = 0;

    var CW1_5H = 0;
    var CW1_OTHR_5H = 0;

    var CW1_6H = 0;
    var CW1_OTHR_6H = 0;

    var CW1_7H = 0;
    var CW1_OTHR_7H = 0;

    var CW1_8H = 0;
    var CW1_OTHR_8H = 0;

    var CW1_9H = 0;
    var CW1_OTHR_9H = 0;

    var CW1_10H = 0;
    var CW1_OTHR_10H = 0;

    var cw1_total = 0;
    var cw1_othr_total = 0;


    //$('#af_qig_reject_tbl td.trdata').remove();
    //$('#af_qig_reject_tbl th.trdata').remove();
    $('#af_qig_reject_tbl td').remove();
    $('#af_qig_reject_tbl .trdata').remove();
    $('.tr_total_qig').remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 2
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                /// reject table


                $('#af_qig_reject_tbl tr:last').after('<tr id = trqig_' + x + ' class = "trdata"><th>' + x + '</th><th class="td_left">' + value.AFParamName +
                        '</th><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_1ST2ROUND) + '" id="tbox_reject_2_1_1_' + value.AFParamId +
                        '" ></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_1ST2ROUND) + '" id="tbox_reject_2_1_2_' + value.AFParamId +

                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_1H) + '" id="tbox_reject_2_2_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_1H) + '" id="tbox_reject_2_2_2_' + value.AFParamId +

                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_2H) + '" id="tbox_reject_2_3_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_2H) + '" id="tbox_reject_2_3_2_' + value.AFParamId +

                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_3H) + '" id="tbox_reject_2_4_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_3H) + '" id="tbox_reject_2_4_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_4H) + '" id="tbox_reject_2_5_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_4H) + '" id="tbox_reject_2_5_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_5H) + '" id="tbox_reject_2_6_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_5H) + '" id="tbox_reject_2_6_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_6H) + '" id="tbox_reject_2_7_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_6H) + '" id="tbox_reject_2_7_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_7H) + '" id="tbox_reject_2_8_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_7H) + '" id="tbox_reject_2_8_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_8H) + '" id="tbox_reject_2_9_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_8H) + '" id="tbox_reject_2_9_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_9H) + '" id="tbox_reject_2_10_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_9H) + '" id="tbox_reject_2_10_2_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW1_10H) + '" id="tbox_reject_2_11_1_' + value.AFParamId +
                        '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW1_OTHR_10H) + '" id="tbox_reject_2_11_2_' + value.AFParamId +
                        '"></td><th class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.TotalCW1Default) + '" id="tbox_reject_' + value.AFParamId +
                        '_1_1" name="" disabled="true"></th><th class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.TotalCW1Other) +
                        '" id="tbox_reject_' + value.AFParamId + '_1_1" name="" disabled="true"></th></tr>');

                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });

                if (x <= 14) {
                    CW1_1ST2ROUND = CW1_1ST2ROUND + zerovalue_null(value.CW1_1ST2ROUND);
                    CW1_OTHR_1ST2ROUND = CW1_OTHR_1ST2ROUND + zerovalue_null(value.CW1_OTHR_1ST2ROUND);

                    CW1_1H = CW1_1H + zerovalue_null(value.CW1_1H);
                    CW1_OTHR_1H = CW1_OTHR_1H + zerovalue_null(value.CW1_OTHR_1H);

                    CW1_2H = CW1_2H + zerovalue_null(value.CW1_2H);
                    CW1_OTHR_2H = CW1_OTHR_2H + zerovalue_null(value.CW1_OTHR_2H);

                    CW1_3H = CW1_3H + zerovalue_null(value.CW1_3H);
                    CW1_OTHR_3H = CW1_OTHR_3H + zerovalue_null(value.CW1_OTHR_3H);

                    CW1_4H = CW1_4H + zerovalue_null(value.CW1_4H);
                    CW1_OTHR_4H = CW1_OTHR_4H + zerovalue_null(value.CW1_OTHR_4H);

                    CW1_5H = CW1_5H + zerovalue_null(value.CW1_5H);
                    CW1_OTHR_5H = CW1_OTHR_5H + zerovalue_null(value.CW1_OTHR_5H);

                    CW1_6H = CW1_6H + zerovalue_null(value.CW1_6H);
                    CW1_OTHR_6H = CW1_OTHR_6H + zerovalue_null(value.CW1_OTHR_6H);

                    CW1_7H = CW1_7H + zerovalue_null(value.CW1_7H);
                    CW1_OTHR_7H = CW1_OTHR_7H + zerovalue_null(value.CW1_OTHR_7H);

                    CW1_8H = CW1_8H + zerovalue_null(value.CW1_8H);
                    CW1_OTHR_8H = CW1_OTHR_8H + zerovalue_null(value.CW1_OTHR_8H);

                    CW1_9H = CW1_9H + zerovalue_null(value.CW1_9H);
                    CW1_OTHR_9H = CW1_OTHR_9H + zerovalue_null(value.CW1_OTHR_9H);

                    CW1_10H = CW1_10H + zerovalue_null(value.CW1_10H);
                    CW1_OTHR_10H = CW1_OTHR_10H + zerovalue_null(value.CW1_OTHR_10H);

                    cw1_total = cw1_total + zerovalue_null(value.TotalCW1Default);
                    cw1_othr_total = cw1_othr_total + zerovalue_null(value.TotalCW1Other);


                }
                if (x == 14) {
                    table_total_rework_cw1_reject('#af_qig_reject_tbl', CW1_1ST2ROUND, CW1_OTHR_1ST2ROUND,
                                    CW1_1H, CW1_OTHR_1H,
                                    CW1_2H, CW1_OTHR_2H,
                                    CW1_3H, CW1_OTHR_3H,
                                    CW1_4H, CW1_OTHR_4H,
                                    CW1_5H, CW1_OTHR_5H,
                                    CW1_6H, CW1_OTHR_6H,
                                    CW1_7H, CW1_OTHR_7H,
                                    CW1_8H, CW1_OTHR_8H,
                                    CW1_9H, CW1_OTHR_9H,
                                    CW1_10H, CW1_OTHR_10H,
                                    cw1_total, cw1_othr_total
                                    );
                }


                x = x + 1;

            });
            $('#af_qig_reject_tbl').find('input[id*="tbox_reject_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });

        }

    });
    //$('#af_qig_reject_tbl').on('click', 'span', function () {
    //    var $e = $(this).parent();
    //    if ($e.attr('class') === 'af_qig_reject_tbl') {
    //        var val = $(this).html();
    //        $e.html('<input type="text maxlength="5" class="reject_tbl" size="5" value="' + val + '" />');
    //        var $newE = $e.find('input');
    //        $newE.focus();
    //    }
    //    //$newE.on('blur', function () {
    //    //    $(this).parent().html('<span>' + $(this).val() + '</span>');
    //    //});
    //});
}
function table_total_rework_cw1_reject(tablename,
    CW1_1ST2ROUND, CW1_OTHR_1ST2ROUND,
    CW1_1H, CW1_OTHR_1H,
    CW1_2H, CW1_OTHR_2H,
    CW1_3H, CW1_OTHR_3H,
    CW1_4H, CW1_OTHR_4H,
    CW1_5H, CW1_OTHR_5H,
    CW1_6H, CW1_OTHR_6H,
    CW1_7H, CW1_OTHR_7H,
    CW1_8H, CW1_OTHR_8H,
    CW1_9H, CW1_OTHR_9H,
    CW1_10H, CW1_OTHR_10H,
    CW1_TOTAL, CW1_OTHR_TOTAL) {

    $(tablename + ' #trqig_14').after('<tr class="tr_total_qig"><td colspan = 2><i>TOTAL</i></td><td>'
        + CW1_1ST2ROUND + '</td><td>' + CW1_OTHR_1ST2ROUND + '</td><td>'
        + CW1_1H + '</td><td>' + CW1_OTHR_1H + '</td><td>'
        + CW1_2H + '</td><td>' + CW1_OTHR_2H + '</td><td>'
        + CW1_3H + '</td><td>' + CW1_OTHR_3H + '</td><td>'
        + CW1_4H + '</td><td>' + CW1_OTHR_4H + '</td><td>'
        + CW1_5H + '</td><td>' + CW1_OTHR_5H + '</td><td>'
        + CW1_6H + '</td><td>' + CW1_OTHR_6H + '</td><td>'
        + CW1_7H + '</td><td>' + CW1_OTHR_7H + '</td><td>'
        + CW1_8H + '</td><td>' + CW1_OTHR_8H + '</td><td>'
        + CW1_9H + '</td><td>' + CW1_OTHR_9H + '</td><td>'
        + CW1_10H + '</td><td>' + CW1_OTHR_10H + '</td><td id="rework_cw1_reject">'
        + CW1_TOTAL + '</td><td id="rework_cw1_other_reject">' + CW1_OTHR_TOTAL + '</td></tr>');

    var sum = $('#rework_cw1_reject').text();
    var sum2 = $('#rework_cw1_other_reject').text();
    $('#reject_1').val(sum);
    $('#reject_2').val(sum2);
}

function load_afqig_data_reject_cw2() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    var x = 1;

    var CW2_1ST2ROUND = 0;
    var CW2_OTHR_1ST2ROUND = 0;

    var CW2_1H = 0;
    var CW2_OTHR_1H = 0;

    var CW2_2H = 0;
    var CW2_OTHR_2H = 0;

    var CW2_3H = 0;
    var CW2_OTHR_3H = 0;

    var CW2_4H = 0;
    var CW2_OTHR_4H = 0;

    var CW2_5H = 0;
    var CW2_OTHR_5H = 0;

    var CW2_6H = 0;
    var CW2_OTHR_6H = 0;

    var CW2_7H = 0;
    var CW2_OTHR_7H = 0;

    var CW2_8H = 0;
    var CW2_OTHR_8H = 0;

    var CW2_9H = 0;
    var CW2_OTHR_9H = 0;

    var CW2_10H = 0;
    var CW2_OTHR_10H = 0;

    var CW2_Total = 0;
    var CW2_OTHR_Total = 0;


    $('#af_qig_reject_cw2_tbl td').remove();
    $('#af_qig_reject_cw2_tbl .trdata').remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFQIG_Data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            inspect_type: 2
        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                /// reject table


                $('#af_qig_reject_cw2_tbl tr:last').after('<tr id = trqig_' + x + ' class = "trdata"><th>' + x + '</th><th class="td_left">' + value.AFParamName +
                    '</th><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_1ST2ROUND) + '" id="tbox_reject_2_1_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_1ST2ROUND) + '" id="tbox_reject_2_1_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_1H) + '" id="tbox_reject_2_2_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_1H) + '" id="tbox_reject_2_2_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_2H) + '" id="tbox_reject_2_3_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_2H) + '" id="tbox_reject_2_3_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_3H) + '" id="tbox_reject_2_4_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_3H) + '" id="tbox_reject_2_4_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_4H) + '" id="tbox_reject_2_5_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_4H) + '" id="tbox_reject_2_5_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_5H) + '" id="tbox_reject_2_6_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_5H) + '" id="tbox_reject_2_6_2_' + value.AFParamId +
                    '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_6H) + '" id="tbox_reject_2_7_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_6H) + '" id="tbox_reject_2_7_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_7H) + '" id="tbox_reject_2_8_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_7H) + '" id="tbox_reject_2_8_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_8H) + '" id="tbox_reject_2_9_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_8H) + '" id="tbox_reject_2_9_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_9H) + '" id="tbox_reject_2_10_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_9H) + '" id="tbox_reject_2_10_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.CW2_10H) + '" id="tbox_reject_2_11_2_' + value.AFParamId +
                     '"></td><td class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.CW2_OTHR_10H) + '" id="tbox_reject_2_11_2_' + value.AFParamId +
                     '"></td><th class="af_qig_reject_tbl"><input type="text" class="default" value="' + zerovalue_null_af(value.TotalCW2Default) + '" id="tbox_reject_' + value.AFParamId +
                     '_1_1" name="" disabled="true"></th><th class="af_qig_reject_tbl"><input type="text" class="others" value="' + zerovalue_null_af(value.TotalCW2Other) +
                     '" id="tbox_reject_' + value.AFParamId + '_1_1" name="" disabled="true"></th></tr>');

                $(document).ready(function () {
                    $('input').keyup(function (e) {
                        if (e.which == 39)
                            $(this).closest('td').next().find('input').focus();
                        else if (e.which == 37)
                            $(this).closest('td').prev().find('input').focus();
                        else if (e.which == 40)
                            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                        else if (e.which == 38)
                            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
                    });
                });
                //$(document).ready(function () {
                $('td, input,textarea,select').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input.default').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('change');
                });

                $('input.others').change(
                function () {
                    //$(this).css({ 'background-color': '#DFD8D1' });
                    // $(this).addClass('changed');
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).closest('td').prev('td').find('input.default').addClass('change');
                });
                //  });

                if (x <= 14) {
                    CW2_1ST2ROUND = CW2_1ST2ROUND + zerovalue_null(value.CW2_1ST2ROUND);
                    CW2_OTHR_1ST2ROUND = CW2_OTHR_1ST2ROUND + zerovalue_null(value.CW2_OTHR_1ST2ROUND);

                    CW2_1H = CW2_1H + zerovalue_null(value.CW2_2H);
                    CW2_OTHR_1H = CW2_OTHR_1H + zerovalue_null(value.CW2_OTHR_1H);

                    CW2_2H = CW2_2H + zerovalue_null(value.CW2_2H);
                    CW2_OTHR_2H = CW2_OTHR_2H + zerovalue_null(value.CW2_OTHR_2H);

                    CW2_3H = CW2_3H + zerovalue_null(value.CW1_3H);
                    CW21_OTHR_3H = CW2_OTHR_3H + zerovalue_null(value.CW2_OTHR_3H);

                    CW2_4H = CW2_4H + zerovalue_null(value.CW2_4H);
                    CW2_OTHR_4H = CW2_OTHR_4H + zerovalue_null(value.CW2_OTHR_4H);

                    CW2_5H = CW2_5H + zerovalue_null(value.CW2_5H);
                    CW2_OTHR_5H = CW2_OTHR_5H + zerovalue_null(value.CW2_OTHR_5H);

                    CW2_6H = CW2_6H + zerovalue_null(value.CW2_6H);
                    CW2_OTHR_6H = CW2_OTHR_6H + zerovalue_null(value.CW2_OTHR_6H);

                    CW2_7H = CW2_7H + zerovalue_null(value.CW2_7H);
                    CW2_OTHR_7H = CW2_OTHR_7H + zerovalue_null(value.CW2_OTHR_7H);

                    CW2_8H = CW2_8H + zerovalue_null(value.CW2_8H);
                    CW2_OTHR_8H = CW2_OTHR_8H + zerovalue_null(value.CW2_OTHR_8H);

                    CW2_9H = CW2_9H + zerovalue_null(value.CW2_9H);
                    CW2_OTHR_9H = CW2_OTHR_9H + zerovalue_null(value.CW2_OTHR_9H);

                    CW2_10H = CW2_10H + zerovalue_null(value.CW1_10H);
                    CW2_OTHR_10H = CW2_OTHR_10H + zerovalue_null(value.CW1_OTHR_10H);

                    CW2_Total = CW2_Total + zerovalue_null(value.TotalCW2Default);
                    CW2_OTHR_Total = CW2_OTHR_Total + zerovalue_null(value.TotalCW2Other);

                }
                if (x == 14) {
                    table_total_rework_cw2_reject('#af_qig_reject_cw2_tbl', CW2_1ST2ROUND, CW2_OTHR_1ST2ROUND,
                                    CW2_1H, CW2_OTHR_1H,
                                    CW2_2H, CW2_OTHR_2H,
                                    CW2_3H, CW2_OTHR_3H,
                                    CW2_4H, CW2_OTHR_4H,
                                    CW2_5H, CW2_OTHR_5H,
                                    CW2_6H, CW2_OTHR_6H,
                                    CW2_7H, CW2_OTHR_7H,
                                    CW2_8H, CW2_OTHR_8H,
                                    CW2_9H, CW2_OTHR_9H,
                                    CW2_10H, CW2_OTHR_10H,
                                    CW2_Total, CW2_OTHR_Total
                                    );
                }


                x = x + 1;

            });
            $('#af_qig_reject_cw2_tbl').find('input[id*="tbox_reject_"].default').each(function () {
                if ($(this).val().length > 0) {
                    $(this).addClass('change');
                }
            });
        }

    });

}

function table_total_rework_cw2_reject(tablename,
    CW2_1ST2ROUND, CW2_OTHR_1ST2ROUND,
    CW2_1H, CW2_OTHR_1H,
    CW2_2H, CW2_OTHR_2H,
    CW2_3H, CW2_OTHR_3H,
    CW2_4H, CW2_OTHR_4H,
    CW2_5H, CW2_OTHR_5H,
    CW2_6H, CW2_OTHR_6H,
    CW2_7H, CW2_OTHR_7H,
    CW2_8H, CW2_OTHR_8H,
    CW2_9H, CW2_OTHR_9H,
    CW2_10H, CW2_OTHR_10H,
    CW2_TOTAL, CW2_OTHR_TOTAL) {

    $(tablename + ' #trqig_14').after('<tr class="tr_total_qig"><td colspan = 2><i>TOTAL</i></td><td>'
        + CW2_1ST2ROUND + '</td><td>' + CW2_OTHR_1ST2ROUND + '</td><td>'
        + CW2_1H + '</td><td>' + CW2_OTHR_1H + '</td><td>'
        + CW2_2H + '</td><td>' + CW2_OTHR_2H + '</td><td>'
        + CW2_3H + '</td><td>' + CW2_OTHR_3H + '</td><td>'
        + CW2_4H + '</td><td>' + CW2_OTHR_4H + '</td><td>'
        + CW2_5H + '</td><td>' + CW2_OTHR_5H + '</td><td>'
        + CW2_6H + '</td><td>' + CW2_OTHR_6H + '</td><td>'
        + CW2_7H + '</td><td>' + CW2_OTHR_7H + '</td><td>'
        + CW2_8H + '</td><td>' + CW2_OTHR_8H + '</td><td>'
        + CW2_9H + '</td><td>' + CW2_OTHR_9H + '</td><td>'
        + CW2_10H + '</td><td>' + CW2_OTHR_10H + '</td><td id="rework_cw2_reject">'
        + CW2_TOTAL + '</td><td id="rework_cw2_other_reject">' + CW2_OTHR_TOTAL + '</td></tr>');

    var sum = $('#rework_cw2_reject').text();
    var sum2 = $('#rework_cw2_other_reject').text();
    $('#reject_3').val(sum);
    $('#reject_4').val(sum2);
    load_cast_sum();
}



$('#QIG_hour_ddl').live('change', function () {

    check_qig_ddl();
});

$('#QIG_wheel_ddl').live('change', function () {

    check_qig_ddl();
});

$('#QIG_anodetype_ddl').live('change', function () {
    check_qig_ddl();

});

$('#QIG_inspect_ddl').live('change', function () {

    check_qig_ddl();
});


function check_qig_ddl() {

    var h_ddl = $('#QIG_hour_ddl').val();
    var w_ddl = $('#QIG_wheel_ddl').val();
    var t_ddl = $('#QIG_anodetype_ddl').val();
    var ins_ddl = $('#QIG_inspect_ddl').val();

    if (h_ddl != '' && w_ddl != '' && t_ddl != '' && ins_ddl != '') {
        check_qig_pcs();

    } else {

    }

}

function check_qig_pcs() {
    var afdate_ = $('#af_qig_date').val();


    var aflotid_ = $('#aflot_ddl').val();
    var h_ddl = $('#QIG_hour_ddl').val();
    var w_ddl = $('#QIG_wheel_ddl').val();
    var t_ddl = $('#QIG_anodetype_ddl').val();
    var ins_ddl = $('#QIG_inspect_ddl').val();

    var pcs;

    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_inspect_pcs/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            afparamid: ins_ddl,
            afqigtypeid: t_ddl,
            afcw: w_ddl,
            afqighrid: h_ddl
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $('#qig_pcs').val(data.QIG_PCS);

        }

    });

}




$('#qig_ok_btn').live('click', function () {
    var afdate_ = $('#af_qig_date').val();

    var aflotid_ = $('#aflot_ddl').val();
    var h_ddl = $('#QIG_hour_ddl').val();
    var w_ddl = $('#QIG_wheel_ddl').val();
    var t_ddl = $('#QIG_anodetype_ddl').val();
    var ins_ddl = $('#QIG_inspect_ddl').val();
    var qig_pcs = $('#qig_pcs').val();

    if (ins_ddl == 70) {
        t_ddl = 3;
    }


    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_save_pcs/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            afparamid: ins_ddl,
            afqigtypeid: t_ddl,
            afcw: w_ddl,
            afqighrid: h_ddl,
            afqighr: qig_pcs
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('QIG data now saved.');

            load_afqig_data_rework();
            //load_afqig_data_rework_cw2();
            //load_afqig_data_reject();
            //load_afqig_data_cast();


        }

    });

});




$('#qig_others_imgbtn').live('click', function () {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var items = [];
    $('#af_others_tbl_qig').find('input[id*="paramid_"].changed').each(function () {
        var attrid = $(this).attr('id');
        var paramid_ = attrid.replace('paramid_', '');
        var numval_ = $(this).val();

        items.push({
            aflotid: aflotid_,
            afdate: afdate_,
            paramid: paramid_,
            numval: numval_
        });

    });

    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/Save_QIG_Others',
        data: items,
        success: function (data) {
            alert('QIG Others now saved.');
            qig_others_query();
            load_cast_sum();

        }
    });

});





$('#saveafblister_mt_imgbtn').live('click', function () {

    var aflotid_ = $('#aflot_ddl').val();
    var skimslag_ = $('#afblister_slag_tbox').val();
    var aftoaf_ = $('#afblister_aftoaf_tbox').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_AFBlister_MT/',
        data: {
            aflotid: aflotid_,
            skimslag: skimslag_,
            aftoaf: aftoaf_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Data now saved.');
            load_afblister_tbl();
        }
    });

});



$(function () {
    $("#thedate").click(function () {
        $(this).datepicker({ maxDate: new Date });
        $(this).datepicker();
        $(this).datepicker("show");
    });
});


//anode inventory
//function load_inventory() {



//date select
//$(document).ready(function () {
//    $('#select_date').click(function () {
//        alert($('#thedate').val());
//    });
//});
//end



/// enabling inputs and buttons in inventory
$(document).ready(function () {
    $('#thedate').change(function () {
        if ($(this).on('change')) {
            $('click').removeAttr('disabled');
            if ($(this).on('click')) {
                $('#select_date').removeAttr('disabled');
                $('#select_date_energy').removeAttr('disabled');
            }
            ///

        } else {
            $('input#enable').attr('disabled', 'disabled');
        }
    });
});
$(document).ready(function () {
    $('#select_date').click(function () {
        if ($(this).on('click')) {
            $('select').removeAttr('disabled');
            if ($(this).on('click')) { // for input and select types
                $('input#enable').removeAttr('disabled');
            } // button for select button
            $('button').removeAttr('disabled');
            if ($(this).on('click')) {
                $('.enable_btn').removeAttr('disabled');
            } //image save button
            $('image').removeAttr('disabled');
            if ($(this).on('click')) {
                $('.save_btn').removeAttr('disabled');
            }
        } else {
            $('input#enable').attr('disabled', 'disabled');
        }
    });
});
//change color after
$(document).ready(function () {
    $('td, input ,select,textarea').blur(
    function () {
        $(this).css({ 'background-color': '#FFFFEEE' });
    });

    $('td, input, select,textarea').change(
    function () {
        //$(this).css({ 'background-color': '#DFD8D1' });
        $(this).addClass('changed');
    });
});

$('#CastPosition_ddl').live('change', function () {
    var position_ = $('#CastPosition_ddl').val();

    $('#cast_startemp_ddl').empty();
    $('#cast_endemp_ddl').empty();



    $.ajax({
        url: afserverpath + '/AnodeFurnace/Casting_Emp_List/',
        data: {
            position: position_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            //alert('change');
            $.each(data, function (index, value) {
                $('#cast_startemp_ddl').append("<option value = " + value.EmpID + ">" + value.Fullname + "</option>");
            })
            $.each(data, function (index, value) {
                $('#cast_endemp_ddl').append("<option value = " + value.EmpID + ">" + value.Fullname + "</option>");
            })

        }

    });

});

//    if (!isNaN(result)) {
//        document.getElementById('total_all').value = result;
//    }
//};

//for auto suggest "Assorted"
$(document).ready(function () {

    var Assorted = ["Assorted"];

    $("#lpg input, #ref input, #apm input, #rth input, #oth input").autocomplete({
        source: Assorted
    });

});

function specify_cell() {
    $('#total_dataper_location td').each(function () {
        $(this).removeClass('border_color');
        $(this).addClass('border_color_inv');
    });
}

//NewAF
function listofafcycles(afnumid_, aftable, aflotid_) {

    $('.' + aftable + ' td').remove();

    var sdate = Date.today().add(-1).days().toString('MM-dd-yyyy');
    var edate = Date.today().toString('MM-dd-yyyy');
    var afid = afnumid_;
    var afv = afnumid_;

    //alert(eday);

    //alert(sday);

    $.ajax({
        url: serverpath + '/AnodeFurnace/AFView/',

        data: {
            afnumid: afnumid_,
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                //  var test = new Date(value.Cycle_Start_Time);
                var id = value.AF_LotId;
                //link
                $('.' + aftable + ' tr:last').after('<tr><td class="hide_td">' + value.AF_LotId
                    + '</td><td>' + formatDate_js(value.LotStartTime)
                    + '</td></td><td>' + formatDate_js(value.LotEndTime)
                    + '</td><td class="cyc_num"><a href = ' + afserverpath
                    + '/AnodeFurnace/AFLogsheetData/' + id + '/' + sdate
                    + '/' + edate + '/' + afid + '>' + value.AFLotNo
                    + '</a></td><td>' + value.AF_StatusName + '</td></tr>');

            });

        }
    });
}

function load_aflogsheetdata_view(lotid, sday, eday, afid) {

    $.ajax({
        url: serverpath + '/AnodeFurnace/AFLogsheetData/',
        data: {
            id: lotid,
            sdate: sday,
            edate: eday,
            afid: afid
        },

        type: 'GET',
        cache: false,
        success: function (data) {

        }


    });

}

//NewAF
$('#newadd_clotnum_ok_btn').live('click', function () {

    var afid = $('#afnum_ddl').val();
    var lotnum = $('#createlot_span').text();
    var prodyear;

    if (afid == 1) {

        prodyear = $('#maxaf1prodyear').text();

    } else if (afid == 2) {
        prodyear = $('#maxaf2prodyear').text();
    }


    $.ajax({

        url: afserverpath + '/AnodeFurnace/NewAdd_LotNum/',
        data: {

            af_numid: afid,
            prodyearid: prodyear,
            af_lotnum: lotnum
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            document.location.href = afserverpath + '/AnodeFurnace/AFLotLists';
            alert('New Lot created.');
        }
    });
});



function load_aflims_skimdata() {

    var aflotid_ = $('#aflot_ddl').val();

    clear_limsvalue();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFLIMS_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {




            $.each(data, function (index, value) {


                $('#skim_oxtarget').text(evaluate_value(value.SKT_O2));
                $('#skim_oxact').text(evaluate_value(value.SK_O2));

                //$('#skS_target').text(evaluate_value(value.SKT_S));
                //$('#skS_val').text(evaluate_value(value.SK_S));

                //$('#skPb_target').text(evaluate_value(value.SKT_Pb));
                //$('#skPb_val').text(evaluate_value(value.SK_Pb));

                //$('#skAs_target').text(evaluate_value(value.SKT_As));
                //$('#skAs_val').text(evaluate_value(value.SK_As));

                //$('#oxO2_target').text(evaluate_value(value.OXT_O2));
                //$('#oxO2_val').text(evaluate_value(value.OX_O2));

                //$('#oxS_target').text(evaluate_value(value.OXT_S));
                //$('#oxS_val').text(evaluate_value(value.OX_S));

                //$('#reO2_target').text(evaluate_value(value.RET_O2));
                //$('#reO2_val').text(evaluate_value(value.RE_O2));

                //$('#reS_target').text(evaluate_value(value.RET_S));
                //$('#reS_val').text(evaluate_value(value.RE_S));

            });
        }
    });
}

function specify_cell() {
    $('.right_div_tbl th').each(function () {
        $(this).css('border-color', "orange");
    });

}

function clear_limsvalue() {

    $('#skim_oxtarget').text('');
    $('#skim_oxact').text('');

    //$('#skS_target').text('');
    //$('#skS_val').text('');

    //$('#skPb_target').text('');
    //$('#skPb_val').text('');

    //$('#skAs_target').text('');
    //$('#skAs_val').text('');

    //$('#oxO2_target').text('');
    //$('#oxO2_val').text('');

    //$('#oxS_target').text('');
    //$('#oxS_val').text('');

    //$('#reO2_target').text('');
    //$('#reO2_val').text('');

    //$('#reS_target').text('');
    //$('#reS_val').text('');

}

//NewAF
//function listofafcycles(afnumid_, aftable, aflotid_) {

//    $('.' + aftable + ' td').remove();

//    var sday = Date.today().add(-1).days().toString('MM-dd-yyyy');
//    var eday = Date.today().toString('MM-dd-yyyy');


//    //alert(tday);

//        //alert(sday);

//    $.ajax({
//        url: serverpath + '/AnodeFurnace/AFView/',

//        data: {
//            afnumid: afnumid_,
//            aflotid: aflotid_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            $.each(data, function (index, value) {

//                //  var test = new Date(value.Cycle_Start_Time);

//                //link
//                $('.' + aftable + ' tr:last').after('<tr><td class="hide_td">' + value.AF_LotId + '</td><td>' + formatDate_js(value.LotStartTime) + '</td></td><td>' + formatDate_js(value.LotEndTime) + '</td><td class="cyc_num"><a href = ' + serverpath + '/AnodeFurnace/AFLogsheet/' + value.AF_LotId + '/' + sday + '/' + eday + '/AF' + afnumid_ + '>' + value.AFLotNo + '</a></td><td>' + value.AF_StatusName + '</td></tr>');

//            });

//        }
//    });
//}
//NewAF
$('#newadd_clotnum_ok_btn').live('click', function () {

    var afid = $('#afnum_ddl').val();
    var lotnum = $('#createlot_span').text();
    var prodyear;

    if (afid == 1) {

        prodyear = $('#maxaf1prodyear').text();

    } else if (afid == 2) {
        prodyear = $('#maxaf2prodyear').text();
    }


    $.ajax({

        url: afserverpath + '/AnodeFurnace/NewAdd_LotNum/',
        data: {

            af_numid: afid,
            prodyearid: prodyear,
            af_lotnum: lotnum
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            document.location.href = afserverpath + '/AnodeFurnace/AFLotLists';
            alert('New Lot created.');
        }
    });
});

//tabs functions
//function ddactive_af(partialv_name) {

//    $.ajax({
//        type: "POST",
//        url: serverpath + '/AnodeFurnace/af_tabs/',
//        data: { partialview_name: partialv_name },
//        success: function (result) {
//            $('#htab-panel2').html(result);
//        }
//});
//}

function specify_cell() {
    $('.right_div_tbl th').each(function () {
        $(this).css('border-color', "orange");
    });
}

//NewAF
//function listofafcycles(afnumid_, aftable, aflotid_) {

//    $('.' + aftable + ' td').remove();

//    var sday = Date.today().add(-1).days().toString('MM-dd-yyyy');
//    var eday = Date.today().toString('MM-dd-yyyy');


//    alert(tday);

//        alert(sday);

//    $.ajax({
//        url: serverpath + '/AnodeFurnace/AFView/',

//        data: {
//            afnumid: afnumid_,
//            aflotid: aflotid_
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {

//            $.each(data, function (index, value) {

//                  var test = new Date(value.Cycle_Start_Time);

//                link
//                $('.' + aftable + ' tr:last').after('<tr><td class="hide_td">' + value.AF_LotId + '</td><td>' + formatDate_js(value.LotStartTime) + '</td></td><td>' + formatDate_js(value.LotEndTime) + '</td><td class="cyc_num"><a href = ' + serverpath + '/AnodeFurnace/AFLogsheet/' + value.AF_LotId + '/' + sday + '/' + eday + '/AF' + afnumid_ + '>' + value.AFLotNo + '</a></td><td>' + value.AF_StatusName + '</td></tr>');

//            });

//        }
//    });
//}
//NewAF
//$('#newadd_clotnum_ok_btn').live('click', function () {

//    var afid = $('#afnum_ddl').val();
//    var lotnum = $('#createlot_span').text();
//    var prodyear;

//    if (afid == 1) {

//        prodyear = $('#maxaf1prodyear').text();

//    } else if (afid == 2) {
//        prodyear = $('#maxaf2prodyear').text();
//    }


//    $.ajax({

//        url: afserverpath + '/AnodeFurnace/NewAdd_LotNum/',
//        data: {

//            af_numid: afid,
//            prodyearid: prodyear,
//            af_lotnum: lotnum
//        },

//        type: 'POST',
//        cache: false,
//        success: function (data) {
//            document.location.href = afserverpath + '/AnodeFurnace/AFLotLists';
//            alert('New Lot created.');
//        }
//    });
//});

//tabs functions



/// enabling inputs and buttons in inventory
$(document).ready(function () {
    $('#thedate').change(function () {
        if ($(this).on('change')) {
            $('click').removeAttr('disabled');
            if ($(this).on('click')) {
                $('#select_date_energy').removeAttr('disabled');
                $('#select_date').removeAttr('disabled');
            }
            ///

        } else {
            $('input#enable').attr('disabled', 'disabled');
        }
    });
});

function af_logsheet_link() {

    //var aflotid = $('#aflotid').text();

    //var afnum = $('#AF_NumId').val();

    //var thelink = serverpath + '/AnodeFurnace/AFView/' + aflotid + '/' + $('#AF_NumId').val();

    //document.location.href = thelink;

}
//Shift report select button
//('#newaf_select_btn').live('click', function () {

//});

//getafprod_id to save man power

function getAFProd_Id() {

    var date_ = $('#newaf_shiftdate').val();
    var shiftid_ = $('#newaf_shiftdate_select').val();

    var af_prod_id = $.ajax({
        url: serverpath + '/AnodeFurnace/Select_newaf_Date/',
        data: {
            af_prod_date: date_,
            af_prod_Shift: shiftid_
        },
        type: 'POST',
        cache: false,
        dataType: 'html',
        context: document.body,
        global: false,
        async: false,

        success: function (data) {
            return data;
        }
    }).responseText;

    return af_prod_id;

}


//Shift-Manpower
$('#newaf_shift_btn').live('click', function () {

    $('#af_log_header').css({ "background-color": "#FFFFCC" });
    $('input[type="text"], select,option').css({ "background-color": "#FFFFCC" });
    $('select , img, span').removeAttr('disabled');
    selected = 1;

    load_af2_page();

    assign_af_prodid();

    var date_ = $('#newaf_shiftdate').val();
    var shiftid_ = $('#newaf_shiftdate_select').val();

    var interfaceid = $('#interfaceid').text();

    switch (interfaceid) {

        case ('1'):
            load_af2_page();
            check_manpower_select();
            break;

        default:
            break;

    }
});

//saving button click
$('#newaf_manpower_btn').live('click', function () {
    AF_Change('af_manpower');
});
$('#newsave_manpower_link').live('click', function () {
    AF_Change('af_manpower');
});

function AF_Change(option) {

    var date = $('#newaf_shiftdate').val();

    if (date == 0) {
        alert('Please select a Date first.');
    } else {

        switch (option) {
            //manpower
            case ('af_manpower'):

                af_savemanpower();

                break;

            default:
                break;
        }
    }
}



function assign_af_prodid() {
    var af_prodid;
    af_prodid = getAFProd_Id();
    af_prodid = af_prodid.substring(1, af_prodid.length - 1);
    $('#af_prod_id').val(af_prodid);

}

function load_af2_page() {
    //disabled();
    clear_value();
    clear_css();
    var afprod = $('#af_prod_id').val();
    var date_ = $('#newaf_shiftdate').val();
    var shiftid_ = $('#newaf_shiftdate_select').val();

    $.ajax({
        url: serverpath + '/AnodeFurnace/Select_ManPower/',
        data: {
            date: date_,
            shiftid: shiftid_

        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                //$('#NewAFList_roletypeid_2').val(value.AF_shiftId);
                $('#NewAFList_roletypeid_' + value.AF_RoleTypeId).val(value.AF_EmpId);

                $('#NewAFList_roletypeid_' + value.AF_RoleTypeId + 'a').val(value.Emp1ID);
                $('#NewAFList_roletypeid_' + value.AF_RoleTypeId + 'b').val(value.Emp2ID);
                check_manpower_select();
            });

        }
    });
}

function reset_crew_dll() {
    $('#htab-panel2 select').each(function () {
        $(this).attr('value', '');
    });
}

// select Shift:
$(document).ready(function () {
    $('#newaf_shiftdate_select').change(function () {
        if ($(this).on('change')) {
            $('#newaf_shift_btn').removeAttr('disabled');
            //if ($(this).on('click')) {
            //$('select').prop("disabled", false);
            //}
        } else {
            $('#newaf_shift_btn').attr('disabled', 'disabled');
        }
    });
});

function af_savemanpower() {
    var date_ = $('#newaf_shiftdate').val();
    var shiftid_ = $('#newaf_shiftdate_select').val();
    var afprod = $('#af_prod_id').val();

    var roletypeid_ = $('#NewAFList_roletypeid_2').val();

    $.ajax({
        url: serverpath + '/AnodeFurnace/Select_newaf_Date/',
        data: {
            af_prod_date: date_,
            af_prod_Shift: shiftid_

        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.ajax({
                url: serverpath + '/AnodeFurnace/getShiftId/',
                data: {
                    date: date_,
                    shiftid: shiftid_

                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    var shiftassignid_ = data;

                    $.ajax({
                        url: serverpath + '/AnodeFurnace/Delete_Manpower/',
                        data: {
                            prodid: data
                        },
                        type: 'POST',
                        cache: false,
                        success: function (data) {
                            var items = [];

                            $('#newaf_manpower_table select[id*="NewAFList_roletypeid_"]').each(function () {
                                var attrid = $(this).attr('id');

                                var roletypeid_ = attrid.replace('NewAFList_roletypeid_', '');
                                var empid_ = $(this).val();

                                var empaid_ = $('#NewAFList_roletypeid_' + roletypeid_ + 'a').val();
                                var empbid_ = $('#NewAFList_roletypeid_' + roletypeid_ + 'b').val();

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
                                    cache: false,
                                    url: afserverpath + '/AnodeFurnace/Save_Shift_Manpower/',
                                    data: items,
                                    success: function (data) {

                                        alert('Manpower are now saved.');

                                        check_manpower_select();

                                    }
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
function clear_value() {
    //alert('test');
    $('select[id*="NewAFList_roletypeid_"]').each(function () {
        $(this).attr('value', '');
        $(this).removeClass('changed');

    });

}

//function disabled() {
//$('select').change(function () {

//    $(this)
//        .siblings('select')
//        .children('option[value=' + this.value + ']')
//        .attr('disabled', true)
//        .siblings().removeAttr('disabled');

//    })
//};

function check_manpower_select() {
    //check_empty_select();
    $('#newaf_manpower_table select').each(function () {
        var id = $(this).attr('id');
        var val = $(this).val();

        if (val == "") {
            //alert('aa')
            $('.newaf_manpower_table_1').find('select[id="' + id + 'a"]').prop('disabled', false);
            $('.newaf_manpower_table_1').find('select[id="' + id + 'b"]').prop('disabled', false);
        }

        else {
            //alert('sd')
            $('.newaf_manpower_table_1').find('select[id="' + id + 'a"]').prop('disabled', true);
            $('.newaf_manpower_table_1').find('select[id="' + id + 'b"]').prop('disabled', true);
        }
    });



}





function load_AFLogsheetData(afnumid_, aftable, aflotid_) {

    //cyc_active_stage(cyc_id, stageid); // - populate Stage Side
    //cyc_stage_employee_assign(cyc_id, stageid);  // - populate Employee per Stage
    //cyc_activity_perstage(cyc_id, stageid); //  - populate Activity table
    //cyc_activity_perstage_daterange(cyc_id, stageid); //  - populate Stage DateRange
    load_aflims_skimdata(aflotid_); // populate skimming table

}






//------------------------------Reworked_Anode JS------------------------------------------------------//


$('#afreworked_lotid').live('change', function () {

    var aflotid_ = $('#afreworked_lotid').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Select_AFLot/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#reworkedlotid').text(value.AF_LotId);

            });
        }
    });
});

$('#add_reworked_ok_btn').live('click', function () {

    add_reworked();
});

function add_reworked() {

    var date = $('.rworked_monthyear').val();
    var add_start_date = new Date($('#select_reworked_date').val());
    var aflotid_ = $('#reworkedlotid').text();
    var reworked_pcs_ = $('#reworked_pcs').val();

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Reworked/',
        data: {

            starttime: add_start_date_,
            af_lotid: aflotid_,
            reworked_pcs: reworked_pcs_,
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#dialog_reworked_add').dialog('close');

            alert('Reworked now added.');
            load_reworked_month(date);

        }
    });

}

function load_reworked_month(date_) {

    //var iMonth = iMonth;
    //var iYear = iYear;

    $('#fsfe_controlrm_mattetapper_table td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/AF_Load_reworked_monthyear/',

        data: {
            date: date_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_controlrm_mattetapper_table tr:last').after('<tr id="load_rwanode"><td>'
                    + formatDate_only(value.ReworkedAnodeDate) + '</td><td>'
                    + value.ReworkedAnodePcs + '</td><td>' + value.AFLotNo + '</td><td><a href="#" onclick="delete_reworked('
                    + value.AF_ReworkedAnodesId + ');return false;">Delete</a></td></tr>'
                     );
                paginate('fsfe_controlrm_mattetapper_table', 30);
            });
        }
    });
}


function delete_reworked(AF_ReworkedAnodesId) {

    var date = $('.rworked_monthyear').val();
    var answer = confirm('Are you sure you want to delete this?');


    if (answer) {

        $.ajax({
            url: afserverpath + '/AnodeFurnace/Delete_reworked/',
            data: {
                AF_ReworkedAnodesId: AF_ReworkedAnodesId
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Data now Deleted.');
                load_reworked_month(date);


            }
        });
    }
}

//---------------------------------------------------------END---------------------------------------------------------//

//--------------------------------------------------------Anode ChargedJS----------------------------------------------//


$('#newaf_ancharged_date_selected').live('click', function () {

    $('#af_log_header').css({ "background-color": "#FFFFCC" });
    $('input[type="text"], select,option').css({ "background-color": "#FFFFCC" });
    $('select , img, span').removeAttr('disabled');
    selected = 1;
    load_af_page();

    var date_ = $('#newaf_ancharged_select_date').val();

});


$('#afancharged_lotid').live('change', function () {

    var aflotid_ = $('#afancharged_lotid').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Select_AFLot/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#ancharged_lotid').text(value.AF_LotId);

            });
        }
    });
});




$('#add_ancharged_ok_btn').live('click', function () {

    add_ancharged();

});

$('#edit_ancharged_ok_btn').live('click', function () {

    edit_ancharged();

});


function add_ancharged() {
    var date = $('#anodecharged_monthyear').val();
    var add_start_date = new Date($('#select_ancharged_date').val());
    var aflotid_ = $('#ancharged_lotid').text();
    var prov_weight_ = $('#prov_weight').val();
    var reworked_pcs_ = $('#ancharged_pcs').val();

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");


    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_ancharged/',
        data: {

            starttime: add_start_date_,
            af_lotid: aflotid_,
            prov_weight: prov_weight_,
            reworked_pcs: reworked_pcs_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#dialog_ancharged_add').dialog('close');
            alert('Data now added.');

            AF_Load_anodecharged_monthyear(date);



        }
    });
}

function edit_ancharged() {
    var date = $('#anodecharged_monthyear').val();

    var add_start_date = new Date($('#select_ancharged_date_edit').val());
    var aflotid_ = $('#ancharged_lotid_edit').text();
    var prov_weight_ = $('#prov_weight_edit').val();
    var reworked_pcs_ = $('#ancharged_pcs_edit').val();
    var ancharged_id = $('#ancharged_id_edit').text();

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");


    $.ajax({
        url: afserverpath + '/AnodeFurnace/edit_ancharged/',
        data: {

            starttime: add_start_date_,
            af_lotid: aflotid_,
            prov_weight: prov_weight_,
            reworked_pcs: reworked_pcs_,
            ancharged_id: ancharged_id
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#dialog_ancharged_edit').dialog('close');

            alert('Data now updated.');
            AF_Load_anodecharged_monthyear(date);
        }
    });

}

function AF_Load_anodecharged_monthyear(date_) {

    var iMonth = iMonth;
    var iYear = iYear;

    $('#fsfe_controlrm_mattetapper_table td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/AF_Load_anodecharged_monthyear/',

        data: {

            date: date_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#fsfe_controlrm_mattetapper_table tr:last').after('<tr><td>'
                    + formatDate_only(value.AF_DTime) + '</td><td>'
                    + value.AF_Pcs + '</td><td>'
                    + value.AF_Weight + '</td><td>'
                    + value.LotNo + '</td><td><a href="#" onclick="load_ancharged_edit_partial(' + value.AF_AnodeChargedId + ');return false;">Edit</a></td><td><a href="#" onclick="delete_ancharged('
                    + value.AF_AnodeChargedId + ');return false;">Delete</a></td>'
                     );

                paginate('fsfe_controlrm_mattetapper_table', 30);

            });
        }
    });
}


function delete_ancharged(AF_AnodeChargedId) {

    var date = $('#anodecharged_monthyear').val();
    var answer = confirm('Are you sure you want to delete this?');


    if (answer) {

        $.ajax({
            url: afserverpath + '/AnodeFurnace/Delete_ancharged/',
            data: {
                AF_AnodeChargedId: AF_AnodeChargedId
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Data now Deleted.');
                AF_Load_anodecharged_monthyear(date);

            }
        });
    }
}

function load_ancharged_edit_partial(AF_AnodeChargedId) {

    var partialview_link = serverpath + "/AnodeFurnace/Edit_ancharged_partial/?AF_AnodeChargedId=" + AF_AnodeChargedId;
    $('#dialog_ancharged_edit').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}


//----------------------------------------------------------END-------------------------------------------------------//

//--------------------------------load ladle measurements-----------------------//

function load_ladle_measure() {

    var aflotno_ = $('#cfcyclenum_cycledetail').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_ladle/',
        data: {
            aflotno: aflotno_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#pc_lotid').text(value.AF_LotId);
                $('#casting_lotid').text(value.AF_LotId);

                //CL #  cw1 and cw2    
                if (value.AF_ParamId == 1560) {
                    $('#LM_1560').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1561) {
                    $('#LM_1561').attr('value', value.AF_NumVal.toFixed(2));
                }

                //Spout cw1 and cw2
                if (value.AF_ParamId == 1562) {
                    $('#LM_1562').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1563) {
                    $('#LM_1563').val(value.AF_NumVal.toFixed(2));
                }

                //Skimming Plate cw1 and cw2
                if (value.AF_ParamId == 1564) {
                    $('#LM_1564').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1565) {
                    $('#LM_1565').val(value.AF_NumVal.toFixed(2));
                }

                //Intermediate Ladle # cw1 and cw2
                if (value.AF_ParamId == 1566) {
                    $('#LM_1566').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1567) {
                    $('#LM_1567').val(value.AF_NumVal.toFixed(2));
                }

                //Left Spout (CW1) 
                if (value.AF_ParamId == 1568) {
                    $('#LM_1568').val(value.AF_NumVal.toFixed(2));
                    //$('#LMe2').val(value.AF_NumVal);
                }

                //Left Skim Plate Distance
                if (value.AF_ParamId == 1569) {
                    $('#LM_1569').val(value.AF_NumVal.toFixed(2));
                    //$('#LMf2').val(value.AF_NumVal);
                }

                //Right Spout (CW2)
                if (value.AF_ParamId == 1570) {
                    //$('#LMg1').val(value.AF_NumVal);
                    $('#LM_1570').val(value.AF_NumVal.toFixed(2));
                }

                //Right Skim Plate Distance
                if (value.AF_ParamId == 1571) {
                    //$('#LMh1').val(value.AF_NumVal);
                    $('#LM_1571').val(value.AF_NumVal.toFixed(2));
                }

                //Thrust Rods filter by parameter ID
                if (value.AF_ParamId == 1572) {
                    $('#LM_1572').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1573) {
                    $('#LM_1573').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1582) {
                    $('#LM_1582').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1574) {
                    $('#LM_1574').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1575) {
                    $('#LM_1575').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1576) {
                    $('#LM_1576').attr('value', value.AF_NumVal.toFixed(2));
                }

                //Ladle/Mould Invertory filter by parameter ID
                if (value.AF_ParamId == 1577) {
                    $('#LM_1577').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1578) {
                    $('#LM_1578').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1579) {
                    $('#LM_1579').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1580) {
                    $('#LM_1580').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1581) {
                    $('#LM_1581').attr('value', value.AF_NumVal.toFixed(2));
                }


                //load Molten Metal Temp filter by parameter ID
                if (value.AF_ParamId == 1589) {
                    $('#MMT_1589').attr('value', value.AF_NumVal);
                } else if (value.AF_ParamId == 1590) {
                    $('#MMT_1590').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1591) {
                    $('#MMT_1591').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1592) {
                    $('#MMT_1592').attr('value', value.AF_NumVal.toFixed(2));
                }


                //load mould casting filter by parameter ID
                if (value.AF_ParamId == 1593) {
                    $('#MC_1593').attr('value', value.AF_NumVal);
                    $('.sucst1').attr('value', value.AF_NumVal);

                } else if (value.AF_ParamId == 1595) {
                    $('#MC_1595').attr('value', value.AF_NumVal);
                    $('.sucst2').attr('value', value.AF_NumVal);
                }
                if (value.AF_ParamId == 1596) {
                    $('#MC_1596').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1597) {
                    $('#MC_1597').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1598) {
                    $('#MC_1598').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1599) {
                    $('#MC_1599').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1600) {
                    $('#MC_1600').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1601) {
                    $('#MC_1601').attr('value', value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1602) {
                    $('#MC_1602').attr('value', value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1603) {
                    $('#MC_1603').attr('value', value.AF_NumVal.toFixed(2));
                }

                var numval1 = parseFloat($('#MC_1597').val());
                var numval2 = parseFloat($('#MC_1599').val());
                var numval3 = parseFloat($('#MC_1601').val());
                //var numval4 = parseFloat($('#MC_1602').val());

                var numval1a = parseFloat($('#MC_1596').val());
                var numval2b = parseFloat($('#MC_1598').val());
                var numval3c = parseFloat($('#MC_1600').val());


                var totalt = numval1a + numval2b + numval3c;
                var totaln = numval1 + numval2 + numval3;

                if (isNaN(totalt)) {
                    $('#MC_totalt').val('0.00');
                } else {
                    $('#MC_totalt').val(totalt.toFixed(2));
                }

                if (isNaN(totaln)) {
                    $('#MC_totaln').val('0.00');
                } else {
                    $('#MC_totaln').val(totaln.toFixed(2));
                }

                //load turnover (Anode Casted)
                if (value.AF_ParamId == 1604) {
                    $('#TO_1604').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1605) {
                    $('#TO_1605').val(value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1606) {
                    $('#TO_1606').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1607) {
                    $('#TO_1607').val(value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1608) {
                    $('#TO_1608').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1610) {
                    $('#TO_1610').val(value.AF_NumVal.toFixed(2));
                } if (value.AF_ParamId == 1611) {
                    $('#TO_1611').val(value.AF_NumVal.toFixed(2));
                }


                //load molten metal temp numeric
                if (value.AF_ParamId == 1615) {
                    $('#start_time_1615').val(value.AF_NumVal.toFixed(2));
                } else if (value.AF_ParamId == 1617) {
                    $('#start_time_1617').val(value.AF_NumVal.toFixed(2));
                }
                if (value.AF_ParamId == 1619) {
                    $('#start_time_1619').val(value.AF_NumVal.toFixed(2));
                }


                //load mould casting customer           
                if (value.AF_ParamId == 1623) {
                    $('#MC_1623').val(value.AF_NumVal);
                } else if (value.AF_ParamId == 1624) {
                    $('#MC_1624').val(value.AF_NumVal);
                }
                if (value.AF_ParamId == 1625) {
                    $('#MC_1625').val(value.AF_NumVal);
                }


                $('td, input,select').change(
                 function () {
                     $(this).css({ 'background-color': '#DFD8D1' });
                     $(this).addClass('changed');
                 });


            });
        }
    });
}





function save_precast(tbl_name, prefix, msg) {


    var aflotid = $('#pc_lotid').text();
    var items = [];

    $('#' + tbl_name).find('td,th').each(function () {
        $(this).find('input.changed,select.changed').each(function () {
            var attrid = $(this).attr('id');
            var paramid_ = attrid.replace(prefix, '');
            var numval_ = $(this).val();

            items.push({
                aflotid: aflotid,
                paramid: paramid_,
                numval: numval_
            });
        });
    });

    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/save_precast',

        data: items,

        success: function (data) {

            alert('Changes in ' + msg + ' was now saved.');

            //load saved data
            ddactive_af_casting('AF_PreCasting'); return false;

        }
    });

}
function load_clear_css_condem() {
    $('#aflogsheet_pcmouldr input,#aflogsheet_pcmouldr select,#aflogsheet_pcmouldr td').each(function () {
        //$(this).css('background-color', '#ffffff');
        $(this).removeClass('changed');
    });
}

function load_mouldr() {

    var aflotno_ = $('#cfcyclenum_cycledetail').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_mouldr/',
        data: {
            aflotno: aflotno_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {



                if (value.AF_MouldNo == 1 && value.AF_CastingWheel == 1) {
                    $("#cw_1_1").prop('checked', true);
                    $("#cw_1_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_1_1").addClass('changed');
                }
                if (value.AF_MouldNo == 1 && value.AF_CastingWheel == 2) {
                    $("#cw_1_2").prop('checked', true);
                    $("#cw_1_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_1_2").addClass('changed');
                }
                if (value.AF_MouldNo == 2 && value.AF_CastingWheel == 1) {
                    $("#cw_2_1").prop('checked', true);
                    $("#cw_2_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_2_1").addClass('changed');
                }
                if (value.AF_MouldNo == 2 && value.AF_CastingWheel == 2) {
                    $("#cw_2_2").prop('checked', true);
                    $("#cw_2_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_2_2").addClass('changed');
                }
                if (value.AF_MouldNo == 3 && value.AF_CastingWheel == 1) {
                    $("#cw_3_1").prop('checked', true);
                    $("#cw_3_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_3_1").addClass('changed');
                }
                if (value.AF_MouldNo == 3 && value.AF_CastingWheel == 2) {
                    $("#cw_3_2").prop('checked', true);
                    $("#cw_3_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_3_2").addClass('changed');
                }
                if (value.AF_MouldNo == 4 && value.AF_CastingWheel == 1) {
                    $("#cw_4_1").prop('checked', true);
                    $("#cw_4_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_4_1").addClass('changed');
                }
                if (value.AF_MouldNo == 4 && value.AF_CastingWheel == 2) {
                    $("#cw_4_2").prop('checked', true);
                    $("#cw_4_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_4_2").addClass('changed');
                }
                if (value.AF_MouldNo == 5 && value.AF_CastingWheel == 1) {
                    $("#cw_5_1").prop('checked', true);
                    $("#cw_5_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_5_1").addClass('changed');
                }
                if (value.AF_MouldNo == 5 && value.AF_CastingWheel == 2) {
                    $("#cw_5_2").prop('checked', true);
                    $("#cw_5_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_5_2").addClass('changed');
                }
                if (value.AF_MouldNo == 6 && value.AF_CastingWheel == 1) {
                    $("#cw_6_1").prop('checked', true);
                    $("#cw_6_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_6_1").addClass('changed');
                }
                if (value.AF_MouldNo == 6 && value.AF_CastingWheel == 2) {
                    $("#cw_6_2").prop('checked', true);
                    $("#cw_6_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_6_2").addClass('changed');
                }
                if (value.AF_MouldNo == 7 && value.AF_CastingWheel == 1) {
                    $("#cw_7_1").prop('checked', true);
                    $("#cw_7_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_7_1").addClass('changed');
                }
                if (value.AF_MouldNo == 7 && value.AF_CastingWheel == 2) {
                    $("#cw_7_2").prop('checked', true);
                    $("#cw_7_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_7_2").addClass('changed');
                }
                if (value.AF_MouldNo == 8 && value.AF_CastingWheel == 1) {
                    $("#cw_8_1").prop('checked', true);
                    $("#cw_8_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_8_1").addClass('changed');
                }
                if (value.AF_MouldNo == 8 && value.AF_CastingWheel == 2) {
                    $("#cw_8_2").prop('checked', true);
                    $("#cw_8_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_8_2").addClass('changed');
                }
                if (value.AF_MouldNo == 9 && value.AF_CastingWheel == 1) {
                    $("#cw_9_1").prop('checked', true);
                    $("#cw_9_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_9_1").addClass('changed');
                }
                if (value.AF_MouldNo == 9 && value.AF_CastingWheel == 2) {
                    $("#cw_9_2").prop('checked', true);
                    $("#cw_9_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_9_2").addClass('changed');
                }
                if (value.AF_MouldNo == 10 && value.AF_CastingWheel == 1) {
                    $("#cw_10_1").prop('checked', true);
                    $("#cw_10_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_10_1").addClass('changed');
                }
                if (value.AF_MouldNo == 10 && value.AF_CastingWheel == 2) {
                    $("#cw_10_2").prop('checked', true);
                    $("#cw_10_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_10_2").addClass('changed');
                }
                if (value.AF_MouldNo == 11 && value.AF_CastingWheel == 1) {
                    $("#cw_11_1").prop('checked', true);
                    $("#cw_11_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_11_1").addClass('changed');
                }
                if (value.AF_MouldNo == 11 && value.AF_CastingWheel == 2) {
                    $("#cw_11_2").prop('checked', true);
                    $("#cw_11_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_11_2").addClass('changed');
                }
                if (value.AF_MouldNo == 12 && value.AF_CastingWheel == 1) {
                    $("#cw_12_1").prop('checked', true);
                    $("#cw_12_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_12_1").addClass('changed');
                }
                if (value.AF_MouldNo == 12 && value.AF_CastingWheel == 2) {
                    $("#cw_12_2").prop('checked', true);
                    $("#cw_12_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_12_2").addClass('changed');
                }
                if (value.AF_MouldNo == 13 && value.AF_CastingWheel == 1) {
                    $("#cw_13_1").prop('checked', true);
                    $("#cw_13_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_13_1").addClass('changed');
                }
                if (value.AF_MouldNo == 13 && value.AF_CastingWheel == 2) {
                    $("#cw_13_2").prop('checked', true);
                    $("#cw_13_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_13_2").addClass('changed');
                }
                if (value.AF_MouldNo == 14 && value.AF_CastingWheel == 1) {
                    $("#cw_14_1").prop('checked', true);
                    $("#cw_14_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_14_1").addClass('changed');
                }
                if (value.AF_MouldNo == 14 && value.AF_CastingWheel == 2) {
                    $("#cw_14_2").prop('checked', true);
                    $("#cw_14_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_14_2").addClass('changed');
                }
                if (value.AF_MouldNo == 15 && value.AF_CastingWheel == 1) {
                    $("#cw_15_1").prop('checked', true);
                    $("#cw_15_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_15_1").addClass('changed');
                }
                if (value.AF_MouldNo == 15 && value.AF_CastingWheel == 2) {
                    $("#cw_15_2").prop('checked', true);
                    $("#cw_15_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_15_2").addClass('changed');
                }
                if (value.AF_MouldNo == 16 && value.AF_CastingWheel == 1) {
                    $("#cw_16_1").prop('checked', true);
                    $("#cw_16_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_16_1").addClass('changed');
                }
                if (value.AF_MouldNo == 16 && value.AF_CastingWheel == 2) {
                    $("#cw_16_2").prop('checked', true);
                    $("#cw_16_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_16_2").addClass('changed');
                }
                if (value.AF_MouldNo == 17 && value.AF_CastingWheel == 1) {
                    $("#cw_17_1").prop('checked', true);
                    $("#cw_17_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_17_1").addClass('changed');
                }
                if (value.AF_MouldNo == 17 && value.AF_CastingWheel == 2) {
                    $("#cw_17_2").prop('checked', true);
                    $("#cw_17_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_17_2").addClass('changed');
                }
                if (value.AF_MouldNo == 18 && value.AF_CastingWheel == 1) {
                    $("#cw_18_1").prop('checked', true);
                    $("#cw_18_1_1_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_18_1").addClass('changed');
                }
                if (value.AF_MouldNo == 18 && value.AF_CastingWheel == 2) {
                    $("#cw_18_2").prop('checked', true);
                    $("#cw_18_2_2_S").val(value.AF_CondemnedMould_ReasonId);
                    //$("#cw_18_2").addClass('changed');
                }


                //$('.cw1').on('change', function () {
                //     //if ($('input.cw1').filter(':checked').length >= 1 || 0) {

                //    //   if   ($('input.cw1').not(this).prop('checked', false)){
                //    if ($("input.cw1").attr("checked", false)) {
                //          $('input.cw1').css({ 'background-color': '#FFFFFF' });
                //          $(this).removeClass('changed');

                //      } else {

                //          $('input').prop(function () {

                //              $(this).css({ 'background-color': '#DFD8D1' });
                //              $(this).addClass('changed');
                //              $(this).removeClass('cw2');
                //              $(this).removeClass('cw1');

                //          });

                //      }
                // });


                // $('.cw2').change(function () {
                //     // if ($('input.cw2').filter(':checked').length >= 1 || 0) {

                //     // if  ($('input.cw2').not(this).prop('checked', false)) {
                //     if ($("input.cw2").attr("checked", false)) {
                //     $('input.cw2').css({ 'background-color': '#FFFFFF' });
                //          $(this).removeClass('changed');

                //      } else {

                //          $('input').prop(function () {

                //              $(this).css({ 'background-color': '#DFD8D1' });
                //              $(this).addClass('changed');
                //              $(this).removeClass('cw2');
                //              $(this).removeClass('cw1');
                //          });                                             
                //      }
                // });




                $('input.extratbl_input').prop(function () {

                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('changed');
                    $(this).removeClass('cw2');
                    $(this).removeClass('cw1');

                    if ($(this).prop('checked') == true) {

                        $(this).addClass('changed');

                    } else {

                        $(this).removeClass('changed');
                    }

                });
            });
        }
    });
}


function save_mouldr() {


    var aflotid = $('#casting_lotid').text();

    var items = [];

    $('#aflogsheet_pcmouldr').find('input[id*="cw_"].changed,select[id*="cw_"].changed').each(function () {

        var attrid = $(this).attr('id');
        var strValue = attrid.replace('cw_', '');
        var params = strValue.split("_");

        if (params[3] == 'S') {

            var afwheelnum = params[1];
            var inputid = $(this).closest('td').prev('td').find('input').attr('id')

            var mr_reason_id_ = $(this).val();

            if ($("#" + inputid).prop('checked') == true) {

                var afmouldnum = params[0];
                var check = 1;
                var input_flag = 1;

            } else {
                var afmouldnum = params[0];
                var check = 0;
                var input_flag = 0;
            }


        } else {

            var mr_reason_id_ = $(this).closest('td').next('td').find('select').val();

            var afwheelnum = params[1];

            if ($(this).prop('checked') == true) {

                var afmouldnum = params[0];
                var check = 1;


            } else {

                var afmouldnum = params[0];
                var check = 0;

            }
        }


        //if (input_flag > 0) {

        items.push({
            aflotid: aflotid,
            afwheelnum: afwheelnum,
            afmouldnum: afmouldnum,
            afreasonId: mr_reason_id_,
            check: check
        });
        //}

    });

    if (items.length != 0) {

        //$.ajax({
        //    url: serverpath + '/AnodeFurnace/Delete_mouldr/',
        //    data: {

        //        aflotid: aflotid,

        //    },
        //    type: 'POST',
        //    cache: false,
        //    success: function (data) {


        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_mouldr',

            data: items,

            success: function (data) {

                alert('Changes in Mould Condemnation now saved.');

                //load saved data
                ddactive_af_casting('AF_CastingOperations'); return false;
                load_mouldr();
                load_clear_css_condem();

            },
            error: function (data) {
                alert('Changes in Mould Condemnation now saved.');

                //load saved data
                ddactive_af_casting('AF_CastingOperations'); return false;
                load_mouldr();
                load_clear_css_condem();

            }
        });
        // }
        // });

    } else {

        // alert('No changes were made.');

    }
}


function save_precast_cust() {

    var aflotno = $('#cfcyclenum_cycledetail').text();
    var custid = $('#cw1_cust_ddl.changed').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_precast_cust/',
        data: {
            aflotno: aflotno,
            custid: custid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert("Changes in Customer now saved.");
            precast_customer_data();
            $('#cw1_cust_ddl').removeClass('changed');

        }
    });
}

function precast_customer_data() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/precast_customer_data/',
        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {

                $('#cw1_cust_ddl').val(value.AF_NumVal);

            });
        }
    });
}

$("#addmould_btn").live('click', function () {
    addmould_partial();
});

$("#save_blister_prep").live('click', function () {
    save_launder_temp_modify();
    save_anodecast_percust();
});
$("#save_blister_prep").live('click', function () {
    save_casting_numeric('aftable_cast1', 'MC_', 'Casting Wheel 1 Customer');
});
$("#save_blister_prep").live('click', function () {
    save_casting_numeric('aftable_cast2', 'MC_', 'Casting Wheel 2 Customer');
});


$("#save_blister_prep").live('click', function () {
    save_molten_temp('tbl_molten_temp', 'start_time_', 'Molten Metal Temp');
    save_casting_numeric('tbl_molten_temp', 'start_time_', 'Molten Metal Temp');
});

$("#save_wd").live('click', function () {
    save_weight_dist('afwd_tbl', 'WD_', 'Weight Distribution');
});

$("#save_mould_inv").live('click', function () {
    save_mould_inventory();
});

$("#save_blister_prep").live('click', function () {
    save_casting_numeric('tbl_molten', 'MMT_', 'Molten Metal Temp');
});

$("#save_blister_prep").live('click', function () {
    save_casting_numeric('tbl_mcast', 'MC_', 'Mould Casting');
});

$("#save_blister_prep").live('click', function () {
    save_casting_numeric('tbl_mcast_cust', 'MC_', 'Mould Casting Customer');
});

$("#save_blister_prep").live('click', function () {
    save_casting_numeric('tbl_anodecast', 'TO_', 'Turnover (Anodes Casted)');
});


$("#save_blister_prep").live('click', function () {
    save_precast('ladle_measurement_tbl', 'LM_', 'Ladle Measurements');
    save_precast('aflogsheet_condem_mould', 'MC_', 'Customer');
    save_precast('aflogsheet_mouldres', 'MC_', 'Customer');
});

$("#save_blister_prep").live('click', function () {
    save_precast('tbl_thrust_rods', 'LM_', 'Thrust Rods');
});
$("#save_blister_prep").live('click', function () {
    save_precast('tbl_LM_inventory', 'LM_', 'Ladle/Mould Inventory');
});

$("#save_blister_prep").live('click', function () {
    save_mouldr();
    save_mouldreplace();
});

$("#save_blister_prep").live('click', function () {
    save_precast_cust();
});

$("#save_blister_prep").live('click', function () {
    //save_condemned_mould();
});

$("#save_blister_prep").live('click', function () {
    save_condemned_mould_precast();
});

$("#save_blister_prep").on("click", function () {
    $('#csaved').css({ 'visibility': 'visible' });
    $("#csaved").toggle(900).fadeOut();
});

$("#pcaddrow_btn").live('click', function () {
    addprecast_partial();
});



$("#pcaddrow_lnk").live('click', function () {
    addprecast_partial();
});

$("#add_precast_ok_btn").live('click', function () {


    var aflotid = $('#pc_lotid').text();

    addprecast(aflotid, '#Dialog_AddPreCast');
});


$("#edit_precast_ok_btn").live('click', function () {


    var aflotid = $('#pc_lotid').text();

    save_edit_precast_act('#Dialog_editPreCast');


});

$("#insertmid_precast_ok_btn").live('click', function () {


    var aflotid = $('#pc_lotid').text();

    save_mid_precast(aflotid, '#Dialog_insert_midprecast');
});


function addprecast_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();


    if (end_date_validation()) {
        var partialview_link1 = afserverpath + "/AnodeFurnace/addprecast_partial/?aflotno=" + aflotno;


        $('#Dialog_AddPreCast').load(partialview_link1, function () {
            $(this).dialog('open');

            //$('body').css('overflow', 'hidden');



        });
    }
    return false;
}

//onkeyup input add activity code
$('#Dialog_AddPreCast .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_AddPreCast');

});

//onkeyup input edit activity code
$('#Dialog_editPreCast .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_editPreCast');

});

//onkeyup input insertmid activity code
$('#Dialog_insert_midprecast .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_insert_midprecast');

});

function act_code_intel_af(actcode_val, dialogname) {

    $(dialogname + ' .act_add_code_input').val(actcode_val);

    $(dialogname + ' #Act_Desc_div').html('Invalid Code.');


    $.ajax({
        url: serverpath + '/AnodeFurnace/ActivityCode_Intellisense/',

        data: {
            actcode_param: actcode_val
        },

        type: 'post',
        cache: false,
        success: function (data) {
            $(dialogname + ' #Act_Desc_div').text(data.AF_ActivityDesc);

            $(dialogname + ' .actcode_id').val(data.AF_ActivityCodeId);
            $(dialogname + ' .actcode_id').text(data.AF_ActivityCodeId);
            $('.add_pc_actcode_id').val(data.AF_ActivityCodeId);
            $('.add_pc_actcode_id').text(data.AF_ActivityCodeId);

            validation_perbtn_precast(data.AF_ActivityCodeId);
            validation_perbtn_precast_for_edit(data.AF_ActivityCodeId);
            validation_perbtn_precast_for_midinsert(data.AF_ActivityCodeId);

            validation_perbtn_casting(data.AF_ActivityCodeId);
            validation_perbtn_casting2(data.AF_ActivityCodeId);
            validation_perbtn_cast_for_edit();
            validation_perbtn_insertmidcasting(data.AF_ActivityCodeId)
            validation_casting_tblnew(data.AF_ActivityCodeId, dialogname);
            validation_editcasting_tblnew(data.AF_ActivityCodeId, dialogname);
            validation_casting_tbl2new(data.AF_ActivityCodeId, dialogname);
            validation_editcasting_tbl2new(data.AF_ActivityCodeId, dialogname);
        }
    });

}

$('.act_code_desc_td_cast').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();
    var af_val = $(this).closest('td').next('td').next('td').next('td').text();
    var cf_val = $(this).closest('td').next('td').next('td').text();
    var fsfe_val = $(this).closest('td').next('td').text();

    //var af_val = $(this).closest('td').next('td').next('td').text();
    //var cf_val = $(this).closest('td').prev('td').prev('td').prev('td').text();
    //var fsfe_val = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();

    var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

    act_code_intel_af(actcode_val, '#' + dialogparent);



    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');


    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

});



//start time js for add precast form
$(document).on('change', '#Dialog_AddPreCast #start_time_hr_input', function () {

    validation_perbtn_precast();
});

$(document).on('change', '#Dialog_AddPreCast #start_time_min_input', function () {

    validation_perbtn_precast();
});

$(document).on('change', '#Dialog_AddPreCast #start_date_input_pc', function () {

    validation_perbtn_precast();
});

$(document).on('change', '#start_time_hr_input_editpcact', function () {


    validation_perbtn_precast_for_edit();
});

$(document).on('change', '#start_time_min_input_editpcact', function () {


    validation_perbtn_precast_for_edit();
});

$(document).on('change', '#start_date_input_editpcact', function () {

    validation_perbtn_precast_for_edit();

});


//end time js for add precast form
$(document).on('change', '#Dialog_AddPreCast #end_time_hr_input', function () {

    validation_perbtn_precast();
});

$(document).on('change', '#Dialog_AddPreCast #end_time_min_input', function () {

    validation_perbtn_precast();
});

$(document).on('change', '#Dialog_AddPreCast #end_date_input_pc', function () {

    validation_perbtn_precast();
});

//AF
//start time js for add precast form

$(document).on('change', '#end_time_hr_input_editpcact', function () {

    validation_perbtn_precast_for_edit();
});

$(document).on('change', '#end_time_min_input_editpcact', function () {

    validation_perbtn_precast_for_edit();
});

$(document).on('change', '#end_date_input_editpcact', function () {

    validation_perbtn_precast_for_edit();
});


$(document).on('change', '#end_time_hr_input,#end_time_min_input,#end_date_input', function () {

    validation_perbtn_precast_for_midinsert();

});

$(document).on('change', '#start_time_hr_input,#start_time_min_input,#start_date_input', function () {

    validation_perbtn_precast_for_midinsert();
});



$(document).on('change', '#start_time_hr_input', function () {

    validation_perbtn_af();
});

$(document).on('change', '#start_time_min_input', function () {

    validation_perbtn_af();
});

$(document).on('change', '#start_date_input', function () {

    validation_perbtn_af();
});;



//end time js for add precast form
$(document).on('change', '#end_time_hr_input', function () {

    validation_perbtn_af();
});

$(document).on('change', '#end_time_min_input', function () {

    validation_perbtn_af();
});

$(document).on('change', '#end_date_input', function () {

    validation_perbtn_af();
});


function validation_perbtn_af(codeid) {

    var duration_time = $('#the_dur').text('');


    var s_date = new Date($('#start_date_input').val());
    var s_hr = $('#start_time_hr_input').val();
    var s_min = $('#start_time_min_input').val();



    var end_date = new Date($('#end_date_input').val());
    var end_hr = $('#end_time_hr_input').val();
    var end_min = $('#end_time_min_input').val();


    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = end_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $(' #Act_Desc_div').text();
    var actcode_msg = $('.act_add_code_input').val();
    var actduration_msg = $('#the_dur').text();


    //var act_input = $('.add_af_actcode_id').val();

    //if (act_input == 59 || act_input == 1) {
    //    $('.cf_charge_input').prop('disabled', false);
    //    $('.fsfe_charge_input').prop('disabled', false);
    //    $('.sulfur_input').prop('disabled', false);
    //    $('.af_weight_input').prop('disabled', false);
    //    $('.af_temp_input').prop('disabled', false);

    //} else {
    //    $('.cf_charge_input').prop('disabled', true);
    //    $('.fsfe_charge_input').prop('disabled', true);
    //    $('.af_weight_input').prop('disabled', true);
    //}


    if (codeid == 0 || codeid == '-' || actcodedesc_msg == 'Invalid Code.' || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.') {


        $(' .act_add_code_input').css('background-color', '#FFA8A8');
        $('#error_code').html("Please input a correct Activity Code.");
        //$('#edit_af_ok_btn').attr('disabled', true);
        //$('#add_af_ok_btn').attr('disabled', true);

    }



    else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#the_dur').text('ERROR');
        //$('#edit_af_ok_btn').attr('disabled', true);
        //$('#add_af_ok_btn').attr('disabled', true);


    } else {
        $('#error_code').html("");
        $(' .act_add_code_input').css('background-color', '#FFFFFF');

        $('#error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#the_dur').text(the_dur);
        //$('#edit_af_ok_btn').attr('disabled', false);
        //$('#add_af_ok_btn').attr('disabled', false);

    }


}


function validation_perbtn_precast(codeid) {

    var duration_time = $('#Dialog_AddPreCast #the_dur').text();

    var s_date = new Date($('#Dialog_AddPreCast #start_date_input_pc').val());
    var s_hr = $('#Dialog_AddPreCast #start_time_hr_input').val();
    var s_min = $('#Dialog_AddPreCast #start_time_min_input').val();



    var e_date = new Date($('#Dialog_AddPreCast #end_date_input_pc').val());
    var end_hr = $('#Dialog_AddPreCast #end_time_hr_input').val();
    var end_min = $('#Dialog_AddPreCast #end_time_min_input').val();


    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {
        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }


    //var edit_s_date = new Date($('#start_date_input_editpcact').val());
    //var s_hr = $('#start_time_hr_input_editpcact').val();
    //var s_min = $('#start_time_min_input_editpcact').val();

    //var edit_e_date = new Date($('#end_date_input_editpcact').val());
    //var end_hr = $('#end_time_hr_input_editpcact').val();
    //var end_min = $('#end_time_min_input_editpcact').val();

    //edit_start_date = edit_s_date.add({
    //    minutes: s_min,
    //    hours: s_hr
    //});

    //edit_end_date = edit_e_date.add({
    //    minutes: end_min,
    //    hours: end_hr
    //});



    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);


    //var dur1 = Math.floor((edit_end_date - edit_start_date) / 60000);
    //var h1 = Math.floor(dur1 / 60);
    //var m1 = dur1 % 60;
    //var the_dur1 = (h1 + '.' + m1);



    var actcodedesc_msg = $('#Dialog_AddPreCast #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_AddPreCast .act_add_code_input').val();
    var actduration_msg = $('#Dialog_AddPreCast #the_dur').text();


    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_AddPreCast .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_AddPreCast #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_AddPreCast #add_precast_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_AddPreCast #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_AddPreCast #the_dur').text('ERROR');
        $('#Dialog_AddPreCast #add_precast_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_AddPreCast #error_msg_time_pc').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_AddPreCast #the_dur').text('ERROR');
        $('#Dialog_AddPreCast #add_precast_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_AddPreCast #error_code').html("");
        $('#Dialog_AddPreCast .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_AddPreCast #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_AddPreCast #the_dur').text(the_dur);
        $('#Dialog_AddPreCast #add_precast_ok_btn').attr('disabled', false);


    }


}

function validation_perbtn_precast_for_edit() {

    var duration_time = $('#the_dur1').text();


    var edit_s_date = new Date($('#start_date_input_editpcact').val());
    var s_hr = $('#start_time_hr_input_editpcact').val();
    var s_min = $('#start_time_min_input_editpcact').val();



    var edit_e_date = new Date($('#end_date_input_editpcact').val());
    var end_hr = $('#end_time_hr_input_editpcact').val();
    var end_min = $('#end_time_min_input_editpcact').val();

    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {

        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });

    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }


    edit_start_date = edit_s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    edit_end_date = edit_e_date.add({
        minutes: end_min,
        hours: end_hr
    });



    var dur1 = Math.floor((edit_end_date - edit_start_date) / 60000);
    var h1 = Math.floor(dur1 / 60);
    var m1 = dur1 % 60;
    var the_dur1 = (h1 + '.' + m1);



    var actcodedesc_msg = $('#Dialog_editPreCast #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_editPreCast .act_add_code_input').val();
    var actduration_msg = $('#Dialog_editPreCast #the_dur1').text();

    if (actcodedesc_msg == 'Invalid Code.' || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.') {

        $('#Dialog_editPreCast .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_editPreCast #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_editPreCast #edit_precast_ok_btn').attr('disabled', true);

    } else if (the_dur1 == 0 || edit_end_date <= edit_start_date || edit_start_date >= edit_end_date) {
        $('#Dialog_editPreCast #error_msg_time_pc_edit').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');

        $('#Dialog_editPreCast #the_dur1').text('ERROR');
        $('#Dialog_editPreCast #edit_precast_ok_btn').attr('disabled', true);

    } else if (edit_start_date < lot_date) {
        $('#Dialog_editPreCast #error_msg_time_pc_edit').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_editPreCast #the_dur1').text('ERROR');
        $('#Dialog_editPreCast #edit_precast_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_editPreCast #error_code').html("");
        $('#Dialog_editPreCast .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_editPreCast #error_msg_time_pc_edit').html('Correct: <b>Time</b> is Good.');

        $('#Dialog_editPreCast #the_dur1').text(the_dur1);
        $('#Dialog_editPreCast #edit_precast_ok_btn').attr('disabled', false);

    }


}

function validation_perbtn_precast_for_midinsert(codeid) {

    var duration_time = $('#Dialog_insert_midprecast #the_dur').text();

    var s_date = new Date($('#Dialog_insert_midprecast #start_date_input').val());
    var s_hr = $('#Dialog_insert_midprecast #start_time_hr_input').val();
    var s_min = $('#Dialog_insert_midprecast #start_time_min_input').val();

    var e_date = new Date($('#Dialog_insert_midprecast #end_date_input').val());
    var end_hr = $('#Dialog_insert_midprecast #end_time_hr_input').val();
    var end_min = $('#Dialog_insert_midprecast #end_time_min_input').val();

    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_insert_midprecast #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_insert_midprecast .act_add_code_input').val();
    var actduration_msg = $('#Dialog_insert_midprecast #the_dur').text();

    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_insert_midprecast .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_insert_midprecast #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_insert_midprecast #insertmid_precast_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_insert_midprecast #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_insert_midprecast #the_dur').text('ERROR');
        $('#Dialog_insert_midprecast #insertmid_precast_ok_btn').attr('disabled', true);


    } else {
        $('#Dialog_insert_midprecast #error_code').html("");
        $('#Dialog_insert_midprecast .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_insert_midprecast #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_insert_midprecast #the_dur').text(the_dur);
        $('#Dialog_insert_midprecast #insertmid_precast_ok_btn').attr('disabled', false);


    }


}



function addprecast(aflotid) {

    var aflotid = $('#pc_lotid').text();

    var actcode_id = $('#Dialog_AddPreCast .add_pc_actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_AddPreCast #pc_remarks').text();


    var s_date = new Date($('#Dialog_AddPreCast #start_date_input_pc').val());
    var s_hr = $('#Dialog_AddPreCast #start_time_hr_input').val();
    var s_min = $('#Dialog_AddPreCast #start_time_min_input').val();



    var end_date = new Date($('#Dialog_AddPreCast #end_date_input_pc').val());
    var end_hr = $('#Dialog_AddPreCast #end_time_hr_input').val();
    var end_min = $('#Dialog_AddPreCast #end_time_min_input').val();


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
        url: afserverpath + '/AnodeFurnace/add_precast_act/',
        data: {

            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_AddPreCast').dialog('close');

            alert('Data now added.');
            load_status_aflot($('#lotid').text());
            load_PreCast_Act_for_tab();




        }
    });
}

function save_mid_precast(aflotid) {

    var aflotid = $('#pc_lotid').text();

    var actcode_id = $('#Dialog_insert_midprecast .add_pc_actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_insert_midprecast #pc_remarks').text();


    var s_date = new Date($('#Dialog_insert_midprecast #start_date_input').val());
    var s_hr = $('#Dialog_insert_midprecast #start_time_hr_input').val();
    var s_min = $('#Dialog_insert_midprecast #start_time_min_input').val();



    var end_date = new Date($('#Dialog_insert_midprecast #end_date_input').val());
    var end_hr = $('#Dialog_insert_midprecast #end_time_hr_input').val();
    var end_min = $('#Dialog_insert_midprecast #end_time_min_input').val();


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
        url: afserverpath + '/AnodeFurnace/add_precast_act/',
        data: {

            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_insert_midprecast').dialog('close');

            alert('Data now added.');

            load_PreCast_Act_for_tab();




        }
    });
}



function addaf(aflotid) {


    var timelogid = $('#Dialog_AddAF .timelogid').val();
    var aflotid = $('#lotid').text();

    var actcode_id = $('#Dialog_AddAF .add_af_actcode_id').val();
    //var wheelid = 0;
    //var timelogid = 0;

    var items = [];



    var afcf = $('#Dialog_AddAF #afparam_1585').val();
    var afsulfur = $('#Dialog_AddAF #afparam_1587').val();
    var afcycle = $('#Dialog_AddAF #afparam_1586').val();
    var afweight = $('#Dialog_AddAF #afparam_1584').val();
    var aftemp = $('#Dialog_AddAF #afparam_1588').val();


    //var sulfur = $('.sulfur_input').val();
    //var cyc_no = $('.fsfe_charge_input').val();
    //var weight = $('.af_weight_input').val();
    //var temp = $('.af_temp_input').val();

    var af_remarks = $('#Dialog_AddAF #af_remarks').text();


    var s_date = new Date($('#Dialog_AddAF #start_date_input').val());
    var s_hr = $('#Dialog_AddAF #start_time_hr_input').val();
    var s_min = $('#Dialog_AddAF #start_time_min_input').val();



    var end_date = new Date($('#Dialog_AddAF #end_date_input').val());
    var end_hr = $('#Dialog_AddAF #end_time_hr_input').val();
    var end_min = $('#Dialog_AddAF #end_time_min_input').val();


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
        url: afserverpath + '/AnodeFurnace/add_af_act/',
        data: {
            aflotid_: aflotid,
            actcode_id: actcode_id,
            start_date: start_date,
            end_date: end_date,
            af_remarks: af_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_AddAF').dialog('close');

            $('#Dialog_AddAF input[id*="afparam_"],#Dialog_AddAF select[id*="afparam_"]').each(function () {
                var attrid_ = $(this).attr('id');
                var id_ = attrid_.replace('afparam_', '');
                var numval_ = $(this).val();

                var aftimelogid = $('#Dialog_AddAF .timelogid').val(data);


                items.push({
                    aflotid: aflotid,
                    aftimelogid: data,
                    afparamid: id_,
                    afnumval: numval_
                });
            });


            if (items.length != 0) {

                //$.ajax({
                //    url: serverpath + '/AnodeFurnace/Delete_aftimelogs/',
                //    data: {

                //        aflotid: aflotid,

                //    },

                //    type: 'POST',
                //    cache: false,
                //    success: function (data) {


                items = JSON.stringify({ 'items': items });

                $.ajax({
                    url: afserverpath + '/AnodeFurnace/Save_TimeLogs',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,

                    data: items,
                    success: function (data) {
                        alert('New Activity now saved.');
                        load_status_aflot($('#lotid').text());
                        load_AF_Act();

                    }

                });
                //}

                //});

                //alert(timelogid);

            } else {

                alert('No changes were made.');

            }
        }
    });
}

function load_AF_Act() {

    var aflotno = $('#lotid').text();
    $('#blisterprep_tbl td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_AF_Act/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                check_disabled(value.AF_TimeLogId)

                ///$(value.ParamId == 1585) {
                //$('#paramid_' + value.ParamId).val(value.numval);


                //if (value.ParamId == 1587) {
                //    $('#paramid_').attr('value', value.AF_NumVal);
                //}

                //$('#paramid_' + value.paramid).val(value.numval);

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);


                $('#blisterprep_tbl tr:last').after('<tr class="aftimelogid_' + value.AF_TimeLogId + '" id="' + value.AF_TimeLogId + '"><td class="border_color">'
                    + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                    + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color" id="ActivityCodeName">'
                    + value.ActivityCodeName + '</td><td class="border_color"><b>'
                    + value.ActivityDesc + '</b></td><td class="border_color">'
                    + hr + '.' + min + '</td><td class="border_color" id="paramid_1585"></td><td class="border_color" id="paramid_1587"></td><td class="border_color" id="paramid_1586"></td><td class="border_color" id="paramid_1584"></td><td class="border_color" id="paramid_1588"></td><td class="border_color">'
                    + value.AF_TimeLog_Remarks + '</td><td  id="afedit_id" class="select_edit_afact"  onclick="edit_af_act(' + value.AF_TimeLogId + ');"><b class="must_hide">Edit</b></td><td style="visibility: hidden;" id="afdel_id" class="select_disable_afact" onclick="delete_af_act(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;"><b class="must_hide">Delete</b></td></tr>'
                     );

            });

            var ids = new Array();
            $('#blisterprep_tbl tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#blisterprep_tbl tr[id="' + maxId + '"]').closest('tr').find('td#afdel_id').css("visibility", "visible");

            //alert(maxId);



            load_extra(aflotno);
        }
    });
}
//Activit Search functions AF
$("#search").keyup(function () {
    _this = this;
    //Show only matching TR, hide rest of them
    $.each($("#blisterprep_tbl tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).hide();
        else
            $(this).show();
    });
});
//end

function load_extra(aflotno) {

    //var aflotno = $('#lotid').text();
    //$('#blisterprep_tbl td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_AF_inputs/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            var get_data;
            $.each(data, function (index, value) {
                get_data = $('.aftimelogid_' + value.AF_TimeLogId + ' #paramid_' + value.AF_ParamId).text((value.AF_Logs_NumVal) ? value.AF_Logs_NumVal : "-");

                //$('#Dialog_AddAF #paramid_1585').text(value.CycleNumber);

                if (value.AF_ParamId == 1586) {
                    $('.aftimelogid_' + value.AF_TimeLogId + ' #paramid_1586').text((value.NumValDesc) ? value.NumValDesc : "-");
                }
                //$('#paramid_1587').text(value.CycleNumber);


            });


            //$.ajax({
            //    contentType: 'application/json; charset=utf-8',
            //    dataType: 'json',
            //    type: 'POST',
            //    cache: false,
            //    url: afserverpath + '/AnodeFurnace/get_cvcycle',
            //    data: get_data,
            //    success: function (data) {

            //        $.each(data, function (index, value) {

            //            $('#paramid_1585').text(value.NumValDesc);
            //$('#paramid_1586').text(value.NumValDesc);
            //$('#paramid_1587').text(value.CycleNumber);

            //$('#aftimelogid_' + value.AF_TimeLogId + ' #paramid_' + value.AF_ParamId).text((value.AF_Logs_NumVal) ? value.AF_Logs_NumVal : "-");
            //});
            //}

            //});



        }
    });


}



function save_edit_af_act() {

    var timelogid = $('#Dialog_EditAF .timelogid').val();

    var aflotid = $('#lotid').text();

    var actcode_id = $('#Dialog_EditAF .add_af_actcode_id').text();
    //var wheelid = 0;
    var af_remarks = $('#Dialog_EditAF #af_remarks').text();

    var afcf = $('#Dialog_EditAF #afparam_1585').val();
    var afsulfur = $('#Dialog_EditAF #afparam_1587').val();
    var afcycle = $('#Dialog_EditAF #afparam_1586').val();
    var afweight = $('#Dialog_EditAF #afparam_1584').val();
    var aftemp = $('#Dialog_EditAF #afparam_1588').val();


    var s_date = new Date($('#Dialog_EditAF #start_date_input').val());
    var s_hr = $('#Dialog_EditAF #start_time_hr_input').val();
    var s_min = $('#Dialog_EditAF #start_time_min_input').val();



    var end_date = new Date($('#Dialog_EditAF #end_date_input').val());
    var end_hr = $('#Dialog_EditAF #end_time_hr_input').val();
    var end_min = $('#Dialog_EditAF #end_time_min_input').val();


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
        url: afserverpath + '/AnodeFurnace/save_edit_af_act/',
        data: {

            timelogid: timelogid,
            aflotid: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            //wheelid: wheelid,
            af_remarks: af_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_EditAF').dialog('close');
            var items = [];

            $('#Dialog_EditAF input[id*="afparam_"],#Dialog_EditAF select[id*="afparam_"]').each(function () {
                var attrid_ = $(this).attr('id');
                var id_ = attrid_.replace('afparam_', '');
                var numval_ = $(this).val();

                var aftimelogid = $('#Dialog_EditAF .timelogid').val(data);


                items.push({
                    aflotid: aflotid,
                    aftimelogid: timelogid,
                    afparamid: id_,
                    afnumval: numval_
                });
            });


            if (items.length != 0) {

                //$.ajax({
                //    url: serverpath + '/AnodeFurnace/Delete_aftimelogs/',
                //    data: {

                //        aflotid: aflotid,

                //    },

                //    type: 'POST',
                //    cache: false,
                //    success: function (data) {


                items = JSON.stringify({ 'items': items });

                $.ajax({
                    url: afserverpath + '/AnodeFurnace/Save_TimeLogs',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    data: items,
                    success: function (data) {



                        alert('New Activity now saved.');
                        load_status_aflot($('#lotid').text());
                        load_AF_Act();

                    }

                });
                //}

                //});

                //alert(timelogid);

            } else {

                alert('No changes were made.');

            }



        }
    });

}

function delete_af_act(ActDesc, ActId_) {
    if (end_date_validation()) {

        themsg = 'Are you sure you want to delete the Activity: ' + ActDesc + ' ?';

        var answer = confirm(themsg);

        if (answer) {
            $.ajax({
                url: serverpath + '/AnodeFurnace/delete_precast_act/',
                data: {
                    actid: ActId_
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    load_status_aflot($('#lotid').text());
                    load_AF_Act();

                }
            });
        }
    }
}
function edit_af_act(ActId_) {

    //var converter = $('#cv_num').text();

    if (end_date_validation()) {

        var partialview_link = afserverpath + "/AnodeFurnace/editaf_partial/?actid=" + ActId_;

        $('#Dialog_EditAF').load(partialview_link, function () {
            $(this).dialog('open');
            //alert(converter);
            //
            //load_af_extadata();
            //$('body').css('overflow', 'hidden');
            $("#Dialog_EditAF input.act_add_code_input").focus('focus', function () { $(this).select(); });
        });

        return false;
    }
}
function load_af_extadata(ActId_) {
    //alert('already load!');

    if (end_date_validation()) {

        var partialview_link = afserverpath + "/AnodeFurnace/editaf_extradatapartial/?actid=" + ActId_;


        return false;
    }

}


function searchin_af_act(search_id, tblname) {

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

$('#precasting_tbl tr').live('click', function () {

    $('#precasting_tbl td').css('background-color', '#fafafa');

    $(this).children('td').css('background-color', '#FFFFCC');

});


function load_AF_Act_for_tab(aflotno) {

    $('#blisterprep_tbl td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_AF_Act_fortab/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);

                $('#blisterprep_tbl tr:last').after('<tr><td class="border_color">'
                    + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                    + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                    + value.ActivityCodeName + '</td><td class="border_color">'
                    + value.ActivityDesc + '</td><td class="border_color">'
                    + hr + '.' + min + '</td><td class="border_color">'
                    + value.AF_TimeLog_Remarks + '</td><td id= "pcdel_id" class="select_disable_afact" onclick="delete_precast_act(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;"></td><td  id="afedit_id" class="select_edit_afact"  onclick="edit_precast_act(' + value.AF_TimeLogId + ');return false;"></td></tr>'
                     );
            });
        }
    });
}



function load_PreCast_Act_for_tab() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $('#precasting_tbl td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_PreCast_Act_fortab/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);
                var lastdataflag = 0;
                var tbl_pc = $('#precasting_tbl');




                $('#precasting_tbl tr:last').after('<tr id="' + value.AF_TimeLogId + '"><td class="border_color">'
                        + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                        + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                        + value.ActivityCodeName + '</td><td class="border_color">'
                        + value.ActivityDesc + '</td><td class="border_color">'
                        + hr + '.' + min + '</td><td class="border_color">'
                        + value.AF_TimeLog_Remarks + '</td>'
                        //<td id= "pcinsert_id'+ formatDate(value.AF_StartTimeVal) + '" class="select_disable_AF_act" onclick="insertmid_precast_act(' + value.AF_TimeLogId + ');return false;">Insert</td>
                        + '<td  id= "pcedit_id'
                        + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="edit_precast_act(' + value.AF_TimeLogId + ');return false;">Edit</td><td id="pcdel_id"  class="select_disable_AF_act" onclick="delete_precast_act(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;">Delete</td></tr>'

                    );

            });

            var ids = new Array();
            $('#precasting_tbl tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#precasting_tbl tr[id="' + maxId + '"]').closest('tr').find('td#pcdel_id').css("visibility", "visible");


        }
    });

}


$("#search_pc").keyup(function () {
    _this = this;
    // Show only matching TR, hide rest of them
    $.each($("#precasting_tbl tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).hide();
        else
            $(this).show();
    });
});




$('#precasting_tbl tr').live('click', function () {



    $('#precasting_tbl td').css('background-color', '#fafafa');


    $(this).children('td').css('background-color', '#FFFF99');

});

function insertmid_precast_act(ActId_) {

    if (end_date_validation()) {
        var partialview_link = serverpath + "/AnodeFurnace/insertmid_precast_partial/?actid=" + ActId_;


        $('#Dialog_insert_midprecast').load(partialview_link, function () {

            $(this).dialog('open');

            //$('body').css('overflow', 'hidden');

        });
    }
    return false;
}

function delete_precast_act(ActDesc, ActId_) {

    if (end_date_validation()) {
        themsg = 'Are you sure you want to delete the Activity: ' + ActDesc + ' ?';

        var answer = confirm(themsg);

        if (answer) {
            $.ajax({
                url: serverpath + '/AnodeFurnace/delete_precast_act/',
                data: {
                    actid: ActId_
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    load_status_aflot($('#lotid').text());
                    load_PreCast_Act_for_tab();

                }
            });
        }
    }
}


function edit_precast_act(ActId_) {

    if (end_date_validation()) {
        var partialview_link = serverpath + "/AnodeFurnace/editprecast_partial/?actid=" + ActId_;


        $('#Dialog_editPreCast').load(partialview_link, function () {

            $(this).dialog('open');

            //$('body').css('overflow', 'hidden');


        });
    }
    return false;
}

function save_edit_precast_act() {

    var pc_timelog_Id = $('#pc_timelog_Id').text();

    var aflotid = $('#pc_lotid').text();

    var actcode_id = $('#Dialog_editPreCast .actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#pc_remarks_edit').text();


    var s_date = new Date($('#start_date_input_editpcact').val());
    var s_hr = $('#start_time_hr_input_editpcact').val();
    var s_min = $('#start_time_min_input_editpcact').val();



    var end_date = new Date($('#end_date_input_editpcact').val());
    var end_hr = $('#end_time_hr_input_editpcact').val();
    var end_min = $('#end_time_min_input_editpcact').val();


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
        url: afserverpath + '/AnodeFurnace/save_edit_precast_act/',
        data: {

            pc_timelog_Id: pc_timelog_Id,
            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_editPreCast').dialog('close');

            alert('Data now updated.');
            load_status_aflot($('#lotid').text());
            load_PreCast_Act_for_tab();




        }
    });

}

function save_condemned_mould_precast() {

    var lotno = $('#cfcyclenum_cycledetail').text();
    var aflotid = $('#pc_lotid').text();
    var items = [];


    $('#aflogsheet_condem_mould').find('input[id*="cmw_"].changed,select.changed').each(function () {


        var attrid = $(this).attr('id');
        var strValue = attrid.replace('cmw_', '');
        var params = strValue.split("_");
        var afmouldnum = params[0];
        var afwheelnum = params[1];

        if (afwheelnum == 1) {

            // var customer_ = $('#MC_1593').val();
            var mould_id_ = $(this).closest('tr').find('select.dropdown1').val();
            var cms_reason_id_ = $(this).closest('tr').find('select.dropdown2').val();
            var mould_code_ = $(this).closest('tr').find('td.ss1').text();
            var mould_codeid_ = $(this).closest('tr').find('td.ww1').text();

            var td_id = $(this).closest('tr').find('td.m1').text();


        } else {
            // customer_ = $('#MC_1595').val();
            mould_id_ = $(this).closest('tr').find('select.dropdownb1').val();
            cms_reason_id_ = $(this).closest('tr').find('select.dropdownb2').val();
            var mould_code_ = $(this).closest('tr').find('td.ss2').text();
            var mould_codeid_ = $(this).closest('tr').find('td.ww2').text();


            var td_id = $(this).closest('tr').find('td.m2').text();

        }
        items.push({
            afwheelnum: afwheelnum,
            afmouldnum: afmouldnum,
            aflotid: aflotid,
            //  customer_id: customer_,
            mould_id: mould_id_,
            afreasonid: cms_reason_id_,
            td_id: td_id,
            //unchecked_: unchecked_,
            //unchecked1_: unchecked1_,
            mould_code: mould_code_,
            mould_codeid: mould_codeid_
        });
    });





    if (items.length != 0) {

        //$.ajax({
        //    url: serverpath + '/AnodeFurnace/Delete_condem_mould/',
        //    data: {

        //        aflotid: aflotid,

        //    },
        //    type: 'POST',
        //    cache: false,
        //    success: function (data) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_condemned_mould',

            data: items,

            success: function (data) {

                alert('Changes in replacement/Condemnation now saved.');

                //load saved data
                ddactive_af_casting('AF_PreCasting');
                return false;

            }
        });
        //   }
        // });

    } else {

        // alert('No changes were made.');
    }
}



//----------------------------------------------------------------End of PreCasting JS----------------------------------------------------//

//----------------------------------------------------------Casting JS--------------------------------------------------------------------//


$("#cast1addrow_btn").live('click', function () {
    addcasting_partial();
});

$("#cast1addrow_lnk").live('click', function () {
    addcasting_partial();
});

$("#cast2addrow_btn").live('click', function () {
    addcasting2_partial();
});

$("#cast2addrow_lnk").live('click', function () {
    addcasting2_partial();
});

//$("#launder_btn,#launder_lnk").live('click', function () {
//    addlaunder_partial();
//});

$("#add_casting_ok_btn").live('click', function () {

    var wheelid = $('#Dialog_addcasting #af_cwlist').text();
    var aflotno = $('#cfcyclenum_cycledetail').text();


    if (wheelid == '') {
        alert('Please select Casting Wheel');
    } else {

        addcasting(aflotno, '#Dialog_addcasting');
    }

});

$("#add_casting2_ok_btn").live('click', function () {

    var wheelid = $('#Dialog_addcasting2 #af_cwlist').text();
    var aflotno = $('#cfcyclenum_cycledetail').text();


    if (wheelid == '') {
        alert('Please select Casting Wheel');
    } else {

        addcasting2(aflotno, '#Dialog_addcasting2');
    }

});

$("#insertmid_casting_ok_btn").live('click', function () {

    var wheelid = $('#af_castwlist').val();
    var aflotno = $('#cfcyclenum_cycledetail').text();


    if (wheelid == '') {
        alert('Please select Casting Wheel');
    } else {

        insertmidcasting(aflotno, '#Dialog_insert_midcast');
    }

});

$("#edit_cast_ok_btn").live('click', function () {

    save_edit_casting_act();

});

function addcasting_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    //if (end_date_validation()) {
    var partialview_link1 = afserverpath + "/AnodeFurnace/addcasting_partial?aflotno=" + aflotno;


    $('#Dialog_addcasting').load(partialview_link1, function () {
        $(this).dialog('open');

        //$('body').css('overflow', 'hidden');
    });
    //}
    return false;
}

function addcasting2_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    //if (end_date_validation()) {
    var partialview_link1 = afserverpath + "/AnodeFurnace/addcasting2_partial?aflotno=" + aflotno;


    $('#Dialog_addcasting2').load(partialview_link1, function () {
        $(this).dialog('open');

        //$('body').css('overflow', 'hidden');
    });
    //}
    return false;
}

function edit_casting_act(ActId_) {

    //if (end_date_validation()) {
    var partialview_link = serverpath + "/AnodeFurnace/edit_casting_partial/?actid=" + ActId_;


    $('#Dialog_editcasting').load(partialview_link, function () {

        $(this).dialog('open');

        //$('body').css('overflow', 'hidden');


    });
    //}
    return false;
}

function insertmid_casting_act(actid_, castwheel) {


    if (end_date_validation()) {
        var partialview_link1 = afserverpath + "/AnodeFurnace/insertmid_casting_act?actid=" + actid_;



        $('#Dialog_insert_midcast').load(partialview_link1, function () {
            if (castwheel == 1) {
                $('#af_castwlist').val('1');

            } else if (castwheel == 2) {
                $('#af_castwlist').val('2');
            }

            $(this).dialog('open');

            //$('body').css('overflow', 'hidden');
        });
    }
    return false;
}

function addlaunder_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();


    var partialview_link1 = afserverpath + "/AnodeFurnace/addlaunder_partial"

    $('#Dialog_addlaunder').load(partialview_link1, function () {
        $(this).dialog('open');

        //$('body').css('overflow', 'hidden');
    });

    return false;
}


function addmould_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();



    var partialview_link1 = afserverpath + "/AnodeFurnace/addmould_partial"


    $('#Dialog_mouldmain').load(partialview_link1, function () {
        $(this).dialog('open');

        //$('body').css('overflow', 'hidden');

    });
}


//start time js for add casting form
$(document).on('change', '#start_time_hr_input_cast,#start_time_min_input_cast,#start_date_input_cast', function () {

    validation_perbtn_casting();

});

//end time js for add casting form
$(document).on('change', '#end_time_hr_input_cast,#end_time_min_input_cast,#end_date_input_cast', function () {

    validation_perbtn_casting();

});

//onkeyup input add activity code
$('#Dialog_addcasting .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_addcasting');

});


//start time js for add casting2 form
$(document).on('change', '#start_time_hr_input_cast,#start_time_min_input_cast,#start_date_input_cast2', function () {

    validation_perbtn_casting2();

});

//end time js for add casting2 form
$(document).on('change', '#end_time_hr_input_cast,#end_time_min_input_cast,#end_date_input_cast2', function () {

    validation_perbtn_casting2();

});

//onkeyup input add activity code
$('#Dialog_addcasting2 .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_addcasting2');

});





//start time js for edit casting form
$(document).on('change', '#start_time_hr_input_edit_cast,#start_time_min_input_edit_cast,#start_date_input_edit_cast', function () {

    validation_perbtn_cast_for_edit();

});

//end time js for edit casting form
$(document).on('change', '#end_time_hr_input_edit_cast,#end_time_min_input_edit_cast,#end_date_input_edit_cast', function () {

    validation_perbtn_cast_for_edit();

});

//onkeyup input edit activity code
$('#Dialog_editcasting .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_editcasting');

});


//start time js for insertmid casting form
$(document).on('change', '#start_time_hr_input_cast,#start_time_min_input_cast,#start_date_input_cast', function () {

    validation_perbtn_insertmidcasting();

});

//end time js for insertmid casting form
$(document).on('change', '#end_time_hr_input_cast,#end_time_min_input_cast,#end_date_input_cast', function () {

    validation_perbtn_insertmidcasting();
});

//onkeyup input add activity code
$('#Dialog_insert_midcast .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_insert_midcast');

});

$(document).on('change', '#af_cwlist', function () {

    var cw_val = $(this).val();
    check_stime_casting(cw_val);

});




function validation_perbtn_casting(codeid) {

    var duration_time = $('#Dialog_addcasting #the_dur').text();
    var wheelid = $('#af_cwlist').text();

    var s_date = new Date($('#Dialog_addcasting #start_date_input_cast').val());
    var s_hr = $('#Dialog_addcasting #start_time_hr_input_cast').val();
    var s_min = $('#Dialog_addcasting #start_time_min_input_cast').val();



    var e_date = new Date($('#Dialog_addcasting #end_date_input_cast').val());
    var end_hr = $('#Dialog_addcasting #end_time_hr_input_cast').val();
    var end_min = $('#Dialog_addcasting #end_time_min_input_cast').val();



    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {

        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }


    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_addcasting #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_addcasting .act_add_code_input').val();
    var actduration_msg = $('#Dialog_addcasting #the_dur').text();

    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_addcasting .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_addcasting #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_addcasting #add_casting_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0 || the_dur == "ERROR") {
        $('#Dialog_addcasting #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_addcasting #the_dur').text('ERROR');
        $('#Dialog_addcasting #add_casting_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_addcasting #error_msg_time_pc').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_addcasting #the_dur').text('ERROR');
        $('#Dialog_addcasting #add_casting_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_addcasting #error_code').html("");
        $('#Dialog_addcasting .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_addcasting #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_addcasting #the_dur').text(the_dur);
        $('#Dialog_addcasting #add_casting_ok_btn').attr('disabled', false);
    }

}

function validation_perbtn_casting2(codeid) {

    var duration_time = $('#Dialog_addcasting2 #the_dur').text();
    var wheelid = $('#af_cwlist').text();

    var s_date = new Date($('#Dialog_addcasting2 #start_date_input_cast2').val());
    var s_hr = $('#Dialog_addcasting2 #start_time_hr_input_cast').val();
    var s_min = $('#Dialog_addcasting2 #start_time_min_input_cast').val();



    var e_date = new Date($('#Dialog_addcasting2 #end_date_input_cast2').val());
    var end_hr = $('#Dialog_addcasting2 #end_time_hr_input_cast').val();
    var end_min = $('#Dialog_addcasting2 #end_time_min_input_cast').val();

    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {

        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00

        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }


    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_addcasting2 #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_addcasting2 .act_add_code_input').val();
    var actduration_msg = $('#Dialog_addcasting2 #the_dur').text();

    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_addcasting2 .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_addcasting2 #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_addcasting2 #add_casting2_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0 || the_dur == "ERROR") {
        $('#Dialog_addcasting2 #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_addcasting2 #the_dur').text('ERROR');
        $('#Dialog_addcasting2 #add_casting2_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_addcasting2 #error_msg_time_pc').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_addcasting2 #the_dur').text('ERROR');
        $('#Dialog_addcasting2 #add_casting2_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_addcasting2 #error_code').html("");
        $('#Dialog_addcasting2 .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_addcasting2 #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_addcasting2 #the_dur').text(the_dur);
        $('#Dialog_addcasting2 #add_casting2_ok_btn').attr('disabled', false);
    }

}

function validation_perbtn_insertmidcasting(codeid) {

    var duration_time = $('#Dialog_insert_midcast #the_dur').text();
    var wheelid = $('#af_cwlist').text();

    var s_date = new Date($('#Dialog_insert_midcast #start_date_input_cast').val());
    var s_hr = $('#Dialog_insert_midcast #start_time_hr_input_cast').val();
    var s_min = $('#Dialog_insert_midcast #start_time_min_input_cast').val();



    var e_date = new Date($('#Dialog_insert_midcast #end_date_input_cast').val());
    var end_hr = $('#Dialog_insert_midcast #end_time_hr_input_cast').val();
    var end_min = $('#Dialog_insert_midcast #end_time_min_input_cast').val();




    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_insert_midcast #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_insert_midcast .act_add_code_input').val();
    var actduration_msg = $('#Dialog_insert_midcast #the_dur').text();

    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_insert_midcast .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_insert_midcast #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_insert_midcast #insertmid_casting_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0 || the_dur == "ERROR") {
        $('#Dialog_insert_midcast #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_insert_midcast #the_dur').text('ERROR');
        $('#Dialog_insert_midcast #insertmid_casting_ok_btn').attr('disabled', true);


    } else {
        $('#Dialog_insert_midcast #error_code').html("");
        $('#Dialog_insert_midcast .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_insert_midcast #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_insert_midcast #the_dur').text(the_dur);
        $('#Dialog_insert_midcast #insertmid_casting_ok_btn').attr('disabled', false);
    }

}


function validation_perbtn_cast_for_edit() {

    var duration_time = $('Dialog_editcasting #the_dur1').text();

    var edit_s_date = new Date($('#start_date_input_edit_cast').val());
    var s_hr = $('#start_time_hr_input_edit_cast').val();
    var s_min = $('#start_time_min_input_edit_cast').val();



    var edit_e_date = new Date($('#end_date_input_edit_cast').val());
    var end_hr = $('#end_time_hr_input_edit_cast').val();
    var end_min = $('#end_time_min_input_edit_cast').val();

    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {

        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }

    edit_start_date = edit_s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    edit_end_date = edit_e_date.add({
        minutes: end_min,
        hours: end_hr
    });


    var dur1 = Math.floor((edit_end_date - edit_start_date) / 60000);
    var h1 = Math.floor(dur1 / 60);
    var m1 = dur1 % 60;
    var the_dur1 = (h1 + '.' + m1);



    var actcodedesc_msg = $('#Dialog_editcasting #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_editcasting .act_add_code_input').val();
    var actduration_msg = $('#Dialog_editcasting #the_dur1').text();

    if (actcodedesc_msg == 'Invalid Code.' || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.') {

        $('#Dialog_editcasting .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_editcasting #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_editcasting #edit_cast_ok_btn').attr('disabled', true);

    } else if (the_dur1 == 0 || edit_end_date <= edit_start_date || edit_start_date >= edit_end_date) {
        $('#Dialog_editcasting #error_msg_time_pc_edit').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');

        $('#Dialog_editcasting #the_dur1').text('ERROR');
        $('#Dialog_editcasting #edit_cast_ok_btn').attr('disabled', true);

    } else if (edit_start_date < lot_date) {
        $('#Dialog_editcasting #error_msg_time_pc_edit').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_editcasting #the_dur1').text('ERROR');
        $('#Dialog_editcasting #edit_cast_ok_btn').attr('disabled', true);


    } else {
        $('#Dialog_editcasting #error_code').html("");
        $('#Dialog_editcasting .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_editcasting #error_msg_time_pc_edit').html('Correct: <b>Time</b> is Good.');

        $('#Dialog_editcasting #the_dur1').text(the_dur1);
        $('#Dialog_editcasting #edit_cast_ok_btn').attr('disabled', false);

    }

}

function addcasting(aflotno) {


    var actcode_id = $('#Dialog_addcasting .add_pc_actcode_id').text();
    var wheelid = $('#af_cwlist').text();
    var cast_remarks = $('#cast_remarks').text();


    var s_date = new Date($('#start_date_input_cast').val());
    var s_hr = $('#start_time_hr_input_cast').val();
    var s_min = $('#start_time_min_input_cast').val();



    var end_date = new Date($('#end_date_input_cast').val());
    var end_hr = $('#end_time_hr_input_cast').val();
    var end_min = $('#end_time_min_input_cast').val();


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
        url: afserverpath + '/AnodeFurnace/add_casting_act/',
        data: {

            aflotno_: aflotno,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            cast_remarks: cast_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_addcasting').dialog('close');

            alert('Data now added.');
            load_status_aflot($('#lotid').text());
            load_cast_Act_cw1();
            load_cast_Act_cw2();
            afcasting_tbl2new_load();
            afcasting_tblnew_load();



        }
    });
}

function addcasting2(aflotno) {


    var actcode_id = $('#Dialog_addcasting2 .add_pc_actcode_id').text();
    var wheelid = $('#Dialog_addcasting2 #af_cwlist').text();
    var cast_remarks = $('#Dialog_addcasting2 #cast_remarks').text();


    var s_date = new Date($('#Dialog_addcasting2 #start_date_input_cast2').val());
    var s_hr = $('#Dialog_addcasting2 #start_time_hr_input_cast').val();
    var s_min = $('#Dialog_addcasting2 #start_time_min_input_cast').val();



    var end_date = new Date($('#Dialog_addcasting2 #end_date_input_cast2').val());
    var end_hr = $('#Dialog_addcasting2 #end_time_hr_input_cast').val();
    var end_min = $('#Dialog_addcasting2 #end_time_min_input_cast').val();


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
        url: afserverpath + '/AnodeFurnace/add_casting_act/',
        data: {

            aflotno_: aflotno,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            cast_remarks: cast_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_addcasting2').dialog('close');

            alert('Data now added.');
            load_status_aflot($('#lotid').text());
            load_cast_Act_cw1();
            load_cast_Act_cw2();
            afcasting_tbl2new_load();
            afcasting_tblnew_load();



        }
    });
}

function insertmidcasting(aflotno) {


    var actcode_id = $('#Dialog_insert_midcast .add_pc_actcode_id').text();
    var wheelid = $('#Dialog_insert_midcast #af_castwlist').val();
    var cast_remarks = $('#Dialog_insert_midcast #cast_remarks').text();


    var s_date = new Date($('#Dialog_insert_midcast #start_date_input_cast').val());
    var s_hr = $('#Dialog_insert_midcast #start_time_hr_input_cast').val();
    var s_min = $('#Dialog_insert_midcast #start_time_min_input_cast').val();



    var end_date = new Date($('#Dialog_insert_midcast #end_date_input_cast').val());
    var end_hr = $('#Dialog_insert_midcast #end_time_hr_input_cast').val();
    var end_min = $('#Dialog_insert_midcast #end_time_min_input_cast').val();


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
        url: afserverpath + '/AnodeFurnace/add_casting_act/',
        data: {

            aflotno_: aflotno,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            cast_remarks: cast_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_insert_midcast').dialog('close');

            alert('Data now added.');

            load_cast_Act_cw1();
            load_cast_Act_cw2();



        }
    });
}

function save_edit_casting_act() {

    var pc_timelog_Id = $('#pc_timelog_Id').text();
    var castingwheelId = $('#castingwheelId').text();
    var aflotid = $('#casting_lotid').text();

    var actcode_id = $('#Dialog_editcasting .actcode_id').text();
    var pc_remarks = $('#Dialog_editcasting #pc_remarks_edit').text();


    var s_date = new Date($('#start_date_input_edit_cast').val());
    var s_hr = $('#start_time_hr_input_edit_cast').val();
    var s_min = $('#start_time_min_input_edit_cast').val();



    var end_date = new Date($('#end_date_input_edit_cast').val());
    var end_hr = $('#end_time_hr_input_edit_cast').val();
    var end_min = $('#end_time_min_input_edit_cast').val();


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
        url: afserverpath + '/AnodeFurnace/save_edit_casting_act/',
        data: {

            pc_timelog_Id: pc_timelog_Id,
            aflotid_: aflotid,
            castingwheelId: castingwheelId,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_editcasting').dialog('close');

            alert('Data now updated.');
            load_status_aflot($('#lotid').text());
            load_cast_Act_cw1();
            load_cast_Act_cw2();
            afcasting_tbl2new_load();
            afcasting_tblnew_load();
            $("#ckb_all").removeAttr("checked");

        }
    });

}

function delete_casting_act(ActDesc, ActId_) {

    //if (end_date_validation()) {
    themsg = 'Are you sure you want to delete the Activity: ' + ActDesc + ' ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/AnodeFurnace/delete_casting_act/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                load_status_aflot($('#lotid').text());
                load_cast_Act_cw1();
                load_cast_Act_cw2();
                afcasting_tbl2new_load();
                afcasting_tblnew_load();
            }
        });
    }
    //}
}


function load_cast_Act_cw1() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $('#aftable_cast1 td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_cast_Act_cw1/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                check_disabled_cast1(value.AF_TimeLogId);

                var aflotid = $('#casting_lotid').text(value.AF_LotId);

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);


                $('#aftable_cast1 tr:last').after('<tr id="' + value.AF_TimeLogId + '"><td class="border_color">'
                    + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                    + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                    + value.ActivityCodeName + '</td><td class="border_color">'
                    + value.ActivityDesc + '</td><td class="border_color">'
                    + hr + '.' + min + '</td><td class="border_color">'
                    + value.AF_TimeLog_Remarks + '</td>'
                    //<td  id= "castinsert_id'+ formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="insertmid_casting_act(\'' + value.AF_TimeLogId + '\',' + value.CastingWheelId + ');return false;">Insert</td>
                    //+ '<td class="border_color" id= "pcedit_id' + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="copy_casting_act(' + value.AF_TimeLogId + ');return false;"><u>Copy</u></td>'
                    + '<td class="border_color"  id= "pcedit_id'
                    + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="edit_casting_act(' + value.AF_TimeLogId + ');return false;"><u>Edit</u></td><td id="castdel_id" style="visibility:hidden;border: 1px solid #e1e1e1;" class="select_disable_AF_act" onclick="delete_casting_act(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;"><u>Delete</u></td>'
                    + '<td class="border_color" style="vertical-align:middle;padding-top:1px;padding-left:5px;"><input id="ckbcopy" name="datarowcheck_' + value.AF_TimeLogId + '" type="checkbox"  onchange="check_prop(' + value.AF_TimeLogId + ')"/></td></tr>'
                     );
                //onclick = "ck_copy_casting_act('+value.AF_TimeLogId+')"
                //paginate('precasting_tbl', 20);
            });

            var ids = new Array();
            $('#aftable_cast1 tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#aftable_cast1 tr[id="' + maxId + '"]').closest('tr').find('td#castdel_id').css("visibility", "visible");


        }
    });

    // return false;
}


function load_cast_Act_cw2() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $('#aftable_cast2 td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_cast_Act_cw2/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                check_disabled_cast2(value.AF_TimeLogId);

                var aflotid = $('#casting_lotid').text(value.AF_LotId);

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);

                $('#aftable_cast2 tr:last').after('<tr id="' + value.AF_TimeLogId + '"><td class="border_color">'
                    + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                    + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                    + value.ActivityCodeName + '</td><td class="border_color">'
                    + value.ActivityDesc + '</td><td class="border_color">'
                    + hr + '.' + min + '</td><td class="border_color">'
                    + value.AF_TimeLog_Remarks + '</td>'
                   //<td id= "castinsert_id'+ formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="insertmid_casting_act(\'' + value.AF_TimeLogId + '\',' + value.CastingWheelId + ');return false;">Insert</td>
                    + '<td  id= "pcedit_id'
                    + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="edit_casting_act(' + value.AF_TimeLogId + ');return false;">Edit</td><td  id= "cast2del_id" style="visibility:hidden;" class="select_disable_AF_act" onclick="delete_casting_act(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;">Delete</td></tr>'
                      );
                //paginate('precasting_tbl', 20);   
            });

            var ids = new Array();
            $('#aftable_cast2 tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#aftable_cast2 tr[id="' + maxId + '"]').closest('tr').find('td#cast2del_id').css("visibility", "visible");

        }
    });

    //return false;
}


function ddactive_af_casting(partialv_name) {

    // lotno = $('#cfcyclenum_cycledetail').text();
    //?actid=" + actid_;

    $.ajax({
        type: "POST",
        url: serverpath + '/AnodeFurnace/load_condemned_reason/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel2').html(result);
        }
    });
}

function save_condemned_mould_change() {

    var lotno = $('#cfcyclenum_cycledetail').text();
    var aflotid = $('#casting_lotid').text();
    var items = [];


    $('#aflogsheet_condem_mould').find('input[id*="cmw_"].changed,select.changed').each(function () {


        var attrid = $(this).attr('id');
        var strValue = attrid.replace('cmw_', '');
        var params = strValue.split("_");
        var afmouldnum = params[0];
        var afwheelnum = params[1];

        if (afwheelnum == 1) {

            // var customer_ = $('#MC_1593').val();
            var mould_id_ = $(this).closest('tr').find('select.dropdown1').val();
            var cms_reason_id_ = $(this).closest('tr').find('select.dropdown2').val();
            var mould_code_ = $(this).closest('tr').find('td.ss1').text();
            var mould_codeid_ = $(this).closest('tr').find('td.ww1').text();

            var td_id = $(this).closest('tr').find('td.m1').text();


        } else {
            // customer_ = $('#MC_1595').val();
            mould_id_ = $(this).closest('tr').find('select.dropdownb1').val();
            cms_reason_id_ = $(this).closest('tr').find('select.dropdownb2').val();
            var mould_code_ = $(this).closest('tr').find('td.ss2').text();
            var mould_codeid_ = $(this).closest('tr').find('td.ww2').text();


            var td_id = $(this).closest('tr').find('td.m2').text();

        }
        items.push({
            afwheelnum: afwheelnum,
            afmouldnum: afmouldnum,
            aflotid: aflotid,
            //  customer_id: customer_,
            mould_id: mould_id_,
            afreasonid: cms_reason_id_,
            td_id: td_id,
            //unchecked_: unchecked_,
            //unchecked1_: unchecked1_,
            mould_code: mould_code_,
            mould_codeid: mould_codeid_
        });
    });





    if (items.length != 0) {

        //$.ajax({
        //    url: serverpath + '/AnodeFurnace/Delete_condem_mould/',
        //    data: {

        //        aflotid: aflotid,

        //    },
        //    type: 'POST',
        //    cache: false,
        //    success: function (data) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_condemned_mould',

            data: items,

            success: function (data) {

                alert('Changes in replacement/Condemnation now saved.');

                //load saved data
                ddactive_af_casting('AF_CastingOperations');
                return false;

            }
        });
        //   }
        // });

    } else {

        // alert('No changes were made.');
    }
}


function mould_customer_change(_val, output_id) {


    $('#' + output_id).empty();
    $('#' + output_id).append("<option value = '0'>--Select--</option>");

    $.ajax({
        url: serverpath + '/AnodeFurnace/selected_cust_div/',

        data: {
            cust_val: _val
        },

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#' + output_id).append("<option value = " + value.AF_MouldId + ">" + value.AF_MouldCode + "</option>");
                $('#' + output_id).focus();

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#" + output_id + " > option").each(function () {
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


function count_cust_mouldrep1() {

    var lotno = $('#cfcyclenum_cycledetail').text();

    $('#count1_cust').empty();
    //$('#' + output_id).append("<option value = '0'>--Select--</option>");

    $.ajax({
        url: serverpath + '/AnodeFurnace/count_cust_mouldrep1/',

        data: {
            lotno: lotno
        },

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#count1_cust').append("<option value = " + value.AF_CustomerId + ">" + value.AF_CustomerName + "</option>");
                $('#count1_cust').focus();

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#count1_cust > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });

            if ($("#count1_cust:last option").length <= 0) {

                save_condemned_mould_change();

            } else {

                $("#count1_cust option").map(function () {

                    var find_list = $(this).val();

                    $('#aflogsheet_condem_mould').find('select.changed.scust,select.dropdown2.changed,select.dropdown1.changed').each(function () {


                        var counted = $("#count1_cust:last option").length;
                        var slct = $(this).val();
                        var y;

                        if (find_list == slct && counted == 2) {

                            //  y = true;
                            save_condemned_mould_change();
                            return false;
                        } else if (counted == 1) {

                            save_condemned_mould_change();
                            //   y = true;
                            return false;

                        } else if (counted == 0) {

                            // y = true;
                            save_condemned_mould_change();
                            return false;

                        } else {

                            y = false;
                            $('#cust_vald').css({ 'visibility': 'visible' });
                            $("#cust_vald").toggle(900).fadeOut();
                            //alert('Only two(2) customers per Casting Wheel.');
                            return false;

                        }


                        // return y;

                    });
                });
            }
        }
    });
}


function count_cust_mouldrep2() {

    var lotno = $('#cfcyclenum_cycledetail').text();

    $('#count2_cust').empty();
    //$('#' + output_id).append("<option value = '0'>--Select--</option>");

    $.ajax({
        url: serverpath + '/AnodeFurnace/count_cust_mouldrep2/',

        data: {
            lotno: lotno
        },

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#count2_cust').append("<option value = " + value.AF_CustomerId + ">" + value.AF_CustomerName + "</option>");
                $('#count2_cust').focus();

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#count2_cust > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });



            if ($("#count2_cust:last option").length <= 0) {

                save_condemned_mould_change();

            } else {

                $("#count2_cust option").map(function () {

                    var find_list = $(this).val();

                    $('#aflogsheet_condem_mould').find('select.changed.scust,select.dropdownb2.changed,select.dropdownb1.changed').each(function () {


                        var counted = $("#count2_cust:last option").length;
                        var slct = $(this).val();
                        var y;

                        if (find_list == slct && counted == 2) {

                            // y = true;
                            save_condemned_mould_change();

                            return false;
                        } else if (counted == 1) {

                            save_condemned_mould_change();

                            // y = true;                     
                            return false;

                        } else if (counted == 0) {

                            // y = true;
                            save_condemned_mould_change();

                            return false;

                        } else {

                            // y = false;kk
                            $('#cust_vald').css({ 'visibility': 'visible' });
                            $("#cust_vald").toggle(900).fadeOut();
                            //alert('Only two(2) customers per Casting Wheel.');
                            return false;

                        }

                        //return y;

                    });
                });

            }

        }
    });
}


function count_cust_mouldrep1_pc() {

    var lotno = $('#cfcyclenum_cycledetail').text();

    $('#count1_cust').empty();
    //$('#' + output_id).append("<option value = '0'>--Select--</option>");

    $.ajax({
        url: serverpath + '/AnodeFurnace/count_cust_mouldrep1/',

        data: {
            lotno: lotno
        },

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#count1_cust').append("<option value = " + value.AF_CustomerId + ">" + value.AF_CustomerName + "</option>");
                $('#count1_cust').focus();

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#count1_cust > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });

            if ($("#count1_cust:last option").length <= 0) {

                save_condemned_mould_precast();

            } else {

                $("#count1_cust option").map(function () {

                    var find_list = $(this).val();

                    $('#aflogsheet_condem_mould').find('select.changed.scust,select.dropdown2.changed,select.dropdown1.changed').each(function () {


                        var counted = $("#count1_cust:last option").length;
                        var slct = $(this).val();
                        var y;

                        if (find_list == slct && counted == 2) {

                            //  y = true;
                            save_condemned_mould_precast();
                            return false;
                        } else if (counted == 1) {

                            save_condemned_mould_precast();
                            //   y = true;
                            return false;

                        } else if (counted == 0) {

                            // y = true;
                            save_condemned_mould_precast();
                            return false;

                        } else {

                            y = false;
                            $('#cust_vald').css({ 'visibility': 'visible' });
                            $("#cust_vald").toggle(900).fadeOut();
                            //alert('Only two(2) customers per Casting Wheel.');
                            return false;

                        }


                        // return y;

                    });
                });
            }
        }
    });
}


function count_cust_mouldrep2_pc() {

    var lotno = $('#cfcyclenum_cycledetail').text();

    $('#count2_cust').empty();
    //$('#' + output_id).append("<option value = '0'>--Select--</option>");

    $.ajax({
        url: serverpath + '/AnodeFurnace/count_cust_mouldrep2/',

        data: {
            lotno: lotno
        },

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#count2_cust').append("<option value = " + value.AF_CustomerId + ">" + value.AF_CustomerName + "</option>");
                $('#count2_cust').focus();

                //remove duplicate data in selectbox
                var usedNames = {};
                $("#count2_cust > option").each(function () {
                    if (usedNames[this.value]) {
                        $(this).remove();
                    } else {
                        usedNames[this.value] = this.text;
                    }
                });

            });



            if ($("#count2_cust:last option").length <= 0) {

                save_condemned_mould_precast();

            } else {

                $("#count2_cust option").map(function () {

                    var find_list = $(this).val();

                    $('#aflogsheet_condem_mould').find('select.changed.scust,select.dropdownb2.changed,select.dropdownb1.changed').each(function () {


                        var counted = $("#count2_cust:last option").length;
                        var slct = $(this).val();
                        var y;

                        if (find_list == slct && counted == 2) {

                            // y = true;
                            save_condemned_mould_precast();

                            return false;
                        } else if (counted == 1) {

                            save_condemned_mould_precast();

                            // y = true;                     
                            return false;

                        } else if (counted == 0) {

                            // y = true;
                            save_condemned_mould_precast();

                            return false;

                        } else {

                            // y = false;kk
                            $('#cust_vald').css({ 'visibility': 'visible' });
                            $("#cust_vald").toggle(900).fadeOut();
                            //alert('Only two(2) customers per Casting Wheel.');
                            return false;

                        }

                        //return y;

                    });
                });

            }

        }
    });
}


function delete_mouldcodeid($thisval, typ) {

    var lotno = $('#cfcyclenum_cycledetail').text();

    themsg = 'Are you sure you want to delete the: ' + $thisval + ' ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/AnodeFurnace/delete_mouldcodeid/',
            data: {
                thisval: $thisval,
                lotno: lotno
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                if (typ == 2) {
                    ddactive_af_casting('AF_PreCasting'); return false;
                } else if (typ == 3) {
                    ddactive_af_casting('AF_CastingOperations'); return false;
                }
            }
        });
    }
}



function load_mould_save() {

    var lotid = $('#l_list').val();
    var custid = $('#c_list').val();

    var cust = $("#c_list option:selected").text();
    cust = cust.replace(/\s/g, '');
    var lot = $("#l_list option:selected").text();

    var mcode = cust + '-' + lot;



    $('#table_mould td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_mould_save/',

        data: {
            lotid: lotid,
            custid: custid,
            mcode: mcode
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var strval = value.AF_MouldCode;
                var params = strval.split("-");
                var lastcode = params[2];


                $('#table_mould tr:last').after('<tr id=' + lastcode + '><td class="border_color" id=mcode_>'
                    + value.AF_MouldCode + '</td><td class="border_color" id="mstat_">'
                    + value.AF_Status + '</td>'
                    + '<td class="border_color" id="m_id_' + value.AF_MouldId + '" onclick="mould_modification(' + value.AF_MouldId + ');return false;">Edit</td>'
                    + '<td class="border_color" onclick="delete_mould(\'' + value.AF_Status + '\',' + value.AF_MouldId + ');return false;">Delete</td>'
                      );

                //paginate('precasting_tbl', 20);   

                //remove duplicate data
                var seen = {};
                $('#table_mould tr').each(function () {
                    var txt = $(this).text();
                    if (seen[txt])
                        $(this).remove();
                    else
                        seen[txt] = true;
                });

            });

            var ids = new Array();
            $('#table_mould tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });

            var maxId = Math.max.apply(null, ids);
            var mouldcode;

            if (isNaN(maxId)) {
                mouldcode = mcode + '-' + "01";
            }
            else if (maxId <= 9) {
                mouldcode = mcode + '-' + '0' + (maxId + 1);
            }
            else {
                mouldcode = mcode + '-' + (maxId + 1);
            }

            $('#moldcode').text(mouldcode);

        }
    });

    //return false;
}


function save_mould() {

    var lotid = $('#l_list').val();
    var custid = $('#c_list').val();

    var mcode = $('#moldcode').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_mould',
        data: {

            lotid: lotid,
            custid: custid,
            mcode: mcode
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Data now saved.');

            //load saved data
            ddactive_af_casting('AF_PreCasting'); return false;
            //load_mould_save();
            //addmould_partial();
        }
    });

}

function load_condemned_mould() {

    var aflotno_ = $('#cfcyclenum_cycledetail').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_condemned_mould/',
        data: {
            aflotno: aflotno_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {


                if (value.AF_MouldPosition == 1 && value.AF_CastingWheel == 1) {
                    $("#cmw_1_1").prop('checked', true);
                    // $("#cmw_1_1_1").val(value.AF_MouldId);
                    $("#cmw_1_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    // $("#cmw_1_1").addClass('changed');
                    $('.tdid1_1').text(value.AF_MouldReplacementId);
                    $('#cmw_1_1_S').text(value.AF_MouldCode);
                    $('#cmw_1_1_S').text(value.AF_MouldCode);
                    $('#cmw_1_1_SS').text(value.AF_MouldId);

                }
                if (value.AF_MouldPosition == 1 && value.AF_CastingWheel == 2) {
                    $("#cmw_1_2").prop('checked', true);
                    // $("#cmw_1_2_2").val(value.AF_MouldId);
                    $("#cmw_1_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_1_2").addClass('changed');
                    $('.tdid1_2').text(value.AF_MouldReplacementId);
                    $('#cmw_1_2_S').text(value.AF_MouldCode);
                    $('#cmw_1_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 2 && value.AF_CastingWheel == 1) {
                    $("#cmw_2_1").prop('checked', true);
                    //  $("#cmw_2_1_1").val(value.AF_MouldId);
                    $("#cmw_2_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_2_1").addClass('changed');
                    $('.tdid2_1').text(value.AF_MouldReplacementId);
                    $('#cmw_2_1_S').text(value.AF_MouldCode);
                    $('#cmw_2_1_SS').text(value.AF_MouldId);

                } if (value.AF_MouldPosition == 2 && value.AF_CastingWheel == 2) {
                    $("#cmw_2_2").prop('checked', true);
                    //  $("#cmw_2_2_2").val(value.AF_MouldId);
                    $("#cmw_2_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_2_2").addClass('changed');
                    $('.tdid2_2').text(value.AF_MouldReplacementId);
                    $('#cmw_2_2_S').text(value.AF_MouldCode);
                    $('#cmw_2_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 3 && value.AF_CastingWheel == 1) {
                    $("#cmw_3_1").prop('checked', true);
                    //   $("#cmw_3_1_1").val(value.AF_MouldId);
                    $("#cmw_3_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    // $("#cmw_3_1").addClass('changed');
                    $('.tdid3_1').text(value.AF_MouldReplacementId);
                    $('#cmw_3_1_S').text(value.AF_MouldCode);
                    $('#cmw_3_1_SS').text(value.AF_MouldId);

                } if (value.AF_MouldPosition == 3 && value.AF_CastingWheel == 2) {
                    $("#cmw_3_2").prop('checked', true);
                    //  $("#cmw_3_2_2").val(value.AF_MouldId);
                    $("#cmw_3_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    // $("#cmw_3_2").addClass('changed');
                    $('.tdid3_2').text(value.AF_MouldReplacementId);
                    $('#cmw_3_2_S').text(value.AF_MouldCode);
                    $('#cmw_3_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 4 && value.AF_CastingWheel == 1) {
                    $("#cmw_4_1").prop('checked', true);
                    //  $("#cmw_4_1_1").val(value.AF_MouldId);
                    $("#cmw_4_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_4_1").addClass('changed');
                    $('.tdid4_1').text(value.AF_MouldReplacementId);
                    $('#cmw_4_1_S').text(value.AF_MouldCode);
                    $('#cmw_4_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 4 && value.AF_CastingWheel == 2) {
                    $("#cmw_4_2").prop('checked', true);
                    //   $("#cmw_4_2_2").val(value.AF_MouldId);
                    $("#cmw_4_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_4_2").addClass('changed');
                    $('.tdid4_2').text(value.AF_MouldReplacementId);
                    $('#cmw_4_2_S').text(value.AF_MouldCode);
                    $('#cmw_4_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 5 && value.AF_CastingWheel == 1) {
                    $("#cmw_5_1").prop('checked', true);
                    //  $("#cmw_5_1_1").val(value.AF_MouldId);
                    $("#cmw_5_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_5_1").addClass('changed');
                    $('.tdid5_1').text(value.AF_MouldReplacementId);
                    $('#cmw_5_1_S').text(value.AF_MouldCode);
                    $('#cmw_5_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 5 && value.AF_CastingWheel == 2) {
                    $("#cmw_5_2").prop('checked', true);
                    //  $("#cmw_5_2_2").val(value.AF_MouldId);
                    $("#cmw_5_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_5_2").addClass('changed');
                    $('.tdid5_2').text(value.AF_MouldReplacementId);
                    $('#cmw_5_2_S').text(value.AF_MouldCode);
                    $('#cmw_5_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 6 && value.AF_CastingWheel == 1) {
                    $("#cmw_6_1").prop('checked', true);
                    //    $("#cmw_6_1_1").val(value.AF_MouldId);
                    $("#cmw_6_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_6_1").addClass('changed');
                    $('.tdid6_1').text(value.AF_MouldReplacementId);
                    $('#cmw_6_1_S').text(value.AF_MouldCode);
                    $('#cmw_6_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 6 && value.AF_CastingWheel == 2) {
                    $("#cmw_6_2").prop('checked', true);
                    //   $("#cmw_6_2_2").val(value.AF_MouldId);
                    $("#cmw_6_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_6_2").addClass('changed');
                    $('.tdid6_2').text(value.AF_MouldReplacementId);
                    $('#cmw_6_2_S').text(value.AF_MouldCode);
                    $('#cmw_6_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 7 && value.AF_CastingWheel == 1) {
                    $("#cmw_7_1").prop('checked', true);
                    //  $("#cmw_7_1_1").val(value.AF_MouldId);
                    $("#cmw_7_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_7_1").addClass('changed');
                    $('.tdid7_1').text(value.AF_MouldReplacementId);
                    $('#cmw_7_1_S').text(value.AF_MouldCode);
                    $('#cmw_7_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 7 && value.AF_CastingWheel == 2) {
                    $("#cmw_7_2").prop('checked', true);
                    //    $("#cmw_7_2_2").val(value.AF_MouldId);
                    $("#cmw_7_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_7_2").addClass('changed');
                    $('.tdid7_2').text(value.AF_MouldReplacementId);
                    $('#cmw_7_2_S').text(value.AF_MouldCode);
                    $('#cmw_7_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 8 && value.AF_CastingWheel == 1) {
                    $("#cmw_8_1").prop('checked', true);
                    //   $("#cmw_8_1_1").val(value.AF_MouldId);
                    $("#cmw_8_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_8_1").addClass('changed');
                    $('.tdid8_1').text(value.AF_MouldReplacementId);
                    $('#cmw_8_1_S').text(value.AF_MouldCode);
                    $('#cmw_8_1_SS').text(value.AF_MouldId);

                }
                if (value.AF_MouldPosition == 8 && value.AF_CastingWheel == 2) {
                    $("#cmw_8_2").prop('checked', true);
                    //    $("#cmw_8_2_2").val(value.AF_MouldId);
                    $("#cmw_8_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_8_2").addClass('changed');
                    $('.tdid8_2').text(value.AF_MouldReplacementId);
                    $('#cmw_8_2_S').text(value.AF_MouldCode);
                    $('#cmw_8_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 9 && value.AF_CastingWheel == 1) {
                    $("#cmw_9_1").prop('checked', true);
                    //    $("#cmw_9_1_1").val(value.AF_MouldId);
                    $("#cmw_9_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_9_1").addClass('changed');
                    $('.tdid9_1').text(value.AF_MouldReplacementId);
                    $('#cmw_9_1_S').text(value.AF_MouldCode);
                    $('#cmw_9_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 9 && value.AF_CastingWheel == 2) {
                    $("#cmw_9_2").prop('checked', true);
                    //     $("#cmw_9_2_2").val(value.AF_MouldId);
                    $("#cmw_9_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_9_2").addClass('changed');
                    $('.tdid9_2').text(value.AF_MouldReplacementId);
                    $('#cmw_9_2_S').text(value.AF_MouldCode);
                    $('#cmw_9_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 10 && value.AF_CastingWheel == 1) {
                    $("#cmw_10_1").prop('checked', true);
                    //     $("#cmw_10_1_1").val(value.AF_MouldId);
                    $("#cmw_10_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_10_1").addClass('changed');
                    $('.tdid10_1').text(value.AF_MouldReplacementId);
                    $('#cmw_10_1_S').text(value.AF_MouldCode);
                    $('#cmw_10_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 10 && value.AF_CastingWheel == 2) {
                    $("#cmw_10_2").prop('checked', true);
                    //      $("#cmw_10_2_2").val(value.AF_MouldId);
                    $("#cmw_10_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_10_2").addClass('changed');
                    $('.tdid10_2').text(value.AF_MouldReplacementId);
                    $('#cmw_10_2_S').text(value.AF_MouldCode);
                    $('#cmw_10_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 11 && value.AF_CastingWheel == 1) {
                    $("#cmw_11_1").prop('checked', true);
                    //    $("#cmw_11_1_1").val(value.AF_MouldId);
                    $("#cmw_11_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_11_1").addClass('changed');
                    $('.tdid11_1').text(value.AF_MouldReplacementId);
                    $('#cmw_11_1_S').text(value.AF_MouldCode);
                    $('#cmw_11_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 11 && value.AF_CastingWheel == 2) {
                    $("#cmw_11_2").prop('checked', true);
                    //      $("#cmw_11_2_2").val(value.AF_MouldId);
                    $("#cmw_11_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_11_2").addClass('changed');
                    $('.tdid11_2').text(value.AF_MouldReplacementId);
                    $('#cmw_11_2_S').text(value.AF_MouldCode);
                    $('#cmw_11_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 12 && value.AF_CastingWheel == 1) {
                    $("#cmw_12_1").prop('checked', true);
                    //     $("#cmw_12_1_1").val(value.AF_MouldId);
                    $("#cmw_12_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_12_1").addClass('changed');
                    $('.tdid12_1').text(value.AF_MouldReplacementId);
                    $('#cmw_12_1_S').text(value.AF_MouldCode);
                    $('#cmw_12_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 12 && value.AF_CastingWheel == 2) {
                    $("#cmw_12_2").prop('checked', true);
                    //      $("#cmw_12_2_2").val(value.AF_MouldId);
                    $("#cmw_12_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_12_2").addClass('changed');
                    $('.tdid12_2').text(value.AF_MouldReplacementId);
                    $('#cmw_12_2_S').text(value.AF_MouldCode);
                    $('#cmw_12_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 13 && value.AF_CastingWheel == 1) {
                    $("#cmw_13_1").prop('checked', true);
                    //     $("#cmw_13_1_1").val(value.AF_MouldId);
                    $("#cmw_13_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_13_1").addClass('changed');
                    $('.tdid13_1').text(value.AF_MouldReplacementId);
                    $('#cmw_13_1_S').text(value.AF_MouldCode);
                    $('#cmw_13_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 13 && value.AF_CastingWheel == 2) {
                    $("#cmw_13_2").prop('checked', true);
                    //       $("#cmw_13_2_2").val(value.AF_MouldId);
                    $("#cmw_13_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_13_2").addClass('changed');
                    $('.tdid13_2').text(value.AF_MouldReplacementId);
                    $('#cmw_13_2_S').text(value.AF_MouldCode);
                    $('#cmw_13_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 14 && value.AF_CastingWheel == 1) {
                    $("#cmw_14_1").prop('checked', true);
                    //      $("#cmw_14_1_1").val(value.AF_MouldId);
                    $("#cmw_14_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_14_1").addClass('changed');
                    $('.tdid14_1').text(value.AF_MouldReplacementId);
                    $('#cmw_14_1_S').text(value.AF_MouldCode);
                    $('#cmw_14_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 14 && value.AF_CastingWheel == 2) {
                    $("#cmw_14_2").prop('checked', true);
                    //     $("#cmw_14_2_2").val(value.AF_MouldId);
                    $("#cmw_14_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_14_2").addClass('changed');
                    $('.tdid14_2').text(value.AF_MouldReplacementId);
                    $('#cmw_14_2_S').text(value.AF_MouldCode);
                    $('#cmw_14_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 15 && value.AF_CastingWheel == 1) {
                    $("#cmw_15_1").prop('checked', true);
                    //    $("#cmw_15_1_1").val(value.AF_MouldId);
                    $("#cmw_15_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_15_1").addClass('changed');
                    $('.tdid15_1').text(value.AF_MouldReplacementId);
                    $('#cmw_15_1_S').text(value.AF_MouldCode);
                    $('#cmw_15_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 15 && value.AF_CastingWheel == 2) {
                    $("#cmw_15_2").prop('checked', true);
                    //     $("#cmw_15_2_2").val(value.AF_MouldId);
                    $("#cmw_15_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_15_2").addClass('changed');
                    $('.tdid15_2').text(value.AF_MouldReplacementId);
                    $('#cmw_15_2_S').text(value.AF_MouldCode);
                    $('#cmw_15_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 16 && value.AF_CastingWheel == 1) {
                    $("#cmw_16_1").prop('checked', true);
                    //     $("#cmw_16_1_1").val(value.AF_MouldId);
                    $("#cmw_16_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    // $("#cmw_16_1").addClass('changed');
                    $('.tdid16_1').text(value.AF_MouldReplacementId);
                    $('#cmw_16_1_S').text(value.AF_MouldCode);
                    $('#cmw_16_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 16 && value.AF_CastingWheel == 2) {
                    $("#cmw_16_2").prop('checked', true);
                    //    $("#cmw_16_2_2").val(value.AF_MouldId);
                    $("#cmw_16_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_16_2").addClass('changed');
                    $('.tdid16_2').text(value.AF_MouldReplacementId);
                    $('#cmw_16_2_S').text(value.AF_MouldCode);
                    $('#cmw_16_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 17 && value.AF_CastingWheel == 1) {
                    $("#cmw_17_1").prop('checked', true);
                    //     $("#cmw_17_1_1").val(value.AF_MouldId);
                    $("#cmw_17_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_17_1").addClass('changed');
                    $('.tdid17_1').text(value.AF_MouldReplacementId);
                    $('#cmw_17_1_S').text(value.AF_MouldCode);
                    $('#cmw_17_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 17 && value.AF_CastingWheel == 2) {
                    $("#cmw_17_2").prop('checked', true);
                    //     $("#cmw_17_2_2").val(value.AF_MouldId);
                    $("#cmw_17_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_17_2").addClass('changed');
                    $('.tdid17_2').text(value.AF_MouldReplacementId);
                    $('#cmw_17_2_S').text(value.AF_MouldCode);
                    $('#cmw_17_2_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 18 && value.AF_CastingWheel == 1) {
                    $("#cmw_18_1").prop('checked', true);
                    //      $("#cmw_18_1_1").val(value.AF_MouldId);
                    $("#cmw_18_1_1_1").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_18_1").addClass('changed');
                    $('.tdid18_1').text(value.AF_MouldReplacementId);
                    $('#cmw_18_1_S').text(value.AF_MouldCode);
                    $('#cmw_18_1_SS').text(value.AF_MouldId);
                }
                if (value.AF_MouldPosition == 18 && value.AF_CastingWheel == 2) {
                    $("#cmw_18_2").prop('checked', true);
                    //      $("#cmw_18_2_2").val(value.AF_MouldId);
                    $("#cmw_18_2_2_2").val(value.AF_MouldReplacement_ReasonId);
                    //$("#cmw_18_2").addClass('changed');
                    $('.tdid18_2').text(value.AF_MouldReplacementId);
                    $('#cmw_18_2_S').text(value.AF_MouldCode);
                    $('#cmw_18_2_SS').text(value.AF_MouldId);
                }

                $('input').prop(function () {

                    //$(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('changed');
                    $(this).removeClass('cw2');
                    $(this).removeClass('cw1');

                    if ($(this).prop('checked') == true) {

                        $(this).addClass('changed');

                    } else {

                        $(this).removeClass('changed');
                    }

                });


            });
        }
    });
}


function save_anodecast_percust() {


    var aflotid = $('#casting_lotid').text();
    var items = [];

    $('#anodecust_tbl').find('input.changed,select.changed').each(function () {
        var attrid = $(this).attr('id');
        var paramid_ = attrid.replace('anode-', '');
        var cw = paramid_[0];


        if (cw == 1) {

            var cwid = $('#anode-1-w').text();
            if (attrid == 'anode-1') {
                var custid = $(this).val();
            } else {
                var custid = $(this).closest('tr').find('select#anode-1').val();
            } if (attrid == 'anode-1-1') {
                var cust_total = $(this).val();
            } else {
                var cust_total = $(this).closest('tr').find('input#anode-1-1').val();
            } if (attrid == 'anode-1-1-1') {
                var custid1 = $(this).val();
            } else {
                var custid1 = $(this).closest('tr').find('select#anode-1-1-1').val();

            } if (attrid == 'anode-1-1-1-1') {
                var cust_total1 = $(this).val();
            } else {
                var cust_total1 = $(this).closest('tr').find('input#anode-1-1-1-1').val();
            }

        } else {

            var cwid = $('#anode-2-w').text();
            if (attrid == 'anode-2') {
                var custid = $(this).val();
            } else {
                var custid = $(this).parents('tr').find('select#anode-2').val();
            } if (attrid == 'anode-2-2') {
                var cust_total = $(this).val();
            } else {
                var cust_total = $(this).parents('tr').find('input#anode-2-2').val();
            } if (attrid == 'anode-2-2-2') {
                var custid1 = $(this).val();
            } else {
                var custid1 = $(this).parents('tr').find('select#anode-2-2-2').val();

            } if (attrid == 'anode-2-2-2-2') {
                var cust_total1 = $(this).val();
            } else {
                var cust_total1 = $(this).parents('tr').find('input#anode-2-2-2-2').val();
            }

        }

        items.push({
            aflotid: aflotid,
            cwid: cwid,
            custid: custid,
            custid1: custid1,
            cust_total: cust_total,
            cust_total1: cust_total1
        });
    });


    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/save_anodecast_percust',

        data: items,

        success: function (data) {

            alert('Changes in anode casted per customer was now saved.');

            //load saved data
            load_anodecast_percust();
            ddactive_af_casting('AF_CastingOperations'); return false;
        }
    });


}

function load_anodecast_percust() {

    var lotno_ = $('#cfcyclenum_cycledetail').text();


    $.ajax({
        url: serverpath + '/AnodeFurnace/load_anodecast_percust/',
        data: {
            lotno: lotno_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.AF_CWId == 1) {

                    $('#anode-1').val(value.AF_CustomerId);
                    $('#anode-1-1').val(value.AF_Customer_Total);
                    $('#anode-1-1-1').val(value.AF_CustomerId_Othr);
                    $('#anode-1-1-1-1').val(value.AF_CustomerId_Othr_Total);

                } else {

                    $('#anode-2').val(value.AF_CustomerId);
                    $('#anode-2-2').val(value.AF_Customer_Total);
                    $('#anode-2-2-2').val(value.AF_CustomerId_Othr);
                    $('#anode-2-2-2-2').val(value.AF_CustomerId_Othr_Total);

                }

            });
        }
    });
}


function save_casting_numeric(tbl_name, prefix, msg) {


    var aflotid = $('#casting_lotid').text();
    var items = [];

    $('#' + tbl_name).find('td,th').each(function () {
        $(this).find('input.changed,select.changed').each(function () {
            var attrid = $(this).attr('id');
            var paramid_ = attrid.replace(prefix, '');
            var numval_ = $(this).val();

            items.push({
                aflotid: aflotid,
                paramid: paramid_,
                numval: numval_
            });
        });
    });

    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/save_precast',

        data: items,

        success: function (data) {

            alert('Changes in ' + msg + ' was now saved.');

            //load saved data
            ddactive_af_casting('AF_CastingOperations'); return false;
        }
    });

}


function save_mould_inventory() {

    var lotno_ = $('#cfcyclenum_cycledetail').text();
    var lotid_ = $('#pc_lotid').text();



    var cust_id_ = $('#mi_cust_id').val();
    var mouldcount_ = $('#Mould_count').val();


    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_mould_inventory_af',
        data: {

            lotid: lotid_,
            cust_id: cust_id_,
            mouldcount: mouldcount_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Data now saved.');

            //load saved data
            ddactive_af_casting('AF_PreCasting'); return false;
        }
    });

}


$('#add_launder').live('click', function () {


    $("#launderdiv").hide();
    $('#launder_div_aflogsheet').css('height', '270px');
    $('#launderdiv_in').css('top', '48px');
    save_launder_temp_add();
});


function add_launder_temp() {


    var hr_ = $('#start_time_hr_input_launder').val();
    var min_ = $('#start_time_min_input_launder').val();



    var hr = hr_.toString("H");
    var min = min_.toString("mm");

    if (min <= 9) {

        var minute = '0' + min;
    } else {
        minute = min;
    }

    var stime = hr + ':' + minute;



    $('#tbl_launder tbody').after('<tr class="tr_data"><td style="visibility:hidden;" id="laid" class="border_color"></td><td id="paramdate" class="border_color">' + stime + '</td>'
     + '<td class="border_color">'
     + '<input id="temp_1" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input t1" placeholder="0" /></td>'
     + '<td class="border_color">'
     + '<input id="temp_2" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input t2" placeholder="0" /></td>'

        + '</tr>');

    $('td,input').change(
      function () {
          $(this).addClass('changed');
          $(this).css('background', '#DFD8D1');

      });



}


function save_launder_temp_add() {

    var lotno_ = $('#cfcyclenum_cycledetail').text();
    var lotid_ = $('#casting_lotid').text();

    var hr_ = $('#start_time_hr_input_launder').val();
    var min_ = $('#start_time_min_input_launder').val();



    var hr = hr_.toString("H");
    var min = min_.toString("mm");

    if (min <= 9) {

        var minute = '0' + min;
    } else {
        minute = min;
    }

    var time_ = hr + ':' + minute;

    var items = [];

    $('#tbl_launder_add tr.tr_data').each(function () {

        //var time_ = $(this).find('td[id*="paramdate"]').text();

        $(this).find('input.changed').each(function () {
            var attrid = $(this).attr('id');

            var params = attrid.replace('temp_', '');
            var pasplit = params.split("_");
            var fd = pasplit[0];
            var launderid_ = $(this).closest('tr').find('td#laid').text();


            if (fd == '1') {

                var numval1_ = $(this).val();
                var numval2_ = $(this).closest('tr').next('tr').find('input.t2').val();


            } else {

                var numval2_ = $(this).val();
                var numval1_ = $(this).closest('tr').prev('tr').find('input.t1').val();


            }

            items.push({
                lotid: lotid_,
                time: time_,
                numval1: numval1_,
                numval2: numval2_,
                launderid: launderid_

            });

        });
    });

    if (items.length != 0) {



        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_launder_temp',

            data: items,

            success: function (data) {

                alert('Data now saved.');

                //load saved data
                ddactive_af_casting('AF_CastingOperations'); return false;

            }
        });
        // }
        // });

    } else {

        alert('No changes were made.');
    }

}


function save_launder_temp_modify() {

    var lotno_ = $('#cfcyclenum_cycledetail').text();
    var lotid_ = $('#casting_lotid').text();


    var items = [];

    $('#tbl_launder tr.tr_data').each(function () {

        var time_ = $(this).find('td[id*="paramdate"]').text();

        $(this).find('input.changed').each(function () {
            var attrid = $(this).attr('id');

            var params = attrid.replace('temp_', '');
            var pasplit = params.split("_");
            var fd = pasplit[0];
            var launderid_ = $(this).closest('tr').find('td#laid').text();

            if (fd == '1') {

                var numval1_ = $(this).val();
                var numval2_ = $(this).closest('tr').find('input.t2').val();


            } else {

                var numval2_ = $(this).val();
                var numval1_ = $(this).closest('tr').find('input.t1').val();


            }

            items.push({
                lotid: lotid_,
                time: time_,
                numval1: numval1_,
                numval2: numval2_,
                launderid: launderid_

            });

        });
    });

    if (items.length != 0) {


        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_launder_temp',

            data: items,

            success: function (data) {

                alert('Changes in Launder Temp was now saved.');

                //load saved data
                ddactive_af_casting('AF_CastingOperations'); return false;

            }
        });

    } else {

        //alert('No changes were made.');
    }

}


function load_launder() {

    var lotno_ = $('#cfcyclenum_cycledetail').text();

    var params = [];
    //$.spin('true');    

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_launder/',
        data: {
            lotno: lotno_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {




                $('#tbl_launder tbody').after('<tr class="tr_data"><td style="visibility:hidden;" id="laid" class="border_color">' + value.AF_LaunderTempId + ' </td><td id="paramdate" class="border_color textalign_center">' + value.AF_Time + '</td>'
+ '<td class="border_color">'
+ '<input id="temp_1" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input t1" value="' + value.AF_Temp1.toFixed(2) + '" /></td>'
+ '<td class="border_color">'
+ '<input id="temp_2" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input t2" value="' + value.AF_Temp2.toFixed(2) + '" /></td>'
+ '<td id= "launderdel_id" class="select_disable_AF_act border_color" onclick="delete_launder(\'' + value.AF_Time + '\',' + value.AF_LaunderTempId + ');return false;">Delete</td>'
//+ '<td id="launder_lnk" class="select_disable_AF_act border_color">Add</td>'
+ '</tr>');

                removeDuplicatelaunderRows();

                $(document).ready(function () {

                    $('td,input').change(
                    function () {
                        $(this).addClass('changed');
                        $(this).css('background', '#DFD8D1');
                    });
                });

            });

        }
    });

}
function removeDuplicatelaunderRows() {

    var seen = {};
    $('#tbl_launder tr').each(function () {
        var txt = $(this).text();

        if (seen[txt]) {
            $(this).remove();
        } else {
            seen[txt] = true;
        }
    });

}


function delete_launder(ActDesc, land_id_) {

    //if (end_date_validation()) {
    themsg = 'Are you sure you want to delete the: ' + ActDesc + ' ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/AnodeFurnace/Delete_launder_temp/',
            data: {
                land_id: land_id_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                ddactive_af_casting('AF_CastingOperations'); return false;

            }
        });
    }
    //}
}


function load_mould_inventory_af() {

    var aflotno_ = $('#cfcyclenum_cycledetail').text();

    $('#tbl_load_mould_inventory td').parent().remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_mould_inventory_af/',
        data: {
            aflotno: aflotno_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#tbl_load_mould_inventory tr:last').after('<tr><td class="border_color" id="mould_inv_custname">'
                    + (value.AF_CustomerName) + '</td><td class="border_color" id="mould_inv_val">'
                    + (value.MouldCount) + '</td>><td class="select_disable_AF_act"'
                    + (value.AF_MouldInventory) + '"  onclick="delete_mould_inv(\'' + value.AF_CustomerName + '\',' + value.AF_MouldInventory + ');return false;">Delete</td><td style="visibility:hidden; text-align:center;" class="mould_inv_custid"><d>'
                    + (value.AF_CustomerId) + '</d></td></tr>'

                      );

            });
        }
    });
}


function delete_mould_inv(ActDesc, mouldId_) {

    if (end_date_validation()) {
        themsg = 'Are you sure you want to delete the customer: ' + ActDesc + ' ?';

        var answer = confirm(themsg);

        if (answer) {
            $.ajax({
                url: serverpath + '/AnodeFurnace/delete_mould_inv/',
                data: {
                    mould_id: mouldId_
                },
                type: 'POST',
                cache: false,
                success: function (data) {

                    load_mould_inventory_af();
                }
            });
        }
    }
}


$('#mould_inv_val,#mould_inv_custname').live('click', function () {

    var custname = $(this).closest('tr').find('td#mould_inv_custname').text();
    var cust_id = $(this).closest('tr').find('td.mould_inv_custid').text();
    var val = $(this).closest('tr').find('td#mould_inv_val').text();


    $('#tbl_load_mould_inventory td').css('background', '#FFFFFF');
    $('#tbl_load_mould_inventory td').css('font-style', 'normal');


    $(this).css('background', '#FFFFCC');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFFCC');
    $(this).closest('td').prev('td').css('font-style', 'italic');
    $(this).closest('td').next('td').css('background', '#FFFFCC');
    $(this).closest('td').next('td').css('font-style', 'italic');

    $('#mi_cust_id').val(cust_id);
    $('#Mould_count').val(val);


});

function save_molten_temp(tbl_name, prefix, msg) {

    var aflotid = $('#casting_lotid').text();
    var items = [];


    $('#' + tbl_name).find('select.changed').each(function () {
        var attrid = $(this).attr('id');
        var params = attrid.replace(prefix, '');
        var pasplit = params.split("_");
        var paramid_ = pasplit[0];
        var fd = pasplit[1];

        if (fd == 'hr') {

            var string1 = $(this).val();
            var string2 = $(this).closest('td').find('select.nearselectmin').val();

            var strval_ = string1 + ':' + string2;

        } else {

            var string1 = $(this).val();
            var string2 = $(this).closest('td').find('select.nearselecthr').val();

            var strval_ = string2 + ':' + string1;

        }

        items.push({
            aflotid: aflotid,
            paramid: paramid_,
            strval: strval_
        });
    });


    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/save_molten_temp',

        data: items,

        success: function (data) {

            alert('Changes in ' + msg + ' was now saved.');

            //load saved data
            ddactive_af_casting('AF_CastingOperations'); return false;
        }
    });

}


function load_molten_temp() {

    var aflotno_ = $('#cfcyclenum_cycledetail').text();



    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_molten_temp',
        data: {
            aflotno: aflotno_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.AF_ParamId == 1614) {

                    var strval = value.AF_StrVal;
                    var params = strval.split(":")
                    var p1 = params[0];
                    var p2 = params[1];
                    $('#start_time_1614_hr_input_launder_st1').val(p1);
                    $('#start_time_1614_min_input_launder_st1').val(p2);

                }

                else if (value.AF_ParamId == 1616) {

                    var strval = value.AF_StrVal;
                    var params = strval.split(":")
                    var p1 = params[0];
                    var p2 = params[1];
                    $('#start_time_1616_hr_input_launder_st3').val(p1);
                    $('#start_time_1616_min_input_launder_st3').val(p2);

                }

                if (value.AF_ParamId == 1618) {

                    var strval = value.AF_StrVal;
                    var params = strval.split(":")
                    var p1 = params[0];
                    var p2 = params[1];
                    $('#start_time_1618_hr_input_launder_st5').val(p1);
                    $('#start_time_1618_min_input_launder_st5').val(p2);

                }


            });
        }
    });

}


//-----------------------------------------------------------End of Casting JS----------------------------------------------------------// 
//-----------------------------------------------------------Weigth Distribution JS----------------------------------------------------------// 

function save_weight_dist(tbl_name, prefix, msg) {


    var aflotid = $('#aflot_ddl').val();
    var items = [];

    $('#' + tbl_name).find('td').each(function () {
        $(this).find('input.changed').each(function () {

            var errorid_ = $(this).closest('tr').find('td#werror_id').text();

            var attrid = $(this).attr('id');
            var paramid_ = attrid.replace(prefix, '');
            var params = paramid_.split("_");


            var cw_id_ = params[0];
            var cwtype_id_ = params[1];
            var numval_ = $(this).val();

            items.push({
                aflotid: aflotid,
                cw_id: cw_id_,
                cwtype_id: cwtype_id_,
                errorid: errorid_,
                numval: numval_
            });
        });
    });

    items = JSON.stringify({ 'items': items });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: afserverpath + '/AnodeFurnace/save_weightdist',

        data: items,

        success: function (data) {

            alert('Changes in ' + msg + ' was now saved.');

            //load saved data
            load_wd_data();
            load_data_wd_errorlist();
        }
    });

}


function load_wd_data() {

    var aflotid_ = $('#aflot_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_wd/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            var cnt1 = 0;
            var cnt2 = 0;
            var cnt3 = 0;
            var cnt4 = 0;

            $.each(data, function (index, value) {

                $('td, input').change(
                            function () {
                                $(this).css({ 'background-color': '#DFD8D1' });
                                $(this).addClass('changed');
                            });

                $('#afwd_tbl').find('input.wd1').each(function () {
                    var attrid = $(this).attr('id');
                    var err_id = $(this).closest('tr').find('td#werror_id').text();

                    if (value.AF_CastingWheelId == 1 && value.AF_CastingTypeId == 1 && value.AF_AnodeWeightErrorId == err_id) {


                        $('#' + attrid).val(value.AF_AnodePcs);

                        var nval = $(this).val();

                        cnt1 += parseInt(nval);
                    }

                });

                $('#afwd_tbl').find('input.wd2').each(function () {
                    var attrid = $(this).attr('id');
                    var err_id = $(this).closest('tr').find('td#werror_id').text();

                    if (value.AF_CastingWheelId == 1 && value.AF_CastingTypeId == 2 && value.AF_AnodeWeightErrorId == err_id) {

                        var wd2 = $('#' + attrid).val(value.AF_AnodePcs);

                        cnt2 = cnt2 + parseInt(value.AF_AnodePcs);
                    }

                });

                $('#afwd_tbl').find('input.wd3').each(function () {

                    var attrid = $(this).attr('id');
                    var err_id = $(this).closest('tr').find('td#werror_id').text();

                    if (value.AF_CastingWheelId == 2 && value.AF_CastingTypeId == 1 && value.AF_AnodeWeightErrorId == err_id) {

                        var wd3 = $('#' + attrid).val(value.AF_AnodePcs);

                        cnt3 = cnt3 + parseInt(value.AF_AnodePcs);
                    }

                });

                $('#afwd_tbl').find('input.wd4').each(function () {
                    var attrid = $(this).attr('id');
                    var err_id = $(this).closest('tr').find('td#werror_id').text();

                    if (value.AF_CastingWheelId == 2 && value.AF_CastingTypeId == 2 && value.AF_AnodeWeightErrorId == err_id) {

                        var wd4 = $('#' + attrid).val(value.AF_AnodePcs);

                        cnt4 = cnt4 + parseInt(value.AF_AnodePcs);
                    }

                });

            });


            $('#TWD1').text(cnt1);
            $('#TWD2').text(cnt2);
            $('#TWD3').text(cnt3);
            $('#TWD4').text(cnt4);

        }
    });


}

function load_data_wd_errorlist() {

    var aflotid_ = $('#aflot_ddl').val();

    var x = 1;

    $('#afwd_tbl td').parent().remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/wd_Data/',
        data: {

        },

        type: 'POST',
        cache: false,
        success: function (data) {



            $.each(data, function (index, value) {

                $('#afwd_tbl tbody').append('<tr id = trqig_' + x + '><td class="border_color wthid" id="werror_id">' + value.AF_AnodeWeightErrorId + '</td><td class="border_color">' + value.AF_AnodeWeightError1 +
                '</td> <td id="" class="border_color">KG</td><td class="border_color"><input id="WD_1_1_' + value.AF_AnodeWeightErrorId + '" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input wd1"/></td>'
                + '<td class="border_color"><input id="WD_1_2_' + value.AF_AnodeWeightErrorId + '" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input wd2"/></td>'
                + '<td class="border_color"><input id="WD_2_1_' + value.AF_AnodeWeightErrorId + '" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input wd3"/></td>'
                + '<td class="border_color"><input id="WD_2_2_' + value.AF_AnodeWeightErrorId + '" type="text" onkeypress="return NumericOnly(event)" class="extratbl_input wd4"/></td>'

                 + '</tr>');


                $(document).ready(function () {

                    $('td, input').change(
                    function () {
                        $(this).addClass('changed');
                    });
                });

            });

            $('#afwd_tbl tbody').after('<tr class="wdtotal_tr"><td colspan="2" class="border_color wdtotal_tr"><b>Total Anodes</b></td><td class="border_color wdtotal_tr" id="TWD1"><b>0</b></td><td class="border_color wdtotal_tr" id="TWD2"><b>0</b></td><td class="border_color wdtotal_tr" id="TWD3"><b>0</b></td><td class="border_color wdtotal_tr" id="TWD4"><b>0</b><td></tr>');
            $('.wthid').hide();
            load_wd_data();
            navigate_input_with_arrow_keys();

        }
    });
}


function load_lot_data() {

    var aflotid_ = $('#aflot_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_lot_data/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#afnum_span').text(value.AF_NumId);
                $('#aflot_status_span').text(value.AF_StatusName);
                $('#aflotnum_lbl').text(value.AFLotNo);

            });

        }
    });
}


//-----------------------------------------------------------End of weight distribution JS----------------------------------------------------------// 

$('#save_tm').live('click', function () {
    //alert('clicking');
    //af_lot_checker('consumable');
    refining_tuy();
});

$('#save_consume').live('click', function () {
    //alert('clicking');
    //af_lot_checker('consumable');
    refining_consumable();
});

function refining_tuy() {

    var aflotid_ = $('#lotid').text();
    var twest_ = $('#textb_westtop').val();
    var teast_ = $('#textb_easttop').val();
    var bwest_ = $('#textb_westbottom').val();
    var beast_ = $('#textb_eastbottom').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Ref_Tuyere/',
        data: {
            aflotid: aflotid_,
            twest: twest_,
            teast: teast_,
            bwest: bwest_,
            beast: beast_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Tuyeres now saved.');
            $('#textb_westtop,#textb_easttop,#textb_westbottom,#textb_eastbottom').css({ "background-color": "rgba(192, 192, 192, 1)" });
            load_AF_Act();
        }
    });
}


function refining_consumable() {

    //var aflotid_ = $('#aflot_ddl').val();

    var aflotid_ = $('#lotid').text();

    var lbars_ = $('#textb_leadbars').val();
    var sanode_ = $('#textb_scrapanode').val();
    var stuyere_ = $('#textb_shorttuyere').val();
    var lanodes_ = $('#textb_leadanodes').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_Ref_Consumable/',
        data: {
            aflotid: aflotid_,
            lbars: lbars_,
            sanode: sanode_,
            stuyere: stuyere_,
            lanodes: lanodes_

        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Consumables are now saved.');

            $('#textb_leadbars,#textb_scrapanode,#textb_shorttuyere,#textb_leadanodes').css({ "background-color": "rgba(192, 192, 192, 1)" });
            load_AF_Act();

        }
    });
}


function load_fuel_reading() {

    //alert('fuel reading!');

    var aflotid_ = $('#lotid').text();

    //alert(aflotid_);

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AF_PIdata/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#hfo_start').text(zerovalue_comma(value.HFO_TotalizerStart));
                $('#hfo_end').text(zerovalue_comma(value.HFO_TotalizerEnd));
                $('#hfo_consumed').text(zerovalue_comma((value.HFO_TotalizerEnd - value.HFO_TotalizerStart)));

                $('#lfo_start').text(zerovalue_comma(value.LFO_TotalizerStart));
                $('#lfo_end').text(zerovalue_comma(value.LFO_TotalizerEnd));
                $('#lfo_consumed').text(zerovalue_comma((value.LFO_TotalizerEnd - value.LFO_TotalizerStart)));

            });

        }
    });
}
function load_lpg_reading() {
    //alert('lpg reading!');

    var aflotid_ = $('#lotid').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AF_PIdata/',
        data: {
            aflotid: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#lpg_start').text(zerovalue_comma(value.Red_LPGStart));
                $('#lpg_end').text(zerovalue_comma(value.Red_LPGEnd));
                $('#lpg_consumed').text(zerovalue_comma((value.Red_LPGEnd - value.Red_LPGStart)));

            });
        }
    });
}

function validation_perbtn_af_for_edit() {

    var duration_time = $('#Dialog_EditAF #the_dur').text();


    //var s_date = new Date($('#start_date_input').val());
    //var s_hr = $('#start_time_hr_input').val();
    //var s_min = $('#start_time_min_input').val();



    //var e_date = new Date($('#end_date_input').val());
    //var end_hr = $('#end_time_hr_input').val();
    //var end_min = $('#end_time_min_input').val();


    var edit_s_date = new Date($('#Dialog_EditAF #start_date_input').val());
    var s_hr = $('#Dialog_EditAF #start_time_hr_input').val();
    var s_min = $('#Dialog_EditAF #start_time_min_input').val();



    var edit_e_date = new Date($('#Dialog_EditAF #end_date_input').val());
    var end_hr = $('#Dialog_EditAF #end_time_hr_input').val();
    var end_min = $('#Dialog_EditAF #end_time_min_input').val();


    edit_start_date = edit_s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    edit_end_date = edit_e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    //start_date = s_date.add({
    //    minutes: s_min,
    //    hours: s_hr
    //});



    //end_date = e_date.add({
    //    minutes: end_min,
    //    hours: end_hr
    //});

    //var dur = Math.floor((end_date - start_date) / 60000);
    //var h = Math.floor(dur / 60);
    //var m = dur % 60;
    //var the_dur = (h + '.' + m);


    var dur1 = Math.floor((edit_end_date - edit_start_date) / 60000);
    var h1 = Math.floor(dur1 / 60);
    var m1 = dur1 % 60;
    var the_dur1 = (h1 + '.' + m1);



    var actcodedesc_msg = $('#Dialog_EditAF #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_EditAF .act_add_code_input').val();
    var actduration_msg = $('#Dialog_EditAF #the_dur').text();


    if (actcodedesc_msg == 'Invalid Code.' || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.') {

        $('#Dialog_EditAF .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_EditAF #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_EditAF #edit_af_ok_btn').attr('disabled', true);

    } else if (the_dur1 == 0 || edit_end_date <= edit_start_date || edit_start_date >= edit_end_date) {
        $('#Dialog_EditAF #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');

        $('#Dialog_EditAF #the_dur1').text('ERROR');
        $('#Dialog_EditAF #edit_af_ok_btn').attr('disabled', true);


    } else {
        $('#Dialog_EditAF #error_code').html("");
        $('#Dialog_EditAF .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_EditAF #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');

        $('#Dialog_EditAF #the_dur').text(the_dur1);
        $('#Dialog_EditAF #edit_af_ok_btn').attr('disabled', false);

    }


}
function end_date_validation() {

    var enddate = $('#cfendtitme_cycledetail').text();
    var lotstat = $('#cfstatus_cycledetail').text();
    var i;

    if (enddate == '-' || enddate == "" || lotstat == 'Created') {
        i = true;


    } else {
        alert('You can only modify lot with no End Date.');
        i = false;

    }

    return i;
}

$('#Dialog_AddAF #afparam_1585').live('click', function () {

    var cvnumid = $('#afparam_1585').val();
    $('#Dialog_AddAF #afparam_1586').empty();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/CF_Cyles/',
        data: {
            cvid: cvnumid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#Dialog_AddAF #afparam_1586').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
                $('#Dialog_AddAF #cv_num').val(value.CycleId);
            });

        }
    });

});

$('#Dialog_EditAF #afparam_1585').live('click', function () {

    var cvnumid = $('#Dialog_EditAF #afparam_1585').val();
    $('#Dialog_EditAF #afparam_1586').empty();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/CF_Cyles/',
        data: {
            cvid: cvnumid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#Dialog_EditAF #afparam_1586').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
                $('#Dialog_EditAF #cv_num').val(value.CycleId);
            });

        }
    });

});



function load_cycleno(cycleno) {

    var cvnumid = $('#Dialog_EditAF #afparam_1585').val();
    $('#Dialog_EditAF #afparam_1586').empty();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/CF_Cyles/',
        data: {
            cvid: cvnumid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#Dialog_EditAF #afparam_1586').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
                $('#Dialog_EditAF #cv_num').val(value.CycleId);
            });
            $('#Dialog_EditAF #afparam_1586').attr('value', cycleno);
        }
    });

}

$('#Dialog_AddAF #afparam_1586').live('click', function () {

    var cycid = $('#Dialog_AddAF #cv_num').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Cycle_sulfur/',
        data: {
            cycleid_: cycid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            //$('#afparam_1584').val(data.CycleSulfur);
            //$.each(data, function (index, value) {
            //    $('#afparam_1586').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
            //    $('#cycle_num').val(data.CycleId);
            //});
            $('#Dialog_AddAF #afparam_1587').val(data.CycleSulfur);

        }
    });

});

$('#Dialog_EditAF #afparam_1586').live('click', function () {

    var cycid = $('#Dialog_EditAF #cv_num').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Cycle_sulfur/',
        data: {
            cycleid_: cycid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            //$('#afparam_1584').val(data.CycleSulfur);
            //$.each(data, function (index, value) {
            //    $('#afparam_1586').append("<option value = " + value.CycleId + ">" + value.CycleNumber + "</option>");
            //    $('#cycle_num').val(data.CycleId);
            //});
            $('#Dialog_EditAF #afparam_1587').val(data.CycleSulfur);

        }
    });

});


$('#save_blister_prep').live('click', function () {
    af_remarks();
});

function af_remarks() {

    var aflotid = $('#lotid').text();
    var aftextarea_remarks_ = $('#af_remarks_box.changed').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_AF_Remarks/',
        data: {
            aflotid: aflotid,
            aftextarea_remarks: aftextarea_remarks_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Remarks now saved.');
            $('#af_remarks_box').css({ "background-color": "rgba(192, 192, 192, 1)" });
            load_AF_Act();

        }
    });
}

function load_af_remarks_query() {

    var aflotid = $('#lotid').text();

    //$('#af_remarks_box').val('');

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFRemarks_data/',
        data: {
            aflotid: aflotid
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            if (data != null)
                $('#af_remarks_box').val(data.AF_StrVal ? data.AF_StrVal : "-");


            $("textarea").live("keyup", function (e) {
                $(this).addClass("changed");
            });

        }
    });
}

function load_af_weights_query() {

    var aflotid_ = $('#aflot_ddl').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/AFWeights_data/',
        data: {
            aflotid: aflotid_
            //paramid: paramid_


        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#paramid_1620').val(data.AF_NumVal);
                $('#paramid_1621').val(data.AF_NumVal);
                $('#paramid_1622').val(data.AF_NumVal);
                $('#paramid_1631').val(data.AF_NumVal);

            });
        }
    });
}
function qig_weigts() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var strt_w = $('#paramid_1620').val();
    var mid_w = $('#paramid_1621').val();
    var end_w = $('#paramid_1622').val();
    var end1_w = $('#paramid_1631').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_QIG_Weight/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            strt_w: strt_w,
            mid_w: mid_w,
            end_w: end_w,
            end1_w: end1_w
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('QIG Weights now saved.');
            qig_weight_query();

        }
    });
}

function qig_weight_query() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#paramid_1620').val('');
    $('#paramid_1621').val('');
    $('#paramid_1622').val('');
    $('#paramid_1631').val('');
    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIGWeights_data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.AF_ParamId == 1620) {
                    $('#paramid_1620').val(value.AF_NumVal);
                }
                else if (value.AF_ParamId == 1621) {
                    $('#paramid_1621').val(value.AF_NumVal);
                }
                else if (value.AF_ParamId == 1622) {
                    $('#paramid_1622').val(value.AF_NumVal);
                }
                if (value.AF_ParamId == 1631) {
                    $('#paramid_1631').val(value.AF_NumVal);
                }
            });
        }
    });
}
//
function qig_ar() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var by_c = $('#paramid_1626').val();
    var by_l = $('#paramid_1627').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_QIG_AR/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            by_c: by_c,
            by_l: by_l

        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('APM Rejects now saved.');
            qig_ar_query();

        }
    });
}

function qig_ar_query() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#paramid_1626').val('');
    $('#paramid_1627').val('');


    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIGAR_data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.AF_ParamId == 1626) {
                    $('#paramid_1626').val(value.AF_NumVal);
                }
                else if (value.AF_ParamId == 1627) {
                    $('#paramid_1627').val(value.AF_NumVal);
                }

            });
        }
    });
}
//
function qig_twc() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();
    var tcw1 = $('#paramid_1628').val();
    var tcw2 = $('#paramid_1629').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/Save_QIG_TWC/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_,
            tcw1: tcw1,
            tcw2: tcw2

        },

        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Total Weights Casted and customer now saved.');
            qig_twc_query();

        }
    });
}

function qig_twc_query() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#paramid_1628').val('');
    $('#paramid_1629').val('');


    $.ajax({
        url: afserverpath + '/AnodeFurnace/QIGTWC_data/',
        data: {
            aflotid: aflotid_,
            afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                if (value.AF_ParamId == 1628) {
                    // $('#paramid_1628').val(value.AF_NumVal ? value.AF_NumVal.toFixed(4) : "");
                }
                else if (value.AF_ParamId == 1629) {
                    // $('#paramid_1629').val(value.AF_NumVal ? value.AF_NumVal.toFixed(4) : "");
                }

            });
            load_twc_keyup();
        }
    });
}
function ddactive_af(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/AnodeFurnace/af_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel2').html(result);
        }
    });
}

//NEWAF for Blister
//tabs functions
function ddactive_af2(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/AnodeFurnace/af_tabs2/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel3').html(result);
        }
    });
}
$("#addrow_lnk").live('click', function () {
    addaf_partial(addaf_partial);
    //alert('link');
});
$("#addrow_btn").live('click', function () {
    addaf_partial(addaf_partial);
    //alert('button');
});
//AF partial Activity
function addaf_partial() {

    var aflotno = $('#afcyclenum_cycledetail').text();
    //alert(aflotno);
    if (end_date_validation()) {
        var partialview_link1 = afserverpath + "/AnodeFurnace/addaf_partial/?aflotno=" + aflotno;
        $('#Dialog_AddAF').load(partialview_link1, function () {
            $(this).dialog('open');
            // $('body').css('overflow', 'hidden');
        });
        ///alert('partial fire!');
        return false;
    }
}
//end

//
function addprecast_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();


    if (end_date_validation()) {
        var partialview_link1 = afserverpath + "/AnodeFurnace/addprecast_partial?aflotno=" + aflotno;;


        $('#Dialog_AddPreCast').load(partialview_link1, function () {
            $(this).dialog('open');

            //$('body').css('overflow', 'hidden');



        });
    }
    return false;
}



//af
$('#Dialog_AddAF .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    afact_code_intel(actcode_val, '#Dialog_AddAF');

});

$('#Dialog_EditAF .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    afact_code_intel(actcode_val, '#Dialog_EditAF');

});

function afact_code_intel(actcode_val, dialogname) {

    $(dialogname + ' .act_add_code_input').val(actcode_val);

    $(dialogname + ' #Act_Desc_div').html('Invalid Code.');

    $.ajax({
        url: serverpath + '/AnodeFurnace/ActivityCode_Intellisense/',

        data: {
            actcode_param: actcode_val
        },

        type: 'post',
        cache: false,
        success: function (data) {
            $(dialogname + ' #Act_Desc_div').text(data.AF_ActivityDesc);
            $(dialogname + ' .actcode_id').val(data.AF_ActivityCodeId);
            $(dialogname + ' .actcode_id').text(data.AF_ActivityCodeId);
            $('.add_af_actcode_id').val(data.AF_ActivityCodeId);
            $('.add_af_actcode_id').text(data.AF_ActivityCodeId);

            var act_input = $('.add_af_actcode_id').live('focus').val();

            if (act_input == 59 || act_input == 1 || act_input == 70 || act_input == 72 || act_input == 3) {
                $('.cf_charge_input').prop('disabled', false);
                $('.fsfe_charge_input').prop('disabled', false);
                $('.sulfur_input').prop('disabled', false);
                $('.af_weight_input').prop('disabled', false);
                $('.af_temp_input').prop('disabled', false);

            }
            else {

                $('.cf_charge_input').prop('disabled', true);
                $('.fsfe_charge_input').prop('disabled', true);

                $('.af_weight_input').prop('disabled', true);

            }
            //else  {
            //        $('.af_temp_input').prop('disabled', false);
            //    $('.sulfur_input').prop('disabled', false);
            //}  

            validation_perbtn_af(data.AF_ActivityCodeId);

            validation_perbtn_af_for_edit(data.AF_ActivityCodeId);
        }
    });
}

function ddactive_qig(partialv_name) {
    //$.spin('true');
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/smeltplan_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            //$.spin('false');
            $('#htab-panelqig').html(result);
        }
    });

}
$("#add_af_ok_btn").live('click', function () {


    var timelogid = $('#Dialog_AddAF .timelogid').val();
    var aflotid = $('#lotid').text();


    var actcode_id = $('#Dialog_AddAF .add_af_actcode_id').text();

    //var cf_no = $('.cf_charge_input').val();
    //var sulfur = $('.sulfur_input').val();
    //var cyc_no = $('.fsfe_charge_input').val();
    //var weight = $('.af_weight_input').val();
    //var temp = $('.af_temp_input').val();

    addaf(aflotid, '#Dialog_AddAF');
});

$("#edit_af_ok_btn").live('click', function () {

    var timelogid = $('#Dialog_EditAF .timelogid').val();
    var aflotid = $('#lotid').text();
    var actcode_id = $('#Dialog_EditAF .add_af_actcode_id').text();


    save_edit_af_act(aflotid, '#Dialog_editAF');

});

function removeDuplicateRows() {

    var seen = {};
    $('#total_dataper_location tr').each(function () {
        var txt = $(this).text();

        if (seen[txt]) {
            $(this).remove();
        } else {
            seen[txt] = true;
        }
    });

}


function removeDuplicatelocation($location) {



    //var seen = {};
    //$($location + ' td#tblocation').each(function () {
    //    var txt = $(this).text();
    //    //var count = $location.text().length;

    //    if (seen[txt]) {

    //        $(this).remove();

    //        //$location.attr('rowspan', count+30);

    //    }
    //    else {
    //        seen[txt] = true;
    //    }
    //});

    var seen = {};
    $($location + ' td#tblocation').each(function () {
        // Encode column and content information.
        var key = $(this).index() + $(this).text();
        var cnt = key.length;
        if (seen[key]) {
            $(this).text('');
            // $(this).attr('rowspan',cnt);
            $(this).css({ "font-size": "10px" });
        }
        else {
            seen[key] = true;
        }
    });

}

function load_inventory_tables() {

    clear_inv_tbl();
    clear_inv_select();
    clear_css();

    var inventory_date = $('#thedate').val();
    var x = 1;

    $('#afwd_tbl td').parent().remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_inventory_tables/',
        data: {

        },

        type: 'POST',
        cache: false,
        success: function (data) {

            var lctionId;
            var rowId;
            var currLoc = "";
            var prevLoc = "";
            var tableNumber = 1;
            var prevTableNumber;

            var lctionId1;
            var rowId1;
            var currLoc1 = "";
            var prevLoc1 = "";
            var tableNumber1 = 1;
            var prevTableNumber1;


            $.each(data, function (index, value) {


                if (value.tblocation != currLoc) {
                    //alert(items[i].LocationName + items[i].Row + ' #table' + tableCounter);

                    $('.inv_tabs-menu').append('<li><a href="#location_tab-' + value.tblocationId + '">' + value.tblocation + '</a></li>');
                    $('.inv_tab').append('<div id="location_tab-' + value.tblocationId + '"  class="inv_tab-content"><table class="tbl_inventory_anode" id="table' + tableNumber + '"><thead>'
                        + '<tr>'
                        + '<th colspan="8">Location: ' + value.tblocation + '</th>'
                        + '</tr>'
                        + '<tr>'
                           + '<th colspan="">Row#</th>'
                           + '<th colspan="">Total Pcs</th>'
                           + '<th colspan="">Grade A</th>'
                           + '<th colspan="">Grade B</th>'
                           + '<th colspan="">Reworkable</th>'
                           + '<th colspan="">Reworked</th>'
                           + '<th colspan="">Reject</th>'
                           + '<th colspan="">Lot#<span style="color:red;">*</span></th>'
                        + '</thead><tbody>'

                        + '<tr id = ' + value.tblocationId + '><td class="border_color wthid" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '">' + value.tblocationId + '</td>'
                        //+ '<td class="" rowspan="" id="tblocation">' + value.tblocation + '</td>'
                        + '<td class="border_color wthid" id="rows_id">' + value.tblrowsId + '</td>'
                        + '<td class="border_color df">' + value.tblrows + '</td>'

                        + '<td class="border_color df" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_1"><input type="text" class="extratbl_input total" id="total_182" onkeypress="return isNumber(event)" readonly="readonly"/></td>'
                        + '<td class="border_color gradeA" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_2"><input type="text" class="extratbl_input add gradeA" id="gradeA_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                        + '<td class="border_color gradeB" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_3"><input type="text" class="extratbl_input add gradeB" id="gradeB_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                        + '<td class="border_color reworkable" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_4"><input type="text" class="extratbl_input add reworkable" id="reworkable_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                        + '<td class="border_color reworked" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_5"><input type="text" class="extratbl_input add reworked" id="reworked_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                        + '<td class="border_color reject" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_6"><input type="text" class="extratbl_input add reject" id="reject_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                        + '<td class="border_color lots" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_7"><input type="text" class="extratbl_input lots" id="rejectlot"disabled="disabled" /></td>'
                        + '</tr>'
                        + '</tbody></table></div>');



                    currLoc = value.tblocation;
                    //removeDuplicatelocation('#table' + tableNumber);
                    prevTableNumber = tableNumber;
                    tableNumber++;


                } else {

                    //alert(items[i].LocationName + items[i].Row + '#table' + prevTableNumber);
                    currLoc = value.tblocation;
                    $('#table' + prevTableNumber + ' tbody').append('<tr id = ' + value.tblocationId + '><td class="border_color wthid" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '">' + value.tblocationId + '</td>'
                    //+ '<td class="" rowspan="" id="tblocation">' + value.tblocation + '</td>'
                    + '<td class="border_color wthid" id="rows_id">' + value.tblrowsId + '</td>'
                    + '<td class="border_color df">' + value.tblrows + '</td>'

                    + '<td class="border_color df" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_1"><input type="text" class="extratbl_input total" id="total_182" onkeypress="return isNumber(event)"  readonly="readonly"/></td>'
                    + '<td class="border_color gradeA" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_2"><input type="text" class="extratbl_input add gradeA" id="gradeA_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                    + '<td class="border_color gradeB" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_3"><input type="text" class="extratbl_input add gradeB" id="gradeB_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                    + '<td class="border_color reworkable" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_4"><input type="text" class="extratbl_input add reworkable" id="reworkable_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                    + '<td class="border_color reworked" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_5"><input type="text" class="extratbl_input add reworked" id="reworked_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                    + '<td class="border_color reject" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_6"><input type="text" class="extratbl_input add reject" id="reject_" onkeypress="return isNumber(event)" disabled="disabled" /></td>'
                    + '<td class="border_color lots" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_7"><input type="text" class="extratbl_input lots" id="rejectlot"disabled="disabled" /></td>'
                    + '</tr>');

                    //removeDuplicatelocation('#table' + prevTableNumber);


                }

                lctionId = value.tblocationId
                prevLoc = value.tblocation


                //-------------------------------------------------------------------------------------------------//


                $('#total_dataper_location tbody').append('<tr id = ' + value.tblocationId + '><td class="border_color wthid" id="location_id">' + value.tblocationId + '</td>'
                    + '<th class="" rowspan="" >' + value.tblocation + '</th>'


                    + '<td class="df border_color gradeA" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_2"><input type="text" class="extratbl_input gradeA total" id="table' + lctionId + '_gradeA_sum_table" onkeypress="return isNumber(event)" disabled="disabled"  readonly="readonly" /></td>'
                    + '<td class="df border_color gradeB" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_3"><input type="text" class="extratbl_input gradeB total" id="table' + lctionId + '_gradeB_sum_table" onkeypress="return isNumber(event)" disabled="disabled"  readonly="readonly"/></td>'
                    + '<td class="df border_color reworkable" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_4"><input type="text" class="extratbl_input reworkable total" id="table' + lctionId + '_rew_sum_table" onkeypress="return isNumber(event)" size="10" disabled="disabled"  readonly="readonly"/></td>'
                    + '<td class="df border_color reworked" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_5"><input type="text" class="extratbl_input reworked total" id="table' + lctionId + '_reworked_sum_table" onkeypress="return isNumber(event)" disabled="disabled"  readonly="readonly"/></td>'
                    + '<td class="df border_color reject" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_6"><input type="text" class="extratbl_input reject total" id="table' + lctionId + '_rej_sum_table"  onkeypress="return isNumber(event)" disabled="disabled"  readonly="readonly"/></td>'
                    + '<td class="df border_color lots" id="ids_' + value.tblocationId + '_' + value.tblrowsId + '_7"><input type="text" class="extratbl_input lots total" id="table' + lctionId + '_total_sum_table" disabled="disabled"  readonly="readonly"/></td>'

                 + '</tr>');



                removeDuplicateRows();

                //-----------------------------------------------------------------------------------------------------//

                $(document).ready(function () {

                    $('td, input').change(
                    function () {
                        $(this).addClass('changed');
                    });
                });


            });

            $('#total_dataper_location tbody').after('<tr><th>Total Anode Inventory</th>'
            + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="gradeA_total" placeholder="0"  readonly="readonly"/></td>'
             + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="gradeB_total" placeholder="0" readonly="readonly"/></td>'
            + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="rew_total" placeholder="0"  readonly="readonly"/></td>'
            + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="reworked_total" placeholder="0" readonly="readonly"/></td>'
            + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="rej_total" placeholder="0"  readonly="readonly"/></td>'
            + '<td colspan="" class="border_color df"><input type="text" class="total extratbl_input" id="total_total" placeholder="0"  readonly="readonly"/></td>'
       + '</tr>');


            $('.targets_tabs-menu li:first').addClass('current');
            $('.targets_tab div').css({ "display": "none" });
            $('.targets_tab div:first-child').css({ "display": "block" });
            $('.wthid').hide();

            $('#gradeA_total').val(0);
            $('#gradeB_total').val(0);
            $('#rew_total').val(0);
            $('#reworked_total').val(0);
            $('#rej_total').val(0);


        }


    });
}



$('#af_inventory_imgbtn').click(function () {
    save_anodeInventory();
    Save_Inv_Emp();

});

function save_anodeInventory() {

    var inventory_date = $('#thedate').val();
    var items = [];

    $('table[id*="table"]').each(function () {
        $(this).find('td[id*="ids"].changed').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('ids', '');
            var params = num_id.split("_");

            var locationid_ = params[1];
            var rowid_ = params[2];
            var uniq = params[3];
            var numval_ = $(this).find('input').val();

            if (uniq == 2) {
                var gradeA = $(this).find('input').val();
                var gradeB = $(this).closest('tr').find('input.gradeB').val();
                var reworkable = $(this).closest('tr').find('input.reworkable').val();
                var reworked = $(this).closest('tr').find('input.reworked').val();
                var reject = $(this).closest('tr').find('input.reject').val();
                var lots = $(this).closest('tr').find('input.lots').val();

            } else if (uniq == 3) {
                var gradeB = $(this).find('input').val();
                var gradeA = $(this).closest('tr').find('input.gradeA').val();
                var reworkable = $(this).closest('tr').find('input.reworkable').val();
                var reworked = $(this).closest('tr').find('input.reworked').val();
                var reject = $(this).closest('tr').find('input.reject').val();
                var lots = $(this).closest('tr').find('input.lots').val();

            } else if (uniq == 4) {
                var reworkable = $(this).find('input').val();
                var gradeA = $(this).closest('tr').find('input.gradeA').val();
                var gradeB = $(this).closest('tr').find('input.gradeB').val();
                var reworked = $(this).closest('tr').find('input.reworked').val();
                var reject = $(this).closest('tr').find('input.reject').val();
                var lots = $(this).closest('tr').find('input.lots').val();

            } else if (uniq == 5) {
                var reworked = $(this).find('input').val();
                var gradeA = $(this).closest('tr').find('input.gradeA').val();
                var gradeB = $(this).closest('tr').find('input.gradeB').val();
                var reworkable = $(this).closest('tr').find('input.reworkable').val();
                var reject = $(this).closest('tr').find('input.reject').val();
                var lots = $(this).closest('tr').find('input.lots').val();

            } else if (uniq == 6) {
                var reject = $(this).find('input').val();
                var gradeA = $(this).closest('tr').find('input.gradeA').val();
                var gradeB = $(this).closest('tr').find('input.gradeB').val();
                var reworkable = $(this).closest('tr').find('input.reworkable').val();
                var reworked = $(this).closest('tr').find('input.reworked').val();
                var lots = $(this).closest('tr').find('input.lots').val();

            } else if (uniq == 7) {
                var lots = $(this).find('input').val();
                var gradeA = $(this).closest('tr').find('input.gradeA').val();
                var gradeB = $(this).closest('tr').find('input.gradeB').val();
                var reworkable = $(this).closest('tr').find('input.reworkable').val();
                var reworked = $(this).closest('tr').find('input.reworked').val();
                var reject = $(this).closest('tr').find('input.reject').val();
            }



            if (lots != "" && $(this).find('input').hasClass('changed')) {

                items.push({
                    inventory_date: inventory_date,
                    locationid_: locationid_,
                    rowid_: rowid_,
                    gradeA: gradeA,
                    gradeB: gradeB,
                    reworkable: reworkable,
                    reworked: reworked,
                    reject: reject,
                    lots: lots
                })
            } else {
                //alert('Please input Lot#.');
                //$('#inv_lot_val').css({ 'visibility': 'visible' });
                //$('#inv_lot_val').toggle(1000).fadeOut();
            }

        });
    });


    if (items.length != 0) {

        //check the lots value
        var str = JSON.stringify(items);
        var json = jQuery.parseJSON(str);

        var res = json.map(function (o) {
            return o.lots;
        }).filter(onlyUnique);

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        //alert(res);
        if (res == "" || res == 0) {

            //alert('Please input Lot#.');
            $('#inv_lot_val').css({ 'visibility': 'visible' });
            $('#inv_lot_val').toggle(1000).fadeOut();

        } else {

            items = JSON.stringify({ 'items': items });

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: afserverpath + '/AnodeFurnace/save_anodeInventory',
                data: items,
                success: function (data) {
                    alert('Inventory data now saved.');
                    load_inventory();

                }
            });
        }

    }
}


function af_inventory_tbl_data(afinv_date_) {

    //clear_inv_tbl();
    //clear_inv_select();
    //clear_css();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/af_inventory_tbl_data/',
        data: {
            afinv_date: afinv_date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            var a = 0;
            var b = 0;
            var c = 0;
            var d = 0;
            var e = 0;
            var ovtotal = 0;
            var lctionId;

            $.each(data, function (index, value) {

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_2').closest('tr').find('input.gradeA').val(value.GradeA_pcs);

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_3').closest('tr').find('input.gradeB').val(value.GradeB_pcs);

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_4').closest('tr').find('input.reworkable').val(value.Reworkable_pcs);

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_5').closest('tr').find('input.reworked').val(value.Reworked_pcs);

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_6').closest('tr').find('input.reject').val(value.Reject_pcs);

                $('#ids_' + value.AF_LocationId + '_' + value.AF_RowId + '_7').closest('tr').find('input.lots').val(value.Lot);

                a += parseInt(value.GradeA_pcs);
                b += parseInt(value.GradeB_pcs);
                c += parseInt(value.Reworkable_pcs);
                d += parseInt(value.Reworked_pcs);
                e += parseInt(value.Reject_pcs);

                lctionId = value.AF_LocationId;
                calculate_totals('table' + lctionId);
                findTotals_inv();


                $(document).ready(function () {

                    $('td, input').change(
                    function () {
                        $(this).addClass('changed');
                    });
                });
            });

        }

    });


}


$('.add:input').keyup(function () {
    findTotals_inv();
});

function findTotals_inv() {
    $(".tbl_inventory_anode tr:not(:first)").each(function () {
        row_total = 0;
        $(".add:input", this).each(function () {
            row_total += Number($(this).val());
        });
        if (row_total != 0)
            $(".total", this).attr('value', row_total);
    });
}

$('#antrans_save_btn').click(function () {
    $('#anodetrans_add_div').hide();
    save_anode_transfer();
});

$('#antrans_edit_btn').click(function () {
    $('#anodetrans_add_div').hide();
    save_edit_anode_trans();
});

function save_anode_transfer() {

    var date = $('#ans_monthyear').val();
    var ans_date = $('#select_antrans_date').val();
    var ans_lotlist = $('#antrans_lotlist').val();
    var cust_at = $('#at_list').val();
    var ans_sales = $('#an_sales').val();
    var ans_apm = $('#an_apm').val();
    var ans_inv = $('#an_inv').val();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_anode_transfer/',
        data: {
            ans_date: ans_date,
            ans_lotlist: ans_lotlist,
            cust_at: cust_at,
            ans_sales: ans_sales,
            ans_apm: ans_apm,
            ans_inv: ans_inv
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Changes in Anode Transfer now saved.');
            load_anode_trans(date);
        }
    });
}

function save_edit_anode_trans() {

    var date = $('#ans_monthyear').val();
    var ans_date = $('#select_antrans_date').val();
    var ans_lotlist = $('#antrans_lotlist').val();
    var cust_at = $('#at_list').val();
    var ans_sales = $('#an_sales').val();
    var ans_apm = $('#an_apm').val();
    var ans_inv = $('#an_inv').val();
    var ans_id = $('#anstransfer_Id').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_edit_anode_trans/',
        data: {
            ans_date: ans_date,
            ans_lotlist: ans_lotlist,
            cust_at: cust_at,
            ans_sales: ans_sales,
            ans_apm: ans_apm,
            ans_inv: ans_inv,
            ans_id: ans_id
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            alert('Changes in Anode Transfer now saved.');
            load_anode_trans(date);
        }
    });
}

function edit_anode_transfer(id) {

    $('#select_antrans_date').attr('disabled', true);
    $('#select_antrans_date').datepicker('destroy');
    $('#antrans_lotlist').css({ 'appearance': 'none', 'overflow': 'hidden', '-moz-appearance': 'none', '-webkit-appearance': 'none' });
    $('#antrans_lotlist').attr('disabled', true);
    $('#at_list').css({ 'appearance': 'none', 'overflow': 'hidden', '-moz-appearance': 'none', '-webkit-appearance': 'none' });
    $('#at_list').attr('disabled', true);
    $('#anodetrans_add_div').show();
    $('#antrans_edit_btn').show();
    $('#antrans_save_btn').hide();
    var ans_edit = 'antrans_edit_' + id;

    var antrans_date = $('#' + ans_edit).closest('tr').find('td#antrans_date').text();
    var antrans_lot = $('#' + ans_edit).closest('tr').find('td#antrans_lotid').text();
    var antrans_cust = $('#' + ans_edit).closest('tr').find('select#antrans_cust').val();
    var antrans_sales = $('#' + ans_edit).closest('tr').find('td#antrans_sales').text();
    var antrans_apm = $('#' + ans_edit).closest('tr').find('td#antrans_apm').text();
    var antrans_inv = $('#' + ans_edit).closest('tr').find('td#antrans_inv').text();

    $('#select_antrans_date').val(antrans_date);
    $('#antrans_lotlist').val(antrans_lot);
    $('#at_list').val(antrans_cust);
    $('#an_sales').val(antrans_sales);
    $('#an_apm').val(antrans_apm);
    $('#an_inv').val(antrans_inv);
    $('#anstransfer_Id').text(id);

}
function delete_anode_transfer(ans_id) {

    var ans_date = $('#ans_monthyear').val();
    var answer = confirm('Are you sure you want to delete this?');

    if (answer) {
        $.ajax({
            url: afserverpath + '/AnodeFurnace/delete_anode_transfer/',
            data: {
                ans_id: ans_id
            },

            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Data now deleted.');
                load_anode_trans(ans_date);
            }
        });
    }
}
function load_anode_trans(ans_date) {

    clear_anode_trans();

    $('#anodetrans_tbl td').parent().remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_anode_trans/',
        data: {
            ans_date: ans_date
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $('#anodetrans_tbl tr:last').after('<tr>'
                        + '<td id="antrans_date" class="border_color">' + formatDate_only(value.AF_Date) + '</td>'
                        + '<td id="antrans_lot" class="border_color">' + value.AFLotNo + '</td>'
                        + '<td id="antrans_lotid" class="antrans_lotid">' + value.AF_LotId + '</td>'
                        + '<td id="antrans_cust" class="border_color"><select id="antrans_cust" disabled="disabled" class="cust_reclass" style="background-color:transparent;"><option value=' + value.AF_CustomerId + '>' + value.AF_CustomerName + '</option></select></td>'
                        + '<td id="antrans_sales" class="border_color">' + value.AF_Sales + '</td>'
                        + '<td id="antrans_apm" class="border_color">' + value.AF_APMRejToCF + '</td>'
                        + '<td id="antrans_inv" class="border_color">' + value.AF_InvToCF + '</td>'
                        + '<td id="antrans_edit_' + value.AF_AnodeTransferId + '" onclick="edit_anode_transfer(' + value.AF_AnodeTransferId + ');return false;" class="border_color ans_edit cursor_pointer">Edit</td>'
                        + '<td id="antrans_delete" onclick="delete_anode_transfer(' + value.AF_AnodeTransferId + ');return false;" class="border_color cursor_pointer">Delete</td></tr>');

                paginate('anodetrans_tbl', 30);

            });

            $('.antrans_lotid').hide();
        }
    });
}

function clear_anode_trans() {
    $('#antrans_lotlist').val('');
    $('#at_list').val('');
    $('#an_sales').val('');
    $('#an_apm').val('');
    $('#an_inv').val('');
    $('#anstransfer_Id').text('');
    $('td, input, select').each(function () {
        $(this).removeClass('changed');
    });
}


function load_reclass() {

    var lot_id = $('#aflot_ddl').val();
    $('#anodeReclass_tbl td').parent().remove();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_reclass/',
        data: {
            lot_id: lot_id
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var TotalAnodePcs = value.TotalAnodePcs == null ? "" : value.TotalAnodePcs;
                var RejectAnodes = value.RejectAnodes == null ? "" : value.RejectAnodes;
                var RDC = value.RDC == null ? "" : value.RDC;
                var GoodAnodes = value.GoodAnodes == null ? "" : value.GoodAnodes;
                var ReworkableAnodes = value.ReworkableAnodes == null ? "" : value.ReworkableAnodes;
                var FLL = value.FLL == null ? "" : value.FLL;
                var RejectAtPort = value.RejectAtPort == null ? "" : value.RejectAtPort;
                var ReclassifiedAnodes = value.ReclassifiedAnodes == null ? "" : value.ReclassifiedAnodes;


                $('#anodeReclass_tbl tr:last').after('<tr>'
                    + '<td class="border_color" id="rclotno_' + value.lotno + '_' + value.customerid + '">' + value.lotno + '</td>'
                    + '<td class="border_color"><select id="rccust_' + value.lotno + '_' + value.customerid + '" disabled="disabled" class="cust_reclass" style="background-color:transparent;"><option value=' + value.customerid + '>' + value.customer + '</option></select></td>'
                    + '<td class="border_color rcAnodeTotal" id="rcAnodeTotal_' + value.lotno + '_' + value.customerid + '" >' + TotalAnodePcs + '</td>'
                    + '<td class="border_color rctotal" id="rcGoodAnode_' + value.lotno + '_' + value.customerid + '">' + GoodAnodes + '</td>'
                    + '<td class="border_color"><input onkeypress="return isNumber(event)" type="text" class="extratbl_input rc_' + value.lotno + '_' + value.customerid + '" id="rcId_ReworkableAnodes_' + value.lotno + '_' + value.customerid + '" value="' + ReworkableAnodes + '"/></td>'
                    + '<td class="border_color" id="rcId_RejectAnodes_' + value.lotno + '_' + value.customerid + '">' + RejectAnodes + '</td>'
                    + '<td class="border_color" id="rcId_RDC_' + value.lotno + '_' + value.customerid + '">' + RDC + '</td>'
                    + '<td class="border_color"><input onkeypress="return isNumber(event)" type="text" class="extratbl_input rc_' + value.lotno + '_' + value.customerid + '" id="rcId_RejectAtPort_' + value.lotno + '_' + value.customerid + '" value="' + RejectAtPort + '"/></td>'
                    + '<td class="border_color"><input onkeypress="return isNumber(event)" type="text" class="extratbl_input rc_' + value.lotno + '_' + value.customerid + '" id="rcId_FLL_' + value.lotno + '_' + value.customerid + '" value="' + FLL + '"/></td>'
                    + '<td class="border_color"><input onkeypress="return isNumber(event)" type="text" class="extratbl_input rc_' + value.lotno + '_' + value.customerid + '" id="rcId_ReclassifiedAnodes_' + value.lotno + '_' + value.customerid + '" value="' + ReclassifiedAnodes + '"/></td>'
                    //+ '<td class="border_color"><a href="#" onclick="calculate_goodAnode(\'' + value.lotno + '\',' + value.customerid + ');return false;"><input type="button" value="Calculate Good Anodes" id="calc_good_btn_' + value.lotno + '_' + value.customerid + '"/></a></td>'
                    + '<td class="border_color"><a href="#" id="save_lnk_rc_' + value.lotno + '_' + value.customerid + '" onclick="save_reclass(\'' + value.lotno + '\',' + value.customerid + ');return false;"><input type="button" value="Save" id="save_reclass_btn_' + value.lotno + '_' + value.customerid + '"/></a></td>'
                 + '</tr>');
                paginate('anodeReclass_tbl', 30);

                $('#calc_good_btn_' + value.lotno + '_' + value.customerid + '').hide();

                $(document).ready(function () {

                    $('#rcId_ReworkableAnodes_' + value.lotno + '_' + value.customerid + '').keyup(function () {
                        findTotals($(this).attr('id'));
                    });
                    $('#rcId_RejectAtPort_' + value.lotno + '_' + value.customerid + '').keyup(function () {
                        findTotals($(this).attr('id'));
                    });
                    $('#rcId_FLL_' + value.lotno + '_' + value.customerid + '').keyup(function () {
                        findTotals($(this).attr('id'));
                    });
                    $('#rcId_ReclassifiedAnodes_' + value.lotno + '_' + value.customerid + '').keyup(function () {
                        findTotals($(this).attr('id'));
                    });

                    function findTotals(id) {
                        $("#anodeReclass_tbl").each(function () {
                            var anodetotal = $('#rcAnodeTotal_' + value.lotno + '_' + value.customerid + '').text();
                            var row_total = 0;

                            $('input[class*="rc_' + value.lotno + '_' + value.customerid + '"]', this).each(function () {
                                row_total += Number($(this).val());
                            });

                            var RejectAnodes1 = $('#rcId_RejectAnodes_' + value.lotno + '_' + value.customerid + '').text();
                            var RDC1 = $('#rcId_RDC_' + value.lotno + '_' + value.customerid + '').text();
                            var RejectAnodes = RejectAnodes1 == '' ? "0" : RejectAnodes1;
                            var RDC = RDC1 == '' ? "0" : RDC1;

                            var total_R5F = parseInt(row_total) + parseInt(RejectAnodes) + parseInt(RDC);
                            var good_total = anodetotal - total_R5F;
                            $('#rcGoodAnode_' + value.lotno + '_' + value.customerid + '').text(good_total);
                            $('#rcGoodAnode_' + value.lotno + '_' + value.customerid + '').css({ 'background-color': '#ffffcc' });
                        });
                    }
                });
            });
            load_reclass_customer();
        }
    });
}

function calculate_goodAnode(lotno, customerid) {

    $('#save_lnk_rc_' + lotno + '_' + customerid + '').show();

    var anodetotal = $('#rcAnodeTotal_' + lotno + '_' + customerid + '').text();
    var anodetotalid = $('#rcAnodeTotal_' + lotno + '_' + customerid + '');
    var RejectAnodes1 = anodetotalid.closest('tr').find('td#rcId_RejectAnodes_' + lotno + '_' + customerid + '').text();
    var reworkable1 = anodetotalid.closest('tr').find('input#rcId_ReworkableAnodes_' + lotno + '_' + customerid + '').val();
    var RDC1 = anodetotalid.closest('tr').find('td#rcId_RDC_' + lotno + '_' + customerid + '').text();
    var RejectAtPort1 = anodetotalid.closest('tr').find('input#rcId_RejectAtPort_' + lotno + '_' + customerid + '').val();
    var FLL1 = anodetotalid.closest('tr').find('input#rcId_FLL_' + lotno + '_' + customerid + '').val();
    var ReClass1 = anodetotalid.closest('tr').find('input#rcId_ReclassifiedAnodes_' + lotno + '_' + customerid + '').val();



    var RejectAnodes = RejectAnodes1 == '' ? "0" : RejectAnodes1;
    var reworkable = reworkable1 == '' ? "" : reworkable1;
    var RDC = RDC1 == '' ? "0" : RDC1;
    var RejectAtPort = RejectAtPort1 == '' ? "" : RejectAtPort1;
    var FLL = FLL1 == '' ? "" : FLL1;
    var ReClass = ReClass1 == '' ? "" : ReClass1;

    var row_total = 0;

    if (reworkable == '' || RejectAtPort == '' || FLL == '' || ReClass == '') {
        if (reworkable == '') {
            $('#rcId_ReworkableAnodes_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            $('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (RejectAtPort == '') {
            $('input#rcId_RejectAtPort_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            $('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (FLL == '') {
            $('#rcId_FLL_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            $('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (ReClass == '') {
            $('#rcId_ReclassifiedAnodes_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            $('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
    } else {

        $('#save_lnk_rc_' + lotno + '_' + customerid + '').show();
        row_total = parseInt(RejectAnodes) + parseInt(reworkable) + parseInt(RDC) + parseInt(RejectAtPort) + parseInt(FLL) + parseInt(ReClass);

        var good_total = anodetotal - row_total;
        if (isNaN(good_total)) {
            $('#rcGooAnode_' + lotno + '_' + customerid + '').text('0');
        } else {
            $('#rcGoodAnode_' + lotno + '_' + customerid + '').text(good_total);
        }
    }
}

function save_reclass(lotno, customerid) {

    var anodetotalid = $('#rcAnodeTotal_' + lotno + '_' + customerid + '');

    var lotno_ = anodetotalid.closest('tr').find('td#rclotno_' + lotno + '_' + customerid + '').text();
    var customerid_ = anodetotalid.closest('tr').find('select#rccust_' + lotno + '_' + customerid + '').val();
    var goodAnode = anodetotalid.closest('tr').find('td#rcGoodAnode_' + lotno + '_' + customerid + '').text();
    var reworkable = anodetotalid.closest('tr').find('input#rcId_ReworkableAnodes_' + lotno + '_' + customerid + '').val();

    var RejectAtPort = anodetotalid.closest('tr').find('input#rcId_RejectAtPort_' + lotno + '_' + customerid + '').val();
    var FLL = anodetotalid.closest('tr').find('input#rcId_FLL_' + lotno + '_' + customerid + '').val();
    var ReClass = anodetotalid.closest('tr').find('input#rcId_ReclassifiedAnodes_' + lotno + '_' + customerid + '').val();

    if (reworkable == '' || RejectAtPort == '' || FLL == '' || ReClass == '') {
        if (reworkable == '') {
            $('#rcId_ReworkableAnodes_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            //$('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (RejectAtPort == '') {
            $('input#rcId_RejectAtPort_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            //$('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (FLL == '') {
            $('#rcId_FLL_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            //$('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
        if (ReClass == '') {
            $('#rcId_ReclassifiedAnodes_' + lotno + '_' + customerid + '').css({ 'border': '1px #ea4149 solid' });
            //$('#save_lnk_rc_' + lotno + '_' + customerid + '').hide();
        }
    } else {

        $.ajax({
            url: afserverpath + '/AnodeFurnace/save_reclass/',
            data: {
                lotno: lotno_,
                customerid: customerid_,
                goodAnode: goodAnode,
                reworkable: reworkable,
                RejectAtPort: RejectAtPort,
                FLL: FLL,
                ReClass: ReClass
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                alert('Data now deleted.');
                load_reclass();
            }
        });
    }
}


function load_reclass_customer() {

    $.ajax({
        url: serverpath + '/AnodeFurnace/load_reclass_customer/',

        data: {},

        type: 'post',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('select[id*="rccust_"]').each(function () {
                    $(this).append('<option id ="op_' + value.customerid + '" value =' + value.customerid + '>' + value.customer + '</option>');

                    $('td, input,select').change(function () {
                        $(this).addClass('changed');
                    });
                });
            });
        }
    });
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function load_status_aflot(aflotid_) {

    $.ajax({

        url: afserverpath + '/AnodeFurnace/load_status_aflot/',
        data: {

            aflotid_: aflotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var stime = formatdate_af_24hr_yearfirst(value.stime) == null ? "-" : formatdate_af_24hr_yearfirst(value.stime);
                var endt = formatdate_af_24hr_yearfirst(value.endtime) == null ? "-" : formatdate_af_24hr_yearfirst(value.endtime);
                var maxx_endtime = formatdate_af_24hr_yearfirst(value.max_endtime) == null ? "-" : formatdate_af_24hr_yearfirst(value.max_endtime);

                $('#cfstatus_cycledetail').text(value.status_name);
                $('#cfstarttitme_cycledetail').text(stime);
                $('#cfendtitme_cycledetail').text(endt);
                $('#prevmax_stime').text(maxx_endtime);
            });

        }
    });
}

function formatdate_af_24hr_yearfirst(theDate) {



    if (theDate == null) {
        return '-';

    } else if ((theDate.substring(6, theDate.length - 2)) <= 0) {
        return '-';
    }

    else {
        var ms = theDate.substring(6, theDate.length - 2);

        var date = new Date(parseInt(ms));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var mins = date.getMinutes() + '';
        var ss = date.getSeconds() + '0';
        var time = "am";

        if (month < 10) { month = "0" + month; }
        if (day < 10) { day = "0" + day; }
        if (hour < 10) { hour = "0" + hour; }
        if (mins < 10) { mins = "0" + mins; }

        // return formatted date time string
        return year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + ss;
    }
}
function End_Lot_Validation() {

    var enddate = $('#cfendtitme_cycledetail').text();
    var status = $('#cfstatus_cycledetail').text();
    var endlot = $('#afstatus_ddl').val();
    var i;
    if (i != i) {
        //if (endlot == 'End of Lot') {
        //if (enddate == '-' || enddate == "") {

        alert('Lot has no start or end date.');
        i = false;

        //} else if (status == 'End of Lot') {
        //    alert('This lot has has already ended.');
        //    i = false;

    } else {
        i = true;
    }

    return i;
}

function End_Lot_Confirmation() {

    var answer = confirm('Are you sure you want to proceed?');

    var i;

    if (answer) {
        i = true;
    } else {
        i = false;
    }
    return i;
}

function afcasting_tblnew_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();


    //if (end_date_validation()) {
    var partialview_link1 = afserverpath + "/AnodeFurnace/afcasting_tblnew_partial?aflotno=" + aflotno;;


    $('#Dialog_addafcasting_tblnew').load(partialview_link1, function () {
        $(this).dialog('open');
    });
    //}
    return false;
}

//onkeyup input add activity code
$('#Dialog_addafcasting_tblnew .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_addafcasting_tblnew');

});

//onkeyup input add activity code
$('#Dialog_editafcasting_tblnew .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_editafcasting_tblnew');

});

$(document).on('change', '#Dialog_addafcasting_tblnew #start_time_hr_input_tblnew', function () {

    validation_casting_tblnew();
});

$(document).on('change', '#Dialog_addafcasting_tblnew #start_time_min_input_tblnew', function () {

    validation_casting_tblnew();
});

$(document).on('change', '#Dialog_addafcasting_tblnew #start_date_input_tblnew', function () {

    validation_casting_tblnew();
});

$(document).on('change', '#Dialog_addafcasting_tblnew #end_time_hr_input_tblnew', function () {

    validation_casting_tblnew();
});

$(document).on('change', '#Dialog_addafcasting_tblnew #end_time_min_input_tblnew', function () {

    validation_casting_tblnew();
});

$(document).on('change', '#Dialog_addafcasting_tblnew #end_date_input_tblnew', function () {

    validation_casting_tblnew();
});

$("#add_castingtblnew_ok_btn").live('click', function () {

    addcastingtblnew();
});


function validation_casting_tblnew(codeid, dialogname) {

    var duration_time = $('#Dialog_addafcasting_tblnew #the_dur').text();

    var s_date = new Date($('#Dialog_addafcasting_tblnew #start_date_input_tblnew').val());
    var s_hr = $('#Dialog_addafcasting_tblnew #start_time_hr_input_tblnew').val();
    var s_min = $('#Dialog_addafcasting_tblnew #start_time_min_input_tblnew').val();



    var e_date = new Date($('#Dialog_addafcasting_tblnew #end_date_input_tblnew').val());
    var end_hr = $('#Dialog_addafcasting_tblnew #end_time_hr_input_tblnew').val();
    var end_min = $('#Dialog_addafcasting_tblnew #end_time_min_input_tblnew').val();


    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {
        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }

    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_addafcasting_tblnew #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_addafcasting_tblnew .act_add_code_input').val();
    var actduration_msg = $('#Dialog_addafcasting_tblnew #the_dur').text();


    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_addafcasting_tblnew .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_addafcasting_tblnew #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_addafcasting_tblnew #add_castingtblnew_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_addafcasting_tblnew #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_addafcasting_tblnew #the_dur').text('ERROR');
        $('#Dialog_addafcasting_tblnew #add_castingtblnew_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_addafcasting_tblnew #error_msg_time_pc').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_addafcasting_tblnew #the_dur').text('ERROR');
        $('#Dialog_addafcasting_tblnew #add_castingtblnew_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_addafcasting_tblnew #error_code').html("");
        $('#Dialog_addafcasting_tblnew .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_addafcasting_tblnew #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_addafcasting_tblnew #the_dur').text(the_dur);
        $('#Dialog_addafcasting_tblnew #add_castingtblnew_ok_btn').attr('disabled', false);


    }


}

function addcastingtblnew() {

    var aflotid = $('#casting_lotid').text();

    var actcode_id = $('#Dialog_addafcasting_tblnew .add_pc_actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_addafcasting_tblnew #pc_remarks').text();


    var s_date = new Date($('#Dialog_addafcasting_tblnew #start_date_input_tblnew').val());
    var s_hr = $('#Dialog_addafcasting_tblnew #start_time_hr_input_tblnew').val();
    var s_min = $('#Dialog_addafcasting_tblnew #start_time_min_input_tblnew').val();



    var end_date = new Date($('#Dialog_addafcasting_tblnew #end_date_input_tblnew').val());
    var end_hr = $('#Dialog_addafcasting_tblnew #end_time_hr_input_tblnew').val();
    var end_min = $('#Dialog_addafcasting_tblnew #end_time_min_input_tblnew').val();


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
        url: afserverpath + '/AnodeFurnace/afcasting_tblnew_add/',
        data: {

            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_addafcasting_tblnew').dialog('close');

            alert('Data now added.');
            load_status_aflot($('#lotid').text());
            afcasting_tblnew_load();
            afcasting_tbl2new_load();
            load_cast_Act_cw1();
            load_cast_Act_cw2();

        }
    });
}


function afcasting_tblnew_load() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $('#afcasting_tbl1 td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/afcasting_tblnew_load/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);
                var lastdataflag = 0;
                var tbl_pc = $('#afcasting_tbl1');




                $('#afcasting_tbl1 tr:last').after('<tr id="' + value.AF_TimeLogId + '"><td class="border_color">'
                        + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                        + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                        + value.ActivityCodeName + '</td><td class="border_color">'
                        + value.ActivityDesc + '</td><td class="border_color">'
                        + hr + '.' + min + '</td><td class="border_color">'
                        + value.AF_TimeLog_Remarks + '</td>'
                        //<td id= "pcinsert_id'+ formatDate(value.AF_StartTimeVal) + '" class="select_disable_AF_act" onclick="insertmid_precast_act(' + value.AF_TimeLogId + ');return false;">Insert</td>
                        + '<td  id= "pcedit_id'
                        + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="edit_afcasting_tblnew_partial(' + value.AF_TimeLogId + ');return false;">Edit</td><td id="pcdel_id"  class="select_disable_AF_act" onclick="afcasting_tblnew_delete(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;">Delete</td></tr>'

                    );

            });

            var ids = new Array();
            $('#precasting_tbl tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#precasting_tbl tr[id="' + maxId + '"]').closest('tr').find('td#pcdel_id').css("visibility", "visible");


        }
    });

}

function afcasting_tblnew_delete(ActDesc, ActId_) {

    //if (end_date_validation()) {
    themsg = 'Are you sure you want to delete the Activity: ' + ActDesc + ' ?';

    var answer = confirm(themsg);

    if (answer) {
        $.ajax({
            url: serverpath + '/AnodeFurnace/delete_precast_act/',
            data: {
                actid: ActId_
            },
            type: 'POST',
            cache: false,
            success: function (data) {

                load_status_aflot($('#lotid').text());
                afcasting_tblnew_load();
                afcasting_tbl2new_load();
                load_cast_Act_cw1();
                load_cast_Act_cw2();
                $("#ckb_all").removeAttr("checked");
            }
        });
    }
    //}
}
function edit_afcasting_tblnew_partial(ActId_) {

    //if (end_date_validation()) {
    var partialview_link = serverpath + "/AnodeFurnace/edit_afcasting_tblnew_partial/?actid=" + ActId_;


    $('#Dialog_editafcasting_tblnew').load(partialview_link, function () {

        $(this).dialog('open');

    });
    //}
    return false;
}


$(document).on('change', '#Dialog_editafcasting_tblnew #start_date_input_editpcact', function () {

    validation_editcasting_tblnew();
});

$(document).on('change', '#Dialog_editafcasting_tblnew #start_time_hr_input_editpcact', function () {

    validation_editcasting_tblnew();
});

$(document).on('change', '#Dialog_editafcasting_tblnew #start_time_min_input_editpcact', function () {

    validation_editcasting_tblnew();
});

$(document).on('change', '#Dialog_editafcasting_tblnew #end_date_input_editpcact', function () {

    validation_editcasting_tblnew();
});

$(document).on('change', '#Dialog_editafcasting_tblnew #end_time_hr_input_editpcact', function () {

    validation_editcasting_tblnew();
});

$(document).on('change', '#Dialog_editafcasting_tblnew #end_time_min_input_editpcact', function () {

    validation_editcasting_tblnew();
});


$("#Dialog_editafcasting_tblnew #edit_precast_ok_btn").live('click', function () {

    save_editcastingtblnew();

});

function validation_editcasting_tblnew(codeid, dialogname) {

    var duration_time = $('#Dialog_editafcasting_tblnew #the_dur1').text();

    var s_date = new Date($('#Dialog_editafcasting_tblnew #start_date_input_editpcact').val());
    var s_hr = $('#Dialog_editafcasting_tblnew #start_time_hr_input_editpcact').val();
    var s_min = $('#Dialog_editafcasting_tblnew #start_time_min_input_editpcact').val();



    var e_date = new Date($('#Dialog_editafcasting_tblnew #end_date_input_editpcact').val());
    var end_hr = $('#Dialog_editafcasting_tblnew #end_time_hr_input_editpcact').val();
    var end_min = $('#Dialog_editafcasting_tblnew #end_time_min_input_editpcact').val();


    var lottext = $('#cfstarttitme_cycledetail').text();
    if (lottext == '' || lottext == '-') {
        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }

    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_editafcasting_tblnew #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_editafcasting_tblnew .act_add_code_input').val();
    var actduration_msg = $('#Dialog_editafcasting_tblnew #the_dur1').text();


    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." || actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_editafcasting_tblnew .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_editafcasting_tblnew #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_editafcasting_tblnew #edit_precast_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_editafcasting_tblnew #error_msg_time_pc_edit').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_editafcasting_tblnew #the_dur1').text('ERROR');
        $('#Dialog_editafcasting_tblnew #edit_precast_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_editafcasting_tblnew #error_msg_time_pc_edit').html('ERROR: <b>Start Time</b> is lesser than <b>Lot Start Time</b>.');
        $('#Dialog_editafcasting_tblnew #the_dur1').text('ERROR');
        $('#Dialog_editafcasting_tblnew #edit_precast_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_editafcasting_tblnew #error_code').html("");
        $('#Dialog_editafcasting_tblnew .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_editafcasting_tblnew #error_msg_time_pc_edit').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_editafcasting_tblnew #the_dur1').text(the_dur);
        $('#Dialog_editafcasting_tblnew #edit_precast_ok_btn').attr('disabled', false);


    }


}


function save_editcastingtblnew() {

    var pc_timelog_Id = $('#Dialog_editafcasting_tblnew #pc_timelog_Id').text();

    var aflotid = $('#casting_lotid').text();

    var actcode_id = $('#Dialog_editafcasting_tblnew .actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_editafcasting_tblnew #pc_remarks_edit').text();


    var s_date = new Date($('#Dialog_editafcasting_tblnew #start_date_input_editpcact').val());
    var s_hr = $('#Dialog_editafcasting_tblnew #start_time_hr_input_editpcact').val();
    var s_min = $('#Dialog_editafcasting_tblnew #start_time_min_input_editpcact').val();



    var end_date = new Date($('#Dialog_editafcasting_tblnew #end_date_input_editpcact').val());
    var end_hr = $('#Dialog_editafcasting_tblnew #end_time_hr_input_editpcact').val();
    var end_min = $('#Dialog_editafcasting_tblnew #end_time_min_input_editpcact').val();


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
        url: afserverpath + '/AnodeFurnace/save_edit_precast_act/',
        data: {

            pc_timelog_Id: pc_timelog_Id,
            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_editafcasting_tblnew').dialog('close');

            alert('Data now updated.');
            load_status_aflot($('#lotid').text());
            afcasting_tblnew_load();
            afcasting_tbl2new_load();
            load_cast_Act_cw1();
            load_cast_Act_cw2();

        }
    });

}

function afcasting_tbl2new_partial() {

    var aflotno = $('#cfcyclenum_cycledetail').text();


    //if (end_date_validation()) {
    var partialview_link1 = afserverpath + "/AnodeFurnace/afcasting_tbl2new_partial?aflotno=" + aflotno;;


    $('#Dialog_addafcasting_tbl2new').load(partialview_link1, function () {
        $(this).dialog('open');
    });
    //}
    return false;
}

//onkeyup input add activity code
$('#Dialog_addafcasting_tbl2new .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_addafcasting_tbl2new');

});

//onkeyup input add activity code
$('#Dialog_editafcasting_tbl2new .act_add_code_input').live('keyup', function () {

    var actcode_val = $(this).val();
    act_code_intel_af(actcode_val, '#Dialog_editafcasting_tbl2new');

});

$(document).on('change', '#Dialog_addafcasting_tbl2new #start_time_hr_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$(document).on('change', '#Dialog_addafcasting_tbl2new #start_time_min_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$(document).on('change', '#Dialog_addafcasting_tbl2new #start_date_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$(document).on('change', '#Dialog_addafcasting_tbl2new #end_time_hr_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$(document).on('change', '#Dialog_addafcasting_tbl2new #end_time_min_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$(document).on('change', '#Dialog_addafcasting_tbl2new #end_date_input_tbl2new', function () {

    validation_casting_tbl2new();
});

$("#add_castingtbl2new_ok_btn").live('click', function () {

    addcastingtbl2new();
});


function validation_casting_tbl2new(codeid, dialogname) {

    var duration_time = $('#Dialog_addafcasting_tbl2new #the_dur').text();

    var s_date = new Date($('#Dialog_addafcasting_tbl2new #start_date_input_tbl2new').val());
    var s_hr = $('#Dialog_addafcasting_tbl2new #start_time_hr_input_tbl2new').val();
    var s_min = $('#Dialog_addafcasting_tbl2new #start_time_min_input_tbl2new').val();



    var e_date = new Date($('#Dialog_addafcasting_tbl2new #end_date_input_tbl2new').val());
    var end_hr = $('#Dialog_addafcasting_tbl2new #end_time_hr_input_tbl2new').val();
    var end_min = $('#Dialog_addafcasting_tbl2new #end_time_min_input_tbl2new').val();

    //var lottext = $('#cfstarttitme_cycledetail').text();
    var lottext = $('#prevmax_stime').text();
    if (lottext == '' || lottext == '-') {
        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }

    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_addafcasting_tbl2new #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_addafcasting_tbl2new .act_add_code_input').val();
    var actduration_msg = $('#Dialog_addafcasting_tbl2new #the_dur').text();


    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." ||

actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_addafcasting_tbl2new .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_addafcasting_tbl2new #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_addafcasting_tbl2new #add_castingtbl2new_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_addafcasting_tbl2new #error_msg_time_pc').html('ERROR: <b>End Time</b> is lesserthan or equal to <b>Start Time</b>.');
        $('#Dialog_addafcasting_tbl2new #the_dur').text('ERROR');
        $('#Dialog_addafcasting_tbl2new #add_castingtbl2new_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date) {
        $('#Dialog_addafcasting_tbl2new #error_msg_time_pc').html('ERROR: <b>Start Time</b> is lesser than <b>previous time</b>.');
        $('#Dialog_addafcasting_tbl2new #the_dur').text('ERROR');
        $('#Dialog_addafcasting_tbl2new #add_castingtbl2new_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_addafcasting_tbl2new #error_code').html("");
        $('#Dialog_addafcasting_tbl2new .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_addafcasting_tbl2new #error_msg_time_pc').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_addafcasting_tbl2new #the_dur').text(the_dur);
        $('#Dialog_addafcasting_tbl2new #add_castingtbl2new_ok_btn').attr('disabled', false);
    }
}

function addcastingtbl2new() {

    var aflotid = $('#casting_lotid').text();

    var actcode_id = $('#Dialog_addafcasting_tbl2new .add_pc_actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_addafcasting_tbl2new #pc_remarks').text();


    var s_date = new Date($('#Dialog_addafcasting_tbl2new #start_date_input_tbl2new').val());
    var s_hr = $('#Dialog_addafcasting_tbl2new #start_time_hr_input_tbl2new').val();
    var s_min = $('#Dialog_addafcasting_tbl2new #start_time_min_input_tbl2new').val();



    var end_date = new Date($('#Dialog_addafcasting_tbl2new #end_date_input_tbl2new').val());
    var end_hr = $('#Dialog_addafcasting_tbl2new #end_time_hr_input_tbl2new').val();
    var end_min = $('#Dialog_addafcasting_tbl2new #end_time_min_input_tbl2new').val();


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
        url: afserverpath + '/AnodeFurnace/afcasting_tbl2new_add/',
        data: {

            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_addafcasting_tbl2new').dialog('close');

            alert('Data now added.');
            load_status_aflot($('#lotid').text());
            afcasting_tbl2new_load();
            afcasting_tblnew_load();
            load_cast_Act_cw1();
            load_cast_Act_cw2();
        }
    });
}

function afcasting_tbl2new_load() {

    var aflotno = $('#cfcyclenum_cycledetail').text();

    $('#afcasting_tbl2 td').parent().remove();

    $.ajax({
        url: serverpath + '/AnodeFurnace/afcasting_tbl2new_load/',

        data: {
            aflotno: aflotno
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var hr = Math.floor(value.Duration / 60);
                var min = (value.Duration % 60);
                var lastdataflag = 0;
                var tbl_pc = $('#afcasting_tbl2');

                $('#afcasting_tbl2 tr:last').after('<tr id="' + value.AF_TimeLogId + '"><td class="border_color">'
                        + formatDate(value.AF_StartTimeVal) + '</td><td class="border_color">'
                        + formatDate(value.AF_EndTimeVal) + '</td><td class="border_color">'
                        + value.ActivityCodeName + '</td><td class="border_color">'
                        + value.ActivityDesc + '</td><td class="border_color">'
                        + hr + '.' + min + '</td><td class="border_color">'
                        + value.AF_TimeLog_Remarks + '</td>'
                        //<td id= "pcinsert_id'+ formatDate(value.AF_StartTimeVal) + '" class="select_disable_AF_act" onclick="insertmid_precast_act(' + value.AF_TimeLogId + ');return false;">Insert</td>
                        + '<td  id= "pcedit_id'
                        + formatDate(value.AF_StartTimeVal) + '" class="select_edit_AF_act"  onclick="edit_afcasting_tbl2new_partial(' + value.AF_TimeLogId + ');return false;">Edit</td><td id="pcdel_id"  class="select_disable_AF_act" onclick="afcasting_tblnew_delete(\'' + value.ActivityDesc + '\',' + value.AF_TimeLogId + ');return false;">Delete</td></tr>'
                    );
            });
            var ids = new Array();
            $('#precasting_tbl tr:last').each(function () {
                (ids.push(parseInt($(this).attr('id'), 10)));
            });
            var maxId = Math.max.apply(null, ids);
            $('#precasting_tbl tr[id="' + maxId + '"]').closest('tr').find('td#pcdel_id').css("visibility", "visible");
        }
    });
}

function edit_afcasting_tbl2new_partial(ActId_) {

    //if (end_date_validation()) {
    var partialview_link = serverpath + "/AnodeFurnace/edit_afcasting_tbl2new_partial/?actid=" + ActId_;
    $('#Dialog_editafcasting_tbl2new').load(partialview_link, function () {
        $(this).dialog('open');
    });
    //}
    return false;
}

$(document).on('change', '#Dialog_editafcasting_tbl2new #start_date_input_editpcact2', function () {

    validation_editcasting_tbl2new();
});

$(document).on('change', '#Dialog_editafcasting_tbl2new #start_time_hr_input_editpcact', function () {

    validation_editcasting_tbl2new();
});

$(document).on('change', '#Dialog_editafcasting_tbl2new #start_time_min_input_editpcact', function () {

    validation_editcasting_tbl2new();
});

$(document).on('change', '#Dialog_editafcasting_tbl2new #end_date_input_editpcact2', function () {

    validation_editcasting_tbl2new();
});

$(document).on('change', '#Dialog_editafcasting_tbl2new #end_time_hr_input_editpcact', function () {

    validation_editcasting_tbl2new();
});

$(document).on('change', '#Dialog_editafcasting_tbl2new #end_time_min_input_editpcact', function () {

    validation_editcasting_tbl2new();
});


$("#Dialog_editafcasting_tbl2new #edit_precast_ok_btn").live('click', function () {

    save_editcastingtbl2new();

});

function validation_editcasting_tbl2new(codeid, dialogname) {

    var duration_time = $('#Dialog_editafcasting_tbl2new #the_dur1').text();

    var s_date = new Date($('#Dialog_editafcasting_tbl2new #start_date_input_editpcact2').val());
    var s_hr = $('#Dialog_editafcasting_tbl2new #start_time_hr_input_editpcact').val();
    var s_min = $('#Dialog_editafcasting_tbl2new #start_time_min_input_editpcact').val();



    var e_date = new Date($('#Dialog_editafcasting_tbl2new #end_date_input_editpcact2').val());
    var end_hr = $('#Dialog_editafcasting_tbl2new #end_time_hr_input_editpcact').val();
    var end_min = $('#Dialog_editafcasting_tbl2new #end_time_min_input_editpcact').val();


    //var lottext = $('#cfstarttitme_cycledetail').text();
    var lottext = $('#prevmax_stime').text();
    if (lottext == '' || lottext == '-') {
        var sdf_date = new Date('01/01/1900');
        lot_date = sdf_date.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params = lottext.split(" ");
        var ld = params[0];
        var sp = ld.split("-");
        var lotdate = new Date(sp[0] + '/' + sp[1] + '/' + sp[2]);

        var lottime = params[1];
        var paramss = lottime.split(':');
        var lothr = paramss[0];
        var lotmin = paramss[1];

        lot_date = lotdate.add({
            minutes: lotmin,
            hours: lothr
        });

    }

    //get_current_log starttime
    var lottext_ = $('#static_starttime').text();
    if (lottext_ == '' || lottext_ == '-') {
        var sdf_date_ = new Date('01/01/1900');
        lot_date_ = sdf_date_.add({
            minutes: 00,
            hours: 00
        });
    } else {
        var params_ = lottext_.split(" ");
        var ld_ = params_[0];
        var sp_ = ld_.split("-");
        var lotdate_ = new Date(sp_[0] + '/' + sp_[1] + '/' + sp_[2]);

        var lottime_ = params_[1];
        var paramss_ = lottime_.split(':');
        var lothr_ = paramss_[0];
        var lotmin_ = paramss_[1];

        lot_date_ = lotdate_.add({
            minutes: lotmin_,
            hours: lothr_
        });

    }

    start_date = s_date.add({
        minutes: s_min,
        hours: s_hr
    });



    end_date = e_date.add({
        minutes: end_min,
        hours: end_hr
    });

    var dur = Math.floor((end_date - start_date) / 60000);
    var h = Math.floor(dur / 60);
    var m = dur % 60;
    var the_dur = (h + '.' + m);



    var actcodedesc_msg = $('#Dialog_editafcasting_tbl2new #Act_Desc_div').text();
    var actcode_msg = $('#Dialog_editafcasting_tbl2new .act_add_code_input').val();
    var actduration_msg = $('#Dialog_editafcasting_tbl2new #the_dur1').text();


    if (codeid == '' || codeid == 0 || codeid == '-' || actcodedesc_msg == "Invalid Code." ||

actcodedesc_msg == '-' || actcodedesc_msg == 'Invalid Code.Invalid Code.' || actcode_msg == "") {

        $('#Dialog_editafcasting_tbl2new .act_add_code_input').css('background-color', '#FFA8A8');
        $('#Dialog_editafcasting_tbl2new #error_code').html("Please input a correct Activity Code.");
        $('#Dialog_editafcasting_tbl2new #edit_precast_ok_btn').attr('disabled', true);


    } else if (end_date <= start_date || start_date >= end_date || the_dur == 0) {
        $('#Dialog_editafcasting_tbl2new #error_msg_time_pc_edit').html('ERROR: <b>End Time</b> is lesser than or equal to <b>Start Time</b>.');
        $('#Dialog_editafcasting_tbl2new #the_dur1').text('ERROR');
        $('#Dialog_editafcasting_tbl2new #edit_precast_ok_btn').attr('disabled', true);

    } else if (start_date < lot_date && start_date < lot_date_) {
        $('#Dialog_editafcasting_tbl2new #error_msg_time_pc_edit').html('ERROR: <b>Start Time</b> is lesser than <b>previous time</b>.');
        $('#Dialog_editafcasting_tbl2new #the_dur1').text('ERROR');
        $('#Dialog_editafcasting_tbl2new #edit_precast_ok_btn').attr('disabled', true);

    } else {
        $('#Dialog_editafcasting_tbl2new #error_code').html("");
        $('#Dialog_editafcasting_tbl2new .act_add_code_input').css('background-color', '#FFFFCC');
        $('#Dialog_editafcasting_tbl2new #error_msg_time_pc_edit').html('Correct: <b>Time</b> is Good.');
        $('#Dialog_editafcasting_tbl2new #the_dur1').text(the_dur);
        $('#Dialog_editafcasting_tbl2new #edit_precast_ok_btn').attr('disabled', false);
    }
}


function save_editcastingtbl2new() {

    var pc_timelog_Id = $('#Dialog_editafcasting_tbl2new #pc_timelog_Id').text();

    var aflotid = $('#casting_lotid').text();

    var actcode_id = $('#Dialog_editafcasting_tbl2new .actcode_id').text();
    var wheelid = 0;
    var pc_remarks = $('#Dialog_editafcasting_tbl2new #pc_remarks_edit').text();


    var s_date = new Date($('#Dialog_editafcasting_tbl2new #start_date_input_editpcact2').val());
    var s_hr = $('#Dialog_editafcasting_tbl2new #start_time_hr_input_editpcact').val();
    var s_min = $('#Dialog_editafcasting_tbl2new #start_time_min_input_editpcact').val();



    var end_date = new Date($('#Dialog_editafcasting_tbl2new #end_date_input_editpcact2').val());
    var end_hr = $('#Dialog_editafcasting_tbl2new #end_time_hr_input_editpcact').val();
    var end_min = $('#Dialog_editafcasting_tbl2new #end_time_min_input_editpcact').val();


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
        url: afserverpath + '/AnodeFurnace/save_edit_precast_act/',
        data: {

            pc_timelog_Id: pc_timelog_Id,
            aflotid_: aflotid,
            start_date: start_date,
            end_date: end_date,
            actcode_id: actcode_id,
            wheelid: wheelid,
            pc_remarks: pc_remarks
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#Dialog_editafcasting_tbl2new').dialog('close');

            alert('Data now updated.');
            load_status_aflot($('#lotid').text());
            afcasting_tbl2new_load();
            afcasting_tblnew_load();
            load_cast_Act_cw1();
            load_cast_Act_cw2();

        }
    });

}

function check_disabled(id) {

    if (id > 0) {
        $('#Dialog_AddAF #start_date_input').attr('disabled', true);
        $('#Dialog_AddAF #start_time_hr_input').attr('disabled', true);
        $('#Dialog_AddAF #start_time_min_input').attr('disabled', true);
        $('#Dialog_AddAF #start_date_input').datepicker('disable');
    } else {

        $('#Dialog_AddAF #start_date_input').attr('disabled', false);
        $('#Dialog_AddAF #start_time_hr_input').attr('disabled', false);
        $('#Dialog_AddAF #start_time_min_input').attr('disabled', false);
    }
}


function check_disabled_cast1(id) {

    if (id > 0) {
        $('#Dialog_addcasting #start_date_input_cast').attr('disabled', true);
        $('#Dialog_addcasting #start_time_hr_input_cast').attr('disabled', true);
        $('#Dialog_addcasting #start_time_min_input_cast').attr('disabled', true);
        $('#Dialog_addcasting #start_date_input_cast').datepicker('disable');
    } else {

        $('#Dialog_addcasting #start_date_input_cast').attr('disabled', false);
        $('#Dialog_addcasting #start_time_hr_input_cast').attr('disabled', false);
        $('#Dialog_addcasting #start_time_min_input_cast').attr('disabled', false);
    }
}

function check_disabled_cast2(id) {

    if (id > 0) {
        $('#Dialog_addcasting2 #start_date_input_cast2').attr('disabled', true);
        $('#Dialog_addcasting2 #start_time_hr_input_cast').attr('disabled', true);
        $('#Dialog_addcasting2 #start_time_min_input_cast').attr('disabled', true);
        $('#Dialog_addcasting2 #start_date_input_cast2').datepicker('disable');
    } else {

        $('#Dialog_addcasting2 #start_date_input_cast2').attr('disabled', false);
        $('#Dialog_addcasting2 #start_time_hr_input_cast').attr('disabled', false);
        $('#Dialog_addcasting2 #start_time_min_input_cast').attr('disabled', false);
    }
}


function qig_customer_new1() {

    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#cw1_cust_ddl_hidden').val(0);
    //$('#cw1_cust_ddl_hidden').append("<option value = '0'>-</option>");

    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_customer_new1/',
        data: {
            aflotid: aflotid_,
            //afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var custid1 = value.custid1 == null ? "0" : value.custid1;
                var cust_cw1 = value.cust_cw1 == null ? "-" : value.cust_cw1;

                //$('#cw1_cust_ddl_hidden').append('<option  value =' + custid1 + '>' + cust_cw1 + '</option>');
                $('#cw1_cust_ddl_hidden').val(custid1);

            });
        }
    });
}

function qig_customer_new2() {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#cw1_cust_othr_ddl_hidden').val(0);
    //$('#cw1_cust_othr_ddl_hidden').append("<option value = '0'>-</option>");

    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_customer_new2/',
        data: {
            aflotid: aflotid_,
            //afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var custid11 = value.custid11 == null ? "0" : value.custid11;
                var cust_cw11 = value.cust_cw11 == null ? "-" : value.cust_cw11;

                //$('#cw1_cust_othr_ddl_hidden').append('<option  value =' + custid11 + '>' + cust_cw11 + '</option>');
                $('#cw1_cust_othr_ddl_hidden').val(custid11);
            });
        }
    });
}
function qig_customer_new3() {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#cw2_cust_ddl_hidden').val(0);
    //$('#cw2_cust_ddl_hidden').append("<option value = '0'>-</option>");

    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_customer_new3/',
        data: {
            aflotid: aflotid_,
            //afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var custid2 = value.custid2 == null ? "0" : value.custid2;
                var cust_cw2 = value.cust_cw2 == null ? "-" : value.cust_cw2;

                //$('#cw2_cust_ddl_hidden').append('<option  value =' + custid2 + '>' + cust_cw2 + '</option>');
                $('#cw2_cust_ddl_hidden').val(custid2);

            });
        }
    });
}
function qig_customer_new4() {
    var aflotid_ = $('#aflot_ddl').val();
    var afdate_ = $('#af_qig_date').val();

    $('#cw2_cust_othr_ddl_hidden').val(0);
    //$('#cw2_cust_othr_ddl_hidden').append("<option value = '0'>-</option>");

    $.ajax({
        url: afserverpath + '/AnodeFurnace/qig_customer_new4/',
        data: {
            aflotid: aflotid_,
            //afdate: afdate_
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                var custid22 = value.custid22 == null ? "0" : value.custid22;
                var cust_cw22 = value.cust_cw22 == null ? "-" : value.cust_cw22;

                //$('#cw2_cust_othr_ddl_hidden').append('<option  value =' + custid22 + '>' + cust_cw22 + '</option>');
                $('#cw2_cust_othr_ddl_hidden').val(custid22);
            });
        }
    });
}

function mould_modification(id) {

    $('#div_mould_modify').show();
    $('#mcode_id').text(id);
    var m_edit = '#m_id_' + id;

    var mcode = $(m_edit).closest('tr').find('td#mcode_').text();
    var mstat = $(m_edit).closest('tr').find('td#mstat_').text();


    $('#mcode').text(mcode);
    $('#slect_stat').append('<option value="100">Inactive</option><option value="200">Active</option>');

    var slect = $('#slect_stat');

    if (mstat == 'Inactive') {
        var options = $('select#slect_stat option');
        var arr = options.map(function (_, o) {
            return {
                t: $(o).text(),
                v: o.value
            };
        }).get();
        arr.sort(function (o1, o2) {
            return o1.t < o2.t ? 1 : o1.t > o2.t ? -1 : 0;
        });
        options.each(function (i, o) {
            console.log(i);
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });

    } else if (mstat == 'Active') {
        var options = $('select#slect_stat option');
        var arr = options.map(function (_, o) {
            return {
                t: $(o).text(),
                v: o.value
            };
        }).get();
        arr.sort(function (o1, o2) {
            return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
        });
        options.each(function (i, o) {
            console.log(i);
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });
    }

    //remove duplicate data in selectbox
    var usedNames = {};
    $("#slect_stat > option").each(function () {
        if (usedNames[this.value]) {
            $(this).remove();
        } else {
            usedNames[this.value] = this.text;
        }
    });
}

function save_mould_modification() {


    var lotid = $('#l_list').val();
    var custid = $('#c_list').val();
    var stat = $("#slect_stat option:selected").text();
    var mcode = $('#mcode').text();
    var mcode_id = $('#mcode_id').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/save_mould_modification',
        data: {

            lotid: lotid,
            custid: custid,
            mcode: mcode,
            mcode_id: mcode_id,
            stat: stat
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $('#div_mould_modify').hide();
            alert('Data now saved.');

            //load saved data
            ddactive_af_casting('AF_PreCasting'); return false;
            load_mould_save();
            //addmould_partial();
        }
    });

}

function delete_mould(stat, id) {

    if (stat == 'Active') {

        alert('Mould is still Active.');
    } else {
        var answer = confirm('Are you sure you want to delete this?');

        if (answer) {

            $.ajax({
                url: afserverpath + '/AnodeFurnace/delete_mould_modification/',
                data: {
                    mcode_id: id
                },

                type: 'POST',
                cache: false,
                success: function (data) {

                    alert('Data now Deleted.');
                    ddactive_af_casting('AF_PreCasting'); return false
                    load_mould_save();
                }
            });
        }
    }

}

function load_afmanpowerlot() {
    //disabled();
    clear_value();
    clear_css();
    var lotid_ = $('#lotid').text();

    $.ajax({
        url: serverpath + '/AnodeFurnace/Select_AFManPowerLot/',
        data: {
            lotid: lotid_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                //$('#NewAFList_roletypeid_2').val(value.AF_shiftId);
                $('#NewAFList_roletypeid_' + value.AF_RoleTypeId).val(value.AF_EmpId);
                check_manpower_select();
            });

        }
    });
}


$('#newaf_manpowerlot_btn').live('click', function () {
    af_savemanpowerlot();
});
$('#newsave_manpowerlot_link').live('click', function () {
    af_savemanpowerlot();
});

function af_savemanpowerlot() {
    var lotid_ = $('#lotid').text();
    //var roletypeid_ = $('#NewAFList_roletypeid_2').val();

    $.ajax({
        url: serverpath + '/AnodeFurnace/Delete_AFManpowerLot/',
        data: {
            lotid: lotid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var items = [];

            $('#newaf_manpower_table select[id*="NewAFList_roletypeid_"]').each(function () {
                var attrid = $(this).attr('id');

                var roletypeid_ = attrid.replace('NewAFList_roletypeid_', '');
                var empid_ = $(this).val();

                items.push({
                    lotid: lotid_,
                    roletypeid: roletypeid_,
                    empid: empid_,
                });
            });

            if (items.length != 0) {
                items = JSON.stringify({ 'items': items })

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    url: afserverpath + '/AnodeFurnace/Save_AFManpowerLot/',
                    data: items,
                    success: function (data) {

                        alert('Manpower are now saved.');

                        check_manpower_select();

                    }
                });
            }
            else
                alert('No changes were made.');
        }
    });

}

$('#afmanpower_reset_btn').live('click', function () {
    clear_value();
    clear_css();
});

$('.act_code_desc_td_afcast').live('click', function () {

    var actcode_val = $(this).closest('td').prev('td').text();
    var af_val = $(this).closest('td').next('td').next('td').next('td').text();
    var cf_val = $(this).closest('td').next('td').next('td').text();
    var fsfe_val = $(this).closest('td').next('td').text();

    //var af_val = $(this).closest('td').next('td').next('td').text();
    //var cf_val = $(this).closest('td').prev('td').prev('td').prev('td').text();
    //var fsfe_val = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();

    var dialogparent = $(this).closest('div.ui-dialog-content').attr('id');

    afact_code_intel(actcode_val, '#' + dialogparent);



    $('#act_code_table td').css('background', '#FFFFFF');
    $('#act_code_table td').css('font-style', 'normal');


    $(this).css('background', '#FFFF99');
    $(this).css('font-style', 'italic');

    $(this).closest('td').prev('td').css('background', '#FFFF99');
    $(this).closest('td').prev('td').css('font-style', 'italic');

});

$('#tw_1').keyup(function () {
    compper1($(this).attr('id'));
});

$('#tw_2').keyup(function () {
    compper1($(this).attr('id'));
});

$('#tw_3').keyup(function () {
    compper2($(this).attr('id'));
});

$('#tw_4').keyup(function () {
    compper2($(this).attr('id'));
});

var id_val = 0;
var cast1cust = 0;
var cast2cust = 0;
function compper1(id) {

    if (id == 'tw_1') {
        cast1cust = $('#tw_1').val() == "" ? 0 : $('#tw_1').val();
        cast2cust = $('#tw_2').val() == "" ? 0 : $('#tw_2').val();
    }
    if (id == 'tw_2') {
        cast2cust = $('#tw_2').val() == "" ? 0 : $('#tw_2').val();
        cast1cust = $('#tw_1').val() == "" ? 0 : $('#tw_1').val();
    }

    id_val = parseFloat(cast1cust) + parseFloat(cast2cust);
    var totalcast1 = id_val == 0 ? "" : id_val;
    $('#paramid_1628').val(totalcast1);
}

var id_val2 = 0;
var cast3cust = 0;
var cast4cust = 0;
function compper2(id) {

    if (id == 'tw_3') {
        cast3cust = $('#tw_3').val() == "" ? 0 : $('#tw_3').val();
        cast4cust = $('#tw_4').val() == "" ? 0 : $('#tw_4').val();
    }
    if (id == 'tw_4') {
        cast3cust = $('#tw_3').val() == "" ? 0 : $('#tw_3').val();
        cast4cust = $('#tw_4').val() == "" ? 0 : $('#tw_4').val();
    }

    id_val2 = parseFloat(cast3cust) + parseFloat(cast4cust);
    var totalcast2 = id_val2 == 0 ? "" : id_val2;
    $('#paramid_1629').val(totalcast2);
}

function load_default_proddate($this_id) {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();
    $('#af_qig_date').val(output);

    $.ajax({

        url: afserverpath + '/AnodeFurnace/load_default_proddate/',
        data: {
            lot_id: $this_id
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $('#af_qig_date').val(formatDate_only(data.CastingStartTime));
        }
    });

}

function load_twc_keyup() {

    var cast11cust = $('#tw_1').val() == "" ? 0 : $('#tw_1').val();
    var cast22cust = $('#tw_2').val() == "" ? 0 : $('#tw_2').val();
    var total_1122 = parseFloat(cast11cust) + parseFloat(cast22cust);
    $('#paramid_1628').val(total_1122 == 0 ? "" : total_1122);


    var cast33cust = $('#tw_3').val() == "" ? 0 : $('#tw_3').val();
    var cast44cust = $('#tw_4').val() == "" ? 0 : $('#tw_4').val();
    var total_3344 = parseFloat(cast33cust) + parseFloat(cast33cust);
    $('#paramid_1629').val(total_3344 == 0 ? "" : total_3344);
}

function navigate_input_with_arrow_keys() {

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
    });

}

function copy_casting_act(ActId_) {


    //if (end_date_validation()) {
    var partialview_link = serverpath + "/AnodeFurnace/copy_casting_act/?actid=" + ActId_;
    $('#Dialog_editcasting').load(partialview_link, function () {

        alert('Data successfully copied.');
        load_status_aflot($('#lotid').text());
        load_cast_Act_cw1();
        load_cast_Act_cw2();
        afcasting_tbl2new_load();
        afcasting_tblnew_load();

    });
    //}
    return false;
}

function aflot_status_change() {
    for (var x = 2; x <= 6; x++) {
        $("#afstatus_ddl option[value=" + x + "]").remove();
    }
}

function save_mouldreplace() {

    var aflotid = $('#lotid').text();

    var items = [];

    $('#aflogsheet_mouldres').find('input[id*="mres_"].changed,select[id*="mres_"].changed').each(function () {

        var attrid = $(this).attr('id');
        var strValue = attrid.replace('mres_', '');
        var params = strValue.split("_");

        if (params[2] == 'S') {

            var afwheelnum = params[0];
            var inputid = $(this).closest('td').prev('td').find('input').attr('id')
            var mr_reason_id_ = $(this).val();

            if ($("#" + inputid).prop('checked') == true) {

                var afmouldnum = params[1];
                var check = 1;
                var input_flag = 1;

            } else {
                var afmouldnum = params[1];
                var check = 0;
                var input_flag = 0;
            }

            if (afwheelnum == 1) {
                var custid = $('#MC_1593').val();
            } else {
                var custid = $('#MC_1595').val();
            }

        } else {

            var mr_reason_id_ = $(this).closest('td').next('td').find('select').val();

            var afwheelnum = params[0];

            if ($(this).prop('checked') == true) {

                var afmouldnum = params[1];
                var check = 1;


            } else {

                var afmouldnum = params[1];
                var check = 0;

            }
            if (afwheelnum == 2) {
                var custid = $('#MC_1595').val();
            } else {
                var custid = $('#MC_1593').val();
            }
        }


        items.push({
            aflotid: aflotid,
            afwheelnum: afwheelnum,
            afmouldnum: afmouldnum,
            afreasonId: mr_reason_id_,
            mres_custid: custid,
            check: check
        });
    });

    if (items.length != 0) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: afserverpath + '/AnodeFurnace/save_mouldreplace',

            data: items,

            success: function (data) {

                alert('Changes in Mould Replacement now saved.');

                //load saved data
                ddactive_af_casting('AF_PreCasting'); return false;
                load_mouldreplace();
                load_clear_css_mouldreplace();
            },
            error: function (data) {
                alert('Changes in Mould Replacement now saved.');
                //load saved data
                ddactive_af_casting('AF_PreCasting'); return false;
                load_mouldreplace();
                load_clear_css_mouldreplace();
            },
        });
    }
}
function load_clear_css_mouldreplace() {
    $('#aflogsheet_condem_mould input,#aflogsheet_condem_mould select,#aflogsheet_condem_mould td').each(function () {
        //$(this).css('background-color', '#ffffff');
        $(this).removeClass('changed');
    });
}

function load_mouldreplace() {

    var aflotid = $('#lotid').text();

    $.ajax({
        url: afserverpath + '/AnodeFurnace/load_mouldreplace/',
        data: {
            aflotid: aflotid
        },

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {

                $("#mres_" + value.AF_CastingWheel + "_" + value.AF_MouldPosition + "").prop('checked', true);
                $("#mres_" + value.AF_CastingWheel + "_" + value.AF_MouldPosition + "_S").val(value.AF_MouldReplacement_ReasonId);

                $('input.extratbl_input').prop(function () {

                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('changed');
                    $(this).removeClass('cw2');
                    $(this).removeClass('cw1');

                    if ($(this).prop('checked') == true) {

                        $(this).addClass('changed');

                    } else {

                        $(this).removeClass('changed');
                    }

                });
            });
        }
    });
}

$(document).ajaxStart(function () {
    Pace.restart();
});

//Buttons
$('#add_afactivity_btn').on('click', function () {
    var partialview_link = serverpath + "/AnodeFurnace/AF_ActCode_Add_Partial";

    $('#DialogAFActivity_Add').load(partialview_link, function () {
        $(this).dialog('open');
    });
});

function edit_afactivity(dataid) {
    var partialview_link = serverpath + "/AnodeFurnace/AF_ActCode_Edit_Partial/?AF_ActivityId=" + dataid;

    $('#DialogAFActivity_Edit').load(partialview_link, function () {
        $(this).dialog('open');
    });
}

//var serverpath = "";
function reloadData() {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: serverpath + '/AnodeFurnace/getData',
        success: function (data) {

            $('#AF_ActivityCode_Table>tbody').html('');

            var DOMCards = '';

            $.each(data, function myfunction(index, item) {
                DOMCards += '<tr>';
                DOMCards += '<td>' + (index + 1) + '</td>';
                DOMCards += '<td>' + item.AF_ActivityCodeName + '</td>';
                DOMCards += '<td>' + item.AF_ActivityDesc + '</td>';
                DOMCards += '<td>' + item.AF_ActivityCodeTypeName + '</td>';
                DOMCards += '<td>' + '<input type="button" onclick="edit_afactivity(' + item.AF_ActivityCodeId + ')" id="edit_afactivity_btn" value="Edit" />' + '</td>';
                DOMCards += '</tr>';

            });

            $('#AF_ActivityCode_Table>tbody').html(DOMCards);
        },


    });
}

$(document).ready(function () {
    reloadData();
});

//Saving Data to Database
function add_activity_btn() {

    var actcode_ = $('#actcode_input').val();
    var actdesc_ = $('#actdesc_input').val();
    var acttypeid_ = $('#activitytype_input').val();

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: serverpath + '/AnodeFurnace/addActivity',
        data: JSON.stringify({
            actcode: actcode_,
            actdesc: actdesc_,
            acttypeid: acttypeid_
        }),
        success: function (data) {
            alert("Success");
            reloadData();
            $('#DialogAFActivity_Add').dialog('close')
        },

        error: function () {
            alert("error");
        },


    });
}

//Update Data to Database
function edit_activity_btn() {

    var actcode_ = $('#actName_Edit').val();
    var actdesc_ = $('#actDesc_Edit').val();
    var acttypeid_ = $('#activitytype_input2').val();
    var actId_ = $('#actcId').val();

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: serverpath + '/AnodeFurnace/editActivity',
        data: JSON.stringify({
            actcode: actcode_,
            actdesc: actdesc_,
            acttypeid: acttypeid_,
            actcId: actId_
        }),
        success: function (data) {
            alert("Success");
            reloadData();
            $('#DialogAFActivity_Edit').dialog('close')
        },

        error: function () {
            alert("error");
        },


    });
}

//copy checkbok------>
function check_prop(id) {

    if ($("input[name*='datarowcheck_']").length == $("input[name*='datarowcheck_']:checked").length) {
        $("#ckb_all").prop("checked", "checked");
    } else {
        $("#ckb_all").removeAttr("checked");
    }
    return id;
}
//save selected row from the textbox using row------>
function save_copycheckbox() {
    var ids = new Array();

    $('#aftable_cast2 tr:last').each(function () {
        (ids.push(parseInt($(this).attr('id'), 10)));
    });
    var maxId = Math.max.apply(null, ids);
    var countid = $('#aftable_cast2 tbody > tr').length - 1;
    //get cw1_datestart and cw2_dateend
    if (countid == 0) {
        var items = [];
        $('#aftable_cast1').find("input[name*='datarowcheck_']:checked").each(function () {

            var attrid = $(this).attr('name');
            var strValue = attrid.replace('datarowcheck_', '');
            var params = strValue.split("_");
            var id_ck = params[0];
            items.push({
                id_ck: id_ck,
            });
        });

        if (items.length != 0) {

            items = JSON.stringify({ 'items': items });

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: afserverpath + '/AnodeFurnace/save_copycheckbox1',
                data: items,
                success: function (data) {
                    alert("Data has been copied!");
                    load_cast_Act_cw1();
                    load_cast_Act_cw2();
                    //load saved data       
                },

            });
        }
        } else if (countid > 0) {
            var items = [];
            $('#aftable_cast1').find("input[name*='datarowcheck_']:checked").each(function () {

                var attrid = $(this).attr('name');
                var strValue = attrid.replace('datarowcheck_', '');
                var params = strValue.split("_");
                var id_ck = params[0];
                items.push({
                    id_ck: id_ck,
                });
            });

            if (items.length != 0) {

                items = JSON.stringify({ 'items': items });

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: afserverpath + '/AnodeFurnace/save_copycheckbox2',
                    data: items,
                    success: function (data) {
                        $("#ckb_all").removeAttr("checked");
                        load_cast_Act_cw1();
                        load_cast_Act_cw2();
                        //load saved data                   
                    },
                    error: function (data) {
                        alert(data.responseText);
                        $("#ckb_all").removeAttr("checked");
                        load_cast_Act_cw1();
                        load_cast_Act_cw2();
                    }         
                });
            }

        }
    }
