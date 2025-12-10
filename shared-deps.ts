import { readFileSync } from "fs";

const web = JSON.parse(readFileSync("./apps/web-nextjs/package.json", "utf8"));
const mobile = JSON.parse(readFileSync("./apps/mobile/package.json", "utf8"));

const webDeps = new Set([
  ...Object.keys(web.dependencies ?? {}),
  ...Object.keys(web.devDependencies ?? {}),
]);

const mobileDeps = new Set([
  ...Object.keys(mobile.dependencies ?? {}),
  ...Object.keys(mobile.devDependencies ?? {}),
]);

const shared = [...webDeps].filter((d) => mobileDeps.has(d));

console.log("Shared dependencies:\n");
console.log(shared.join("\n"));
