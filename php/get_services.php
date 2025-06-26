<?php
header("Content-Type: application/json");
session_start();
require_once 'db_config.php';

$user_id = $_SESSION['user_id'] ?? 0;

try {
  $stmt = $conn->query("SELECT id, title, description, price, category, user_id FROM services ORDER BY created_at DESC");
  $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach ($services as &$service) {
    $service['owned'] = $service['user_id'] == $user_id;
  }

  echo json_encode($services);
} catch (PDOException $e) {
  echo json_encode(["error" => "Failed to fetch services: " . $e->getMessage()]);
}
?>
