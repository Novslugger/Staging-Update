var serverpath = "";
//var serverpath = "/PASAROperation";

//(function ($) {
//    $.extend({
//        spin: function (spin, opts) {

//            if (opts === undefined) {
//                opts = {
//                    lines: 13, // The number of lines to draw
//                    length: 20, // The length of each line
//                    width: 10, // The line thickness
//                    radius: 30, // The radius of the inner circle
//                    scale: 0.25,//
//                    corners: 1, // Corner roundness (0..1)
//                    rotate: 0, // The rotation offset
//                    direction: 1, // 1: clockwise, -1: counterclockwise
//                    color: '#000', // #rgb or #rrggbb or array of colors
//                    speed: 1, // Rounds per second
//                    trail: 56, // Afterglow percentage
//                    shadow: false, // Whether to render a shadow
//                    hwaccel: false, // Whether to use hardware acceleration
//                    className: 'spinner', // The CSS class to assign to the spinner
//                    zIndex: 2e9, // The z-index (defaults to 2000000000)
//                    top: '50%', // Top position relative to parent
//                    left: '50%' // Left position relative to parent
//                
//            }

//            var data = $('.tabs-content').data();

//            if (data.spinner) {
//                data.spinner.stop();
//                delete data.spinner;
//                $("#spinner_modal").remove();
//                return this;
//            

//            if (spin) {

//                var spinElem = this;

//                $('.tabs-content').append('<div id="spinner_modal" style="background-color: rgba(0, 0, 0, 0.3); width:100%; height:100%; position:absolute; top:0px; left:0px; z-index:' + (opts.zIndex - 1) + '"/>');
//                spinElem = $("#spinner_modal")[0];

//                data.spinner = new Spinner($.extend({
//                    color: $('.tabs-content').css('color')
//                }, opts)).spin(spinElem);
//            }

//        }
//    });
//})(jQuery);

//$('#fsfe_shiftdate').live('change', function () {
//    var date = $('#fsfe_shiftdate').val();
//    load_actual_graph(date);
//});

function IsCF(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode == 99 || charCode == 115 || charCode == 49 || charCode == 50 || charCode == 51 || charCode == 120) {
        return true;
    }
    return false;
}

function IsAF(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode == 99 || charCode == 97 || charCode == 114 || charCode == 49 || charCode == 50 || charCode == 51 || charCode == 120) {
        return true;
    }
    return false;
}


function ddactive_spp(partialv_name) {
    //$.spin('true');
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/smeltplan_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            //$.spin('false');
            $('#htab-panel1').html(result);
        }
    });

}

function addinput() {
    $('td[id*="paramid_1_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="feed_rate_input" onkeypress="return NumericOnly(event)"/>');
    });
    $('td[id*="paramid_2_"]').each(function () {
        $(this).append('<input type="text" id="matte_lvl_input" disabled="disabled" style="background: transparent !important; width: 100%;"/>');
    });
    $('td[id*="paramid_3_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="laddle_input" onkeypress="return NumericOnly(event)"/>');
    });
    $('td[id*="paramid_9_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="cf1_input" onkeypress="return IsCF(event)"/>');
    });
    $('td[id*="paramid_10_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="cf2_input" onkeypress="return IsCF(event)"/>');
    });
    $('td[id*="paramid_11_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="cf3_input" onkeypress="return IsCF(event)"/>');
    });
    $('td[id*="paramid_12_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="cf4_input" onkeypress="return IsCF(event)"/>');
    });
    $('td[id*="paramid_14_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="af1_input" onkeypress="return IsAF(event)"/>');
    });
    $('td[id*="paramid_15_"]:not(:last-child)').each(function () {
        $(this).append('<input type="text" id="af2_input" onkeypress="return IsAF(event)"/>');
    });
    $('td[id*="paramid_23_"]').each(function () {
        $(this).append('<input type="text" id="crane1_input"/>');
    });
    $('td[id*="paramid_24_"]').each(function () {
        $(this).append('<input type="text" id="crane2_input"/>');
    });
    //$('td[id*="target"]').each(function () {
    //    $(this).append('<input type="text" id="target_input" onkeypress="return NumericOnly(event)"/>');
    //});
}

$('#feedrate_btn').live('click', function () {
    var feed = $('.feedrate_auto input').val();
    $('#spp_data_tbl td[id*="paramid_1_"]:not(:last-child)').find('input').each(function () {
        $(this).val(feed);
        if ($(this).val() != "") {
            calculate_Matte_lvl(feed, $(this).parent());
            calculate_threshold(feed, $(this));
        }
    });
});

$('#matte_lvl_btn').live('click', function () {
    $('#spp_data_tbl td[id*="paramid_1_"]:not(:last-child)').find('input').each(function () {
        if ($(this).val() != "") {
            calculate_Matte_lvl($(this).val(), $(this).parent());
        }
    });
    generate_daily_targets();
    generate_plan_parameters();
});

function check_limit_bulk(input, dom) {
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

function check_limit(input, dom) {
    var isValid = true;
    var count = 0;

    var isBreak = false;
    var $this = dom;

    //check previous cells
    while (!isBreak) {
        var $prev_td = $this.closest('td').prev('td');
        var prev_td_val = $prev_td.find('input').val();
        if (prev_td_val == input) {
            count++;
            $this = $prev_td;
        }
        else {
            isBreak = true;
        }
    }

    isBreak = false;
    $this = dom;

    //check next cells
    while (!isBreak) {
        var $next_td = $this.closest('td').next('td');
        var next_td_val = $next_td.find('input').val();
        if (next_td_val == input) {
            count++;
            $this = $next_td;
        }
        else {
            isBreak = true;
        }
    }

    switch (input) {
        case "c":
            if (count >= 17)
                isValid = false;
            break;
        case "r":
            if (count >= 20)
                isValid = false;
            break;
        case "ca":
            if (count >= 20)
                isValid = false;
            break;
    }

    return isValid;
}

function check_refining() {

}

function check_casting() {

}

function check_input_cf(input, dom) {
    switch (input) {
        case "s":
            dom.addClass('s_class');
            //dom.css({ "background": "yellow !important" });
            dom.val('s');
            break;
        case "s1":
            //dom.closest('td').next('td').find('input').val('s').css({ "background": "yellow !important" }).closest('td').next('td').find('input').val('s').css({ "background": "yellow !important" });
            dom.closest('td').next('td').find('input').val('s').addClass('s_class').closest('td').next('td').find('input').val('s').addClass('s_class');
            dom.val('s');
            break;
        case "s2":
            //dom.closest('td').next('td').find('input').val('s').css({ "background": "yellow !important" })
            dom.closest('td').next('td').find('input').val('s').addClass('s_class');
            dom.val('s');
            break;
        case "c":
            var isValid = check_limit(input, dom);
            //dom.css({ "background": "orange !important" });
            if (isValid == true) {
                dom.addClass('c_class');
                dom.val('c');
            } else {
                alert("ERROR: Maximum consecutive number of blocks(17) will exceed.");
                dom.val('');
            }
            break;
        case "c1":
            var isValid = check_limit_bulk(input, dom);
            if (isValid == true) {
                dom.val('c');
                for (i = 0; i < 15; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('c');
                        $(this).addClass('c_class');
                        dom = $(this);
                    });
                }
            } else {
                alert("ERROR: Maximum consecutive number of blocks(17) will exceed.");
                dom.removeClass('c_class');
                dom.val('');
            }
            break;
        case "":
            dom.val('');
            dom.removeClass();
            break;
        default:
            if (input.indexOf('x3') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x2') > -1) {
                dom.closest('td').next('td').find('input').val('').removeClass().closest('td').next('td').find('input').val('').removeClass();
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x1') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
                for (i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('');
                        $(this).removeClass();
                        //$(this).css({ "background": "white !important" });
                        dom = $(this);
                    });
                }
            }
            break;
    }
    var attrid = dom.parent().attr('id');
    var paramid = attrid.replace('paramid_', '');

    cf_count_target(paramid);
}

