document.querySelector("#contact").addEventListener("submit", function(event) {
  event.preventDefault();

  const storedPassword = localStorage.getItem("masterPassword");
  const email = document.querySelector("#email-input").value;
  const password = document.querySelector("#password-input").value;

  if (storedPassword === null) {
    // Set default password and redirect to homepage
    const defaultPassword = "password";
    localStorage.setItem("masterPassword", defaultPassword);
    console.log(storedPassword);
    window.location.href = "homepage.html";
  } else if (password === storedPassword) {
    // Password matches stored password, proceed with login
    window.location.href = "homepage.html";
  } else {
    // Password does not match stored password, handle accordingly
    alert("Invalid email or password. Please try again.");
  }
});


// The code first retrieves the stored master password from the local storage using the key "masterPassword". If the master password has not been set, the code sets a default password and redirects to the homepage.

// If the master password has been set, the code compares the input password with the stored password. If they match, the code redirects to the homepage. If they do not match, the code displays an alert message indicating that the email or password is invalid and prompts the user to try again.
