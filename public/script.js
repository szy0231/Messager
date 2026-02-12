// Language and Translations
// Set to true to always show language/name input (for testing)
// Production: Set to false
const FORCE_SHOW_INPUT = false;

// Set to Chinese by default
let currentLanguage = 'zh';

// Current User
let currentUser = {
  familyName: null,
  givenName: null,
  isShaoZiyue: false,
  pinVerified: false
};

// Load user from localStorage (always load saved user, even in dev mode)
const savedUser = localStorage.getItem('messager-user');
if (savedUser) {
  try {
    currentUser = JSON.parse(savedUser);
    console.log('[INIT] Loaded saved user:', currentUser);
  } catch (e) {
    console.error('Error parsing saved user:', e);
  }
}

const translations = {
  en: {
    title: '🔒 Messager - Shao Ziyue',
    subtitle: 'Personal Message Exchange System',
    nameTitle: 'Enter Your Name',
    familyName: 'Family Name:',
    givenName: 'Given Name:',
    continue: 'Continue',
    back: '← Back',
    adminTitle: '📋 All Friends',
    refresh: 'Refresh',
    friendSessionTitle: 'My Sessions',
    joinTitle: 'Join Session',
    friendSessionDesc: 'Enter your session ID:',
    createNewTitle: 'Create New Session',
    createNewDesc: 'Create a new session to message Shao Ziyue',
    join: 'Join',
    messagesTitle: 'Messages',
    inputTitle: 'Leave a Message',
    messageLabel: 'Message (optional):',
    fileLabel: 'Upload File (optional):',
    send: 'Send',
    waitingForReply: 'Waiting for reply...',
    noSessions: 'No sessions yet.',
    sessionWith: 'Session with',
    unlocked: '✨ Unlocked',
    waiting: '⏳ Waiting',
    view: 'View',
    messageSent: 'Message sent successfully!',
    waitingForOther: 'Waiting for the other person to reply...',
    unlockedNow: '✨ Messages are now unlocked!',
    pleaseEnterName: 'Please enter both family name and given name',
    pleaseEnterMessage: 'Please enter a message or upload a file',
    sessionNotFound: 'Session not found',
    nameNotMatch: 'Name does not match this session',
    downloadFile: 'Download file:',
    currentUser: 'Current User / 当前用户:',
    changeName: 'Change Name / 更改姓名',
    createSessionTitle: 'Create Session with Friend',
    friendFamilyName: 'Friend Family Name:',
    friendGivenName: 'Friend Given Name:',
    create: 'Create'
  },
  zh: {
    title: '🔒 消息解锁 - 邵子越',
    subtitle: '个人消息交换系统',
    nameTitle: '请大声告诉我你是谁！',
    familyName: '姓:',
    givenName: '名:',
    continue: '继续',
    back: '← 返回',
    adminTitle: '📋 所有朋友',
    refresh: '刷新',
    friendSessionTitle: '来到这一步了',
    joinTitle: '加入会话',
    friendSessionDesc: '输入您的会话ID:',
    createNewTitle: '创建新会话',
    createNewDesc: '创建新会话以向邵子越发消息',
    join: '加入',
    messagesTitle: '消息',
    inputTitle: '请抓起笔，挥毫您的文采',
    messageLabel: '消息（可选）:',
    fileLabel: '上传文件（可选）:',
    send: '写完发送！',
    waitingForReply: '等待回复...',
    noSessions: '什么都没有嘞',
    sessionWith: '与会话',
    unlocked: '✨ 已解锁，嘿嘿',
    waiting: '⏳ 等待，嘿嘿',
    view: '查看',
    messageSent: '消息发送成功！',
    waitingForOther: '等待对方回复...',
    unlockedNow: '✨ 消息现已解锁！',
    pleaseEnterName: '请输入姓和名',
    pleaseEnterMessage: '请输入消息或上传文件',
    sessionNotFound: '会话未找到',
    nameNotMatch: '姓名不匹配此会话',
    downloadFile: '下载文件:',
    currentUser: '当前用户:',
    changeName: '更改姓名',
    createSessionTitle: '与朋友创建会话',
    friendFamilyName: '朋友的姓:',
    friendGivenName: '朋友的名:',
    create: '创建'
  }
};

// Helper function to check if name is Shao Ziyue
function isShaoZiyueName(familyName, givenName) {
  const family = (familyName || '').toLowerCase().trim();
  const given = (givenName || '').toLowerCase().trim();
  const fullName = `${family} ${given}`.trim();
  
  return fullName === 'shao ziyue' || 
         fullName === '邵 子越' ||
         (family === 'shao' && given === 'ziyue') ||
         (family === '邵' && given === '子越');
}