function check_input_af(input, dom) {
    switch (input) {
        case "r":
            var isValid = check_limit(input, dom);
            if (isValid == true) {
                dom.addClass('r_class');
                dom.val('r');
            } else {
                alert("ERROR: Input will exceed maximum consecutive number of blocks(20).");
                dom.val('');
            }
            break;
        case "r1":
            var isValid = check_limit_bulk(input, dom);
            if (isValid == true) {
                dom.val('r');
                for (i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('r');
                        $(this).addClass('r_class');
                        //$(this).css({ "background": "#3399ff !important", "color": "black" });
                        dom = $(this);
                    });
                }
            } else {
                alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
                dom.removeClass('r_class');
                dom.val('');
            }
            break;
        case "ca":
            var isValid = check_limit(input, dom);
            if (isValid == true) {
                dom.addClass('ca_class');
                dom.val('ca');
            } else {
                alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
                dom.val('');
            }
            break;
        case "ca1":
            var isValid = check_limit_bulk(input, dom);
            if (isValid == true) {
                dom.val('ca');
                dom.addClass('ca_class');
                //dom.css({ "background": "#000066 !important", "color": "white" });
                for (i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('ca');
                        $(this).addClass('ca_class');
                        //$(this).css({ "background": "#000066 !important", "color": "white" });
                        dom = $(this);
                    });
                }
            } else {
                alert("ERROR: Maximum consecutive number of blocks(20) will exceed.");
                dom.removeClass('ca_class');
                dom.val('');
            }
            break;
        case "":
            dom.val('');
            dom.removeClass();
            break;
        default:
            if (input.indexOf('x3') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x2') > -1) {
                dom.closest('td').next('td').find('input').val('').css({ "background": "white !important" }).closest('td').next('td').find('input').val('').css({ "background": "white !important" })
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x1') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
                for (i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('');
                        $(this).removeClass();
                        //$(this).css({ "background": "white !important" });
                        dom = $(this);
                    });
                }
            }
            break;
    }
    var attrid = dom.parent().attr('id');
    var paramid = attrid.replace('paramid_', '');

    af_count_target(paramid);
}

function check_input_crane(input, dom) {
    switch (input) {
        case "cn":
            dom.addClass('cn_class');
            //dom.css({ "background": "#000066 !important", "color": "white" });
            dom.val('cn');
            break;
        case "cn1":
            dom.val('cn');
            dom.addClass('cn_class');
            //dom.css({ "background": "#000066 !important", "color": "white" });
            for (i = 0; i < 7; i++) {
                dom.closest('td').next('td').find('input').each(function () {
                    $(this).val('cn');
                    $(this).addClass('cn_class');
                    //$(this).css({ "background": "#000066 !important", "color": "white" });
                    dom = $(this);
                });
            }
            break;
        case "":
            dom.val('');
            dom.removeClass();
            break;
        default:
            if (input.indexOf('x3') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x2') > -1) {
                dom.closest('td').next('td').find('input').val('').css({ "background": "white !important" }).closest('td').next('td').find('input').val('').css({ "background": "white !important" })
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
            }
            else if (input.indexOf('x1') > -1) {
                dom.val('');
                dom.removeClass();
                //dom.css({ "background": "white !important" });
                for (i = 0; i < 19; i++) {
                    dom.closest('td').next('td').find('input').each(function () {
                        $(this).val('');
                        $(this).removeClass();
                        //$(this).css({ "background": "white !important" });
                        dom = $(this);
                    });
                }
            }
            break;
    }
}

function calc_daily_target(paramid) {
    var total = 0;
    $('td[id*="paramid_' + paramid + '_"] input').each(function () {
        var val = $(this).val();
        if (val != "")
            total += Number(val);
    });
    $('#paramid_' + paramid + '_total').text(total);
}

$('#spp_date_btn').live('click', function () {
    var tab = $('#page_id').text();

    clear_table();
    $('#fsfe_prod_id').text('');
    $('#fsfe_log_header').css({ 'background-color': '#FFFCCC !important' });
    var date_ = $('#fsfe_shiftdate').val();

    if (tab == 1) {
        load_defaults();
        var day = date_.split('/');
        $('#day_panel').text(day[1]);
    } else {
        var span_date = new Date(date_);
        var span_date_ = span_date.toString("MMM dd, yyyy");
        $('#date_span').text(span_date_);
    }

    $.ajax({
        url: serverpath + '/SmeltPlan/getProdId/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#fsfe_prod_id').text(data);

            var date = $('#fsfe_shiftdate').val();

            if (tab == 1) {
                load_defaults();
                load_plan();
            }
            else if (tab == 2) {
                load_actual_graph(date_);
                load_plan_actual();
            }
            else {
                load_plan_actual();
                load_target_numeric(date_);
            }
        }
    });
});

function load_defaults() {
    $('#fsf_btn').prop('disabled', false);
    $('#cf_btn').prop('disabled', false);
    $('#afca_btn').prop('disabled', false);

    $.ajax({
        url: serverpath + '/SmeltPlan/load_defaults/',
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.SmelPlan_Param_Id + ' input').val(value.SmelPlan_Default_Value);
            });
            $('#spp_data_tbl td[id*="paramid_1_"]').each(function () {
                $(this).find('input').each(function () {
                    var val = $(this).val();
                    var td = $(this).parent();
                    calculate_Matte_lvl(val, td);
                    //calculate_threshold(val, $(this));
                });
            });
        }
    });
}

