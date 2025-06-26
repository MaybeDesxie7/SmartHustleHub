<?php
header("Content-Type: application/json");
require_once '../db.php';

$result = $conn->query("SELECT DISTINCT sender FROM messages WHERE sender != 'You'");
$users = [];

while ($row = $result->fetch_assoc()) {
  $users[] = $row['sender'];
}

echo json_encode(["status" => "success", "users" => $users]);
$conn->close();
