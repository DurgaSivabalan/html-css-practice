let packages = [];


fetch("../packages.json")
.then(res => res.json())
.then(data=>{
packages = data;
displayPackages(packages);
})
.catch(err=>{
console.log("JSON NOT LOADED",err);
});


function displayPackages(data){

const container =
document.getElementById("packageContainer");

container.innerHTML="";

data.forEach(pkg=>{

container.innerHTML += `
<div class="card">

<h3>${pkg.name}</h3>
<p class="price">₹${pkg.price}</p>
<p>${pkg.type}</p>
<p>${pkg.duration} Days</p>

<div class="button-group">

<button class="wishlist-btn"
onclick="addToWishlist(${pkg.id})">
 Wishlist
</button>

<button class="book-btn"
onclick="bookPackage(${pkg.id})">
Book
</button>

</div>

</div>`;
});
}


function filterPackages(){

const price =
document.getElementById("priceFilter").value;

const type =
document.getElementById("typeFilter").value;

const duration =
document.getElementById("durationFilter").value;
const filtered =
packages.filter(pkg=>{

let priceMatch =
price==="all" ||
(price==="low" && pkg.price<20000) || 
(price==="mid" && pkg.price<=40000 && pkg.price>=20000) ||
(price==="high" && pkg.price>40000);

let typeMatch =
type==="all" ||
pkg.type.toLowerCase()===type;

let durationMatch =
price==="all" ||
(price==="low" && pkg.duration<=2) || 
(price==="mid" && pkg.duration<=5 && pkg.duration>=3) ||
(price==="high" && pkg.duration>5);

return priceMatch && typeMatch && durationMatch;

});

displayPackages(filtered);
}


function addToWishlist(id){

const currentUser =
localStorage.getItem("currentUser");

if(!currentUser){
alert("Login First");
return;
}

const pkg =
packages.find(p => p.id === id);

if(!pkg){
alert("Package not found");
return;
}

let wishlist =
JSON.parse(
localStorage.getItem(
"wishlist_" + currentUser
)
) || [];

if(wishlist.some(item => item.id === id)){
alert("Already in Wishlist");
return;
}

wishlist.push(pkg);

localStorage.setItem(
"wishlist_" + currentUser,
JSON.stringify(wishlist)
);

console.log("Saved Wishlist:", wishlist);

alert("Added to Wishlist ");
}

function bookPackage(id){

const selectedPackage =
packages.find(p => p.id === id);

localStorage.setItem(
"selectedPackage",
JSON.stringify(selectedPackage)
);

window.location.href = "book.html";
}
