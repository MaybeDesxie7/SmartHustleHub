<?php
header("Content-Type: application/json");
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$sender = $conn->real_escape_string($data['sender']);
$message = $conn->real_escape_string($data['message']);
$room = isset($data['room']) ? $conn->real_escape_string($data['room']) : null;
$receiver = isset($data['receiver']) ? $conn->real_escape_string($data['receiver']) : null;

if ($receiver) {
  $sql = "INSERT INTO messages (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')";
} else {
  $sql = "INSERT INTO messages (sender, message, room) VALUES ('$sender', '$message', '$room')";
}

if ($conn->query($sql)) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
