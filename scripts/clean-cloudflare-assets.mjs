import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const forbiddenFiles = [
  resolve("public", "_redirects"),
  resolve("dist", "_redirects"),
];

for (const file of forbiddenFiles) {
  if (existsSync(file)) {
    rmSync(file, { force: true });
    console.log(`Removed Cloudflare-incompatible file: ${file}`);
  }
}

const remaining = forbiddenFiles.filter((file) => existsSync(file));

if (remaining.length > 0) {
  console.error("Cloudflare deploy guard failed. Forbidden files remain:");
  for (const file of remaining) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}
