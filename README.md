# Messager 💬

A minimalist, privacy-focused messaging app where two people exchange messages that unlock only when both have contributed.

---

## 🚀 Quick Start

```bash
npm install
npm start
```

Open `http://localhost:3000`

**First-time setup?** See [START_GUIDE.md](START_GUIDE.md)

---

## 🎯 How It Works

1. **Enter your name** (first & last)
2. **Admin (Shao Ziyue):** Create sessions with friends
3. **Friends:** Join existing session or create new one
4. **Leave a message** (text only)
5. **Wait for unlock** - Messages appear only when both people submit

See complete flow: [FLOW_CHART_ENGLISH.md](FLOW_CHART_ENGLISH.md)

---

## 📁 Project Structure

```
Messager/
├── public/
│   ├── index.html      # Single-page app UI
│   ├── style.css       # Minimalist purple theme
│   └── script.js       # Client-side logic
├── server.js           # Express + SQLite backend
├── messager.db         # Session database (auto-created)
└── docs/               # Historical documentation
```

---

## 🔑 Key Features

- ✅ **Name-based sessions** (no login required)
- ✅ **Mutual unlock** (both must send to view)
- ✅ **Text messages only** (simplified MVP)
- ✅ **Real-time status** (5s polling)
- ✅ **Clean navigation** (Back buttons + Logout)
- ✅ **Single Page App** (no page reloads)

---

## 🐛 Debugging

**Having issues?** Check [DEBUG_GUIDE.md](DEBUG_GUIDE.md)

**Quick tips:**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check console: `F12` → Console tab → Look for `[DEBUG]` logs
- Reset everything: Click **Logout** button (top-right)

---

## 📚 Documentation

### Essential
- 📊 [FLOW_CHART_ENGLISH.md](FLOW_CHART_ENGLISH.md) - System architecture
- 🚀 [START_GUIDE.md](START_GUIDE.md) - Setup instructions
- 🐛 [DEBUG_GUIDE.md](DEBUG_GUIDE.md) - Troubleshooting workflow
- 🤝 [HOW_TO_WORK_WITH_ME.md](HOW_TO_WORK_WITH_ME.md) - Collaboration guide

### Reference
- 🌏 [RESTORE_CHINESE_GUIDE.md](RESTORE_CHINESE_GUIDE.md) - Add Chinese language back
- 📈 [FEATURE_ASSESSMENT.md](FEATURE_ASSESSMENT.md) - Feature evaluation (中文)

### Historical (in `/docs`)
- Bug fix logs
- Feature removal summaries
- Optimization notes

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JS, CSS (no frameworks)
- **Backend:** Node.js + Express
- **Database:** SQLite3
- **Deployment:** Ready for Heroku/Render (see deployment guide)

---

## 🎨 Design Philosophy

**Minimalist. Focused. Private.**

- Purple gradient theme (#667eea)
- Step-by-step flow (no overwhelming UI)
- Clean typography (system fonts)
- Mobile-responsive
- No tracking, no analytics

---

## 🔄 Current Status

**Version:** MVP (English-only, text-only)

**Removed (for simplicity):**
- ❌ Language selection (was: EN/CN)
- ❌ File upload (was: text + files)

**Can be restored:** See `RESTORE_CHINESE_GUIDE.md`

---

## 🤔 Need Help?

1. Check [DEBUG_GUIDE.md](DEBUG_GUIDE.md) for common issues
2. Look at browser console logs (`F12`)
3. Check server logs in terminal
4. Read [HOW_TO_WORK_WITH_ME.md](HOW_TO_WORK_WITH_ME.md) for effective debugging

---

## 📝 License

Personal project - feel free to fork and modify!

---

**Made with ❤️ for simple, private communication**

