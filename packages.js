document.addEventListener("DOMContentLoaded", function () {

    fetch("packages.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("packageContainer");

            data.forEach(pkg => {

                const card = document.createElement("div");
                card.classList.add("package-card");

                card.innerHTML = `
                    <img src="${pkg.image}" alt="${pkg.title}">
                    <div class="package-info">
                        <h3>${pkg.title}</h3>
                        <p>${pkg.duration} | ${pkg.type}</p>
                    </div>
                `;  

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

});
