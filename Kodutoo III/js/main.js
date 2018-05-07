const STUDENTS_TABLE_NAME = 'ui_t3_142766_students';
const WORK_TABLE_NAME = 'ui_t3_142766_work';
var students = [{"id":"1","student_code":"112233IAPB","name":"Kaire Kaalikas","student_group":"K16"},{"id":"2","student_code":"070707IAPB","name":"Peeter Paun","student_group":"K12"},{"id":"3","student_code":"080808IAPB","name":"Robin Kuur","student_group":"K12"},{"id":"4","student_code":"142766IAPB","name":"Kert Ojasaar","student_group":"K16"},{"id":"5","student_code":"123123IAPB","name":"test","student_group":"K14"},{"id":"6","student_code":"111111IAPB","name":"test","student_group":"K12"},{"id":"7","student_code":"111111IAPB","name":"test123","student_group":"K12"},{"id":"8","student_code":"000000IAPB","name":"Testija Test","student_group":"K12"},{"id":"9","student_code":"000000IAPB","name":"Testija Test","student_group":"K12"}];
// getFromDb(STUDENTS_TABLE_NAME);
console.log('students:', students);
const lu_inputs = ['#lu1', '#lu2', '#lu3', '#lu4', '#lu5', '#lu6', '#lu7', '#lu8', '#lu9', '#lu10'];
const bu_inputs =['#bu1_p','#bu2_p','#bu3_p', '#bu4_p', '#bu5_p', '#bu6_p'];


$(document).ready(function() {

  $.each(lu_inputs, function( index, value ) {
    $(value).bind( "click", function() {
      updateSummaryTable('lu');
    });
  });

  $.each(bu_inputs, function( index, value ) {
    $(value).change(function() {
      updateSummaryTable('bu');
    });
  });

  $('#extra_p').change(function() {
    updateSummaryTable('extra_p');
  });

  $('#late_p').change(function() {
    updateSummaryTable('late_p');
  });

  $('#plag_p').change(function () {
    updateSummaryTable('');
  });

  var dueDate = $('#due-date').html();
  var fullDate = new Date();
  var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
  var twoDigitDay = ((fullDate.getDate().length) === 1)? (fullDate.getDate()) : '0' + (fullDate.getDate());
  var currentDate = twoDigitDay + "." + twoDigitMonth + "." + fullDate.getFullYear();
  console.log('current date', currentDate);

  var studentNames = [];
  var studentCodes = [];
  $.each(students, function (index, value) {
    studentNames.push(value.name);
    studentCodes.push(value.student_code);
  });

  $('#student1_name').autocomplete({
    source: studentNames,
    select: function( event, ui ) {
      var studentCode = students.filter(x => x.name === ui.item.value)[0].student_code;
      $('#student1_code').val(studentCode);
    }
  });
  $('#student2_name').autocomplete({
    source: studentNames,
    select: function( event, ui ) {
      var studentCode = students.filter(x => x.name === ui.item.value)[0].student_code;
      $('#student2_code').val(studentCode);
    }
  });
  $('#student1_code').autocomplete({
    source: studentCodes,
    select: function( event, ui ) {
      var studentName = students.filter(x => x.student_code === ui.item.value)[0].name;
      $('#student1_name').val(studentName);
    }
  });
  $('#student2_code').autocomplete({
    source: studentCodes,
    select: function( event, ui ) {
      var studentName = students.filter(x => x.student_code === ui.item.value)[0].name;
      $('#student2_name').val(studentName);
    }
  });


  $('#submit').click(function() {
    const student1 = students.filter(x => x.student_code === $('#student1_code').val())[0];
    const student2 = students.filter(x => x.student_code === $('#student2_code').val())[0];
    console.log('bu1_c:', $('#bu1_c').val(), typeof $('#bu1_c').val());
    const data = {
      'tableName': WORK_TABLE_NAME,
      'due_date': '02.05.2018',
      'student1_id': student1.id,
      'student2_id': student2.id,
      'url': $('#url').val(),
      'bu1_p': $('#bu1_p').val(),
      'bu1_c': $('#bu1_c').val(),
      'bu2_p': $('#bu2_p').val(),
      'bu2_c': $('#bu2_c').val(),
      'bu3_p': $('#bu3_p').val(),
      'bu3_c': $('#bu3_c').val(),
      'bu4_p': $('#bu4_p').val(),
      'bu4_c': $('#bu4_c').val(),
      'bu5_p': $('#bu5_p').val(),
      'bu5_c': $('#bu5_c').val(),
      'bu6_p': $('#bu6_p').val(),
      'bu6_c': $('#bu6_c').val(),
      'lu1': $('#lu1').is(':checked'),
      'lu2': $('#lu2').is(':checked'),
      'lu3': $('#lu3').is(':checked'),
      'lu4': $('#lu4').is(':checked'),
      'lu5': $('#lu5').is(':checked'),
      'lu6': $('#lu6').is(':checked'),
      'lu7': $('#lu7').is(':checked'),
      'lu8': $('#lu8').is(':checked'),
      'lu9': $('#lu9').is(':checked'),
      'lu10': $('#lu10').is(':checked'),
      'extra_p': $('#extra_p').val(),
      'extra_c': $('#extra_c').val(),
      'late_p': $('#late_p').val(),
      'late_c': $('#late_c').val(),
      'plag_p': $('#plag_p').is(':checked'),
      'plag_c': $('#plag_c').val(),
      'done': $('#done').is(':checked'),
      'cool': $('#cool').is(':checked')
    };
    $.ajax({
      url: 'post.php',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data) {
        console.log('success data:', data)
      }
    });
    setTimeout(function () {
      getFromDb(WORK_TABLE_NAME);
    }, 3000);
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
    if (parseInt($(this).val())) {
      success(parent);
    } else {
      fail(parent);
    }
  });
  $(document).on('keyup', '.name-input', function() {
    const parent = $(this).parent();
    if ($(this).val().length > 0) {
      if (/^[a-zA-ZõäöüÕÄÖÜ\s-]+$/.test($(this).val())) {
        success(parent);
      }
      else {
        fail(parent, 'Nimi peab koosnema vaid tähtedest');
      }
    } else {
      fail(parent, 'Pikkus peab olema vähemalt 1 tähemärk');
    }
  });
  /*$(document).on('keyup', 'input[type="url"]', function() {
    if (/^[a-zA-Z\-]{2, 256}\.[a-zA-Z]$/.test($(this).val())) {
      success($(this).parent());
    } else {
      fail($(this).parent());
    }
  });*/
  $(document).on('keyup', '.code-input', function() {
    const parent = $(this).parent();
    if ($(this).val().length > 0) {
      if (/^[0-9]{6}[a-zA-Z]{4}$/.test($(this).val())) {
        success(parent);
      } else {
        fail(parent, 'Pole korrektne tudengikood');
      }
    } else {
      fail(parent, 'Pikkus peab olema vähemalt 1 tähemärk');
    }
  });
});

