<?php
session_start();
session_destroy(); // Clear all session data

// Optional: clear cookies
setcookie(session_name(), '', time() - 3600, '/');

header("Location: login.php"); // Redirect to login page
exit();
?>
