<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['name'], $data['description'], $data['category'], $data['link'])) {
    $stmt = $conn->prepare("UPDATE tools SET name = ?, description = ?, category = ?, link = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $data['name'], $data['description'], $data['category'], $data['link'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Tool updated"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
}
