// Injects the server-rendered home page into dist/index.html so crawlers get real content.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render } = await import(`${root}dist-ssr/entry-server.js`);

const template = await readFile(`${root}dist/index.html`, "utf8");
const html = render();
if (!template.includes('<div id="root"></div>')) throw new Error("root placeholder not found");
await writeFile(
  `${root}dist/index.html`,
  template.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log(`prerendered / (${(html.length / 1024).toFixed(1)} kB of HTML)`);