function clear_table() {
    var tab = $('#page_id').text();

    switch (tab) {
        case "1":
            $('#smeltplan_right_div input').each(function () {
                $(this).val('');
                $(this).removeClass();
            });
            $('#smeltplan_left_div input[type="text"]').each(function () {
                $(this).val('');
            });
            $('table[id*="spp_param_group_"] input').each(function () {
                $(this).val('');
            });
            $('td[id*="target"').text(' ');
            break;
        case "2":
            $('table[id*="spp_param_group_"]').each(function () {
                $(this).find(' td[id*="paramid_"]').each(function () {
                    $(this).text('');
                });
            });
            $('#planvsactual_div td[id*="paramid_"]').each(function () {
                $(this).removeClass();
                $(this).text('');
            });
            $('div[id^="CF"][id$="actual"] > div').each(function () {
                $(this).remove();
            });
            $('div[id^="AF"][id$="actual"] > div').each(function () {
                $(this).remove();
            });
            break;
        case "3":
            $('table[id*="spp_param_group_"]').each(function () {
                $(this).find(' td[id*="paramid_"]').each(function () {
                    $(this).text('');
                });
            });
            $('#planvsactual_div td[id*="paramid_"]').each(function () {
                $(this).removeClass();
                $(this).text('');
            });
            break;
        default:
            break;
    }


    //$('table[id*="spp_param_group_"] td:last-child').each(function () {
    //    $(this).text('');
    //});
}

function calculate_threshold(feedrate, $this) {
    var feed = Number(feedrate);
    if (feed >= 145) {
        $this.addClass('fsf_normal');
        $this.removeClass('fsf_slowdown');
        $this.removeClass('fsf_stopcharge');
    } else if (feed < 145 && feed > 0) {
        $this.removeClass('fsf_normal');
        $this.addClass('fsf_slowdown');
        $this.removeClass('fsf_stopcharge');
    } else if (feed <= 0) {
        $this.removeClass('fsf_normal');
        $this.removeClass('fsf_slowdown');
        $this.addClass('fsf_stopcharge');
    }
}

function calculate_threshold_pva(feedrate, $this) {
    var feed = Number(feedrate);
    if (feed >= 145) {
        $this.addClass('fsf_normal_bg');
    } else if (feed < 145 && feed > 0) {
        $this.addClass('fsf_slowdown_bg');
    } else if (feed <= 0) {
        $this.addClass('fsf_stopcharge_bg');
    }
}

function calculate_Matte_lvl(feedrate, $this) {
    var feedrate_ = 0
    if (feedrate != "")
        feedrate_ = feedrate;

    var prevmattelevel;
    var mattefall = parseFloat($('#paramid_7 input').val());
    var matterise = parseFloat($('#paramid_22 input').val());
    var targetmatte = parseFloat($('#paramid_6 input').val());
    var cu = parseFloat($('#paramid_5 input').val());

    var $tr = $this.parent();
    var col = $tr.children().index($this);

    var $mattelevelcell = $tr.next().children().eq((col));


    if (col == 0)
        prevmattelevel = parseFloat($('#paramid_4 input').val());
    else
        prevmattelevel = parseFloat($mattelevelcell.closest('td').prev('td').val());

    var $laddlecell = $mattelevelcell.parent().next().children().eq(col);
    var laddle = 0;
    if ($laddlecell.find('input').val() != "")
        laddle = parseFloat($laddlecell.find('input').val());
    else
        laddle = 0;

    var int1 = (feedrate * (cu / 100) / (targetmatte / 100));
    var int2 = int1 / matterise;
    var int3 = int2 / 2;
    var int4 = int3 + prevmattelevel;
    var int5 = laddle * mattefall;
    var final = int4 - int5;

    var mattelevel = ((((feedrate_ * (cu / 100) / (targetmatte / 100)) / matterise) / 2) + prevmattelevel) - (laddle * mattefall);
    var mt = Math.round(mattelevel * 100) / 100;
    $mattelevelcell.attr('value', mattelevel);
    if (mt < 39 || mt > 56) {
        $mattelevelcell.find('input').val(mt);
        $mattelevelcell.find('input').addClass('matte_threshold');
    }
    else {
        $mattelevelcell.find('input').val(mt);
        //$mattelevelcell.find('input').css({ "color": "red" });

    }
    //calc_daily_target(1);
}

$('#dlytgt_td').live('click', function () {
    generate_daily_targets();
    generate_plan_parameters();
});
//$('#default_btn').live('click', function () {
//    $
//});

$('#fsf_btn').live('click', function () {
    var selected = $('#fsfe_prod_id').text();
    select_save(selected, 'fsf_td', 'FSF');
});

$('#cf_btn').live('click', function () {
    var selected = $('#fsfe_prod_id').text();
    select_save(selected, 'cf_td', 'CF');
});

$('#afca_btn').live('click', function () {
    var selected = $('#fsfe_prod_id').text();
    select_save(selected, 'af_td', 'AFCA');
});

function select_save(selected, area, msg) {
    //if (selected == 1) {
    save_plan(area, msg);
    //}
    //else {
    //    alert('Select date first.');
    //}
}

function delete_prodplan(areaid, data) {
    switch (areaid) {
        case "fsf_td":
            $.ajax({
                url: serverpath + '/SmeltPlan/Delete_ProdPlan_NumFSF/',
                data: {
                    prodid: data
                },
                type: 'POST',
                cache: false
            });
            break;
        case "cf_td":
            $.ajax({
                url: serverpath + '/SmeltPlan/Delete_ProdPlan_StrCF/',
                data: {
                    prodid: data
                },
                type: 'POST',
                cache: false,
            });
            break;
        case "af_td":
            $.ajax({
                url: serverpath + '/SmeltPlan/Delete_ProdPlan_StrAF/',
                data: {
                    prodid: data
                },
                type: 'POST',
                cache: false,
            });
            break;
    }
}

