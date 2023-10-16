import style from "./style.css?text";
import template from "./template";

export class HuePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.observer = new MutationObserver(
      this.handleAttributeChanges.bind(this)
    );
    this.observer.observe(this, { attributes: true });

    this.render();
    this.attachEventHandlers();
  }
  disconnectedCallback() {
    // Stop observing
    this.observer.disconnect();
  }

  handleAttributeChanges(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        const name = mutation.attributeName;
        const value = this.getAttribute(name);
        // Now you can handle each attribute generically or delegate to specific handlers
        this.handleAttributeChange(name, value);
      }
    }
  }

  handleAttributeChange(name, newValue) {
    if (name === "value") this.updateInputValue(newValue);
    else if (this.inputElement) this.inputElement.setAttribute(name, newValue);
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.innerHTML = template;

    this.inputElement = rootDiv.querySelector("input");
    for (const attr of this.attributes) {
      this.inputElement.setAttribute(attr.name, attr.value);
    }
    this.shadowRoot.appendChild(rootDiv);

    // Styles
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this.shadowRoot.appendChild(styleElement);

    this.updateInputValue(this.getAttribute("value") || "0");
  }

  attachEventHandlers() {
    this.inputElement.addEventListener("input", (e) => {
      const newHue = e.target.value;
      this.updateInputValue(newHue);
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: newHue,
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  updateInputValue(newHue) {
    if (!this.inputElement) return;
    this.inputElement.value = newHue;
    this.inputElement.style.setProperty("--hue", newHue);
  }
}

// Register custom element
customElements.define("hue-picker", HuePicker);
