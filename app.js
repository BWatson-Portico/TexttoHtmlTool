// Template registry — populated by files in templates/ loaded before this script.
window.EMAIL_TEMPLATES = window.EMAIL_TEMPLATES || [];

const KNOWN_LINKS = [
  { pattern: /_{0,2}myPortico_{0,2}/gi,      label: 'myPortico',    url: 'https://myportico.porticobenefits.org' },
  { pattern: /_{0,2}EmployerLink_{0,2}/gi,   label: 'EmployerLink', url: 'https://employerlink.porticobenefits.org' },
  { pattern: /medicare\.gov/gi,              label: 'medicare.gov', url: 'https://www.medicare.gov' },
];

let linkStates = [];
let lastHTML = '';
let lastFilename = '';

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttr(s) {
  return String(s).replace(/"/g,'&quot;');
}
function makeEmailAnchor(url, label) {
  return `<a href="${escapeAttr(url)}" target="_blank" style="text-decoration:none;font-weight:normal;color:#000000;"><span style="text-decoration:underline;color:#009cde;">${label}</span></a>`;
}
// Expose for template files
window.escapeHtml = escapeHtml;
window.escapeAttr = escapeAttr;
window.makeEmailAnchor = makeEmailAnchor;

function getFilename() {
  const code = document.getElementById('projectCode').value.trim().replace(/[^a-z0-9\-]/gi,'_') || 'portico';
  const now = new Date();
  const pad = n => String(n).padStart(2,'0');
  const dt = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `${code}_${dt}.html`;
}
function updateFilename() {
  const display = document.getElementById('filenameDisplay');
  if (lastHTML) display.textContent = `Will save as: ${getFilename()}`;
}

function updatePlaceholder(el) {
  el.dataset.empty = el.innerText.trim() === '' ? 'true' : 'false';
}
function fmt(cmd, editorId) {
  document.getElementById(editorId).focus();
  document.execCommand(cmd, false, null);
}
let pendingLinkRange = null;
let pendingLinkEditor = null;

function showStatus(msg) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.hidden = false;
}
function clearStatus() {
  const el = document.getElementById('statusMsg');
  el.textContent = '';
  el.hidden = true;
}

function addLink(editorId) {
  const editor = document.getElementById(editorId);
  editor.focus();
  const sel = window.getSelection();
  const selectedText = sel ? sel.toString() : '';
  pendingLinkRange = (sel && sel.rangeCount) ? sel.getRangeAt(0).cloneRange() : null;
  pendingLinkEditor = editor;
  document.getElementById('linkUrlInput').value = '';
  document.getElementById('linkLabelInput').value = selectedText;
  document.getElementById('linkDialog').hidden = false;
  document.getElementById('linkUrlInput').focus();
}
function confirmAddLink() {
  const url = document.getElementById('linkUrlInput').value.trim();
  if (!url) return;
  const labelInput = document.getElementById('linkLabelInput').value.trim();
  const label = labelInput || url;
  const editor = pendingLinkEditor;
  editor.focus();
  if (pendingLinkRange) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(pendingLinkRange);
  }
  document.execCommand('insertHTML', false,
    `<a href="${escapeAttr(url)}" style="color:#009cde;text-decoration:underline;">${escapeHtml(label)}</a>`);
  cancelAddLink();
}
function cancelAddLink() {
  document.getElementById('linkDialog').hidden = true;
  pendingLinkRange = null;
  pendingLinkEditor = null;
}

