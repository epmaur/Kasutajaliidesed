$(document).ready(function() {
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
    $('input[type="tel"]').change(function() {
        const parent = $(this).parent();
        if (/^[+]{0,1}[0-9-]+[0-9]$/.test( $(this).val() )) {
            success(parent);
        } else {
            fail(parent);
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
    $('.nr-input').change(function() {
        const parent = $(this).parent();
        if (parseInt($(this).val())) {
            success(parent);
        } else {
            fail(parent);
        }
    });
    
    $('input[type="text"]').change(function() {
        const parent = $(this).parent();
        if ($(this).val().length > 0) {
            if ($(this).hasClass('no-nr') &&
               /^[a-zA-Z]+$/.test($(this).val())) {
                success(parent);
            } else if (!$(this).hasClass('no-nr')) {
                success(parent);
            } else {
                fail(parent);
            }
        } else {
            fail(parent);
        }
    });
    
    $('input[type="email"]').change(function() {
        const parent = $(this).parent();
        if (validateEmail( $(this).val() )) {
            success(parent);
        } else {
            fail(parent);
        }
    });
});

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function fail(parent) {
    $(parent).removeClass('has-success');
    if ($(parent).children().length === 3) {
        $(parent).children().last().remove();
    }
    $(parent).addClass('has-warning');
    $(parent).append('<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>');
}

function success(parent) {
    $(parent).removeClass('has-warning');
    if ($(parent).children().length === 3) {
        $(parent).children().last().remove();
    }
    $(parent).addClass('has-success');
    $(parent).append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
}