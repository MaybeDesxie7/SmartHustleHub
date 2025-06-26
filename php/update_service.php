<?php
header("Content-Type: application/json");
session_start();
require_once 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["error" => "Invalid request."]);
  exit;
}

$user_id = $_SESSION['user_id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$title = $data['title'] ?? '';
$description = $data['description'] ?? '';
$price = $data['price'] ?? '';
$category = $data['category'] ?? '';

if (!$user_id || !$id || !$title || !$description || !$price || !$category) {
  echo json_encode(["error" => "Missing fields."]);
  exit;
}

try {
  $stmt = $conn->prepare("UPDATE services SET title = ?, description = ?, price = ?, category = ? WHERE id = ? AND user_id = ?");
  $stmt->execute([$title, $description, $price, $category, $id, $user_id]);

  echo json_encode(["message" => "Service updated successfully."]);
} catch (PDOException $e) {
  echo json_encode(["error" => "Failed to update service: " . $e->getMessage()]);
}
?>
