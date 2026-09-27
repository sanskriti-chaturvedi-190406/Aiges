const express = require('express')
const victimRoutes = require('./src/victim/victim.routes')
const errorHandler = require('./src/middleware/errorHandler')

const app = express()

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json())

// Dev request logger
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
  })
}

// CORS — allows Vite dev server (localhost:5173) to call this API.
// Set CORS_ORIGIN env var to restrict in production.
app.use((req, res, next) => {
  const origin = process.env.CORS_ORIGIN || 'http://localhost:5173'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } })
})

app.use('/api/victim', victimRoutes)

// 404 catch-all
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } })
})

// Global error handler — must be last
app.use(errorHandler)

module.exports = app
