import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Hard-coded study programme dataset
const COURSES = [
  { id: 'CS101', title: 'Introduction to Web Technologies', credits: 5 },
  { id: 'CS202', title: 'Client-Side Architectures with React', credits: 6 },
  { id: 'CS303', title: 'Server-Side Engineering with Node.js', credits: 6 },
  { id: 'CS404', title: 'Distributed Cloud Systems', credits: 5 }
];

// Application metrics counter
let requestsServed = 0;

// 1. Middleware: Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// 2. Middleware: Request Counter
app.use((req, res, next) => {
  requestsServed += 1;
  next();
});

// Serve static assets from public directory regardless of working directory
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---

// GET / -> Serves public/index.html explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /hello -> Plain text greeting
app.get('/hello', (req, res) => {
  res.type('text/plain').send("Hello from Tunahan's server");
});

// GET /robots.txt -> Plain-text crawler instructions
app.get('/robots.txt', (req, res) => {
  const robotsContent = 'User-agent: *\nDisallow: /api/admin\nAllow: /\n';
  res.type('text/plain').send(robotsContent);
});

// GET /old-page -> Redirects to /hello
app.get('/old-page', (req, res) => {
  res.redirect('/hello');
});

// GET /api/courses -> JSON list of courses
app.get('/api/courses', (req, res) => {
  res.json(COURSES);
});

// GET /api/status -> Real runtime process diagnostics
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// GET /api/headers -> Echoes User-Agent and Accept request headers
app.get('/api/headers', (req, res) => {
  res.json({
    userAgent: req.get('User-Agent') || 'Unknown',
    accept: req.get('Accept') || '*/*'
  });
});

// POST /api/subscribe -> Status 201 Created
app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

// GET /api/admin -> Status 403 Forbidden
app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

// GET /api/stats -> Exposes request counter
app.get('/api/stats', (req, res) => {
  res.json({ requestsServed });
});

// --- 404 FALLBACK (Express 5 compatible, no wildcard '*') ---
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).type('text/plain').send('404 - Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
