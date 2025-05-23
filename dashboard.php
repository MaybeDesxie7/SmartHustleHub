<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Hustle Hub - Dashboard</title>
  <link rel="stylesheet" href="dashboard.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">Smart Hustle Hub</div>
      <nav>
        <a href="dashboard.html" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
        <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
        <a href="services.html"><i class="fas fa-briefcase"></i> My Services</a>
        <a href="messages.html"><i class="fas fa-envelope"></i> Messages</a>
        <a href="tools.html"><i class="fas fa-tools"></i> Tools</a>
        <a href="ebooks.html"><i class="fas fa-book"></i> Ebooks</a>
        <a href="tutorials.html"><i class="fas fa-chalkboard-teacher"></i> Tutorials</a>
        <a href="offers.html"><i class="fas fa-gift"></i> Offers</a>
        <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
        <a href="#" id="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
      </nav>
    </aside>

    <main class="main">
      <header>
        <p>Welcome, <?php echo $_SESSION['user']; ?>!</p>
        <a href="logout.php">Logout</a>
        <!--<h1 id="greeting">Welcome, Hustler!</h1>-->
        <div class="time" id="currentTime"></div>
      </header>

      <section class="cards">
        <div class="card">
          <i class="fas fa-chart-line"></i>
          <h2>Daily Views</h2>
          <p>1,254</p>
        </div>
        <div class="card">
          <i class="fas fa-bolt"></i>
          <h2>Tools Used</h2>
          <p>5 Today</p>
        </div>
        <div class="card">
          <i class="fas fa-book-reader"></i>
          <h2>Tutorials Watched</h2>
          <p>2 This Week</p>
        </div>
        <div class="card">
          <i class="fas fa-coins"></i>
          <h2>Offers Redeemed</h2>
          <p>3</p>
        </div>
        <div class="card progress-tracker">
          <i class="fas fa-calendar-check"></i>
          <h2>Your Daily Hustle</h2>
          <p>Tasks Completed: 3/5</p>
          <progress value="3" max="5"></progress>
        </div>
      </section>

      <section class="daily-tip">
        <h2>🔥 Daily Hustle Tip</h2>
        <p>"You don't need more time in your day. You just need to decide." – Seth Godin</p>
      </section>

      <section class="progress-section">
        <h2>🎯 Weekly Progress</h2>
        <canvas id="progressChart"></canvas>
      </section>

      <section class="announcements">
        <h2>📢 Latest Announcements</h2>
        <ul>
          <li>New ebook just dropped: "100 Growth Hacks for 2025"</li>
          <li>Referral rewards doubled for this week!</li>
          <li>Join the Telegram group for insider tools.</li>
        </ul>
      </section>

      <section class="trending-tools">
        <h2>🔥 Trending Tools</h2>
        <ul id="trending-info">
          <li><i class="fas fa-magic"></i> AI Headline Generator</li>
          <li><i class="fas fa-bullhorn"></i> Social Media Captions</li>
          <li><i class="fas fa-paint-brush"></i> Logo Generator</li>
          <li><i class="fas fa-chart-line"></i> Business Name Finder</li>
        </ul>
      </section>

      <section class="featured">
        <h2>🌟 Featured Tool</h2>
        <div class="card">
          <i class="fas fa-rocket"></i>
          <h2>AI Headline Generator</h2>
          <p>Boost clicks with high-converting headlines instantly.</p>
          <button class="use-tool">Try It Now</button>
        </div>
      </section>

      <section class="premium-preview">
        <h2>🔒 Premium Features (Upgrade to Unlock)</h2>
        <ul>
          <li><i class="fas fa-rocket"></i> Business Idea Generator <span class="badge">Premium</span></li>
          <li><i class="fas fa-user-secret"></i> 1-on-1 Strategy Chat <span class="badge">Premium</span></li>
          <li><i class="fas fa-lightbulb"></i> Daily Lessons <span class="badge">Premium</span></li>
        </ul>
        <button id="upgrade-btn" class="upgrade-btn">Upgrade to Premium</button>
      </section>

      <div id="premium-modal" class="modal">
        <div class="modal-content">
          <span id="close-modal" class="close-btn">&times;</span>
          <h2>Unlock Premium Features 🚀</h2>
          <p>Get access to advanced tools, early releases, and exclusive support!</p>
          <button class="cta-btn">Upgrade Now</button>
        </div>
      </div>
    </main>
  </div>

  <script src="dashboard.js"></script>
</body>
</html>
