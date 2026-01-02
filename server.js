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
    user_a_family_name TEXT,
    user_a_given_name TEXT,
    user_b_family_name TEXT,
    user_b_given_name TEXT,
    user_a_message TEXT,
    user_a_file_path TEXT,
    user_a_file_type TEXT,
    user_b_message TEXT,
    user_b_file_path TEXT,
    user_b_file_type TEXT,
    user_a_uploaded INTEGER DEFAULT 0,
    user_b_uploaded INTEGER DEFAULT 0
  )`);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Helper function to check if name matches Shao Ziyue (case-insensitive)
function isShaoZiyue(familyName, givenName) {
  const family = (familyName || '').toLowerCase().trim();
  const given = (givenName || '').toLowerCase().trim();
  const fullName = `${family} ${given}`.trim();
  const fullNameReverse = `${given} ${family}`.trim();
  
  // English: "shao ziyue" or "ziyue shao"
  // Chinese: "邵子越" or "子越邵" (if entered separately)
  const shaoZiyueVariants = [
    'shao ziyue', 'ziyue shao',
    '邵子越', '子越邵',
    '邵', '子越' // Handle if someone enters just one part
  ];
  
  return shaoZiyueVariants.includes(fullName) || 
         shaoZiyueVariants.includes(fullNameReverse) ||
         (family === 'shao' && given === 'ziyue') ||
         (family === '邵' && given === '子越');
}

// Helper function to determine user position (A is Shao Ziyue, B is friend)
function assignUserPositions(user1Family, user1Given, user2Family, user2Given) {
  const user1IsShao = isShaoZiyue(user1Family, user1Given);
  const user2IsShao = isShaoZiyue(user2Family, user2Given);
  
  if (user1IsShao) {
    return {
      userA: { family: user1Family, given: user1Given },
      userB: { family: user2Family, given: user2Given }
    };
  } else if (user2IsShao) {
    return {
      userA: { family: user2Family, given: user2Given },
      userB: { family: user1Family, given: user1Given }
    };
  } else {
    // If neither is Shao Ziyue, default to first as A (shouldn't happen normally)
    return {
      userA: { family: user1Family, given: user1Given },
      userB: { family: user2Family, given: user2Given }
    };
  }
}

// Routes

// Create a new session
app.post('/api/sessions', (req, res) => {
  console.log('[SERVER] POST /api/sessions called with:', req.body);
  const { familyName, givenName, friendFamilyName, friendGivenName } = req.body;
  
  if (!familyName || !givenName) {
    console.log('[SERVER] Validation failed: missing familyName or givenName');
    return res.status(400).json({ error: 'Family name and given name are required' });
  }
  
  // Shao Ziyue's names (fixed)
  const shaoFamily = 'Shao';
  const shaoGiven = 'Ziyue';
  
  // Determine positions
  const userIsShao = isShaoZiyue(familyName, givenName);
  console.log('[SERVER] User is Shao Ziyue?', userIsShao, { familyName, givenName });
  
  let userAFamily, userAGiven, userBFamily, userBGiven;
  
  if (userIsShao) {
    // Current user is Shao Ziyue, creating session with friend
    if (!friendFamilyName || !friendGivenName) {
      console.log('[SERVER] Validation failed: Shao Ziyue needs friend name');
      return res.status(400).json({ error: 'Friend family name and given name are required' });
    }
    userAFamily = familyName;
    userAGiven = givenName;
    userBFamily = friendFamilyName;
    userBGiven = friendGivenName;
  } else {
    // Current user is friend, creating session with Shao Ziyue
    userAFamily = shaoFamily;
    userAGiven = shaoGiven;
    userBFamily = familyName;
    userBGiven = givenName;
  }
  
  console.log('[SERVER] Session participants:', {
    userA: `${userAFamily} ${userAGiven}`,
    userB: `${userBFamily} ${userBGiven}`
  });
  
  // Check if session already exists
  db.get(
    `SELECT id FROM sessions 
     WHERE user_a_family_name = ? AND user_a_given_name = ?
     AND user_b_family_name = ? AND user_b_given_name = ?`,
    [userAFamily, userAGiven, userBFamily, userBGiven],
    (err, existingRow) => {
      if (err) {
        console.error('[SERVER] Database query error:', err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      
      if (existingRow) {
        console.log('[SERVER] Session exists, returning:', existingRow.id);
        // Session exists, return it
        return res.json({ 
          sessionId: existingRow.id, 
          link: `${req.protocol}://${req.get('host')}/session/${existingRow.id}` 
        });
      }
      
      // Create new session
      const sessionId = uuidv4();
      console.log('[SERVER] Creating new session:', sessionId);
      
      db.run(
        'INSERT INTO sessions (id, user_a_family_name, user_a_given_name, user_b_family_name, user_b_given_name) VALUES (?, ?, ?, ?, ?)',
        [sessionId, userAFamily, userAGiven, userBFamily, userBGiven],
        function(insertErr) {
          if (insertErr) {
            console.error('[SERVER] Database INSERT error:', insertErr);
            console.error('[SERVER] INSERT error details:', {
              message: insertErr.message,
              code: insertErr.code,
              errno: insertErr.errno
            });
            return res.status(500).json({ error: 'Failed to create session: ' + insertErr.message });
          }
          console.log('[SERVER] Session created successfully:', sessionId, 'Changes:', this.changes);
          res.json({ sessionId, link: `${req.protocol}://${req.get('host')}/session/${sessionId}` });
        }
      );
    }
  );
});

