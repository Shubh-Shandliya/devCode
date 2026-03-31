import { useState } from 'react'
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          Shubham Sharma
        </NavLink>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isDrawerOpen}
          aria-controls="primary-nav"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
        </button>
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
      <div
        className={isDrawerOpen ? 'drawer-backdrop drawer-backdrop-open' : 'drawer-backdrop'}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />
      <aside className={isDrawerOpen ? 'mobile-drawer mobile-drawer-open' : 'mobile-drawer'}>
        <nav id="primary-nav" className="mobile-nav" aria-label="Mobile Primary">
          {navItems.map((item) => (
            <NavLink
              key={`mobile-${item.to}`}
              to={item.to}
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active mobile-nav-link' : 'nav-link mobile-nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="page-container">
        <Outlet />
      </main>
      <footer className="site-footer">
        Crafted with React and AI-assisted development workflows.
      </footer>
    </div>
  )
}
