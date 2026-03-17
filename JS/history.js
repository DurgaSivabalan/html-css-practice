const currentUser =
localStorage.getItem("currentUser");

const container =
document.getElementById("historyContainer");


function loadBookingHistory(){

const bookings =
JSON.parse(
localStorage.getItem("booking_"+currentUser)
) || [];

container.innerHTML="";


if(bookings.length===0){
container.innerHTML=
"<p style='color:red;text-align:center'>No Bookings Yet</p>";
return;
}

bookings.forEach(b=>{

container.innerHTML+=`
<div class="card">
<p><b>ID:</b> ${b.bookingId}</p>
<p><b>Package:</b> ${b.package}</p>
<p><b>Name:</b> ${b.name}</p>
<p><b>Members:</b> ${b.members}</p>
<p><b>Departure:</b> ${b.departureDate}</p>
<p><b>Arrival:</b> ${b.arrivalDate}</p>     
<p><b>Total:</b> ₹${b.total}</p>
</div>
`;

});

}


loadBookingHistory();



window.addEventListener("storage",function(){
loadBookingHistory();
});