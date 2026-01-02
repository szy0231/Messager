# Bug Fix Log

## Issue: 404 Errors for CSS/JS on Session Routes

### Problem
When accessing `/session/83873921-...`, the browser tried to load:
- `http://localhost:3000/session/style.css` ❌
- `http://localhost:3000/session/script.js` ❌

Instead of:
- `http://localhost:3000/style.css` ✅
- `http://localhost:3000/script.js` ✅

### Root Cause
In `index.html`, the paths were relative (`style.css`, `script.js`). When served from `/session/123`, the browser interpreted them relative to `/session/`, resulting in 404s.

### Solution
Changed to absolute paths in `index.html`:
```html
<!-- Before -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>

<!-- After -->
<link rel="stylesheet" href="/style.css">
<script src="/script.js"></script>
```

### Result
✅ CSS and JS now load correctly from any route (root, /session/123, etc.)

---

## Date: Dec 29, 2025
**Fixed by**: Using absolute paths for static assets in SPA

