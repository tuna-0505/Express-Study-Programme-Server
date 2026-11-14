# Web Technologies Laboratory - Assignment 8 (Node.js & Express 5 Server)

**Student Name:** Tunahan Mutlu  
**Student ID:** 230408002  

## 1. How to Install and Run
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd Express-Study-Programme-Server
## 5. Section 8: Reasoning Questions
- **Route order:** When moving the 404 fallback middleware to the top of `server.js`, every single request (including `/`, `/api/courses`, and static files) immediately returned a 404 response. Express evaluates middleware and routes sequentially from top to bottom, so an early catch-all intercepts requests before specific routes can match.
- **Middleware (`next()`):** Removing `next()` from the request logger caused the browser tab to spin indefinitely until timing out, while the server printed the request log line in the terminal. Without `next()`, Express never passes control to subsequent middlewares or route handlers, leaving the HTTP response hanging open.
- **Status codes:** `POST /api/subscribe` returns `201 Created` because it represents creating a new subscription resource rather than merely retrieving existing data (`200 OK`). A missing page returns `404 Not Found` instead of `200 OK` so automated clients, browsers, and fetch calls (`response.ok`) can programmatically distinguish failure from valid content.
- **Configuration (`process.env.PORT`):** Hosting providers and cloud platforms dynamically assign an available port via environment variables at runtime. Falling back to `3000` allows seamless local development while ensuring production deployments bind to the platform's required port.
- **Dependencies (`node_modules`):** `node_modules` contains thousands of heavy third-party files that bloat Git history and differ across operating systems. A teammate cloning the repository simply runs `npm install` to deterministically reconstruct the exact dependency tree recorded in `package-lock.json`.
- **Same origin:** Opening `index.html` directly from disk uses the `file://` protocol, causing relative URLs like `/api/courses` to resolve to the local filesystem (`file:///C:/api/courses`) instead of `http://localhost:3000`. Even if full URLs were used, browsers would block cross-protocol requests due to the **Same-Origin Policy (CORS)**.

## 6. Self-Study Notes & Challenges
- **Node Process Metrics:** Used `process.version` to read the active Node.js runtime string and `Math.floor(process.uptime())` to calculate elapsed server uptime in whole seconds.
- **Explicit Content Types:** Applied `res.type('text/plain')` on `/robots.txt` and `/hello` to guarantee browsers and crawlers parse responses strictly as plain text rather than HTML.
- **Formatted JSON Rendering:** Used `JSON.stringify(jsonData, null, 2)` inside `public/app.js` alongside a `<pre>` element so nested API objects display cleanly with 2-space indentation.
- **Working Directory Independence:** Used `fileURLToPath(import.meta.url)` and `path.dirname()` to resolve `public/` relative to `server.js`, preventing path breakage when starting Node from parent folders.
