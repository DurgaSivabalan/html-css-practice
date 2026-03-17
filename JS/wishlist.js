$(document).ready(function(){

const currentUser = localStorage.getItem("currentUser");

if(!currentUser){
alert("Login First");
window.location.href="login.html";
return;
}

let wishlist =
JSON.parse(localStorage.getItem(
"wishlist_"+currentUser
)) || [];

const container=$("#wishlistContainer");

function renderWishlist(){

container.empty();

if(wishlist.length===0){
container.html("<p class='empty'>Wishlist Empty</p>");
return;
}

wishlist.forEach(function(item){

container.append(`
<div class="card">
<h3>${item.name}</h3>
<p class="price">₹${item.price}</p>

<div class="btn-group">
<button class="remove" data-id="${item.id}">
Remove
</button>

<button class="book" data-id="${item.id}">
Book Trip
</button>
</div>
</div>
`);

});

}

/* REMOVE */
$(document).on("click",".remove",function(){

const id=Number($(this).data("id"));

wishlist=wishlist.filter(item=>item.id!==id);

localStorage.setItem(
"wishlist_"+currentUser,
JSON.stringify(wishlist)
);

renderWishlist();

});

/* BOOK */
$(document).on("click",".book",function(){

const id=Number($(this).data("id"));

const selectedPackage=
wishlist.find(item=>item.id===id);

localStorage.setItem(
"selectedPackage",
JSON.stringify(selectedPackage)
);

window.location.href="book.html";

});

renderWishlist();

});
   