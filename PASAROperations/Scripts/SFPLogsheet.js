var serverpath = "";
//var serverpath = "/PASAROperation";


$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

function sortTable(f, n, mytable, span) {
    var rows = $('#' + mytable + ' tbody  tr').get();

    rows.sort(function (a, b) {

        var A = getVal(a);
        var B = getVal(b);

        if (A < B) {
            span.text("▲");
            return -1 * f;
        }
        if (A > B) {
            span.text("▼");
            return 1 * f;
        }
        return 0;
    });

    function getVal(elm) {
        var v = $(elm).children('td').eq(n).text().toUpperCase();
        if ($.isNumeric(v)) {
            v = parseInt(v, 10);
        }
        return v;
    }



    $.each(rows, function (index, row) {
        $('#' + mytable).children('tbody').append(row);
    });
}

$('.header').click(function () {
    $(this).toggleClass('expand').nextUntil('tr.header').toggle();
});

$('#select_date_energy').live('click', function () {
    load_energy_tbl_names();
    load_energy_tbl_data();
});

function ddactive_sfp(partialv_name) {

    $.ajax({
        type: "POST",
        url: serverpath + '/SFP/sfp_tabs/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
        }
    });

}

function ddactive_sfpcrew(partialv_name) {
    //$.spin('true');
    $.ajax({
        type: "POST",
        url: serverpath + '/SFP/sfp_tabs_crew/',
        data: { partialview_name: partialv_name },
        success: function (result) {
            $('#htab-panel1').html(result);
            if ($('#page_id').text() == '1') {
                $('#fsfe_log_header').show('slow').animate();
        }
            else {
                $('#fsfe_log_header').hide('slow').animate();
            }
            //$.spin('false');
        }
    });

}

function load_energy_tbl_names() {
    $.ajax({

        url: serverpath + '/Energy/Energy_tbl_names/',

        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#engroup_' + value.Energy_ParamGroup1Id + ' tr:last').after('<tr><td id="paramname_' + value.Energy_ParamId + '"' +
                    '>' + value.Energy_ParamName + '</td><td class="en_valtd" id="paramid_' + value.Energy_ParamId + '"' +
                    '><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                $('.af_tbl tr').each(function () {
                    $(this).nextUntil('tr.header').hide();
                });
            });
        }
    });
}

function load_energy_tbl_data() {
    var date_ = $('#thedate').attr('value');

    $.ajax({

        url: serverpath + '/Energy/Energy_tbl_data/',
        data: {
            active: true
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                //alert('success');
                $("#paramid_" + value.Energy_ParamId + " input").attr('value', value.Energy_NumVal);
            });

        }
    });
}

$('#energy_save_btn').live('click', function () {
    var items = [];

    $('td[id*="paramid"]').each(function () {
        var id = $(this).attr('id');
        var item = parseInt($(this).attr('id').match(/\d+/));
        $(this).find('input.changed').each(function () {
            var val = $(this).val();
            if (val != "") {
                items.push({
                    paramid: item,
                    num_val: val
                })
            }
        });
    });

    if (items.length != 0) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/Energy/Save_energy_data',
            data: items,
            success: function (data) {
                alert('Energy data now saved.');
            }
        });
    }
});

$('#add_item_lnk').live('click', function () {
    $('#dailymg_tbl tbody tr:first').before('<tr class="tr_data"><td><input type="text" class="input_date changed" /></td><td id="paramid_64"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_72"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_73"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_74"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_75"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_77"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td><input type="button" value="Add" id="add_dmg_entry_btn"/></td></tr>');
    $('tbody tr:first').find('input[type="text"]').each(function () {
        $(this).css({ 'background-color': '#DFD8D1' });
    });

    $('input.input_date').find(function () {
        $(this).css({ 'background-color': '#DFD8D1' });
        $(this).addClass('changed');
    });
    show_datepicker();
    paginate('dailymg_tbl', 33);
});

$('#add_item_btn').live('click', function () {
    //$('.input_date').each(function() {
    ////load_partial_energy();
    //});
    //if(
    $('#dailymg_tbl tbody tr:first').before('<tr class="tr_data"><td><input type="text" class="input_date changed" /></td><td id="paramid_64"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_72"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_73"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_74"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_75"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_77"><input class="changed"type="text" onkeypress="return NumericOnly(event)" /></td><td><input type="button" value="Add" id="add_dmg_entry_btn"/></td></tr>');
    $('tbody tr:first').find('input[type="text"]').each(function () {
        $(this).css({ 'background-color': '#DFD8D1' });
    });

    $('input.input_date').find(function () {
        $(this).css({ 'background-color': '#DFD8D1' });
        $(this).addClass('changed');
    });
    show_datepicker();
    paginate('dailymg_tbl', 33);
});

function load_partial_energy() {
    var partialview_link = serverpath + "/Energy/Energy_Partial";
    $('#DialogEnergy_Add').load(partialview_link, function () {
        $(this).dialog('open');
    });
}

function load_dmg_delete(date_) {
    date_ = formatDate_only("" + date_ + "");
    $.ajax({
        url: serverpath + '/Energy/Delete_DMG/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Entry now deleted.');
            clear_dmq_tbl();
            load_dailymg_data($('#dailymg_date').val());
        }
    });
}

function getDaysInMonth(month, year) {
    // Since no month has fewer than 28 days
    var date = new Date(year, month, 1);
    var days = [];
    console.log('month', month, 'date.getMonth()', date.getMonth())
    while (date.getMonth() === month) {
        days.push({
            days: new Date(date).toString("MMMM d, yyyy"),
            dates: new Date(date).toString("M-d-yyyy")
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getMonthFromString(mon) {

    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
        return new Date(d).getMonth();
    }
    return -1;
}

function load_dailymg_data(date) {
    var date_parts = date.split(" ");
    var month = getMonthFromString(date_parts[0]);
    var yr = date_parts[1];
    var days = getDaysInMonth(month, yr);
    var date_ = date;
    $.ajax({
        url: serverpath + '/Energy/Load_ParamNames/',
        data: {},
        type: 'POST',
        cache: false,
        success: function (result) {
            $('#dailymg_tbl thead tr:last').after('<tr id="tr_param"><th style="width: 100px;">Date</th></tr>');
            $.each(result, function (index, value) {
                $('#dailymg_tbl thead tr:last').append('<th>' + value.Energy_ParamName + '</th>');
            });
            //$('#dailymg_tbl thead tr:last').append('<th>Action</th>');

            for (i = 0; i < days.length; i++) {
                $('#dailymg_tbl tbody').append('<tr class="tr_data"><td style="text-align: center;" id="paramdate_' + days[i].dates + '">' + days[i].days + '</td><td id="paramid_64_' + days[i].dates + '"><input class="" type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_72_' + days[i].dates + '"><input class=""type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_73_' + days[i].dates + '"><input class=""type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_74_' + days[i].dates + '"><input class=""type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_75_' + days[i].dates + '"><input class=""type="text" onkeypress="return NumericOnly(event)" /></td><td id="paramid_77_' + days[i].dates + '"><input class=""type="text" onkeypress="return NumericOnly(event)" /></td></tr>');
                //paginate('dailymg_tbl', 33);
            }

            $(document).ready(function () {
                $('input').blur(
                function () {
                    $(this).css({ 'background-color': '#FFFFEEE' });
                });

                $('input').change(
                function () {
                    $(this).css({ 'background-color': '#DFD8D1' });
                    $(this).addClass('changed');
                });
            });

            $.ajax({
        url: serverpath + '/Energy/DailyMG_data/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var prev_date = "";
            $.each(data, function (index, value) {
                        //if (prev_date == "" || prev_date != formatDate_only(value.Energy_MGDate)) {
                        //    $('#dailymg_tbl tbody').append('<tr class="tr_data"><td style="text-align: center;" id="paramdate_' + value.Energy_ParamId + '"' + '>' + formatMonthDate(parseInt((value.Energy_MGDate).substring(6, (value.Energy_MGDate).length - 2)))
                        //                    + '</td><td id="paramid_64_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td id="paramid_72_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td id="paramid_73_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td id="paramid_74_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td id="paramid_75_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td id="paramid_77_' + formatDate_only_af(value.Energy_MGDate) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td><td><a href="#" onclick="load_dmg_delete(' + value.Energy_MGDate + '); return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td></tr>');
                        //    if (value.Energy_MGVal > 0)
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.Energy_MGVal);
                        //    else if (value.UEPower > 0)
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.UEPower);
                        //    else if (value.BunkerPwrPlant > 0)
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.BunkerPwrPlant);
                        //    else if (value.DieselPwrPlant > 0)
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.DieselPwrPlant);
                        //    else if (value.BunkerAcidPlant > 0)
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.BunkerAcidPlant);
                        //    else
                        //        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.DieselCF);

                        //    prev_date = formatDate_only(value.Energy_MGDate);

                        //} else {
                    if (value.Energy_MGVal > 0)
                        $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.Energy_MGVal);
                        else if (value.UEPower > 0)
                            $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.UEPower);
                        else if (value.BunkerPwrPlant > 0)
                            $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.BunkerPwrPlant);
                        else if (value.DieselPwrPlant > 0)
                            $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.DieselPwrPlant);
                        else if (value.BunkerAcidPlant > 0)
                            $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.BunkerAcidPlant);
                        else
                            $('#paramid_' + value.Energy_ParamId + '_' + formatDate_only_af(value.Energy_MGDate) + ' input').val(value.DieselCF);
                        //}
                $(document).ready(function () {
                    $('input').blur(
                    function () {
                        $(this).css({ 'background-color': '#FFFFEEE' });
                    });

                    $('input').change(
                    function () {
                        $(this).css({ 'background-color': '#DFD8D1' });
                        $(this).addClass('changed');
                            });
                    });
                });

                }
            });
        }
    });
    //$('td[id*="param"]').each(function () {

}