function save_plan(areaid, msg) {
    var date_ = $('#fsfe_shiftdate').val();
    var prodid_ = $('#fsfe_prod_id').text();

    //$.spin('true');
    $.ajax({
        url: serverpath + '/SmeltPlan/Save_ProdDate/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.ajax({
                url: serverpath + '/SmeltPlan/getProdId/',
                data: {
                    date: date_,
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    $('#fsfe_prod_id').text(data)
                    delete_prodplan(areaid, data);

                    //Save Numeric values(FSF)
                    var items_numeric = [];

                    $('td[id*="paramid_"][class*="' + areaid + '"] input').filter(function () {
                        return $.isNumeric(this.value);
                    }).each(function () {
                        var attrid = $(this).parent('td').attr('id');
                        var num_id = attrid.replace('paramid_', '');
                        var params = num_id.split("_");

                        var paramid_ = params[0];
                        var timeseriesid_ = params[1];
                        var val_ = parseFloat($(this).val());

                        items_numeric.push({
                            prodid: data,
                            timeseriesid: timeseriesid_,
                            paramid: paramid_,
                            numval: val_
                        });
                    });

                    if (items_numeric.length != 0) {
                        items_numeric = JSON.stringify({ 'items_numeric': items_numeric })

                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: serverpath + '/SmeltPlan/Save_Num_ProdPlan',
                            data: items_numeric,
                            success: function (data) {

                            }
                        });
                    }

                    //Save String values(CRANE, CF, AFCA)
                    var items_str = [];

                    $('td[id*="paramid_"][class*="' + areaid + '"] input').filter(function () {
                        return (!$.isNumeric(this.value) && this.value.length != 0);
                    }).each(function () {
                        var attrid = $(this).parent('td').attr('id');
                        var num_id = attrid.replace('paramid_', '');
                        var params = num_id.split("_");

                        var paramid_ = params[0];
                        var timeseriesid_ = params[1];
                        var val_ = $(this).val();

                        items_str.push({
                            prodid: data,
                            timeseriesid: timeseriesid_,
                            paramid: paramid_,
                            strval: val_
                        });
                    });

                    if (items_str.length != 0) {
                        items_str = JSON.stringify({ 'items_str': items_str })

                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: serverpath + '/SmeltPlan/Save_Str_ProdPlan',
                            data: items_str,
                            success: function (data) {

                            }
                        });
                    }

                    //Save Daily Targets
                    var items_tgt = [];

                    $('td[id*="_target"][class*="' + areaid + '"]').filter(function () {
                        var num = $(this).text();
                        return $.isNumeric(num);
                    }).each(function () {
                        var attrid = $(this).attr('id');
                        var num_id = attrid.replace('paramid_', '');
                        var params = num_id.split("_");

                        var paramid_ = params[0];
                        var val_ = parseFloat($(this).text());

                        items_tgt.push({
                            prodid: data,
                            paramid: paramid_,
                            numval: val_
                        });
                    });

                    if (items_tgt.length != 0) {
                        items_tgt = JSON.stringify({ 'items_tgt': items_tgt })

                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: serverpath + '/SmeltPlan/Save_Targets',
                            data: items_tgt,
                            success: function (data) {

                            }
                        });
                    }

                    //Save FSF headers
                    if (areaid == "fsf_td") {
                        var items_fsf = [];

                        $('td[id*="paramid_"][class*="fsf_h"] input').filter(function () {
                            return $.isNumeric(this.value);
                        }).each(function () {
                            var attrid = $(this).parent('td').attr('id');
                            var num_id = attrid.replace('paramid_', '');
                            var params = num_id.split("_");

                            var paramid_ = params[0];
                            var val_ = $(this).attr('value');

                            items_fsf.push({
                                prodid: data,
                                paramid: paramid_,
                                numval: val_
                            });
                        });

                        items_fsf.push({
                            prodid: data,
                            paramid: 1,
                            numval: $('#paramid_1 input').val()
                        });

                        if (items_fsf.length != 0) {
                            items_fsf = JSON.stringify({ 'items_fsf': items_fsf })

                            $.ajax({
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                type: 'POST',
                                url: serverpath + '/SmeltPlan/Save_Header_Num',
                                data: items_fsf,
                                success: function (data) {

                                }
                            });
                        }

                        //Save FSF Remarks
                        var remarks_ = $('#paramid_remarks').val();
                        $.ajax({
                            url: serverpath + '/SmeltPlan/Save_Remarks_Str/',
                            data: {
                                prodid: data,
                                remarks: remarks_
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                            }
                        });
                    }

                    //Save Blister Cycle
                    if (areaid == "cf_td") {
                        var blist_ = parseFloat($('#paramid_13 input').val());
                        $.ajax({
                            url: serverpath + '/SmeltPlan/Save_BlisterCycle/',
                            data: {
                                prodid: data,
                                blist: blist_
                            },
                            type: 'POST',
                            cache: false,
                            success: function (data) {
                            }
                        });
                    }

                    alert(msg + ' Plan now saved.');
                }
            });
        }
    });
    //$.spin('false');
}

$('#default_btn').live('click', function () {
    var items = [];

    $('td[id*="paramid_"][class*="fsf_h"] input').filter(function () {
        return $.isNumeric(this.value);
    }).each(function () {
        var attrid = $(this).parent('td').attr('id');
        var num_id = attrid.replace('paramid_', '');
        var params = num_id.split("_");

        var paramid_ = params[0];
        var val_ = $(this).attr('value');

        items.push({
            paramid: paramid_,
            numval: val_
        });
    });

    items.push({
        paramid: 1,
        numval: $('#paramid_1 input').val()
    })

    items.push({
        paramid: 13,
        numval: $('#paramid_13 input').val()
    })

    if (items.length != 0) {
        items = JSON.stringify({ 'items': items })

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/SmeltPlan/Save_Defaults',
            data: items,
            success: function (data) {
                alert('New Defaults now saved.');
            }
        });
    }
});

function load_plan() {
    var prodid_ = $('#fsfe_prod_id').text();
    var date_ = $('#fsfe_shiftdate').val();

    var day = date_.split('/');
    $('#day_panel').text(day[1]);
    //$.spin('true');
    // Load Single Num Vals
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_Numeric/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.SmelPlan_Param_Id + ' input').val(value.SmelPlan_Numeric_Value);
                if (value.SmelPlan_Param_Id == 13) {
                    var num = Math.round(value.SmelPlan_Numeric_Value * 100) / 100;
                    $('#paramid_' + value.SmelPlan_Param_Id + '_target input').val(num);
                } else {
                    $('#paramid_' + value.SmelPlan_Param_Id + '_target input').val(value.SmelPlan_Numeric_Value);
                }
            });

        }
    });

    // Load FSF Num Vals
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_NumVal/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.SmelPlan_Param_Id == 2) {
                    $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id + ' input').val(Math.round(value.SmelPlan_Numeric_Value * 100) / 100);
                    if ((Math.round(value.SmelPlan_Numeric_Value * 100) / 100) < 39 || (Math.round(value.SmelPlan_Numeric_Value * 100) / 100) > 56)
                        $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id + ' input').addClass('matte_threshold');
                } else
                    $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id + ' input').val(value.SmelPlan_Numeric_Value);

                if (value.SmelPlan_Param_Id == 1) {
                    calculate_threshold(value.SmelPlan_Numeric_Value, $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id + ' input'));
                }
            });
            feed_rate_target(); tap_sched_target();
        }
    });
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_String/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_remarks').val(value.SmelPlan_NonNumeric_Value);
            });
        }
    });

    //Load CF/AF StrVals
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_StrVal/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id + ' input').val(value.SmelPlan_String_Value).addClass(value.SmelPlan_String_Value + '_class');
            });
            cf_count_target(9); cf_count_target(10); cf_count_target(11); cf_count_target(12); af_count_target(14); af_count_target(15);
        }
    });
    //$.spin('false');

}

