<?php
require_once '../db.php';

$category = $_GET['category'] ?? 'all';
$sql = ($category !== 'all') ? 
    "SELECT * FROM tools WHERE category = ?" :
    "SELECT * FROM tools";

$stmt = $conn->prepare($sql);
if ($category !== 'all') {
    $stmt->bind_param("s", $category);
}

$stmt->execute();
$result = $stmt->get_result();
$tools = [];

while ($row = $result->fetch_assoc()) {
    $tools[] = $row;
}

echo json_encode(["status" => "success", "tools" => $tools]);
