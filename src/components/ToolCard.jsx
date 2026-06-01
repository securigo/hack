import { Link } from 'react-router-dom';

export function ToolCard({ tool }) {
  return (
    <Link className="tool-card" to={`/tools/${tool.slug}`}>
      <span className="tool-icon">{tool.icon}</span>
      <span className="tool-category">{tool.category}</span>
      <h3>{tool.name}</h3>
      <p>{tool.short}</p>
      <span className="card-action">Open tool →</span>
    </Link>
  );
}
