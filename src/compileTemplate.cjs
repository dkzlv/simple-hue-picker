const fs = require("fs");
const path = require("path");

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
const colorsTemplate =
  `<linearGradient id="g">` +
  colorStops
    .map(
      (color, i) =>
        `<stop offset="${Math.round(
          (i / colorStops.length) * 100
        )}%" stop-color="${color}" />`
    )
    .join("") +
  "</linearGradient>";

const template = `<svg>
  <defs>${colorsTemplate}</defs>
  <rect width="100%" height="20" fill="url(#g)" />
</svg>
<input value="0" type="range" min="0" max="360" aria-label="Hue picker" />`;

const outputPath = path.join(__dirname, "template.js");

fs.writeFileSync(outputPath, `export default \`${template}\`;`);
