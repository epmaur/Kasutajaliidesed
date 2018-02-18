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
}

function multipleResidences() {
    var checkboxValue = document.getElementById("multipleResidences").checked;
    if (checkboxValue) {
        document.getElementById("block-five").style = "display:block";
    } else {
        document.getElementById("block-five").style = "display:none";
    }
}
