import style from "./style.css";

export class HuePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEventHandlers();
  }
  static get observedAttributes() {
    return ["hue", "step"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "hue") this.updateInputValue(newValue);
    else if (this.inputElement) this.inputElement.setAttribute(name, newValue);
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("class", "root");

    const svgElement = this.createElementNS("svg");
    svgElement.setAttribute("class", "svg");
    const defsElement = this.createElementNS("defs");
    const linearGradientElement = this.createElementNS("linearGradient");
    linearGradientElement.setAttributeNS(null, "id", "g");
    colorStops.forEach((color, i) => {
      const stopElement = this.createElementNS("stop");
      const offset = (i / colorStops.length) * 100;
      stopElement.setAttributeNS(null, "offset", `${offset}%`);
      stopElement.setAttributeNS(null, "stop-color", color);
      linearGradientElement.appendChild(stopElement);
    });

    const rectElement = this.createElementNS("rect");
    rectElement.setAttributeNS(null, "width", "100%");
    rectElement.setAttributeNS(null, "height", "20");
    rectElement.setAttributeNS(null, "fill", `url(#g)`);

    this.inputElement = document.createElement("input");
    for (const attr of this.attributes) {
      this.inputElement.setAttribute(attr.name, attr.value);
    }
    this.inputElement.setAttribute("class", "range");
    this.inputElement.setAttribute("type", "range");
    this.inputElement.setAttribute("min", "0");
    this.inputElement.setAttribute("max", "360");

    // Structure
    defsElement.appendChild(linearGradientElement);
    svgElement.appendChild(defsElement);
    svgElement.appendChild(rectElement);
    rootDiv.appendChild(svgElement);
    rootDiv.appendChild(this.inputElement);
    this.shadowRoot.appendChild(rootDiv);

    // Styles
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this.shadowRoot.appendChild(styleElement);

    this.updateInputValue(this.getAttribute("hue") || "0");
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

  createElementNS(el) {
    return document.createElementNS("http://www.w3.org/2000/svg", el);
  }
}

const colorStops = [
  "#f8a49e",
  "#f3aa85",
  "#e6b374",
  "#d1be71",
  "#b5c87d",
  "#96cf95",
  "#78d3b1",
  "#66d2ce",
  "#69cee7",
  "#80c7f8",
  "#9dbdff",
  "#bab4fb",
  "#d3abed",
  "#e7a5d6",
  "#f3a3bb",
];

// Register custom element
customElements.define("hue-picker", HuePicker);
