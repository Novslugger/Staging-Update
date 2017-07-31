var serverpath = "";
//var serverpath = "/PASAROperation";

function clear_duplication() {
    $("#ui-datepicker-div").hide();
    $('.tr_data').each(function () {
        $(this).remove();
    }); 
}


function load_mbf_actual_tables(date_) {
    clear_duplication();
    $('.targets_tabs-menu li').remove();
    $.ajax({
        url: serverpath + '/MBF/load_mbf_actual_tables/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li style="width:100px !important;"><a href="#sfptarget_tab-' + value.MBF_ParamGroupId + '">' + value.MBF_ParamGroupName + '</a></li>');
                $('.targets_tab').append('<div id="sfptarget_tab-' + value.MBF_ParamGroupId + '"  class="targets_tab-content"><table class="mbf_table" id="mbfactual_' + value.MBF_ParamGroupId + '"><tr><th colspan="4">' + value.MBF_ParamGroupName + '</th></tr><tr><th style="width: 315px;">Name</th><th style="width: 100px;">MTD</th><th style="width: 100px;">YTD</th></tr></table></div>');
            });

            $.ajax({
                url: serverpath + '/MBF/load_mbf_actual_params/',
                type: 'POST',
                cache: false,
                success: function (data) {
                    var prevdiv = 0;
                    var division = 1;
                    var currdiv = 0;
                    var prevgroup = 0;

                    $.each(data, function (index, value) {
                        if (value.MBF_ParamGroupId != prevgroup) {
                            currdiv = 0;                                 
                        }
                        if (value.MBF_ParamGroup3Id != currdiv) {
                            $('#mbfactual_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td colspan="4" style="text-align:center; background-color:#d1e7f6;"><b style="text-align:center;">' + value.MBF_ParamGroup3Name + '</b></td></tr>');
                            $('#mbfactual_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td id="paramname_' + value.MBF_ParamId + '" class="border_color">' + value.MBF_ParamName + '</td>'
                                + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_1"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_2"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>');

                        } else {

                            $('#mbfactual_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td id="paramname_' + value.MBF_ParamId + '" class="border_color">' + value.MBF_ParamName + '</td>'
                                 + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_1"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                 + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_2"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>');
                        }                       
                        currdiv = value.MBF_ParamGroup3Id;
                        prevgroup = value.MBF_ParamGroupId;
                        
                    });
                }
            });          
            $('.targets_tabs-menu li:first').addClass('current');
            $('.targets_tab div').css({ "display": "none" });
            $('.targets_tab div:first-child').css({ "display": "block" });
        }
    });
}

function load_mbf_actual_data(date_) {
   
    $('table[id*="mbfactual_"] input').each(function () {
        $(this).attr('value', "");
    });

    $.ajax({
        url: serverpath + '/MBF/load_mbf_data/',
        data: { date: date_ },
        type: 'post',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {               
                //$("#paramid_" + value.MBF_ParamId + "_" + value.MBF_ValTypeId + " input").val(value.MBF_NumVal == null ? "" : value.MBF_NumVal);
                $("#paramid_" + value.MBF_ParamId + "_" + value.MBF_ValTypeId + " input").val(value.MBF_NumVal == null ? "" : value.MBF_NumVal);
            });
        }
    });
}

$('#mbf_actual_save_btn').live('click', function () {
    var date_ = $('#mbf_actual_date').val();
    var items = [];

    $('table[id*="mbfactual_"]').each(function () {
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];
            var valtype_ = params[2];
            var numval_ = $(this).find('input').val();

            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    date: date_,
                    paramid: paramid_,
                    valtype: valtype_,
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
            url: serverpath + '/MBF/Save_MBF_val',
            data: items,
            success: function (data) {
                alert('Data now saved.');
                load_mbf_actual_data(date_);
            }
        });
    }

});



