if(localStorage.getItem("adminLoggedIn")!=="true"){
window.location.href="login.html";
}

function loadDashboard(){

const bookings =
JSON.parse(localStorage.getItem("bookingHistory")) || [];

const users =
JSON.parse(localStorage.getItem("users")) || [];

let totalRevenue = 0;
let totalWishlist = 0;

const table =
document.getElementById("bookingTable");

table.innerHTML="";

bookings.forEach((booking,index)=>{

totalRevenue += booking.total || 0;

table.innerHTML += `
<tr>
<td>${booking.bookingId || "-"}</td>
<td>${booking.email || "-"}</td>
<td>${booking.package || "-"}</td>
<td>${booking.members || 0}</td>
<td>₹${booking.total || 0}</td>

<td>
<select onchange="updateAction(${index},this.value)">
<option ${booking.action==="Pending"?"selected":""}>Pending</option>
<option ${booking.action==="Confirmed"?"selected":""}>Confirmed</option>
<option ${booking.action==="Hold"?"selected":""}>Hold</option>
<option ${booking.action==="Cancelled"?"selected":""}>Cancelled</option>
</select>
</td>

<td>
<select onchange="updateProcess(${index},this.value)">
<option ${booking.process==="Booked"?"selected":""}>Booked</option>
<option ${booking.process==="Visa Processing"?"selected":""}>Visa Processing</option>
<option ${booking.process==="Ticket Issued"?"selected":""}>Ticket Issued</option>
<option ${booking.process==="Departed"?"selected":""}>Departed</option>
<option ${booking.process==="Arrived"?"selected":""}>Arrived</option>
<option ${booking.process==="Completed"?"selected":""}>Completed</option>
</select>
</td>
</tr>
`;
});

document.getElementById("totalBookings").innerText =
bookings.length;

document.getElementById("totalRevenue").innerText =
"₹"+totalRevenue;

users.forEach(user=>{
const list =
JSON.parse(localStorage.getItem(
"wishlist_"+user.email
)) || [];

totalWishlist += list.length;
});

document.getElementById("totalWishlist")
.innerText = totalWishlist;
}

function updateAction(index,value){

let bookings =
JSON.parse(localStorage.getItem("bookingHistory")) || [];

bookings[index].action=value;

localStorage.setItem(
"bookingHistory",
JSON.stringify(bookings)
);

loadDashboard();
}

function updateProcess(index,value){

let bookings =
JSON.parse(localStorage.getItem("bookingHistory")) || [];

bookings[index].process=value;

localStorage.setItem(
"bookingHistory",
JSON.stringify(bookings)
);

loadDashboard();
}

function saveProgress(){

const backup={
bookingHistory:
JSON.parse(localStorage.getItem("bookingHistory"))||[],
users:
JSON.parse(localStorage.getItem("users"))||[],
savedAt:new Date().toLocaleString()
};

localStorage.setItem(
"adminBackup",
JSON.stringify(backup)
);

showMessage("✅ Data Saved");
}

function downloadBackup(){

const backup=
localStorage.getItem("adminBackup");

if(!backup){
alert("No backup found");
return;
}

const blob=
new Blob([backup],
{type:"application/json"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);
link.download="QuestVoyage_Backup.json";
link.click();

showMessage(" Backup Downloaded");
}

function showMessage(text){

const msg=
document.getElementById("saveMessage");

msg.style.display="block";
msg.style.background="#d4edda";
msg.innerText=text;

setTimeout(()=>{
msg.style.display="none";
},3000);
}

document
.getElementById("logoutBtn")
.addEventListener("click",function(){

localStorage.removeItem("adminLoggedIn");

window.location.href="login.html";

});

function clearBookingsOnly(){

const confirmDelete =
confirm("⚠️ Delete ALL BOOKINGS?\nThis cannot be undone.");

if(!confirmDelete) return;


localStorage.removeItem("bookingHistory");


const users =
JSON.parse(localStorage.getItem("users")) || [];

users.forEach(user=>{
localStorage.removeItem("booking_" + user.email);
});


loadDashboard();

alert("✅ All Bookings Cleared Successfully");

}
loadDashboard();