function load_plan_actual() {
    //$('.tabs-content').hide();
    var date_ = $('#fsfe_shiftdate').val();
    var prodid_ = $('#fsfe_prod_id').text();


    // Load Single Num Vals
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_Numeric/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.SmelPlan_Param_Id == 6 || value.SmelPlan_Param_Id == 39) {
                    $('#paramid_' + value.SmelPlan_Param_Id + '_target').text(value.SmelPlan_Numeric_Value + '%');
                } else {
                    $('#paramid_' + value.SmelPlan_Param_Id + '_target').text(value.SmelPlan_Numeric_Value);
                }
            });
        }
    });
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_String/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_remarks').text(value.SmelPlan_NonNumeric_Value);
            });
        }
    });

    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_NumVal/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.SmelPlan_Param_Id == 2) {
                    $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id).text((Math.round(value.SmelPlan_Numeric_Value * 100) / 100).toFixed(0));
                    if ((Math.round(value.SmelPlan_Numeric_Value * 100) / 100) < 39 || (Math.round(value.SmelPlan_Numeric_Value * 100) / 100) > 56)
                        $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id).addClass('matte_threshold');
                } else
                    $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id).text(value.SmelPlan_Numeric_Value);

                if (value.SmelPlan_Param_Id == 1) {
                    calculate_threshold_pva(value.SmelPlan_Numeric_Value, $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id));
                }
            });
        }
    });

    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_ProdPlan_StrVal/',
        data: {
            prodid: prodid_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.SmelPlan_Param_Id + '_' + value.SmelPlan_TimeSeries_Id).val(value.SmelPlan_String_Value).addClass(value.SmelPlan_String_Value + '_class');
            });
            //$('.tabs-content').fadeIn('slow');
        }
    });

}

function load_actual_numeric(date_) {
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/load_actual_params/',
        data: {
            date: date_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_fsffeed_actual').text((value.FSFFeed_val) ? (value.FSFFeed_val).toFixed(2) : "-");
                if (value.FSFFeed_val != null) check_actual((value.FSFFeed_val).toFixed(2), "paramid_fsffeed_actual");

                $('#paramid_kmsd_actual').text((value.KUMERASDFeed_val) ? (value.KUMERASDFeed_val).toFixed(2) : "-");
                if (value.KUMERASDFeed_val != null) check_actual((value.KUMERASDFeed_val).toFixed(2), "paramid_kmsd_actual");


                $('#paramid_optime_actual').text((value.OperatingHours_val) ? (value.OperatingHours_val).toFixed(2) : "-");
                if (value.OperatingHours_val != null) check_actual((value.OperatingHours_val).toFixed(2), "paramid_optime_actual");

                $('#paramid_mtgrd_actual').text((value.KPI_MatteGrade_val) ? (value.KPI_MatteGrade_val).toFixed(2) + '%' : "-");
                if (value.KPI_MatteGrade_val != null) check_actual((value.KPI_MatteGrade_val).toFixed(2), "paramid_mtgrd_actual");

                $('#paramid_mtlvl_actual').text((value.KPI_MatteLevel_val) ? (value.KPI_MatteLevel_val).toFixed(2) : "-");
                if (value.KPI_MatteLevel_val != null) check_actual((value.KPI_MatteLevel_val).toFixed(2), "paramid_mtlvl_actual");

                $('#paramid_mttmp_actual').text((value.KPI_MatteTemp_val) ? (value.KPI_MatteTemp_val).toFixed(2) : "-");
                if (value.KPI_MatteTemp_val != null) check_actual((value.KPI_MatteTemp_val).toFixed(2), "paramid_mttmp_actual");

                $('#paramid_cuinfssl_actual').text((value.KPI_CUinFSSL_val) ? (value.KPI_CUinFSSL_val).toFixed(2) : "-");
                if (value.KPI_CUinFSSL_val != null) check_actual((value.KPI_CUinFSSL_val).toFixed(2), "paramid_cuinfssl_actual");

                $('#paramid_concfeed_actual').text((value.KPI_ConcFeed_val) ? (value.KPI_ConcFeed_val).toFixed(2) : "-");
                if (value.KPI_ConcFeed_val != null) check_actual((value.KPI_ConcFeed_val).toFixed(2), "paramid_concfeed_actual");

                $('#paramid_culoss_actual').text((value.KPI_CuLossInSlag_val) ? (value.KPI_CuLossInSlag_val).toFixed(2) : "-");
                if (value.KPI_CuLossInSlag_val != null) check_actual((value.KPI_CuLossInSlag_val).toFixed(2), "paramid_culoss_actual");

                $('#paramid_bin_actual').text((value.KPI_FeedToBin_val) ? (value.KPI_FeedToBin_val).toFixed(2) : "-");
                if (value.KPI_FeedToBin_val != null) check_actual((value.KPI_FeedToBin_val).toFixed(2), "paramid_bin_actual");

                $('#paramid_slagtemp_actual').text((value.KPI_SlagTemp_val) ? (value.KPI_SlagTemp_val).toFixed(2) : "-");
                if (value.KPI_SlagTemp_val != null) check_actual((value.KPI_SlagTemp_val).toFixed(2), "paramid_slagtemp_actual");

                $('#paramid_slaglvl_actual').text((value.KPI_SlagLevel_val) ? (value.KPI_SlagLevel_val).toFixed(2) : "-");
                if (value.KPI_SlagLevel_val != null) check_actual((value.KPI_SlagLevel_val).toFixed(2), "paramid_slaglvl_actual");

                $('#paramid_bathlvlh1_actual').text((value.KPI_BathLevelH1_val) ? (value.KPI_BathLevelH1_val).toFixed(2) : "-");
                if (value.KPI_BathLevelH1_val != null) check_actual((value.KPI_BathLevelH1_val).toFixed(2), "paramid_bathlvlh1_actual");

                $('#paramid_drafta_actual').text((value.KPI_FSFDraftA_val) ? (value.KPI_FSFDraftA_val).toFixed(2) : "-");
                if (value.KPI_FSFDraftA_val != null) check_actual((value.KPI_FSFDraftA_val).toFixed(2), "paramid_drafta_actual");

                $('#paramid_draftb_actual').text((value.KPI_FSFDraftB_val) ? (value.KPI_FSFDraftB_val).toFixed(2) : "-");
                if (value.KPI_FSFDraftB_val != null) check_actual((value.KPI_FSFDraftB_val).toFixed(2), "paramid_draftb_actual");

                $('#paramid_whbtmp_actual').text((value.KPI_WHBInletTemp_val) ? (value.KPI_WHBInletTemp_val).toFixed(2) : "-");
                if (value.KPI_WHBInletTemp_val != null) check_actual((value.KPI_WHBInletTemp_val).toFixed(2), "paramid_whbtmp_actual");

                $('#paramid_cyccompl_actual').text((value.CyclesCompleted_val) ? (value.CyclesCompleted_val).toFixed(2) : "-");
                if (value.CyclesCompleted_val != null) check_actual((value.CyclesCompleted_val).toFixed(2), "paramid_cyccompl_actual");

                $('#paramid_blistprod_actual').text((value.BlisterProduction_val) ? (value.BlisterProduction_val).toFixed(2) : "-");
                if (value.BlisterProduction_val != null) check_actual((value.BlisterProduction_val).toFixed(2), "paramid_blistprod_actual");

                $('#paramid_ttlsecond_actual').text((value.CFSecondariesCharged_val) ? (value.CFSecondariesCharged_val).toFixed(2) : "-");
                if (value.CFSecondariesCharged_val != null) check_actual((value.CFSecondariesCharged_val).toFixed(2), "paramid_ttlsecond_actual");

                $('#paramid_blowtime_actual').text((value.KPI_CFBlowingTime_val) ? (value.KPI_CFBlowingTime_val).toFixed(2) : "-");
                if (value.KPI_CFBlowingTime_val != null) check_actual((value.KPI_CFBlowingTime_val).toFixed(2), "paramid_blowtime_actual");

                //$('#paramid_blisttrd_actual').text((value.KPI_AFBlisterTreated_val) ? (value.KPI_AFBlisterTreated_val).toFixed(2) : "-");
                //if (value.KPI_AFBlisterTreated_val != null) check_actual((value.KPI_AFBlisterTreated_val).toFixed(2), "paramid_blisttrd_actual");

                //$('#paramid_lotscasted_actual').text((value.LotsCompleted_val) ? (value.LotsCompleted_val).toFixed(2) : "-");
                //if (value.LotsCompleted_val != null) check_actual((value.LotsCompleted_val).toFixed(2), "paramid_lotscasted_actual");

                //$('#paramid_anodeprod_actual').text((value.AnodeCasted_val) ? (value.AnodeCasted_val).toFixed(2) : "-");
                //if (value.AnodeCasted_val != null) check_actual((value.AnodeCasted_val).toFixed(2), "paramid_anodeprod_actual");
            });
            load_afparams(date_);
            //Compare Actual and Target values
            check_actual();
        }
    });
}

