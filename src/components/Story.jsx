import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { Armchair, Sparkles, Lamp, Layers, ArrowUpRight } from 'lucide-react'

const categories = [
  { name: 'Living Space', icon: Armchair },
  { name: 'Dining Craft', icon: Layers },
  { name: 'Lighting Sculptures', icon: Lamp },
  { name: 'Studio Accents', icon: Sparkles },
]

const Story = () => {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-60px' })

  const [activeCategory, setActiveCategory] = useState(0)
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  // Normalized mouse coordinates (-1 to 1) for physics-based 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Fluid spring configuration matching Alex Bender's Prima 3D physics
  const springConfig = { stiffness: 220, damping: 25, mass: 0.45 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // 3D Perspective transforms
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-12, 12])
  const rotateX = useTransform(smoothMouseY, [-1, 1], [9, -9])
  const shadowX = useTransform(smoothMouseX, [-1, 1], [24, -24])
  const shadowY = useTransform(smoothMouseY, [-1, 1], [28, -28])

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    const normX = Math.max(-1, Math.min(1, (clientX / rect.width) * 2 - 1))
    const normY = Math.max(-1, Math.min(1, (clientY / rect.height) * 2 - 1))

    mouseX.set(normX)
    mouseY.set(normY)

    setSheenPos({
      x: Math.round((clientX / rect.width) * 100),
      y: Math.round((clientY / rect.height) * 100),
    })
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setSheenPos({ x: 50, y: 50 })
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="story-spatial-section section"
      id="story"
      aria-label="Designed with Intention. Made for Living"
    >
      <div className="container">
        {/* Editorial Headline (Zero Routine Clutter) */}
        <div className="story-spatial__header">
          <span className="text-caption story-spatial__label">
            Studio Philosophy · Form Follows Feeling
          </span>
          <h2 className="heading-lg story-spatial__title">
            <span className="jitter-mask">
              <motion.span
                className="jitter-reveal-line"
                initial={{ y: '105%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.1 }}
              >
                Designed with Intention.
              </motion.span>
            </span>
            <span className="jitter-mask">
              <motion.span
                className="jitter-reveal-line"
                initial={{ y: '105%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.22 }}
              >
                Made for Living.
              </motion.span>
            </span>
          </h2>
          <p className="text-body-lg story-spatial__subtitle">
            An architectural balance between ambient light, raw materiality, and sculptural form.
          </p>
        </div>

        {/* Prima 3D Diorama Stage Setup */}
        <div className="prima-stage-wrap">
          {/* Ambient Studio Glow Behind Stage */}
          <div className="prima-stage__ambient-bloom" />

          {/* Interactive 3D Perspective Card with Spring Cursor Parallax */}
          <motion.div
            ref={cardRef}
            className="prima-diorama"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.15 }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1600,
            }}
          >
            {/* Continuous Ambient Breathing Levitation Loop */}
            <motion.div
              className="prima-diorama__inner"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Main 3D Canvas with High-Definition Diorama */}
              <div className="prima-diorama__canvas">
                <img
                  src="/images/story-prima-diorama.jpg"
                  alt="Architectural 3D luxury furniture diorama on glowing marble pedestal stage with sapphire chairs and arched floor lamp"
                  className="prima-diorama__img"
                  loading="lazy"
                  draggable="false"
                />

                {/* Dynamic Specular Light Reflection (Sweeping Sheen) */}
                <div
                  className="prima-diorama__sheen"
                  style={{
                    opacity: isHovered ? 0.65 : 0.2,
                    background: `radial-gradient(circle 520px at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 75%)`,
                  }}
                />

                {/* Dynamic Neon Violet Pedestal Rim Pulse */}
                <motion.div
                  className="prima-diorama__neon-beam"
                  animate={{ opacity: [0.65, 0.95, 0.65], scale: [1, 1.015, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Overhead Warm Lamp Spotlight Bloom */}
                <motion.div
                  className="prima-diorama__lamp-glow"
                  animate={{ opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
              </div>

              {/* Dynamic Ground Contact Shadow */}
              <motion.div
                className="prima-diorama__shadow"
                style={{
                  x: shadowX,
                  y: shadowY,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Prima-Style Floating Glass Action Dock */}
          <motion.div
            className="prima-dock"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 240, damping: 25, delay: 0.35 }}
          >
            <div className="prima-dock__pill">
              <div className="prima-dock__categories">
                {categories.map((cat, i) => {
                  const Icon = cat.icon
                  const isActive = activeCategory === i
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      className={`prima-dock__item ${isActive ? 'prima-dock__item--active' : ''}`}
                      onClick={() => setActiveCategory(i)}
                    >
                      <Icon size={15} />
                      <span>{cat.name}</span>
                    </button>
                  )
                })}
              </div>

              <a href="#featured" className="prima-dock__cta">
                <span>Explore Silhouettes</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Story
