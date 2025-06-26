<?php
header("Content-Type: application/json");
session_start();

// TEMPORARY FIX: Add a fake user ID for testing
if (!isset($_SESSION['user_id'])) {
  $_SESSION['user_id'] = 1; // This must match an actual user ID in your database
}

require_once 'db_config.php';

// Get data from JS
$data = json_decode(file_get_contents("php://input"), true);

// Get form values
$title = $data['title'] ?? '';
$description = $data['description'] ?? '';
$price = $data['price'] ?? '';
$category = $data['category'] ?? '';
$user_id = $_SESSION['user_id'];

// Check for empty fields
if (!$user_id || !$title || !$description || !$price || !$category) {
  echo json_encode(["error" => "All fields are required."]);
  exit;
}

try {
  $stmt = $conn->prepare("INSERT INTO services (user_id, title, description, price, category) VALUES (?, ?, ?, ?, ?)");
  $stmt->execute([$user_id, $title, $description, $price, $category]);

  echo json_encode(["message" => "Service added successfully!"]);
} catch (PDOException $e) {
  echo json_encode(["error" => "Failed to add service: " . $e->getMessage()]);
}
?>
