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
    this.outsideInput.remove();
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
    else if (this.inputElement) this.setSyncAttrs(name, newValue);
  }

  setSyncAttrs(name, value) {
    this.inputElement.setAttribute(name, value);
    if (name !== "id") this.outsideInput.setAttribute(name, value);
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.innerHTML = template;

    this.outsideInput = document.createElement("input");
    this.outsideInput.type = "hidden";
    this.parentNode.insertBefore(this.outsideInput, this.nextSibling);

    this.inputElement = rootDiv.querySelector("input");
    for (const attr of this.attributes) {
      this.setSyncAttrs(attr.name, attr.value);
    }
    this.shadowRoot.appendChild(rootDiv);

    // Styles
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this.shadowRoot.appendChild(styleElement);

    this.updateInputValue(this.getAttribute("value") || "0");
  }

  forwardEvent(type) {
    this.inputElement.addEventListener(type, (e) => {
      const newHue = e.currentTarget.valueAsNumber;
      this.updateInputValue(newHue);
      this.dispatchEvent(
        new CustomEvent(type, {
          detail: newHue,
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  attachEventHandlers() {
    this.forwardEvent("input");
    this.forwardEvent("change");
  }

  updateInputValue(newHue) {
    if (!this.inputElement || !this.outsideInput) return;
    if (this.outsideInput.value !== newHue) {
      this.outsideInput.value = newHue;
      this.inputElement.style.setProperty("--hue", newHue);
      this.setAttribute("value", newHue);
    }
  }
}

// Register custom element
customElements.define("hue-picker", HuePicker);
