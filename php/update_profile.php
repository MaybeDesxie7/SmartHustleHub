<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "mysql";
$db = "smart_hustle_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$address = $_POST['address'] ?? '';
$id = 1;

$avatarFileName = null;
if (!empty($_FILES['avatar']['name'])) {
  $uploadDir = "../uploads/";
  $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
  $avatarFileName = "avatar_" . $id . "_" . time() . "." . $ext;
  $targetPath = $uploadDir . $avatarFileName;

  if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $targetPath)) {
    echo json_encode(["error" => "Failed to upload image."]);
    exit;
  }
}

$result = $conn->query("SELECT id FROM profiles WHERE id = $id");
if ($result && $result->num_rows > 0) {
  if ($avatarFileName) {
    $stmt = $conn->prepare("UPDATE profiles SET name=?, email=?, phone=?, address=?, avatar=? WHERE id=?");
    $stmt->bind_param("sssssi", $name, $email, $phone, $address, $avatarFileName, $id);
  } else {
    $stmt = $conn->prepare("UPDATE profiles SET name=?, email=?, phone=?, address=? WHERE id=?");
    $stmt->bind_param("ssssi", $name, $email, $phone, $address, $id);
  }
} else {
  $stmt = $conn->prepare("INSERT INTO profiles (id, name, email, phone, address, avatar) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("isssss", $id, $name, $email, $phone, $address, $avatarFileName);
}

if ($stmt->execute()) {
  echo json_encode(["message" => "Hi $name, your profile was updated!"]);
} else {
  echo json_encode(["error" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