$('#dailymg_save_btn').live('click', function () {
    save_dailymg();
});

$('#dailymg_save_lnk').live('click', function () {
    save_dailymg();
});

$('#add_dmg_entry_btn').live('click', function () {
    save_dailymg();
});


function save_dailymg() {
    var items = [];

    $('tr.tr_data').each(function () {
        var newexist = $(this).find('input.input_date').length;
        var oldexist = $(this).find('td[id*="paramdate_"]').length;
        var date_;
        if (newexist == 1) {
            date_ = $(this).find('input.input_date').val();
        } else {
            date_ = $(this).find('td[id*="paramdate_"]').text();
        }
        //var date_ = $(this).text();
        //var date_ = $(this).find('td[id*="paramdate_"]').text();
        $(this).find('td[id*="paramid_"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid_', '');
            var params = num_id.split("_");

            var paramid_ = params[0];
            var val = $(this).find('input.changed').val();
            if (val >= 0 && val != "") {
                items.push({
                    date: date_,
                    paramid: paramid_,
                    value: val
                })
            }
        });
    });

    if (items.length != 0) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/Energy/Save_DailyMG/',
            data: items,
            success: function (data) {
                alert('Data now saved.');
                clear_dmq_tbl();
                load_dailymg_data($('#dailymg_date').val());
            }
        });

    }

    //$('input.changed').removeClass('changed');
    //$('input#changed').removeAttr('id');
}

function clear_dmq_tbl() {
    $('thead #tr_param').remove();
    $("#tbody").empty();
}

function paginate(tablename, limit) {
    // Instantiate pagination after data is available    
    pager = new Pager(tablename, limit);
    pager.init();
    pager.showPageNav('pager', 'pageNavPosition');
    pager.showPage(1);

    // pagination object codes.
    function Pager(tableName, itemsPerPage) {
        this.tableName = tableName;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.pages = 0;
        this.inited = false;

        this.showRecords = function (from, to) {
            var rows = document.getElementById(tableName).rows;
            // i starts from 1 to skip table header row
            for (var i = 3; i < rows.length; i++) {
                if (i < from || i > to) rows[i].style.display = 'none';
                else rows[i].style.display = '';
            }
        }

        this.showPage = function (pageNumber) {
            if (!this.inited) {
                alert("not inited");
                return;
            }

            var oldPageAnchor = document.getElementById('pg' + this.currentPage);
            oldPageAnchor.className = 'pg-normal';

            this.currentPage = pageNumber;
            var newPageAnchor = document.getElementById('pg' + this.currentPage);
            newPageAnchor.className = 'pg-selected';

            var from = (pageNumber - 1) * itemsPerPage + 1;
            var to = from + itemsPerPage - 1;
            this.showRecords(from, to);
        }

        this.prev = function () {
            if (this.currentPage > 1) this.showPage(this.currentPage - 1);
        }

        this.next = function () {
            if (this.currentPage < this.pages) {
                this.showPage(this.currentPage + 1);
            }
        }

        this.init = function () {
            var rows = document.getElementById(tableName).rows;
            var records = (rows.length - 1);
            this.pages = Math.ceil(records / itemsPerPage);
            this.inited = true;
        }

        this.showPageNav = function (pagerName, positionId) {
            if (!this.inited) {
                alert("not inited");
                return;
            }
            var element = document.getElementById(positionId);
            var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> &#171 Prev </span> | ';
            for (var page = 1; page <= this.pages; page++)
                pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> | ';
            pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-normal"> Next &#187;</span>';
            element.innerHTML = pagerHtml;
        }
    }
}

function show_datepicker() {
    $(".input_date").click(function () {
        $(this).datepicker({
            dateFormat: 'MM dd yy'
        });
        $(this).datepicker("show");
    });
    $('.input_date').val(new Date().toString('MMMM dd, yyyy'));
}

$('#add_sfp_entry_btn').live('click', function () {
    load_partial_sfp();
});

$('#add_sfp_entry_lnk').live('click', function () {
    load_partial_sfp();
});

function load_partial_sfp() {
    var group = $('#page_id').text();
    if (group == 1)
        var partialview_link = serverpath + "/SFP/SFP_Partial_CF";
    else
        var partialview_link = serverpath + "/SFP/SFP_Partial_FSF";

    $('#DialogSFP_Add').load(partialview_link, function () {
        $(this).dialog('open');
        //$('.switch-input').prop('checked', true);
        //alert();
        //$('.switch-input').prop('checked', false);
    });
}

function load_partial_sfp_m(id, value) {
    var partialview_link = serverpath + "/SFP/SFP_Partial";
    $('#DialogSFP_Add1').load(partialview_link, function () {
        $(this).dialog('open');
        $('#' + id).val(value);
        $('#' + id).prop('disabled', true);
        $('.ui-dialog-titlebar').css({ "clear": "both", "top": "-700px" });
        $('.ui-dialog').css({ "top": "-700px" });

    });
}

function load_sfp_data(furnace_) {
    var date_now = new Date();
    var pageid = $('#page_id').text();
    $.ajax({

        url: serverpath + '/SFP/SFP_Active_Data/',
        data: {
            furnace: furnace_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#page_id').text(value.SFP_Val_GroupId);
                $('#sfp_tbl tbody').append('<tr><td id="locationname">' + value.SFP_PrevLocationName + '</td><td id="initlocationname">' + (value.SFP_LocationName ? value.SFP_LocationName : "-") + '</td><td id="date_delivered">' + formatDate_af(value.SFP_DTime) + '</td><td id="potno">' + value.SFP_PotId + '</td><td id="ctime">' + value.SFP_CoolTime + '</td><td id="expdate_' + value.SFP_DataId + '">' + formatDate_af(value.SFP_ExpectedDTime) + '</td><td id="frbkdate_' + value.SFP_DataId + '">' + formatDate_af(value.SFP_ForBreakingDTime) + '</td><td id="actualtime">' + formatDate_af(value.SFP_ActualDTime) + '</td><td id="dumptemp">' + (value.SFP_DumpTemp ? value.SFP_DumpTemp : "-") + '</td><td id="sfpremark">' + (value.SFP_Remark ? value.SFP_Remark : "-") + '</td><td><a href="#" onclick="load_sfp_edit(' + value.SFP_DataId + '); return false;">&nbsp;&nbsp;&nbsp;<u>Edit</u>&nbsp;&nbsp;&nbsp;</a></td><td><a href="#" onclick="load_sfp_delete(' + value.SFP_DataId + '); return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td></tr>');
                var edate = new Date(formatDate_af(value.SFP_ExpectedDTime))
                if (date_now > edate) {
                    $('#expdate_' + value.SFP_DataId).css({ "animation": "blink .5s step-end infinite alternate" });
                }
            });
            if (data.length > 0 && (pageid == 1 || pageid == 2))
                paginate('sfp_tbl', 21);
        }
    });
}

function load_sfp_complete_data(furnace_) {
    $.ajax({

        url: serverpath + '/SFP/SFP_Completed_Data/',
        data: {
            furnace: furnace_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#page_id').text(value.SFP_Val_GroupId);
                $('#sfp_tbl tbody').append('<tr><td id="locationname">' + value.SFP_PrevLocationName + '</td><td id="initlocationname">' + (value.SFP_LocationName ? value.SFP_LocationName : "-") + '</td><td id="date_delivered">' + formatDate_af(value.SFP_DTime) + '</td><td id="potno">' + value.SFP_PotId + '</td><td id="ctime">' + value.SFP_CoolTime + '</td><td id="act_ctime">' + subHours(formatDate_af(value.SFP_ActualDTime), formatDate_af(value.SFP_DTime)) + '</td><td id="expdate">' + formatDate_af(value.SFP_ExpectedDTime) + '</td><td id="actualtime">' + formatDate_af(value.SFP_ActualDTime) + '</td><td id="dumptemp">' + (value.SFP_DumpTemp ? value.SFP_DumpTemp : "-") + '</td><td id="sfpremark">' + (value.SFP_Remark ? value.SFP_Remark : "-") + '</td><td><a href="#" onclick="load_sfp_edit_c(' + value.SFP_DataId + '); return false;">&nbsp;&nbsp;&nbsp;<u>Edit</u>&nbsp;&nbsp;&nbsp;</a></td><td><a href="#" onclick="load_sfp_delete_c(' + value.SFP_DataId + '); return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td></tr>');
            });
            if (data.length > 0)
                paginate('sfp_tbl', 21);
        }
    });
}

