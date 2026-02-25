
$(document).ready(function(){

$("#profileToggle").click(function(e){
e.stopPropagation();
$("#profileBox").fadeToggle();
});

$(document).click(function(){
$("#profileBox").fadeOut();
});

});

