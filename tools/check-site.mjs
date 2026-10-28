#!/usr/bin/env node
// Static checks for the published site (docs/) and agent skill wrappers.
// Usage: node tools/check-site.mjs   (exit code 1 on any failure)

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "docs");
// Absolute links are only allowed in 404.html, which GitHub serves for any missing path.
const sitePathPrefix = "/Relic-Layers-Website/";
const failures = [];
const fail = (file, message) => failures.push(`${relative(root, file).split(sep).join("/")}: ${message}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(site);
const pages = files.filter((f) => f.endsWith(".html"));
const texts = new Map(files.filter((f) => /\.(html|css|js)$/.test(f)).map((f) => [f, readFileSync(f, "utf8")]));

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const sectionIds = (html) => [...html.matchAll(/<section\s[^>]*id="([^"]+)"/g)].map((m) => m[1]);

function resolveTarget(fromFile, href) {
  const [path] = href.split("#");
  let target;
  if (path.startsWith(sitePathPrefix)) target = join(site, path.slice(sitePathPrefix.length));
  else if (path === "") target = fromFile;
  else target = resolve(dirname(fromFile), path);
  if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
  return target;
}

for (const [file, text] of texts) {
  if (/\{\{|\bTODO\b|\bTBD\b|lorem ipsum/i.test(text)) fail(file, "unresolved placeholder");
  if (/document\.cookie|localStorage|sessionStorage|indexedDB/.test(text)) fail(file, "client-side storage is not allowed");
  if (/@import|url\(\s*["']?https?:/i.test(text)) fail(file, "external CSS resource");
}

for (const page of pages) {
  const html = texts.get(page);
  const isNotFound = page.endsWith(`${sep}404.html`);
  if (!/^<!doctype html>/i.test(html)) fail(page, "missing doctype");
  if (!/<html lang="(en|pl)">/.test(html)) fail(page, "missing <html lang>");
  if (!/<title>[^<]+<\/title>/.test(html)) fail(page, "missing <title>");
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(page, "missing description");
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(html)) fail(page, "missing viewport");
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(page, "expected exactly one <h1>");
  if (!/<main id="main">/.test(html)) fail(page, "missing <main id=\"main\">");

  const pageIds = ids(html);
  for (const tag of html.match(/<(a|link|script|img)\s[^>]*>/g) || []) {
    const ref = attr(tag, "href") ?? attr(tag, "src");
    if (ref === undefined) continue;
    if (/^(https?:)?\/\//.test(ref)) {
      if (!tag.startsWith("<a")) fail(page, `external resource ${ref}`);
      else if (!ref.startsWith("https://")) fail(page, `non-HTTPS link ${ref}`);
      continue;
    }
    if (ref.startsWith("mailto:")) continue;
    if (ref.startsWith("/") && !(isNotFound && ref.startsWith(sitePathPrefix))) {
      fail(page, `root-relative link ${ref} breaks on a project site; use a relative path`);
      continue;
    }
    const target = resolveTarget(page, ref);
    if (!existsSync(target)) { fail(page, `broken link ${ref}`); continue; }
    const fragment = ref.split("#")[1];
    if (fragment) {
      const targetIds = target === page ? pageIds : ids(readFileSync(target, "utf8"));
      if (!targetIds.has(fragment)) fail(page, `missing anchor ${ref}`);
    }
  }
}

// EN/PL twins: same relative path, same sections, same update date, language switch points to the twin.
const langPages = (lang) => pages.filter((p) => p.startsWith(join(site, lang) + sep)).map((p) => relative(join(site, lang), p));
const en = langPages("en");
const pl = langPages("pl");
for (const path of new Set([...en, ...pl])) {
  const enFile = join(site, "en", path);
  const plFile = join(site, "pl", path);
  if (!en.includes(path)) { fail(plFile, "no EN twin"); continue; }
  if (!pl.includes(path)) { fail(enFile, "no PL twin"); continue; }
  const enHtml = texts.get(enFile);
  const plHtml = texts.get(plFile);
  if (!enHtml.includes('<html lang="en">')) fail(enFile, "EN page must declare lang=\"en\"");
  if (!plHtml.includes('<html lang="pl">')) fail(plFile, "PL page must declare lang=\"pl\"");
  if (sectionIds(enHtml).join() !== sectionIds(plHtml).join()) fail(plFile, "section ids differ from EN twin");
  const enUpdated = enHtml.match(/data-updated="([^"]*)"/)?.[1];
  const plUpdated = plHtml.match(/data-updated="([^"]*)"/)?.[1];
  if (enUpdated !== plUpdated) fail(plFile, `data-updated ${plUpdated} differs from EN ${enUpdated}`);
  if (enUpdated !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(enUpdated)) fail(enFile, "data-updated must be YYYY-MM-DD");
  for (const [file, html, twin] of [[enFile, enHtml, plFile], [plFile, plHtml, enFile]]) {
    const switchTag = html.match(/<a class="lang-switch"[^>]*>/)?.[0];
    if (!switchTag) { fail(file, "missing language switch"); continue; }
    if (resolveTarget(file, attr(switchTag, "href")) !== twin) fail(file, "language switch does not point to the twin page");
  }
}

// Claude skill wrappers mirror canonical name/description.
const frontmatter = (file) => {
  const block = readFileSync(file, "utf8").replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  return Object.fromEntries(block.split("\n").map((l) => l.split(/:\s(.*)/s).slice(0, 2)));
};
const canonicalDir = join(root, ".agents", "skills");
const wrapperDir = join(root, ".claude", "skills");
for (const name of existsSync(canonicalDir) ? readdirSync(canonicalDir) : []) {
  const canonical = join(canonicalDir, name, "SKILL.md");
  const wrapper = join(wrapperDir, name, "SKILL.md");
  if (!existsSync(wrapper)) { fail(canonical, "missing Claude wrapper"); continue; }
  const a = frontmatter(canonical);
  const b = frontmatter(wrapper);
  if (a.name !== name) fail(canonical, "frontmatter name must match folder");
  if (a.name !== b.name || a.description !== b.description) fail(wrapper, "name/description differ from canonical skill");
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`FAIL (${failures.length} issue${failures.length === 1 ? "" : "s"}, ${pages.length} pages)`);
  process.exit(1);
}
console.log(`PASS (${pages.length} pages, ${en.length} EN/PL pairs)`);
