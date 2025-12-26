// Language and Translations
let currentLanguage = localStorage.getItem('messager-language') || null;

// User Identity
let currentUser = {
  isShao: false,
  friendName: null
};

// Load user identity from localStorage
const savedIdentity = localStorage.getItem('messager-identity');
if (savedIdentity) {
  try {
    currentUser = JSON.parse(savedIdentity);
  } catch (e) {
    console.error('Error parsing saved identity:', e);
  }
}

const translations = {
  en: {
    title: '🔒 Messager',
    subtitle: 'Mutual Message Unlock System',
    createSession: 'Create a New Session',
    createSessionDesc: 'Click below to create a session and get your unique link to share.',
    createBtn: 'Create Session',
    sessionLink: 'Your Session Link:',
    copyBtn: 'Copy',
    shareLink: 'Share this link with User B. Once both of you upload messages, they will be unlocked!',
    uploadMessageA: 'Upload Your Message (User A)',
    uploadMessageB: 'Upload Your Message (User B)',
    textMessage: 'Text Message (optional):',
    textPlaceholder: 'Enter your message here...',
    recordAudioVideo: 'Record Audio/Video:',
    recordAudio: '🎤 Record Audio',
    recordVideo: '🎥 Record Video',
    stopRecording: '⏹ Stop Recording',
    or: 'OR',
    uploadFile: 'Upload File (Text/Audio/Video - optional):',
    uploadBtn: 'Upload Message',
    joinSession: 'Join a Session',
    joinDesc: 'Enter a session ID from the URL (e.g., /session/abc123)',
    sessionIdPlaceholder: 'Enter session ID',
    joinBtn: 'Join Session',
    unlockedMessages: '✨ Unlocked Messages',
    userAMessage: '👤 User A\'s Message',
    userBMessage: '👤 User B\'s Message',
    status: 'Status:',
    uploaded: '✓ Uploaded',
    waiting: '⏳ Waiting',
    uploadToUnlock: 'Upload your message below to unlock!',
    waitingForA: 'Waiting for User A...',
    unlocked: '✨ Messages are unlocked! Scroll down to view.',
    downloadFile: 'Download file:',
    pleaseEnterMessage: 'Please enter a message, record audio/video, or upload a file',
    messageUploaded: 'Message uploaded successfully!',
    waitingForB: 'Waiting for User B...',
    nowUnlocked: 'Messages are now unlocked!'
  },
  zh: {
    title: '🔒 消息解锁',
    subtitle: '双向消息解锁系统',
    createSession: '创建新会话',
    createSessionDesc: '点击下方创建会话并获取您的唯一链接来分享。',
    createBtn: '创建会话',
    sessionLink: '您的会话链接：',
    copyBtn: '复制',
    shareLink: '将此链接分享给用户B。当你们双方都上传消息后，消息将被解锁！',
    uploadMessageA: '上传您的消息（用户A）',
    uploadMessageB: '上传您的消息（用户B）',
    textMessage: '文字消息（可选）：',
    textPlaceholder: '在这里输入您的消息...',
    recordAudioVideo: '录制音频/视频：',
    recordAudio: '🎤 录制音频',
    recordVideo: '🎥 录制视频',
    stopRecording: '⏹ 停止录制',
    or: '或',
    uploadFile: '上传文件（文字/音频/视频 - 可选）：',
    uploadBtn: '上传消息',
    joinSession: '加入会话',
    joinDesc: '从URL输入会话ID（例如：/session/abc123）',
    sessionIdPlaceholder: '输入会话ID',
    joinBtn: '加入会话',
    unlockedMessages: '✨ 已解锁的消息',
    userAMessage: '👤 用户A的消息',
    userBMessage: '👤 用户B的消息',
    status: '状态：',
    uploaded: '✓ 已上传',
    waiting: '⏳ 等待中',
    uploadToUnlock: '在下方上传您的消息以解锁！',
    waitingForA: '等待用户A...',
    unlocked: '✨ 消息已解锁！向下滚动查看。',
    downloadFile: '下载文件：',
    pleaseEnterMessage: '请输入消息、录制音频/视频或上传文件',
    messageUploaded: '消息上传成功！',
    waitingForB: '等待用户B...',
    nowUnlocked: '消息现已解锁！'
  }
};

