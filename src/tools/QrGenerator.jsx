import { useState } from 'react';
import QRCode from 'qrcode';
import { DownloadLink, Status } from '../components/ToolFrame';

export function QrGenerator() {
  const [input, setInput] = useState('https://hack.co.il');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');

  async function generate() {
    if (!input.trim()) {
      setStatus('Enter text or a URL first.');
      return;
    }
    const dataUrl = await QRCode.toDataURL(input, { width: 768, margin: 2, color: { dark: '#08111f', light: '#f8fbff' } });
    setResult(dataUrl);
    setStatus('QR code generated in this browser.');
  }

  return (
    <div className="form-stack qr-layout">
      <label className="field-label">Text or URL<textarea className="code-area" value={input} onChange={(event) => setInput(event.target.value)} /></label>
      <button className="button primary" onClick={generate}>Generate QR</button>
      <Status>{status}</Status>
      {result && <img className="qr-preview" src={result} alt="Generated QR code" />}
      <DownloadLink href={result} filename="hack-co-il-qr.png">Download PNG</DownloadLink>
    </div>
  );
}
