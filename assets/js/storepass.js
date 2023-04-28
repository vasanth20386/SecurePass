
document.querySelector("#contact").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const newPassword = document.querySelector("#new-password-input").value;
    const confirmPassword = document.querySelector("#confirm-password-input").value;
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    // Save new password to localStorage
    localStorage.setItem("masterPassword", newPassword);
    alert("Password changed successfully.");
  });


  