// Word puts formatting in inline styles on <span> elements.
// This reads those styles and converts to semantic HTML tags.
function getInlineFormatting(el) {
  const style = el.getAttribute('style') || '';
  return {
    bold:      /font-weight\s*:\s*(bold|[6-9]00)/i.test(style),
    italic:    /font-style\s*:\s*italic/i.test(style),
    underline: /text-decoration[^;]*:\s*[^;]*underline/i.test(style),
  };
}
function wordNodeToCleanHtml(node, inherited) {
  inherited = inherited || { bold: false, italic: false, underline: false };
  if (node.nodeType === 3) {
    let text = escapeHtml(node.textContent);
    if (!text.trim()) return text;
    if (inherited.bold)                         text = `<strong>${text}</strong>`;
    if (inherited.italic)                        text = `<em>${text}</em>`;
    if (inherited.underline && !inherited.isLink) text = `<u>${text}</u>`;
    return text;
  }
  if (node.nodeType !== 1) return '';
  const tag = node.tagName.toLowerCase();
  if (['style','script','meta'].includes(tag)) return '';
  if (tag === 'br') return '<br>';
  if (tag === 'a') {
    const href = node.getAttribute('href') || '';
    if (!href || href.startsWith('javascript'))
      return Array.from(node.childNodes).map(c => wordNodeToCleanHtml(c, inherited)).join('');
    return makeEmailAnchor(href, escapeHtml((node.innerText || node.textContent || href).trim()));
  }
  const f = getInlineFormatting(node);
  const childInherited = {
    bold: inherited.bold || f.bold,
    italic: inherited.italic || f.italic,
    underline: inherited.underline || f.underline,
    isLink: inherited.isLink,
  };
  const children = Array.from(node.childNodes).map(c => wordNodeToCleanHtml(c, childInherited)).join('');
  if (['p','div'].includes(tag)) {
    const t = children.trim();
    return t ? `<p style="margin:0 0 10px 0!important;padding:0!important;">${t}</p>` : '';
  }
  if (tag === 'b' || tag === 'strong') return `<strong>${children}</strong>`;
  if (tag === 'i' || tag === 'em')     return `<em>${children}</em>`;
  if (tag === 'u')                      return `<u>${children}</u>`;
  return children;
}
function wordHtmlToCleanHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const frag = tmp.querySelector('body') || tmp;
  return Array.from(frag.childNodes).map(n => wordNodeToCleanHtml(n, {})).join('');
}

function insertHtmlAtCursor(editorEl, html) {
  editorEl.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) { editorEl.innerHTML += html; return; }
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const frag = document.createDocumentFragment();
  while (tmp.firstChild) frag.appendChild(tmp.firstChild);
  range.insertNode(frag);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

const el1 = document.getElementById('editor1');
el1.addEventListener('focus', () => updatePlaceholder(el1));
el1.addEventListener('blur',  () => updatePlaceholder(el1));
el1.addEventListener('input', () => { updatePlaceholder(el1); scanEditor(); });
el1.addEventListener('paste', function(e) {
  e.preventDefault();
  e.stopPropagation();
  const html  = e.clipboardData.getData('text/html');
  const plain = e.clipboardData.getData('text/plain');
  if (html && html.trim()) {
    insertHtmlAtCursor(el1, wordHtmlToCleanHtml(html));
  } else {
    const frag = document.createDocumentFragment();
    plain.split('\n').forEach((line, i, arr) => {
      frag.appendChild(document.createTextNode(line));
      if (i < arr.length - 1) frag.appendChild(document.createElement('br'));
    });
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(frag);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    } else { el1.appendChild(frag); }
  }
  updatePlaceholder(el1);
  scanEditor();
});

function scanEditor() {
  const text = el1.innerText || '';
  const found = [];
  KNOWN_LINKS.forEach(k => {
    k.pattern.lastIndex = 0;
    if (k.pattern.test(text)) {
      k.pattern.lastIndex = 0;
      const existing = linkStates.find(s => s.label === k.label);
      found.push({ label: k.label, url: k.url, pattern: k.pattern, enabled: existing ? existing.enabled : true });
    }
    k.pattern.lastIndex = 0;
  });
  linkStates = found;
  const wrap = document.getElementById('detectedWrap');
  const list = document.getElementById('detectedList');
  if (!found.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  list.innerHTML = '';
  found.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'link-item' + (item.enabled ? '' : ' disabled');
    div.id = `dl-item-${i}`;
    div.innerHTML = `
      <span class="link-label">${escapeHtml(item.label)}</span>
      <span class="link-url">${escapeHtml(item.url)}</span>
      <div class="toggle-wrap">
        <span>${item.enabled ? 'Link on' : 'Plain text'}</span>
        <label class="toggle">
          <input type="checkbox" ${item.enabled ? 'checked' : ''} onchange="toggleLink(${i},this)">
          <span class="slider"></span>
        </label>
      </div>`;
    list.appendChild(div);
  });
}
function toggleLink(i, checkbox) {
  linkStates[i].enabled = checkbox.checked;
  const item = document.getElementById(`dl-item-${i}`);
  item.classList.toggle('disabled', !checkbox.checked);
  item.querySelector('.toggle-wrap span').textContent = checkbox.checked ? 'Link on' : 'Plain text';
}

