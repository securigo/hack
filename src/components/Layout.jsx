import { NavLink, Outlet } from 'react-router-dom';
import { tools } from '../data/tools';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/tools/pdf-merge', label: 'Tools' },
  { to: '/#privacy', label: 'Privacy' },
  { to: '/#deploy', label: 'Deploy' },
];

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Hack.co.il home">
          <span className="brand-mark">H</span>
          <span>
            <strong>Hack.co.il</strong>
            <small>local tools</small>
          </span>
        </NavLink>
        <nav className="top-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => (isActive && item.to !== '/#privacy' ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <strong>Hack.co.il</strong>
          <p>Privacy-first utilities for daily file and developer tasks. No backend required.</p>
        </div>
        <div className="footer-grid">
          {tools.slice(0, 4).map((tool) => (
            <NavLink key={tool.slug} to={`/tools/${tool.slug}`}>
              {tool.name}
            </NavLink>
          ))}
        </div>
      </footer>
    </div>
  );
}
