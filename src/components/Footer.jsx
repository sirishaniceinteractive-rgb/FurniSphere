import Logo from './Logo'


const footerLinks = {
  Shop: ['Living Room', 'Bedroom', 'Dining Room', 'Workspace', 'Lighting', 'All Furniture'],
  About: ['Our Story', 'Philosophy', 'Craftsmanship', 'Sustainability', 'Careers'],
  Help: ['Contact Us', 'FAQs', 'Shipping & Returns', 'Care Guide', 'Store Locator'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
}

/* Using SVG inline icons for social media since lucide-react doesn't export brand icons */
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
)

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: TwitterIcon, label: 'Twitter / X', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
]

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo" aria-label="FurniSphere Home">
              <Logo variant="light" size={36} />
              <span className="footer__logo-text">FurniSphere</span>
            </a>
            <p className="footer__tagline">
              Shape Your Space. Define Your Style.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Premium contemporary furniture designed for beautiful living.
              Thoughtfully crafted, sustainably sourced, delivered to your door.
            </p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="footer__column-title">{category}</h3>
              {links.map((link) => (
                <a key={link} href="#" className="footer__link">
                  {link}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} FurniSphere. All rights reserved. Crafted with care in India.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy</a>
            <a href="#" className="footer__bottom-link">Terms</a>
            <a href="#" className="footer__bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
