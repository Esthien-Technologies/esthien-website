import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const htmlPath = resolve("dist", "index.html");

if (!existsSync(htmlPath)) {
  console.error("CSS inline step failed: dist/index.html was not found.");
  process.exit(1);
}

let html = readFileSync(htmlPath, "utf8");
const htmlDir = dirname(htmlPath);
const stylesheetPattern =
  /<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+\.css)">|<link\s+rel="stylesheet"\s+href="([^"]+\.css)"\s+crossorigin>|<link\s+rel="stylesheet"\s+href="([^"]+\.css)">/g;

let inlined = 0;
html = html.replace(stylesheetPattern, (tag, hrefA, hrefB, hrefC) => {
  const href = hrefA || hrefB || hrefC;
  const cssPath = resolve(htmlDir, href.replace(/^\//, ""));

  if (!existsSync(cssPath)) {
    throw new Error(`CSS inline step failed: ${href} was referenced but not found.`);
  }

  const css = readFileSync(cssPath, "utf8");
  inlined += 1;
  return `<style data-inlined-stylesheet="${href}">${css}</style>`;
});

if (inlined === 0) {
  console.warn("CSS inline step skipped: no stylesheet links found in dist/index.html.");
} else {
  writeFileSync(htmlPath, html);
  console.log(`Inlined ${inlined} stylesheet${inlined === 1 ? "" : "s"} into dist/index.html.`);
}
