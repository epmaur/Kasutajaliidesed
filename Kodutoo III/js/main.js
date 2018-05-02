const STUDENTS_TABLE_NAME = 'ui_t3_142766_students';
const WORK_TABLE_NAME = 'ui_t3_142766_work';
var students = null;
getFromDb(STUDENTS_TABLE_NAME);
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
