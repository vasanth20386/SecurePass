document.querySelector("#contact").addEventListener("submit", function(event) {
  event.preventDefault();

  const newPassword = document.querySelector("#new-password-input").value;
  const confirmPassword = document.querySelector("#confirm-password-input").value;

  // Check if new password meets requirements
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasCapitalLetter = /[A-Z]/.test(newPassword);
  const isLongEnough = newPassword.length >= 8;
  
  if (!hasSpecialChar || !hasNumber || !hasCapitalLetter || !isLongEnough) {
    alert("New password must contain a special character, a number, a capital letter, and be at least 8 characters long. Please try again.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Save new password to localStorage
  localStorage.setItem("masterPassword", newPassword);
  alert("Password changed successfully.");
});
