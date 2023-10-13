import style from "./style.css";

export class HuePicker extends HTMLElement {
  constructor() {
    super();
    let hue = this.getAttribute("default-hue") || "0";

    const shadow = this.attachShadow({ mode: "open" });
    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("class", "root");

    const svgElement = createElementNS("svg");
    svgElement.setAttribute("class", "svg");

    const defsElement = createElementNS("defs");
    const linearGradientElement = createElementNS("linearGradient");
    linearGradientElement.setAttributeNS(null, "id", "g");

    colorStops.forEach((color, i) => {
      const stopElement = createElementNS("stop");
      const offset = (i / colorStops.length) * 100;
      stopElement.setAttributeNS(null, "offset", `${offset}%`);
      stopElement.setAttributeNS(null, "stop-color", color);
      linearGradientElement.appendChild(stopElement);
    });

    const rectElement = createElementNS("rect");
    rectElement.setAttributeNS(null, "width", "100%");
    rectElement.setAttributeNS(null, "height", "20");
    rectElement.setAttributeNS(null, "fill", `url(#g)`);

    const inputElement = document.createElement("input");
    inputElement.setAttribute("class", "range");
    inputElement.setAttribute("type", "range");
    inputElement.setAttribute("min", "0");
    inputElement.setAttribute("max", "360");
    const setValue = (hueValue) => {
      hue = hueValue;
      inputElement.value = hueValue;
      inputElement.style.setProperty("--hue", hueValue);
    };
    setValue(hue);

    // Handle input change
    inputElement.addEventListener("input", (e) => {
      setValue(e.target.value);
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: hue,
          bubbles: true,
          composed: true,
        })
      );
    });

    // Structure
    defsElement.appendChild(linearGradientElement);
    svgElement.appendChild(defsElement);
    svgElement.appendChild(rectElement);
    rootDiv.appendChild(svgElement);
    rootDiv.appendChild(inputElement);
    shadow.appendChild(rootDiv);

    // Styles
    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    shadow.appendChild(styleElement);
  }
}

const createElementNS = (el) =>
  document.createElementNS("http://www.w3.org/2000/svg", el);

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
