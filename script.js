let cart = [];

function addItem(name, price) {
  cart.push({ name, price });
  updateCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateCart() {
  const tbody = document.querySelector("#cartTable tbody");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById("totalAmount").textContent = total;
}

// Send Email with EmailJS
function sendEmail() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const totalAmount = document.getElementById("totalAmount").textContent;

  if (!fullName || !email || !phone) {
    alert("Please fill all fields before booking.");
    return;
  }

  const serviceList = cart.map(item => `${item.name} (₹${item.price})`).join(", ");

  const params = {
    from_name: fullName,
    from_email: email,
    phone: phone,
    services: serviceList,
    total: totalAmount
  };

  emailjs.send("service_nhieuqs", "template_c7dkr2k", params)
    .then(function(response) {
      document.getElementById("confirmationMsg").style.display = "block";
      document.getElementById("confirmationMsg").textContent = 
        "Thank you For Booking the Service. We will get back to you soon!";
    }, function(error) {
      alert("Failed to send email. Please try again.");
      console.error(error);
    });
}
