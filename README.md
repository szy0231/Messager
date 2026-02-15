# Messager 💬

A minimalist, privacy-focused messaging app where two people exchange messages that unlock only when both have contributed.

---

## 🚀 Quick Start

### Local Development

```bash
npm install
npm start
```

Visit `http://localhost:3000`

---

## 🎯 How It Works

1. **Enter your name** (first & last)
2. **Admin (Shao Ziyue):** Create sessions with friends
3. **Friends:** Join existing session or create new one
4. **Leave a message** (text only)
5. **Wait for unlock** - Messages reveal when both people submit

**Mutual unlock is the core:** Neither person can see messages until both contribute.

---

## 🔑 Features

- ✅ Name-based sessions (no login required)
- ✅ Mutual unlock mechanism
- ✅ Text messages only (simplified MVP)
- ✅ Real-time status updates (5s polling)
- ✅ Clean, single-page interface
- ✅ Privacy-focused (no tracking)

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla JS, CSS
- **Backend:** Node.js + Express
- **Database:** SQLite3
- **Deployment:** Render/Railway ready

---

## 📁 Project Structure

```
Messager/
├── public/
│   ├── index.html      # Single-page UI
│   ├── style.css       # Purple gradient theme
│   └── script.js       # Client logic
├── server.js           # Express backend + SQLite
├── messager.db         # Auto-created database
├── uploads/            # (reserved for future use)
└── docs/               # Documentation & guides
```

---

## 🚀 Deployment

Ready to deploy on cloud platforms:

1. **Render** (Recommended - Free tier)
2. **Railway** (Free credit)
3. **Fly.io** (Free tier available)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step guide.

---

## 📚 Documentation

- 🚀 [START_GUIDE.md](START_GUIDE.md) - Setup & first run
- 🐛 [DEBUG_GUIDE.md](DEBUG_GUIDE.md) - Troubleshooting
- 📱 [SCREENS_REFERENCE.md](SCREENS_REFERENCE.md) - Complete screen reference

---

## 🎨 Design Philosophy

**Minimalist. Focused. Private.**

- Purple gradient theme (#667eea)
- Step-by-step user flow
- Mobile-responsive
- No unnecessary features
- Zero tracking

---

## 🐛 Troubleshooting

**Issues?** Check [DEBUG_GUIDE.md](DEBUG_GUIDE.md)

**Quick fixes:**
- Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
- Check console: Press `F12` → Console tab
- Reset state: Click **Logout** (top-right)

---

## 📝 License

Personal project - free to fork and modify!

---

**Made with ❤️ for simple, private communication**