function applyKnownLink(node, item) {
  if (node.nodeType === 3) {
    item.pattern.lastIndex = 0;
    if (!item.pattern.test(node.textContent)) return;
    item.pattern.lastIndex = 0;
    const span = document.createElement('span');
    span.innerHTML = node.textContent.replace(item.pattern, makeEmailAnchor(item.url, escapeHtml(item.label)));
    node.parentNode.replaceChild(span, node);
  } else {
    Array.from(node.childNodes).forEach(c => applyKnownLink(c, item));
  }
}
function domToEmailHtml(node) {
  if (node.nodeType === 3) return escapeHtml(node.textContent);
  const tag = node.tagName ? node.tagName.toLowerCase() : '';
  const children = Array.from(node.childNodes).map(domToEmailHtml).join('');
  if (tag === 'strong' || tag === 'b') return `<strong>${children}</strong>`;
  if (tag === 'em'     || tag === 'i') return `<em>${children}</em>`;
  if (tag === 'u')                      return `<u>${children}</u>`;
  if (tag === 'br')                     return '<br>';
  if (tag === 'a') {
    const href  = node.getAttribute('href') || '#';
    const inner = node.innerText || node.textContent || href;
    return makeEmailAnchor(href, escapeHtml(inner.trim()));
  }
  if (tag === 'span') return children;
  if (tag === 'p' || tag === 'div') {
    if (!children.trim()) return '';
    return `<p style="margin:0 0 10px 0!important;padding:0!important;">${children}</p>`;
  }
  return children;
}
function editorToEmailHtml() {
  const tmp = document.createElement('div');
  tmp.innerHTML = el1.innerHTML;
  linkStates.forEach(item => {
    if (!item.enabled) return;
    item.pattern.lastIndex = 0;
    applyKnownLink(tmp, item);
    item.pattern.lastIndex = 0;
  });
  return domToEmailHtml(tmp);
}

function populateTemplateSelect() {
  const select = document.getElementById('templateSelect');
  select.innerHTML = '';
  if (!window.EMAIL_TEMPLATES.length) {
    const opt = document.createElement('option');
    opt.textContent = 'No templates loaded';
    opt.disabled = true;
    select.appendChild(opt);
    return;
  }
  window.EMAIL_TEMPLATES.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.label;
    select.appendChild(opt);
  });
}
function getSelectedTemplate() {
  const id = document.getElementById('templateSelect').value;
  return window.EMAIL_TEMPLATES.find(t => t.id === id) || window.EMAIL_TEMPLATES[0];
}
function onTemplateChange() {
  if (lastHTML) generate();
}

function buildHTML() {
  const template = getSelectedTemplate();
  if (!template) { showStatus('No email template is available.'); return ''; }
  return template.build({
    preheader:   document.getElementById('preheaderText').value.trim(),
    projectCode: document.getElementById('projectCode').value.trim(),
    title:       document.getElementById('emailTitle').value.trim(),
    bodyHtml:    editorToEmailHtml(),
  });
}

function generate() {
  if (!el1.innerText.trim()) { showStatus('Please fill in the email body.'); return; }
  clearStatus();
  lastHTML     = buildHTML();
  if (!lastHTML) return;
  lastFilename = getFilename();
  const frame = document.getElementById('previewFrame');
  frame.srcdoc = lastHTML;
  frame.style.minHeight = '500px';
  const wrap = document.getElementById('previewWrap');
  wrap.style.display = 'block';
  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const display = document.getElementById('filenameDisplay');
  display.style.display = 'block';
  display.textContent = `Will save as: ${lastFilename}`;
}

function saveFile() {
  if (!lastHTML) return;
  const blob = new Blob([lastHTML], { type: 'text/html' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = lastFilename;
  a.click();
}

populateTemplateSelect();
updatePlaceholder(el1);
