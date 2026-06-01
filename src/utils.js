export function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function downloadName(name, suffix, extension) {
  const base = name?.replace(/\.[^/.]+$/, '') || 'hack-tool-result';
  return `${base}-${suffix}.${extension}`;
}

export function parsePages(input, totalPages) {
  const pages = new Set();
  input
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [startRaw, endRaw] = part.split('-').map((value) => Number(value.trim()));
      if (!Number.isInteger(startRaw)) return;
      const end = Number.isInteger(endRaw) ? endRaw : startRaw;
      for (let page = Math.min(startRaw, end); page <= Math.max(startRaw, end); page += 1) {
        if (page >= 1 && page <= totalPages) pages.add(page - 1);
      }
    });
  return Array.from(pages).sort((a, b) => a - b);
}

export function lineDiff(left, right) {
  const a = left.split('\n');
  const b = right.split('\n');
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      result.push({ type: 'same', text: a[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: 'removed', text: a[i] });
      i += 1;
    } else {
      result.push({ type: 'added', text: b[j] });
      j += 1;
    }
  }
  while (i < a.length) result.push({ type: 'removed', text: a[i++] });
  while (j < b.length) result.push({ type: 'added', text: b[j++] });
  return result;
}