// Apply translations
function applyTranslations() {
  // Ensure we have a valid language
  if (!currentLanguage || !translations[currentLanguage]) {
    currentLanguage = 'en'; // Fallback to English
  }
  const t = translations[currentLanguage];
  
  // Error checking for critical elements
  const headerH1 = document.querySelector('header h1');
  if (!headerH1) {
    console.error('Header h1 not found!');
    return;
  }
  
  headerH1.textContent = t.title;
  document.querySelector('header .subtitle').textContent = t.subtitle;
  document.querySelector('#create-section h2').textContent = t.createSession;
  document.querySelector('#create-section p').textContent = t.createSessionDesc;
  document.getElementById('create-btn').textContent = t.createBtn;
  document.querySelector('#session-result label').textContent = t.sessionLink;
  document.getElementById('copy-btn').textContent = t.copyBtn;
  document.querySelector('.info-text').textContent = t.shareLink;
  document.querySelectorAll('.upload-section h3')[0].textContent = t.uploadMessageA;
  document.querySelectorAll('label[for*="message"]')[0].textContent = t.textMessage;
  document.querySelectorAll('textarea')[0].placeholder = t.textPlaceholder;
  document.querySelectorAll('.form-group label')[2].textContent = t.recordAudioVideo;
  document.getElementById('user-a-record-audio').textContent = t.recordAudio;
  document.getElementById('user-a-record-video').textContent = t.recordVideo;
  document.querySelectorAll('.or-divider')[0].textContent = t.or;
  document.querySelectorAll('label[for*="file"]')[0].textContent = t.uploadFile;
  document.querySelectorAll('button[type="submit"]')[0].textContent = t.uploadBtn;
  document.querySelector('#join-section h2').textContent = t.joinSession;
  document.querySelector('#join-section p').textContent = t.joinDesc;
  document.getElementById('session-id-input').placeholder = t.sessionIdPlaceholder;
  document.getElementById('join-btn').textContent = t.joinBtn;
  if (document.querySelectorAll('.upload-section h3')[1]) {
    document.querySelectorAll('.upload-section h3')[1].textContent = t.uploadMessageB;
  }
  if (document.querySelectorAll('label[for*="message"]')[1]) {
    document.querySelectorAll('label[for*="message"]')[1].textContent = t.textMessage;
  }
  if (document.querySelectorAll('textarea')[1]) {
    document.querySelectorAll('textarea')[1].placeholder = t.textPlaceholder;
  }
  if (document.getElementById('user-b-record-audio')) {
    document.getElementById('user-b-record-audio').textContent = t.recordAudio;
    document.getElementById('user-b-record-video').textContent = t.recordVideo;
  }
  if (document.querySelectorAll('.or-divider')[1]) {
    document.querySelectorAll('.or-divider')[1].textContent = t.or;
  }
  if (document.querySelectorAll('label[for*="file"]')[1]) {
    document.querySelectorAll('label[for*="file"]')[1].textContent = t.uploadFile;
  }
  if (document.querySelectorAll('button[type="submit"]')[1]) {
    document.querySelectorAll('button[type="submit"]')[1].textContent = t.uploadBtn;
  }
  if (document.getElementById('unlocked-messages-title')) {
    document.getElementById('unlocked-messages-title').textContent = t.unlockedMessages;
  }
}

