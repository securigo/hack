import { useState } from 'react';
import { Status } from '../components/ToolFrame';

const sample = '{"domain":"hack.co.il","private":true,"tools":["json","pdf","hash"]}';

export function JsonFormatter() {
  const [input, setInput] = useState(sample);
  const [status, setStatus] = useState('');

  function transform(mode) {
    try {
      const parsed = JSON.parse(input);
      setInput(mode === 'minify' ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
      setStatus('Valid JSON. Output updated locally.');
    } catch (error) {
      setStatus(`Invalid JSON: ${error.message}`);
    }
  }

  return (
    <div className="form-stack">
      <textarea className="code-area tall" value={input} onChange={(event) => setInput(event.target.value)} spellCheck="false" />
      <div className="button-row">
        <button className="button primary" onClick={() => transform('format')}>Format</button>
        <button className="button ghost" onClick={() => transform('minify')}>Minify</button>
      </div>
      <Status>{status}</Status>
    </div>
  );
}
