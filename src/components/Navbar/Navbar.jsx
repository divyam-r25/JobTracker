import { format } from 'date-fns'
import { FiBarChart2, FiBriefcase, FiFilePlus, FiHome } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import './Navbar.css'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/applications', label: 'Applications', icon: FiBriefcase },
  { to: '/applications/new', label: 'Add Job', icon: FiFilePlus },
  { to: '/analytics', label: 'Analytics', icon: FiBarChart2 },
]

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div className="navbar__logo">JT</div>
          <div>
            <p className="navbar__title">JobTrack</p>
            <p className="navbar__subtitle">Smart Job Tracker Dashboard</p>
          </div>
        </div>

        <nav className="navbar__nav" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="navbar__date">{format(new Date(), 'EEE, dd MMM yyyy')}</div>
      </div>
    </header>
  )
}
