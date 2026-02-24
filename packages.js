$.ajax({
url:"packages.json",
method:"GET",

success:function(data){

data.forEach(pkg=>{
$("#packageContainer").append(`
<div class="card">
<h3>${pkg.name}</h3>
<p>₹${pkg.price}</p>
</div>
`);
});

}
});

