# Messager Flow Chart (English Only - Simplified)

## 🎯 Complete User Flow

```
App Start (localhost:3000)
    ↓
Name Input
    ├─ Family Name
    └─ Given Name
    ↓
Save to localStorage
    ↓
Identity Detection
    ├─ Is "Shao Ziyue"? → Admin Flow
    └─ Not Shao Ziyue → Friend Flow
```

---

## 👑 Admin Flow (Shao Ziyue)

```
Admin Panel
    │
    ├─── View Sessions List
    │    │
    │    ├─ Session 1: with Friend A
    │    │   Status: ✨ Unlocked / ⏳ Waiting
    │    │   [View Button] → Jump to /session/[ID]
    │    │
    │    └─ Session 2: with Friend B
    │        Status: ⏳ Waiting
    │        [View Button] → Jump to /session/[ID]
    │
    └─── Create New Session
         │
         ├─ Input: Friend Family Name
         ├─ Input: Friend Given Name
         ├─ Click "Create"
         ├─ Toast: "✓ Session created!"
         └─ Navigate to /session/[NEW-ID]
```

---

## 👥 Friend Flow (Regular User)

```
Friend Panel
    │
    ├─── Option 1: Join Existing Session
    │    │
    │    ├─ Input: Session ID
    │    ├─ Click "Join"
    │    └─ Navigate to /session/[ID]
    │
    └─── Option 2: Create New Session
         │
         ├─ Click "Create Session"
         ├─ Auto-creates with Shao Ziyue
         ├─ Toast: "✓ Session created!"
         └─ Navigate to /session/[NEW-ID]
```

---

## 💬 Session Flow (Both Admin & Friend)

```
/session/[ID]
    ↓
Load Session Data
    ├─ Check: User in this session? (name match)
    ├─ Yes → Continue
    └─ No → Error: "Name doesn't match"
    ↓
Check Upload Status
    │
    ├─── User hasn't sent message yet
    │    ↓
    │    Message Input Page
    │    ├─ Textarea (required)
    │    ├─ Enter message
    │    └─ Click "Submit"
    │        ↓
    │        Loading Animation (1 second)
    │        ↓
    │        Save to database
    │        ↓
    │        [Continue to Waiting Room]
    │
    └─── User already sent message
         ↓
         [Go directly to Waiting Room]

Waiting Room
    ├─ My Status
    │   ├─ ✅ Uploaded & Encrypted (if I sent)
    │   └─ ⏳ Waiting... (if I haven't sent)
    │
    ├─ Friend Status
    │   ├─ ✅ Unlocked (if they sent)
    │   └─ ⏳ Waiting for Friend (if they haven't)
    │
    ├─ Messages Display
    │   ├─ Blurred (if not both sent)
    │   └─ Clear (if both sent → UNLOCKED)
    │
    └─ Auto Polling (every 5 seconds)
        ↓
        Check if other person sent
        ↓
        If both sent → Update status → Unblur messages
```

---

## 🔄 Key Routes

| URL | What Happens |
|-----|--------------|
| `/` | Name input → Admin/Friend panel |
| `/session/[ID]` | Load session → Message input OR Waiting room |

---

## 💾 Data Storage

### Browser (localStorage)
```javascript
{
  "messager-user": {
    familyName: "Shao",
    givenName: "Ziyue",
    isShaoZiyue: true
  }
}
```

### Server (SQLite)
```
sessions table:
  - id (UUID)
  - user_a_family_name, user_a_given_name (Shao Ziyue)
  - user_b_family_name, user_b_given_name (Friend)
  - user_a_message, user_b_message (TEXT)
  - user_a_uploaded, user_b_uploaded (0/1)
  - created_at (timestamp)
```

---

## 🎨 UI State Management

All in one HTML file, toggled via JavaScript:

```javascript
Steps (only 1 visible at a time):
  - name-step           → Enter name
  - admin-panel         → All friends (Shao Ziyue only)
  - friend-session-step → Join/Create (Friends only)
  - message-input-step  → Leave message
  - loading-step        → Processing animation
  - status-step         → Waiting room (final state)
```

**Controlled by:** `showStep(stepId)` function

---

## 🔍 Session Unlock Logic

```
State 1: Empty Session
  userAUploaded: 0
  userBUploaded: 0
  → Both see: "Leave a Message"

State 2: Half Unlocked
  userAUploaded: 1
  userBUploaded: 0
  → A sees: Waiting Room (blurred)
  → B sees: "Leave a Message"

State 3: Fully Unlocked
  userAUploaded: 1
  userBUploaded: 1
  → Both see: Waiting Room (clear messages)
```

---

## 🚀 Simplified Features

**Removed (for MVP):**
- ❌ Language selection (was: English/Chinese)
- ❌ File upload (was: text + files)

**Current (English only, text only):**
- ✅ Name-based sessions
- ✅ Text messages only
- ✅ Mutual unlock (both must send)
- ✅ Real-time status updates (5s polling)
- ✅ Single Page App (no page reloads)

---

## 🔧 Dev Mode Features

```javascript
FORCE_SHOW_INPUT = true
```

**Effect:**
- Skips language selection (goes to name)
- Always shows name input (ignores cache for testing)
- Ignores session URL in dev (always shows main panel)
- **Now fixed**: Still loads saved user data