// Get session status (requires name verification)
app.get('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const { familyName, givenName } = req.query; // Name from query params
  
  db.get('SELECT * FROM sessions WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify name matches one of the users (case-insensitive)
    if (familyName && givenName) {
      const nameMatches = 
        (row.user_a_family_name && row.user_a_given_name && 
         row.user_a_family_name.toLowerCase() === familyName.toLowerCase() &&
         row.user_a_given_name.toLowerCase() === givenName.toLowerCase()) ||
        (row.user_b_family_name && row.user_b_given_name &&
         row.user_b_family_name.toLowerCase() === familyName.toLowerCase() &&
         row.user_b_given_name.toLowerCase() === givenName.toLowerCase());
      
      if (!nameMatches) {
        return res.status(403).json({ error: 'Name does not match this session' });
      }
    }
    
    // Determine if unlocked: if one person has message, the other can see it and reply to unlock
    const hasMessageA = row.user_a_uploaded === 1;
    const hasMessageB = row.user_b_uploaded === 1;
    const isUnlocked = hasMessageA && hasMessageB;
    
    // Determine current user's position
    let isUserA = false;
    if (familyName && givenName) {
      isUserA = row.user_a_family_name && row.user_a_given_name &&
                row.user_a_family_name.toLowerCase() === familyName.toLowerCase() &&
                row.user_a_given_name.toLowerCase() === givenName.toLowerCase();
    }
    
    // If unlocked, show both messages. If not unlocked but one has message, show that one.
    const showMessageA = isUnlocked || (hasMessageA && !hasMessageB);
    const showMessageB = isUnlocked || (hasMessageB && !hasMessageA);
    
    res.json({
      sessionId: row.id,
      userAFamilyName: row.user_a_family_name,
      userAGivenName: row.user_a_given_name,
      userBFamilyName: row.user_b_family_name,
      userBGivenName: row.user_b_given_name,
      userAUploaded: hasMessageA,
      userBUploaded: hasMessageB,
      isUnlocked: isUnlocked,
      isUserA: isUserA,
      // Show messages based on unlock status
      userAMessage: showMessageA ? row.user_a_message : null,
      userAFilePath: showMessageA ? row.user_a_file_path : null,
      userAFileType: showMessageA ? row.user_a_file_type : null,
      userBMessage: showMessageB ? row.user_b_message : null,
      userBFilePath: showMessageB ? row.user_b_file_path : null,
      userBFileType: showMessageB ? row.user_b_file_type : null
    });
  });
});

