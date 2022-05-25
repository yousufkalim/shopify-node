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

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);
  const cloned_response = response.clone();
  const { pathname, host } = new URL(cloned_response.url);

  if (pathname === "/cart.js") {
    /* work with the cloned response in a separate promise
       chain -- could use the same chain with `await`. */
    let epm = localStorage.getItem("epm");
    epm = JSON.parse(epm);
    cloned_response
      .json()
      .then(async (body) => {
        body.email = epm.email;
        body.host = host;
        body.items = JSON.stringify(body.items);

        const urlencoded = new URLSearchParams();
        for (const property in body) {
          urlencoded.append(property, body[property]);
        }

        await fetch("https://b484-39-59-44-110.ngrok.io/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
          },
          body: urlencoded,
        });
      })
      .catch((err) => console.error(err));
  }

  /* the original response can be resolved unmodified: */
  //return response;

  /* or mock the response: */
  return response;
};