// Language selection
function initLanguageSelection() {
  const modal = document.getElementById('language-modal');
  const mainContainer = document.getElementById('main-container');
  const langEnBtn = document.getElementById('lang-en');
  const langZhBtn = document.getElementById('lang-zh');
  
  // Error checking - ensure all required elements exist
  if (!modal || !mainContainer || !langEnBtn || !langZhBtn) {
    console.error('Language selection elements not found!');
    // Fallback: use English and show main content
    currentLanguage = 'en';
    if (mainContainer) mainContainer.classList.remove('hidden');
    if (modal) modal.classList.add('hidden');
    if (currentLanguage) applyTranslations();
    return;
  }
  
  // If language already selected, hide modal
  if (currentLanguage && currentLanguage !== '' && currentLanguage !== null) {
    console.log('Language already selected:', currentLanguage);
    modal.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    applyTranslations();
    // Setup buttons immediately - event delegation works regardless of button visibility
    setupRecordingButtons();
    return;
  }
  
  // Ensure modal is visible when no language selected
  console.log('No language selected, showing modal');
  modal.classList.remove('hidden');
  mainContainer.classList.add('hidden');
  
  // Show modal and wait for selection
  // Create a handler function to avoid duplicate listeners
  const handleLanguageSelect = (lang) => {
    console.log('Language selected:', lang); // Debug log
    currentLanguage = lang;
    localStorage.setItem('messager-language', lang);
    
    // Hide modal and show main container
    if (modal) {
      modal.classList.add('hidden');
      console.log('Modal hidden class added'); // Debug log
    }
    if (mainContainer) {
      mainContainer.classList.remove('hidden');
      console.log('Main container shown'); // Debug log
    }
    
    applyTranslations();
    setupRecordingButtons(); // Setup recording buttons after language is selected
  };
  
  // Remove any existing listeners by cloning the buttons
  const newLangEnBtn = langEnBtn.cloneNode(true);
  const newLangZhBtn = langZhBtn.cloneNode(true);
  langEnBtn.parentNode.replaceChild(newLangEnBtn, langEnBtn);
  langZhBtn.parentNode.replaceChild(newLangZhBtn, langZhBtn);
  
  // Add fresh event listeners
  newLangEnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleLanguageSelect('en');
  });
  
  newLangZhBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleLanguageSelect('zh');
  });
}

// Recording functionality
let recordingState = {
  A: { recorder: null, stream: null, blob: null, timer: null, startTime: null },
  B: { recorder: null, stream: null, blob: null, timer: null, startTime: null }
};

