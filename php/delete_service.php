<?php
header("Content-Type: application/json");
session_start();
require_once 'db_config.php';

$user_id = $_SESSION['user_id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;

if (!$user_id || !$id) {
  echo json_encode(["error" => "Unauthorized or missing ID."]);
  exit;
}

try {
  $stmt = $conn->prepare("DELETE FROM services WHERE id = ? AND user_id = ?");
  $stmt->execute([$id, $user_id]);

  echo json_encode(["message" => "Service deleted successfully."]);
} catch (PDOException $e) {
  echo json_encode(["error" => "Failed to delete service: " . $e->getMessage()]);
}
?>
