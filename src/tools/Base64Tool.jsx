import { useState } from 'react';
import { Status } from '../components/ToolFrame';

export function Base64Tool() {
  const [input, setInput] = useState('Hack.co.il keeps utility work inside your browser.');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');

  function encode() {
    setOutput(btoa(unescape(encodeURIComponent(input))));
    setStatus('Encoded text as Base64.');
  }

  function decode() {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))));
      setStatus('Decoded Base64 text.');
    } catch {
      setStatus('Input is not valid Base64 text.');
    }
  }

  return (
    <div className="form-stack two-column-form">
      <label className="field-label">Input<textarea className="code-area" value={input} onChange={(event) => setInput(event.target.value)} /></label>
      <label className="field-label">Output<textarea className="code-area" value={output} readOnly /></label>
      <div className="button-row span-all">
        <button className="button primary" onClick={encode}>Encode</button>
        <button className="button ghost" onClick={decode}>Decode</button>
      </div>
      <Status>{status}</Status>
    </div>
  );
}
