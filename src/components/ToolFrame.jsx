import { Link } from 'react-router-dom';

export function ToolFrame({ tool, children }) {
  return (
    <section className="tool-page">
      <div className="tool-hero compact">
        <Link to="/" className="back-link">← All tools</Link>
        <span className="tool-icon large">{tool.icon}</span>
        <p className="eyebrow">{tool.category} utility</p>
        <h1>{tool.name}</h1>
        <p>{tool.short} Everything runs inside this tab unless your browser explicitly asks you to download a result.</p>
      </div>
      <div className="workspace-card">{children}</div>
    </section>
  );
}

export function Status({ type = 'info', children }) {
  if (!children) return null;
  return <p className={`status ${type}`}>{children}</p>;
}

export function DownloadLink({ href, filename, children }) {
  if (!href) return null;
  return (
    <a className="button primary" href={href} download={filename}>
      {children || 'Download result'}
    </a>
  );
}
