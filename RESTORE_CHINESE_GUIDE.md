# How to Restore Chinese Language Support

## What Was Changed (Dec 29, 2025)

Temporarily removed Chinese language for MVP simplification.

**Files modified:**
- `public/script.js` - Language selection disabled, English hardcoded
- `public/index.html` - All Chinese text removed from UI

---

## To Restore:

### 1. In `script.js`:

**Change this:**
```javascript
// TEMPORARY: English only (Chinese removed for MVP, will restore later)
let currentLanguage = 'en';
```

**Back to:**
```javascript
let currentLanguage = FORCE_SHOW_INPUT ? null : (localStorage.getItem('messager-language') || null);
```

---

### 2. Restore `initLanguageSelection()` function:

The full dual-language function is saved in git history (commit before Dec 29, 2025).

Or reconstruct:
- Show language modal on first visit
- Handle English/Chinese button clicks
- Save choice to localStorage
- Apply translations dynamically

---

### 3. In `index.html`:

Restore bilingual text format:
```html
<!-- Before (current) -->
<h1>Enter Your Name</h1>

<!-- After (bilingual) -->
<h1>Enter Your Name / 输入您的姓名</h1>
```

Do this for all user-facing text.

---

### 4. The translations object:

Already preserved in `script.js`:
```javascript
const translations = {
  en: { ... },
  zh: { ... }  // Still exists, just not used
};
```

Just need to re-enable the selection mechanism.

---

## Quick Restoration Checklist:

- [ ] Restore `currentLanguage` initialization logic
- [ ] Restore full `initLanguageSelection()` function
- [ ] Add back bilingual text in HTML (English / 中文)
- [ ] Test language switching
- [ ] Test localStorage persistence

---

**Estimated time to restore:** 15-20 minutes

**All translation strings are preserved** - just need to re-enable the selection UI.

