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
    $(document).on('change', 'input[type="tel"]', function() {
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
    $(document).on('change', '.nr-input', function() {
        const parent = $(this).parent();
        if ($(this).hasClass('id-code')) {
            if ($(this).val().length === 11) {
                success(parent);
            } else {
                fail(parent);
            }
        } else {
            if (parseInt($(this).val())) {
                success(parent);
            } else {
                fail(parent);
            }
        }
    });

    $(document).on('change', 'input[type="text"]', function() {
        const parent = $(this).parent();
        if ($(this).val().length > 0) {
            if ($(this).hasClass('no-nr') &&
                /^[a-zA-ZõäöüÕÄÖÜ\s-]+$/.test($(this).val())) {
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


    $(document).on('change', '.email', function() {
        const parent = $(this).parent();
        if (validateEmail( $(this).val() )) {
            success(parent);
        } else {
            fail(parent);
        }
    });

    var start = document.getElementById('start');
    var end = document.getElementById('end');
    start.addEventListener('change', function() {
        if (start.value)
            end.min = start.value;
    }, false);
    end.addEventListener('change', function() {
        if (end.value)
            start.max = end.value;
    }, false);

});

function validateEmail($email) {
    var emailReg = /^([\w-\.õäöüÕÄÖÜ]+@([\w-]+\.)+[\w-]{2,4})?$/;
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