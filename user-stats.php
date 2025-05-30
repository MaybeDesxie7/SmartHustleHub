<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Connect to MySQL
$conn = new mysqli("localhost", "root", "", "smarthustlestats");
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Get the user ID from query
$userId = $_GET['userId'] ?? 0;

// Fetch user stats
$sql = "SELECT * FROM user_stats WHERE user_id = $userId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $stats = $result->fetch_assoc();
    // Format feedbacks into array
    $stats['feedbacks'] = explode(",", $stats['feedbacks']);
    echo json_encode($stats);
} else {
    echo json_encode(["error" => "No stats found"]);
}

$conn->close();
?>
