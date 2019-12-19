<?php
  ob_start();
  session_start();

  $timezone = date_default_timezone_set("America/Kentucky/Louisville");

  $con = mysqli_connect("localhost", "root", "Bl4cksheep", "slotify");

  if(mysqli_connect_errno()) {
    echo "Failed to connect: " . mysqli_connect_errno();
  }
 ?>
