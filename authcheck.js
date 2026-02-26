window.history.forward();

const user = localStorage.getItem("currentUser");

if(!user){
    window.location.replace("login.html");
}