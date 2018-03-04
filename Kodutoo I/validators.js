$(document).ready(function() {
    $('.has-warning').tooltip();


    $('input[type="tel"]').keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 16, 187, 189]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $(document).on('keyup', 'input[type="tel"]', function() {
        const parent = $(this).parent();
        if (/^[+]{0,1}[0-9-]+[0-9]$/.test( $(this).val() )) {
            success(parent);
        } else {
            fail(parent, 'Liiga lühike telefoninumber');
        }
    });

    $('.nr-input').keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $(document).on('keyup', '.nr-input', function() {
        const parent = $(this).parent();
        if ($(this).hasClass('id-code')) {
            if ($(this).val().length === 11) {
                success(parent);
            } else {
                fail(parent, 'Isikukood peab olema 11 numbrimärki pikk');
            }
        } else {
            if (parseInt($(this).val())) {
                success(parent);
            } else {
                fail(parent);
            }
        }
    });


    $(document).on('keyup', 'input[type="text"]', function() {
        const parent = $(this).parent();
        if ($(this).val().length > 0) {
            if ($(this).hasClass('no-nr') &&
                /^[a-zA-ZõäöüÕÄÖÜ\s-]+$/.test($(this).val())) {
                success(parent);
            } else if (!$(this).hasClass('no-nr')) {
                success(parent);
            } else if ($(this).hasClass('no-nr')){
                fail(parent, 'Ei tohi sisaldada numbreid');
            }
        } else {
            fail(parent, 'Pikkus peab olema vähemalt 1 tähemärk');
        }
    });


    $(document).on('keyup', '.email', function() {
        const parent = $(this).parent();
        if (validateEmail( $(this).val() )) {
            success(parent);
        } else {
            fail(parent, 'Ebakorrektne e-mail');
        }
    });

    $("#start").datepicker({
        onSelect: function (selected) {
            var dt = new Date(selected);
            dt.setDate(dt.getDate() + 1);
            $("#end").datepicker("option", "minDate", dt);
        }
    });

    $("#end").datepicker({
        onSelect: function (selected) {
            var dt = new Date(selected);
            dt.setDate(dt.getDate() - 1);
            $("#start").datepicker("option", "maxDate", dt);
        }
    });
});

function validateEmail($email) {
    var emailReg = /^([\w-\.õäöüÕÄÖÜ]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function fail(parent, title) {
    $(parent).removeClass('has-success');
    if ($(parent).children().length === 3) {
        $(parent).children().last().remove();
    }
    $(parent).addClass('has-warning');
    $(parent).tooltip('destroy');
    $(parent).tooltip({'trigger':'hover', 'title': title, 'placement' : 'right'});
    $(parent).append('<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>');

}

function success(parent) {
    $(parent).removeClass('has-warning');
    if ($(parent).children().length === 3) {
        $(parent).children().last().remove();
    }
    $(parent).addClass('has-success');
    $(parent).tooltip('destroy');
    $(parent).append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
}