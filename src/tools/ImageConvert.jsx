import { useState } from 'react';
import { DropZone } from '../components/DropZone';
import { DownloadLink, Status } from '../components/ToolFrame';
import { downloadName } from '../utils';

const formats = [
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
];

export function ImageConvert() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('image/webp');
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState(null);
  const [filename, setFilename] = useState('converted.webp');
  const [status, setStatus] = useState('');

  async function convert() {
    if (!file) {
      setStatus('Choose an image first.');
      return;
    }
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          setStatus('This browser could not export that format.');
          return;
        }
        const extension = formats.find(([mime]) => mime === format)?.[1] || 'png';
        setResult(URL.createObjectURL(blob));
        setFilename(downloadName(file.name, 'converted', extension));
        setStatus(`Converted to ${extension.toUpperCase()} at ${image.naturalWidth}×${image.naturalHeight}.`);
      }, format, Number(quality));
    };
    image.onerror = () => setStatus('Could not read the selected image.');
    image.src = URL.createObjectURL(file);
  }

  return (
    <div className="form-stack">
      <DropZone label="Select an image" hint="PNG, JPEG, WebP, GIF, and other browser-supported images." accept="image/*" onFiles={(files) => setFile(files[0])} />
      {file && <p className="selected-file">Selected: {file.name}</p>}
      <label className="field-label">Output format<select value={format} onChange={(event) => setFormat(event.target.value)}>{formats.map(([mime, ext]) => <option key={mime} value={mime}>{ext.toUpperCase()}</option>)}</select></label>
      <label className="field-label">Quality<input type="range" min="0.2" max="1" step="0.05" value={quality} onChange={(event) => setQuality(event.target.value)} /></label>
      <button className="button primary" onClick={convert}>Convert image</button>
      <Status>{status}</Status>
      <DownloadLink href={result} filename={filename}>Download converted image</DownloadLink>
    </div>
  );
}
