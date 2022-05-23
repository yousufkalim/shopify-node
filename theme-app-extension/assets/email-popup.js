class EmailButton extends HTMLButtonElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("click", this.showPopup);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.showPopup);
  }

  showPopup() {
    const el = document.createElement("email-popup");
    document.body.appendChild(el);
  }
}

let emailPopupTemplate = null;
class EmailPopup extends HTMLElement {
  get template() {
    return emailPopupTemplate && emailPopupTemplate.cloneNode(true);
  }
  set template(value) {
    emailPopupTemplate = value;
  }

  constructor() {
    super();
    // If we haven't yet set our template, than we don't want to render this custom element right away,
    // so store its contents and then remove it from the DOM.
    if (this.hasAttribute("init")) this.remove();

    // If the template is contained within the custom element,
    // than its the instance of it that was included in the page response.
    this.template = this.template || this.querySelector("template").content;
  }

  connectedCallback() {
    this.appendChild(this.template);
    this.img && this.appendChild(this.img.cloneNode());
    this.querySelector("[close-button]").addEventListener(
      "click",
      () => this.remove(),
      { once: true }
    );
    document.addEventListener(
      "keydown",
      ({ key }) => key === "Escape" && this.remove(),
      { once: true }
    );
  }
}

customElements.define("email-button", EmailButton, { extends: "button" });
customElements.define("email-popup", EmailPopup);
