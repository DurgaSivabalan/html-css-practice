
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".newsletter-form");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");

    const message = document.createElement("p");
    message.style.marginTop = "10px";
    form.appendChild(message);

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name === "" || email === "") {
            showMessage("Please fill all fields!", "red");
            return;
        }

        if (!validateEmail(email)) {
            showMessage("Please enter a valid email address!", "red");
            return;
        }

        let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

        const alreadySubscribed = subscribers.some(sub => sub.email === email);

        if (alreadySubscribed) {
            showMessage("You are already subscribed!", "orange");
            return;
        }

        subscribers.push({ name: name, email: email });
        localStorage.setItem("subscribers", JSON.stringify(subscribers));

        showMessage("🎉 Successfully subscribed!", "green");

        nameInput.value = "";
        emailInput.value = "";
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
    }

});
