import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const rootDir = resolve(process.cwd(), "dist");

if (!existsSync(rootDir)) {
  console.error("[serve:dist] Missing dist folder. Run `npm run build` first.");
  process.exit(1);
}

const mimeByExt = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav"
};

function safeFilePath(urlPath) {
  const pathOnly = urlPath.split("?")[0];
  const normalized = normalize(decodeURIComponent(pathOnly)).replace(/^\\+|^\/+/, "");
  const candidate = resolve(rootDir, normalized || "index.html");
  if (!candidate.startsWith(rootDir)) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  const fallback = resolve(rootDir, "index.html");
  return existsSync(fallback) ? fallback : null;
}

const server = createServer((req, res) => {
  const filePath = safeFilePath(req.url || "/");

  if (!filePath) {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = mimeByExt[ext] || "application/octet-stream";

  try {
    const content = readFileSync(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(content);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(`Server error: ${String(error)}`);
  }
});

server.listen(port, host, () => {
  console.log(`[serve:dist] http://${host}:${port}`);
  console.log("[serve:dist] Press Ctrl+C to stop.");
});
