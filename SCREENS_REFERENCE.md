# Messager - Screens Reference

## 📱 All Screens

| ID | Name | Code | Who Uses |
|----|------|------|----------|
| S01 | Name Input | `name-step` | Everyone |
| S02 | PIN Login | `pin-input-step` | Existing users |
| S03 | PIN Display | `pin-display-step` | New users |
| S04 | Admin Panel | `admin-panel` | Shao Ziyue |
| S05 | Friend Panel | `friend-session-step` | Friends |
| S06 | User Directory | `user-directory-panel` | Admin only |
| S07 | Message Input | `message-input-step` | Everyone |
| S08 | Loading | `loading-step` | Everyone |
| S09 | Waiting Room | `status-step` | Everyone |
| S10 | Success | `success-step` | Everyone |

---

## 🔄 Simple Flow

```
New User:
S01 → S03 → S05 → S07 → S08 → S09

Returning User:
S01 → S02 → S05 → S09

Admin:
S01 → S02 → S04 → S07 → S08 → S09
```

---

## 🎯 S09 States (Waiting Room)

| My Status | Friend Status | What You See |
|-----------|---------------|--------------|
| Not sent | Not sent | Go to S07 (compose) |
| Sent ✅ | Not sent | Waiting... (blurred) |
| Sent ✅ | Sent ✅ | UNLOCKED! ✨ |

---

## 💡 Quick Reference

**To check current screen:**
```javascript
// In browser console (F12)
document.querySelector('.step-container:not(.hidden)').id
```

**Admin PIN:** `0233`
