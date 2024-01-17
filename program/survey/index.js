let sendButton = document.querySelector('button');

function send() {
  let name = document.querySelector('#nameValue').value;
  let phone = document.querySelector('#phoneValue').value;
  let demand = document.querySelector('#demandValue').value;
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbydYqAH1pkK9J_4G_R2mjIvyA0fz7-OTlgNnB3F7pBSt2jKgazdwtxdwToGrKosP2TDNQ/exec",
    data: {
      "name": name,
      "phone": phone,
      "demand": demand
    },
    success: function (response) {
      if (response == "成功") {
        alert("成功");
      }
    },
  });
};

sendButton.addEventListener('click', send);
