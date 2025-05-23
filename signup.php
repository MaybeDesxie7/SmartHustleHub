<?php
$success = $error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("localhost", "root", "", "smarthustle");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $fullname = htmlspecialchars($_POST['fullname']);
    $email = htmlspecialchars($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $fullname, $email, $password);

    if ($stmt->execute()) {
        $_SESSION['user'] = $fullname;
         header("Location: dashboard.php");
          exit();

    } else {
        $error = "Signup failed. Email might already exist.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Signup - Smart Hustle Hub</title>
    <style>
        body { font-family: Arial; background: #f0f2f5; padding: 40px; }
        .form-box { max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 10px; }
        input { width: 100%; padding: 10px; margin-top: 10px; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; margin-top: 15px; }
        .message { color: green; }
        .error { color: red; }
    </style>
</head>
<body>

<div class="form-box">
    <h2>Create an Account</h2>
    <form method="POST" action="">
        <input type="text" name="fullname" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Create Password" required>
        <button type="submit">Signup</button>
    </form>
    <?php
    if ($success) echo "<p class='message'>$success</p>";
    if ($error) echo "<p class='error'>$error</p>";
    ?>
    <p style="margin-top:10px;">Already have an account? <a href="login.php">Login here</a></p>
</div>

</body>
</html>