function load_afparams(date_) {
    $('#spp_param_group_3 td[id*="actual"]').each(function () {
        $(this).append('<input type="number" onkeypress="return NumericOnly(event)" style="text-align: right !important"/>');
    });

    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/Load_AFParams_Actual/',
        data: {
            date: date_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('td[id*="paramid_4' + index + '"] input').val(value.SmelPlan_Numeric_Value);
            });
        }
    });
}

$('#spp_af_save_btn').live('click', function () {
    var date_ = $('#fsfe_shiftdate').val();

    $.ajax({
        url: serverpath + '/SmeltPlan/getProdId/',
        data: {
            date: date_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#fsfe_prod_id').text(data)

            var items = [];

            $('td[id*="paramid_"] input').filter(function () {
                return $.isNumeric(this.value);
            }).each(function () {
                var attrid = $(this).parent('td').attr('id');
                var num_id = attrid.replace('paramid_', '');
                var params = num_id.split("_");

                var paramid_ = params[0];
                var val_ = parseFloat($(this).val());

                items.push({
                    prodid: data,
                    paramid: paramid_,
                    numval: val_
                });
            });

            if (items.length != 0) {
                items = JSON.stringify({ 'items': items })

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: serverpath + '/SmeltPlan/Save_AFParams_actual',
                    data: items,
                    success: function (data) {
                        alert('AF Actual Data Saved.');
                    }
                });
            }
        }
    });
});

