$(document).ready(function() {
    getListOfCounties();
    getListOfCountries();
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
        $('<div class="person-info-wrapper" onclick="startShowInfo(this)"><span></span><div class="person-info"><span class="inner">' + $('#block-three .form-group:last-child input').first().val() + ' ' + $('#block-three .form-group:last-child input:nth-child(2)').val() + '<span class="glyphicon glyphicon-pencil"></span><span class="glyphicon glyphicon-remove"></span></div></div>').insertBefore('#people-wrapper .form-group:last-child')
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
        $(blocks[index]).hide("slow");
    } else {
        Array.prototype.forEach.call(blocks, function(block) {
            $(block).hide();
        });
        $(blocks[index]).show("slow");
    }
}

function addAnotherPerson() {
    $('#block-three #people-wrapper').append(
        '<div class="form-group" id="other-people"><div class="inputdiv"><input class="form-control"><span class="floating-label">Eesnimi</span></div><div class="inputdiv"><input class="form-control"><span class="floating-label">Perenimi</span></div><div class="inputdiv"><input class="form-control"><span class="floating-label">Isikukood</span></div><div class="inputdiv"><input type="email" class="form-control"><span class="floating-label">E-post</span></div><div class="inputdiv"><input type="tel" class="form-control"><span class="floating-label">Telefon</span></div></div>');
      
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
    var selected = country.value;
    if (selected === 'Estonia') {
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
        document.getElementById("block-four").style = "display:block";
    } else {
        document.getElementById("block-four").style = "display:none";
    }
    displayNumbers();
}

function getListOfCounties() {
    var allCounties = ['Harjumaa', 'Hiiumaa', 'Ida-Virumaa', 'Jõgevamaa', 'Järvamaa','Läänemaa', 'Lääne-Virumaa', 'Põlvamaa', 'Pärnumaa', 'Raplamaa',
    'Saaremaa', 'Tartumaa', 'Valgamaa', 'Viljandimaa', 'Võrumaa'];
    var options = {
        source: allCounties,
        minLength:0
    }
    $('#maakond').autocomplete(options).bind('focus', function() {
        $(this).autocomplete("search");
    });
    $('#maakond2').autocomplete(options).bind('focus', function() {
        $(this).autocomplete("search");
    }); 
}
function getListOfCountries() {
    var allCountries= [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://restcountries.eu/rest/v2/all", false);
    xhr.send();
    var countryData = JSON.parse(xhr.responseText);
    for (i = 0; i < countryData.length; i++) { 
        allCountries.push(countryData[i].name);
    }
    var options = {
        source: allCountries,
        minLength:0,
        select: function(event, ui) {
            if (ui.item.label === 'Estonia') {
                $('#maakond').autocomplete("enable" );
            } else {
                $('#maakond').val('');
                $('#maakond').autocomplete("disable" );
            }
        }
    }
    var options2 = {
        source: allCountries,
        minLength:0,
        select: function(event, ui) {
            if (ui.item.label === 'Estonia') {
                $('#maakond2').autocomplete("enable" );
            } else {
                $('#maakond2').val('');
                $('#maakond2').autocomplete("disable" );
            }
        }
    }
    $("#riik2").autocomplete(options2).bind('focus', function() {
        $(this).autocomplete("search");
    }); 
    $("#riik").autocomplete(options).bind('focus', function() {
        $(this).autocomplete("search");
    });  
}
