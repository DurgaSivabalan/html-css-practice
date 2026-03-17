function loadProfile(){

const currentUser =
localStorage.getItem("currentUser");

if(!currentUser) return;

const users =
JSON.parse(localStorage.getItem("users")) || [];

const user =
users.find(u=>u.email===currentUser);

if(user){
$("#profileName").text(user.name);
$("#profileEmail").text(user.email);
$("#profilePhone").text(user.phone);
}

const bookings =
JSON.parse(
localStorage.getItem("booking_"+currentUser)
)||[];

let html="";

bookings.slice(-3).forEach(b=>{
html+=`<p>✈ ${b.package} - ₹${b.total}</p>`;
});

$("#profileBookings").html(
html || "No bookings yet"
);

}

loadProfile();

function logoutUser(){
localStorage.removeItem("currentUser");
localStorage.removeItem("userLoggedIn");
window.location.href="login.html";
}

$(document).ready(function(){

$("#profileToggle").click(function(e){
e.stopPropagation();
$("#profileBox").fadeToggle();
});

$(document).click(function(){
$("#profileBox").fadeOut();
});

});