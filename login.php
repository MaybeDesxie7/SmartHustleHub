<?php
session_start();
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("localhost", "root", "", "smarthustle");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = htmlspecialchars($_POST["email"]);
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['fullname'];
            header("Location: dashboard.php");
            exit();
        } else {
            $error = "Incorrect password.";
        }
    } else {
        $error = "No account found with that email.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login - Smart Hustle Hub</title>
    <style>
        body { font-family: Arial; background: #f0f2f5; padding: 40px; }
        .form-box { max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 10px; }
        input { width: 100%; padding: 10px; margin-top: 10px; }
        button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; margin-top: 15px; }
        .error { color: red; }
    </style>
</head>
<body>

<div class="form-box">
    <h2>Login</h2>
    <form method="POST" action="">
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Your Password" required>
        <button type="submit">Login</button>
    </form>
    <?php if ($error) echo "<p class='error'>$error</p>"; ?>
    <p style="margin-top:10px;">Don't have an account? <a href="signup.php">Signup here</a></p>
</div>

</body>
</html>
