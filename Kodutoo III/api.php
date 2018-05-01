<?php

  //--------------------------------------------------------------------------
  // Example php script for fetching data from mysql database
  //--------------------------------------------------------------------------
  $host = "localhost";
  $user = "st2014";
  $pass = "progress";

  $databaseName = "st2014";
  $tableName = $_GET['tableName'];
  if (!$tableName) {
    echo 'NO TABLE NAME GIVEN!';
  }

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
//  include 'DB.php';
  /*$con = mysqli_connect($host, $user, $pass);
  $dbs = mysqli_select_db($con, $databaseName);*/
  $connection = mysqli_connect("localhost", "st2014", "progress");
  if (!$connection) {
      die("Connection error: " . mysqli_connection_error());
  }

  $db = mysqli_select_db($connection, "st2014");

  //--------------------------------------------------------------------------
  // 2) Query database for data
  //--------------------------------------------------------------------------
  $result = mysqli_query($connection, "SELECT * FROM $tableName");          //query
  $array = mysqli_fetch_row($result);                          //fetch result

  //--------------------------------------------------------------------------
  // 3) echo result as json
  //--------------------------------------------------------------------------
  echo json_encode($array);

?>