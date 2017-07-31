//var serverpath = '';
var serverpath = '/ActionTracker';

var imagefile_num = 0;

$(document).ready(function () {
    $("#multipleFiles").uploadify({
        'uploader': '../Scripts/Uploadify/uploadify.swf',
        'script': serverpath + '/SafetyTracker/Upload',
        'fileDataName': 'file',
        'fileDesc': 'Web Image Files (.JPG, .GIF, .PNG)',
        'fileExt': '*.jpg;*.gif;*.png',
        'buttonText': 'Upload Photo',
        'multi': true,
        'queueSizeLimit': 5,
        'sizeLimit': 5048576,
        'simUploadLimit': 1,
        'cancelImg': '../Scripts/Uploadify/cancel.png',
        'auto': false,
        'height': 30,
        'queueID': 'fileQueue',
        'removeCompleted': false,
        'onError': function (a, b, c, d) {
           
            if (d.status == 404) {
                alert("Could not find upload script. Use a path relative to: " + "<?= getcwd() ?>");
            }
                
            else if (d.type === "HTTP") {
                alert("error " + d.type + ": " + d.status);
            }
         //   document.location.href = serverpath + '/SafetyTracker/Implementor';
         //   else if (d.type === "File Size")
         //   alert(c.name + " " + d.type + " Limit: " + Math.round(d.info / (1024 * 1024)) + "MB");
         //   else
         //   alert("error " + d.type + ": " + d.text);
        },
        'onComplete': function (event, queueId, fileObj, response, data) {

            //Do Nothing Yet
         
            var result = $.parseJSON(response);
            $("#progressbar").progressbar("value", result.Percentage);

            if (result.Percentage == 100) {

                document.location.href = serverpath + '/SafetyTracker/Implementor';
            }



        },
        'onSelectOnce': function (event, data) {

            imagefile_num = data.filesSelected + imagefile_num;
           // alert(imagefile_num);
            $.ajax({
                type: 'POST',
                url: serverpath + '/SafetyTracker/SetUploadCount',
                data: { TotalCount: imagefile_num },
                dataType: 'json',
                success: function (data) {

                },
                error: function (XMLHttpRequest) {
                    var errorMsg = XMLHttpRequest.statusText;
                },
                complete: function (jsonData) {
                }
            });
        },

        'onCancel': function (file) {
            //alert('The file ' + file.name + ' was added to the queue.');
            imagefile_num = imagefile_num - 1;
           // alert(imagefile_num);
        }


    });

    $("#progressbar").progressbar();
});

$("#btn1").click(function () {
   
  //  alert($('#repheademailadd').val());
  //  alert($('#reporter_emailadd').text());
  //  alert($('#imsemailadd').text());
    
    //alert($('#ReporterPage').val());
    //alert($('#Emphead option:selected').text());
    //alert($('#IMSlist option:selected').text());
    //alert($('#imsresponsible').text());

var old_reporter = $('#reporter_oldname').val();


     if ($('#myObservation_ReporterId').val() == 0 || $('#ReporterPage').val() != old_reporter) {

        alert('Please Fill in correctly Reporter field.');

    } else if ($('#myObservation_ReporterHeadId').val() == 0) {

        alert('Please Fill in Reporter Head field.');



    } else {


        $.ajax({
            url: serverpath + '/SafetyTracker/Reporter/',
            data: {
                reporterid: $('#myObservation_ReporterId').val(),
                reporterheadid: $('#myObservation_ReporterHeadId').val(),
                obs_date: $('#myObservation_ObservationDate').val(),
                observe: $('#myObservation_Observations').val(),
                activity: $('#myObservation_Activity').val(),
                reporter_immediate: $('#myObservation_ReporterImmediateAction').val(),
                location: $('#myObservation_Location').val(),
                image_path: 'with-image',
                imstypeid: $('#IMSlist').val(),
                responsiblehead: $('#myObservation_ResponsibleEmployeeId').val(),
                urgencyid: $('#Urgenlist').val(),
                reporteremailad: $('#repheademailadd').val(),
                rheademailad: $('#reporter_emailadd').text(),
                imsemailad: $('#imsemailadd').text(),
                reportername: $('#ReporterPage').val(),          
                reportermanager: $('#Emphead option:selected').text(),
                imstype: $('#IMSlist option:selected').text(),
                imshead: $('#imsresponsible').text()


            },
            type: 'POST',
            cache: false,
            complete: function () {

             

                //$.each(data, function (index, value) {
                //    // $('#main_forms').find("#imsresponsible").text(value.Fullname);
                //    // $('#main_forms').find("#myObservation_ResponsibleEmployeeId").val(value.AssignUser);
                //});
                //$('#multipleFiles').uploadifySettings('scriptData', { Id: 12345 });
                
                if (imagefile_num == 0) {
                    document.location.href = serverpath + '/SafetyTracker/Implementor';
                } else {
                    $('#multipleFiles').uploadifyUpload();
                }

                


            }
        });
        //
//        document.location.href = serverpath + '/SafetyTracker/Implementor';

    }


});