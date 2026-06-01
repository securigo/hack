import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { DropZone } from '../components/DropZone';
import { DownloadLink, Status } from '../components/ToolFrame';

export function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');

  async function merge() {
    if (files.length < 2) {
      setStatus('Choose at least two PDF files to merge.');
      return;
    }
    setStatus('Merging PDFs locally...');
    try {
      const output = await PDFDocument.create();
      for (const file of files) {
        const pdf = await PDFDocument.load(await file.arrayBuffer());
        const pages = await output.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => output.addPage(page));
      }
      const bytes = await output.save();
      setResult(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
      setStatus(`Merged ${files.length} PDFs into one file.`);
    } catch (error) {
      setStatus(`Could not merge PDFs: ${error.message}`);
    }
  }

  return (
    <div className="form-stack">
      <DropZone label="Select PDF files" hint="Order is preserved by your file picker selection." accept="application/pdf" multiple onFiles={setFiles} />
      <FileList files={files} />
      <button className="button primary" onClick={merge}>Merge PDFs</button>
      <Status>{status}</Status>
      <DownloadLink href={result} filename="hack-co-il-merged.pdf">Download merged PDF</DownloadLink>
    </div>
  );
}

function FileList({ files }) {
  if (!files.length) return null;
  return <ol className="file-list">{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ol>;
}