// Initialize recording for a user (A or B)
function initRecording(user, type) {
  console.log('initRecording called:', user, type); // Debug
  const isAudio = type === 'audio';
  const prefix = `user-${user}`;
  let recordAudioBtn = document.getElementById(`${prefix}-record-audio`);
  let recordVideoBtn = document.getElementById(`${prefix}-record-video`);
  let statusDiv = document.getElementById(`${prefix}-recording-status`);
  let previewDiv = document.getElementById(`${prefix}-record-preview`);
  let timerSpan = document.getElementById(`${prefix}-timer`);
  
  // Error checking - only check critical elements
  if (!recordAudioBtn || !recordVideoBtn) {
    console.error('Recording buttons not found for user', user);
    const t = translations[currentLanguage] || translations.en;
    alert('Recording buttons not found. Please make sure you have created a session first.');
    return;
  }
  
  // Optional elements - create if missing
  if (!statusDiv) {
    console.warn('Status div not found, creating...');
    const controlsDiv = recordAudioBtn.closest('.recording-controls');
    if (controlsDiv) {
      statusDiv = document.createElement('div');
      statusDiv.id = `${prefix}-recording-status`;
      statusDiv.className = 'recording-status hidden';
      controlsDiv.appendChild(statusDiv);
    }
  }
  if (!previewDiv) {
    console.warn('Preview div not found, creating...');
    const controlsDiv = recordAudioBtn.closest('.recording-controls');
    if (controlsDiv) {
      previewDiv = document.createElement('div');
      previewDiv.id = `${prefix}-record-preview`;
      previewDiv.className = 'record-preview hidden';
      controlsDiv.appendChild(previewDiv);
    }
  }
  if (!timerSpan) {
    console.warn('Timer span not found, creating...');
    if (statusDiv) {
      timerSpan = document.createElement('span');
      timerSpan.id = `${prefix}-timer`;
      timerSpan.className = 'recording-timer';
      timerSpan.textContent = '00:00';
      statusDiv.appendChild(timerSpan);
    } else {
      timerSpan = document.getElementById(`${prefix}-timer`);
    }
  }
  
  // Final safety check - make sure we have at least the buttons
  if (!statusDiv || !previewDiv || !timerSpan) {
    console.warn('Some recording UI elements missing, but continuing with buttons only...');
  }
  
  // Disable buttons
  recordAudioBtn.disabled = true;
  recordVideoBtn.disabled = true;
  
  const constraints = isAudio 
    ? { audio: true }
    : { audio: true, video: { facingMode: 'user' } };
  
  console.log('Requesting media access...'); // Debug
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      console.log('Media access granted'); // Debug
      recordingState[user].stream = stream;
      
      // Create preview
      if (!isAudio) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        previewDiv.innerHTML = '';
        previewDiv.appendChild(video);
        previewDiv.classList.remove('hidden');
      }
      
      // Get MIME type (iOS Safari support)
      let mimeType = isAudio ? 'audio/webm' : 'video/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = isAudio ? 'audio/mp4' : 'video/mp4';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = ''; // Let browser decide
      }
      
      const options = mimeType ? { mimeType } : {};
      const recorder = new MediaRecorder(stream, options);
      recordingState[user].recorder = recorder;
      
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || (isAudio ? 'audio/webm' : 'video/webm') });
        recordingState[user].blob = blob;
        
        // Create preview of recorded media
        previewDiv.innerHTML = '';
        const url = URL.createObjectURL(blob);
        if (isAudio) {
          const audio = document.createElement('audio');
          audio.controls = true;
          audio.src = url;
          previewDiv.appendChild(audio);
        } else {
          const video = document.createElement('video');
          video.controls = true;
          video.src = url;
          previewDiv.appendChild(video);
        }
        previewDiv.classList.remove('hidden');
        
        // Store blob reference
        document.getElementById(`${prefix}-recorded-blob`).dataset.blobUrl = url;
        document.getElementById(`${prefix}-recorded-blob`).dataset.mimeType = blob.type;
        
        // Re-enable buttons
        recordAudioBtn.disabled = false;
        recordVideoBtn.disabled = false;
        
        // Update button text
        const t = translations[currentLanguage] || translations.en;
        if (isAudio) {
          recordAudioBtn.textContent = t.recordAudio;
        } else {
          recordVideoBtn.textContent = t.recordVideo;
        }
      };
      
      // Start recording
      recorder.start();
      recordingState[user].startTime = Date.now();
      statusDiv.classList.remove('hidden');
      
      // Update button
      const t = translations[currentLanguage] || translations.en;
      if (isAudio) {
        recordAudioBtn.textContent = t.stopRecording;
        recordAudioBtn.classList.add('recording');
      } else {
        recordVideoBtn.textContent = t.stopRecording;
        recordVideoBtn.classList.add('recording');
      }
      
      // Start timer
      recordingState[user].timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingState[user].startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }, 1000);
    })
    .catch(err => {
      console.error('Error accessing media:', err);
      const t = translations[currentLanguage] || translations.en;
      const errorMsg = currentLanguage === 'zh' 
        ? '无法访问麦克风/摄像头：' + err.message 
        : 'Error accessing microphone/camera: ' + err.message;
      alert(errorMsg);
      if (recordAudioBtn) recordAudioBtn.disabled = false;
      if (recordVideoBtn) recordVideoBtn.disabled = false;
    });
}

// Stop recording for a user
function stopRecording(user) {
  const prefix = `user-${user}`;
  const state = recordingState[user];
  
  if (state.recorder && state.recorder.state !== 'inactive') {
    state.recorder.stop();
  }
  
  if (state.stream) {
    state.stream.getTracks().forEach(track => track.stop());
    state.stream = null;
    
    // Clear live preview video
    const previewDiv = document.getElementById(`${prefix}-record-preview`);
    if (previewDiv) {
      const video = previewDiv.querySelector('video');
      if (video && video.srcObject) {
        video.srcObject = null;
      }
    }
  }
  
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
  
  const statusDiv = document.getElementById(`${prefix}-recording-status`);
  if (statusDiv) {
    statusDiv.classList.add('hidden');
  }
  
  const recordAudioBtn = document.getElementById(`${prefix}-record-audio`);
  const recordVideoBtn = document.getElementById(`${prefix}-record-video`);
  if (recordAudioBtn) recordAudioBtn.classList.remove('recording');
  if (recordVideoBtn) recordVideoBtn.classList.remove('recording');
}

