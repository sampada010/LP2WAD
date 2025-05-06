function showForm(type) {
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  if (type === "register") {
    document.getElementById("registerForm").classList.remove("hidden");
  } else {
    document.getElementById("loginForm").classList.remove("hidden");
  }
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    dob: document.getElementById("dob").value,
    city: document.getElementById("city").value.trim(),
    address: document.getElementById("address").value.trim(),
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value.trim()
  };

  if (!user.email.includes("@") || user.mobile.length !== 10 || user.password.length < 6) {
    alert("Please fill all fields correctly.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(u => u.username === user.username);
  if (exists) {
    alert("Username already exists!");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  this.reset();
  showForm("login");

  // ---- AJAX POST for Registration ----
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/register", true); // Assuming you have /register endpoint
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("Registration AJAX Response:", xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(user));
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const match = users.find(u => u.username === username && u.password === password);
  if (match) {
    alert("Login successful!");
    window.location.href = "users.html";
  } else {
    alert("Invalid username or password.");
  }

  // ---- AJAX POST for Login ----
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true); // Assuming you have /login endpoint
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("Login AJAX Response:", xhr.responseText);
    }
  };
  xhr.send(JSON.stringify({ username, password }));
});
