// SFS Chat Widget — self-contained, injects CSS + HTML
(function() {
  // ── CSS ──
  const style = document.createElement('style');
  style.textContent = `
    .chat-widget {
      position: fixed; bottom: 24px; right: 24px;
      z-index: 1000; font-family: 'DM Sans', sans-serif;
    }
    .chat-toggle {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--navy, #2B3668); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(43,54,104,0.35), 0 1px 4px rgba(43,54,104,0.2);
      transition: transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 300ms;
      color: #F8F7F4; position: relative; margin-left: auto;
    }
    .chat-toggle:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(43,54,104,0.4); }
    .chat-toggle:active { transform: translateY(0); }
    .chat-icon, .chat-icon-close { position: absolute; transition: opacity 200ms, transform 200ms; }
    .chat-icon-close { opacity: 0; transform: rotate(-90deg); }
    .chat-widget.open .chat-icon { opacity: 0; transform: rotate(90deg); }
    .chat-widget.open .chat-icon-close { opacity: 1; transform: rotate(0); }
    .chat-notif {
      position: absolute; top: -2px; right: -2px;
      width: 12px; height: 12px;
      background: var(--gold, #B8972E); border-radius: 50%;
      border: 2px solid #F8F7F4;
    }
    .chat-widget.open .chat-notif { display: none; }
    .chat-panel {
      position: absolute; bottom: 68px; right: 0; width: 360px;
      background: #F8F7F4; border-radius: 12px;
      box-shadow: 0 8px 40px rgba(43,54,104,0.18), 0 2px 8px rgba(43,54,104,0.1);
      overflow: hidden; display: flex; flex-direction: column;
      opacity: 0; transform: translateY(16px) scale(0.97); pointer-events: none;
      transition: opacity 250ms cubic-bezier(0.25,0.46,0.45,0.94), transform 250ms cubic-bezier(0.25,0.46,0.45,0.94);
      transform-origin: bottom right;
    }
    .chat-widget.open .chat-panel { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .chat-header {
      background: linear-gradient(135deg, #1E2748 0%, #2B3668 100%);
      padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
    }
    .chat-header-info { display: flex; align-items: center; gap: 12px; }
    .chat-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(184,151,46,0.18); border: 1.5px solid rgba(184,151,46,0.45);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600;
      color: #D4AE4A; letter-spacing: 0.05em; flex-shrink: 0;
    }
    .chat-header-name { font-size: 14px; font-weight: 600; color: #F8F7F4; }
    .chat-header-status { font-size: 11px; color: rgba(248,247,244,0.55); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .chat-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #5BCB8A; flex-shrink: 0; }
    .chat-close-btn { background: none; border: none; cursor: pointer; color: rgba(248,247,244,0.5); padding: 4px; display: flex; align-items: center; border-radius: 4px; transition: color 200ms; }
    .chat-close-btn:hover { color: #F8F7F4; }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 260px; max-height: 300px; background: #F0EFEB;
    }
    .chat-messages::-webkit-scrollbar { width: 3px; }
    .chat-messages::-webkit-scrollbar-thumb { background: rgba(43,54,104,0.15); border-radius: 2px; }
    .chat-msg { display: flex; gap: 7px; align-items: flex-end; max-width: 90%; }
    .chat-msg--bot { align-self: flex-start; }
    .chat-msg--user { align-self: flex-end; flex-direction: row-reverse; }
    .chat-msg-avatar {
      width: 24px; height: 24px; border-radius: 50%;
      background: rgba(43,54,104,0.1); border: 1px solid rgba(43,54,104,0.15);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', serif; font-size: 8px; font-weight: 600;
      color: #2B3668; flex-shrink: 0;
    }
    .chat-msg-bubble { padding: 9px 13px; border-radius: 12px; font-size: 13px; line-height: 1.55; white-space: pre-wrap; }
    .chat-msg--bot .chat-msg-bubble {
      background: #fff; color: #1A1A2E; border-bottom-left-radius: 3px;
      border: 1px solid rgba(43,54,104,0.07); box-shadow: 0 1px 3px rgba(43,54,104,0.05);
    }
    .chat-msg--user .chat-msg-bubble { background: #2B3668; color: #F8F7F4; border-bottom-right-radius: 3px; }
    .chat-typing { display: flex; align-items: flex-end; gap: 7px; align-self: flex-start; }
    .chat-typing-dots {
      background: #fff; border: 1px solid rgba(43,54,104,0.07);
      border-radius: 12px; border-bottom-left-radius: 3px;
      padding: 10px 14px; display: flex; gap: 4px; align-items: center;
    }
    .chat-typing-dots span { width: 5px; height: 5px; border-radius: 50%; background: rgba(43,54,104,0.3); animation: cwTypingDot 1.2s infinite; }
    .chat-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .chat-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cwTypingDot {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 1; }
    }
    .chat-quick-replies { padding: 10px 14px 0; display: flex; flex-wrap: wrap; gap: 6px; background: #F8F7F4; }
    .chat-quick-btn {
      padding: 5px 11px; background: transparent;
      border: 1px solid rgba(43,54,104,0.22); border-radius: 14px;
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
      color: #2B3668; cursor: pointer; white-space: nowrap;
      transition: background 200ms, border-color 200ms, color 200ms;
    }
    .chat-quick-btn:hover { background: #2B3668; border-color: #2B3668; color: #F8F7F4; }
    .chat-input-area { background: #F8F7F4; border-top: 1px solid rgba(43,54,104,0.08); padding: 10px 14px 14px; }
    .chat-input-row { display: flex; gap: 8px; align-items: center; margin-top: 10px; }
    .chat-input {
      flex: 1; padding: 9px 13px; border: 1px solid rgba(43,54,104,0.18); border-radius: 8px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1A1A2E;
      background: #fff; outline: none; transition: border-color 200ms;
    }
    .chat-input:focus { border-color: #2B3668; }
    .chat-input::placeholder { color: rgba(74,74,106,0.4); }
    .chat-send-btn {
      width: 34px; height: 34px; background: #2B3668; border: none;
      border-radius: 8px; cursor: pointer; display: flex; align-items: center;
      justify-content: center; color: #F8F7F4; flex-shrink: 0;
      transition: background 200ms, transform 200ms;
    }
    .chat-send-btn:hover { background: #1E2748; transform: translateY(-1px); }
    .chat-send-btn:active { transform: translateY(0); }
    @media (max-width: 640px) {
      .chat-widget { bottom: 16px; right: 16px; }
      .chat-panel { width: calc(100vw - 32px); }
    }
  `;
  document.head.appendChild(style);

  // ── HTML ──
  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.id = 'chatWidget';
  widget.innerHTML = `
    <div class="chat-panel" id="chatPanel">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">SFS</div>
          <div>
            <div class="chat-header-name">SFS Assistant</div>
            <div class="chat-header-status"><div class="chat-status-dot"></div> Online</div>
          </div>
        </div>
        <button class="chat-close-btn" id="chatClose" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-quick-replies" id="chatQuickReplies"></div>
      <div class="chat-input-area">
        <div class="chat-input-row">
          <input type="text" class="chat-input" id="chatInput" placeholder="Type a message…" autocomplete="off" />
          <button class="chat-send-btn" id="chatSend" aria-label="Send">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
    <button class="chat-toggle" id="chatToggle" aria-label="Open chat">
      <div class="chat-notif"></div>
      <svg class="chat-icon" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M19 3H3a1 1 0 00-1 1v11a1 1 0 001 1h3v3l4-3h9a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      <svg class="chat-icon-close" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  `;
  document.body.appendChild(widget);

  // ── LOGIC ──
  const toggle   = document.getElementById('chatToggle');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const quickReplies = document.getElementById('chatQuickReplies');
  const input    = document.getElementById('chatInput');
  const sendBtn  = document.getElementById('chatSend');
  let opened = false;

  const responses = [
    { keywords:['service','offer','provide','what do','what can'],
      text:'We offer four core services:\n\n• Bookkeeping — clean, current books every month\n• Tax Preparation — individual & business returns\n• Financial Reporting — P&L, balance sheets, cash flow\n• Business Advisory — strategy, forecasting, outsourced CFO\n\nWhich would you like to know more about?',
      quick:['Bookkeeping','Tax Preparation','Pricing','Get Started'] },
    { keywords:['bookkeep','reconcil'],
      text:'Our Bookkeeping service includes:\n\n• Monthly transaction categorization\n• Bank & credit card reconciliation\n• Accounts payable & receivable\n• Monthly financial close\n• Secure real-time dashboard access\n\nDelivered every month, on time.',
      quick:['Pricing','Get Started','Other Services'] },
    { keywords:['tax','return','filing','deduct','1099','estimated'],
      text:'We handle all aspects of tax:\n\n• Individual & business tax returns\n• Quarterly estimated payments\n• Year-round tax planning & strategy\n• IRS correspondence & representation\n• Multi-state filing\n\nWe\'re your advisor every month — not just at tax season.',
      quick:['IRS Representation','Pricing','Get Started'] },
    { keywords:['irs','audit','represent','notice','letter'],
      text:'Yes — we provide full IRS representation. If the IRS comes knocking, we stand with you — not behind you.\n\nWe handle all correspondence, audits, and notices on your behalf.',
      quick:['Our Services','Get Started'] },
    { keywords:['report','p&l','balance sheet','cash flow','statement','kpi'],
      text:'Our Financial Reporting includes:\n\n• Monthly profit & loss statements\n• Balance sheet preparation\n• Cash flow statements\n• Custom KPI dashboards\n• Year-end financial packages\n• Investor & lender-ready reports',
      quick:['Pricing','Get Started','Other Services'] },
    { keywords:['advisor','advisory','advice','strategy','cfo','forecast','budget','grow','entity'],
      text:'Our Business Advisory service includes:\n\n• Business structure & entity setup\n• Budgeting & cash flow forecasting\n• Growth strategy & financial planning\n• Payroll setup & management\n• Outsourced CFO support\n\nThink of us as your part-time CFO.',
      quick:['Pricing','Get Started','Other Services'] },
    { keywords:['price','cost','much','fee','charge','pricing','rate','afford','pay','plan'],
      text:'We use fixed monthly pricing — no surprise invoices, ever. You know exactly what you pay before we start.\n\nPricing is tailored to your business size and needs. The best first step is a free consultation — no commitment required.',
      quick:['Schedule Free Consultation','Our Services'] },
    { keywords:['start','begin','sign up','hire','work with','onboard','join'],
      text:'Getting started is simple:\n\n1. Schedule a free consultation\n2. We assess your needs\n3. We onboard you & get set up\n4. You get clean books and peace of mind\n\nThe first step takes about 30 minutes and there\'s no commitment.',
      quick:['Schedule Free Consultation','Our Services'] },
    { keywords:['contact','reach','phone','email','call','talk','speak'],
      text:'You can reach us through our contact page or by scheduling a free consultation.\n\nWe guarantee a same-day response during business hours.',
      quick:['Go to Contact Page','Schedule Free Consultation'] },
    { keywords:['about','who are','sfs','secured','firm','cpa','certified'],
      text:'Secured Financial Services (SFS) is a Certified Public Accounting firm serving small businesses and individuals.\n\nOur tagline: Clarity. Compliance. Confidence.\n\nWe\'re not just your accountants — we\'re your financial partner, year-round.',
      quick:['Our Services','Get Started'] },
    { keywords:['hour','open','available','response','quick','fast'],
      text:'We\'re available during regular business hours and guarantee a same-day response to all inquiries.',
      quick:['Contact Us','Schedule Free Consultation'] },
  ];

  function addMsg(text, isBot) {
    const d = document.createElement('div');
    d.className = 'chat-msg chat-msg--' + (isBot ? 'bot' : 'user');
    d.innerHTML = isBot
      ? `<div class="chat-msg-avatar">SFS</div><div class="chat-msg-bubble">${text.replace(/\n/g,'<br>')}</div>`
      : `<div class="chat-msg-bubble">${text}</div>`;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chat-typing'; t.id = 'chatTyping';
    t.innerHTML = '<div class="chat-msg-avatar">SFS</div><div class="chat-typing-dots"><span></span><span></span><span></span></div>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    return t;
  }

  function setQuick(list) {
    quickReplies.innerHTML = '';
    (list || []).forEach(label => {
      const b = document.createElement('button');
      b.className = 'chat-quick-btn'; b.textContent = label;
      b.addEventListener('click', () => handleQuick(label));
      quickReplies.appendChild(b);
    });
  }

  function handleQuick(label) {
    if (label === 'Go to Contact Page' || label === 'Schedule Free Consultation') {
      window.location.href = 'contact.html'; return;
    }
    if (label === 'Meet the Team') { window.location.href = 'about.html'; return; }
    if (label === 'Other Services') { addMsg(label, false); setQuick([]); respond('What services do you offer?'); return; }
    addMsg(label, false); setQuick([]); respond(label);
  }

  function respond(text) {
    const t = showTyping();
    const lower = text.toLowerCase();
    let matched = null;
    for (const r of responses) {
      if (r.keywords.some(k => lower.includes(k))) { matched = r; break; }
    }
    setTimeout(() => {
      t.remove();
      if (matched) { addMsg(matched.text, true); setQuick(matched.quick); }
      else { addMsg("I'm not sure about that, but I can help with these topics:", true); setQuick(['Our Services','Pricing','Get Started','Contact Us']); }
    }, 800 + Math.random() * 500);
  }

  function openChat() {
    widget.classList.add('open');
    if (!opened) {
      opened = true;
      setTimeout(() => {
        const t = showTyping();
        setTimeout(() => {
          t.remove();
          addMsg("Hi there! I'm the SFS virtual assistant. How can I help you today?", true);
          setQuick(['Our Services','Pricing','Get Started','Contact Us']);
        }, 900);
      }, 200);
    }
  }

  toggle.addEventListener('click', () => widget.classList.contains('open') ? widget.classList.remove('open') : openChat());
  closeBtn.addEventListener('click', () => widget.classList.remove('open'));

  function send() {
    const text = input.value.trim(); if (!text) return;
    input.value = ''; addMsg(text, false); setQuick([]); respond(text);
  }
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
})();
