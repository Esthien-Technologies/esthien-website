import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(
  "C:/Users/kodur/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/package.json",
);
const sharp = require("sharp");

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const brandDir = join(root, "public", "brand-kit");

const colors = {
  core: "#0A0D10",
  panel: "#11181C",
  white: "#F8FAF9",
  line: "#CBD5D8",
  graphite: "#263239",
  graphiteLine: "#2B373D",
  logic: "#32D69A",
  signal: "#4CC9F0",
  outer: "#1E1E1E",
};

const tagline = "CUSTOM SILICON FOR PHYSICAL INTELLIGENCE";
const taglineSentence = "Custom silicon for deterministic physical intelligence.";

const ePath96 =
  "M13 18H26V78H13V18Z M26 18H52V31H26V18Z M26 41.5H48V54.5H26V41.5Z M26 65H52V78H26V65Z";

const markPaths = ({ ink, logic = colors.logic, signal = colors.signal, bridge, node }) => `
  <path d="${ePath96}" fill="${ink}"/>
  <path d="M59 18H69V78H59V18Z" fill="${logic}"/>
  <path d="M74 18H84V78H74V18Z" fill="${signal}"/>
  <path d="M59 31H84M59 65H84" stroke="${bridge}" stroke-width="4"/>
  <circle cx="64" cy="48" r="4.2" fill="${node}"/>
  <circle cx="79" cy="48" r="4.2" fill="${node}"/>`;

