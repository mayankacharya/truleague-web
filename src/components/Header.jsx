import React, { useState } from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import ScheduleButton from './ScheduleButton'
import './Header.css'

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <button
          className="header__drawer-toggle"
          aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="header__nav" aria-label="Primary">
          <NavLinks />
        </nav>
        <ScheduleButton />
      </div>
      <div className={`header__drawer ${drawerOpen ? 'is-open' : ''}`}>
        <button
          className="header__drawer-close"
          aria-label="Close navigation"
          onClick={closeDrawer}
        >
          ×
        </button>
        <NavLinks className="header__nav-links--drawer" onLinkClick={closeDrawer} />
      </div>
      {drawerOpen && (
        <div className="header__drawer-backdrop" onClick={closeDrawer} aria-hidden="true" />
      )}
    </header>
  )
}

export default Header