function getFromDb(tableName) {
  $.ajax({
    url: 'get.php',
    type: 'GET',
    data: {
      'tableName': tableName
    },
    dataType: 'json',
    success: function(data) {
      console.log('success data:', data);
      if (tableName === STUDENTS_TABLE_NAME) {
        students = data;
      }
    }
  });
}

function postToDb(tableName) {
  $.ajax({
    url: 'post.php',
    type: 'POST',
    data: {
      'tableName': tableName,
      'student_code': '000000IAPB',
      'name': 'Testija Test',
      'student_group': 'K12'
    },
    dataType: 'json',
    success: function(data) {
      console.log('success data:', data)
    }
  });
}

function fail(parent, title) {
  $(parent).removeClass('has-success');
  $(parent).addClass('has-warning');
  //$(parent).tooltip('destroy');
  //$(parent).tooltip({'trigger': 'hover', 'title': title, 'placement': 'right'});
  $(parent).append('<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>');

}

function success(parent) {
  $(parent).removeClass('has-warning');
  $(parent).addClass('has-success');
  //$(parent).tooltip('destroy');
  $(parent).append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
}

function updateSummaryTable(field) {
  if (field === 'lu') {
    var lu_points = 0;
    $.each(lu_inputs, function (index, value) {
      if ($(value).is(":checked")) {
        lu_points++;
      }
    });
    $('#lu-total').html(lu_points);
  } else if (field === 'bu') {
    var bu_points = 0;
    $.each(bu_inputs, function( index, value ) {
      var val = $(value).val() === '' ? 0: parseInt($(value).val());
      bu_points = bu_points + val;
    });
    console.log(bu_points);
    $('#bu-total').html(bu_points);
  } else if (field === 'extra_p') {
    var val = $('#extra_p').val() === '' ? 0: parseInt($('#extra_p').val());
    $('#extra-p').html(val);
  } else if (field === 'late_p') {
    var val = $('#late_p').val() === '' ? 0: parseInt($('#late_p').val());
    $('#late-p').html(val);
  }
  var sum = parseInt($('#lu-total').html()) + parseInt($('#bu-total').html()) + parseInt($('#extra-p').html()) + parseInt($('#late-p').html());
  $('#total').html(sum);

  if (bu_points === 10) {
    $('#done').attr('checked','checked');
  } else {
    $('#done').removeAttr('checked');
  }
  if ($('#plag_p').is('checked')) {
    $('#done').removeAttr('checked');

  }
}