function load_sfp_edit(DataId) {

    //alert(afb_rcvid);
    var partialview_link = serverpath + "/SFP/EditSFP_Partial/?DataId=" + DataId;
    $('#DialogSFP_Edit').load(partialview_link, function () {
        $(this).dialog('open');
        //$('.ui-dialog-titlebar').css({ "clear": "both", "top": "-700px" });
        //$('.ui-dialog').css({ "top": "-700px" });
    });

    return false;
}

function load_sfp_edit_m(DataId, inputid) {

    //alert(afb_rcvid);
    var partialview_link = serverpath + "/SFP/EditSFP_Partial/?DataId=" + DataId;
    $('#DialogSFP_Edit').load(partialview_link, function () {
        $(this).dialog('open');
        //$('#' + id).val(value);
        $('#' + inputid).prop('disabled', true);
        $('.ui-dialog-titlebar').css({ "clear": "both", "top": "-700px" });
        $('.ui-dialog').css({ "top": "-700px" });
    });

    return false;
}

function load_sfp_edit_m(DataId, inputid) {

    //alert(afb_rcvid);
    var partialview_link = serverpath + "/SFP/EditSFP_Partial/?DataId=" + DataId;
    $('#DialogSFP_Edit').load(partialview_link, function () {
        $(this).dialog('open');
        //$('#' + id).val(value);
        $('#' + inputid).prop('disabled', true);
        $('.ui-dialog-titlebar').css({ "clear": "both", "top": "-700px" });
        $('.ui-dialog').css({ "top": "-700px" });
    });

    return false;
}

function load_sfp_edit_c(DataId) {

    //alert(afb_rcvid);
    var partialview_link = serverpath + "/SFP/EditSFP_Partial_c/?DataId=" + DataId;
    $('#DialogSFP_Edit').load(partialview_link, function () {
        $(this).dialog('open');
    });

    return false;
}

//for active
function load_sfp_delete(dataid_) {

    var answer = confirm('Are you sure you want to delete this?');
    var group = $('#page_id').text();


    if (answer) {

        $.ajax({
            url: serverpath + '/SFP/Delete_SFP/',
            data: {
                sfpid: dataid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                clear_sfp();
                load_sfp_data(group);
                alert('Pot now Deleted.');

                if (group == 0)
                    load_monitor();
                $('#DialogSFP_Edit').dialog('close');
            }
        });
    }

}

//for completed
function load_sfp_delete_c(dataid_) {

    var answer = confirm('Are you sure you want to delete this?');
    var group = $('#page_id').text();

    if (answer) {

        $.ajax({
            url: serverpath + '/SFP/Delete_SFP_completed/',
            data: {
                sfpid: dataid_
            },

            type: 'POST',
            cache: false,
            success: function (data) {
                clear_sfp();
                load_sfp_complete_data(group);
                alert('Pot now Deleted.');
                $('#DialogSFP_Edit').dialog('close');
            }
        });
    }

}

//$('.switch-label, .switch-handle, .switch-input').live('change', function () {
//    var on = $('input[class="switch-input"]:checked').length > 0;
//    if (on) {
//        $('#location_input').val('For Breaking');
//        $('#location_input2').val('For Breaking');
//    }
//});

