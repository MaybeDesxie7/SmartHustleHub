<?php
header("Content-Type: application/json");
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);
$question = strtolower(trim($data['message']));
$reply = "";

// Simple AI simulation
if (str_contains($question, 'hello') || str_contains($question, 'hi')) {
  $reply = "Hello! How can I assist you today?";
} elseif (str_contains($question, 'help')) {
  $reply = "Sure! You can ask me about services, account info, or technical support.";
} elseif (str_contains($question, 'price') || str_contains($question, 'cost')) {
  $reply = "Pricing depends on the service. Can you specify what you're interested in?";
} else {
  $reply = "I'm here to help. Please be more specific or try rephrasing.";
}

echo json_encode(["status" => "success", "reply" => $reply]);
