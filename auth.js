console.log("Register JS Connected");

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
console.log("Form Submitted");

    let name = document.getElementById("regName").value.trim();
    let phone = document.getElementById("regPhone").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value.trim();
    let confirmPassword = document.getElementById("regConfirmPassword").value.trim();
    let message = document.getElementById("registerMessage");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (password !== confirmPassword) {
      message.style.color = "red";
      message.innerText = "Passwords do not match!";
      return;
    }

    
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
      message.style.color = "red";
      message.innerText = "User already registered!";
      return;
    }

    
    users.push({
      name: name,
      phone: phone,
      email: email,
      password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.innerText = "Registration successful! Redirecting to login...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
      message.style.color = "red";
      message.innerText = "Not registered yet. Please register first.";
      return;
    }

    let user = users.find(user => user.email === email);

    if (!user) {
      message.style.color = "red";
      message.innerText = "Not registered yet. Please register first.";
    }
    else if (user.password !== password) {
      message.style.color = "red";
      message.innerText = "Incorrect password.";
    }
    else {
      message.style.color = "green";
      message.innerText = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "new.html"; 
      }, 1500);
    }
  });
}
