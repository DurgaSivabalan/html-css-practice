console.log("Auth JS Connected");

document.addEventListener("DOMContentLoaded", function () {

function updateWishlistCount(){

const currentUser =
localStorage.getItem("currentUser");

if(!currentUser) return;

const wishlist =
JSON.parse(
localStorage.getItem(
"wishlist_" + currentUser
)
) || [];

const countElement =
document.getElementById("wishlistCount");

if(countElement){
countElement.textContent =
wishlist.length;
}
}

updateWishlistCount();



function isStrongPassword(pwd){
const regex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/;
return regex.test(pwd);
}

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();

const name =
document.getElementById("regName").value.trim();

const phone =
document.getElementById("regPhone").value.trim();

const email =
document.getElementById("regEmail").value.trim();

const password =
document.getElementById("regPassword").value.trim();

const confirmPassword =
document.getElementById("regConfirmPassword").value.trim();

const message =
document.getElementById("registerMessage");

let users =
JSON.parse(localStorage.getItem("users")) || [];


if(password !== confirmPassword){
message.style.color="red";
message.innerText="Passwords do not match!";
return;
}

if(!isStrongPassword(password)){
message.style.color="red";
message.innerText=
"Password must contain uppercase, number & symbol";
return;
}

const existingUser =
users.find(user => user.email===email);

if(existingUser){
message.style.color="red";
message.innerText="User already exists!";
return;
}

users.push({
name,
phone,
email,
password
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

message.style.color="green";
message.innerText=
"Registration Successful ✅ Redirecting...";

setTimeout(()=>{
window.location.href="login.html";
},1500);

});

}

const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){
    
e.preventDefault();

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value.trim();

const role =
document.getElementById("role").value;


if(role==="admin"){

if(
email==="admin@questvoyage.com" &&
password==="admin123"
){
localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href=
"admin-dashboard.html";
}
else{
alert("Invalid Admin Credentials");
}

return;
}


if(role==="user"){

let users =
JSON.parse(localStorage.getItem("users")) || [];

const validUser =
users.find(user =>
user.email===email &&
user.password===password
);

if(validUser){

localStorage.setItem(
"currentUser",
email
);

alert("Login Successful ✅");

window.location.href="new.html";

}else{
alert("Invalid User Credentials");
}

return;
}

alert("Please select role");

});

}



window.logoutUser=function(){

localStorage.removeItem("currentUser");
localStorage.removeItem("adminLoggedIn");

window.location.href="login.html";

};



window.addEventListener(
"storage",
updateWishlistCount
);

});