const standaloneMark = ({ bg, ink, bridge, node, stroke = "none", strokeWidth = 0 }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs mark">
  <title>Esthien Labs mark</title>
  <desc>Linear E monogram with two routed signal bars for Esthien Labs.</desc>
  <rect width="96" height="96" rx="18" fill="${bg}"${stroke !== "none" ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : ""}/>
  ${markPaths({ ink, bridge, node })}
</svg>
`;

const monoMark = ({ bg, ink, bridge, node }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs mark">
  <title>Esthien Labs mark</title>
  <rect width="96" height="96" rx="18" fill="${bg}"/>
  ${markPaths({ ink, logic: ink, signal: ink, bridge, node })}
</svg>
`;

const horizontal = ({ mode }) => {
  const light = mode === "light";
  const mono = mode === "mono";
  const inverse = mode === "inverse";
  const width = mono || inverse ? 1072 : 1200;
  const height = mono || inverse ? 232 : 360;
  const bg = light ? colors.white : colors.core;
  const panel = light ? "#FFFFFF" : colors.panel;
  const ink = light ? colors.core : colors.white;
  const muted = light ? colors.graphiteLine : colors.line;
  const bridge = light ? colors.line : colors.graphite;
  const monoInk = inverse ? "#FFFFFF" : "#000000";
  const monoBg = inverse ? "#000000" : "#FFFFFF";
  const textInk = mono || inverse ? monoInk : ink;
  const markInk = mono || inverse ? monoInk : ink;
  const node = light ? "#FFFFFF" : colors.core;
  const markNode = mono || inverse ? monoBg : node;
  const markBridge = mono || inverse ? monoBg : bridge;
  const frame = mono || inverse ? monoInk : muted;

  if (mono || inverse) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs horizontal logo">
  <title>Esthien Labs horizontal logo</title>
  <rect x="1.5" y="1.5" width="1069" height="229" rx="10.5" fill="${monoBg}" stroke="${frame}" stroke-width="3"/>
  <g transform="translate(40 30) scale(1.802)">
    ${markPaths({ ink: markInk, logic: markInk, signal: markInk, bridge: markBridge, node: markNode })}
  </g>
  <text x="392" y="119" fill="${textInk}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="58" font-weight="900" letter-spacing="0.5">ESTHIEN LABS</text>
  <text x="394" y="163" fill="${textInk}" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" letter-spacing="2.8">${tagline}</text>
  <path d="M392 188H945" stroke="${textInk}" stroke-width="2" opacity="0.55"/>
</svg>
`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs horizontal logo">
  <title>Esthien Labs horizontal logo</title>
  <rect width="${width}" height="${height}" fill="${colors.outer}"/>
  <rect width="${width}" height="${height}" rx="28" fill="${bg}"/>
  <rect x="64" y="64" width="1072" height="232" rx="14" fill="${panel}" stroke="${muted}" stroke-width="2"/>
  <g transform="translate(104 94) scale(1.802)">
    ${markPaths({ ink: markInk, bridge: markBridge, node: markNode })}
  </g>
  <text x="455" y="176" fill="${textInk}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="60" font-weight="900" letter-spacing="0.5">ESTHIEN LABS</text>
  <text x="458" y="226" fill="${light ? colors.graphiteLine : colors.signal}" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="800" letter-spacing="3.2">${tagline}</text>
  <path d="M455 252H1008" stroke="${muted}" stroke-width="2"/>
</svg>
`;
};

const vertical = ({ light = false }) => {
  const bg = light ? colors.white : colors.core;
  const panel = light ? "#FFFFFF" : colors.panel;
  const ink = light ? colors.core : colors.white;
  const muted = light ? colors.graphiteLine : colors.line;
  const bridge = light ? colors.line : colors.graphite;
  const node = light ? "#FFFFFF" : colors.core;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs vertical logo">
  <title>Esthien Labs vertical logo</title>
  <rect width="512" height="512" fill="${colors.outer}"/>
  <rect width="512" height="512" rx="18" fill="${bg}"/>
  <rect x="48" y="48" width="416" height="416" rx="64" fill="${panel}" stroke="${muted}" stroke-width="8"/>
  <g transform="translate(139 144) scale(1.46)">
    ${markPaths({ ink, bridge, node })}
  </g>
  <text x="256" y="336" text-anchor="middle" fill="${ink}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="34" font-weight="900" letter-spacing="1.6">ESTHIEN LABS</text>
  <text x="256" y="358" text-anchor="middle" fill="${light ? colors.graphiteLine : colors.signal}" font-family="Arial, Helvetica, sans-serif" font-size="10.8" font-weight="800" letter-spacing="1.7">${tagline}</text>
  <path d="M118 369H395" stroke="${muted}" stroke-width="2"/>
</svg>
`;
};

const socialAvatar = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs social avatar">
  <title>Esthien Labs social avatar</title>
  <rect width="512" height="512" rx="18" fill="${colors.core}"/>
  <rect x="48" y="48" width="416" height="416" rx="64" fill="${colors.panel}" stroke="${colors.line}" stroke-width="8"/>
  <g transform="translate(91 112) scale(3)">
    ${markPaths({ ink: colors.white, bridge: colors.graphite, node: colors.core })}
  </g>
</svg>
`;

const ogImage = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esthien Labs custom FPGA chipsets">
  <title>Esthien Labs custom FPGA chipsets</title>
  <rect width="1200" height="630" fill="#050608"/>
  <g opacity="0.35" stroke="#252B31">
    <path d="M0 105H1200M0 210H1200M0 315H1200M0 420H1200M0 525H1200"/>
    <path d="M150 0V630M300 0V630M450 0V630M600 0V630M750 0V630M900 0V630M1050 0V630"/>
  </g>
  <rect x="84.5" y="84.5" width="1031" height="461" rx="24.5" stroke="#C8A96A" stroke-opacity="0.28" stroke-width="5"/>
  <g transform="translate(129 157) scale(1.98)">
    <rect width="96" height="96" rx="14" fill="${colors.core}" stroke="${colors.line}" stroke-opacity="0.55" stroke-width="1.5"/>
    ${markPaths({ ink: colors.white, bridge: colors.graphite, node: colors.core })}
  </g>
  <text x="387" y="286" fill="${colors.white}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" letter-spacing="0.2">ESTHIEN LABS</text>
  <text x="390" y="366" fill="${colors.signal}" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800" letter-spacing="2.6">${tagline}</text>
  <text x="390" y="430" fill="#F4F1E8" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500">Edge AI, bionic arms, prosthetics, automotive radar, and safety-critical embedded systems.</text>
  <g opacity="0.52" stroke="#3A5374" stroke-width="1.2">
    <path d="M720 150H1065M720 230H1065M720 310H1065M720 390H1065M720 470H1065"/>
    <path d="M760 120V505M850 120V505M940 120V505M1030 120V505"/>
  </g>
</svg>
`;

const files = new Map([
  [join(root, "public", "esthien-mark.svg"), standaloneMark({ bg: colors.core, ink: colors.white, bridge: colors.graphite, node: colors.core })],
  [join(brandDir, "esthien-mark.svg"), standaloneMark({ bg: colors.core, ink: colors.white, bridge: colors.graphite, node: colors.core })],
  [join(brandDir, "esthien-mark-light.svg"), standaloneMark({ bg: colors.white, ink: colors.core, bridge: colors.line, node: "#FFFFFF", stroke: colors.graphiteLine, strokeWidth: 1.5 })],
  [join(brandDir, "esthien-mark-monochrome.svg"), monoMark({ bg: "#FFFFFF", ink: "#000000", bridge: "#FFFFFF", node: "#FFFFFF" })],
  [join(brandDir, "esthien-mark-inverse-monochrome.svg"), monoMark({ bg: "#000000", ink: "#FFFFFF", bridge: "#000000", node: "#000000" })],
  [join(brandDir, "esthien-logo-horizontal.svg"), horizontal({ mode: "dark" })],
  [join(brandDir, "esthien-logo-horizontal-light.svg"), horizontal({ mode: "light" })],
  [join(brandDir, "esthien-logo-horizontal-monochrome.svg"), horizontal({ mode: "mono" })],
  [join(brandDir, "esthien-logo-horizontal-inverse-monochrome.svg"), horizontal({ mode: "inverse" })],
  [join(brandDir, "esthien-logo-vertical.svg"), vertical({ light: false })],
  [join(brandDir, "esthien-logo-vertical-light.svg"), vertical({ light: true })],
  [join(brandDir, "esthien-social-avatar.svg"), socialAvatar()],
  [join(root, "public", "esthien-og.svg"), ogImage()],
]);

for (const [path, content] of files) {
  writeFileSync(path, content, "utf8");
}

const pngTargets = [
  "esthien-mark.svg",
  "esthien-mark-light.svg",
  "esthien-mark-monochrome.svg",
  "esthien-mark-inverse-monochrome.svg",
  "esthien-logo-horizontal.svg",
  "esthien-logo-horizontal-light.svg",
  "esthien-logo-horizontal-monochrome.svg",
  "esthien-logo-horizontal-inverse-monochrome.svg",
  "esthien-logo-vertical.svg",
  "esthien-logo-vertical-light.svg",
  "esthien-social-avatar.svg",
];

for (const target of pngTargets) {
  const svgPath = join(brandDir, target);
  const pngPath = join(brandDir, target.replace(/\.svg$/, ".png"));
  await sharp(svgPath).png().toFile(pngPath);
}

await sharp(join(brandDir, "esthien-logo-horizontal-light.svg"))
  .jpeg({ quality: 92 })
  .toFile(join(root, "public", "esthien-logo-horizontal-light.jpg"));

await sharp(join(root, "public", "esthien-og.svg"))
  .png()
  .toFile(join(root, "public", "esthien-og.png"));

console.log(`Refreshed ${files.size} SVG assets and ${pngTargets.length + 2} raster exports.`);
console.log(`Tagline: ${taglineSentence}`);
