<?php
$host = 'localhost';
$dbname = 'smart_hustle_db'; // Replace this with your real DB name
$username = 'root';
$password = 'mysql'; // Default for AMPPS

try {
  $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}
?>