// Use event delegation for recording buttons (works even if buttons are added dynamically)
let recordingButtonsSetup = false;

function setupRecordingButtons() {
  if (recordingButtonsSetup) {
    console.log('Recording buttons already set up via delegation');
    return;
  }
  
  console.log('Setting up recording buttons with event delegation'); // Debug
  
  // Use event delegation on document body - this works for dynamically added buttons
  document.body.addEventListener('click', (e) => {
    // Check if clicked element is a recording button
    const target = e.target;
    if (!target || !target.id) return;
    
    // User A buttons
    if (target.id === 'user-a-record-audio') {
      e.preventDefault();
      e.stopPropagation();
      console.log('User A audio button clicked'); // Debug
      if (target.classList.contains('recording')) {
        stopRecording('A');
      } else {
        stopRecording('A');
        initRecording('A', 'audio');
      }
      return;
    }
    
    if (target.id === 'user-a-record-video') {
      e.preventDefault();
      e.stopPropagation();
      console.log('User A video button clicked'); // Debug
      if (target.classList.contains('recording')) {
        stopRecording('A');
      } else {
        stopRecording('A');
        initRecording('A', 'video');
      }
      return;
    }
    
    // User B buttons
    if (target.id === 'user-b-record-audio') {
      e.preventDefault();
      e.stopPropagation();
      console.log('User B audio button clicked'); // Debug
      if (target.classList.contains('recording')) {
        stopRecording('B');
      } else {
        stopRecording('B');
        initRecording('B', 'audio');
      }
      return;
    }
    
    if (target.id === 'user-b-record-video') {
      e.preventDefault();
      e.stopPropagation();
      console.log('User B video button clicked'); // Debug
      if (target.classList.contains('recording')) {
        stopRecording('B');
      } else {
        stopRecording('B');
        initRecording('B', 'video');
      }
      return;
    }
  });
  
  recordingButtonsSetup = true;
  console.log('Recording button event delegation set up');
}

// Identity Selection
function initIdentitySelection() {
  const identityShao = document.getElementById('identity-shao');
  const identityFriend = document.getElementById('identity-friend');
  const friendNameInput = document.getElementById('friend-name-input');
  const friendNameField = document.getElementById('friend-name');
  const adminPanel = document.getElementById('admin-panel');
  const createSection = document.getElementById('create-section');
  const joinSection = document.getElementById('join-section');
  
  if (!identityShao || !identityFriend) return;
  
  // If identity already selected, show appropriate UI
  if (currentUser.isShao !== undefined && currentUser.isShao !== null) {
    showUserInterface();
    return;
  }
  
  identityShao.addEventListener('click', () => {
    currentUser.isShao = true;
    currentUser.friendName = null;
    localStorage.setItem('messager-identity', JSON.stringify(currentUser));
    showUserInterface();
  });
  
  identityFriend.addEventListener('click', () => {
    friendNameInput.classList.remove('hidden');
    identityFriend.disabled = true;
    
    friendNameField.addEventListener('blur', () => {
      if (friendNameField.value.trim()) {
        currentUser.isShao = false;
        currentUser.friendName = friendNameField.value.trim();
        localStorage.setItem('messager-identity', JSON.stringify(currentUser));
        showUserInterface();
      }
    });
    
    friendNameField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && friendNameField.value.trim()) {
        currentUser.isShao = false;
        currentUser.friendName = friendNameField.value.trim();
        localStorage.setItem('messager-identity', JSON.stringify(currentUser));
        showUserInterface();
      }
    });
  });
}

