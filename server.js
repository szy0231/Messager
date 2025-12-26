const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Initialize SQLite database
const db = new sqlite3.Database('messager.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT,
    friend_name TEXT,
    user_a_message TEXT,
    user_a_file_path TEXT,
    user_a_file_type TEXT,
    user_b_message TEXT,
    user_b_file_path TEXT,
    user_b_file_type TEXT,
    user_a_uploaded INTEGER DEFAULT 0,
    user_b_uploaded INTEGER DEFAULT 0,
    user_a_is_shao INTEGER DEFAULT 0,
    user_b_is_shao INTEGER DEFAULT 0
  )`);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Create a new session (User A)
app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4();
  const { createdBy, friendName } = req.body; // 'shao' or 'friend', and friend's name if friend created
  
  db.run('INSERT INTO sessions (id, created_by, friend_name) VALUES (?, ?, ?)', 
    [sessionId, createdBy || 'shao', friendName || null], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create session' });
      }
      res.json({ sessionId, link: `${req.protocol}://${req.get('host')}/session/${sessionId}` });
    }
  );
});

// Get session status
app.get('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM sessions WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    const isUnlocked = row.user_a_uploaded === 1 && row.user_b_uploaded === 1;
    
    res.json({
      sessionId: row.id,
      createdBy: row.created_by,
      friendName: row.friend_name,
      userAUploaded: row.user_a_uploaded === 1,
      userBUploaded: row.user_b_uploaded === 1,
      userAIsShao: row.user_a_is_shao === 1,
      userBIsShao: row.user_b_is_shao === 1,
      isUnlocked: isUnlocked,
      // Only send messages if unlocked
      userAMessage: isUnlocked ? row.user_a_message : null,
      userAFilePath: isUnlocked ? row.user_a_file_path : null,
      userAFileType: isUnlocked ? row.user_a_file_type : null,
      userBMessage: isUnlocked ? row.user_b_message : null,
      userBFilePath: isUnlocked ? row.user_b_file_path : null,
      userBFileType: isUnlocked ? row.user_b_file_type : null
    });
  });
});

// Upload message from User A
app.post('/api/sessions/:id/user-a', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const message = req.body.message || null;
  const filePath = req.file ? req.file.path : null;
  const fileType = req.file ? req.file.mimetype : null;
  const isShao = req.body.isShao === 'true' || req.body.isShao === true;
  
  db.run(
    'UPDATE sessions SET user_a_message = ?, user_a_file_path = ?, user_a_file_type = ?, user_a_uploaded = 1, user_a_is_shao = ? WHERE id = ?',
    [message, filePath, fileType, isShao ? 1 : 0, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save message' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json({ success: true, message: 'Message uploaded successfully' });
    }
  );
});

// Upload message from User B
app.post('/api/sessions/:id/user-b', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const message = req.body.message || null;
  const filePath = req.file ? req.file.path : null;
  const fileType = req.file ? req.file.mimetype : null;
  const isShao = req.body.isShao === 'true' || req.body.isShao === true;
  
  db.run(
    'UPDATE sessions SET user_b_message = ?, user_b_file_path = ?, user_b_file_type = ?, user_b_uploaded = 1, user_b_is_shao = ? WHERE id = ?',
    [message, filePath, fileType, isShao ? 1 : 0, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save message' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json({ success: true, message: 'Message uploaded successfully' });
    }
  );
});

// Serve uploaded files
app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  // Remove any path traversal attempts
  const safeFilename = path.basename(filename);
  const filePath = path.resolve(uploadsDir, safeFilename);
  const resolvedUploadsDir = path.resolve(uploadsDir);
  
  // Security check: ensure file is in uploads directory
  if (!filePath.startsWith(resolvedUploadsDir)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Get all sessions (for Shao Ziyue admin view)
app.get('/api/admin/sessions', (req, res) => {
  db.all('SELECT id, created_at, created_by, friend_name, user_a_uploaded, user_b_uploaded, (user_a_uploaded = 1 AND user_b_uploaded = 1) as is_unlocked FROM sessions ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Catch-all handler: serve index.html for all non-API routes (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:3000');
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