$('#add_sfp_btn_cf').live('click', function () {
    var location_ = $('#location_input').val();
    var potno_ = $('#pot_input').val();

    var isForBreaking_ = $('input[id="for_breaking_toggle_cf"]:checked').length > 0;

    if (isForBreaking_) {
        location_ = 'For Breaking';
    }

    var add_start_date = new Date($('#start_date_dtime_cf').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    var add_start_fb_date = new Date($('#start_date_input_fb_cf').val());
    var add_start_fb_min = $('#start_time_min_input_fb').val();
    var add_start_fb_hr = $('#start_time_hr_input_fb').val();

    var cooltime_ = $('#cooltime_input').val();
    var est_date = $('#est_dumptime').text();

    var add_start_date2 = new Date($('#start_date_atime_cf').val());
    var add_start_min2 = $('#start_time_min_input2').val();
    var add_start_hr2 = $('#start_time_hr_input2').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });
    add_start_date2 = add_start_date2.add({
        minutes: add_start_min2,
        hours: add_start_hr2
    });
    add_start_fb_date = add_start_fb_date.add({
        minutes: add_start_fb_min,
        hours: add_start_fb_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date_fb_ = add_start_fb_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date2_ = add_start_date2.toString("ddd, dd MMM yyyy H:mm:ss ");

    var add_dtemp = $('#temp_input').val();
    var add_remarks = $('#remarks_input').val();

    var group_ = $('#group_ddl').val();

    if (add_start_date2_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date2_ = "";
    if (add_start_date_fb_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date_fb_ = "";

    $.ajax({
        url: serverpath + '/SFP/Add_SFP/',
        data: {
            locationname: location_,
            potno: potno_,
            dtime: add_start_date_,
            cooltime: cooltime_,
            expdtime: est_date,
            actualdtime: add_start_date2_,
            dtemp: add_dtemp,
            remarks: add_remarks,
            group: group_,
            isForBreaking: isForBreaking_,
            forbreakingtime: add_start_date_fb_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            clear_sfp();
            load_sfp_data(group_);
            $('#DialogSFP_Add').dialog('close');
            $('#DialogSFP_Add1').dialog('close');
            alert("Pot now added.");

            load_monitor();
            //load_partial_sfp();
        }
    });

});

$('#add_sfp_btn_fsf').live('click', function () {
    var location_ = $('#location_input').val();
    var potno_ = $('#pot_input').val();

    var isForBreaking_ = $('input[id="for_breaking_toggle_fsf"]:checked').length > 0;

    if (isForBreaking_) {
        location_ = 'For Breaking';
    }

    var add_start_date = new Date($('#start_date_dtime_fsf').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    var add_start_fb_date = new Date($('#start_date_input_fb_fsf').val());
    var add_start_fb_min = $('#start_time_min_input_fb').val();
    var add_start_fb_hr = $('#start_time_hr_input_fb').val();

    var cooltime_ = $('#cooltime_input').val();
    var est_date = $('#est_dumptime').text();

    var add_start_date2 = new Date($('#start_date_atime_fsf').val());
    var add_start_min2 = $('#start_time_min_input2').val();
    var add_start_hr2 = $('#start_time_hr_input2').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    add_start_date2 = add_start_date2.add({
        minutes: add_start_min2,
        hours: add_start_hr2
    });
    add_start_fb_date = add_start_fb_date.add({
        minutes: add_start_fb_min,
        hours: add_start_fb_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date_fb_ = add_start_fb_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date2_ = add_start_date2.toString("ddd, dd MMM yyyy H:mm:ss ");

    var add_dtemp = $('#temp_input').val();
    var add_remarks = $('#remarks_input').val();

    var group_ = $('#group_ddl').val();

    if (add_start_date2_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date2_ = "";
    if (add_start_date_fb_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date_fb_ = "";

    $.ajax({
        url: serverpath + '/SFP/Add_SFP/',
        data: {
            locationname: location_,
            potno: potno_,
            dtime: add_start_date_,
            cooltime: cooltime_,
            expdtime: est_date,
            actualdtime: add_start_date2_,
            dtemp: add_dtemp,
            remarks: add_remarks,
            group: group_,
            isForBreaking: isForBreaking_,
            forbreakingtime: add_start_date_fb_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            clear_sfp();
            load_sfp_data(group_);
            $('#DialogSFP_Add').dialog('close');
            $('#DialogSFP_Add1').dialog('close');
            alert("Pot now added.");

            $('.sfp_monitor').each(function () {
                $(this).find('tr:not(:first)').remove();
            });
            load_monitor();
            //load_partial_sfp();
        }
    });

});

$('#edit_sfp_btn').live('click', function () {
    var dataid_ = $('#dataid').val();
    var location_ = $('#location_input2').val();
    var potno_ = $('#pot_input').val();

    var isForBreaking_ = $('input[id="for_breaking_toggle_edit"]:checked').length > 0;

    var add_start_fb_date = new Date("");

    if (isForBreaking_) {
        location_ = 'For Breaking';
        add_start_fb_date = new Date($('#start_date_input_edit_fb').val());
    }

    var add_start_date = new Date($('#start_date_input_edit').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    var add_start_fb_min = $('#start_time_min_input_fb').val();
    var add_start_fb_hr = $('#start_time_hr_input_fb').val();

    var cooltime_ = $('#cooltime_input2').val();
    var est_date = $('#est_dumptime2').text();

    var add_start_date2 = new Date($('#start_date_input2_edit').val());
    var add_start_min2 = $('#start_time_min_input2').val();
    var add_start_hr2 = $('#start_time_hr_input2').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });
    add_start_date2 = add_start_date2.add({
        minutes: add_start_min2,
        hours: add_start_hr2
    });
    add_start_fb_date = add_start_fb_date.add({
        minutes: add_start_fb_min,
        hours: add_start_fb_hr
    });


    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date_fb_ = add_start_fb_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date2_ = add_start_date2.toString("ddd, dd MMM yyyy H:mm:ss ");

    var add_dtemp = $('#temp_input2').val();
    var add_remarks = $('#remarks_input2').val();

    var group = $('#group_ddl').val();
    if (group == "FSF")
        group = 2;
    else
        group = 1;

    if (add_start_date2_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date2_ = "";
    if (add_start_date_fb_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date_fb_ = "";

    $.ajax({
        url: serverpath + '/SFP/Edit_SFP/',
        data: {
            dataid: dataid_,
            locationname: location_,
            potno: potno_,
            dtime: add_start_date_,
            cooltime: cooltime_,
            expdtime: est_date,
            actualdtime: add_start_date2_,
            dtemp: add_dtemp,
            remarks: add_remarks,
            isForBreaking: isForBreaking_,
            forbreakingtime: add_start_date_fb_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            clear_sfp();
            load_sfp_data(group);
            alert("Pot now edited.");
            $('#DialogSFP_Edit').dialog('close');

            $('.sfp_monitor').each(function () {
                $(this).find('tr:not(:first)').removeData().remove();
            });
            //location.reload();
            load_monitor();
        }
    });

});

$('#editc_sfp_btn').live('click', function () {
    var dataid_ = $('#dataid').val();
    var location_ = $('#location_input').val();
    var potno_ = $('#pot_input').val();

    var isForBreaking_ = $('input[id="for_breaking_toggle_edit_c"]:checked').length > 0;

    if (isForBreaking_) {
        location_ = 'For Breaking';
    }

    var add_start_date = new Date($('#start_date_input_edit').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    var add_start_fb_date = new Date($('#start_date_input_edit_fb').val());
    var add_start_fb_min = $('#start_time_min_input_fb').val();
    var add_start_fb_hr = $('#start_time_hr_input_fb').val();

    var cooltime_ = $('#cooltime_input2').val();
    var est_date = $('#est_dumptime').text();

    var add_start_date2 = new Date($('#start_date_input2_edit').val());
    var add_start_min2 = $('#start_time_min_input2').val();
    var add_start_hr2 = $('#start_time_hr_input2').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });
    add_start_date2 = add_start_date2.add({
        minutes: add_start_min2,
        hours: add_start_hr2
    });
    add_start_fb_date = add_start_fb_date.add({
        minutes: add_start_fb_min,
        hours: add_start_fb_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date_fb_ = add_start_fb_date.toString("ddd, dd MMM yyyy H:mm:ss ");
    var add_start_date2_ = add_start_date2.toString("ddd, dd MMM yyyy H:mm:ss ");

    var add_dtemp = $('#temp_input').val();
    var add_remarks = $('#remarks_input').val();

    var group = $('#group_ddl').val();
    if (group == "FSF")
        group = 2;
    else
        group = 1;


    if (add_start_date2_ == "undefined, NaN undefined NaN NaN:NaN:NaN ")
        add_start_date2_ = "";

    $.ajax({
        url: serverpath + '/SFP/Edit_SFP/',
        data: {
            dataid: dataid_,
            locationname: location_,
            potno: potno_,
            dtime: add_start_date_,
            cooltime: cooltime_,
            expdtime: est_date,
            actualdtime: add_start_date2_,
            dtemp: add_dtemp,
            remarks: add_remarks,
            isForBreaking: isForBreaking_,
            forbreakingtime: add_start_date_fb_
        },

        type: 'POST',
        cache: false,
        success: function (data) {
            clear_sfp();
            load_sfp_complete_data(group);
            alert("Pot now edited.");
            $('#DialogSFP_Edit').dialog('close');

        }
    });

});

function clear_monitor() {
    $('div[id*="Dialog"]').dialog('close');
    $('.sfp_monitor').each(function () {
        $(this).find('tr:not(:first)').remove();
    });
}

function clear_sfp() {
    $('#sfp_tbl tr:not(:first)').each(function () {
        $(this).remove();
    });
}

$('#group_ddl').live('change', function () {
    if ($(this).val() == 1) {
        $('#cooltime_input').val('55');
        $('#cooltime_input2').val('55');
    } else {
        $('#cooltime_input').val('25');
        $('#cooltime_input2').val('25');
    }
    calc_edtime_add_cf();
});

function subHours(start_date, end_date) {
    var newtime = Date.daysBetween(new Date(end_date), new Date(start_date));
    var end = new Date(start_date);
    var start = new Date(end_date);
    var cooltime = (new Date(start_date) - new Date(end_date)) / 1000 / 60 / 60;
    return cooltime.toFixed(0);
}

function calc_edtime_add_cf() {
    var cooltime = $('#cooltime_input').val();

    var add_start_date = new Date($('#start_date_dtime_cf').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();
    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });


    var add_start_date_ = add_start_date.addHours(cooltime);

    var edtime = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");


    $('#est_dumptime').html('<span id="est_dumptime">' + edtime + '</span>');
}

function calc_edtime_add_fsf() {
    var cooltime = $('#cooltime_input').val();

    var add_start_date = new Date($('#start_date_dtime_fsf').val() ? $('#start_date_dtime_fsf').val() : $('#start_date_dtime_cf').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();
    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });


    var add_start_date_ = add_start_date.addHours(cooltime);

    var edtime = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");


    $('#est_dumptime').html('<span id="est_dumptime">' + edtime + '</span>');
}

function calc_edtime_edit() {
    var cooltime = $('#cooltime_input2').val();

    var add_start_date = new Date($('#start_date_input_edit').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();
    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.addHours(cooltime);

    var edtime = add_start_date_.toString("ddd, dd MMM yyyy H:mm:ss ");


    $('#est_dumptime2').html('<span id="est_dumptime">' + edtime + '</span>');
}

$('#cooltime_input').live('input', function () {
    var group = $('#page_id').text();
    if (group == 1)
        calc_edtime_add_cf();
    else
        calc_edtime_add_fsf();
});

$('#cooltime_input2').live('input', function () {
    calc_edtime_edit();
});

function check_data_overdue(edtime) {
    edtime = new Date(formatDate_af(edtime))
    if (new Date() > edtime)
        return true;
    else
        return false;
}

function load_monitor() {
    clear_monitor();

    var pageid = $('#page_id').text('0');
    load_sfprealtime(1);
    load_sfprealtime(2);
    $("#ui-datepicker-div").hide();
    $.ajax({

        url: serverpath + '/SFP/SFP_Monitor_Location/',
        data: {},
        type: 'POST',
        cache: false,
        success: function (data) {
            var location_input = 'location_input';
            $.each(data, function (index, value) {
                var isOverdue = false;
                if (value.DataId != null && value.SFP_Location_StatusId == 1) {
                    $('#sfpgroup_' + value.SFP_GroupdId + ' tr:last').after('<tr><td onclick="load_sfp_edit_m(' + value.DataId + ')" id="paramname_' + value.LocationId + '" class="' + value.DataId + '"' +
                            '>' + value.LocationName + '<span class="status_' + value.SFP_Location_StatusId + '"></span></td>');
                    isOverdue = check_data_overdue(value.SFP_ExpectedDTime);
                    //$('#paramname_' + value.LocationId).live('click', function () {
                    //    load_sfp_edit_m(value.DataId, 'location_input2');
                    //});
                } else {
                    location_input = "location_input";
                    $('#sfpgroup_' + value.SFP_GroupdId + ' tr:last').after('<tr><td onclick="load_partial_sfp_m(\'' + location_input + '\',\'' + value.LocationName + '\')" id="paramname_' + value.LocationId + '"' +
                            '>' + value.LocationName + '<span class="status_' + value.SFP_Location_StatusId + '"></span></td>');
                    //$('#paramname_' + value.LocationId).live('click', function () {
                    //    load_partial_sfp_m('location_input', value.LocationName);
                    //});
                }
                if (value.SFP_Location_StatusId == 1 && !isOverdue) {
                    $('.status_' + value.SFP_Location_StatusId).addClass('active');
                } else if (isOverdue && value.SFP_Active != 1) {
                    $('td[id="paramname_' + value.LocationId + '"]').find('span').remove();
                    $('td[id="paramname_' + value.LocationId + '"]').append('<span class="overdue">');
                }

            });
            //$('.sfp_arrow').show();
        }
    });

    $.ajax({

        url: serverpath + '/SFP/SFP_Monitor_Pot/',
        data: {},
        type: 'POST',
        cache: false,
        success: function (data) {
            var pot_input = 'pot_input';
            $.each(data, function (index, value) {
                var isOverdue = false;
                if (value.DataId != null && (value.SFP_Active == 1 || value.SFP_Active == 2)) {
                    $('#sfpgroup_' + value.SFP_GroupdId + ' tr:last').after('<tr><td onclick="load_sfp_edit_m(' + value.DataId + ')"  id="paramnamep_' + value.PotNo + '" class="' + value.DataId + '"' +
                            '>' + value.PotNo + '<span class="status_' + value.SFP_Active + '"></span></td>');
                    isOverdue = check_data_overdue(value.SFP_ExpectedDTime);
                    //$('#paramnamep_' + value.PotNo).live('click', function () {
                    //    load_sfp_edit_m(value.DataId, 'pot_input');
                    //});
                } else {
                    $('#sfpgroup_' + value.SFP_GroupdId + ' tr:last').after('<tr><td onclick="load_partial_sfp_m(\'' + pot_input + '\',\'' + value.PotNo + '\')"  id="paramnamep_' + value.PotNo + '"' +
                            '>' + value.PotNo + '<span class="status_' + value.SFP_Active + '"></span></td>');
                    //$('#paramnamep_' + value.PotNo).live('click', function () {
                    //    load_partial_sfp_m('pot_input', value.PotNo);
                    //});
                }
                if (value.SFP_Active == 1 && !isOverdue) {
                    $('td[id*="paramnamep_' + value.PotNo + '"] .status_' + value.SFP_Active).addClass('active');
                } else if (value.SFP_Active == 2 || (value.SFP_Active == 2 && isOverdue)) {
                    $('td[id*="paramnamep_' + value.PotNo + '"] .status_' + value.SFP_Active).addClass('for_breaking');
                }

                else if (isOverdue && (value.SFP_Active != 2 || value.SFP_Active != 1)) {
                    $('td[id*="paramnamep_' + value.PotNo + '"]').find('span').remove();
                    $('td[id*="paramnamep_' + value.PotNo + '"]').append('<span class="overdue">');
                }
            });

        }
    });

}

$('.sfp_arrow').live('click', function () {
    var $scroll_div = $(this).siblings('div');
    var id = $(this).attr('id');
    if (id.indexOf('up') !== -1)
        $scroll_div.scrollTop(-500);
    else if (id.indexOf('down') !== -1)
        $scroll_div.scrollTop(500);
});

function load_sfprealtime(group) {
    var empty;
    var cooling;
    var overdue;

    $.ajax({
        url: serverpath + '/SFP/countSummary/',
        data: {
            furnace: group
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $('#cooling_' + group).text(data[0]);
            $('#overdue_' + group).text(data[1]);
            $('#empty_1').text(data[2]);
            $('#forbreaking_' + group).text(data[3]);
            $("#ui-datepicker-div").hide();
        }
    });

}


$('#cf_date').live('change', function () {
    $('td[id*="cf_hr_"]').each(function () {
        $(this).text("");
    });
    var date_ = $('#cf_date').val();
    $.ajax({
        url: serverpath + '/SFP/Summary_hourly/',
        data: {
            date: date_,
            furnace: 1
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#cf_hr_' + value.OnHour).text(value.Totals);
            });
        }
    });
    $('td[id*="cf_hr_"]').each(function () {
        if ($(this).text() == "")
            $(this).text('0');
    });

});

$('#fsf_date').live('change', function () {
    $('td[id*="fsf_hr_"]').each(function () {
        $(this).text("");
    });
    var date_ = $('#fsf_date').val();
    $.ajax({
        url: serverpath + '/SFP/Summary_hourly/',
        data: {
            date: date_,
            furnace: 2
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#fsf_hr_' + value.OnHour).text(value.Totals);
            });
        }
    });
    $('td[id*="fsf_hr_"]').each(function () {
        if ($(this).text() == "")
            $(this).text('0');
    });

});

function load_partial_sfpconsumable(group_) {
    var partialview_link = serverpath + "/SFP/SFP_Partial_Consumable/?GroupId=" + group_;
    $('#DialogSFPCon_Add').load(partialview_link, function () {
        $(this).dialog('open');
    });
}
function load_partial_sfpconsumable_edit(DataId) {
    var partialview_link = serverpath + "/SFP/EditSFP_Partial_Consumable/?DataId=" + DataId;
    $('#DialogSFPCon_Edit').load(partialview_link, function () {
        $(this).dialog('open');
    });
}

$('#add_sfpconsumable_btn').live('click', function () {
    var shift_count = $('#page_id').text();
    var group = $('#con_group').text();
    var select = $('#consumable_date').val();

    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.toString("M-dd-yyyy");
    var paramdate = add_start_date.toString("M/dd/yyyy");

    var params = [];
    $.ajax({
        url: serverpath + '/SFP/Consumables_Params/',
        data: {
            groupid: group,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                params.push({ id: value.SFP_ParamId });
            });

            $('#sfp_con_tbl tr:nth-child(2)').after('<tr class="tr_data"><td id="paramdate_' + add_start_date_ + '">' + paramdate + '</td></tr>');
            for (i = 0, j = 0, k = 1; i < shift_count; i++, k++) {
                $('#sfp_con_tbl tr:nth-child(3)').append('<td id="paramshift_' + k + '_' + params[j].id + '_' + add_start_date_ + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td>');
                if (k == 3) {
                    j++;
                    k = 0;
                }
            } $('#DialogSFPCon_Add').dialog('close');
        }
    });


});

$('#consumables_save_btn').live('click', function () {
    var items = [];

    $('#sfp_con_tbl tr.tr_data').each(function () {
        var date_ = $(this).find('td[id*="paramdate"]').text();
        $(this).find('td[id*="paramshift"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[2];
            var shift_ = params[1];

            var numval_ = $(this).find('input').val();
            var date = new Date(date_);
            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    date: date_,
                    shift: shift_,
                    paramid: paramid_,
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
            url: serverpath + '/SFP/Save_SFPConsumables',
            data: items,
            success: function (data) {
                alert('Consumables now saved.');
                var date = $('#consumable_date').val();
                var group = $('#con_group').text();
                load_consumables(group, date);
            }
        });
    }
});

function clear_consumable() {
    $("#ui-datepicker-div").hide();
    $('.tr_data').each(function () {
        $(this).remove();
    });
    $('.th_params').each(function () {
        $(this).remove();
    });
    $('tr#shifts').remove();
    $('tr#params').remove();
}

function load_consumables(group, date_) {
    clear_consumable();
    $('#con_group').text(group);
    var shift_count;
    var params = [];
    //$.spin('true');
    $.ajax({
        url: serverpath + '/SFP/Consumables_Params/',
        data: {
            groupid: group,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            shift_count = data.length * 3;
            $('#page_id').text(shift_count);
            $.each(data, function (index, value) {
                $('#sfp_con_tbl tr:first').append('<th class="th_params" colspan="3" style="width: 150px">' + value.SFP_ParamName + '</th>');
                params.push({ id: value.SFP_ParamId });
            });
            $('#sfp_con_tbl tr:first').after('<tr id="shifts"></tr>');
            $.each(data, function (index, value) {
                $('#sfp_con_tbl tr#shifts').append('<th class="th_params">S1</th>');
                $('#sfp_con_tbl tr#shifts').append('<th class="th_params">S2</th>');
                $('#sfp_con_tbl tr#shifts').append('<th class="th_params">S3</th>');
            });

            $.ajax({
                url: serverpath + '/SFP/Consumables_Data/',
                data: {
                    gr: group,
                    date: date_
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    var prev_date = "";
                    $.each(data, function (index, value) {
                        if (prev_date == "" || prev_date != formatDate_only(value.SFP_Date)) {
                            $('#sfp_con_tbl tr:last').after('<tr class="tr_data"><td id="paramdate_' + value.SFP_ParamGroupId + '"' + '>' + formatDate_only(value.SFP_Date)
                                    + '</td></tr>');
                            for (i = 0, j = 0, k = 1; i < shift_count; i++, k++) {
                                $('#sfp_con_tbl tr:last').append('<td id="paramshift_' + k + '_' + params[j].id + '_' + formatDate_only_af(value.SFP_Date) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td>');
                                if (k == 3) {
                                    j++;
                                    k = 0;
                                }
                            }
                            $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date) + ' input').val(value.SFP_NumVal);
                            prev_date = formatDate_only(value.SFP_Date);

                        } else {
                            $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date) + ' input').val(value.SFP_NumVal);
                        }
                    });
                    //$.spin('false');
                }
            });
        }
    });


}

function load_consumable_data_tab1(date_) {
    clear_consumable();
    $.ajax({
        url: serverpath + '/SFP/Consumables_Data/',
        data: {
            gr: 18,
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var prev_date = "";
            $.each(data, function (index, value) {
                if (prev_date == "" || prev_date != formatDate_only(value.SFP_Date)) {
                    $('#sfp_con_tbl tr:last').after('<tr class="tr_data"><td id="paramdate_' + value.SFP_ParamGroupId + '"' + '>' + formatDate_only(value.SFP_Date)
                        + '</td><td id="paramshift_1_3' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_3' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_3' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_4' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_4' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_4' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_5' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_5' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_5' + '_' + formatDate_only_af(value.SFP_Date) + '"></td></tr>');
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                    prev_date = formatDate_only(value.SFP_Date);
                } else {
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                }
            });
        }
    });
}

function load_consumable_data_tab2(date_) {
    clear_consumable();
    $.ajax({
        url: serverpath + '/SFP/Consumables_Data/',
        data: {
            gr: 19,
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var prev_date = "";
            $.each(data, function (index, value) {
                if (prev_date == "" || prev_date != formatDate_only(value.SFP_Date)) {
                    $('#sfp_con_tbl tr:last').after('<tr class="tr_data"><td id="paramdate_' + value.SFP_ParamGroupId + '"' + '>' + formatDate_only(value.SFP_Date)
                        + '</td><td id="paramshift_1_11' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_11' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_11' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_12' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_12' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_12' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_14' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_14' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_14' + '_' + formatDate_only_af(value.SFP_Date) + '"></td></tr>');
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                    prev_date = formatDate_only(value.SFP_Date);
                } else {
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                }
            });
        }
    });
}

function load_consumable_data_tab3(date_) {
    clear_consumable();
    $.ajax({
        url: serverpath + '/SFP/Consumables_Data/',
        data: {
            gr: 20,
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var prev_date = "";
            $.each(data, function (index, value) {
                if (prev_date == "" || prev_date != formatDate_only(value.SFP_Date)) {
                    $('#sfp_con_tbl tr:last').after('<tr class="tr_data"><td id="paramdate_' + value.SFP_ParamGroupId + '"' + '>' + formatDate_only(value.SFP_Date)
                        + '</td><td id="paramshift_1_6' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_6' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_6' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_8' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_8' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_8' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_1_9' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_9' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_9' + '_' + formatDate_only_af(value.SFP_Date) + '"></td></td><td id="paramshift_1_10' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_2_10' + '_' + formatDate_only_af(value.SFP_Date) + '"></td><td id="paramshift_3_10' + '_' + formatDate_only_af(value.SFP_Date) + '"></td></tr>');
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                    prev_date = formatDate_only(value.SFP_Date);
                } else {
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).text(value.SFP_NumVal);
                    $('#paramshift_' + value.SFP_ShiftId + '_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_Date)).live('click', function () {
                        load_partial_sfpconsumable_edit(value.SFP_Consummable_ValId);
                    });
                }
            });
        }
    });
}

