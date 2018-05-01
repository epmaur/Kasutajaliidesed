<?php
  $host = "localhost";
  $user = "st2014";
  $pass = "progress";

  $databaseName = "st2014";
  $tableName = (isset($_GET["tableName"]) ? $_GET["tableName"] : null);
  $method = (isset($_GET["method"]) ? $_GET["method"] : null);

  $connection = mysqli_connect("localhost", "st2014", "progress");
  if (!$connection) {
      die("Connection error: " . mysqli_connection_error());
  }

  $db = mysqli_select_db($connection, "st2014");

  if ($method == "GET") {
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
  } else if ($method == 'POST') {
    /*if (isset($_GET["due_date"])) {
      $due_date = $_GET['due_date'];
      $student1_id = $_GET['student1_id'];
      $student2_id = $_GET['student2_id'];
      $url = $_GET['url'];
      $bu1_p = $_GET['bu1_p'];
      $bu1_c = $_GET['bu1_c'];
      $bu2_p = $_GET['bu2_p'];
      $bu2_c = $_GET['bu2_c'];
      $bu3_p = $_GET['bu3_p'];
      $bu3_c = $_GET['bu3_c'];
      $bu4_p = $_GET['bu4_p'];
      $bu4_c = $_GET['bu4_c'];
      $bu5_p = $_GET['bu5_p'];
      $bu5_c = $_GET['bu5_c'];
      $bu6_p = $_GET['bu6_p'];
      $bu6_c = $_GET['bu6_c'];
      $lu1 = $_GET['lu1'];
      $lu2 = $_GET['lu2'];
      $lu3 = $_GET['lu3'];
      $lu4 = $_GET['lu4'];
      $lu5 = $_GET['lu5'];
      $lu6 = $_GET['lu6'];
      $lu7 = $_GET['lu7'];
      $lu8 = $_GET['lu8'];
      $lu9 = $_GET['lu9'];
      $lu10 = $_GET['lu10'];
      $extra_p = $_GET['extra_p'];
      $extra_c = $_GET['extra_c'];
      $late_p = $_GET['late_p'];
      $late_c = $_GET['late_c'];
      $plag_p = $_GET['plag_p'];
      $plag_c = $_GET['plag_c'];
      $done = $_GET['done'];
      $cool = $_GET['cool'];
      mysqli_query($connection, "INSERT INTO ui_t3_142766_work (due_date, student1_id, student2_id, url, " +
          + "bu1_p, bu1_c, bu2_p, bu2_c, bu3_p, bu3_c, bu4_p, bu4_c, bu4_p, bu5_c, bu6_p, bu6_c, " +
          + "lu1, lu2, lu3, lu4, lu5, lu6, lu7, lu8, lu9, lu10, extra_p, extra_c, late_p, late_c, plag_p, plag_c, done, cool) " +
          + " VALUES ('$due_date', '$student1_id', '$student2_id', '$url', " +
          + "'$bu1_p', '$bu1_c', '$bu2_p', '$bu2_c', '$bu3_p', '$bu3_c', '$bu4_p', '$bu4_c', '$bu4_p', '$bu5_c', " +
          + "'$bu6_p', '$bu6_c', '$lu1', '$lu2', '$lu3', '$lu4', '$lu5', '$lu6', '$lu7', '$lu8', '$lu9', '$lu10', " +
          + "'$extra_p', '$extra_c', '$late_p', '$late_c', '$plag_p', '$plag_c', '$done', '$cool')");
    } else {*/
//      echo "POST";
      $student_code = $_GET['student_code'];
      $name = $_GET['name'];
      $student_group = $_GET['student_group'];
      echo "code: " . $student_code . ", name: " . $name . ", group: " . $group;
      $sql = "INSERT INTO ui_t3_142766_students (student_code, name, student_group) VALUES ('$student_code', '$name', '$student_group')";
      $res = mysqli_query($connection, $sql);
      if ($res) {
        echo 'RES:' . $res;
      } else {
        echo 'ERROR' . mysqli_error($connection);
      }
//    }
  }
?>
