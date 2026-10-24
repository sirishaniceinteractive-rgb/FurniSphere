import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const sofas = [
  {
    id: 1,
    name: 'Forma Curved Bouclé Sofa',
    image: '/images/sofa-cream-boucle.jpg',
    alt: 'Cream bouclé curved organic sofa on minimalist studio floor',
  },
  {
    id: 2,
    name: 'Solace Terracotta Velvet Curved Sofa',
    image: '/images/sofa-terracotta-curved.jpg',
    alt: 'Warm terracotta rust velvet curved designer sofa with dark walnut legs',
  },
  {
    id: 3,
    name: 'Nordic Charcoal Modular Sectional',
    image: '/images/sofa-charcoal-modular.jpg',
    alt: 'Deep charcoal gray linen modular sectional sofa on studio floor',
  },
  {
    id: 4,
    name: 'Vesper Cognac Saddle Leather Sofa',
    image: '/images/sofa-cognac-leather.jpg',
    alt: 'Full-grain cognac caramel leather mid-century sofa with tapered timber legs',
  },
  {
    id: 5,
    name: 'Aethel Midnight Velvet Curved Sofa',
    image: '/images/sofa-midnight-indigo.jpg',
    alt: 'Midnight deep indigo blue velvet sculptural curved sofa with brushed brass capped legs',
  },
]

// Calculate perfectly calibrated, strictly monotonic milestones for each card in the scroll stack
const getMilestones = (index, total) => {
  const step = 1 / (total - 1)
  const docked = index * step
  const entryStart = Math.max(0, (index - 1) * step)
  const nextDocked = (index + 1) * step

  if (index === 0) {
    // First card: begins docked at top, progressively sinks and dims as subsequent cards stack over
    return {
      keys: [0, nextDocked, 1],
      scales: [1, 0.95, 0.9],
      opacities: [1, 0.95, 0.88],
      brightnesses: [1, 0.88, 0.74],
      ys: [0, 0, 0],
      rotateXs: [0, 0, 0],
    }
  }

  if (index === total - 1) {
    // Last card: arrives smoothly from below, docks on top, never recedes
    return {
      keys: [entryStart, entryStart + step * 0.4, 1],
      scales: [0.94, 0.98, 1],
      opacities: [0.15, 0.9, 1],
      brightnesses: [1, 1, 1],
      ys: [60, 18, 0],
      rotateXs: [3.5, 1, 0],
    }
  }

  if (nextDocked >= 1) {
    // Penultimate card
    return {
      keys: [entryStart, entryStart + step * 0.4, docked, 1],
      scales: [0.94, 0.98, 1, 0.95],
      opacities: [0.15, 0.9, 1, 0.92],
      brightnesses: [1, 1, 1, 0.88],
      ys: [60, 18, 0, 0],
      rotateXs: [3.5, 1, 0, 0],
    }
  }

  // Intermediate cards
  return {
    keys: [entryStart, entryStart + step * 0.4, docked, nextDocked, 1],
    scales: [0.94, 0.98, 1, 0.95, 0.9],
    opacities: [0.15, 0.9, 1, 0.94, 0.88],
    brightnesses: [1, 1, 1, 0.88, 0.74],
    ys: [60, 18, 0, 0, 0],
    rotateXs: [3.5, 1, 0, 0, 0],
  }
}

const SofaStackCard = ({ sofa, index, total, smoothProgress }) => {
  const isLast = index === total - 1
  const milestones = getMilestones(index, total)

  // Smooth interpolated transforms driven by the continuous spring progress
  const y = useTransform(smoothProgress, milestones.keys, milestones.ys)
  const scale = useTransform(smoothProgress, milestones.keys, milestones.scales)
  const rotateX = useTransform(smoothProgress, milestones.keys, milestones.rotateXs)
  const opacity = useTransform(smoothProgress, milestones.keys, milestones.opacities)
  const brightness = useTransform(smoothProgress, milestones.keys, milestones.brightnesses)
  const filterStyle = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div
      className="sofa-stack-card-slot"
      style={{
        zIndex: index + 1,
        top: `calc(88px + ${index * 22}px)`,
        marginBottom: isLast ? '14vh' : '48vh',
      }}
    >
      <motion.div
        className="sofa-stack-card"
        style={{
          y,
          scale,
          rotateX,
          opacity,
          filter: filterStyle,
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {/* Full-Bleed High-Definition Sofa Showcase (Zero Content Boxes) */}
        <div className="sofa-stack-card__media">
          <img
            src={sofa.image}
            alt={sofa.alt}
            className="sofa-stack-card__img"
            loading={index < 2 ? 'eager' : 'lazy'}
            draggable="false"
          />
        </div>

        {/* Minimalist Exhibition Placard */}
        <div className="sofa-stack-card__overlay-tag">
          <span className="sofa-stack-card__tag-num">0{index + 1} / 0{total}</span>
          <span className="sofa-stack-card__tag-divider" />
          <span className="sofa-stack-card__tag-title">{sofa.name}</span>
        </div>
      </motion.div>
    </div>
  )
}

const Featured = () => {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' })

  // Overall scroll progress of the entire stacking section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Fluid physics spring smoothing: turns discrete scroll increments into silky 120fps motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.32,
    restDelta: 0.0004,
  })

  return (
    <section
      ref={containerRef}
      className="featured-stack-section section"
      id="featured"
      aria-label="Featured sofa collection stack"
    >
      <div className="container">
        {/* Minimalist Editorial Header */}
        <motion.div
          ref={headerRef}
          className="featured-stack__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          <span className="text-caption featured-stack__label">
            Curated Silhouettes
          </span>
          <h2 className="heading-lg">
            <span className="jitter-mask">
              <motion.span
                className="jitter-reveal-line"
                initial={{ y: '105%' }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.1 }}
              >
                Featured Furniture
              </motion.span>
            </span>
          </h2>
          <p className="text-body featured-stack__subtitle">
            Pure sculptural forms crafted with natural textiles and solid hardwoods. Scroll to reveal each silhouette.
          </p>
        </motion.div>

        {/* Sticky Stacking Deck of High-Quality Sofas */}
        <div className="sofa-stack-deck">
          {sofas.map((sofa, index) => (
            <SofaStackCard
              key={sofa.id}
              sofa={sofa}
              index={index}
              total={sofas.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Featured
