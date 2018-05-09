<?php
  $host = "localhost";
  $user = "st2014";
  $pass = "progress";

  $databaseName = "st2014";
  $tableName = (isset($_POST["tableName"]) ? $_POST["tableName"] : null);

  $connection = mysqli_connect("localhost", "st2014", "progress");
  if (!$connection) {
      die("Connection error: " . mysqli_connection_error());
  }

  $db = mysqli_select_db($connection, "st2014");

//    if (isset($_POST["due_date"])) {
      $id = $_POST["id"];
      $due_date = $_POST['due_date'];
      $student1_id = $_POST['student1_id'];
      $student2_id = $_POST['student2_id'];
      $url = $_POST['url'];
      $bu1_p = $_POST['bu1_p'];
      $bu1_c = $_POST['bu1_c'];
      $bu2_p = $_POST['bu2_p'];
      $bu2_c = $_POST['bu2_c'];
      $bu3_p = $_POST['bu3_p'];
      $bu3_c = $_POST['bu3_c'];
      $bu4_p = $_POST['bu4_p'];
      $bu4_c = $_POST['bu4_c'];
      $bu5_p = $_POST['bu5_p'];
      $bu5_c = $_POST['bu5_c'];
      $bu6_p = $_POST['bu6_p'];
      $bu6_c = $_POST['bu6_c'];
      $lu1 = $_POST['lu1'];
      $lu2 = $_POST['lu2'];
      $lu3 = $_POST['lu3'];
      $lu4 = $_POST['lu4'];
      $lu5 = $_POST['lu5'];
      $lu6 = $_POST['lu6'];
      $lu7 = $_POST['lu7'];
      $lu8 = $_POST['lu8'];
      $lu9 = $_POST['lu9'];
      $lu10 = $_POST['lu10'];
      $extra_p = $_POST['extra_p'];
      $extra_c = $_POST['extra_c'];
      $late_p = $_POST['late_p'];
      $late_c = $_POST['late_c'];
      $plag_p = $_POST['plag_p'];
      $plag_c = $_POST['plag_c'];
      $done = $_POST['done'];
      $cool = $_POST['cool'];
      echo 'lu1: ' . $lu1;
      $res = mysqli_query($connection, "UPDATE ui_t3_142766_work (due_date, student1_id, student2_id, url, bu1_p, bu1_c, bu2_p, bu2_c, bu3_p, bu3_c, bu4_p, bu4_c, bu5_p, bu5_c, bu6_p, bu6_c, lu1, lu2, lu3, lu4, lu5, lu6, lu7, lu8, lu9, lu10, extra_p, extra_c, late_p, late_c, plag_p, plag_c, done, cool) VALUES ('$due_date', '$student1_id', '$student2_id', '$url', '$bu1_p', '$bu1_c', '$bu2_p', '$bu2_c', '$bu3_p', '$bu3_c', '$bu4_p', '$bu4_c', '$bu4_p', '$bu5_c', '$bu6_p', '$bu6_c', '$lu1', '$lu2', '$lu3', '$lu4', '$lu5', '$lu6', '$lu7', '$lu8', '$lu9', '$lu10', '$extra_p', '$extra_c', '$late_p', '$late_c', '$plag_p', '$plag_c', '$done', '$cool') WHERE id='$id'");
      if ($res) {
          echo 'RES:' . $res;
        } else {
          echo 'ERROR' . mysqli_error($connection);
        }
    /*} else {
      $student_code = $_POST['student_code'];
      $name = $_POST['name'];
      $student_group = $_POST['student_group'];
      echo "code: " . $student_code . ", name: " . $name . ", group: " . $student_group;
      $sql = "INSERT INTO ui_t3_142766_students (student_code, name, student_group) VALUES ('$student_code', '$name', '$student_group')";
      $res = mysqli_query($connection, $sql);
      if ($res) {
        echo 'RES:' . $res;
      } else {
        echo 'ERROR' . mysqli_error($connection);
      }
  }*/
?>
