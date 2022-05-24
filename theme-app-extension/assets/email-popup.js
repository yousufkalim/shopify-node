// Elements
var popup = document.getElementById("epm_container");
var email = document.getElementById("epm_email_input");
var submit_btn = document.getElementById("epm_submit_btn");
var alert_container = document.getElementById("epm_alert");
var alert_txt = document.getElementById("epm_alert_text");
var alert_close = document.getElementById("epm_alert_close");
var close_btn = document.getElementById("epm_close_btn");

let epm = localStorage.getItem("epm");
if (!epm) {
  setTimeout(() => {
    popup.style.display = "block";
  }, 3000);
}

submit_btn.addEventListener("click", handleSubmit);
close_btn.addEventListener("click", handleClose);
alert_close.addEventListener("click", handleAlertClose);

function handleSubmit() {
  if (!email.value) {
    alert_container.classList.add("epm_error");
    alert_txt.innerText = "Email is not provided";
    return null;
  }

  localStorage.setItem(
    "epm",
    JSON.stringify({
      email: email.value,
    })
  );

  email.value = "";
  alert_container.classList.remove("epm_error");
  alert_container.classList.add("epm_success");
  alert_txt.innerText = "We've got your email";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

function handleAlertClose() {
  alert_container.classList.remove("epm_error");
  alert_container.classList.remove("epm_success");
  alert_txt.innerText = "";
}

function handleClose() {
  popup.style.display = "none";
}
