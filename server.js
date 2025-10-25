const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET || 'malta-startup-space-secret-' + Math.random().toString(36),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: false
  }
}));

// Serve static files with cache disabled
app.use(express.static('.', {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-cache');
  }
}));

// Initialize database tables
async function initDatabase() {
  try {
    // Create sessions table for express-session
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sid" varchar NOT NULL PRIMARY KEY,
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      );
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        website VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

// API Routes

// Check authentication status
app.get('/api/auth/status', (req, res) => {
  if (req.session.userId) {
    res.json({ authenticated: true, userId: req.session.userId });
  } else {
    res.json({ authenticated: false });
  }
});

// Register/Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, name, company, website, password } = req.body;

    // Validate required fields
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    let userId;

    if (existingUser.rows.length > 0) {
      // User exists - verify password
      const user = existingUser.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      userId = user.id;
    } else {
      // New user - create account
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (email, name, company, website, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [email.toLowerCase(), name, company || null, website || null, hashedPassword]
      );
      userId = result.rows[0].id;
    }

    // Set session
    req.session.userId = userId;
    req.session.userEmail = email;

    res.json({ 
      success: true, 
      message: existingUser.rows.length > 0 ? 'Logged in successfully' : 'Account created successfully'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ success: true });
  });
});

// Get user info
app.get('/api/auth/user', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, company, website, created_at FROM users WHERE id = $1',
      [req.session.userId]
    );
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get WhatsApp link (protected)
app.get('/api/whatsapp-link', isAuthenticated, (req, res) => {
  const whatsappLink = 'https://chat.whatsapp.com/HSgdX3T1jH4AIhuoo9VrVb';
  res.json({ link: whatsappLink });
});

// Serve join page
app.get('/join', (req, res) => {
  res.sendFile(path.join(__dirname, 'join.html'));
});

// Initialize and start server
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
});
