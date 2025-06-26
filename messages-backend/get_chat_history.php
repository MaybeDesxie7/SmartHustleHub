<?php
header('Content-Type: application/json');
require_once '../db.php';

$sender = $_GET['sender'] ?? null;
$receiver = $_GET['receiver'] ?? null;
$room = $_GET['room'] ?? null;

if ($room) {
    // Group chat history
    $stmt = $pdo->prepare("SELECT * FROM messages WHERE room = ? ORDER BY sent_at ASC");
    $stmt->execute([$room]);
} elseif ($sender && $receiver) {
    // Private chat history
    $stmt = $pdo->prepare("SELECT * FROM messages 
        WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
        ORDER BY sent_at ASC");
    $stmt->execute([$sender, $receiver, $receiver, $sender]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing room or user data']);
    exit;
}

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['status' => 'success', 'messages' => $messages]);
?>