function check_actual(value, paramid) {
    $this = $('#' + paramid);
    var $target_td = $this.closest('td').prev('td');
    var target = parseFloat($target_td.text());
    var actual = parseFloat($this.text());

    switch (paramid) {
        case "paramid_fsffeed_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_kmsd_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_optime_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_mtgrd_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_mtlvl_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_mttmp_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_cuinfssl_actual":
            break;
        case "paramid_concfeed_actual":
            break;
        case "paramid_culoss_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_bin_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_slagtemp_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_slaglvl_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_bathlvlh1_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_drafta_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_draftb_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_whbtmp_actual":
            if (actual > target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_cyccompl_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_blistprod_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_ttlsecond_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_blowtime_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_blisttrd_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_lotscasted_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
        case "paramid_anodeprod_actual":
            if (actual < target) {
                //Turns font color to RED
                $this.addClass('actual_threshold');
            }
            break;
    }





}

function load_target_numeric(date_) {
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/load_target_params/',
        data: {
            date: date_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_fsffeed_target').text(value.FSFFeed_Target_val ? (value.FSFFeed_Target_val).toFixed(2) : "-");
                $('#paramid_kmsd_target').text(value.KUMERASDFeed_Target_val ? (value.KUMERASDFeed_Target_val).toFixed(2) : "-");
                $('#paramid_optime_target').text(value.OperatingHours_Target_val ? (value.OperatingHours_Target_val).toFixed(2) : "-");
                $('#paramid_mtgrd_target').text(value.KPI_MatteGrade_Target_val ? (value.KPI_MatteGrade_Target_val).toFixed(2) + '%' : "-");
                $('#paramid_mtlvl_target').text(value.KPI_MatteLevel_Target_val ? (value.KPI_MatteLevel_Target_val).toFixed(2) : "-");
                $('#paramid_mttmp_target').text(value.KPI_MatteTemp_Target_val ? (value.KPI_MatteTemp_Target_val).toFixed(2) : "-");
                $('#paramid_cuinfssl_target').text(value.KPI_CUinFSSL_Target_val ? (value.KPI_CUinFSSL_Target_val).toFixed(2) : "-");
                $('#paramid_concfeed_target').text(value.KPI_ConcFeed_Target_val ? (value.KPI_ConcFeed_Target_val).toFixed(2) : "-");
                $('#paramid_culoss_target').text(value.KPI_CuLossInSlag_Target_val ? (value.KPI_CuLossInSlag_Target_val).toFixed(2) : "-");
                $('#paramid_bin_target').text(value.KPI_FeedToBin_Target_val ? (value.KPI_FeedToBin_Target_val).toFixed(2) : "-");
                $('#paramid_slagtemp_target').text(value.KPI_SlagTemp_Target_val ? (value.KPI_SlagTemp_Target_val).toFixed(2) : "-");
                $('#paramid_slaglvl_target').text(value.KPI_SlagLevel_Target_val ? (value.KPI_SlagLevel_Target_val).toFixed(2) : "-");
                $('#paramid_bathlvlh1_target').text(value.KPI_BathLevelH1_Target_val ? (value.KPI_BathLevelH1_Target_val).toFixed(2) : "-");
                $('#paramid_drafta_target').text(value.KPI_FSFDraftA_Target_val ? (value.KPI_FSFDraftA_Target_val).toFixed(2) : "-");
                $('#paramid_draftb_target').text(value.KPI_FSFDraftB_Target_val ? (value.KPI_FSFDraftB_Target_val).toFixed(2) : "-");
                $('#paramid_whbtmp_target').text(value.KPI_WHBInletTemp_Target_val ? (value.KPI_WHBInletTemp_Target_val).toFixed(2) : "-");
                $('#paramid_cyccompl_target').text(value.CyclesCompleted_Target_val ? (value.CyclesCompleted_Target_val).toFixed(2) : "-");
                $('#paramid_blistprod_target').text(value.BlisterProduction_Target_val ? (value.BlisterProduction_Target_val).toFixed(2) : "-");
                $('#paramid_ttlsecond_target').text(value.CFSecondariesCharged_Target_val ? (value.CFSecondariesCharged_Target_val).toFixed(2) : "-");
                $('#paramid_blowtime_target').text(value.KPI_CFBlowingTime_Target_val ? (value.KPI_CFBlowingTime_Target_val).toFixed(2) : "-");
                $('#paramid_blisttrd_target').text(value.KPI_AFBlisterTreated_Target_val ? (value.KPI_AFBlisterTreated_Target_val).toFixed(2) : "-");
                $('#paramid_lotscasted_target').text(value.LotsCompleted_Target_val ? (value.LotsCompleted_Target_val).toFixed(2) : "-");
                $('#paramid_anodeprod_target').text(value.AnodeCasted_Target_val ? (value.AnodeCasted_Target_val).toFixed(2) : "-");
            });
            load_actual_numeric(date_);
        }
    });
}


function load_actual_graph(date_) {
    clear_table();
    var prodid_ = $('#fsfe_prod_id').text();

    //Load Target Numeric Parameters
    load_target_numeric(date_);

    //Load Actual Numeric Parameters
    //load_actual_numeric(date_);

    //Load Graph Trends
    var cf1 = []; var cf2 = []; var cf3 = []; var cf4 = []; var af1r = []; var af1c = []; var af2r = []; var af2c = [];
    var cf1_max = 0, cf2_max = 0, cf3_max = 0, cf4_max = 0, af1r_max = 0, af1c_max = 0, af2r_max = 0, af2c_max = 0;
    //$.spin('true');
    $.ajax({
        type: "POST",
        url: serverpath + '/SmeltPlan/load_actual_data/',
        data: {
            date: date_
        },
        success: function (data) {
            $.each(data, function (index, value) {
                var datetime = parseInt((value.TimeSeries).substring(6, (value.TimeSeries).length - 2));
                cf1.push({ x: datetime, y: value.CF1 });
                cf1_max = (value.CF1 > cf1_max) ? value.CF1 : cf1_max;

                cf2.push({ x: datetime, y: value.CF2 });
                cf2_max = (value.CF2 > cf2_max) ? value.CF2 : cf2_max;

                cf3.push({ x: datetime, y: value.CF3 });
                cf3_max = (value.CF3 > cf3_max) ? value.CF3 : cf3_max;

                cf4.push({ x: datetime, y: value.CF4 });
                cf4_max = (value.CF4 > cf4_max) ? value.CF4 : cf4_max;

                af1r.push({ x: datetime, y: (value.AF1_Refining > 0) ? value.AF1_Refining : 0 });
                af1r_max = (value.AF1_Refining > af1r_max) ? value.AF1_Refining : af1r_max;

                af1c.push({ x: datetime, y: (value.AF1_Casting > 0) ? value.AF1_Casting : 0 });
                af1c_max = (value.AF1_Casting > af1c_max) ? value.AF1_Casting : af1c_max;

                af2r.push({ x: datetime, y: (value.AF2_Refining > 0) ? value.AF2_Refining : 0 });
                af2r_max = (value.AF2_Refining > af2r_max) ? value.AF2_Refining : af2r_max;

                af2c.push({ x: datetime, y: (value.AF2_Casting > 0) ? value.AF2_Casting : 0 });
                af2c_max = (value.AF2_Casting > af2c_max) ? value.AF2_Casting : af2c_max;

            });
            var cf1_chart = new CanvasJS.Chart("CF1_actual", {
                axisY: {
                    maximum: cf1_max + 5000
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: cf1
                }]
            });
            var cf2_chart = new CanvasJS.Chart("CF2_actual", {
                axisY: {
                    maximum: cf2_max + 5000
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: cf2
                }]
            });
            var cf3_chart = new CanvasJS.Chart("CF3_actual", {
                axisY: {
                    maximum: cf3_max + 5000
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: cf3
                }]
            });
            var cf4_chart = new CanvasJS.Chart("CF4_actual", {
                axisY: {
                    maximum: cf4_max + 5000
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: cf4
                }]
            });
            var af1_chart = new CanvasJS.Chart("AF1_actual", {
                axisY: {
                    maximum: af1c_max + 20
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: af1r
                },
                {
                    color: "blue",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: af1c
                }]
            });
            var af2_chart = new CanvasJS.Chart("AF2_actual", {
                axisY: {
                    maximum: af2c_max + 20
                },
                axisX: {
                    valueFormatString: " "
                },
                data: [{
                    color: "green",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: af2r
                },
                {
                    color: "blue",
                    type: "stepLine",
                    markerSize: 0,
                    lineThickness: 1,
                    xValueType: "dateTime",
                    dataPoints: af2c
                }]
            });


            cf1_chart.render(); cf2_chart.render(); cf3_chart.render(); cf4_chart.render(); af1_chart.render(); af2_chart.render();
            //$.spin('false');
            $('.tabs-content').fadeIn('slow');
        },
        //fail: function (data) {

        //}
    });

}


