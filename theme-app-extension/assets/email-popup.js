// Elements
var popup = document.getElementById("epm_container");
var email = document.getElementById("epm_email_input");
var submit_btn = document.getElementById("epm_submit_btn");
var alert_container = document.getElementById("epm_alert");
var alert_txt = document.getElementById("epm_alert_text");
var alert_close = document.getElementById("epm_alert_close");

let epm_temp_cart = localStorage.getItem("epm_temp_cart");
if (epm_temp_cart) {
  setTimeout(() => {
    popup.style.display = "block";
  }, 2000);
}

submit_btn.addEventListener("click", handleSubmit);
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
  let body = localStorage.getItem("epm_temp_cart");
  body = JSON.parse(body);
  body.email = email.value;
  const urlencoded = new URLSearchParams();
  for (const property in body) {
    urlencoded.append(property, body[property]);
  }
  fetch("https://b484-39-59-44-110.ngrok.io/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
    },
    body: urlencoded,
  })
    .then(() => {
      localStorage.removeItem("epm_temp_cart");
      email.value = "";
      alert_container.classList.remove("epm_error");
      alert_container.classList.add("epm_success");
      alert_txt.innerText = "We've got your email";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    })
    .catch(() => {
      alert_container.classList.add("epm_error");
      alert_txt.innerText = "Something went wrong";
    });
}

function handleAlertClose() {
  alert_container.classList.remove("epm_error");
  alert_container.classList.remove("epm_success");
  alert_txt.innerText = "";
}

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);
  const method = args[1]?.method || "GET";
  const cloned_response = response.clone();
  const { pathname, host } = new URL(cloned_response.url);
  let epm = localStorage.getItem("epm");

  if (pathname === "/cart.js") {
    /* work with the cloned response in a separate promise
        chain -- could use the same chain with `await`. */
    epm = JSON.parse(epm);
    cloned_response
      .json()
      .then(async (body) => {
        body.host = host;
        body.items = JSON.stringify(body.items);

        if (epm) {
          body.email = epm.email;
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
        } else {
          localStorage.setItem("epm_temp_cart", JSON.stringify(body));
          popup.style.display = "block";
        }
      })
      .catch((err) => console.error(err));
  }

  /* the original response can be resolved unmodified: */
  //return response;

  /* or mock the response: */
  return response;
};
