import { useState } from 'react';
import { DropZone } from '../components/DropZone';
import { Status } from '../components/ToolFrame';
import { bytesToHex } from '../utils';

const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

export function HashGenerator() {
  const [text, setText] = useState('hack.co.il');
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [digest, setDigest] = useState('');
  const [status, setStatus] = useState('');

  async function generate() {
    const data = file ? await file.arrayBuffer() : new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest(algorithm, data);
    setDigest(bytesToHex(hash));
    setStatus(`Generated ${algorithm} ${file ? `for ${file.name}` : 'for text input'}.`);
  }

  return (
    <div className="form-stack">
      <label className="field-label">Text input<textarea className="code-area" value={text} onChange={(event) => { setText(event.target.value); setFile(null); }} /></label>
      <DropZone label="Or select a file" hint="File hashes are calculated locally with Web Crypto." onFiles={(files) => setFile(files[0])} />
      {file && <p className="selected-file">Hashing file: {file.name}</p>}
      <label className="field-label">Algorithm<select value={algorithm} onChange={(event) => setAlgorithm(event.target.value)}>{algorithms.map((item) => <option key={item}>{item}</option>)}</select></label>
      <button className="button primary" onClick={generate}>Generate hash</button>
      <Status>{status}</Status>
      {digest && <pre className="result-box">{digest}</pre>}
    </div>
  );
}