// Apply translations
function applyTranslations() {
  if (!currentLanguage || !translations[currentLanguage]) {
    currentLanguage = 'zh';
  }
  const t = translations[currentLanguage];
  
  const elements = {
    'name-title': t.nameTitle,
    'submit-name-btn': t.continue,
    'admin-title': t.adminTitle,
    'friend-session-title': t.friendSessionTitle,
    'join-title': t.joinTitle,
    'create-new-title': t.createNewTitle,
    'input-title': t.inputTitle,
    'file-label': t.fileLabel,
    'submit-message-btn': t.send
  };
  
  Object.entries(elements).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
  
  // Additional translations
  const createSessionTitle = document.getElementById('create-session-title');
  const createBtn = document.getElementById('create-session-btn');
  
  if (createSessionTitle) createSessionTitle.textContent = t.createSessionTitle;
  if (createBtn) createBtn.textContent = t.create;
  
  // Friend section translations
  const joinTitleEl = document.getElementById('join-title');
  const createNewTitleEl = document.getElementById('create-new-title');
  const createNewBtn = document.getElementById('create-new-session-btn');
  
  if (joinTitleEl) joinTitleEl.textContent = t.joinTitle;
  if (createNewTitleEl) createNewTitleEl.textContent = t.createNewTitle;
  if (createNewBtn) createNewBtn.textContent = t.create;
  
  // Change name button translation
  const changeNameBtn = document.getElementById('change-name-btn');
  if (changeNameBtn) changeNameBtn.textContent = t.changeName;
  
  // Update placeholders
  const familyNameInput = document.getElementById('family-name');
  const givenNameInput = document.getElementById('given-name');
  if (familyNameInput) familyNameInput.placeholder = currentLanguage === 'zh' ? '姓' : 'Family Name';
  if (givenNameInput) givenNameInput.placeholder = currentLanguage === 'zh' ? '名' : 'Given Name';
  
  const sessionInput = document.getElementById('session-id-input');
  if (sessionInput) sessionInput.placeholder = currentLanguage === 'zh' ? '会话ID' : 'Session ID';
  
  const messageTextarea = document.getElementById('message-text');
  if (messageTextarea) {
    messageTextarea.placeholder = currentLanguage === 'zh' 
      ? '在这里输入您的消息...' 
      : 'Enter your message here...';
  }
}

// Language selection - Chinese by default
function initLanguageSelection() {
  console.log('[INIT] Language selection skipped - Chinese mode');
  currentLanguage = 'zh';
  
  const modal = document.getElementById('language-modal');
  const mainContainer = document.getElementById('main-container');
  
  // Hide language modal, show main content
  if (modal) modal.classList.add('hidden');
  if (mainContainer) mainContainer.classList.remove('hidden');
  
  applyTranslations();
  initNameSection();
}

// Initialize name section
function initNameSection() {
  console.log('[INIT] initNameSection called');
  console.log('[INIT] currentUser:', currentUser);
  
  // CHECK USER FIRST - if they already have a name and PIN verified, skip to main interface
  if (currentUser.familyName && currentUser.givenName) {
    console.log('[INIT] ✓ User already has name');
    currentUser.isShaoZiyue = isShaoZiyueName(currentUser.familyName, currentUser.givenName);
    
    // Check if PIN is verified (for returning users in same session)
    if (currentUser.pinVerified) {
      console.log('[INIT] ✓ PIN already verified, skipping to main interface');
      showMainInterface();
      return;
    }
    
    // PIN not verified - show PIN input
    console.log('[INIT] PIN not verified, showing PIN input');
    document.getElementById('pin-user-name').textContent = `${currentUser.familyName} ${currentUser.givenName}`;
    showStep('pin-input-step');
    return;  // EXIT EARLY - don't show name input!
  }
  
  // Only reach here if no saved user - now check elements and show name step
  const nameStep = document.getElementById('name-step');
  const nameForm = document.getElementById('name-form');
  
  console.log('[INIT] Name step elements:', {
    nameStep: !!nameStep,
    nameForm: !!nameForm
  });
  
  if (!nameStep || !nameForm) {
    console.error('[INIT] ❌ Name step elements not found!');
    return;
  }
  
  // Show name step
  console.log('[INIT] Showing name input step');
  showStep('name-step');
  
  // Remove existing listener by cloning the form
  const newForm = nameForm.cloneNode(true);
  nameForm.parentNode.replaceChild(newForm, nameForm);
  const newNameForm = document.getElementById('name-form');
  
  console.log('[INIT] Name form listener attached');
  
  newNameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const familyName = document.getElementById('family-name').value.trim();
    const givenName = document.getElementById('given-name').value.trim();
    
    if (!familyName || !givenName) {
      const t = translations[currentLanguage];
      alert(t.pleaseEnterName);
      return;
    }
    
    // Check if user exists
    try {
      const response = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyName, givenName })
      });
      
      const data = await response.json();
      
      // Store name temporarily
      currentUser.familyName = familyName;
      currentUser.givenName = givenName;
      currentUser.isShaoZiyue = data.isShaoZiyue;
      
      if (data.exists) {
        // Existing user - ask for PIN
        document.getElementById('pin-user-name').textContent = `${familyName} ${givenName}`;
        showStep('pin-input-step');
      } else {
        // New user - register and show PIN
        await registerNewUser(familyName, givenName);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      alert('Error connecting to server. Please try again.');
    }
  });
}