function showUserInterface() {
  const identitySection = document.getElementById('identity-section');
  const adminPanel = document.getElementById('admin-panel');
  const createSection = document.getElementById('create-section');
  const joinSection = document.getElementById('join-section');
  
  if (identitySection) identitySection.classList.add('hidden');
  
  if (currentUser.isShao) {
    // Shao Ziyue view - show admin panel and create section
    if (adminPanel) adminPanel.classList.remove('hidden');
    if (createSection) createSection.classList.remove('hidden');
    if (joinSection) joinSection.classList.add('hidden');
    loadAllSessions(); // Load all sessions for admin view
  } else {
    // Friend view - show join section only
    if (adminPanel) adminPanel.classList.add('hidden');
    if (createSection) createSection.classList.remove('hidden'); // Friends can also create sessions
    if (joinSection) joinSection.classList.remove('hidden');
  }
}

// Load all sessions for admin view
async function loadAllSessions() {
  if (!currentUser.isShao) return;
  
  try {
    const response = await fetch('/api/admin/sessions');
    const sessions = await response.json();
    
    const sessionsList = document.getElementById('sessions-list');
    if (!sessionsList) return;
    
    if (sessions.length === 0) {
      sessionsList.innerHTML = '<p>No sessions yet.</p>';
      return;
    }
    
    sessionsList.innerHTML = sessions.map(session => {
      const date = new Date(session.created_at).toLocaleString();
      const status = session.is_unlocked ? '✅ Unlocked' : '⏳ Waiting';
      const createdBy = session.created_by === 'shao' ? 'Shao Ziyue' : (session.friend_name || 'Friend');
      return `
        <div class="session-item" style="padding: 15px; margin-bottom: 10px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>Session:</strong> ${session.id.substring(0, 8)}...<br>
              <strong>Created by:</strong> ${createdBy}<br>
              <strong>Date:</strong> ${date}<br>
              <strong>Status:</strong> ${status}
            </div>
            <a href="/session/${session.id}" class="btn btn-primary" style="text-decoration: none;">View / 查看</a>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
}

// Recording buttons will be initialized after language selection

// Create Session (User A)
document.getElementById('create-btn')?.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        createdBy: currentUser.isShao ? 'shao' : 'friend',
        friendName: currentUser.isShao ? null : currentUser.friendName
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      document.getElementById('session-result').classList.remove('hidden');
      document.getElementById('session-link').value = data.link;
      
      // Store session ID for later use
      window.currentSessionId = data.sessionId;
      
      // Setup recording buttons now that the session-result section is visible
      console.log('Session created, setting up recording buttons...');
      setTimeout(() => {
        setupRecordingButtons();
      }, 100); // Small delay to ensure DOM is updated
    } else {
      alert('Failed to create session: ' + data.error);
    }
  } catch (error) {
    alert('Error creating session: ' + error.message);
  }
});

// Copy link button
document.getElementById('copy-btn').addEventListener('click', () => {
  const linkInput = document.getElementById('session-link');
  linkInput.select();
  document.execCommand('copy');
  
  const btn = document.getElementById('copy-btn');
  const originalText = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => {
    btn.textContent = originalText;
  }, 2000);
});

// User A upload form
document.getElementById('user-a-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Stop any active recording
  stopRecording('A');
  
  const formData = new FormData();
  const message = document.getElementById('user-a-message').value;
  const file = document.getElementById('user-a-file').files[0];
  const recordedBlob = recordingState.A.blob;
  
  if (message) {
    formData.append('message', message);
  }
  
  // Check for recorded media first, then uploaded file
  if (recordedBlob) {
    const recordedInput = document.getElementById('user-a-recorded-blob');
    const mimeType = recordedInput.dataset.mimeType || 'audio/webm';
    const extension = mimeType.includes('video') ? '.webm' : (mimeType.includes('mp4') ? '.mp4' : '.webm');
    const fileName = `recording-${Date.now()}${extension}`;
    formData.append('file', recordedBlob, fileName);
  } else if (file) {
    formData.append('file', file);
  }
  
  // Add user identity
  formData.append('isShao', currentUser.isShao);
  
  if (!message && !recordedBlob && !file) {
    const t = translations[currentLanguage] || translations.en;
    alert(t.pleaseEnterMessage);
    return;
  }
  
  try {
    const response = await fetch(`/api/sessions/${window.currentSessionId}/user-a`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const t = translations[currentLanguage];
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = t.messageUploaded + ' ' + t.waitingForB;
      document.getElementById('user-a-form').appendChild(successDiv);
      
      // Start polling for updates
      startPolling(window.currentSessionId);
    } else {
      alert('Failed to upload message: ' + data.error);
    }
  } catch (error) {
    alert('Error uploading message: ' + error.message);
  }
});

// Join Session (User B)
document.getElementById('join-btn').addEventListener('click', async () => {
  const sessionId = document.getElementById('session-id-input').value.trim();
  
  if (!sessionId) {
    alert('Please enter a session ID');
    return;
  }
  
  window.currentSessionId = sessionId;
  await loadSession(sessionId);
});

// Check if URL contains session ID
window.addEventListener('DOMContentLoaded', () => {
  // Initialize language selection first (this will setup buttons if language already selected)
  initLanguageSelection();
  
  // Initialize identity selection after language is set
  setTimeout(() => {
    initIdentitySelection();
  }, 200);
  
  // Setup refresh button for admin panel
  const refreshBtn = document.getElementById('refresh-sessions-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      loadAllSessions();
    });
  }
  
  // Only setup recording buttons if language was already selected (otherwise wait for selection)
  if (currentLanguage && currentLanguage !== null) {
    setupRecordingButtons();
  }
  
  const path = window.location.pathname;
  const sessionMatch = path.match(/\/session\/([a-f0-9-]+)/i);
  
  if (sessionMatch) {
    const sessionId = sessionMatch[1];
    window.currentSessionId = sessionId;
    const sessionInput = document.getElementById('session-id-input');
    if (sessionInput) {
      sessionInput.value = sessionId;
    }
    // Delay loadSession to ensure translations are applied
    setTimeout(() => loadSession(sessionId), 100);
  }
});

// Load session status
async function loadSession(sessionId) {
  try {
    const response = await fetch(`/api/sessions/${sessionId}`);
    const data = await response.json();
    
    if (response.ok) {
      document.getElementById('join-result').classList.remove('hidden');
      
      const statusDiv = document.getElementById('session-status');
      
      const t = translations[currentLanguage];
      if (data.isUnlocked) {
        statusDiv.innerHTML = `<div class="status-message status-unlocked">${t.unlocked}</div>`;
        displayUnlockedMessages(data);
      } else {
        const userAStatus = data.userAUploaded ? t.uploaded : t.waiting;
        const userBStatus = data.userBUploaded ? t.uploaded : t.waiting;
        
        statusDiv.innerHTML = `
          <div class="status-message status-waiting">
            <strong>${t.status}</strong><br>
            User A: ${userAStatus}<br>
            User B: ${userBStatus}<br>
            ${!data.userBUploaded ? t.uploadToUnlock : t.waitingForA}
          </div>
        `;
      }
      
      // Show upload form if User B hasn't uploaded yet
      if (!data.userBUploaded) {
        document.getElementById('user-b-upload').classList.remove('hidden');
        // Setup recording buttons for User B now that the section is visible
        setupRecordingButtons();
      } else {
        document.getElementById('user-b-upload').classList.add('hidden');
      }
      
      // Start polling if not unlocked
      if (!data.isUnlocked) {
        startPolling(sessionId);
      }
    } else {
      alert('Session not found: ' + data.error);
    }
  } catch (error) {
    alert('Error loading session: ' + error.message);
  }
}

// User B upload form
document.getElementById('user-b-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Stop any active recording
  stopRecording('B');
  
  const formData = new FormData();
  const message = document.getElementById('user-b-message').value;
  const file = document.getElementById('user-b-file').files[0];
  const recordedBlob = recordingState.B.blob;
  
  if (message) {
    formData.append('message', message);
  }
  
  // Check for recorded media first, then uploaded file
  if (recordedBlob) {
    const recordedInput = document.getElementById('user-b-recorded-blob');
    const mimeType = recordedInput.dataset.mimeType || 'audio/webm';
    const extension = mimeType.includes('video') ? '.webm' : (mimeType.includes('mp4') ? '.mp4' : '.webm');
    const fileName = `recording-${Date.now()}${extension}`;
    formData.append('file', recordedBlob, fileName);
  } else if (file) {
    formData.append('file', file);
  }
  
  // Add user identity
  formData.append('isShao', currentUser.isShao);
  
  if (!message && !recordedBlob && !file) {
    const t = translations[currentLanguage] || translations.en;
    alert(t.pleaseEnterMessage);
    return;
  }
  
  try {
    const response = await fetch(`/api/sessions/${window.currentSessionId}/user-b`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (response.ok) {
      const t = translations[currentLanguage];
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = t.messageUploaded + ' ' + t.nowUnlocked;
      document.getElementById('user-b-form').appendChild(successDiv);
      
      // Reload session to show unlocked messages
      setTimeout(() => {
        loadSession(window.currentSessionId);
      }, 1000);
    } else {
      alert('Failed to upload message: ' + data.error);
    }
  } catch (error) {
    alert('Error uploading message: ' + error.message);
  }
});

// Poll for session updates
let pollingInterval = null;

function startPolling(sessionId) {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  
  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      const data = await response.json();
      
      if (data.isUnlocked) {
        clearInterval(pollingInterval);
        pollingInterval = null;
        loadSession(sessionId);
      }
    } catch (error) {
      console.error('Polling error:', error);
    }
  }, 2000); // Poll every 2 seconds
}

// Display unlocked messages
function displayUnlockedMessages(data) {
  const messagesDiv = document.getElementById('unlocked-messages');
  const displayDiv = document.getElementById('message-display');
  
  messagesDiv.classList.remove('hidden');
  displayDiv.innerHTML = '';
  
    const t = translations[currentLanguage];
    
    // User A message
    if (data.userAMessage || data.userAFilePath) {
      const userACard = document.createElement('div');
      userACard.className = 'message-card';
      userACard.innerHTML = `<h4>${t.userAMessage}</h4>`;
    
    if (data.userAMessage) {
      const messageP = document.createElement('p');
      messageP.textContent = data.userAMessage;
      userACard.appendChild(messageP);
    }
    
    if (data.userAFilePath) {
      const fileName = data.userAFilePath.split('/').pop();
      if (data.userAFileType.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = `/api/files/${fileName}`;
        userACard.appendChild(audio);
      } else if (data.userAFileType.startsWith('video/')) {
        const video = document.createElement('video');
        video.controls = true;
        video.src = `/api/files/${fileName}`;
        userACard.appendChild(video);
      } else {
        const t = translations[currentLanguage];
        const link = document.createElement('a');
        link.href = `/api/files/${fileName}`;
        link.target = '_blank';
        link.textContent = `${t.downloadFile} ${fileName}`;
        userACard.appendChild(link);
      }
    }
    
    displayDiv.appendChild(userACard);
  }
  
  // User B message
  if (data.userBMessage || data.userBFilePath) {
    const userBCard = document.createElement('div');
    userBCard.className = 'message-card';
    userBCard.innerHTML = `<h4>${t.userBMessage}</h4>`;
    
    if (data.userBMessage) {
      const messageP = document.createElement('p');
      messageP.textContent = data.userBMessage;
      userBCard.appendChild(messageP);
    }
    
    if (data.userBFilePath) {
      const fileName = data.userBFilePath.split('/').pop();
      if (data.userBFileType.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = `/api/files/${fileName}`;
        userBCard.appendChild(audio);
      } else if (data.userBFileType.startsWith('video/')) {
        const video = document.createElement('video');
        video.controls = true;
        video.src = `/api/files/${fileName}`;
        userBCard.appendChild(video);
      } else {
        const link = document.createElement('a');
        link.href = `/api/files/${fileName}`;
        link.target = '_blank';
        link.textContent = `${t.downloadFile} ${fileName}`;
        userBCard.appendChild(link);
      }
    }
    
    displayDiv.appendChild(userBCard);
  }
}
