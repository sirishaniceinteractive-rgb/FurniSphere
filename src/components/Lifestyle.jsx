import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Compass } from 'lucide-react'

const lifestyles = [
  {
    id: '01',
    name: 'Minimal & Sculptural',
    tagline: 'The Poetics of Essential Furniture Geometry',
    desc: 'Clean architectural lines, low-profile silhouettes, and the quiet dignity of solid bleached oak and textured bouclé. Furniture designed as functional art with zero excess.',
    materials: ['White Bouclé', 'Bleached Oak', 'Smoked Glass'],
    palette: ['#F7F5F0', '#E5DFD5', '#242422'],
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=85',
    detailImage: '/images/product-coffee-table.jpg',
    alt: 'Sculptural minimalist armchair with bleached wood legs on clean studio floor',
    quote: '“Furniture should feel like a piece of sculpture you happen to live with.”',
  },
  {
    id: '02',
    name: 'Warm & Organic Hardwood',
    tagline: 'Turned Timber & Earthy Equilibrium',
    desc: 'Hand-turned solid walnut, precision mortise-and-tenon joinery, and warm terracotta upholstery that root your space in generational woodworking craftsmanship.',
    materials: ['Natural Cane', 'Solid Walnut', 'Earthy Terracotta'],
    palette: ['#EADBC8', '#B87355', '#4A3728'],
    mainImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=85',
    detailImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=85',
    alt: 'Hand-crafted ergonomic solid walnut lounge armchair with rich timber grain',
    quote: '“Invest in furniture crafted from timber that grows more beautiful with time.”',
  },
  {
    id: '03',
    name: 'Bold & Architectural',
    tagline: 'Dramatic Contours & Brutalist Proportions',
    desc: 'Unapologetic silhouettes, deep moody patinas, and confident contrasts. Pieces engineered for collectors who view furniture as the focal anchor of living.',
    materials: ['Aged Brass', 'Deep Charcoal', 'Brutalist Travertine'],
    palette: ['#2E2D2B', '#C9A96E', '#8C3D2B'],
    mainImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1000&q=85',
    detailImage: '/images/product-lamp.jpg',
    alt: 'Dramatic sculptural burnt-terracotta designer chair with expressive geometry',
    quote: '“A space comes alive when a single piece of furniture dares to command the room.”',
  },
]

const Lifestyle = () => {
  const [activeTab, setActiveTab] = useState(0)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  const current = lifestyles[activeTab]

  return (
    <section className="lifestyle section" id="lifestyle" aria-label="Furniture design languages">
      <div className="container">
        {/* Section Lead */}
        <motion.div
          ref={headerRef}
          className="lifestyle__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <span className="text-caption lifestyle__label">
            <Compass size={14} className="lifestyle__icon" />
            Curated Design Lines
          </span>
          <h2 className="heading-lg">
            <span className="jitter-mask">
              <motion.span
                className="jitter-reveal-line"
                initial={{ y: '105%' }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.1 }}
              >
                Furniture by Design Language
              </motion.span>
            </span>
          </h2>
          <p className="text-body lifestyle__subtitle">
            Explore iconic furniture series sculpted around distinct material dialogues — from minimal chairs to warm organic solid timber.
          </p>
        </motion.div>

        {/* Seamless Interactive Moodboard (No Box Grid) */}
        <div className="lifestyle__moodboard">
          {/* Left Column: Interactive Narrative Index */}
          <div className="lifestyle__narrative">
            <div className="lifestyle__tabs-nav" role="tablist" aria-label="Lifestyle aesthetics">
              {lifestyles.map((style, idx) => {
                const isActive = activeTab === idx
                return (
                  <motion.button
                    key={style.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`lifestyle-nav-item ${isActive ? 'lifestyle-nav-item--active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                  >
                    <div className="lifestyle-nav-item__indicator">
                      <span className="lifestyle-nav-item__number">{style.id}</span>
                      {isActive ? (
                        <motion.div
                          layoutId="activeLifestyleBar"
                          className="lifestyle-nav-item__bar"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      ) : (
                        <div className="lifestyle-nav-item__bar" />
                      )}
                    </div>

                    <div className="lifestyle-nav-item__text-wrap">
                      <h3 className="lifestyle-nav-item__title">{style.name}</h3>
                      <span className="lifestyle-nav-item__tagline">{style.tagline}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Active Lifestyle Detailed Notes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="lifestyle__active-detail"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <blockquote className="lifestyle__quote">{current.quote}</blockquote>
                <p className="lifestyle__desc">{current.desc}</p>

                {/* Material Palette Chips */}
                <div className="lifestyle__materials">
                  <span className="lifestyle__materials-label">Signature Textures:</span>
                  <div className="lifestyle__chips">
                    {current.materials.map((mat, i) => (
                      <span key={mat} className="lifestyle__chip">
                        <span
                          className="lifestyle__chip-dot"
                          style={{ backgroundColor: current.palette[i] }}
                        />
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.a
                  href="#featured"
                  className="lifestyle__explore-cta"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span>Immerse in {current.name}</span>
                  <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Organic Layered Canvas (Arched Hero + Floating Vignette) */}
          <div className="lifestyle__visual-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="lifestyle__canvas-group"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Organic Arched Hero Window */}
                <div className="lifestyle__arch-hero">
                  <img
                    src={current.mainImage}
                    alt={current.alt}
                    className="lifestyle__arch-img"
                    loading="lazy"
                  />
                  <div className="lifestyle__arch-gradient" />
                  <div className="lifestyle__floating-pill">
                    <span>{current.name} Edition</span>
                  </div>
                </div>

                {/* Overlapping Floating Material Vignette */}
                <motion.div
                  className="lifestyle__vignette"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img
                    src={current.detailImage}
                    alt={`${current.name} detail close-up`}
                    className="lifestyle__vignette-img"
                    loading="lazy"
                  />
                  <div className="lifestyle__vignette-caption">
                    <span>Texture Detail</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Lifestyle