// Upload message (determines user position from name) - TEXT ONLY
app.post('/api/sessions/:id/message', express.json(), (req, res) => {
  const { id } = req.params;
  const { familyName, givenName, message } = req.body;
  
  if (!familyName || !givenName) {
    return res.status(400).json({ error: 'Family name and given name are required' });
  }
  
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  // Get session to verify name
  db.get('SELECT * FROM sessions WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Determine which user (A or B) based on name match
    const isUserA = row.user_a_family_name && row.user_a_given_name &&
                    row.user_a_family_name.toLowerCase() === familyName.toLowerCase() &&
                    row.user_a_given_name.toLowerCase() === givenName.toLowerCase();
    
    const isUserB = row.user_b_family_name && row.user_b_given_name &&
                    row.user_b_family_name.toLowerCase() === familyName.toLowerCase() &&
                    row.user_b_given_name.toLowerCase() === givenName.toLowerCase();
    
    if (!isUserA && !isUserB) {
      return res.status(403).json({ error: 'Name does not match this session' });
    }
    
    // Update the appropriate user's message (TEXT ONLY)
    if (isUserA) {
      db.run(
        'UPDATE sessions SET user_a_message = ?, user_a_uploaded = 1 WHERE id = ?',
        [message.trim(), id],
        function(updateErr) {
          if (updateErr) {
            return res.status(500).json({ error: 'Failed to save message' });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Session not found' });
          }
          res.json({ success: true, message: 'Message uploaded successfully' });
        }
      );
    } else {
      db.run(
        'UPDATE sessions SET user_b_message = ?, user_b_uploaded = 1 WHERE id = ?',
        [message.trim(), id],
        function(updateErr) {
          if (updateErr) {
            return res.status(500).json({ error: 'Failed to save message' });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Session not found' });
          }
          res.json({ success: true, message: 'Message uploaded successfully' });
        }
      );
    }
  });
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

// Find or create session with a friend (for Shao Ziyue)
app.post('/api/find-session', (req, res) => {
  // #region agent log
  const fs = require('fs');
  const logEntry = JSON.stringify({location:'server.js:331',message:'POST /api/find-session called',data:req.body,timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'}) + '\n';
  try { fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry); } catch(e) {}
  // #endregion
  console.log('[SERVER] POST /api/find-session called with:', req.body);
  const { friendFamilyName, friendGivenName } = req.body;
  
  if (!friendFamilyName || !friendGivenName) {
    // #region agent log
    const logEntry2 = JSON.stringify({location:'server.js:185',message:'Validation failed: missing friend name',data:{friendFamilyName,friendGivenName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'}) + '\n';
    fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry2);
    // #endregion
    return res.status(400).json({ error: 'Friend family name and given name are required' });
  }
  
  const shaoFamily = 'Shao';
  const shaoGiven = 'Ziyue';
  
  // Find existing session
  db.get(
    `SELECT id FROM sessions 
     WHERE user_a_family_name = ? AND user_a_given_name = ?
     AND user_b_family_name = ? AND user_b_given_name = ?`,
    [shaoFamily, shaoGiven, friendFamilyName, friendGivenName],
      (err, row) => {
        // #region agent log
        const logEntry3 = JSON.stringify({location:'server.js:356',message:'Database query result',data:{err:err?.message,rowFound:!!row,rowId:row?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'}) + '\n';
        try { fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry3); } catch(e) {}
        // #endregion
        console.log('[SERVER] Database query result:', { err: err?.message, rowFound: !!row, rowId: row?.id });
        if (err) {
          console.error('[SERVER] Database query error:', err);
          return res.status(500).json({ error: 'Database error: ' + err.message });
        }
      
      if (row) {
        // #region agent log
        const logEntry4 = JSON.stringify({location:'server.js:365',message:'Session exists, returning existing session',data:{sessionId:row.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'}) + '\n';
        try { fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry4); } catch(e) {}
        // #endregion
        console.log('[SERVER] Session exists, returning:', row.id);
        // Session exists
        return res.json({ sessionId: row.id, link: `${req.protocol}://${req.get('host')}/session/${row.id}` });
      }
      
      // Create new session
      const sessionId = uuidv4();
      console.log('[SERVER] Creating new session:', { sessionId, friendFamilyName, friendGivenName });
      // #region agent log
      const logEntry5 = JSON.stringify({location:'server.js:377',message:'Creating new session',data:{sessionId,friendFamilyName,friendGivenName},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'}) + '\n';
      try { fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry5); } catch(e) {}
      // #endregion
      db.run(
        'INSERT INTO sessions (id, user_a_family_name, user_a_given_name, user_b_family_name, user_b_given_name) VALUES (?, ?, ?, ?, ?)',
        [sessionId, shaoFamily, shaoGiven, friendFamilyName, friendGivenName],
        function(insertErr) {
          // #region agent log
          const logEntry6 = JSON.stringify({location:'server.js:386',message:'INSERT result',data:{err:insertErr?.message,changes:this.changes,lastID:this.lastID},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'}) + '\n';
          try { fs.appendFileSync('/Users/shuizhuyu/Desktop/Project/Messager/.cursor/debug.log', logEntry6); } catch(e) {}
          // #endregion
          if (insertErr) {
            console.error('[SERVER] Database error:', insertErr);
            return res.status(500).json({ error: 'Failed to create session: ' + insertErr.message });
          }
          console.log('[SERVER] Session created successfully:', sessionId);
          res.json({ sessionId, link: `${req.protocol}://${req.get('host')}/session/${sessionId}` });
        }
      );
    }
  );
});

// Get all sessions for Shao Ziyue (admin view)
app.get('/api/admin/sessions', (req, res) => {
  db.all(
    `SELECT id, created_at, 
     user_a_family_name, user_a_given_name,
     user_b_family_name, user_b_given_name,
     user_a_uploaded, user_b_uploaded,
     (user_a_uploaded = 1 AND user_b_uploaded = 1) as is_unlocked
     FROM sessions 
     ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      // Transform to show friend name for each session
      const sessions = (rows || []).map(row => ({
        id: row.id,
        created_at: row.created_at,
        friendFamilyName: row.user_b_family_name,
        friendGivenName: row.user_b_given_name,
        userAUploaded: row.user_a_uploaded === 1,
        userBUploaded: row.user_b_uploaded === 1,
        isUnlocked: row.is_unlocked === 1
      }));
      res.json(sessions);
    }
  );
});

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Catch-all handler: serve index.html for all non-API, non-static-file routes (for SPA routing)
app.get('*', (req, res) => {
  // Skip API routes (shouldn't reach here due to earlier handlers)
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Check if request is for a static file extension
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.html'];
  const hasStaticExtension = staticExtensions.some(ext => req.path.toLowerCase().endsWith(ext));
  
  if (hasStaticExtension) {
    // This should have been handled by express.static
    // If we reach here, the file doesn't exist - return 404
    console.log('[SERVER] Static file not found:', req.path);
    return res.status(404).send('File not found');
  }
  
  // For all other routes (like /session/123), serve index.html for SPA routing
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