function generate_daily_targets() {
    //$.spin('true');
    feed_rate_target();
    tap_sched_target();
    cf_count_target(9);
    cf_count_target(10);
    cf_count_target(11);
    cf_count_target(12);
    af_count_target(14);
    af_count_target(15);
    //$.spin('false');
}

function generate_plan_parameters() {
    operating_time();
    cycles_per_day();
    blst_prod();
    total_charges();
    blowing_time();
    blst_treated();
    lots_per_day();
    gross_anode_prod();
}

//Daily Targets
function feed_rate_target() {
    var feed = 0;

    $('#spp_data_tbl td[id*="paramid_1_"] input').each(function () {
        var num = parseFloat($(this).val());
        feed += num;
    });
    $('#paramid_25_target').text(feed / 2);

    return feed / 2;
}

function tap_sched_target() {
    var tap = 0;

    $('#spp_data_tbl td[id*="paramid_3_"] input').each(function () {
        var num = parseFloat($(this).val());
        tap += num;
    });
    $('#paramid_3_target').text(tap);


    return tap;
}

function cf_count_target(paramid) {
    var count = 0;

    $('#spp_data_tbl td[id*="paramid_' + paramid + '"]:not([id$="_1"]):not([id$="_2"]):not([id$="_3"]):not([id$="_4"]) input').filter(function () {
        return $(this).val() == "c";
    }).each(function () {
        count++;
    });
    $('#paramid_' + paramid + '_target').text(count);


    return count;
}

function af_count_target(paramid) {
    var count = 0;

    $('#spp_data_tbl td[id*="paramid_' + paramid + '"]:not([id$="_1"]):not([id$="_2"]):not([id$="_3"]):not([id$="_4"]) input').filter(function () {
        return $(this).val() == "ca";
    }).each(function () {
        count++;
    });
    $('#paramid_' + paramid + '_target').text(count);


    return count;
}

function blister_prod() {
    var sum = cf_count_target(9) + cf_count_target(10) + cf_count_target(11) + cf_count_target(12);
    var blister = parseFloat($('#blist_input input').val());

    var target = sum * (blister / 8);

    return target;
}

function blister_treated() {
    var sum = af_count_target(14) + af_count_target(15);

    var target = sum * (450 / 12);

    return target;
}

//FSF Parameters
function fsf_feed() { }

function operating_time() {
    var hours = 0;
    $('td[id*="paramid_1_"] input').filter(function () {
        return $(this).val() != "";
    }).each(function () {
        hours += 0.5;
    });

    $('#paramid_34_target').text(hours);

    return hours;
}

//CF Parameters
function cycles_per_day() {
    var sum = cf_count_target(9) + cf_count_target(10) + cf_count_target(11) + cf_count_target(12);

    $('#paramid_36_target').text((sum / 16).toFixed(0));

    return sum / 16;
}

function blst_prod() {
    var blst = 180 * cycles_per_day();

    $('#paramid_37_target').text(blst);

    return blst;
}

function total_charges() {
    var ttl = 80 * cycles_per_day();

    $('#paramid_38_target').text(ttl);

    return ttl;
}

function blowing_time() {
    var blow = (330 * cycles_per_day()) / (2 * 1440);
    var b = 330 * cycles_per_day();
    $('#paramid_39_target').text((blow * 100).toFixed(0));

    return blow;
}

//AF Parameters
function blst_treated() {
    var blist = blst_prod() * 0.97;

    $('#paramid_40_target').text(blist);

    return blist;
}

function lots_per_day() {
    var sum = af_count_target(14) + af_count_target(15);

    $('#paramid_41_target').text(sum / 20);

    return sum / 20;
}

function gross_anode_prod() {
    var lot = lots_per_day() * 450;

    $('#paramid_42_target').text(lot);

    return lot;
}

//$('#savetopdf_btn').live('click', function () {
//    printDiv();
//});

//function getPageHTML() {
//    return $('html')[0].outerHTML;
//}

//function save_to_pdf() {
////    var htmlString_ = window.location.href;

////    $.ajax({
////        type: "POST",
////        url: serverpath + '/SmeltPlan/Print/',
////        data: {
////            //htmlString: getPageHTML()
////        },
////        success: function (data) { }
////    });
////}
//    var element = $('.smeltplan_tbl');

////    document.body.innerHTML = element;
////    window.print();
////    //mywindow.close();

////    //return true;

//    //var element = window.open(('.smeltplan_tbl'));

//    //element.print();
//    var getCanvas;
//    html2canvas(element, {
//        onrendered: function (canvas) {
//            $(".tabs-content").append(canvas);
//            getCanvas = canvas;
//            var imgData = getCanvas.toDataURL("image/jpeg", 1.0);

//            var pdf = new jsPDF('landscape', 'mm', 'a4');

//            pdf.addHTML(element, function () {
//                pdf.save("download.pdf");
//            });
//            pdf.addHTML(imgData, 'JPEG', 10, 10, 150, 100);
//            pdf.save("download.pdf");
//        }
//    });

//}

//function printDiv() {
//    ////Get the HTML of div
//    //var divElements = document.getElementById(divID).innerHTML;
//    ////Get the HTML of whole page
//    //var oldPage = document.body.innerHTML;

//    ////Reset the page's HTML with div's HTML only
//    //document.body.innerHTML =
//    //  "<html><head><title></title></head><body>" +
//    //  divElements + "</body>";

//    ////Print Page
//    //window.print();

//    ////Restore orignal HTML
//    //document.body.innerHTML = oldPage;
//    var pdf = new jsPDF('p', 'pt', 'a4')
//, source = $('#buckets_tbl').get(0)
//, specialElementHandlers = {
//    '#bypassme': function (element, renderer) {
//        return true
//    }
//}

//    margins = {
//        top: 60,
//        bottom: 60,
//        left: 40,
//        width: 522
//    };
//    // all coords and widths are in jsPDF instance's declared units
//    // 'inches' in this case
//    pdf.fromHTML(
//        source // HTML string or DOM elem ref.
//        , margins.left // x coord
//        , margins.top // y coord
//        , {
//            'width': margins.width // max width of content on PDF
//            , 'elementHandlers': specialElementHandlers
//        },
//        function (dispose) {
//            // dispose: object with X, Y of the last line add to the PDF
//            //          this allow the insertion of new lines after html
//            pdf.save('Downloaded.pdf');
//        },
//        margins
//      )


//}