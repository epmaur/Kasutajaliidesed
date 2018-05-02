const STUDENTS_TABLE_NAME = 'ui_t3_142766_students';
const WORK_TABLE_NAME = 'ui_t3_142766_work';
var students = [{"id":"1","student_code":"112233IAPB","name":"Kaire Kaalikas","student_group":"K16"},{"id":"2","student_code":"070707IAPB","name":"Peeter Paun","student_group":"K12"},{"id":"3","student_code":"080808IAPB","name":"Robin Kuur","student_group":"K12"},{"id":"4","student_code":"142766IAPB","name":"Kert Ojasaar","student_group":"K16"},{"id":"5","student_code":"123123IAPB","name":"test","student_group":"K14"},{"id":"6","student_code":"111111IAPB","name":"test","student_group":"K12"},{"id":"7","student_code":"111111IAPB","name":"test123","student_group":"K12"},{"id":"8","student_code":"000000IAPB","name":"Testija Test","student_group":"K12"},{"id":"9","student_code":"000000IAPB","name":"Testija Test","student_group":"K12"}];
// getFromDb(STUDENTS_TABLE_NAME);
console.log('students:', students);

$(document).ready(function() {
  // console.log('ready');
  // postToDb(STUDENTS_TABLE_NAME);

  // getFromDb(WORK_TABLE_NAME);

  $('#submit').click(function() {
    const student1 = students.filter(x => x.student_code === $('#student1_code').val())[0];
    const student2 = students.filter(x => x.student_code === $('#student2_code').val())[0];
    console.log('student1:', student1);
    const data = {
      'tableName': WORK_TABLE_NAME,
      'due_date': $('').val(),
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
      'lu1': $('#lu1').val(),
      'lu2': $('#lu2').val(),
      'lu3': $('#lu3').val(),
      'lu4': $('#lu4').val(),
      'lu5': $('#lu5').val(),
      'lu6': $('#lu6').val(),
      'lu7': $('#lu7').val(),
      'lu8': $('#lu8').val(),
      'lu9': $('#lu9').val(),
      'lu10': $('#lu10').val(),
      'extra_p': $('#extra-p').val(),
      'extra_c': $('#extra_c').val(),
      'late_p': $('#late_p').val(),
      'late_c': $('#late_c').val(),
      'plag_p': $('#plag_p').val(),
      'plag_c': $('#plag_c').val(),
      'done': $('#done').val(),
      'cool': $('#cool').val()
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
