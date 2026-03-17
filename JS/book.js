     const priceList = {
        "Goa Trip": 15000,
        "Manali Tour": 35000,
        "Mumbai Explorer": 25000,
        "Kerala Backwaters": 38000,
        "Ooty Hills": 22000,
        "Kashmir Paradise": 45000,
        "Shimla Retreat": 32000,
        "Darjeeling Delight": 34000,
        "Andaman Escape": 41000,
        "Pondicherry Relax": 17000,
        "Jaipur Heritage": 21000,
        "Hyderabad City Tour": 16000,
        "Ladakh Adventure": 55000,
        "Coorg Nature Stay": 28000,
        "Mysore Palace Tour": 19000,
        "Rishikesh River Camp": 24000,
        "Varanasi Spiritual Trip": 20000,
        "Udaipur Lake View": 30000,
        "Sikkim Snow Journey": 42000,
        "Meghalaya Explorer": 39000,
      };

      const pkg = document.getElementById("packageName");
      const adults = document.getElementById("adults");
      const children = document.getElementById("children");
      const totalPrice = document.getElementById("totalPrice");

      function calculatePrice() {
        const price = priceList[pkg.value] || 0;
        const members =
          (Number(adults.value) || 0) + (Number(children.value) || 0);

        totalPrice.textContent = price * members;
      }

      pkg.onchange = calculatePrice;
      adults.oninput = calculatePrice;
      children.oninput = calculatePrice;

      calculatePrice();


      document
        .getElementById("addTravellersBtn")
        .addEventListener("click", function () {
          const container = document.getElementById("travellersContainer");

          container.innerHTML = "";

          const adultCount = parseInt(adults.value) || 0;
          const childCount = parseInt(children.value) || 0;

          for (let i = 1; i <= adultCount; i++) {
          container.innerHTML += `
<div class="traveller-card">
<h3>Adult ${i}</h3>
<div class="traveller-grid">
<input class="adultName" placeholder="Full Name">
<input class="adultAge" type="number" placeholder="Age">
<select class="adultGender">
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>
</div>`;
          }

          for (let i = 1; i <= childCount; i++) {
            container.innerHTML += `
<div class="traveller-card">
<h3>Child ${i}</h3>
<div class="traveller-grid">
<input class="childName" placeholder="Name">
<input class="childAge" type="number" placeholder="Age">
<select class="childGender">
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>
</div>`;
          }
        });


      document
        .getElementById("bookingForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const currentUser = localStorage.getItem("currentUser");

          if (!currentUser) {
            alert("Login First");
            return;
          }

          const travellerDetails = [];

          document.querySelectorAll(".adultName").forEach((name, index) => {
            travellerDetails.push({
              type: "Adult",
              name: name.value,
              age: document.querySelectorAll(".adultAge")[index].value,
              gender: document.querySelectorAll(".adultGender")[index].value,
            });
          });

          document.querySelectorAll(".childName").forEach((name, index) => {
            travellerDetails.push({
              type: "Child",
              name: name.value,
              age: document.querySelectorAll(".childAge")[index].value,
            });
          });

          const bookingData = {
            package: pkg.value,
            name: customerName.value,
            email: currentUser,
            departureDate: departureDate.value,
            arrivalDate: arrivalDate.value,
            members: travellerDetails.length,
            travellers: travellerDetails,
            price: priceList[pkg.value],
            payment: "Pending",
          };

          localStorage.setItem("currentBooking", JSON.stringify(bookingData));

          window.location.href = "summary.html";
        });
        const selectedPackage =
JSON.parse(localStorage.getItem("selectedPackage"));

if(selectedPackage){

document.getElementById("packageName").value =
selectedPackage.name;
}
const departureInput =
document.getElementById("departureDate");

const arrivalInput =
document.getElementById("arrivalDate");

const errorMsg =
document.getElementById("dateError");

function validateDates(){

if(!departureInput.value ||
   !arrivalInput.value){
    errorMsg.style.display="none";
    return true;
}

const departure =
new Date(departureInput.value);

const arrival =
new Date(arrivalInput.value);

if(arrival <= departure){

errorMsg.textContent =
"Arrival date must be after departure date";

errorMsg.style.display="block";
arrivalInput.style.borderColor="red";

return false;
}
else{

errorMsg.style.display="none";
arrivalInput.style.borderColor="#dcdcdc";

return true;
}
}

/* LIVE CHECK */
departureInput.addEventListener(
"change",
validateDates
);

arrivalInput.addEventListener(
"change",
validateDates
);