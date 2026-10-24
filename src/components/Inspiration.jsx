import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Sparkles, BookOpen, Clock } from 'lucide-react'

const articles = [
  {
    id: '01',
    title: 'The Anatomy of the Curved Bouclé Sofa: Sculpting Living Silhouettes',
    tag: 'Furniture Craftsmanship',
    readTime: '4 min read',
    excerpt: 'How curved internal hardwood frames and multi-density high-resilience foam create the perfect organic balance between architectural presence and deep ergonomic comfort.',
    image: '/images/product-sofa.jpg',
    alt: 'Forma curved cream bouclé sofa showcasing sculptural silhouette and tailored seams',
    date: 'Autumn Edition',
    featured: true,
  },
  {
    id: '02',
    title: 'Japanese Timber Joinery: Why Solid Oak & Walnut Endure for Decades',
    tag: 'Woodworking & Joinery',
    readTime: '6 min read',
    excerpt: 'Exploring precision mortise-and-tenon joints, live-edge grain matching, and natural oil finishes on solid heirloom dining tables.',
    image: '/images/product-dining-table.jpg',
    alt: 'Noma solid walnut dining table highlighting hand-finished timber grain and joinery',
    date: 'Material Guide',
    featured: false,
  },
  {
    id: '03',
    title: 'The Ergonomics of Solace: Engineering the Ideal Accent Armchair',
    tag: 'Ergonomic Engineering',
    readTime: '5 min read',
    excerpt: 'Balancing lumbar curvature, 105-degree recline angles, and tactile upholstery for an accent chair that commands attention yet feels effortless.',
    image: '/images/product-chair.jpg',
    alt: 'Solace terracotta accent chair highlighting geometric armrests and ergonomic silhouette',
    date: 'Curator’s Note',
    featured: false,
  },
]

const Inspiration = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  const leadArticle = articles[0]
  const secondaryArticles = articles.slice(1)

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="inspiration section" id="inspiration" aria-label="Inspiration and newsletter">
      <div className="container">
        {/* Editorial Section Header */}
        <motion.div
          ref={headerRef}
          className="inspiration__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-caption inspiration__label">
            <BookOpen size={14} className="inspiration__icon" />
            The Living Journal
          </span>
          <h2 className="heading-lg">Your Next Favorite Space Starts Here.</h2>
          <p className="text-body inspiration__subtitle">
            Curated essays, master joinery insights, and furniture craftsmanship stories from our studio artisans.
          </p>
        </motion.div>

        {/* Editorial Magazine Journal Spread (No Box Cards) */}
        <div className="inspiration__spread">
          {/* Main Lead Story */}
          <article className="journal-lead" id="journal-lead">
            <div className="journal-lead__image-stage">
              <img
                src={leadArticle.image}
                alt={leadArticle.alt}
                className="journal-lead__image"
                loading="lazy"
              />
              <span className="journal-lead__badge">{leadArticle.tag}</span>
            </div>

            <div className="journal-lead__body">
              <div className="journal-meta">
                <span className="journal-meta__date">{leadArticle.date}</span>
                <span className="journal-meta__divider">•</span>
                <span className="journal-meta__time">
                  <Clock size={13} />
                  {leadArticle.readTime}
                </span>
              </div>

              <h3 className="journal-lead__title">{leadArticle.title}</h3>
              <p className="journal-lead__excerpt">{leadArticle.excerpt}</p>

              <a href="#" className="journal-link">
                <span>Read Full Essay</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </article>

          {/* Secondary Stories Stack (Separated by Subtle Hairlines) */}
          <div className="journal-stack">
            {secondaryArticles.map((article) => (
              <article key={article.id} className="journal-item" id={`journal-${article.id}`}>
                <div className="journal-item__thumbnail-wrapper">
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="journal-item__thumbnail"
                    loading="lazy"
                  />
                  <span className="journal-item__index">{article.id}</span>
                </div>

                <div className="journal-item__content">
                  <div className="journal-meta">
                    <span className="journal-meta__tag">{article.tag}</span>
                    <span className="journal-meta__divider">•</span>
                    <span className="journal-meta__time">{article.readTime}</span>
                  </div>

                  <h3 className="journal-item__title">{article.title}</h3>
                  <p className="journal-item__excerpt">{article.excerpt}</p>

                  <a href="#" className="journal-item__cta">
                    <span>Explore Guide</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Ambient Organic Newsletter Ribbon (No Heavy Dark Box) */}
        <motion.div
          className="ambient-newsletter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          id="newsletter"
        >
          <div className="ambient-newsletter__glow" />

          <div className="ambient-newsletter__inner">
            <div className="ambient-newsletter__left">
              <span className="ambient-newsletter__pill">
                <Sparkles size={13} />
                Private Dispatch
              </span>
              <h3 className="ambient-newsletter__heading">
                Design Wisdom, Delivered Quietly.
              </h3>
              <p className="ambient-newsletter__desc">
                Receive our bi-weekly edition featuring newly unreleased furniture drops,
                architectural moodboards, and interior philosophy.
              </p>
            </div>

            <div className="ambient-newsletter__right">
              {isSubscribed ? (
                <motion.div
                  className="ambient-newsletter__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="ambient-newsletter__success-icon">
                    <Check size={20} />
                  </div>
                  <div>
                    <strong>You are on the list.</strong>
                    <p>Welcome to the FurniSphere aesthetic circle.</p>
                  </div>
                </motion.div>
              ) : (
                <form className="ambient-newsletter__form" onSubmit={handleSubmit} noValidate>
                  <div className="ambient-newsletter__input-wrap">
                    <input
                      type="email"
                      className={`ambient-newsletter__input ${emailError ? 'ambient-newsletter__input--error' : ''}`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError('')
                      }}
                      aria-label="Email address for newsletter"
                      id="newsletter-email"
                    />
                    <button
                      type="submit"
                      className="ambient-newsletter__submit-btn"
                      id="newsletter-submit"
                      aria-label="Subscribe to dispatch"
                    >
                      <span>Join Dispatch</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  {emailError && <p className="ambient-newsletter__error">{emailError}</p>}
                </form>
              )}

              <span className="ambient-newsletter__privacy">
                No marketing clutter. Just pure design. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Inspiration
