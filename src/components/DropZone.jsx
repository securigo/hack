export function DropZone({ label, accept, multiple = false, onFiles, hint }) {
  return (
    <label className="drop-zone">
      <span>{label}</span>
      <small>{hint}</small>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => onFiles(Array.from(event.target.files || []))}
      />
    </label>
  );
}
