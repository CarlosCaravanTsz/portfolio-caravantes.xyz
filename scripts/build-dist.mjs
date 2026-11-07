// Copies only the public site into dist/ for Cloudflare, then stamps the
// asset URLs in the HTML with a content hash (?v=) so they can be cached
// without serving stale files after a deploy. The source files stay the site:
// this keeps tooling, docs and references (V2/, ref/, .claude/, *.md) out.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const PUBLIC = ["index.html", "cv.html", "CV.txt", "_headers", "assets"];
const PAGES = ["index.html", "cv.html"];

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
for (const path of PUBLIC) cpSync(path, `dist/${path}`, { recursive: true });

const hashes = new Map();
const hash = (file) => {
  if (!hashes.has(file))
    hashes.set(file, createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10));
  return hashes.get(file);
};

// Fonts are excluded: their names carry the version and the preload URL
// must match the CSS url() exactly.
const ref = /((?:href|src)=")(assets\/[^"?#]+\.(?:css|js|svg|png|webp))(")/g;
for (const page of PAGES) {
  const file = `dist/${page}`;
  const html = readFileSync(file, "utf8").replace(ref, (match, open, path, close) =>
    existsSync(path) ? `${open}${path}?v=${hash(path)}${close}` : match,
  );
  writeFileSync(file, html);
}
console.log(`dist/ ready: ${PUBLIC.join(", ")} (${hashes.size} asset URLs versioned)`);
