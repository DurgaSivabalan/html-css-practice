    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(e){
      e.preventDefault(); 

      const fname = document.getElementById("fname").value.trim();
      const lname = document.getElementById("lname").value.trim();
      const email = document.getElementById("email").value.trim();
      const number = document.getElementById("number").value.trim();
      
      const enquiryType = document.querySelector("input[name='enquiryType']:checked")?.value;

      const errorMsg = document.getElementById("errorMessage");
      const successMsg = document.getElementById("successMessage");

    
      if(!fname || !lname || !email || !number || !enquiryType){
        errorMsg.style.display = "block";
        errorMsg.innerText = "! Please fill all fields!";
        successMsg.style.display = "none";
        return;
      }

      if(number.length !== 10){
        errorMsg.innerText = " Phone number must be 10 digits!";
        successMsg.style.display = "none";
        return;
      }

      
      const contactData = {
        id: Date.now(),  
        firstName: fname,
        lastName: lname,
        email: email,
        phone: number,
        enquiry: enquiryType,
        submittedAt: new Date().toLocaleString()
      };

      let contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];

      contacts.push(contactData);

      localStorage.setItem("contactSubmissions", JSON.stringify(contacts));

      errorMsg.style.display = "none";
      successMsg.style.display = "block";
      successMsg.innerText = ` Thank you ${fname}! Your query has been saved. We'll contact you soon.`;

      console.log("Contact saved:", contactData);
      console.log("All contacts:", contacts);

      setTimeout(() => {
        contactForm.reset();
        successMsg.style.display = "none";
      }, 3000);
    });

    function viewAllContacts(){
      const contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
      console.log("All saved contacts:", contacts);
      return contacts;
    }

    function deleteContact(id){
      let contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
      contacts = contacts.filter(contact => contact.id !== id);
      localStorage.setItem("contactSubmissions", JSON.stringify(contacts));
      console.log("Contact deleted. Remaining contacts:", contacts);
    }

    function downloadContacts(){
      const contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
      const dataStr = JSON.stringify(contacts, null, 2);
      const dataBlob = new Blob([dataStr], {type: "application/json"});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Contacts_${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
