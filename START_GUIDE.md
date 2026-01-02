# Quick Start Guide

## To Start the Server

1. **Open Terminal** and navigate to the project:
   ```bash
   cd /Users/shuizhuyu/Desktop/Project/Messager
   ```

2. **Install dependencies** (only needed once, or after updating package.json):
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   You should see:
   ```
   Server running on http://localhost:3000
   Database initialized
   ```

## To Test the Application

1. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

2. **Open Browser Console** (F12 or Cmd+Option+I on Mac):
   - Look for `[INIT]` logs showing initialization
   - Should see language selection modal first

3. **Test Flow**:
   - Select language (English or 中文)
   - Enter your name (Family Name + Given Name)
   - For **Shao Ziyue**: You'll see admin panel with friends list
   - For **Friends**: You'll see options to join/create session

## Common Issues

### Port 3000 already in use
If you see "Port 3000 is already in use":
- Check if another terminal is running the server
- Or kill the process: `lsof -ti:3000 | xargs kill`

### Database errors
If you see database errors:
- The database will auto-create on first run
- If corrupted, delete `messager.db` and restart server

### Static files not loading
- Make sure you're running from the project root directory
- Check that `public/` folder exists with `index.html`, `script.js`, `style.css`

## Quick Commands

```bash
# Start server
npm start

# Check if server is running
curl http://localhost:3000

# View server logs (in the terminal where you ran npm start)
# Logs will show all API requests and database operations
```

