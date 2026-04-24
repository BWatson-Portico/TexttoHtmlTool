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
  const colorMatch = /(?:^|;)\s*color\s*:\s*([^;]+)/i.exec(style);
  const bgMatch = /(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/i.exec(style);
  const msoHighlight = /mso-highlight\s*:\s*([^;]+)/i.exec(style);
  return {
    bold:      /font-weight\s*:\s*(bold|[6-9]00)/i.test(style),
    italic:    /font-style\s*:\s*italic/i.test(style),
    underline: /text-decoration[^;]*:\s*[^;]*underline/i.test(style),
    color:     colorMatch ? colorMatch[1].trim() : null,
    background: bgMatch ? bgMatch[1].trim() : (msoHighlight ? msoHighlight[1].trim() : null),
  };
}

function isMeaningfulColor(c) {
  if (!c) return false;
  const n = c.toLowerCase().replace(/\s/g, '');
  return !['inherit','transparent','initial','currentcolor','auto',
           '#000','#000000','black',
           '#111','#111111','#1a1a1a',
           '#222','#222222',
           '#333','#333333',
           '#545859',
           'rgb(0,0,0)','rgb(17,17,17)','rgb(34,34,34)','rgb(51,51,51)','rgb(84,88,89)'
          ].includes(n);
}
function isMeaningfulBackground(c) {
  if (!c) return false;
  const n = c.toLowerCase().replace(/\s/g, '');
  return !['inherit','transparent','initial','currentcolor','auto','none',
           '#fff','#ffffff','white','rgb(255,255,255)'
          ].includes(n);
}
function wordNodeToCleanHtml(node, inherited) {
  inherited = inherited || { bold: false, italic: false, underline: false };
  if (node.nodeType === 3) {
    let text = escapeHtml(node.textContent);
    if (!text.trim()) return text;
    if (isMeaningfulColor(inherited.color) && !inherited.isLink) text = `<span style="color:${inherited.color}">${text}</span>`;
    if (isMeaningfulBackground(inherited.background)) text = `<span style="background-color:${inherited.background}">${text}</span>`;
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
    color: f.color || inherited.color,
    background: f.background || inherited.background,
    isLink: inherited.isLink,
    inList: inherited.inList || tag === 'ul' || tag === 'ol' || tag === 'li',
  };
  const children = Array.from(node.childNodes).map(c => wordNodeToCleanHtml(c, childInherited)).join('');
  if (['p','div'].includes(tag)) {
    const t = children.trim();
    if (!t) return '';
    if (inherited.inList) return t;
    return `<p style="margin:0 0 10px 0!important;padding:0!important;">${t}</p>`;
  }
  if (tag === 'ul') return children.trim() ? `<ul style="margin:0 0 10px 0;padding-left:40px;">${children}</ul>` : '';
  if (tag === 'ol') return children.trim() ? `<ol style="margin:0 0 10px 0;padding-left:40px;">${children}</ol>` : '';
  if (tag === 'li') return `<li style="margin:0 0 4px 0;font-family:helvetica,sans-serif;font-size:16px;color:#545859;line-height:20px;">${children}</li>`;
  if (tag === 'b' || tag === 'strong') return `<strong>${children}</strong>`;
  if (tag === 'i' || tag === 'em')     return `<em>${children}</em>`;
  if (tag === 'u')                      return `<u>${children}</u>`;
  return children;
}
function preprocessWordHtml(html) {
  html = html.replace(/<!--\s*\[if[^\]]*\]\s*-->/gi, '');
  html = html.replace(/<!--\s*\[endif\]\s*-->/gi, '');
  html = html.replace(/<!\[if[^\]]*\]>/gi, '');
  html = html.replace(/<!\[endif\]>/gi, '');
  html = html.replace(/<o:p>/gi, '').replace(/<\/o:p>/gi, '');
  return html;
}

function isMsoListParagraph(p) {
  const cls = p.getAttribute('class') || '';
  const style = p.getAttribute('style') || '';
  return /MsoListParagraph/i.test(cls) || /mso-list\s*:\s*l\d/i.test(style);
}

function isOrderedMsoList(p) {
  const text = (p.textContent || '').trimStart();
  return /^\d+[.)]\s/.test(text);
}

function stripBulletMarker(p) {
  const ignoreSpan = Array.from(p.querySelectorAll('span')).find(s => {
    const st = s.getAttribute('style') || '';
    return /mso-list\s*:\s*ignore/i.test(st);
  });
  if (ignoreSpan) { ignoreSpan.remove(); return; }
  const symbolSpan = Array.from(p.querySelectorAll('span')).find(s => {
    const st = s.getAttribute('style') || '';
    return /font-family\s*:\s*symbol/i.test(st);
  });
  if (symbolSpan) { symbolSpan.remove(); return; }
  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null);
  const first = walker.nextNode();
  if (first) {
    first.textContent = first.textContent.replace(/^[\s·•○§▪◦\u00a0]+/, '').replace(/^\d+[.)]\s+/, '');
  }
}

