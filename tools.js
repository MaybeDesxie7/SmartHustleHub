// Show current date
document.getElementById("time").textContent = new Date().toDateString();

// Password Generator Logic
function generatePassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    password += charset[randIndex];
  }
  document.getElementById("passwordOutput").value = password;
}

// Color Picker Logic
const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");

colorPicker.addEventListener("input", () => {
  colorCode.value = colorPicker.value.toUpperCase();
});
