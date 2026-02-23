console.log("Register JS Connected");

const registerForm = document.getElementById("registerForm");

function updateWishlistCount(){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let countElement = document.getElementById("wishlistCount");

    if(countElement){
        countElement.textContent = wishlist.length;
    }
}
updateWishlistCount();

// ✅ PASSWORD STRENGTH VALIDATION FUNCTION
function isStrongPassword(pwd) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/;
  return regex.test(pwd);
}

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

    // ✅ CHECK PASSWORD STRENGTH
    if (!isStrongPassword(password)) {
      message.style.color = "red";
      message.innerText = "Weak password! Use 8+ chars, uppercase, number & symbol (e.g., @$!%*)";
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

  loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const role = document.getElementById("role").value;

    const adminEmail = "admin@questvoyage.com";
    const adminPassword = "admin123";

    if(role === "admin"){

        if(email === adminEmail && password === adminPassword){
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin-dashboard.html";
        } else{
            alert("Invalid Admin Credentials");
        }

    } 
    else if(role === "user"){

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let validUser = users.find(user => 
            user.email === email && user.password === password
        );

        if(validUser){
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("currentUser", email);
            window.location.href = "new.html";
        } else{
            alert("Invalid User Credentials");
        }
    }
    else{
        alert("Please select a role");
    }
  });
}