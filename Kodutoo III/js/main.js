$(document).ready(function() {
  console.log('ready');
  $.ajax({
    url: 'api.php',
    data: '',
    dataType: 'json',
    success: function(data) {
      console.log('success data:', data)
    }
  });
});
