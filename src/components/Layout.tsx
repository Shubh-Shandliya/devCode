import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { usePageVisible } from '../hooks/usePageVisible'
import { useReducedMotionThree } from '../hooks/useReducedMotionThree'

const GlobalBackdrop = lazy(() =>
  import('./three/GlobalBackdrop').then((mod) => ({ default: mod.GlobalBackdrop })),
)

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/projects/farm-story', label: 'Farm Story' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/contact', label: 'Contact' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'btn-slide-fill rounded-full px-3 py-1.5 font-medium no-underline transition-[color,background-color,box-shadow] duration-200',
    'text-muted hover:bg-surface-hover hover:text-foreground',
    isActive
      ? 'bg-surface-hover text-foreground shadow-soft-glow'
      : '',
  ]
    .filter(Boolean)
    .join(' ')

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-xl border border-border px-3 py-2.5 font-medium no-underline',
    'btn-slide-fill',
    'text-muted hover:bg-surface-hover hover:text-foreground',
    isActive ? 'bg-surface-hover text-foreground shadow-soft-glow' : '',
  ]
    .filter(Boolean)
    .join(' ')

export function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const reduceMotion = useReducedMotionThree()
  const isPageVisible = usePageVisible()
  const closeDrawer = () => setIsDrawerOpen(false)

  const renderNavItems = (isMobile = false) =>
    navItems.map((item) => (
      <NavLink
        key={isMobile ? `mobile-${item.to}` : item.to}
        to={item.to}
        onClick={isMobile ? closeDrawer : undefined}
        className={isMobile ? mobileNavLinkClass : navLinkClass}
      >
        {item.label}
      </NavLink>
    ))

  return (
    <div className="relative flex min-h-svh flex-col gap-8">
      {!reduceMotion && isPageVisible ? (
        <Suspense fallback={null}>
          <GlobalBackdrop />
        </Suspense>
      ) : null}
      <header className="animate-slide-down sticky top-4 z-20 mx-auto mt-4 flex w-[min(1100px,95vw)] items-center justify-between gap-4 rounded-full border border-border bg-surface-glass px-5 py-3.5 backdrop-blur-md max-[900px]:rounded-2xl">
        <NavLink
          to="/"
          className="group relative inline-flex items-center gap-2.5 rounded-full px-2.5 py-1.5 no-underline transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span
            className="inline-block size-2.5 rounded-full bg-gradient-to-br from-[#6cffea] via-[#7f7bff] to-[#ff59d9] shadow-[0_0_16px_rgba(127,123,255,0.6)]"
            aria-hidden="true"
          />
          <span className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-[#9afdf2] via-[#f6f7ff] to-[#d2b8ff] bg-clip-text text-[0.98rem] font-extrabold tracking-[0.04em] text-transparent">
              SHUBHAM SHARMA
            </span>
            <span className="mt-1 text-[0.64rem] font-semibold tracking-[0.17em] text-muted group-hover:text-foreground">
              FRONTEND ENGINEER
            </span>
          </span>
        </NavLink>
        <button
          type="button"
          className="btn-slide-fill inline-flex size-[42px] flex-col items-center justify-center gap-1 rounded-xl border border-border bg-surface-glass min-[901px]:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isDrawerOpen}
          aria-controls="primary-nav"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          <motion.span
            className="h-0.5 w-4 rounded-full bg-foreground"
            animate={isDrawerOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.span
            className="h-0.5 w-4 rounded-full bg-foreground"
            animate={isDrawerOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.14 }}
          />
          <motion.span
            className="h-0.5 w-4 rounded-full bg-foreground"
            animate={isDrawerOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.18 }}
          />
        </button>
        <nav
          className="hidden flex-wrap items-center justify-end gap-1.5 min-[901px]:flex"
          aria-label="Primary"
        >
          {renderNavItems()}
        </nav>
      </header>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-[25] bg-[rgba(3,6,16,0.58)] max-[900px]:block min-[901px]:hidden"
              onClick={closeDrawer}
              aria-hidden={!isDrawerOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="fixed top-0 right-0 z-30 block h-svh w-[min(78vw,320px)] border-l border-border bg-[rgba(12,16,31,0.95)] p-[1.1rem] backdrop-blur-md max-[900px]:block min-[901px]:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav id="primary-nav" className="mt-12 grid gap-2" aria-label="Mobile Primary">
                {renderNavItems(true)}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main className="relative z-10 mx-auto mb-6 w-[min(1100px,95vw)] flex-1">
        <Outlet />
      </main>
      <footer className="relative z-10 mx-auto mb-5 w-[min(1100px,95vw)] text-center text-sm text-muted">
        Crafted with React and AI-assisted development workflows.
      </footer>
    </div>
  )
}
