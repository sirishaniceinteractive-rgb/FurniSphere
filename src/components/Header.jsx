import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#featured' },
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#story' },
  { label: 'Inspiration', href: '#inspiration' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const headerClass = `header ${isScrolled || isMobileMenuOpen ? 'header--solid' : 'header--transparent'}`

  return (
    <>
      <header className={headerClass} id="header">
        <div className="header__inner">
          <a href="#" className="header__logo" aria-label="FurniSphere Home">
            <Logo
              variant={isScrolled || isMobileMenuOpen ? 'dark' : 'light'}
              size={42}
            />
            <span className="header__logo-text">FurniSphere</span>
          </a>

          <nav className="header__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="header__nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <button
              className="header__action-btn"
              aria-label="Search"
              id="search-btn"
            >
              <Search size={20} />
            </button>
            <button
              className="header__action-btn"
              aria-label="Wishlist"
              id="wishlist-btn"
            >
              <Heart size={20} />
              <span className="badge">2</span>
            </button>
            <button
              className="header__action-btn"
              aria-label="Shopping bag"
              id="cart-btn"
            >
              <ShoppingBag size={20} />
              <span className="badge">1</span>
            </button>

            <button
              className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              id="menu-toggle"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu__overlay ${isMobileMenuOpen ? 'mobile-menu__overlay--visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-menu mobile-menu--open"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            aria-label="Mobile navigation"
          >
            <div className="mobile-menu__nav">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
