// ── BACKUP & RESTORE ──
// Exports the three localStorage keys this app writes:
//   n4_starred, n4_mastered, n4_user_answers
// as a single JSON blob. Import supports merge (object-key union) or
// full replace.

const BACKUP_KEYS = ['n4_starred', 'n4_mastered', 'n4_user_answers'];
const BACKUP_FORMAT_VERSION = 1;

function buildBackupBlob() {
  const data = {};
  for (const k of BACKUP_KEYS) {
    try {
      data[k] = JSON.parse(localStorage.getItem(k) || '{}');
    } catch {
      data[k] = {};
    }
  }
  return {
    format: 'n4-study-backup',
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

function initBackup() {
  const blob = buildBackupBlob();
  document.getElementById('backup-export').value = JSON.stringify(blob, null, 2);
  document.getElementById('backup-stats').textContent =
    'starred ' + Object.keys(blob.data.n4_starred).length +
    ' · mastered ' + Object.keys(blob.data.n4_mastered).length +
    ' · answers ' + Object.keys(blob.data.n4_user_answers).length;
  document.getElementById('backup-export-status').textContent = '';
  document.getElementById('backup-export-status').className = 'backup-status';
  document.getElementById('backup-import').value = '';
  document.getElementById('backup-import-status').textContent = '';
  document.getElementById('backup-import-status').className = 'backup-status';
}

async function backupCopy() {
  const text = document.getElementById('backup-export').value;
  const status = document.getElementById('backup-export-status');
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = '✓ Copied to clipboard.';
    status.className = 'backup-status ok';
  } catch {
    // Fallback: select the textarea so user can long-press / copy manually.
    const ta = document.getElementById('backup-export');
    ta.select();
    try {
      document.execCommand('copy');
      status.textContent = '✓ Copied.';
      status.className = 'backup-status ok';
    } catch {
      status.textContent = 'Copy failed — select the text above and copy manually.';
      status.className = 'backup-status err';
    }
  }
}

function backupDownload() {
  const text = document.getElementById('backup-export').value;
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  a.href = url;
  a.download = `n4-study-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  const status = document.getElementById('backup-export-status');
  status.textContent = '✓ Download started.';
  status.className = 'backup-status ok';
}

function backupImport(strategy) {
  const status = document.getElementById('backup-import-status');
  const raw = document.getElementById('backup-import').value.trim();
  if (!raw) {
    status.textContent = 'Paste a backup blob first.';
    status.className = 'backup-status err';
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    status.textContent = 'Invalid JSON: ' + e.message;
    status.className = 'backup-status err';
    return;
  }
  const incoming = parsed && parsed.data && typeof parsed.data === 'object' ? parsed.data : parsed;
  if (!incoming || typeof incoming !== 'object') {
    status.textContent = 'Unrecognized format.';
    status.className = 'backup-status err';
    return;
  }
  const summary = BACKUP_KEYS.map(k => {
    const v = incoming[k];
    return k + ': ' + (v && typeof v === 'object' ? Object.keys(v).length : 0);
  }).join(', ');

  const verb = strategy === 'replace' ? 'REPLACE your current data' : 'merge into your current data';
  if (!confirm(`This will ${verb}.\n\nIncoming — ${summary}\n\nContinue?`)) {
    status.textContent = 'Cancelled.';
    status.className = 'backup-status';
    return;
  }

  for (const k of BACKUP_KEYS) {
    const incomingVal = (incoming[k] && typeof incoming[k] === 'object') ? incoming[k] : {};
    let merged;
    if (strategy === 'replace') {
      merged = incomingVal;
    } else {
      let current;
      try { current = JSON.parse(localStorage.getItem(k) || '{}'); } catch { current = {}; }
      merged = { ...current, ...incomingVal };
    }
    localStorage.setItem(k, JSON.stringify(merged));
  }

  status.textContent = '✓ Imported — ' + summary + '. Reload sections to see changes.';
  status.className = 'backup-status ok';
  initBackup();
}
