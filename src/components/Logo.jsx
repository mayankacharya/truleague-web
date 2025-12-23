import React from 'react'
import truleagueLogo from '../assets/OnlySVG/truleagueLogo.svg'

const Logo = () => (
  <div className="header__logo">
    <img
      src={truleagueLogo}
      alt="TruLeague logo"
      className="header__logo-img"
    />
  </div>
)

export default Logo
