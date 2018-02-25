$(document).ready(function() {
    getListOfCounties();
    getListOfCountries();
    displayNumbers();
    
    $('input[name="rights"]').on('change', function() {
				$('#block-six').show();
        const val = $(this).val();
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
        if (isFilled($(this).parent().find('#people-wrapper'))) {
            const block = $('#block-three #people-wrapper .form-group:last-child');
            $(block).hide();
            $('<div class="person-info-wrapper"><div class="person-info"><span class="inner" onclick="startShowInfo(this)"><span class="saved-name">' + $('#block-three .form-group:last-child .inputdiv:first-child input').val() + ' ' + $('#block-three .form-group:last-child .inputdiv:nth-child(2) input').val() + '<span class="glyphicon glyphicon-pencil"></span></span></span><span class="glyphicon glyphicon-remove"></span></div></div>').insertBefore('#people-wrapper .form-group:last-child')
            addAnotherPerson();
        }
    });
    $('body').click(function(event) {
        if (event.target.classList.contains('glyphicon-remove')) {
            const index = $(event.target).parent().parent().index();
            $('#people-wrapper div').eq(index).remove();
            $('#people-wrapper div').eq(index).remove();
        }
    });
    
    $('#file-input-displayed').click(function() {
        $('#file-input').click();
    });

    $('#choose-file').click(function() {
        $('#file-input').click();
    });
    
    $('#file-input').change(function(e) {
        if (e) {
            $('#file-input-displayed').val( $(this)[0].files[0].name );
        }
    });
    
    $('#send1').click(function() {
			$('.error-message').hide();
            $('#page1').fadeOut(500);
            setTimeout(function() {
                $('.animationload').show();
            }, 400);
            setTimeout(function() {
                $('.animationload').hide();
				makeSecondPage();
                $('#page2').fadeIn(500);
            }, 1000);
						
			/*
        if (pageFilled() && radioButtonChecked()) {
						$('.error-message').hide();
            $('#page1').fadeOut(500);
            setTimeout(function() {
                $('.animationload').show();
            }, 400);
            setTimeout(function() {
                $('.animationload').hide();
                $('#page2').fadeIn(500);
            }, 1000);
        } else {
						showBlankFields();
						$('.error-message').show();
        }
				*/
    });
    $('#send2').click(function() {
        $('#page2').fadeOut(500);
        setTimeout(function() {
            $('.animationload').show();
        }, 400);
        setTimeout(function() {
            $('.animationload').hide();
            $('#page3').fadeIn(500);
        }, 1000);
    });
    $('#send3').click(function() {
        $('#page3').fadeOut(500);
        setTimeout(function() {
            $('.animationload').show();
        }, 400);
        setTimeout(function() {
            $('.animationload').hide();
            $('#page1').fadeIn(500);
        }, 1000);
    });
});

function makeSecondPage() {
  	appendAnotherPerson($('#submitter-firstname').val() + ' ' + $('#submitter-lastname').val());
  	Array.prototype.forEach.call(document.getElementsByClassName('other-people'), function(input) {
	  	let firstname = $(input).find('#firstname').val();
	  	let lastname = $(input).find('#lastname').val();
	  	if (firstname.length > 0 && lastname.length > 0) {
		  appendAnotherPerson(firstname + ' ' + lastname);
		}
    });
}

function appendAnotherPerson(name) {
  $('#block-seven').append(
  '<div class="form-group" id="other-people"><span class="name-span">'+ name +'</span><div class="inputdiv"><input type="text" class="form-control" required><span class="floating-label">Rahvus</span></div><div class="inputdiv"><input type="text" class="form-control" required><span class="floating-label">Emakeel</span></div><select class="form-control select"><option disabled selected>Omandatud kõrgeim haridustase</option><option>Alghariduseta</option><option>Põhikooli 1.-6.klass</option><option>Põhikooli 7.-9.klass</option><option>Kutsekeskharidus või kutseõpe (sh keskeri-või tehnikumiharidus) põhihariduse baasil</option><option>Keskharidus</option><option>Kutsekeskharidus või kutseõpe keskhariduse baasil</option><option>Keskeri- ja tehnikumiharidus keskhariduse baasil</option><option>Bakalaureus või sellega võrdsustatud haridus</option><option>Magister või sellega võrdsustatud haridus</option><option>Doktor või sellega võrdsustatud haridus</option></select><select class="form-control select"><option disabled selected>Sotsiaal-majanduslik seisund</option><option>Töötav</option><option>Kodune</option><option>Töötu/ tööd otsiv</option><option>Ajateenija</option><option>Üli(õpilane)</option><option>Pensionär</option><option>Lapsehoolduspuhkusel</option><option>Muu mittetöötav</option></select></div>'
  );
}

function showBlankFields() {
	let optionalFields = ["comment", "foreignID", "foreignResidence"];
	Array.prototype.forEach.call(document.getElementsByClassName('required'), function(input) {
        if ($(input).val() === '' && $.inArray($(input).attr('id'), optionalFields) == -1) {
            $(input).parent().addClass("has-warning");
        }
    });
}

function radioButtonChecked() {
	return $('input[name=rights]:checked').length;
}

function pageFilled() {
    let ok = true;
		let optionalFields = ["comment", "foreignID", "foreignResidence"];
    Array.prototype.forEach.call(document.getElementsByClassName('required'), function(input) {
        if ($(input).val() === '' && $.inArray($(input).attr('id'), optionalFields) == -1) {
            ok = false;
        }
    });
    return ok;
}

function isFilled(parent) {
    let ok = true;
    Array.prototype.forEach.call($(parent).children().children(), function(child) {
        if ($(child).children('input')) {
            if ($(child).children('input').val() === '') {
                fail(child);
                ok = false;
            }
        }
    });
    return ok;
}

function startShowInfo(el) {
    let index = $(el).parent().parent().index();
    if (index > 0) {
        index = index - 1;
    }
    showInfo($('#block-three .form-group:not(:last-child)'), index, $(el).parent().parent());
}

function showInfo(blocks, index, el) {
    if ($(blocks[index]).is(':visible')) {
        $(blocks[index]).hide("slow");
        $(el).children().children().first().removeClass('opened');
    } else {
        Array.prototype.forEach.call(blocks, function(block) {
            $(block).hide();
        });
        $(blocks[index]).show("slow");
        $(el).children().children().first().addClass('opened');
    }
}

function addAnotherPerson() {
    $('#block-three #people-wrapper').append(
        '<div class="form-group other-people" id="other-people"><div class="inputdiv"><input class="form-control" required id="firstname"><span class="floating-label">Eesnimi *</span></div><div class="inputdiv"><input class="form-control" required id="lastname"><span class="floating-label">Perenimi *</span></div><div class="inputdiv"><input class="form-control" required><span class="floating-label">Isikukood *</span></div><div class="inputdiv"><input type="email" class="form-control" required><span class="floating-label">E-post *</span></div><div class="inputdiv"><input type="tel" class="form-control" required><span class="floating-label">Telefon *</span></div></div>');
      
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
