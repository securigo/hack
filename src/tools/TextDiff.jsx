import { useMemo, useState } from 'react';
import { lineDiff } from '../utils';

export function TextDiff() {
  const [left, setLeft] = useState('Hack.co.il\nPrivate tools\nFast static site');
  const [right, setRight] = useState('Hack.co.il\nPrivacy-first tools\nFast static site');
  const diff = useMemo(() => lineDiff(left, right), [left, right]);

  return (
    <div className="form-stack">
      <div className="two-column-form">
        <label className="field-label">Original<textarea className="code-area" value={left} onChange={(event) => setLeft(event.target.value)} /></label>
        <label className="field-label">Changed<textarea className="code-area" value={right} onChange={(event) => setRight(event.target.value)} /></label>
      </div>
      <div className="diff-output" aria-live="polite">
        {diff.map((line, index) => <div key={`${line.type}-${index}`} className={`diff-line ${line.type}`}><span>{symbol(line.type)}</span><code>{line.text || ' '}</code></div>)}
      </div>
    </div>
  );
}

function symbol(type) {
  if (type === 'added') return '+';
  if (type === 'removed') return '-';
  return ' ';
}
