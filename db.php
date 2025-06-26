<?php
$host = 'localhost';
$db = 'smart_hustle_db';
$user = 'root';
$pass = 'mysql';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
