$(document).ready(function() {
  console.log('ready');
  getFromDb('ui_t3_142766_students');
  getFromDb('ui_t3_142766_work')
});

function getFromDb(tableName) {
  $.ajax({
    url: 'api.php',
    type: 'GET',
    data: {'tableName': tableName},
    dataType: 'json',
    success: function(data) {
      console.log('success data:', data)
    }
  });
}
