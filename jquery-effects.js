
$(document).ready(function(){

$("#profileToggle").click(function(e){
e.stopPropagation();
$("#profileBox").fadeToggle();
});

$(document).click(function(){
$("#profileBox").fadeOut();
});

$("#bookingPopup").fadeIn(400);

setTimeout(function(){

$("#bookingPopup").fadeOut(3000);
window.location.href="invoice.html";

},2000);
}



});

