$("#load").click(function(){

$.ajax({

url:"data.json",
method:"GET",

success:function(data){

data.forEach(user=>{

$("#result").append(
"<p>"+user.name+"</p>"
);

});

}

});

});