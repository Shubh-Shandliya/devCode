import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/contact', label: 'Contact' },
]

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          Shubham Sharma
        </NavLink>
        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-container">
        <Outlet />
      </main>
      <footer className="site-footer">
        Crafted with React and AI-assisted development workflows.
      </footer>
    </div>
  )
}