// Register new user
async function registerNewUser(familyName, givenName) {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ familyName, givenName })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Show PIN to user
      document.getElementById('displayed-pin').textContent = data.pin;
      showStep('pin-display-step');
    } else {
      alert('Error creating account. Please try again.');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('Error connecting to server. Please try again.');
  }
}

// Verify PIN
async function verifyPIN(familyName, givenName, pin) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ familyName, givenName, pin })
    });
    
    const data = await response.json();
    
    if (data.success) {
      currentUser.pinVerified = true;
      currentUser.isShaoZiyue = data.isShaoZiyue;
      localStorage.setItem('messager-user', JSON.stringify(currentUser));
      showMainInterface();
    } else {
      alert(data.error || 'Incorrect PIN. Please try again or contact Shao Ziyue for help.');
      document.getElementById('pin-input').value = '';
    }
  } catch (error) {
    console.error('Error verifying PIN:', error);
    alert('Error connecting to server. Please try again.');
  }
}

// Load user directory (admin only)
async function loadUserDirectory() {
  if (!currentUser.isShaoZiyue) return;
  
  try {
    const response = await fetch(`/api/users?adminFamilyName=${encodeURIComponent(currentUser.familyName)}&adminGivenName=${encodeURIComponent(currentUser.givenName)}`);
    const data = await response.json();
    
    const usersList = document.getElementById('users-list');
    if (!usersList) return;
    
    if (!data.users || data.users.length === 0) {
      usersList.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 40px;">暂无用户注册。</p>';
      return;
    }
    
    usersList.innerHTML = data.users.map(user => `
      <div class="user-card">
        <div class="user-card-header">
          <div>
            <span class="user-name">${user.family_name} ${user.given_name}</span>
            ${user.family_name === 'Shao' && user.given_name === 'Ziyue' ? '<span class="user-badge">ADMIN</span>' : ''}
          </div>
          <div class="user-pin">${user.pin}</div>
        </div>
        <div class="user-details">
          Registered: ${new Date(user.created_at).toLocaleDateString()}
        </div>
        ${user.family_name !== 'Shao' || user.given_name !== 'Ziyue' ? `
          <div class="user-actions">
            <button class="btn-small" onclick="resetUserPIN(${user.id}, '${user.family_name}', '${user.given_name}')">Reset PIN</button>
            <button class="btn-small" style="color: #dc2626;" onclick="deleteUser(${user.id}, '${user.family_name}', '${user.given_name}')">Delete</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading users:', error);
    alert('Error loading user directory.');
  }
}

// Reset user PIN (admin only)
async function resetUserPIN(userId, familyName, givenName) {
  if (!currentUser.isShaoZiyue) return;
  
  const newPin = prompt(`Enter new 4-digit PIN for ${familyName} ${givenName}:`);
  if (!newPin) return;
  
  if (!/^\d{4}$/.test(newPin)) {
    alert('PIN must be exactly 4 digits.');
    return;
  }
  
  try {
    const response = await fetch(`/api/reset-pin/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminFamilyName: currentUser.familyName,
        adminGivenName: currentUser.givenName,
        newPin
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`PIN reset successfully! New PIN: ${newPin}`);
      loadUserDirectory();
    } else {
      alert(data.error || 'Error resetting PIN.');
    }
  } catch (error) {
    console.error('Error resetting PIN:', error);
    alert('Error connecting to server.');
  }
}

// Delete user (admin only)
async function deleteUser(userId, familyName, givenName) {
  if (!currentUser.isShaoZiyue) return;
  
  if (!confirm(`Delete ${familyName} ${givenName}? This cannot be undone.`)) {
    return;
  }
  
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminFamilyName: currentUser.familyName,
        adminGivenName: currentUser.givenName
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`${familyName} ${givenName} deleted successfully!`);
      loadUserDirectory();
    } else {
      alert(data.error || 'Error deleting user.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('Error connecting to server.');
  }
}

// Show main interface based on user type
function showMainInterface() {
  // Show change name link
  const changeNameBtn = document.getElementById('change-name-btn');
  if (changeNameBtn && currentUser.familyName && currentUser.givenName) {
    changeNameBtn.classList.remove('hidden');
  }
  
  // Hide all steps first
  hideAllSteps();
  
  // Fix friend panel title if it's showing old cached version
  const friendTitle = document.getElementById('friend-session-title');
  if (friendTitle && friendTitle.textContent !== '来到这一步了') {
    friendTitle.textContent = '来到这一步了';
  }
  
  // In dev mode (FORCE_SHOW_INPUT), ignore URL and always go to main panel
  if (FORCE_SHOW_INPUT) {
    console.log('[DEV] FORCE_SHOW_INPUT enabled - ignoring URL state');
    if (currentUser.isShaoZiyue) {
      showStep('admin-panel');
      loadAllSessions();
    } else {
      showStep('friend-session-step');
    }
    return;
  }
  
  // Check if URL has session ID first
  const path = window.location.pathname;
  const sessionMatch = path.match(/\/session\/([a-f0-9-]+)/i);
  
  if (sessionMatch) {
    // User is viewing a session
    const sessionId = sessionMatch[1];
    loadSession(sessionId);
  } else if (currentUser.isShaoZiyue) {
    // Admin view (no session in URL)
    showStep('admin-panel');
    loadAllSessions();
  } else {
    // Friend view (no session in URL)
    showStep('friend-session-step');
    loadFriendSessions();
  }
}

// Utility functions for step navigation
function hideAllSteps() {
  const steps = [
    'name-step',
    'pin-input-step',
    'pin-display-step',
    'admin-panel',
    'user-directory-panel',
    'friend-session-step',
    'message-input-step',
    'loading-step',
    'status-step',
    'success-step'
  ];
  steps.forEach(stepId => {
    const step = document.getElementById(stepId);
    if (step) step.classList.add('hidden');
  });
}

function showStep(stepId) {
  console.log('[UI] showStep called:', stepId);
  hideAllSteps();
  const step = document.getElementById(stepId);
  if (step) {
    step.classList.remove('hidden');
    console.log('[UI] ✓ Step shown:', stepId, 'Element exists:', !!step);
    // Scroll to top
    window.scrollTo(0, 0);
  } else {
    console.error('[UI] ❌ Step not found:', stepId);
  }
}

// Change name function
function changeName() {
  stopPolling();
  window.currentSessionId = null;
  // Clear localStorage
  localStorage.removeItem('messager-user');
  currentUser = {
    familyName: null,
    givenName: null,
    isShaoZiyue: false,
    pinVerified: false
  };
  
  // Clear input fields
  document.getElementById('family-name').value = '';
  document.getElementById('given-name').value = '';
  
  // Show name step
  showStep('name-step');
}

function showNameInput() {
  changeName();
}

// Logout function - clears everything and reloads at root
function logout() {
  console.log('[LOGOUT] Clearing all data and returning to root...');
  
  // Stop any polling
  stopPolling();
  
  // Clear all storage
  localStorage.clear();
  sessionStorage.clear();
  
  // Go to root URL (clear session URL)
  window.location.href = '/';
}

// Go back to panel function - returns to admin or friend panel
function goBackToPanel() {
  console.log('[NAV] Going back to panel...');
  console.log('[NAV] Current user:', currentUser);
  
  // Stop any polling
  if (window.statusPolling) {
    clearInterval(window.statusPolling);
    window.statusPolling = null;
  }
  
  // Clear URL and reset to root
  window.history.pushState({}, '', '/');
  
  // Show appropriate panel based on user identity
  if (currentUser.isShaoZiyue) {
    console.log('[NAV] ✓ Returning to Admin Panel');
    showStep('admin-panel');
    loadAllSessions(); // Refresh sessions list
  } else {
    console.log('[NAV] ✓ Returning to Friend Panel');
    showStep('friend-session-step');
    loadFriendSessions(); // Refresh sessions list
  }
}

// Load all sessions for admin
async function loadAllSessions() {
  try {
    const response = await fetch('/api/admin/sessions');
    const sessions = await response.json();
    
    const sessionsList = document.getElementById('sessions-list');
    if (!sessionsList) return;
    
    const t = translations[currentLanguage];
    
    if (sessions.length === 0) {
      sessionsList.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 32px;">什么都没有嘞</p>`;
      return;
    }
    
    sessionsList.innerHTML = sessions.map(session => {
      const date = new Date(session.created_at).toLocaleString();
      const status = session.isUnlocked ? t.unlocked : t.waiting;
      const friendName = `${session.friendFamilyName} ${session.friendGivenName}`;
      return `
        <div class="session-item">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>${t.sessionWith} ${friendName}</strong><br>
              <small style="color: var(--text-light);">${date}</small><br>
              <strong style="color: ${session.isUnlocked ? 'var(--success)' : 'var(--warning)'};">${status}</strong>
            </div>
            <a href="/session/${session.id}" style="text-decoration: none;">${t.view}</a>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
}

// Load sessions for friend (non-admin user)
async function loadFriendSessions() {
  try {
    const response = await fetch(`/api/my-sessions?familyName=${encodeURIComponent(currentUser.familyName)}&givenName=${encodeURIComponent(currentUser.givenName)}`);
    const sessions = await response.json();
    
    const sessionsList = document.getElementById('friend-sessions-list');
    const createBtn = document.getElementById('create-new-session-btn');
    if (!sessionsList) return;
    
    const t = translations[currentLanguage];
    
    // Show/hide create button based on whether user has sessions
    if (createBtn) {
      if (sessions.length === 0) {
        createBtn.style.display = 'block'; // Show button for first-time users
      } else {
        createBtn.style.display = 'none'; // Hide button - already has session with Shao Ziyue
      }
    }
    
    if (sessions.length === 0) {
      sessionsList.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-light);">
          <p style="font-size: 18px; margin-bottom: 12px;">👋 什么都没有嘞</p>
          <p style="font-size: 14px;">点击下方按钮开始与邵子越的第一次对话</p>
        </div>
      `;
      return;
    }
    
    // Show existing conversation with friendly message
    const session = sessions[0]; // Only one session with Shao Ziyue
    const date = new Date(session.created_at).toLocaleString();
    const partnerName = `${session.partnerFamilyName} ${session.partnerGivenName}`;
    
    let statusText, statusColor, statusEmoji;
    if (session.isUnlocked) {
      statusText = '已解锁';
      statusColor = 'var(--success)';
      statusEmoji = '✨';
    } else if (session.myUploaded && !session.partnerUploaded) {
      statusText = '等待回复';
      statusColor = 'var(--warning)';
      statusEmoji = '⏳';
    } else if (!session.myUploaded && session.partnerUploaded) {
      statusText = '需要回复！';
      statusColor = 'var(--primary)';
      statusEmoji = '💬';
    } else {
      statusText = '发送消息';
      statusColor = 'var(--text-light)';
      statusEmoji = '📝';
    }
    
    sessionsList.innerHTML = `
      <div style="text-align: center; padding: 40px 20px 20px 20px; color: var(--text-light);">
        <p style="font-size: 18px; margin-bottom: 8px; color: var(--text);">
          🎉 嘿，你已经创建过了！
        </p>
        <p style="font-size: 14px; margin-bottom: 32px;">
          与 ${partnerName} 的对话
        </p>
      </div>
      
      <div class="session-item" style="margin-top: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: left;">
            <strong style="font-size: 16px;">与 ${partnerName} 的会话</strong><br>
            <small style="color: var(--text-light);">${date}</small><br>
            <strong style="color: ${statusColor}; display: flex; align-items: center; margin-top: 8px;">
              <span style="font-size: 20px; margin-right: 8px;">${statusEmoji}</span>
              ${statusText}
            </strong>
          </div>
          <a href="/session/${session.id}" class="btn btn-primary" style="text-decoration: none; padding: 12px 24px;">打开</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading friend sessions:', error);
  }
}

// Removed: Join session form - no longer needed with new UX

// Create new session (for friends)
async function createNewSession() {
  console.log('[DEBUG] createNewSession called', { currentUser });
  
  const createBtn = document.getElementById('create-new-session-btn');
  
  // Check if button is already disabled
  if (createBtn && createBtn.disabled) {
    console.log('[DEBUG] Button already disabled, ignoring click');
    return;
  }
  
  // Validate current user has name
  if (!currentUser.familyName || !currentUser.givenName) {
    const t = translations[currentLanguage];
    alert(t.pleaseEnterName);
    return;
  }
  
  // Disable button
  if (createBtn) {
    createBtn.disabled = true;
    const t = translations[currentLanguage];
    createBtn.textContent = '创建中...';
  }
  
  try {
    console.log('[DEBUG] Calling /api/sessions with:', {
      familyName: currentUser.familyName,
      givenName: currentUser.givenName
    });
    
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        familyName: currentUser.familyName,
        givenName: currentUser.givenName
        // No friend name - will auto-create with Shao Ziyue
      })
    });
    
    console.log('[DEBUG] Response status:', response.status, response.ok);
    
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('[DEBUG] Failed to parse JSON:', text);
      throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
    }
    
    console.log('[DEBUG] Response data:', data);
    
    if (response.ok && data.sessionId) {
      console.log('[DEBUG] Success, going directly to session:', data.sessionId);
      // Go directly to session (skip success page)
      window.location.href = `/session/${data.sessionId}`;
      
      // Re-enable button
      if (createBtn) {
        const t = translations[currentLanguage];
        createBtn.disabled = false;
        createBtn.textContent = t.create;
      }
      return;
    } else {
      const errorMsg = data.error || '未知错误';
      console.error('[DEBUG] API error:', { status: response.status, error: errorMsg, data });
      const t = translations[currentLanguage];
      alert(`错误: ${errorMsg}`);
      // Re-enable button
      if (createBtn) {
        const t = translations[currentLanguage];
        createBtn.disabled = false;
        createBtn.textContent = t.create;
      }
    }
  } catch (error) {
    console.error('[DEBUG] Exception in createNewSession:', error);
    const t = translations[currentLanguage];
    alert(`创建会话时出错: ${error.message}`);
    // Re-enable button
    if (createBtn) {
      const t = translations[currentLanguage];
      createBtn.disabled = false;
      createBtn.textContent = t.create;
    }
  }
}

// Load session
async function loadSession(sessionId) {
  const t = translations[currentLanguage];
  
  if (!sessionId) {
    if (currentUser.isShaoZiyue) {
      showStep('admin-panel');
    } else {
      showStep('friend-session-step');
    }
    return;
  }
  
  try {
    const response = await fetch(`/api/sessions/${sessionId}?familyName=${encodeURIComponent(currentUser.familyName)}&givenName=${encodeURIComponent(currentUser.givenName)}`);
    
    if (response.status === 403) {
      alert(t.nameNotMatch);
      if (currentUser.isShaoZiyue) {
        showStep('admin-panel');
      } else {
        showStep('friend-session-step');
      }
      return;
    }
    
    if (!response.ok) {
      alert(t.sessionNotFound);
      if (currentUser.isShaoZiyue) {
        showStep('admin-panel');
      } else {
        showStep('friend-session-step');
      }
      return;
    }
    
    const data = await response.json();
    window.currentSessionId = sessionId;
    
    // Determine if current user has sent message
    const isUserA = data.isUserA;
    const userHasSent = isUserA ? data.userAUploaded : data.userBUploaded;
    
    if (!userHasSent) {
      // Show message input interface
      showStep('message-input-step');
    } else {
      // Show status interface
      showStatusInterface(data);
    }
  } catch (error) {
    console.error('Error loading session:', error);
    alert(t.sessionNotFound);
    if (currentUser.isShaoZiyue) {
      showStep('admin-panel');
    } else {
      showStep('friend-session-step');
    }
  }
}

// Show status interface (waiting room)
function showStatusInterface(data) {
  showStep('status-step');
  updateStatusDashboard(data);
  
  // If unlocked, show messages without blur and celebration
  if (data.isUnlocked) {
    displayMessages(data);
    const messagesDisplay = document.getElementById('messages-display');
    messagesDisplay.classList.remove('blurred');
    
    // Show unlock celebration message
    const blurOverlay = messagesDisplay.querySelector('.blur-overlay');
    if (blurOverlay) {
      blurOverlay.innerHTML = '<p class="blur-text" style="color: var(--success); font-weight: bold;">🎊 双方消息已解锁！现在可以查看啦～</p>';
      // Hide overlay after a moment
      setTimeout(() => {
        blurOverlay.style.opacity = '0';
        setTimeout(() => blurOverlay.style.display = 'none', 500);
      }, 2000);
    }
  } else {
    // Show messages if available but keep blurred
    if (data.userAMessage || data.userBMessage) {
      displayMessages(data);
    }
    const messagesDisplay = document.getElementById('messages-display');
    messagesDisplay.classList.add('blurred');
  }
  
  // Start polling if not unlocked
  if (!data.isUnlocked) {
    startPolling(window.currentSessionId);
  }
}

// Update status dashboard
function updateStatusDashboard(data) {
  const t = translations[currentLanguage];
  const isUserA = data.isUserA;
  
  // Get names
  const myName = isUserA 
    ? `${data.userAFamilyName} ${data.userAGivenName}`
    : `${data.userBFamilyName} ${data.userBGivenName}`;
  const friendName = isUserA
    ? `${data.userBFamilyName} ${data.userBGivenName}`
    : `${data.userAFamilyName} ${data.userAGivenName}`;
  
  // Update main title based on unlock status
  const mainTitle = document.querySelector('#status-step .step-title');
  if (mainTitle) {
    if (data.isUnlocked) {
      mainTitle.textContent = '🎉 解锁成功！';
      mainTitle.style.color = 'var(--success)';
    } else {
      mainTitle.textContent = '等待室';
      mainTitle.style.color = '';
    }
  }
  
  // Update titles
  const myStatusTitle = document.getElementById('my-status-title');
  const theirStatusTitle = document.getElementById('their-status-title');
  if (myStatusTitle) myStatusTitle.textContent = '我';
  if (theirStatusTitle) theirStatusTitle.textContent = friendName;
  
  // My status
  const myStatus = document.getElementById('my-status');
  const myStatusText = document.getElementById('my-status-text');
  
  if (myStatus && myStatusText) {
    const myCheckmark = myStatus.querySelector('.status-checkmark');
    const myPulse = myStatus.querySelector('.status-pulse');
    const myHasSent = isUserA ? data.userAUploaded : data.userBUploaded;
    
    if (myHasSent) {
      myStatus.classList.add('complete');
      if (myCheckmark) myCheckmark.classList.remove('hidden');
      if (myPulse) myPulse.style.display = 'none';
      myStatusText.textContent = '✅ 已上传 & 加密';
    } else {
      myStatus.classList.remove('complete');
      if (myCheckmark) myCheckmark.classList.add('hidden');
      if (myPulse) myPulse.style.display = 'block';
      myStatusText.textContent = '⏳ 等待中...';
    }
  }
  
  // Their status
  const theirStatus = document.getElementById('their-status');
  const theirStatusText = document.getElementById('their-status-text');
  
  if (theirStatus && theirStatusText) {
    const theirCheckmark = theirStatus.querySelector('.status-checkmark');
    const theirPulse = theirStatus.querySelector('.status-pulse');
    const theirHasSent = isUserA ? data.userBUploaded : data.userAUploaded;
    
    if (theirHasSent) {
      theirStatus.classList.add('complete');
      if (theirCheckmark) theirCheckmark.classList.remove('hidden');
      if (theirPulse) theirPulse.style.display = 'none';
      theirStatusText.textContent = '✅ 已解锁';
    } else {
      theirStatus.classList.remove('complete');
      if (theirCheckmark) theirCheckmark.classList.add('hidden');
      if (theirPulse) theirPulse.style.display = 'block';
      theirStatusText.textContent = `⏳ 等待 ${friendName}...`;
    }
  }
}

// Display messages (TEXT ONLY - simplified)
function displayMessages(data) {
  const displayContent = document.getElementById('message-display-content');
  if (!displayContent) return;
  displayContent.innerHTML = '';
  
  // User A message
  if (data.userAMessage) {
    const userACard = document.createElement('div');
    userACard.className = 'message-card';
    userACard.innerHTML = `
      <h4>${data.userAFamilyName} ${data.userAGivenName}:</h4>
      <p>${data.userAMessage}</p>
    `;
    displayContent.appendChild(userACard);
  }
  
  // User B message
  if (data.userBMessage) {
    const userBCard = document.createElement('div');
    userBCard.className = 'message-card';
    userBCard.innerHTML = `
      <h4>${data.userBFamilyName} ${data.userBGivenName}:</h4>
      <p>${data.userBMessage}</p>
    `;
    displayContent.appendChild(userBCard);
  }
}

// Message form submission
document.getElementById('message-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const t = translations[currentLanguage];
  const message = document.getElementById('message-text').value.trim();
  
  if (!message) {
    alert(t.pleaseEnterMessage);
    return;
  }
  
  if (!window.currentSessionId) {
    alert(t.sessionNotFound);
    return;
  }
  
  // Show loading animation
  const submitBtn = document.getElementById('submit-message-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.classList.add('hidden');
  if (btnLoading) btnLoading.classList.remove('hidden');
  
  showStep('loading-step');
  
  try {
    const response = await fetch(`/api/sessions/${window.currentSessionId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        familyName: currentUser.familyName,
        givenName: currentUser.givenName,
        message: message
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Small delay for smooth transition animation
      setTimeout(() => {
        loadSession(window.currentSessionId);
      }, 1000);
    } else {
      // Reset button state
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.classList.remove('hidden');
      if (btnLoading) btnLoading.classList.add('hidden');
      showStep('message-input-step');
      alert('错误: ' + (data.error || '发送消息失败'));
    }
  } catch (error) {
    console.error('Error sending message:', error);
    // Reset button state
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.classList.remove('hidden');
    if (btnLoading) btnLoading.classList.add('hidden');
    showStep('message-input-step');
    alert('Error sending message: ' + error.message);
  }
});

// Create session with friend (for Shao Ziyue)
async function createSessionWithFriend() {
  console.log('[DEBUG] createSessionWithFriend called');
  const createBtn = document.getElementById('create-session-btn');
  
  // Check if button is already disabled (prevent double-click)
  if (createBtn && createBtn.disabled) {
    console.log('[DEBUG] Button already disabled, ignoring click');
    return;
  }
  
  const t = translations[currentLanguage];
  const friendFamilyNameInput = document.getElementById('friend-family-name');
  const friendGivenNameInput = document.getElementById('friend-given-name');
  
  if (!friendFamilyNameInput || !friendGivenNameInput) {
    console.error('[DEBUG] Form inputs not found!');
    alert('错误: 找不到表单输入框');
    return;
  }
  
  const friendFamilyName = friendFamilyNameInput.value.trim();
  const friendGivenName = friendGivenNameInput.value.trim();
  console.log('[DEBUG] Friend names:', { friendFamilyName, friendGivenName });
  
  if (!friendFamilyName || !friendGivenName) {
    alert(t.pleaseEnterName);
    return;
  }
  
  // Disable button to prevent multiple clicks
  if (createBtn) {
    createBtn.disabled = true;
    createBtn.textContent = '创建中...';
  }
  
  try {
    const response = await fetch('/api/find-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friendFamilyName,
        friendGivenName
      })
    });
    
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('[DEBUG] Failed to parse JSON:', text);
      throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
    }
    
    console.log('[DEBUG] Response data:', { ok: response.ok, status: response.status, data });
    
    if (response.ok && data.sessionId) {
      // Go directly to session (skip success page)
      window.location.href = `/session/${data.sessionId}`;
      
      // Clear form
      friendFamilyNameInput.value = '';
      friendGivenNameInput.value = '';
      
      // Re-enable button
      if (createBtn) {
        createBtn.disabled = false;
        createBtn.textContent = t.create;
      }
      return;
    } else {
      console.error('[DEBUG] API error:', { status: response.status, ok: response.ok, data });
      const errorMsg = data.error || (data.sessionId ? '响应中缺少会话ID' : '未知错误');
      alert(`错误: ${errorMsg}`);
      // Re-enable button on error
      if (createBtn) {
        createBtn.disabled = false;
        createBtn.textContent = t.create;
      }
    }
  } catch (error) {
    console.error('[DEBUG] Exception in createSessionWithFriend:', error);
    alert(currentLanguage === 'zh' ? `创建会话时出错: ${error.message}` : `Error creating session: ${error.message}`);
    // Re-enable button on error
    if (createBtn) {
      createBtn.disabled = false;
      createBtn.textContent = t.create;
    }
  }
}

