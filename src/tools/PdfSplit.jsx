import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { DropZone } from '../components/DropZone';
import { DownloadLink, Status } from '../components/ToolFrame';
import { parsePages, downloadName } from '../utils';

export function PdfSplit() {
  const [file, setFile] = useState(null);
  const [range, setRange] = useState('1-3');
  const [result, setResult] = useState(null);
  const [filename, setFilename] = useState('split.pdf');
  const [status, setStatus] = useState('');

  async function split() {
    if (!file) {
      setStatus('Choose a PDF before splitting.');
      return;
    }
    try {
      const source = await PDFDocument.load(await file.arrayBuffer());
      const pages = parsePages(range, source.getPageCount());
      if (!pages.length) {
        setStatus(`Enter pages from 1 to ${source.getPageCount()}, such as 1,3-5.`);
        return;
      }
      const output = await PDFDocument.create();
      const copied = await output.copyPages(source, pages);
      copied.forEach((page) => output.addPage(page));
      const bytes = await output.save();
      setResult(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
      setFilename(downloadName(file.name, 'split', 'pdf'));
      setStatus(`Created a PDF with ${pages.length} selected page${pages.length === 1 ? '' : 's'}.`);
    } catch (error) {
      setStatus(`Could not split PDF: ${error.message}`);
    }
  }

  return (
    <div className="form-stack">
      <DropZone label="Select one PDF" hint="Page ranges are interpreted locally." accept="application/pdf" onFiles={(files) => setFile(files[0])} />
      {file && <p className="selected-file">Selected: {file.name}</p>}
      <label className="field-label">Pages to extract<input value={range} onChange={(event) => setRange(event.target.value)} placeholder="1,3-5,8" /></label>
      <button className="button primary" onClick={split}>Split PDF</button>
      <Status>{status}</Status>
      <DownloadLink href={result} filename={filename}>Download extracted PDF</DownloadLink>
    </div>
  );
}