function load_mbf_forecast_tables(date_) {
     clear_duplication();
    $('.targets_tabs-menu li').remove();
    $.ajax({
        url: serverpath + '/MBF/load_mbf_forecast_tables/',
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li style="width:100px !important;"><a href="#sfptarget_tab-' + value.MBF_ParamGroupId + '">' + value.MBF_ParamGroupName + '</a></li>');
                $('.targets_tab').append('<div id="sfptarget_tab-' + value.MBF_ParamGroupId + '"  class="targets_tab-content"><table class="mbf_table" id="mbf_forecast_' + value.MBF_ParamGroupId + '"><tr><th colspan="4">' + value.MBF_ParamGroupName + '</th></tr><tr><th style="width: 350px;">Name</th><th style="width: 120px;">MTD</th><th style="width: 120px;">YTD</th><th style="width: 120px;">FYF</th></tr></table></div>');
            });

            $.ajax({

                url: serverpath + '/MBF/load_mbf_forecast_params/',
                type: 'POST',
                cache: false,
                success: function (data) {

                    var prevdiv = 0;
                    var division = 1;
                    var currdiv = 0;
                    var prevgroup = 0;


                    $.each(data, function (index, value) {

                        if (value.MBF_ParamGroupId != prevgroup) {
                            currdiv = 0;
                        }

                        if (value.MBF_ParamGroup3Id != currdiv) {
                            $('#mbf_forecast_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td colspan="4" style="text-align:center; background-color:#d1e7f6;"><b style="text-align:center;">' + value.MBF_ParamGroup3Name + '</b></td></tr>');
                            $('#mbf_forecast_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td id="paramname_' + value.MBF_ParamId + '" class="border_color">' + value.MBF_ParamName + '</td>'
                                + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_1"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_2"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_3"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>');

                        } else {

                            $('#mbf_forecast_' + value.MBF_ParamGroupId + ' tr:last').after('<tr id=' + currdiv + ' class="tr_data"><td id="paramname_' + value.MBF_ParamId + '" class="border_color">' + value.MBF_ParamName + '</td>'
                                 + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_1"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                 + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_2"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>'
                                 + '<td class="border_color" id="paramid_' + value.MBF_ParamId + '_3"><input type="number" class="extratbl_input" onkeypress="return NumericOnly(event)" /></td>');

                        }

                        currdiv = value.MBF_ParamGroup3Id;
                        prevgroup = value.MBF_ParamGroupId;
                    });
                }
            });
            $('.targets_tabs-menu li:first').addClass('current');
            $('.targets_tab div').css({ "display": "none" });
            $('.targets_tab div:first-child').css({ "display": "block" });
        }
    });
}

function load_mbf_forecast_data(date_) {

    $('table[id*="mbf_forecast_"] input').each(function () {
        $(this).attr('value', "");
    });

   
    $.ajax({
        url: serverpath + '/MBF/load_mbf_data/',
        data: {
            date: date_
        },
        type: 'post',
        cache: false,  
        success: function (data) {

            $.each(data, function (index, value) {
               
                $("#paramid_" + value.MBF_ParamId + "_" + value.MBF_ValTypeId + " input").val(value.MBF_NumVal == null ? "" : value.MBF_NumVal);
            });
        }
    });

}


$('#mbf_forecast_save_btn').live('click', function () {
    var date_ = $('#mbf_forecast_date').val();
    var items = [];

    $('table[id*="mbf_forecast_"]').each(function () {
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];
            var valtype_ = params[2];
            var numval_ = $(this).find('input').val();

            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    date: date_,
                    paramid: paramid_,
                    valtype: valtype_,
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
            url: serverpath + '/MBF/Save_MBF_val',
            data: items,
            success: function (data) {
                alert('Data now saved.');
                load_mbf_forecast_data(date_);
            }
        });
    }

});

function ddactive_mbf(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/MBF/mbf_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });

}

function roundToTwo(num) {
    return +(Math.round(num + "e+15") + "e-15");
}