// Polling for status updates
let pollingInterval = null;

function startPolling(sessionId) {
  // Clear existing polling
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  
  // Poll every 5 seconds (optimized from 3s)
  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}?familyName=${encodeURIComponent(currentUser.familyName)}&givenName=${encodeURIComponent(currentUser.givenName)}`);
      if (response.ok) {
        const data = await response.json();
        updateStatusDashboard(data);
        
        // If unlocked, stop polling and refresh display
        if (data.isUnlocked) {
          clearInterval(pollingInterval);
          pollingInterval = null;
          showStatusInterface(data);
        }
      }
    } catch (error) {
      console.error('Polling error:', error);
    }
  }, 5000); // Changed from 3000ms to 5000ms
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

// Copy session link to clipboard with notification
function copySessionLink(sessionId) {
  const link = `${window.location.origin}/session/${sessionId}`;
  
  navigator.clipboard.writeText(link).then(() => {
    showToast(currentLanguage === 'zh' ? '✓ 链接已复制！' : '✓ Link copied!');
  }).catch(err => {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    showToast(currentLanguage === 'zh' ? '请手动复制链接' : 'Please copy link manually');
  });
}

// Show toast notification
function showToast(message, duration = 3000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Show session created notification with copy link
function showSessionCreatedNotification(sessionId) {
  const t = translations[currentLanguage];
  const message = currentLanguage === 'zh' 
    ? '✓ 会话创建成功！正在跳转...' 
    : '✓ Session created! Redirecting...';
  
  showToast(message, 2000);
  
  // Also log the link for easy access
  const link = `${window.location.origin}/session/${sessionId}`;
  console.log('[SESSION] Created:', link);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('[INIT] ========================================');
  console.log('[INIT] DOMContentLoaded - Starting initialization');
  console.log('[INIT] localStorage check:', {
    language: localStorage.getItem('messager-language'),
    user: localStorage.getItem('messager-user')
  });
  console.log('[INIT] ========================================');
  
  initLanguageSelection();
  
  // Create session form for admin
  const createSessionForm = document.getElementById('create-session-form');
  if (createSessionForm) {
    createSessionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      createSessionWithFriend();
    });
  }
  
  // Create new session button for friends
  document.getElementById('create-new-session-btn')?.addEventListener('click', () => {
    createNewSession();
  });
  
  // Change name button
  document.getElementById('change-name-btn')?.addEventListener('click', () => {
    changeName();
  });
  
  // Logout buttons (admin and friend)
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
  });
  
  document.getElementById('logout-btn-friend')?.addEventListener('click', () => {
    logout();
  });
  
  document.getElementById('logout-btn-message')?.addEventListener('click', () => {
    logout();
  });
  
  document.getElementById('logout-btn-status')?.addEventListener('click', () => {
    logout();
  });
  
  // Back button - returns to admin/friend panel
  document.getElementById('back-to-panel-btn')?.addEventListener('click', () => {
    goBackToPanel();
  });
  
  // PIN form submission
  document.getElementById('pin-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pin = document.getElementById('pin-input').value.trim();
    if (pin.length !== 4) {
      alert('Please enter a 4-digit PIN');
      return;
    }
    await verifyPIN(currentUser.familyName, currentUser.givenName, pin);
  });
  
  // Back to name button from PIN input
  document.getElementById('back-to-name-btn')?.addEventListener('click', () => {
    showNameInput();
  });
  
  // PIN display understood button
  document.getElementById('pin-understood-btn')?.addEventListener('click', () => {
    currentUser.pinVerified = true;
    localStorage.setItem('messager-user', JSON.stringify(currentUser));
    showMainInterface();
  });
  
  // User Directory button (admin only)
  document.getElementById('user-directory-btn')?.addEventListener('click', () => {
    loadUserDirectory();
    showStep('user-directory-panel');
  });
  
  // Back to admin from user directory
  document.getElementById('back-to-admin-btn')?.addEventListener('click', () => {
    showMainInterface();
  });
  
  // Logout from user directory
  document.getElementById('logout-btn-directory')?.addEventListener('click', () => {
    logout();
  });
  
  // Success page buttons
  document.getElementById('goto-session-btn')?.addEventListener('click', () => {
    const sessionId = document.getElementById('success-session-id').textContent;
    if (sessionId) {
      window.location.hash = `#session/${sessionId}`;
      loadSession(sessionId);
    }
  });
  
  document.getElementById('back-to-dashboard-btn')?.addEventListener('click', () => {
    showMainInterface();
  });
  
  // View all sessions button - returns to panel from waiting room
  document.getElementById('view-all-sessions-btn')?.addEventListener('click', () => {
    goBackToPanel();
  });
});
