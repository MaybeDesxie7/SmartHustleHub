<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name'], $data['description'], $data['category'], $data['link'])) {
    $stmt = $conn->prepare("INSERT INTO tools (name, description, category, link) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data['name'], $data['description'], $data['category'], $data['link']);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Tool added"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
}