function load_targets_tbl_names() {
    clear_consumable();
    $('.targets_tabs-menu li').remove();
    $.ajax({
        url: serverpath + '/SFP/SFP_Targets_Group/',
        data: {
            groupname: "Limits"
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li><a href="#sfptarget_tab-' + value.SFP_ParamGroupId + '">' + value.SFP_ParamGroup1Name + '</a></li>');
                $('.targets_tab').append('<div id="sfptarget_tab-' + value.SFP_ParamGroupId + '"  class="targets_tab-content"><table class="af_tbl" id="sfptarget_' + value.SFP_ParamGroupId + '"><tr><th colspan="4">' + value.SFP_ParamGroup1Name + '</th></tr><tr><th style="width: 150px;">Name</th><th>Target</th><th>LL</th><th>UL</th></tr></table></div>');
            });

            $.ajax({

                url: serverpath + '/SFP/SFP_Targets_tbl_names/',
                type: 'POST',
                cache: false,
                success: function (data) {

                    $.each(data, function (index, value) {
                        $('#sfptarget_' + value.SFP_ParamGroupId + ' tr:last').after('<tr class="tr_data"><td id="paramname_' + value.SFP_ParamId + '"' +
                            '>' + value.SFP_ParamName + '</td><td class="sfptarget_td" id="paramid_' + value.SFP_ParamId + '_1"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="sfpll_td" id="paramid_' + value.SFP_ParamId + '_2"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>' + '</td><td class="sfpul_td" id="paramid_' + value.SFP_ParamId + '_3"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                        //$('.af_tbl tr').each(function () {
                        //    $(this).nextUntil('tr.header').hide();
                        //});
                    });

                    $.ajax({

                        url: serverpath + '/SFP/SFP_Targets_tbl_data/',
                        type: 'POST',
                        cache: false,
                        success: function (data) {

                            $.each(data, function (index, value) {
                                //alert('success');
                                $("#paramid_" + value.SFP_ParamId + "_" + value.SFP_Target_ValueTypeId + " input").attr('value', value.SFP_Target_NumValue);
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

function load_forecast_tbl(date_) {
    clear_consumable();
    $('.targets_tabs-menu li').remove();
    $("#ui-datepicker-div").hide();
    $.ajax({
        url: serverpath + '/SFP/SFP_Targets_Group/',
        data: {
            groupname: "Limits"
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('.targets_tabs-menu').append('<li><a href="#sfptarget_tab-' + value.SFP_ParamGroupId + '">' + value.SFP_ParamGroup1Name + '</a></li>');
                $('.targets_tab').append('<div id="sfptarget_tab-' + value.SFP_ParamGroupId + '"  class="targets_tab-content"><table class="af_tbl" id="sfptarget_' + value.SFP_ParamGroupId + '"><tr><th colspan="4">' + value.SFP_ParamGroup1Name + '</th></tr><tr><th style="width: 150px;">Name</th><th>Target</th></tr></table></div>');
            });
            $.ajax({

                url: serverpath + '/SFP/SFP_Targets_tbl_names/',
                type: 'POST',
                cache: false,
                success: function (data) {

                    $.each(data, function (index, value) {
                        $('#sfptarget_' + value.SFP_ParamGroupId + ' tr:last').after('<tr class="tr_data"><td id="paramname_' + value.SFP_ParamId + '"' +
                            '>' + value.SFP_ParamName + '</td><td class="sfptarget_td" id="paramid_' + value.SFP_ParamId + '_' + value.SFP_ParamGroupId + '"' +
                            '><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                        //$('.af_tbl tr').each(function () {
                        //    $(this).nextUntil('tr.header').hide();
                        //});
                    });

                    $.ajax({

                        url: serverpath + '/SFP/SFP_Forecast_tbl_data/',
                        data: {
                            date: date_
                        },
                        type: 'POST',
                        cache: false,
                        success: function (data) {

                            $.each(data, function (index, value) {
                                //alert('success');
                                $("#paramid_" + value.SFP_ParamId + "_" + value.SFP_ParamGroupId + " input").attr('value', value.SFP_Forecast_NumValue);
                            });

                        }
                    });
                }
            });
            $('.targets_tabs-menu li:first').addClass('current');
        }
    });
}

$('#sfp_targets_save_btn').live('click', function () {
    var items = [];

    $('table[id*="sfptarget"]').each(function () {
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
            url: serverpath + '/SFP/Save_SFPTargets',
            data: items,
            success: function (data) {
                alert('Targets now saved.');
                load_targets_tbl_names();
            }
        });
    }

});

$('#forecast_save_btn').live('click', function () {
    var date_ = $('#forecast_date').val();
    var items = [];

    $('.af_tbl[id*="sfptarget"]').each(function () {
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];
            var group_ = params[2];
            var numval_ = $(this).find('input').val();

            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    date: date_,
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
            url: serverpath + '/SFP/Save_SFPForecast',
            data: items,
            success: function (data) {
                alert('Forecast now saved.');
                load_forecast_tbl(date_);
            }
        });
    }

});

/** Old SFP **/
function load_partial_oldsfp() {
    var partialview_link = serverpath + "/SFP/OldSFP_Partial";
    $('#DialogOldSFP_Add').load(partialview_link, function () {
        $(this).dialog('open');
        material_data();
    });
}

function load_oldsfp_tbl(date_) {
    clear_consumable();
    $.ajax({
        url: serverpath + '/SFP/SFP_OldSFP_data/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            var prev_date = "";
            $.each(data, function (index, value) {
                $('#sfptarget_34 tr:last').after('<tr class="tr_data"><td id="sfpdate">' + formatDate_af(value.SFP_Date) + '</td><td id="weigherid_' + value.WeigherId + '">' + value.WeigherName + '</td><td id="materialid_' + value.MaterialId + '">' + value.MaterialName + '</td></tr>');
                paginate('sfptarget_34', 17);
            });
        }
    });
}

$('#add_oldsfp_btn_p').live('click', function () {
    var date = $('#oldsfp_date').val();

    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var weigherid_ = $('#weigher_ddl').val();
    var materialid_ = $('#material_ddl').val();

    $.ajax({
        url: serverpath + '/SFP/Add_OldSFP/',
        data: {
            date: add_start_date_,
            weigherid: weigherid_,
            materialid: materialid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Material now added.');
            load_oldsfp_tbl(date);
        }
    });
});

$('#weigher_ddl').live('change', function () {
    material_data();
});

function material_data() {
    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.toString("ddd, dd MMM yyyy H:mm:ss ");

    var weigherid_ = $('#weigher_ddl').val();

    $.ajax({
        url: serverpath + '/SFP/OldSFP_Data/',
        data: {
            date: add_start_date_,
            weigherid: weigherid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            //$('#weigher_ddl').empty();

            $.each(data, function (index, value) {
                //    $('#weigher_ddl').append('<option value="' +  + '">' + value + '</option>');
                //});
                $('#material_ddl').val(value.max);
            });
        }
    });
}

/** SFP Buckets **/
$('#add_bucketsitem_btn').live('click', function () { load_partial_sfpbuckets() });
$('#add_buckets_lnk').live('click', function () { load_partial_sfpbuckets() });

function load_partial_sfpbuckets() {
    var partialview_link = serverpath + "/SFP/SFPBuckets_Partial";
    $('#DialogSFPBuckets_Add').load(partialview_link, function () {
        $(this).dialog('open');
    });
}

function load_sfp_buckets() {
    clear_consumable();
    var shift_count;
    var params = [];
    $.ajax({
        url: serverpath + '/SFP/SFP_Buckets_Params/',
        type: 'POST',
        cache: false,
        success: function (data) {
            shift_count = data.length;
            $('#page_id').text(shift_count);
            $('#buckets_tbl tr:last').after('<tr id="params"><th rowspan="2" style="width: 100px;">Date</th></tr>');
            var prev_param = "";
            $.each(data, function (index, value) {
                var param = (value.SFP_ParamName).substring(0, (value.SFP_ParamName).indexOf(","))
                if (prev_param == "" || prev_param != param) {
                    $('#buckets_tbl tr:last').append('<th class="th_params" colspan="2" style="width: 100px">' + param + '</th>');
                    prev_param = param;
                } params.push({ id: value.SFP_ParamId });
            });
            $('#buckets_tbl tr:last').append('<th rowspan="2">Action</th>');
            $('#buckets_tbl tr:last').after('<tr id="shifts"></tr>');
            $.each(data, function (index, value) {
                var param = (value.SFP_ParamName).substring(0, (value.SFP_ParamName).indexOf(","))
                if (prev_param == "" || prev_param != param) {
                    $('#buckets_tbl tr#shifts').append('<th class="th_params">Big Bkts</th>');
                    $('#buckets_tbl tr#shifts').append('<th class="th_params">Sml Bkts</th>');
                    prev_param = param;
                }
            });
            var date_ = $('#buckets_date').val();
            $.ajax({
                url: serverpath + '/SFP/Buckets_Data/',
                data: {
                    date: date_
                },
                type: 'POST',
                cache: false,
                success: function (data) {
                    var prev_date = "";
                    $.each(data, function (index, value) {
                        if (prev_date == "" || prev_date != formatDate_only(value.SFP_DTime)) {
                            $('#buckets_tbl tr:last').after('<tr class="tr_data"><td id="paramdate_' + formatDate_only_af(value.SFP_DTime) + '"' + '>' + formatDate_only(value.SFP_DTime)
                                    + '</td></tr>');
                            for (i = 0, j = 0; i < shift_count; i++, j++) {
                                $('#buckets_tbl tr:last').append('<td id="paramid_' + params[j].id + '_' + formatDate_only_af(value.SFP_DTime) + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td>');
                            }
                            $('#buckets_tbl tr:last').append('<td><a href="#" onclick="delete_bucket_row(' + value.SFP_DTime + '); return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td>');
                            $('#paramid_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_DTime) + ' input').val(value.SFP_Bucket_Val);
                            prev_date = formatDate_only(value.SFP_DTime);

                        } else {
                            $('#paramid_' + value.SFP_ParamId + '_' + formatDate_only_af(value.SFP_DTime) + ' input').val(value.SFP_Bucket_Val);
                        }
                    });
                    paginate('buckets_tbl', 18);
                }
            });
        }
    });
}

function delete_bucket_row(sfpdate) {
    date_ = formatDate_only("" + sfpdate + "");
    $.ajax({
        url: serverpath + '/SFP/Delete_Buckets/',
        data: {
            date: date_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            alert('Buckets now deleted.');
            load_sfp_buckets();
        }
    });
}

$('#add_sfpbuckets_btn').live('click', function () {
    var add_start_date = new Date($('#start_date_input').val());
    var add_start_min = $('#start_time_min_input').val();
    var add_start_hr = $('#start_time_hr_input').val();

    add_start_date = add_start_date.add({
        minutes: add_start_min,
        hours: add_start_hr
    });

    var add_start_date_ = add_start_date.toString("M/d/yyyy");
    var paramdate = add_start_date.toString("M-dd-yyyy");
    var date = formatDate_sfp(add_start_date_);
    shift_count = $('#page_id').text();
    var params = [];
    $.ajax({
        url: serverpath + '/SFP/SFP_Buckets_Params/',
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                params.push({ id: value.SFP_ParamId });
            });
            $('#buckets_tbl tr:nth-child(3)').after('<tr class="tr_data"><td id="paramdate_' + paramdate + '">' + add_start_date_ + '</td></tr>');
            for (i = 0, j = 0; i < shift_count; i++, j++) {
                $('#buckets_tbl tr:nth-child(4)').append('<td id="paramid_' + params[j].id + '_' + paramdate + '"><input style="width: 100%" type="text" onkeypress="return NumericOnly(event)"/></td>');
            } $('#DialogSFPCon_Add').dialog('close');
            $('#buckets_tbl tr:nth-child(4)').append('<td><a href="#" onclick="delete_bucket_row(' + paramdate + '); return false;">&nbsp;&nbsp;&nbsp;<u>Delete</u>&nbsp;&nbsp;&nbsp;</a></td>');
        }
    }); $('#DialogSFPBuckets_Add').dialog('close');
});

$('#buckets_save_btn').live('click', function () {
    var items = [];

    $('#buckets_tbl tr.tr_data').each(function () {
        var date_ = $(this).find('td[id*="paramdate"]').text();
        $(this).find('td[id*="paramid"]').each(function () {
            var attrid = $(this).attr('id');
            var num_id = attrid.replace('paramid', '');
            var params = num_id.split("_");

            var paramid_ = params[1];

            var numval_ = $(this).find('input').val();
            var date = new Date(date_);
            if (numval_ != "" && $(this).find('input').hasClass('changed')) {
                items.push({
                    date: date_,
                    paramid: paramid_,
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
            url: serverpath + '/SFP/Save_Buckets',
            data: items,
            success: function (data) {
                alert('Buckets now saved.');
                load_sfp_buckets();
            }
        });
    }
});

function load_default_crew(crewid_) {
    $.ajax({
        url: serverpath + '/SFP/Load_CrewDefault/',
        data: {
            crewid: crewid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#SPPCrewlist_crewroleid_' + value.SFP_Role_Type_Id).attr('value', value.SFP_EmpId);
            });
        }
    });

}


function save_crew_default() {
    var crew_ = $('#SFPcrewdefaultlist').val();
    var items = [];

    if (crew_ != "") {
        //var count = check_crew_ddls();
        //if (count == 0) {
        $('select[id*="SPPCrewlist_"].changed').each(function () {
            var attrid = $(this).attr('id');

            var roletypeid_ = attrid.replace('SPPCrewlist_crewroleid_', '');
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
                url: serverpath + '/SFP/Save_CrewDefault',
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
        $('#SFPcrewdefaultlist').focus();
    }
}

function check_crew_ddls() {
    var count = 0;
    $('select[id*="SPPCrewlist_"]').each(function () {
        var ddl_val = $(this).val()
        if (ddl_val == "") {
            $(this).css({ "border-color": "red" });
            count++;
        }
    });
    return count;
}

$('#sfp_crewdefault_btn').live('click', function () {
    save_crew_default();
});

$('#sfp_savecrewdefault_link').live('click', function () {
    save_crew_default();
});

$('#SFPcrewdefaultlist').live('change', function () {
    if ($('#SFPcrewdefaultlist').val() != "") {
        $('select[id*="SPPCrewlist_"]').each(function () {
            $(this).css({ "background-color": "#FBFBFB" });
            $(this).removeClass('changed');
            $(this).attr('value', '');
            $(this).prop('disabled', false);
        });
        var crewid = $(this).val();
        load_default_crew(crewid);
    }
    else
        $('select[id*="SPPCrewlist_"]').each(function () {
            $(this).prop('disabled', true);
            //$(this).find('option:first-child').attr("selected", "selected");
            $(this).attr('value', '');
        });

});

$('#sfp_shift_btn').live('click', function () {
    $('#fsfe_log_header').css({ 'background-color': '#FFFCCC' });
    $('#sfp_prod_id').text('1');
    $('#SFPcrewdefaultlist').prop('disabled', false);
    load_sfp_manpower();
});

$('#sfp_manpower_btn').live('click', function () { save_manpower() });
$('#sfp_savemanpower_lnk').live('click', function () { save_manpower() });


function save_manpower() {
    var date_ = $('#sfp_shiftdate').val();
    var shiftid_ = $('#sfp_shiftdate_select').val();

    var crew_ = $('#SFPcrewdefaultlist').val();

    if (crew_ != "") {

        $.ajax({
            url: serverpath + '/SFP/Save_ShiftAssign/',
            data: {
                date: date_,
                shiftid: shiftid_,
                crewid: crew_
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.ajax({
                    url: serverpath + '/SFP/getShiftAssignId/',
                    data: {
                        date: date_,
                        shiftid: shiftid_,
                        crewid: crew_
                    },
                    type: 'POST',
                    cache: false,
                    success: function (data) {
                        $.ajax({
                            url: serverpath + '/SFP/Delete_Crew/',
                            data: {
                                prodid: data
                            },
                            type: 'POST',
                            cache: false,
                            success: function (result) {
                        var shiftassignid_ = data;
                        var items = [];

                        //var count = check_crew_ddls();
                        //if (count == 0) {
                        $('select[id*="SPPCrewlist_"]').each(function () {
                            var attrid = $(this).attr('id');

                            var roletypeid_ = attrid.replace('SPPCrewlist_crewroleid_', '');
                            var empid_ = $(this).val();
                            items.push({
                                shiftassignid: shiftassignid_,
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
                                url: serverpath + '/SFP/Save_SFP_ManPower',
                                data: items,
                                success: function (data) {
                                    alert('Man Power now saved.');
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
    else {
        alert('Select Crew First.');
        $('#SFPcrewdefaultlist').focus();
    }
}

function load_sfp_manpower() {
    reset_crew_dll();
    var tab = $('#page_id').text();
    if (tab == "1") {
        $('select[id*="SPPCrewlist_"]').each(function () {
            $(this).prop('disabled', false);
        });
        var date_ = $('#sfp_shiftdate').val();
        var shiftid_ = $('#sfp_shiftdate_select').val();

        $.ajax({
            url: serverpath + '/SFP/Load_SFP_ManPower/',
            data: {
                date: date_,
                shiftid: shiftid_,
            },
            type: 'POST',
            cache: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    $('#SFPcrewdefaultlist').attr('value', value.SFP_CrewId);
                    $('#SPPCrewlist_crewroleid_' + value.SFP_Role_Type_Id).attr('value', value.SFP_EmpId);
                });
            }
        });
    }
}

function reset_crew_dll() {
    $('#htab-panel1 select').each(function () {
        $(this).attr('value', '');
    });
}

function load_sfp_comments() {
    clear_comments();

    var date_ = $('#sfp_comments_date').val();
    $.ajax({
        url: serverpath + '/SFP/Load_SFP_Comments/',
        data: {
            date: date_,
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                if (value.SFP_ParamId == 256 || value.SFP_ParamId == 257)
                    $('#paramid_' + value.SFP_ParamId).val(value.SFP_Comment_Val);
                else
                    $('#paramid_' + value.SFP_ParamId + ' textarea').val(value.SFP_Comment_Val);
            });
        }
    });
}

$('#sfp_comments_save_btn').live('click', function () {
    var date_ = $('#sfp_comments_date').val();
    var delete_success = false;
    $.ajax({
        url: serverpath + '/SFP/Delete_SFP_Comments/',
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
                if (paramid_ == "256" || paramid_ == "257")
                    strval_ = $(this).val();
                else
                    strval_ = $(this).find('textarea').val();

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
                    url: serverpath + '/SFP/Save_SFP_Comments',
                    data: items,
                    success: function (data) {
                        save_success = true;
                    }
                });
            }
            if (delete_success = true || save_success == true) {
                alert('Comments now saved.');
                load_sfp_comments();
            }
        }
    });
});

function load_sfp_dpmcomments() {
    clear_comments();

    var date_ = $('#sfp_comments_date').val();
    var shiftid_ = $('#sfp_shiftdate_select').val();

    $.ajax({
        url: serverpath + '/SFP/Load_SFP_DPMComments/',
        data: {
            date: date_,
            shiftid: shiftid_
        },
        type: 'POST',
        cache: false,
        success: function (data) {
            $.each(data, function (index, value) {
                $('#paramid_' + value.SFP_ParamId + ' textarea').val(value.SFP_Comment_Val);
            });
        }
    });
}

$('#sfp_dpmcomments_save_btn').live('click', function () {
    var date_ = $('#sfp_comments_date').val();
    var shiftid_ = $('#sfp_shiftdate_select').val();
    var delete_success = false;
    $.ajax({
        url: serverpath + '/SFP/Delete_SFP_DPMComments/',
        data: {
            date: date_,
            shiftid: shiftid_
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
                strval_ = $(this).find('textarea').val();

                if (strval_ != "") {
                    items.push({
                        date: date_,
                        shiftid: shiftid_,
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
                    url: serverpath + '/SFP/Save_SFP_DPMComments',
                    data: items,
                    success: function (data) {
                        save_success = true;
                    }
                });
            }
            if (delete_success = true || save_success == true) {
                alert('Comments now saved.');
                load_sfp_dpmcomments();
            }
        }
    });
});

$('#sfp_shiftdate_select').live('change', function () {
    $('#sfp_log_header').css({ "background": "#99c2ff" });
    $('#sfp_dpmshift_btn').attr('disabled', false);
});

$('#sfp_dpmshift_btn').live('click', function () {
    $('#sfp_log_header').css({ "background": "#ffffcc" });
    load_sfp_dpmcomments();
});

function load_WaterAnalysis_tbl_names(type, reportType) {
    var reportType_ = reportType;
    $.ajax({

        url: serverpath + '/PowerPlant/' + type + '/',
        data: {
            reportType: reportType_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                $('#ppgroup_' + value.PowerPlant_ParamGroupId + ' tr:last').after('<tr><td id="paramname_' + value.PowerPlant_ParamId + '"' +
                    ' width="60%">' + value.PowerPlant_ParamName + '</td><td id="paramstandard_' + value.PowerPlant_ParamId + '"' +
                    ' width="20%" style="text-align:center" >' + value.PowerPlant_ParamStandard + '</td><td class="en_valtd" id="paramid_' + value.PowerPlant_ParamId + '"' +
                    ' width="20%" style="text-align:right" ><input type="number" onkeypress="return NumericOnly(event)" /></td>');
                $('.af_tbl tr').each(function () {
                    $(this).nextUntil('tr.header').hide();
                });
            });
        }
    });
}

function load_WaterAnalysis_tbl_data(type, reportType) {
    var reportType_ = reportType;
    var date_ = $('#pp_date').val();
    $.ajax({

        url: serverpath + '/PowerPlant/'+ type +'/',
        data: {
            date: date_,
            reportType: reportType_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                //alert('!');
                $("#paramid_" + value.PowerPlant_ParamId + " input").attr('value', value.PowerPlant_NumVal);
            });

        },
        fail: function (data) {
            //alert('failed');
        }
    });
}


function WaterAnalysis_tbl_clear_data(type, reportType) {
    var reportType_ = reportType;
    $.ajax({

        url: serverpath + '/PowerPlant/'+ type +'/',
        data: {
            reportType: reportType_
        },
        type: 'POST',
        cache: false,
        success: function (data) {

            $.each(data, function (index, value) {
                //alert('hey');
                $("#paramid_" + value.PowerPlant_ParamId + " input").val(' ');
                $("#paramid_" + value.PowerPlant_ParamId + " input").css('background-color', '#ffffcc');
            });
            load_WaterAnalysis_tbl_data('WaterAnalysis_tbl_data', reportType);
        }
    });
}

$('#pp_save_btn').live('click', function () {
    var items = [];
    var date_ = $('#pp_date').val();

    $('td[id*="paramid"]').each(function () {
        var id = $(this).attr('id');
        var item = parseInt($(this).attr('id').match(/\d+/));
        $(this).find('input.changed').each(function () {
            var val = $(this).val();
            if (val != "") {
                items.push({
                    paramid: item,
                    date: date_,
                    num_val: val
                })
            }
        });
    });

    if (items.length != 0) {

        items = JSON.stringify({ 'items': items });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: serverpath + '/PowerPlant/Save_PowerPlant_data',
            data: items,
            success: function (data) {
                alert('Power Plant data now saved.');
            }
        });
    }
});