/**
 * All the javascript code that will run on storefront
 * @author Yousuf Kalim
 */

// Indicator
console.log("Abandoned carts extension is loaded");

// Importing elements
var popup = document.getElementById("epm_container");
var email = document.getElementById("epm_email_input");
var submit_btn = document.getElementById("epm_submit_btn");
var alert_container = document.getElementById("epm_alert");
var alert_txt = document.getElementById("epm_alert_text");
var alert_close = document.getElementById("epm_alert_close");

// If there is a temp_cart stored in localStorage, it means user didn't entered it's email when he added a cart
// So then we will show the email popup again
let epm_temp_cart = localStorage.getItem("epm_temp_cart");
if (epm_temp_cart) {
  setTimeout(() => {
    popup.style.display = "block";
  }, 2000);
} // temp cart closed here

// If user click on the email link then we will update cart's status to clicked
let query = new URLSearchParams(window.location.search);
let epm_cart_token = query.get("epm_cart_token");

if (epm_cart_token) {
  fetch(`/apps/epm/api/carts/clicked/${epm_cart_token}`)
    .then(console.log)
    .catch(console.log);
} // cart status ends here

// Handle submit for email popup
submit_btn.addEventListener("click", handleSubmit);
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

  //   Getting the temporary stored cart object from localStorage to create a cart in DB
  let body = localStorage.getItem("epm_temp_cart");
  body = JSON.parse(body);
  body.email = email.value;
  const urlencoded = new URLSearchParams();
  for (const property in body) {
    urlencoded.append(property, body[property]);
  }
  fetch("/apps/epm/api/carts", {
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
      // if cart successfully created then we have to reset some values
      localStorage.removeItem("epm_temp_cart");
      email.value = "";
      alert_container.classList.remove("epm_error");
      alert_container.classList.add("epm_success");
      alert_txt.innerText = "We've got your email";

      //   Popup should be closed after 2 secs
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    })
    .catch(() => {
      alert_container.classList.add("epm_error");
      alert_txt.innerText = "Something went wrong";
    });
}

// Alert close handler
alert_close.addEventListener("click", handleAlertClose);
function handleAlertClose() {
  alert_container.classList.remove("epm_error");
  alert_container.classList.remove("epm_success");
  alert_txt.innerText = "";
}

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);
  const cloned_response = response.clone();
  const { pathname, host } = new URL(cloned_response.url);
  let epm = localStorage.getItem("epm"); // getting the email from DB

  if (pathname === "/cart.js") {
    /* work with the cloned response in a separate promise
        chain -- could use the same chain with `await`. */
    epm = JSON.parse(epm);

    // Calling our api with cart and email appended
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

          await fetch("/apps/epm/api/carts", {
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
          // If user don't have email in localStorage then we have to show email popup
          localStorage.setItem("epm_temp_cart", JSON.stringify(body));
          popup.style.display = "block";
        }
      })
      .catch((err) => console.error(err));
  }

  //   Done
  return response;
};
