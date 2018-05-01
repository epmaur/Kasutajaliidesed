const STUDENTS_TABLE_NAME = 'ui_t3_142766_students';
const WORK_TABLE_NAME = 'ui_t3_142766_work';

$(document).ready(function() {
  // console.log('ready');
  postToDb(STUDENTS_TABLE_NAME);
  setTimeout(function() {
    getFromDb(STUDENTS_TABLE_NAME);
    // getFromDb(WORK_TABLE_NAME);
  }, 1000);
});

function getFromDb(tableName) {
  $.ajax({
    url: 'api.php',
    type: 'GET',
    data: {
      'tableName': tableName,
      'method': 'GET'
    },
    dataType: 'json',
    success: function(data) {
      console.log('success data:', data)
    }
  });
}

function postToDb(tableName) {
  $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      'tableName': tableName,
      'method': 'POST',
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
