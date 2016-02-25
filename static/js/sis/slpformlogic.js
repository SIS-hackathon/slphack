/*!
* SLPAPP's slpformlogic.js
* Copyright (c) 2016 The Center to Promote Healtcare Access, Inc., DBA Social Interest Solutions
* Licensed under MIT License (https://github.com/SIS-hackathon/slphack/LICENSE)
*/
    var slpapp = {};
    var cur_child = 1;
    var cur_adult = 0;
    var cur_other = 0;
    var cur_childincome;
    var cur_otherincome;
    var section = 1;
    var qsection = 1;
    var child_ct = 1;
    var child_return = false;
    var child_edit_mode = false;
    var adult_edit_mode = false;
    var other_edit_mode = false;
    var contact_edit_mode = false;
    var adult_ct = 0;
    var adult_tot = 0;
    var other_ct = 0;
    var other_tot = 0;
    var form_num = 1;
    var active_childfirstname;
    var active_childmi;
    var active_childlastname;
    var active_adultfirstname;
    var active_adultmi;
    var active_adultlastname;
    var active_otherfirstname;
    var active_othermi;
    var active_otherlastname;
    var pgmcasestate = 0;
    var adultincomeid = [];
    var childincomeid = [];
    var otherincomeid = [];

    function GetTodayDate() {
       var tdate = new Date();
       var dd = tdate.getDate(); //yields day
       var MM = tdate.getMonth(); //yields month
       var yyyy = tdate.getFullYear(); //yields year
       var xxx = ( MM+1) + "/" + dd + "/" + yyyy;

       return xxx;
    }

    $(document).foundation();
    $(document).ready(function() {

        var help0_source   = $("#help-section0").html();
        var help0_template = Handlebars.compile(help0_source);
        var help1_source   = $("#help-section1").html();
        var help1_template = Handlebars.compile(help1_source);
        var helpfoster_source   = $("#help-foster").html();
        var helpfoster_template = Handlebars.compile(helpfoster_source);
        var helpchildcat_source   = $("#help-childcat").html();
        var helpchildcat_template = Handlebars.compile(helpchildcat_source);
        var help_childdash   = $("#help-childdash").html();
        var help_childdash_template = Handlebars.compile(help_childdash);
        var helpintro2_source   = $("#helpintro-section2").html();
        var helpintro2_template = Handlebars.compile(helpintro2_source);
        var help2_source   = $("#help-section2").html();
        var help2_template = Handlebars.compile(help2_source);
        var helpintro3_source   = $("#helpintro-section3").html();
        var helpintro3_template = Handlebars.compile(helpintro3_source);
        var help3_source   = $("#help-section3").html();
        var help3_template = Handlebars.compile(help3_source);
        var helpaincome_source   = $("#help-adultincome").html();
        var helpaincome_template = Handlebars.compile(helpaincome_source);
        var help_adultss   = $("#help-adultss").html();
        var help_adultss_template = Handlebars.compile(help_adultss);
        var helpintro4_source   = $("#helpintro-section4").html();
        var helpintro4_template = Handlebars.compile(helpintro4_source);
        var help4_source   = $("#help-section4").html();
        var help4_template = Handlebars.compile(help4_source);
        var helpdash4_source   = $("#helpdash-section4").html();
        var helpdash4_template = Handlebars.compile(helpdash4_source);
        var helpcincome_source   = $("#help-childrenincome").html();
        var helpcincome_template = Handlebars.compile(helpcincome_source);
        var helpintro5_source   = $("#helpintro-section5").html();
        var helpintro5_template = Handlebars.compile(helpintro5_source);
        var help5_q9_source   = $("#help-section5-q9").html();
        var help5_q9_template = Handlebars.compile(help5_q9_source);
        var help5_q10_source   = $("#help-section5-q10").html();
        var help5_q10_template = Handlebars.compile(help5_q10_source);
        var help5_q11_source   = $("#help-section5-q11").html();
        var help5_q11_template = Handlebars.compile(help5_q11_source);
        var help5_q12_source   = $("#help-section5-q12").html();
        var help5_q12_template = Handlebars.compile(help5_q12_source);
        var pgm_source   = $("#program-template").html();
        var pgm_template = Handlebars.compile(pgm_source);
        var child_source   = $("#child-template").html();
        var child_template = Handlebars.compile(child_source);
        var adult_source   = $("#adult-template").html();
        var adult_template = Handlebars.compile(adult_source);
        var adult_income_source   = $("#adult-income-template").html();
        var adult_income_template = Handlebars.compile(adult_income_source);
        var other_source   = $("#otherchild-template").html();
        var other_template = Handlebars.compile(other_source);
        var stuincome_source   = $("#studentincome-template").html();
        var stuincome_template = Handlebars.compile(stuincome_source);
        var otherincome_source   = $("#otherincome-template").html();
        var otherincome_template = Handlebars.compile(otherincome_source);
        var addchildincome_source   = $("#addchildincome-template").html();
        var addchildincome_template = Handlebars.compile(addchildincome_source);
        var childincomerow_source   = $("#childincomerow-template").html();
        var childincomerow_template = Handlebars.compile(childincomerow_source);
        var personrow_source   = $("#personrow-template").html();
        var personrow_template = Handlebars.compile(personrow_source);
        var contactrow_source   = $("#contactrow-template").html();
        var contactrow_template = Handlebars.compile(contactrow_source);
        var appsummary_source   = $("#appsummary-template").html();
        var appsummary_template = Handlebars.compile(appsummary_source);
        $('#footer').hide();
        childincomeid.push(0);

        Handlebars.registerHelper('if_eq', function(a, b, opts) {
            if(a == b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        });


        var $bar = $('.progress-bar .bar');
        var steps = $('.pm-step').length;

        $('#form1').show();
        $('#form1').addClass(".activeform");
        $('#helpcontainer').remove();
        $( help0_template()).insertAfter( "#helphere" );
        $('li.section1.intro').show();
        $('#footer').show();
        $("ol.prog li:nth-child(1)").removeClass("todo");
        $("ol.prog li:nth-child(1)").addClass("active");


        $("#form1").on('click', '.childgotonext', function () {
            if ($('#form' + form_num).valid()) { // child logic
                if (qsection <= 3) {
                    if (qsection == 1) {
                        active_childfirstname = $('#form1').find(".activeques").find(".childfname").val();
                        active_childmi = $('#form1').find(".activeques").find(".childmi").val();
                        active_childlastname = $('#form1').find(".activeques").find(".childlname").val();
                        update_childname(active_childfirstname, cur_child)
                        $('#arrowup').removeClass("disabled");
                    }
                    if(qsection == 2 && $('#form1 input:radio[name="child_foster[' + cur_child + ']"]:checked').val() == "Y" ) {
                            $('.qsection' + qsection + '.child' + cur_child).hide()
                            $('li.qsection' + qsection + '.child' + cur_child).removeClass("activeques");
                            set_ignore(qsection)
                            if(!child_edit_mode) {
                                add_child_row(child_ct)
                                $('.callout.child').show();
                            }
                            else {
                                set_childname_on_row(cur_child)
                                child_edit_mode = false;
                                $('.callout.child').hide();
                            }
                            $('#helpcontainer').remove();
                            $( help_childdash_template()).insertAfter( "#helphere" );
                            $('#childdash').addClass("activeques");
                            $('#childdash').show()
                            set_left_panel();
                    }
                    else {
                        $('li.qsection' + qsection + '.child' + cur_child).hide()
                        $('li.qsection' + qsection + '.child' + cur_child).removeClass("activeques");
                        set_ignore(qsection)
                        qsection = qsection + 1;
                        if (qsection == 2) {
                            $('#helpcontainer').remove();
                            $(helpfoster_template()).insertAfter("#helphere");
                        }
                        else if (qsection == 3) {
                            $('#helpcontainer').remove();
                            $(helpchildcat_template()).insertAfter("#helphere");
                        }
                        $('li.qsection' + qsection + '.child' + cur_child).addClass("activeques");
                        $('li.qsection' + qsection + '.child' + cur_child).show()
                        remove_ignore(qsection)
                    }
                }
                set_left_panel();
            }
        });

        $("#form1").on('click', '.sectionstartfwd', function () {
                switch(section) {
                    case 1:
                        $('li.section1.intro').hide();
                        $('li.section1.intro').removeClass("activeques");
                        if(child_return == false) {
                            $('#helpcontainer').remove();
                            $( help1_template()).insertAfter( "#helphere" );
                            $('li.qsection1.child' + cur_child).addClass("activeques");
                            $('li.qsection1.child' + cur_child).show();
                            remove_ignore(1)
                        }
                        else {
                            $('#helpcontainer').remove();
                            $( help_childdash_template()).insertAfter( "#helphere" );
                            $('#childdash').addClass("activeques");
                            $('#childdash').show();
                        }
                        break;
                    case 2:
                        $('li.section2.intro').hide();
                        $('li.section2.intro').removeClass("activeques");
                        $('#helpcontainer').remove();
                        $( help2_template()).insertAfter( "#helphere" );
                        $('li.qsection4').addClass("activeques");
                        $('li.qsection4').show()
                        qsection = 4;
                        remove_ignore(4);
                        break;
                    case 3:
                            $('li.section3.intro').hide();
                            $('li.section3.intro').removeClass("activeques");
                            $('#adultdash').addClass("activeques");
                            set_left_panel()
                            if (adult_tot == 0) {
                                $('#finishadults').hide();
                                $('#noadults').show();
                                $('#adultdash').show();
                                $("#noadultschecked").prop("checked", false);
                            }
                            else {
                                $('#noadults').hide();
                                $('#finishadults').show();
                                $('#adultdash').show();
                            }
                            $('#helpcontainer').remove();
                            $( help3_template()).insertAfter( "#helphere" );
                            break;
                        case 4:
                            $('li.section4.intro').hide();
                            $('li.section4.intro').removeClass("activeques");
                            $('#otherchildrendash').addClass("activeques");
                            if (other_tot > 0) {
                                 $('#nootherchildren').hide()
                                 $('#finishedotherchildren').show()
                                 $('#otherchildrendash').show()
                             }
                             else {
                                 $('#finishedotherchildren').hide()
                                 $('#nootherchildren').show()
                                 $('#otherchildrendash').show()
                                 $("#finishchildrenincome" ).prop( "checked", false );
                            }
                            $('#helpcontainer').remove();
                            $( help4_template()).insertAfter( "#helphere" );
                            break;
                        case 5:
                            $('li.section5.intro').hide();
                            $('li.section5.intro').removeClass("activeques");
                            qsection = 9;
                            set_ignore(7)
                            $('#helpcontainer').remove();
                            $( help5_q9_template()).insertAfter( "#helphere" );
                            $('li.qsection' + qsection).addClass("activeques");
                            $('li.qsection' + qsection).show()
                            remove_ignore(qsection)
                            break;
                }
                set_left_panel();
        });

        $("#form1").on('click', '.sectionstartback', function () {
                switch(section) {
                    case 2:
                        $('li.qsection4').hide();
                        $('li.qsection4').removeClass("activeques");
                        remove_ignore(4);
                        $('#helpcontainer').remove();
                        $( helpintro2_template()).insertAfter( "#helphere" );
                        $('li.section2.intro').addClass("activeques");
                        $('li.section2.intro').show()
                        break;
                    case 3:
                        $('#adultdash').hide();
                        $('#adultdash').removeClass("activeques");
                        $('#helpcontainer').remove();
                        $( helpintro3_template()).insertAfter( "#helphere" );
                        $('li.section3.intro').addClass("activeques");
                        $('li.section3.intro').show()
                        break;
                    case 4:
                        $('#otherchildrendash').hide();
                        $('#otherchildrendash').removeClass("activeques");
                        $('#helpcontainer').remove();
                        $( helpintro4_template()).insertAfter( "#helphere" );
                        $('li.section4.intro').addClass("activeques");
                        $('li.section4.intro').show()
                        break;
                    case 5:
                        $('li.qsection9').hide();
                        $('li.qsection9').removeClass("activeques");
                        $('#helpcontainer').remove();
                        $( helpintro5_template()).insertAfter( "#helphere" );
                        $('li.section5.intro').addClass("activeques");
                        $('li.section5.intro').show()
                        break;
                }
                set_left_panel();
        });

        $("#form1").on('click', '.childgotoback', function () {
            if (qsection <= 3) {
                if (qsection == 1) {
                    active_childfirstname = $('#form1').find(".activeques").find(".childfname").val();
                    active_childmi = $('#form1').find(".activeques").find(".childmi").val();
                    active_childlastname = $('#form1').find(".activeques").find(".childlname").val();
                    update_childname(active_childfirstname, cur_child)
                    $('#arrowup').removeClass("disabled");
                }

                $('li.qsection' + qsection + '.child' + cur_child).hide()
                $('li.qsection' + qsection + '.child' + cur_child).removeClass("activeques");
                set_ignore(qsection)
                qsection = qsection - 1;
                if(qsection == 2){
                        $('#helpcontainer').remove();
                        $( helpfoster_template()).insertAfter( "#helphere" );
                }
                else if(qsection == 3){
                        $('#helpcontainer').remove();
                        $( helpchildcat_template()).insertAfter( "#helphere" );
                }
                $('li.qsection' + qsection + '.child' + cur_child).addClass("activeques");
                $('li.qsection' + qsection + '.child' + cur_child).show()
                remove_ignore(qsection)
                set_left_panel();
            }
        });

        $("#form1").on('click', '.endchild', function () {
            if ($('#form' + form_num).valid()) {
                $('.qsection' + qsection + '.child' + cur_child).hide()
                $('li.qsection' + qsection + '.child' + cur_child).removeClass("activeques");
                set_ignore(qsection)
                if(!child_edit_mode) {
                    add_child_row(child_ct)
                    $('.callout.child').show();
                }
                else {
                    set_childname_on_row(cur_child)
                    child_edit_mode = false;
                    $('.callout.child').hide();
                }
                $('#helpcontainer').remove();
                $( help_childdash_template()).insertAfter( "#helphere" );
                $('#childdash').addClass("activeques");
                $('#childdash').show()
                set_left_panel();

            }
        });

        $("#childdash").on('click', '.editchild', function () {
            cur_child = $( this ).attr( "id" );
            $('#childdash').hide()
            qsection = 1;
            $('li.qsection1' + '.child' + cur_child ).addClass("activeques");
            active_childfirstname = $('#form1').find(".activeques").find(".childfname").val();
            active_childmi = $('#form1').find(".activeques").find(".childmi").val();
            active_childlastname = $('#form1').find(".activeques").find(".childlname").val();
            update_childname(active_childfirstname,cur_child);
            $('li.qsection1' + '.child' + cur_child).show();
            remove_ignore(1);
            child_edit_mode = true;
        });

        $("#form1").on('click', '.removechildincome', function () {
            $(this).closest(".row").remove();
        });

        $("#form1").on('click', '.removeadultincome', function () {
            $(this).closest(".row").remove();
        });

        $("#childdash").on('click', '.remove', function () {
             var removeid = $(this).attr("id").slice(-1);
             $(this).closest('.row').remove();
              $('#form1 .child' + removeid).each(function () {
                  $(this).remove();
              })
             slpform1.resetForm();//remove error class on name elements and clear history
             slpform1.reset();//remove all error and success data
        });

        $("#form1").on('click', '.adultgotonext', function () {
            if ($('#form' + form_num).valid()) { // adult logic
                    if (qsection == 5) {
                        active_adultfirstname = $('#form1').find(".activeques").find(".adultfname").val();
                        active_adultmi = $('#form1').find(".activeques").find(".adultmi").val();
                        active_adultlastname = $('#form1').find(".activeques").find(".adultlname").val();
                        update_adultname(active_adultfirstname, cur_adult)
                    }

                    $('li.qsection' + qsection + '.adult' + cur_adult).hide()
                    $('li.qsection' + qsection + '.adult' + cur_adult).removeClass("activeques");
                    set_ignore(qsection)
                    qsection = qsection + 1;
                    $('#helpcontainer').remove();
                    $( helpaincome_template()).insertAfter( "#helphere" );
                    $('li.qsection' + qsection + '.adult' + cur_adult).addClass("activeques");
                    $('li.qsection' + qsection + '.adult' + cur_adult).show()
                    remove_ignore(qsection)
            }
        });

        $("#form1").on('click', '.adultgotoback', function () {
                $('li.qsection' + qsection + '.adult' + cur_adult).hide()
                $('li.qsection' + qsection + '.adult' + cur_child).removeClass("activeques");
                set_ignore(qsection)
                qsection = qsection - 1;
                $('li.qsection' + qsection + '.adult' + cur_adult).addClass("activeques");
                $('li.qsection' + qsection + '.adult' + cur_adult).show()
                remove_ignore(qsection)
        });

        $("#form1").on('click', '.endadult', function () {
            if ($('#form' + form_num).valid()) {
                $('.qsection' + qsection + '.adult' + cur_adult).hide();
                $('li.qsection' + qsection + '.adult' + cur_adult).removeClass("activeques");
                set_ignore(qsection);
                if(!adult_edit_mode) {
                    add_adult_row(adult_ct);
                }
                else {
                    set_adultname_on_row(cur_adult);
                    adult_edit_mode = false;
                }
                $('#finishadults').show();
                $('#noadults').hide();
                $('#helpcontainer').remove();
                $( help3_template()).insertAfter( "#helphere" );
                $('#adultdash').show();

            }
        });

        $("#adultdash").on('click', '.editadult', function () {
            cur_adult = $( this ).attr( "id" );
            $('#adultdash').hide()
            qsection = 5;
            $('li.qsection' + qsection + '.adult' + cur_adult).addClass("activeques");
            active_adultfirstname = $('#form1').find(".activeques").find(".adultfname").val();
            active_adultmi = $('#form1').find(".activeques").find(".adultmi").val();
            active_adultlastname = $('#form1').find(".activeques").find(".adultlname").val();
            update_adultname(active_adultfirstname,cur_adult)
            $('li.qsection' + qsection + '.adult' + cur_adult).show()
            remove_ignore(qsection)
            adult_edit_mode = true;
        });

        $("#adultdash").on('click', '.remove', function () {
             var removeid = $(this).attr("id").slice(-1);
             $(this).closest('.row').remove();
             $('#form1 .adult' + removeid).each(function () {
                  $(this).remove();
              })
             slpform1.resetForm();//remove error class on name elements and clear history
             slpform1.reset();//remove all error and success data
             --adult_tot;
        });

        $("#otherchildrendash").on('click', '.editother', function () {
            cur_other = $( this ).attr( "id" );
            $('#otherchildrendash').hide()
            qsection = 8;
            $('li.qsection' + qsection + '.other' + cur_other).addClass("activeques");
            update_othername(active_otherfirstname,cur_child);
            $('li.qsection' + qsection + '.other' + cur_other).show();
            remove_ignore(qsection);
            other_edit_mode = true;
        });

  /*      $('li.section5.qsection12').on('click', '.editcontact', function () {
            $('li.section5.qsection12').hide()
            qsection = 9;
            $('#helpcontainer').remove();
            $( help5_q9_template()).insertAfter( "#helphere" );
            $('li.qsection' + qsection).addClass("activeques");
            $('li.qsection' + qsection).show();
            remove_ignore(qsection);
        });   */

        $("#form1").on('click', '.endotherchild', function () {
            if ($('#form' + form_num).valid()) {
                active_otherfirstname = $('#form1').find(".activeques").find(".otherfname").val();
                active_othermi = $('#form1').find(".activeques").find(".othermi").val();
                active_otherlastname = $('#form1').find(".activeques").find(".otherlname").val();
                update_othername(active_otherfirstname, cur_adult)
                $('li.qsection' + qsection + '.other' + cur_other).hide();
                $('li.qsection' + qsection + '.other' + cur_other).removeClass("activeques");
                set_ignore(qsection);
                if(!other_edit_mode) {
                    add_other_row(other_ct);
                }
                else {
                    set_othername_on_row(cur_other);
                    other_edit_mode = false;
                }
                $('#finishedotherchildren').show();
                $('#nootherchildren').hide();
                $('#otherchildrendash').show();
            }
        });

        $("#otherchildrendash").on('click', '.remove', function () {
             var removeid = $(this).attr("id").slice(-1);
             $(this).closest('.row').remove();
             $('#form1 .other' + removeid).each(function () {
                  $(this).remove();
             })
             slpform1.resetForm();//remove error class on name elements and clear history
             slpform1.reset();//remove all error and success data
             --other_tot;
        });

        $("#form1").on('click', '.addnewadultincome', function () {
            adultincomeid[adult_ct - 1] = adultincomeid[adult_ct - 1] + 1;
            var context = {adult_ct: adult_ct, income_ct: adultincomeid[adult_ct - 1]};
            $( adult_income_template(context) ).insertBefore( "#incomeaddend" );
            $('.adult' + adult_ct + ' .validate').each(function () {
                    $(this).rules("add", {
                        required: true
                    });
                 });
            $('.adult' + adult_ct + ' .valincome').each(function () {
                    $(this).rules("add", {
                        number: true,
                        messages: {
                            number: "Please enter valid number. $ symbol not required."
                        }
                    });
            });
        });

        $("#form1").on('click', '.contactgotonext', function () {
            if ($('#form' + form_num).valid()) { //
                    $('li.qsection' + qsection).hide();
                    $('li.qsection' + qsection).removeClass("activeques");
                    set_ignore(qsection);
                    qsection = qsection + 1;
                    if (qsection == 12 && !contact_edit_mode) {
                        add_contact_row();
                        contact_edit_mode = true;
                    }
                    if (qsection == 9){
                        $('#helpcontainer').remove();
                        $( help5_q9_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 10){
                        $('#helpcontainer').remove();
                        $( help5_q10_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 11){
                        $('#helpcontainer').remove();
                        $( help5_q11_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 12){
                        $('#helpcontainer').remove();
                        $( help5_q12_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 13){
                         var dataout = JSON.stringify(slpapp, null, ' ');
                        $("#outputjson").html('<pre>' + dataout + '</pre>')
                    }
                    $('li.qsection' + qsection).addClass("activeques");
                    $('li.qsection' + qsection).show();
                    remove_ignore(qsection);
                    set_left_panel();
            }
        });

        $("#form1").on('click', '.contactgotoback', function () {
                    $('li.qsection' + qsection).hide();
                    $('li.qsection' + qsection).removeClass("activeques");
                    set_ignore(qsection);
                    qsection = qsection - 1;
                    if (qsection == 9){
                        $('#helpcontainer').remove();
                        $( help5_q9_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 10){
                        $('#helpcontainer').remove();
                        $( help5_q10_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 11){
                        $('#helpcontainer').remove();
                        $( help5_q11_template()).insertAfter( "#helphere" );
                    }
                    else if (qsection == 12){
                        $('#helpcontainer').remove();
                        $( help5_q12_template()).insertAfter( "#helphere" );
                    }
                    $('li.qsection' + qsection).addClass("activeques");
                    $('li.qsection' + qsection).show();
                    remove_ignore(qsection);
                    set_left_panel();
        });

         $("#form1").on('click', '.close-button.child', function () {
                    $('.callout.child').hide();

        });


        $("#add_child").on('click', function () {
             if(child_ct <= 10) {
                 child_ct = child_ct + 1;
                 childincomeid.push(0);
                 $('#childdash').hide();
                 qsection = 1;
                 cur_child = child_ct;
                 var context = {child_ct: child_ct};
                 $(child_template(context)).insertBefore( "#childdash" );
                 $('li.qsection1.child' + cur_child).addClass("activeques");
                 $('li.qsection1.child' + cur_child).show();
                 $('.child' + child_ct + ' .validate').each(function () {
                        $(this).rules("add", {
                            required: true
                        });
                 });
             }
        });

        $("#add_adult").on('click', function () {
             if(adult_ct <= 10) {
                 adult_ct = adult_ct + 1;
                 adultincomeid.push(0);
                 ++adult_tot;
                 $('#adultdash').hide();
                 qsection = 5;
                 cur_adult = adult_ct;
                 var context = {adult_ct: adult_ct};
                 $( adult_template(context) ).insertAfter( "#adultdash" );
                 $('.adult' + adult_ct + ' .validate').each(function () {
                        $(this).rules("add", {
                            required: true
                        });
                 });
                 $('#adultdash').hide();
                 $('li.qsection' + qsection + '.adult' + cur_adult).addClass("activeques");
                 $('.qsection' + qsection + '.adult' + cur_adult).show()
             }
        });

        $("#add_otherchildren").on('click', function () {
             if(other_ct <= 10) {
                 other_ct = other_ct + 1;
                 otherincomeid.push(0);
                 ++other_tot;
                 qsection = 8;
                 cur_other = other_ct;
                 var context = {other_ct: other_ct};
                 $( other_template(context) ).insertAfter( "#otherchildrendash" );
                 $('.other' + other_ct + ' .validate').each(function () {
                        $(this).rules("add", {
                            required: true
                        });
                 });
                 $('#otherchildrendash').hide();
                 $('li.qsection' + qsection + '.other' + cur_other).addClass("activeques");
                 $('.qsection' + qsection + '.other' + cur_other).show()
             }
        });

        function add_child_row(c_ct){
            var context = {row_type: "childin", edit_type: "editchild", row_id: c_ct, remove_type: "child_remove", first_name: active_childfirstname, middle_initial: active_childmi, last_name: active_childlastname };
            $( personrow_template(context) ).insertBefore( "#childdash .row.addchild" );
        }

        function add_adult_row(c_ct){
            var context = {row_type: "adultin", edit_type: "editadult", row_id: c_ct, remove_type: "adult_remove", first_name: active_adultfirstname, middle_initial: active_adultmi, last_name: active_adultlastname };
            $( personrow_template(context) ).insertBefore( "#adultdash .row.addadult" );
        }

        function add_other_row(c_ct){
            var context = {row_type: "otherin", edit_type: "editother", row_id: c_ct, remove_type: "other_remove", first_name: active_otherfirstname, middle_initial: active_othermi, last_name: active_otherlastname };
            $( personrow_template(context) ).insertBefore( "#otherchildrendash .row.addotherchild");
        }

        function add_contact_row(c_ct){
            var context = {row_type: "contactin", edit_type: "editcontact", row_id: c_ct, first_name: $('#contact_fn').val(), last_name: $('#contact_ln').val() };
            $( contactrow_template(context) ).insertBefore( "li.section5.qsection12 .addcontact");
        }

        function update_childname(name, childid){

            $('.child' + (childid) + ' .childfirstname').each(function (){
                $(this).html(name)
            });
            $('#childdash .childfirstname').html(name)
        }

        function update_adultname(name, adultid){

            $('.adult' + (adultid) + ' .adultfirstname').each(function (){
                $(this).html(name)
            });
            $('#adultdash .adultfirstname').html(name)

        }

        function foster_child_rule() {
            var fosterrule = true;

            var formdata = $('#form1').serializeArray();
            $.each(formdata,
                function (i, v) {
                    if (v.name.search("child_foster") != -1) {
                            if(v.value != "Y") {
                                fosterrule = false;
                                return false;
                            }
                    }
                });
            return fosterrule;
        }

        function other_child_rule() {
            var otherrule = true;
            var childObject = {};
            var childlist = [];

            var formdata = $('#form1').serializeArray();
            $.each(formdata,
                function (i, v) {
                    if (v.name.search("child") != -1) {
                            childObject[v.name] = v.value;
                    }
                });
            var childlistin = [];
            $.each(childObject,
                function (k, v) {
                    if (k.search("child_fn") != -1) {
                        childlistin.push(k.substr(9, 1))
                    }
                    else {
                        return;
                    }
            });
            for (var i = 0; i < childlistin.length; ++i) {
                var child = {};
                if (childObject.hasOwnProperty("child_foster[" + childlistin[i] + "]")) {
                    child["child_foster"] = childObject["child_foster[" + childlistin[i] + "]"];
                }
                else {
                    child["child_foster"] = "";
                }
                var cotherlist = [];
                for ( var key in formdata){
                    keytonumber = parseInt(key)
                    if (formdata[key]["name"] == "child_other[" + childlistin[i] + "]" ){
                        cotherlist.push(formdata[key]["value"])
                    }
                }
                child["child_other"] = cotherlist;
                childlist.push(child)
            }
            for (var i = 0; i < childlist.length; ++i){
                if (childlist[i]["child_foster"] == "N" && childlist[i]["child_other"].length == 0){
                        otherrule = false;
                  }
            }
            return otherrule;
        }


        function program_participation_rule() {
            var pgmrule = false;
            var numchecked = 0;

            $("input:checkbox[class=qsection4]:checked").each(function () {
                ++numchecked;
            });
            if (numchecked > 0 && $('#pgm_case_num').val() != ""){
                 pgmrule = true;
            }
            return pgmrule;
        }

        function update_othername(name, otherid){

            $('.other' + (otherid) + ' .otherfirstname').each(function (){
                $(this).html(name)
            });
            $('#otherchildrendash .otherfirstname').html(name)

        }

        function set_childname_on_row(c_ct){
            if(active_childmi != "") {
                var nameout = active_childfirstname + ' ' + active_childmi + ' ' + active_childlastname;
            }
            else {
                var nameout = active_childfirstname + ' ' + active_childlastname;
            }
            $('#childdash #rowname' + c_ct).html(nameout)
        }

        function set_adultname_on_row(c_ct){
            if(active_adultmi != "") {
                var nameout = active_adultfirstname + ' ' + active_adultmi + ' ' + active_adultlastname;
            }
            else {
                var nameout = active_adultfirstname + ' ' + active_adultlastname;
            }
            $('#adultdash #rowname' + c_ct).html(nameout)
        }

        function set_othername_on_row(c_ct){
            if(active_othermi != "") {
                var nameout = active_otherfirstname + ' ' + active_othermi + ' ' + active_otherlastname;
            }
            else {
                var nameout = active_otherfirstname + ' ' + active_otherlastname;
            }
            $('#otherchildrendash #rowname' + c_ct).html(nameout)
        }

        function set_left_panel(){
            var element = $("#form1").find(".activeques");
            var classes = element.attr("class").split(" ");
            console.log(element, classes)
            var cursection = classes[1].substr(7,1)
            console.log(cursection, section)
            if (parseInt(cursection) != section){
                $('ol.prog li:nth-child(' + section + ')').removeClass("active");
                $('ol.prog li:nth-child(' + section + ')').addClass("todo");
                $('ol.prog li:nth-child(' + cursection + ')').removeClass("todo");
                $('ol.prog li:nth-child(' + cursection + ')').addClass("active");
                section = parseInt(cursection);
            }
        }

        function total_child_income(){

        }

        function total_other_income(){

        }

        function total_adult_income(){

        }


        $('#finishchild').click(function(){
            $('.callout.child').hide();
            $('#childdash').hide()
            $('#childdash').removeClass("activeques")
            if (other_child_rule()){
                $('li.section5.intro').addClass("activeques");
                set_left_panel();
                $('li.section5.intro').show();
                $('#helpcontainer').remove();
                $( helpintro5_template()).insertAfter( "#helphere" );
            }
            else {
                $('li.section2.intro').addClass("activeques");
                set_left_panel();
                $('li.section2.intro').show();
                $('#helpcontainer').remove();
                $( helpintro2_template()).insertAfter( "#helphere" );
            }
        });

        $('#backfromadult').click(function(){
            $('#adultdash').hide()
            qsection = 4;
            $('li.qsection4').addClass("activeques");
            remove_ignore(qsection)
            $('li.qsection4').show()
        });

        $('#finishadult').click(function(){
            if(adult_tot == 0) {
                $('#adultdash').hide()
                $('#finishedotherchildren').hide()
                $('#adultdash').removeClass("activeques");
                if(other_tot == 0) {
                    $('#nootherchildren').show();
                    $('#finishedotherchildren').hide()
                }
                else {
                    $('#nootherchildren').hide();
                    $('#finishedotherchildren').show()
                }
                $('#otherchildrendash').addClass("activeques");
                set_left_panel()
                $('#otherchildrendash').show()
            }
            else {
                qsection = 7;
                $('#adultdash').hide()
                $('#adultdash').removeClass("activeques");
                $('#helpcontainer').remove();
                $( help_adultss_template()).insertAfter( "#helphere" );
                $('li.qsection' + qsection).addClass("activeques");
                $('li.qsection' + qsection).show()
                remove_ignore(qsection);
                if ($('#noadultsscheckmark:checkbox:checked').length != 0) {
                    set_ignore(qsection)
                }
            }
        });

        $('input[type=checkbox][name=program]').change(function() {
            var numchecked = 0;
            $("input:checkbox[class=qsection4]:checked").each(function () {
                ++numchecked;
            });
            if(numchecked > 0 && pgmcasestate == 0){
                 $( pgm_template() ).insertAfter( ".pm-step.section2 > .row:last" );
                 $('.validatesec2').each(function () {
                        $(this).rules("add", {
                            required: true
                        });
                     });
                pgmcasestate = 1;
            }
            else if (numchecked == 0) {
                $('.pgmcase').remove();
                pgmcasestate = 0;
            }
        });

        $('#otherprograms').click(function() {
            if ($('#form' + form_num).valid()) {
                $('li.qsection' + qsection).hide()
                $('li.qsection' + qsection).removeClass("activeques");
                set_ignore(qsection)
                if(program_participation_rule()){
                    $('li.section5.intro').show()
                    $('li.section5.intro').addClass("activeques");
                    $('#helpcontainer').remove();
                    $( helpintro5_template()).insertAfter( "#helphere" );
                    set_left_panel();
                }
                else {
                    $('#helpcontainer').remove();
                    $('li.section3.intro').show()
                    $('li.section3.intro').addClass("activeques");
                    $('#helpcontainer').remove();
                    $( helpintro3_template()).insertAfter( "#helphere" );
                    set_left_panel();
                }
            }
        });

        $('#noadultschecked').click(function() {
            if (this.checked ) {
                $('#adultdash').hide()
                $('#adultdash').removeClass("activeques");
                $('#otherchildrendash').addClass("activeques");
                $('#helpcontainer').remove();
                $( helpintro4_template()).insertAfter( "#helphere" );
                $('li.section4.intro').show()
                $('li.section4.intro').addClass("activeques");
                 set_left_panel()            }
        });

        $('#noadultsscheckmark').click(function() {
            if (this.checked ) {
                qsection = 7;
                set_ignore(qsection)
                $('#adult_ss').val("")
            }
            else {
                remove_ignore(qsection)
            }
        });

        $("#adult_ss").focus( function() {
            $('#noadultsscheckmark').prop('checked', false)
            remove_ignore(7)
        });

        $('#gotochilddash').click(function() {
                $('li.qsection' + qsection).hide()
                $('li.qsection' + qsection).removeClass("activeques");
                $('li.section2.intro').hide()
                $('li.section2.intro').removeClass("activeques");
                set_ignore(qsection)
                $('#helpcontainer').remove();
                $( help_childdash_template()).insertAfter( "#helphere" );
                $('#childdash').addClass("activeques");
                $('#childdash').show()
                set_left_panel()
        });


        $('.finishchildren').click(function() {
            if (this.checked || $(this).attr("type") == "button") {
                $('#childrenincome').hide()
                $('#childrenincome').removeClass("activeques");
                $('li.section5.intro').addClass("activeques");
                $('li.section5.intro').show()
                $('#helpcontainer').remove();
                $( helpintro5_template()).insertAfter( "#helphere" );
                set_left_panel()
            }
        });

        $('.finishchildrenincome').click(function() {
            if (this.checked || $(this).attr("type") == "button") {
                $('#otherchildrendash').hide()
                $('#otherchildrendash').removeClass("activeques");
                get_all_children();
                $('#childrenincome').addClass("activeques");
                $('#childrenincome').show()
                $('#helpcontainer').remove();
                $( helpdash4_template()).insertAfter( "#helphere" );
                set_left_panel()
            }
        });

        $('.gotohhprograms').click(function() {
            $('li.section3.intro').hide()
            $('li.section3.intro').removeClass("activeques");
            qsection = 4;
            $('li.qsection' + qsection).addClass("activeques");
            $('li.qsection' + qsection).show()
            set_left_panel()
            remove_ignore(qsection)
        });

        $('.gotootherchilddash').click(function() {
             if ($('#form' + form_num).valid()) {
                 $('li.qsection' + qsection).removeClass("activeques");
                 $('li.qsection' + qsection).hide()
                 set_ignore(qsection)
                 $('#otherchildrendash').addClass("activeques");
                 $('li.section4.intro').show()
                 $('li.section4.intro').addClass("activeques");
                 $('#helpcontainer').remove();
                 $( helpintro4_template()).insertAfter( "#helphere" );
                 set_left_panel()
             }
        });

        $('.gobacktootherchilddash').click(function() {

                 $('#childrenincome').hide()
                 $('#childrenincome').removeClass("activeques");
                 if (other_tot > 0) {
                     $('#nootherchildren').hide()
                     $('#finishedotherchildren').show()
                     $('#helpcontainer').remove();
                     $( help4_template()).insertAfter( "#helphere" );
                     $('#otherchildrendash').show()
                 }
                 else {
                     $('#finishedotherchildren').hide()
                     $('#nootherchildren').show()
                     $('#helpcontainer').remove();
                     $( help4_template()).insertAfter( "#helphere" );
                     $('#otherchildrendash').show()
                     $("#finishchildrenincome" ).prop( "checked", false );
                 }
        });

        $('.gobacktochildrenincome').click(function() {
                 $('li.section5.intro').removeClass("activeques");
                 $('li.section5.intro').hide()
                 set_ignore(qsection)
                 section = 5;
                 if (other_child_rule()) {
                     child_return = true;
                        $('#helpcontainer').remove();
                        $( help_childdash_template()).insertAfter( "#helphere" );
                        $('#childdash').addClass("activeques");
                        $('#childdash').show();
                 }
                 else if(program_participation_rule()) {
                    $('#helpcontainer').remove();
                    $( help2_template()).insertAfter( "#helphere" );
                    $('li.section2.intro').addClass("activeques");
                    $('li.section2.intro').show()

                 }
                 else {
                     $('#childrenincome').addClass("activeques");
                     $('#childrenincome').show();
                     $('#helpcontainer').remove();
                     $( helpdash4_template()).insertAfter( "#helphere" );
                 }
                 set_left_panel()
        });

        $('.gotoadultdash').click(function() {
            $('li.qsection' + qsection).removeClass("activeques");
            $('li.qsection' + qsection).hide()
            set_ignore(qsection)
            $('#helpcontainer').remove();
            $( help3_template()).insertAfter( "#helphere" );
            $('#adultdash').show()
        });

        $('.gotoadultss').click(function() {
             if(adult_tot == 0) {
                $('li.section4.intro').hide()
                $('li.section4.intro').removeClass("activeques");
                $('#adultdash').addClass("activeques");
                $('#finishadults').hide();
                $('#noadults').show();
                $('#helpcontainer').remove();
                $( help3_template()).insertAfter( "#helphere" );
                $('#adultdash').show();
                set_left_panel()
                $("#noadultschecked" ).prop( "checked", false );
            }
            else {
                 $('li.section4.intro').hide()
                 $('li.section4.intro').removeClass("activeques");
                 qsection = 7;
                 $('#helpcontainer').remove();
                 $( help_adultss_template()).insertAfter( "#helphere" );
                 $('li.qsection' + qsection).addClass("activeques");
                 $('li.qsection' + qsection).show()
                 set_left_panel()
                 if ($('#noadultsscheckmark:checkbox:checked').length == 0) {
                     remove_ignore(qsection);
                 }
                 else {
                     set_ignore(qsection)
                 }
            }
        });


        $("#submitslp").click(function () {
            if ($('#form' + form_num).valid()) {
                var childlist = [];
                var adultlist = [];
                var otherlist = [];
                var latinolist = [];
                var racelist = [];
                var income;
                var factor;
                var stringfind;

                slpapp = {};
                var formdata = $('#form1').serializeArray();
                console.log(formdata)
                var childObject = {};
                $.each(formdata,
                    function (i, v) {
                        if (v.name.search("child") != -1) {
                                childObject[v.name] = v.value;
                        }
                        else if (v.name.search("latino") != -1) {
                            latinolist.push(v.value)
                        }
                        else if (v.name.search("race") != -1) {
                            racelist.push(v.value)
                        }
                    });
                var childlistin = [];
                $.each(childObject,
                    function (k, v) {
                        if (k.search("child_fn") != -1) {
                            childlistin.push(k.substr(9, 1))
                        }
                        else {
                            return;
                        }
                    });
                for (var i = 0; i < childlistin.length; ++i) {
                    var child = {};
                    if (childObject.hasOwnProperty("child_fn[" + childlistin[i] + "]")) {
                        child["child_fn"] = childObject["child_fn[" + childlistin[i] + "]"];
                    }
                    else {
                        child["child_fn"] = "";
                    }
                    if (childObject.hasOwnProperty("child_mi[" + childlistin[i] + "]")) {
                        child["child_mi"] = childObject["child_mi[" + childlistin[i] + "]"];
                    }
                    else {
                        child["child_mi"] = "";
                    }
                    if (childObject.hasOwnProperty("child_ln[" + childlistin[i] + "]")) {
                        child["child_ln"] = childObject["child_ln[" + childlistin[i] + "]"];
                    }
                    else {
                        child["child_ln"] = "";
                    }
                    if (childObject.hasOwnProperty("child_student[" + childlistin[i] + "]")) {
                        child["child_student"] = childObject["child_student[" + childlistin[i] + "]"];
                    }
                    else {
                        child["child_student"] = "Y";
                    }
                    if (childObject.hasOwnProperty("child_foster[" + childlistin[i] + "]")) {
                        child["child_foster"] = childObject["child_foster[" + childlistin[i] + "]"];
                    }
                    else {
                        child["child_foster"] = "";
                    }
                    var cotherlist = [];
                    var childincomelist = [];
                    for ( var key in formdata){
                        keytonumber = parseInt(key)
                        if (formdata[key]["name"] == "child_other[" + childlistin[i] + "]" ){
                            cotherlist.push(formdata[key]["value"])
                        }
                        if (formdata[key]["name"].indexOf("childincomesrc[" + childlistin[i] + "]") != -1){
                            childincomelist.push({"income source" : formdata[key]["value"], "pay_freq" : formdata[(keytonumber + 1).toString()]["value"], "income"  : formdata[(keytonumber + 2).toString()]["value"]})

                        }
                    }
                    child["child_other"] = cotherlist;
                    child["income"] = childincomelist;
                    childlist.push(child)
                }
                // sum up income for each child
                for (var i = 0; i < childlist.length; ++i){
                    income = 0;
                    for (var j = 0; j < childlist[i]["income"].length; ++j){
                        if(childlist[i]["income"][j]["pay_freq"] == "weekly"){
                            factor = 4.33;
                        }
                        else if(childlist[i]["income"][j]["pay_freq"] == "biweekly") {
                            factor = 2.1666;
                        }
                        else if(childlist[i]["income"][j]["pay_freq"] == "2xmonth") {
                            factor = 2;
                        }
                        else if(childlist[i]["income"][j]["pay_freq"] == "monthly") {
                            factor = 1;
                        }
                        income += (parseFloat(childlist[i]["income"][j]["income"].replace(/[^0-9-.]/g, '')))*factor;
                    }
                    childlist[i]["income_tot"] = income.toFixed(0);
                }

                 var pgmObject = {};
                 var pgmlist = [];
                 $.each(formdata,
                 function(i, v) {
                     if (v.name.search("program") != -1) {
                      /*      pgmObject[v.name] = v.value;  */
                            pgmlist.push(v.value)

                     }
                     if (v.name.search("pgm_case_num") != -1) {
                            pgmObject[v.name] = v.value;
                     }
                 });
                 pgmObject["program"] = pgmlist;

                var otherObject = {};
                $.each(formdata,
                    function (i, v) {
                        if (v.name.search("other") != -1) {
                                otherObject[v.name] = v.value;
                        }
                    });
                var otherlistin = [];
                $.each(otherObject,
                    function (k, v) {
                        if (k.search("other_fn") != -1) {
                            otherlistin.push(k.substr(9, 1))
                        }
                        else {
                            return;
                        }
                    });
                for (var i = 0; i < otherlistin.length; ++i) {
                    var other = {};
                    if (otherObject.hasOwnProperty("other_fn[" + otherlistin[i] + "]")) {
                        other["other_fn"] = otherObject["other_fn[" + otherlistin[i] + "]"];
                    }
                    else {
                        other["other_fn"] = "";
                    }
                    if (otherObject.hasOwnProperty("other_mi[" + otherlistin[i] + "]")) {
                        other["other_mi"] = otherObject["other_mi[" + otherlistin[i] + "]"];
                    }
                    else {
                        other["other_mi"] = "";
                    }
                    if (otherObject.hasOwnProperty("other_ln[" + otherlistin[i] + "]")) {
                        other["other_ln"] = otherObject["other_ln[" + otherlistin[i] + "]"];
                    }
                    else {
                        other["other_ln"] = "";
                    }
                    other["child_student"] = "N"
                    var otherincomelist = [];
                    for ( var key in formdata){
                        keytonumber = parseInt(key)
                        if (formdata[key]["name"].indexOf("otherincomesrc[" + otherlistin[i] + "]") != -1){
                            otherincomelist.push({"income source" : formdata[key]["value"], "pay_freq" : formdata[(keytonumber + 1).toString()]["value"], "income" : formdata[(keytonumber + 2).toString()]["value"]})
                        }
                    }
                    other["income"] = otherincomelist;
                    otherlist.push(other)
                }
                // sum up income for each child
                for (var i = 0; i < otherlist.length; ++i){
                    income = 0;
                    for (var j = 0; j < otherlist[i]["income"].length; ++j){
                        if(otherlist[i]["income"][j]["pay_freq"] == "weekly"){
                            factor = 4.33
                        }
                        else if(otherlist[i]["income"][j]["pay_freq"] == "biweekly") {
                            factor = 2.1666
                        }
                        else if(otherlist[i]["income"][j]["pay_freq"] == "2xmonth") {
                            factor = 2
                        }
                        else if(otherlist[i]["income"][j]["pay_freq"] == "monthly") {
                            factor = 1
                        }
                        income += parseFloat(otherlist[i]["income"][j]["income"].replace(/[^0-9-.]/g, ''))*factor;
                    }
                    otherlist[i]["income_tot"] = income.toFixed(0);
                }
                 var adultObject = {};
                 $.each(formdata,
                 function(i, v) {
                    if (v.name.search("adult") != -1) {
                                adultObject[v.name] = v.value;
                        }
                 });
                 var adultlistin = [];
                 $.each(adultObject,
                     function(k, v){
                         if (k.search("adult_fn") != -1) {
                         adultlistin.push(k.substr(9,1))
                     }
                     else {
                        return;
                     }
                 });
                 for (var i = 0; i < adultlistin.length; ++i){
                     var adult = {};
                     if (adultObject.hasOwnProperty("adult_fn[" + adultlistin[i] + "]")) {
                     adult["adult_fn"] = adultObject["adult_fn[" + adultlistin[i] + "]"];
                     }
                     else {
                     adult["adult_fn"] = "";
                     }
                     if (adultObject.hasOwnProperty("adult_mi[" + adultlistin[i] + "]")) {
                        adult["adult_mi"] = adultObject["adult_mi[" + adultlistin[i] + "]"];
                     }
                     else {
                        adult["adult_mi"] = "";
                     }
                     if (adultObject.hasOwnProperty("adult_ln[" + adultlistin[i] + "]")) {
                     adult["adult_ln"] = adultObject["adult_ln[" + adultlistin[i] + "]"];
                     }
                     else {
                     adult["adult_ln"] = "";
                     }
                     var adultincomelist = [];
                     for ( var key in formdata){
                        keytonumber = parseInt(key)
                        if (formdata[key]["name"].indexOf("adultincomesrc[" + adultlistin[i] + "]") != -1){
                            adultincomelist.push({"income source" : formdata[key]["value"], "pay_freq" : formdata[(keytonumber + 1).toString()]["value"], "income" : formdata[(keytonumber + 2).toString()]["value"]})
                        }
                     }
                    adult["income"] = adultincomelist;
                    adultlist.push(adult)
                 }
                 // sum up income for each adult
                 for (var i = 0; i < adultlist.length; ++i){
                    income = 0;
                    var adultincome = {}
                    for (var j = 0; j < adultlist[i]["income"].length; ++j){
                        if(adultlist[i]["income"][j]["pay_freq"] == "weekly"){
                            factor = 4.33
                        }
                        else if(adultlist[i]["income"][j]["pay_freq"] == "biweekly") {
                            factor = 2.1666
                        }
                        else if(adultlist[i]["income"][j]["pay_freq"] == "2xmonth") {
                            factor = 2
                        }
                        else if(adultlist[i]["income"][j]["pay_freq"] == "monthly") {
                            factor = 1
                        }
                        income += parseFloat(adultlist[i]["income"][j]["income"].replace(/[^0-9-.]/g, ''))*factor;
                    }
                    adultlist[i]["income_tot"] = income.toFixed(0);
                 }
                 var innerAdult = {};
                 innerAdult["adults"] = adultlist;
                 innerAdult["adult_ss"] = adultObject["adult_ss"]
                 var contactObject = {};
                 $.each(formdata,
                 function(i, v) {
                    if (v.name.search("contact") != -1) {
                                contactObject[v.name] = v.value;
                    }
                 });
                contactObject["race"] = racelist;
                contactObject["latino"] = latinolist;
                slpapp["contact"] = contactObject;
                pgmObject["program"] = pgmlist;
                slpapp["program_set"] = pgmObject;
                slpapp["children"] = childlist;
                slpapp["nostudent_children"] = otherlist;
                slpapp["adults"] = innerAdult;
                var hhincome = 0;
                for (var i=0; i < slpapp["adults"]["adults"].length; ++i){
                    hhincome += parseFloat(slpapp["adults"]["adults"][i]["income_tot"]);
                }
                for (var i=0; i < slpapp["nostudent_children"].length; ++i){
                    hhincome += parseFloat(slpapp["nostudent_children"][i]["income_tot"]);
                }
                for (var i=0; i < slpapp["children"].length; ++i){
                    hhincome += parseFloat(slpapp["children"][i]["income_tot"]);
                }
                slpapp["hhincome"] = hhincome;
                slpapp["hhnum"] = slpapp["children"].length + slpapp["nostudent_children"].length + slpapp["adults"]["adults"].length;
                console.log(slpapp)
                $('li.qsection' + qsection).hide()
                $('li.qsection' + qsection).removeClass("activeques");
                set_ignore(qsection)
                qsection = qsection + 1;
                $('#helpcontainer').remove();
                $( help5_q12_template()).insertAfter( "#helphere" );
                $('li.qsection' + qsection).addClass("activeques");
                $('li.qsection' + qsection).show()
                remove_ignore(qsection)
                set_left_panel()
                var context = {app: slpapp, apptoday: GetTodayDate};
                $('#appsummary').html($(appsummary_template(context) ))
            }
            return;

            data = $('#stepform').serialize();
            $.ajax({
                type: "post",
                url: "/save_slp_app",
                data: $('#stepform').serialize(),
                success: function (data) {
                    var obj = JSON.parse(data)
                },
                error: function (xhr, status, error) {
                    alert("error")
                }
            });
        });

        var slpform1 = $('#form1').validate({
            // rules
            rules: {
                "child_fn[1]": {
                    required: true
                },
                "child_ln[1]": {
                    required: true
                },
                "child_student[1]": {
                    required: true
                },
                "child_foster[1]": {
                    required: true
                },
                pgm_case_num: {
                    required: true
                },
                adult_ss: {
                    required: true,
                    maxlength: 4,
                    minlength: 4,
                    number: true
                },
                contact_fn: {
                    required: true
                },
                contact_ln: {
                    required: true
                },
                contact_city: {
                    required: true
                },
                contact_state: {
                    required: true
                },
                contact_zipcode: {
                    required: true
                }
            },
            ignore: ".ignore",
            messages: {
                "child_fn[0]": {
                    required: "Please input a first name"
                },
                "child_ln[0]": {
                    required: "Please input a last name"
                },
                "child_foster[0]": {
                    required: "Please indicate status"
                }
            },
             errorPlacement: function (error, element) {
      /*         $(element).closest('.columns').next().find('.error_label').html(error);   */
              error.appendTo( element.parent(".field"));
               console.log(error)
             }
        });

        function set_ignore(section){
            $('.qsection' + section + ' .validate').each(function () {
                    $(this).addClass("ignore")
            });
        }

        function remove_ignore(section){
            $('.qsection' + section + '.ignore').each(function () {
                    $(this).removeClass("ignore")
            });
        }

        function get_all_children(){
            $("div #childrenincome .childincomein").remove();
            var students_fn = $('#form1 [name^=child_fn]');
            var students_ln = $('#form1 [name^=child_ln]');
            var students_mi = $('#form1 [name^=child_mi]');
            for (var i = 0; i < $('#form1 [name^=child_fn]').length; ++i){
                posstart = students_fn[i]["name"].indexOf("[")
                posend = students_fn[i]["name"].indexOf("]")
                var childid = students_fn[i]["name"].substr(posstart+1,(posend-posstart)-1);
                var stuincome = $('#form1 [name^="childincome[' + childid + ']"]');
                if(stuincome.length > 0){
                    var buttext = "EDIT INCOME"
                }
                else {
                    var buttext = "SET INCOME"
                }
                var context = {first_name: students_fn[i]["value"], middle_initial: students_mi[i]["value"], last_name: students_ln[i]["value"], rowid: i + 1, c_rowid: childid, classtype: "setstudentincome", childtype: "child", buttontext: buttext};
                $( childincomerow_template(context) ).insertBefore( "#childrenincome #bottomincome");
            }
            var others_fn = $('#form1 [name^=other_fn]');
            var others_ln = $('#form1 [name^=other_ln]');
            var others_mi = $('#form1 [name^=other_mi]');
            for (var i = 0; i < $('#form1 [name^=other_fn]').length; ++i){
                posstart = others_fn[i]["name"].indexOf("[")
                posend = others_fn[i]["name"].indexOf("]")
                var childid = others_fn[i]["name"].substr(posstart+1,(posend-posstart)-1)
                var othincome = $('#form1 [name^="otherincome[' + childid + ']"]');
                if(othincome.length > 0){
                    var buttext = "EDIT INCOME"
                }
                else {
                    var buttext = "SET INCOME"
                }
                var context = {first_name: others_fn[i]["value"], middle_initial: others_mi[i]["value"], last_name: others_ln[i]["value"], rowid: i + 1, c_rowid: childid, classtype: "setotherincome", childtype: "other", buttontext: buttext};
                $( childincomerow_template(context) ).insertBefore( "#childrenincome #bottomincome");
            }
        }

        $("#form1").on('click', '.setstudentincome', function () {
                    cur_childincome = $( this ).attr( "id" );
                    var childname = $('#childincomerowname'+cur_childincome).text();
                    var result = $('#form1').find('.qsection20.child' + cur_childincome)
                    if (result.length == 0) {
                        var context = {cur_childincome: cur_childincome};
                        $(stuincome_template(context)).insertAfter('#childrenincome');
           /*             $('.child' + cur_childincome + ' .validate').each(function () {
                            $(this).rules("add", {
                                required: true
                            });
                        });   */
                    }
                    $('#childrenincome').hide();
                    $('#childincname').html(childname);
                    $('#helpcontainer').remove();
                    $( helpcincome_template()).insertAfter( "#helphere" );
                    $('#childrenincome').removeClass("activeques");
                    $('li.qsection20.child' + cur_childincome).addClass("activeques");
                    $('li.qsection20.child' + cur_childincome).show()
                    remove_ignore(20)
        });

        $("#form1").on('click','.addnewchildincome', function () {
            childincomeid[cur_childincome - 1] = childincomeid[cur_childincome - 1] + 1;
            var context = {childtype: "child", cur_income: cur_childincome, income_ct: childincomeid[cur_childincome - 1]};
            $(addchildincome_template(context)).insertBefore( "li.qsection20.child" + cur_childincome + " #childincomeaddend" );
            $('.child' + cur_childincome + ' .validate').each(function () {
                    $(this).rules("add", {
                        required: true
                    });
                 });
            $('.child' + cur_childincome + ' .valincome').each(function () {
                    $(this).rules("add", {
                        number: true,
                        messages: {
                            number: "Please enter valid number. $ symbol not required."
                        }
                    });
                 });
                remove_ignore(20)
        });

        $("#form1").on('click', '.endchildincome', function () {
            if ($('#form' + form_num).valid()) {
                $('.qsection20.child' + cur_childincome).hide();
                $('li.qsection20.child' + cur_childincome).removeClass("activeques");
                set_ignore(20);
                var stuincome = $('#form1 [name^="childincome[' + cur_childincome + ']"]');
                if (stuincome.length > 0){
                    $('#form1').find('#' + cur_childincome + '.button.setstudentincome').val("EDIT INCOME");
                }
                else {
                    $('#form1').find('#' + cur_childincome + '.button.setstudentincome').val("SET INCOME");
                }
                $('#childrenincome').show();
                $('#childrenincome').addClass("activeques");
                $('#helpcontainer').remove();
                $( help4_template()).insertAfter( "#helphere" );
            }
        });

        $("#form1").on('click', '.setotherincome', function () {
                    cur_otherincome = $( this ).attr( "id" );
                    var childname = $('#otherincomerowname'+cur_otherincome).text();
                    var result = $('#form1').find('.qsection20.other' + cur_otherincome)
                    if (result.length == 0) {
                        var context = {cur_otherincome: cur_otherincome};
                        $(otherincome_template(context)).insertAfter('#childrenincome');
           /*             $('.other' + cur_otherincome + ' .validate').each(function () {
                            $(this).rules("add", {
                                required: true
                            });
                        });   */
                    }
                    $('#childrenincome').hide();
                    $('#childrenincome').removeClass("activeques");
                    $('#otherincname').html(childname);
                    $('#helpcontainer').remove();
                    $( helpcincome_template()).insertAfter( "#helphere" );
                    $('li.qsection20.other' + cur_otherincome).addClass("activeques");
                    $('li.qsection20.other' + cur_otherincome).show()
                    remove_ignore(20)
        });

        $("#form1").on('click','.addnewotherincome', function () {
            otherincomeid[cur_otherincome - 1] = otherincomeid[cur_otherincome - 1] + 1;
            var context = {childtype: "other", cur_income: cur_otherincome, income_ct: otherincomeid[cur_otherincome - 1]};
            $(addchildincome_template(context)).insertBefore( "li.qsection20.other" + cur_otherincome + " #otherincomeaddend" );
            $('.other' + cur_otherincome + ' .validate').each(function () {
                    $(this).rules("add", {
                        required: true
                    });
                 });
            $('.other' + cur_otherincome + ' .valincome').each(function () {
                    $(this).rules("add", {
                        number: true,
                        messages: {
                            number: "Please enter valid number. $ symbol not required."
                        }
                    });
                 });
            remove_ignore(20)
        });

        $("#form1").on('click', '.endotherincome', function () {
            if ($('#form' + form_num).valid()) {
                $('.qsection20.other' + cur_otherincome).hide();
                $('li.qsection20.other' + cur_otherincome).removeClass("activeques");
                set_ignore(20);
                var stuincome = $('#form1 [name^="otherincome[' + cur_otherincome + ']"]');
                if (stuincome.length > 0){
                    $('#form1').find('#' + cur_otherincome + '.button.setotherincome').val("EDIT INCOME");
                }
                else {
                    $('#form1').find('#' + cur_otherincome + '.button.setotherincome').val("SET INCOME");
                }
                $('#childrenincome').show();
                $('#childrenincome').addClass("activeques");
                $('#helpcontainer').remove();
                $( helpdash4_template()).insertAfter( "#helphere" );

            }
        });

    })

