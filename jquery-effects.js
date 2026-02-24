$(window).scroll(function(){

$(".reveal").each(function(){

let top=$(this).offset().top;
let scroll=$(window).scrollTop();
let height=$(window).height();

if(scroll > top - height + 100){
$(this).addClass("active");
}

});

});