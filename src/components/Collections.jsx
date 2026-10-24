import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const collections = [
  {
    id: '01',
    name: 'Sofas & Lounges',
    tagline: 'Curved Organic Silhouettes & Tactile Bouclé',
    count: '24 Curated Pieces',
    image: '/images/product-sofa.jpg',
    alt: 'Forma curved cream bouclé sculptural sofa on minimal studio pedestal',
    href: '#featured',
  },
  {
    id: '02',
    name: 'Platform Beds',
    tagline: 'Channeled Linen Headboards & Solid Timber Bases',
    count: '18 Curated Pieces',
    image: '/images/product-bed.jpg',
    alt: 'Haven platform bed with tall channeled linen headboard on studio floor',
    href: '#featured',
  },
  {
    id: '03',
    name: 'Dining Tables & Chairs',
    tagline: 'Live-Edge American Walnut & Japanese Joinery',
    count: '16 Curated Pieces',
    image: '/images/product-dining-table.jpg',
    alt: 'Noma solid walnut live-edge dining table with matching crafted timber chairs',
    href: '#featured',
  },
  {
    id: '04',
    name: 'Desks & Accent Seating',
    tagline: 'Architectural Timber Desks & Tailored Velvet',
    count: '14 Curated Pieces',
    image: '/images/product-chair.jpg',
    alt: 'Solace architectural chair with tailored terracotta upholstery and walnut armrests',
    href: '#featured',
  },
]

const Collections = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="collections section" id="collections" aria-label="Collections">
      <div className="container">
        {/* Editorial Section Header */}
        <motion.div
          ref={headerRef}
          className="collections__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <div className="collections__header-lead">
            <span className="text-caption collections__label">
              <Sparkles size={14} className="collections__sparkle" />
              Curated Spaces
            </span>
            <h2 className="heading-lg collections__title">
              <span className="jitter-mask">
                <motion.span
                  className="jitter-reveal-line"
                  initial={{ y: '105%' }}
                  animate={isHeaderInView ? { y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.1 }}
                >
                  Explore Our <span className="text-italic-accent">Collections</span>
                </motion.span>
              </span>
            </h2>
          </div>
          <p className="text-body collections__subtitle">
            Move beyond conventional boundaries. Each room collection is thoughtfully
            composed as an architectural dialogue between warmth, geometry, and purpose.
          </p>
        </motion.div>

        {/* Seamless Architectural Panorama Strip (No Box Grid) */}
        <div className="collections__panorama" role="region" aria-label="Interactive collections showcase">
          {collections.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={item.id}
                className={`panorama-strip ${isActive ? 'panorama-strip--active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${item.name} collection, ${item.count}`}
              >
                {/* Background Photography with Fluid Scale */}
                <div className="panorama-strip__bg-wrapper">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="panorama-strip__image"
                    loading="lazy"
                  />
                  <div className="panorama-strip__ambient-overlay" />
                </div>

                {/* Vertical / Compact View (When Inactive) */}
                <div className="panorama-strip__collapsed-content">
                  <span className="panorama-strip__index">{item.id}</span>
                  <div className="panorama-strip__vertical-title">
                    <span>{item.name}</span>
                  </div>
                </div>

                {/* Expanded Editorial Content (When Active) */}
                <div className="panorama-strip__expanded-content">
                  <div className="panorama-strip__meta-top">
                    <span className="panorama-strip__active-index">{item.id}</span>
                    <span className="panorama-strip__tag">{item.count}</span>
                  </div>

                  <div className="panorama-strip__main-info">
                    <h3 className="panorama-strip__title">{item.name}</h3>
                    <p className="panorama-strip__tagline">{item.tagline}</p>
                    <motion.a
                      href={item.href}
                      className="panorama-strip__cta"
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span>Explore Collection</span>
                      <ArrowRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Collections
