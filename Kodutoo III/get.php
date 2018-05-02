<?php
  $host = "localhost";
  $user = "st2014";
  $pass = "progress";

  $databaseName = "st2014";
  $tableName = (isset($_GET["tableName"]) ? $_GET["tableName"] : null);

  $connection = mysqli_connect("localhost", "st2014", "progress");
  if (!$connection) {
      die("Connection error: " . mysqli_connection_error());
  }

  $db = mysqli_select_db($connection, "st2014");

    $result = mysqli_query($connection, "SELECT * FROM $tableName");
    $rows = array();
    if (mysqli_num_rows($result)) {
      while($row = mysqli_fetch_assoc($result)) {
        array_push($rows, $row);
      }
    } else {
      echo "EMPTY RESPONSE";
    }
    echo json_encode($rows);

?>
