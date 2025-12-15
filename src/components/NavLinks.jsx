import React from 'react'

const navItems = ['Home', 'About us', 'Product', 'For students', 'Blog', 'Contact us']

const NavLinks = ({ className = '', onLinkClick }) => (
  <ul className={`header__nav-links ${className}`}>
    {navItems.map((item) => (
      <li key={item}>
        <a
          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
          onClick={onLinkClick}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
)

export default NavLinks
