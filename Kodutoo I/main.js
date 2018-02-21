$(document).ready(function() {
    displayNumbers();
    
    $('input[name="rights"]').on('change', function() {
        const val = $(this).val();
        $('#block-four').show();
        displayNumbers();
        if (val == 1) {
            $('#extras-header').html('Ruumi omamise tõend');
        } else if (val == 2) {
            $('#extras-header').html('Kokkulepe (kaas)omanikuga');
        } else if (val == 3) {
            $('#extras-header').html('Üürileping');
        } else {
            $('#extras-header').html('Omaniku nõusolek');
        }
    });
    
    $('#savePerson').on('click', function() {
        const block = $('#block-three #people-wrapper .form-group:last-child');
//        console.log(block);
        $(block).hide();
        $('<div class="person-info-wrapper" onclick="startShowInfo(this)"><div class="person-info"><span class="inner">' + $('#block-three .form-group:last-child input').first().val() + ' ' + $('#block-three .form-group:last-child input:nth-child(2)').val() + '<span class="glyphicon glyphicon-pencil"></span></span></div></div>').insertBefore('#people-wrapper .form-group:last-child')
        /*$('#people').append(
            '<div class="person-info-wrapper"><div class="person-info">' + $('#block-three .form-group:last-child input').first().val() + '</div>' + '<div class="person-info">' + $('#block-three .form-group:last-child input:nth-child(2)').val() + '</div></div>'
        );*/
        addAnotherPerson();
    });
});

//$('.person-info-wrapper').on('click', function() {
//            let index = $(this).index();
//            if (index > 0) {
//                index = index - 1;
//            }
//            showInfo($('#block-three .form-group:not(:last-child)'), index);
//        });

function startShowInfo(el) {
    let index = $(el).index();
    if (index > 0) {
        index = index - 1;
    }
    showInfo($('#block-three .form-group:not(:last-child)'), index);
}

function showInfo(blocks, index) {
    if ($(blocks[index]).is(':visible')) {
        $(blocks[index]).hide();
    } else {
        Array.prototype.forEach.call(blocks, function(block) {
            $(block).hide();
        });
        $(blocks[index]).show();
    }
}

function addAnotherPerson() {
    $('#block-three #people-wrapper').append(
        '<div class="form-group" id="other-people"><input class="form-control" placeholder="Eesnimi"><input class="form-control" placeholder="Perenimi"><input class="form-control" placeholder="Isikukood"><input type="email" class="form-control" placeholder="E-post"><input type="tel" class="form-control" placeholder="Telefon"></div>');
}

function displayNumbers() {
    let index = 1;
    Array.prototype.forEach.call(document.getElementsByClassName('index-nr'), function(el) {
        if ( $(el.parentElement).is(':visible') ){
            el.innerHTML = index++ + '.';
        }
    });
}

function selectCountry() {
    var country = document.getElementById("riik");
    var selected = country.options[country.selectedIndex].value;
    if (selected === 'Eesti') {
        document.getElementById("maakond").style = "display:none";
        document.getElementById("maakondEesti").style = "display:block";
    }
}

function changeOtherPeoplesResidence() {
    var checkboxValue = document.getElementById("otherPeoplesResidence").checked;
    if (checkboxValue) {
        document.getElementById("block-three").style = "display:block";
    } else {
        document.getElementById("block-three").style = "display:none";
    }
    displayNumbers();
}

function multipleResidences() {
    var checkboxValue = document.getElementById("multipleResidences").checked;
    if (checkboxValue) {
        document.getElementById("block-five").style = "display:block";
    } else {
        document.getElementById("block-five").style = "display:none";
    }
    displayNumbers();
}
