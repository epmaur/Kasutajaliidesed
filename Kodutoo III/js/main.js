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
    console.log('student1_code:', $('#student1_code').val());
    const student1 = students.filter(x => x.student_code === $('#student1_code').val())[0];
    console.log('student1:', student1);
    const data = {
      'tableName': STUDENTS_TABLE_NAME,
      'due_date': $('').val()
    };
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
      students = data;
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