function convertMsoLists(root) {
  const ps = Array.from(root.querySelectorAll('p'));
  const groups = [];
  let current = null;
  ps.forEach(p => {
    if (!isMsoListParagraph(p)) { current = null; return; }
    if (current) {
      const last = current[current.length - 1];
      let adjacent = true;
      let n = last.nextSibling;
      while (n && n !== p) {
        if (n.nodeType === 1) { adjacent = false; break; }
        if (n.nodeType === 3 && n.textContent.trim()) { adjacent = false; break; }
        n = n.nextSibling;
      }
      if (adjacent && n === p) { current.push(p); return; }
    }
    current = [p];
    groups.push(current);
  });
  groups.forEach(group => {
    const ordered = isOrderedMsoList(group[0]);
    const listEl = document.createElement(ordered ? 'ol' : 'ul');
    group.forEach(p => {
      stripBulletMarker(p);
      const li = document.createElement('li');
      while (p.firstChild) li.appendChild(p.firstChild);
      listEl.appendChild(li);
    });
    group[0].parentNode.replaceChild(listEl, group[0]);
    for (let i = 1; i < group.length; i++) {
      if (group[i].parentNode) group[i].parentNode.removeChild(group[i]);
    }
  });
}

function wordHtmlToCleanHtml(html) {
  html = preprocessWordHtml(html);
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const frag = tmp.querySelector('body') || tmp;
  convertMsoLists(frag);
  return Array.from(frag.childNodes).map(n => wordNodeToCleanHtml(n, {})).join('');
}

function plainTextToCleanHtml(text) {
  text = text.replace(/\r\n?/g, '\n');
  const lines = text.split('\n');
  const out = [];
  const bulletRe = /^\s*[•·○§▪◦*]\s+|^\s*-\s+/;
  const numberRe = /^\s*(\d+)[.)]\s+/;
  let para = [];
  let list = null;
  let item = null;

  function flushPara() {
    if (para.length) {
      const t = para.join(' ').trim();
      if (t) out.push(`<p>${escapeHtml(t)}</p>`);
      para = [];
    }
  }
  function pushItem() {
    if (item !== null && list) {
      list.items.push(item.join('<br>'));
      item = null;
    }
  }
  function flushList() {
    pushItem();
    if (list && list.items.length) {
      const lis = list.items.map(c => `<li>${c}</li>`).join('');
      out.push(`<${list.tag}>${lis}</${list.tag}>`);
    }
    list = null;
  }

  for (const raw of lines) {
    const line = raw;
    const bulletMatch = line.match(bulletRe);
    const numberMatch = line.match(numberRe);
    if (bulletMatch || numberMatch) {
      flushPara();
      const tag = numberMatch ? 'ol' : 'ul';
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
      else { pushItem(); }
      const content = line.replace(bulletRe, '').replace(numberRe, '').trim();
      item = [escapeHtml(content)];
    } else if (!line.trim()) {
      flushPara();
    } else {
      if (list && item !== null) {
        item.push(escapeHtml(line.trim()));
      } else {
        flushList();
        para.push(line.trim());
      }
    }
  }
  flushPara();
  flushList();
  return out.join('\n');
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
  window.__lastPasteHtml = html;
  window.__lastPastePlain = plain;
  if (html && html.trim()) {
    insertHtmlAtCursor(el1, wordHtmlToCleanHtml(html));
  } else if (plain && plain.trim()) {
    insertHtmlAtCursor(el1, plainTextToCleanHtml(plain));
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
function domToEmailHtml(node, inList) {
  if (node.nodeType === 3) return escapeHtml(node.textContent);
  const tag = node.tagName ? node.tagName.toLowerCase() : '';
  const childInList = inList || tag === 'ul' || tag === 'ol' || tag === 'li';
  const children = Array.from(node.childNodes).map(c => domToEmailHtml(c, childInList)).join('');
  if (tag === 'strong' || tag === 'b') return `<strong>${children}</strong>`;
  if (tag === 'em'     || tag === 'i') return `<em>${children}</em>`;
  if (tag === 'u')                      return `<u>${children}</u>`;
  if (tag === 'br')                     return '<br>';
  if (tag === 'a') {
    const href  = node.getAttribute('href') || '#';
    const inner = node.innerText || node.textContent || href;
    return makeEmailAnchor(href, escapeHtml(inner.trim()));
  }
  if (tag === 'span') {
    const style = node.getAttribute('style') || '';
    const colorM = /(?:^|;)\s*color\s*:\s*([^;]+)/i.exec(style);
    const bgM = /(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/i.exec(style);
    const parts = [];
    if (colorM && isMeaningfulColor(colorM[1].trim())) parts.push(`color:${colorM[1].trim()}`);
    if (bgM && isMeaningfulBackground(bgM[1].trim())) parts.push(`background-color:${bgM[1].trim()}`);
    if (parts.length) return `<span style="${parts.join(';')}">${children}</span>`;
    return children;
  }
  if (tag === 'p' || tag === 'div') {
    if (!children.trim()) return '';
    if (inList) return children;
    return `<p style="margin:0 0 10px 0!important;padding:0!important;">${children}</p>`;
  }
  if (tag === 'ul') return children.trim() ? `<ul style="margin:0 0 10px 0;padding-left:40px;">${children}</ul>` : '';
  if (tag === 'ol') return children.trim() ? `<ol style="margin:0 0 10px 0;padding-left:40px;">${children}</ol>` : '';
  if (tag === 'li') return `<li style="margin:0 0 4px 0;font-family:helvetica,sans-serif;font-size:16px;color:#545859;line-height:20px;">${children}</li>`;
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
  return Array.from(tmp.childNodes).map(c => domToEmailHtml(c, false)).join('');
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
    title:       '',
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
