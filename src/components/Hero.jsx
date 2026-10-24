import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Move,
  Compass,
  Eye,
  X,
  Play,
  Pause,
  ShoppingBag,
  Check,
  CreditCard,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
} from 'lucide-react'

// Furniture placed at specific 360° spatial angles around the room
const furniture360 = [
  {
    id: 'sofa',
    name: 'Forma Lounge Sofa',
    shortName: 'Forma Sofa',
    category: 'Living Room Seating',
    price: '₹1,89,900',
    angle: 45, // 45°
    pitch: -2,
    image: '/images/product-sofa.jpg',
    tagline: 'Sculptural organic silhouette with continuous fluid curves, designed for conversational living.',
    pricingDetails: {
      mrp: '₹2,25,000',
      savings: 'Save ₹35,100 (16% OFF)',
      emi: 'From ₹15,825/month with 0% No-Cost EMI',
      tax: 'Inclusive of all applicable taxes (GST 18%)',
      shipping: 'Complimentary White-Glove In-Room Delivery & Assembly',
      trial: '30-Day Risk-Free In-Home Trial with Free Returns',
    },
    materialDetails: [
      { label: 'Upholstery', value: 'High-density textured French Bouclé (35,000 Martindale double-rubs)' },
      { label: 'Internal Frame', value: 'FSC® Kiln-dried Solid American Walnut & Baltic Birch (8–10% moisture)' },
      { label: 'Cushioning Core', value: 'Dual-density CertiPUR-US® viscoelastic foam with down feather topper' },
      { label: 'Suspension', value: 'Italian Pirelli elastic webbing with sinuous carbon steel springs' },
      { label: 'Surface Finish', value: 'Zero-VOC matte organic oil wax with stain-resistant nanocoating' },
    ],
    specs: {
      dimensions: 'W 240 × D 105 × H 74 cm',
      seatHeight: '42 cm (Deep Lounge Comfort)',
      weight: '68 kg',
      joinery: 'Artisan hand-shaped timber joinery, zero hardware squeak',
      warranty: '10-Year Studio Structural Frame Guarantee',
    },
    swatches: ['#F5F0E8', '#D4C4B0', '#B87355'],
    swatchNames: ['Bouclé Cream', 'Oatmeal Wool', 'Terracotta Velvet'],
  },
  {
    id: 'table',
    name: 'Arlo Oak Coffee Table',
    shortName: 'Arlo Table',
    category: 'Sculptural Centerpiece',
    price: '₹54,900',
    angle: 115, // 115°
    pitch: -12,
    image: '/images/product-coffee-table.jpg',
    tagline: 'Curved organic low-profile coffee table displaying continuous natural timber grain and soft bullnose chamfers.',
    pricingDetails: {
      mrp: '₹68,000',
      savings: 'Save ₹13,100 (19% OFF)',
      emi: 'From ₹4,575/month with 0% No-Cost EMI',
      tax: 'Inclusive of all applicable taxes (GST 18%)',
      shipping: 'Complimentary White-Glove In-Room Delivery & Assembly',
      trial: '30-Day Risk-Free In-Home Trial with Free Returns',
    },
    materialDetails: [
      { label: 'Solid Timber', value: '100% FSC® Grade-A European White Oak (32mm solid slab)' },
      { label: 'Joinery System', value: 'Concealed floating apron with hand-cut sliding dovetails' },
      { label: 'Protective Seal', value: 'Hand-rubbed Rubio Monocoat 2C plant oil (Zero VOC, Heat & Wine-Safe)' },
      { label: 'Base Pedestals', value: 'Twin turned oak columns with recessed acoustic felt floor protectors' },
    ],
    specs: {
      dimensions: 'W 130 × D 70 × H 36 cm',
      seatHeight: '32 mm solid chamfered slab',
      weight: '34 kg',
      joinery: 'Precision hand-sanded to 400-grit ultra-silky finish',
      warranty: '10-Year Solid Hardwood Studio Guarantee',
    },
    swatches: ['#C4A47C', '#8B6B4A'],
    swatchNames: ['Natural White Oak', 'Smoked Walnut'],
  },
  {
    id: 'dining',
    name: 'Noma Dining Table',
    shortName: 'Noma Dining',
    category: 'Dining & Gathering',
    price: '₹1,25,000',
    angle: 180, // 180°
    pitch: -4,
    image: '/images/product-dining-table.jpg',
    tagline: 'Architectural dining table engineered with traditional Japanese joinery and book-matched timber grain.',
    pricingDetails: {
      mrp: '₹1,48,000',
      savings: 'Save ₹23,000 (15% OFF)',
      emi: 'From ₹10,416/month with 0% No-Cost EMI',
      tax: 'Inclusive of all applicable taxes (GST 18%)',
      shipping: 'Complimentary White-Glove In-Room Delivery & Assembly',
      trial: '30-Day Risk-Free In-Home Trial with Free Returns',
    },
    materialDetails: [
      { label: 'Timber Selection', value: 'Kiln-dried American Black Walnut (moisture content 8–10%)' },
      { label: 'Structural Joinery', value: 'Interlocking Mortise-and-Tenon with butterfly key stabilization' },
      { label: 'Surface Finish', value: 'Triple hand-buffed Danish Tung oil with satin luster seal' },
      { label: 'Capacity', value: 'Comfortably seats 6 to 8 guests with generous leg clearance' },
    ],
    specs: {
      dimensions: 'W 200 × D 95 × H 76 cm',
      seatHeight: '38 mm solid plank matching',
      weight: '76 kg',
      joinery: 'Butterfly keyed hairline joints for heirloom durability',
      warranty: '15-Year Master Atelier Guarantee',
    },
    swatches: ['#8B6B4A', '#5C4033'],
    swatchNames: ['American Walnut', 'Deep Espresso'],
  },
  {
    id: 'chair',
    name: 'Solace Accent Chair',
    shortName: 'Solace Chair',
    category: 'Curated Seating',
    price: '₹67,500',
    angle: 245, // 245°
    pitch: -2,
    image: '/images/product-chair.jpg',
    tagline: 'Warm terracotta upholstery with deep lumbar recline and solid darkened ash wood geometry.',
    pricingDetails: {
      mrp: '₹79,000',
      savings: 'Save ₹11,500 (15% OFF)',
      emi: 'From ₹5,625/month with 0% No-Cost EMI',
      tax: 'Inclusive of all applicable taxes (GST 18%)',
      shipping: 'Complimentary White-Glove In-Room Delivery & Assembly',
      trial: '30-Day Risk-Free In-Home Trial with Free Returns',
    },
    materialDetails: [
      { label: 'Upholstery Fabric', value: 'Belgian cotton-wool blend velvet (50,000 Martindale rubs, stain-repellent)' },
      { label: 'Hardwood Frame', value: 'Solid European Ash with charred dark espresso finish' },
      { label: 'Ergonomic Core', value: 'Molded anatomical cold-cure foam with 105° lumbar recline' },
      { label: 'Accent Hardware', value: 'Solid burnished brass leg ferrules and reinforcement brackets' },
    ],
    specs: {
      dimensions: 'W 82 × D 84 × H 78 cm',
      seatHeight: '44 cm (Optimal Lounge Ergonomics)',
      weight: '26 kg',
      joinery: 'Seamless double-needle upholstery stitchwork & dowelled frame',
      warranty: '10-Year Studio Frame & Foam Guarantee',
    },
    swatches: ['#B87355', '#8B9D77', '#6B6B6B'],
    swatchNames: ['Terracotta', 'Sage Moss', 'Charcoal Felt'],
  },
  {
    id: 'lamp',
    name: 'Aura Floor Lamp',
    shortName: 'Aura Lamp',
    category: 'Architectural Lighting',
    price: '₹34,500',
    angle: 315, // 315°
    pitch: 6,
    image: '/images/product-lamp.jpg',
    tagline: 'Sculptural ambient floor lamp diffusing warm architectural illumination through unbleached Belgian linen.',
    pricingDetails: {
      mrp: '₹42,000',
      savings: 'Save ₹7,500 (18% OFF)',
      emi: 'From ₹2,875/month with 0% No-Cost EMI',
      tax: 'Inclusive of all applicable taxes (GST 18%)',
      shipping: 'Complimentary Express Delivery & Bulb Setup',
      trial: '30-Day Risk-Free In-Home Trial with Free Returns',
    },
    materialDetails: [
      { label: 'Metal Armature', value: 'Hand-spun solid brushed brass with micro-crystalline wax seal' },
      { label: 'Diffuser Shade', value: 'Double-layer unbleached Belgian flax linen with parchment inner' },
      { label: 'Weighted Base', value: 'Solid honed Italian Nero Marquina marble (9 kg stability base)' },
      { label: 'Electrical & Cord', value: '2.5m braided olive textile cord with solid brass foot dimmer' },
    ],
    specs: {
      dimensions: 'Dia 45 cm (Shade) × H 162 cm (Base Dia: 32 cm)',
      seatHeight: 'Warm 2700K ambient LED module (CRI 95+), fully dimmable',
      weight: '14 kg',
      joinery: 'Precision hand-spun metalwork with honed marble base',
      warranty: '5-Year Studio Luminaire Warranty',
    },
    swatches: ['#C9A96E', '#292925'],
    swatchNames: ['Aged Brushed Brass', 'Matte Blackened Steel'],
  },
]

const Hero = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const isTimelineScrubbing = useRef(false)

  // 360 Navigation States
  const [rotation, setRotation] = useState(45) // current 0-360 azimuth
  const [pitch, setPitch] = useState(0) // vertical tilt (-18 to +18 deg)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [activeSwatch, setActiveSwatch] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  // Physics & interaction refs (Decoupled from React render cycle for 120fps smoothness)
  const currentRotRef = useRef(45)
  const targetRotRef = useRef(45)
  const currentPitchRef = useRef(0)
  const targetPitchRef = useRef(0)
  const isDraggingRef = useRef(false)
  const autoRotateRef = useRef(true)
  const velocityRef = useRef({ rot: 0, pitch: 0 })
  const dragStartRef = useRef({ x: 0, y: 0, time: 0, startRot: 45, startPitch: 0 })
  const lastMouseRef = useRef({ x: 0, time: 0 })
  const targetRotationRef = useRef(45)
  const isNavigatingToTarget = useRef(false)
  const bgImageRef = useRef(null)
  const imageLoadedRef = useRef(false)
  const scrollParallaxRef = useRef(0)
  const lastStateSyncRef = useRef(0)

  // Load the panoramic background room photo
  useEffect(() => {
    const img = new Image()
    img.src = '/images/hero.jpg'
    img.onload = () => {
      bgImageRef.current = img
      imageLoadedRef.current = true
    }
  }, [])

  // Close popup modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPiece(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelectPiece = (piece) => {
    setSelectedPiece(piece)
    setActiveSwatch(0)
    setIsAdded(false)
  }

  // 360 Canvas Renderer & Animation Loop (Runs uninterrupted without React state churn)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId

    // Resize canvas to match display size with high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
    }

    const handleScroll = () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top
        scrollParallaxRef.current = top * 0.2
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    let lastFrameTime = performance.now()

    const render = (now) => {
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05)
      lastFrameTime = now

      // 1. Programmatic Target Navigation (Smooth gliding when clicking a piece or keyframe)
      if (isNavigatingToTarget.current) {
        let diff = targetRotationRef.current - currentRotRef.current
        while (diff < -180) diff += 360
        while (diff > 180) diff -= 360

        if (Math.abs(diff) < 0.15) {
          isNavigatingToTarget.current = false
          currentRotRef.current = (targetRotationRef.current % 360 + 360) % 360
          targetRotRef.current = currentRotRef.current
        } else {
          currentRotRef.current = (currentRotRef.current + diff * 0.08 + 3600) % 360
          targetRotRef.current = currentRotRef.current
        }
      } else if (!isDraggingRef.current) {
        // 2. Inertia Velocity Decay
        if (Math.abs(velocityRef.current.rot) > 0.01) {
          targetRotRef.current = (targetRotRef.current + velocityRef.current.rot + 3600) % 360
          velocityRef.current.rot *= 0.94
        } else if (autoRotateRef.current) {
          // Slow continuous ambient 360 glide when idle
          targetRotRef.current = (targetRotRef.current + dt * 4.2) % 360
        }

        if (Math.abs(velocityRef.current.pitch) > 0.01) {
          targetPitchRef.current = Math.max(-18, Math.min(18, targetPitchRef.current + velocityRef.current.pitch))
          velocityRef.current.pitch *= 0.92
        }

        // 3. Smooth Lerp Interpolation (Buttery smooth camera motion)
        let diff = targetRotRef.current - currentRotRef.current
        while (diff < -180) diff += 360
        while (diff > 180) diff -= 360
        currentRotRef.current = (currentRotRef.current + diff * 0.09 + 3600) % 360
        currentPitchRef.current += (targetPitchRef.current - currentPitchRef.current) * 0.1
      } else {
        // While dragging: high-frequency soft damping eliminates mouse sensor jitter
        let diff = targetRotRef.current - currentRotRef.current
        while (diff < -180) diff += 360
        while (diff > 180) diff -= 360
        currentRotRef.current = (currentRotRef.current + diff * 0.35 + 3600) % 360
        currentPitchRef.current += (targetPitchRef.current - currentPitchRef.current) * 0.25
      }

      // 4. Synchronize React UI (Hotspot positions, Scrubber needle, Angle timecode)
      const syncInterval = isDraggingRef.current || isTimelineScrubbing.current ? 16 : 35
      if (now - lastStateSyncRef.current >= syncInterval) {
        lastStateSyncRef.current = now
        setRotation(currentRotRef.current)
        setPitch(currentPitchRef.current)
      }

      // 5. Draw 360 Room Viewport
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      if (imageLoadedRef.current && bgImageRef.current) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        const img = bgImageRef.current
        const imgAspect = img.width / img.height

        const targetH = h * 1.35
        const targetW = targetH * imgAspect

        // Continuous horizontal wrap for 360 degrees
        // Using exact integer multiplier (2 * targetW) ensures 360° and 0° match with zero pixel jump
        const fullSweepWidth = targetW * 2
        const normalizedAngle = (currentRotRef.current % 360 + 360) % 360
        const panOffset = (normalizedAngle / 360) * fullSweepWidth

        const pitchOffset = (currentPitchRef.current / 25) * (h * 0.18) + (scrollParallaxRef.current * 0.3)
        const posY = (h - targetH) / 2 + pitchOffset

        // Render wrapping room image tiles across the screen seamlessly
        let startX = - (panOffset % targetW)
        if (startX > 0) startX -= targetW
        let posX = startX
        while (posX < w) {
          ctx.drawImage(img, posX, posY, targetW, targetH)
          posX += targetW
        }

        // Ambient depth gradient overlay for luxury contrast
        const gradient = ctx.createLinearGradient(0, 0, w, h)
        gradient.addColorStop(0, 'rgba(26, 26, 23, 0.42)')
        gradient.addColorStop(0.45, 'rgba(26, 26, 23, 0.18)')
        gradient.addColorStop(1, 'rgba(26, 26, 23, 0.62)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e) => {
    if (e.target.closest('button, a, .hero-hotspot, .hero-piece-card, .hero-timeline')) return

    isDraggingRef.current = true
    setIsDragging(true)
    autoRotateRef.current = false
    setAutoRotate(false)
    isNavigatingToTarget.current = false
    velocityRef.current = { rot: 0, pitch: 0 }

    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

    dragStartRef.current = {
      x: clientX,
      y: clientY,
      time: e?.timeStamp || 0,
      startRot: targetRotRef.current,
      startPitch: targetPitchRef.current,
    }

    lastMouseRef.current = { x: clientX, time: e?.timeStamp || 0 }
  }

  const handlePointerMove = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

    if (isDraggingRef.current) {
      const dx = clientX - dragStartRef.current.x
      const dy = clientY - dragStartRef.current.y

      // Smooth drag sensitivity: 1px = 0.28 degrees
      const nextRot = (dragStartRef.current.startRot - dx * 0.28 + 3600) % 360
      const nextPitch = Math.max(-18, Math.min(18, dragStartRef.current.startPitch + dy * 0.12))

      targetRotRef.current = nextRot
      targetPitchRef.current = nextPitch

      // Calculate flick velocity for smooth inertia
      const now = e?.timeStamp || 0
      const dt = now - lastMouseRef.current.time
      if (dt > 10) {
        const vel = (lastMouseRef.current.x - clientX) / dt
        velocityRef.current.rot = vel * 2.8
        lastMouseRef.current = { x: clientX, time: now }
      }
    } else {
      // Subtle cursor parallax when moving mouse over hero without dragging
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const normY = (clientY - rect.top) / rect.height - 0.5
        targetPitchRef.current = normY * -8
      }
    }
  }

  const handlePointerUp = (e) => {
    isDraggingRef.current = false
    setIsDragging(false)

    // Check if pointer interaction was a stationary tap/click on furniture
    const clientX = e?.clientX || (e?.changedTouches && e.changedTouches[0]?.clientX) || lastMouseRef.current.x
    const clientY = e?.clientY || (e?.changedTouches && e.changedTouches[0]?.clientY) || dragStartRef.current.y
    const dx = clientX - dragStartRef.current.x
    const dy = clientY - dragStartRef.current.y
    const moveDist = Math.hypot(dx, dy)
    const elapsed = e?.timeStamp ? e.timeStamp - (dragStartRef.current.time || 0) : 0

    if (moveDist < 7 && elapsed < 450 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const clickX = clientX - rect.left
      const clickY = clientY - rect.top

      // Check proximity to any visible furniture piece in the 360 room
      let closestPiece = null
      let minDistance = 160 // Screen pixel radius for furniture hit detection

      visibleHotspots.forEach((item) => {
        if (!item.isVisible) return
        const itemPxX = (item.screenPercentX / 100) * rect.width
        const itemPxY = (item.screenPercentY / 100) * rect.height
        const dist = Math.hypot(clickX - itemPxX, clickY - itemPxY)

        // Broader hitzone for larger pieces (sofa and dining table)
        const threshold = item.id === 'sofa' || item.id === 'dining' ? 190 : 140
        if (dist < threshold && dist < minDistance) {
          minDistance = dist
          closestPiece = item
        }
      })

      if (closestPiece) {
        handleSelectPiece(closestPiece)
      }
    }
  }

  // Smooth mouse wheel / horizontal trackpad gesture
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault()
      targetRotRef.current = (targetRotRef.current + e.deltaX * 0.22 + 3600) % 360
      autoRotateRef.current = false
      setAutoRotate(false)
    } else if (e.shiftKey) {
      e.preventDefault()
      targetRotRef.current = (targetRotRef.current + e.deltaY * 0.22 + 3600) % 360
      autoRotateRef.current = false
      setAutoRotate(false)
    }
  }

  // Jitter-Style Interactive Motion Timeline Scrubbing Handlers
  const handleTimelineScrub = (clientX) => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const angle = pct * 360
    targetRotRef.current = angle
    currentRotRef.current = angle
    setRotation(angle)
    autoRotateRef.current = false
    setAutoRotate(false)
  }

  const handleTimelinePointerDown = (e) => {
    e.stopPropagation()
    isTimelineScrubbing.current = true
    autoRotateRef.current = false
    setAutoRotate(false)
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    handleTimelineScrub(clientX)

    const onPointerMove = (ev) => {
      if (isTimelineScrubbing.current) {
        const cx = ev.clientX || (ev.touches && ev.touches[0].clientX) || 0
        handleTimelineScrub(cx)
      }
    }

    const onPointerUp = () => {
      isTimelineScrubbing.current = false
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  // Smooth camera navigation to a specific furniture piece in 360°
  const navigateToPiece = (piece) => {
    handleSelectPiece(piece)
    autoRotateRef.current = false
    setAutoRotate(false)
    targetRotationRef.current = piece.angle
    targetRotRef.current = piece.angle
    isNavigatingToTarget.current = true
  }

  const toggleAutoRotate = () => {
    const nextVal = !autoRotate
    autoRotateRef.current = nextVal
    setAutoRotate(nextVal)
  }

  // Directional compass label based on 360 degree angle
  const getCompassHeading = (deg) => {
    const d = (deg % 360 + 360) % 360
    if (d >= 15 && d < 80) return 'Northeast • Forma Lounge Sofa'
    if (d >= 80 && d < 150) return 'East • Arlo Oak Coffee Table'
    if (d >= 150 && d < 215) return 'South • Noma Dining Table'
    if (d >= 215 && d < 280) return 'Southwest • Solace Accent Chair'
    if (d >= 280 && d < 345) return 'Northwest • Aura Floor Lamp'
    return 'North • Virtual 360 Furniture Showroom'
  }

  // Calculate screen coordinates for 3D furniture hotspots across 360°
  const halfFov = 55 // Half of 110° visible horizontal field of view
  const visibleHotspots = furniture360.map((item) => {
    let diff = ((item.angle - rotation + 540) % 360) - 180
    const isVisible = Math.abs(diff) < halfFov
    const screenPercentX = 50 + (diff / halfFov) * 50
    const screenPercentY = 32 + (item.pitch - pitch) * 1.5

    return {
      ...item,
      isVisible,
      screenPercentX,
      screenPercentY,
      distance: Math.abs(diff),
    }
  })

  return (
    <section
      ref={containerRef}
      className={`hero-360-space ${isDragging ? 'hero-360-space--dragging' : ''}`}
      id="hero"
      aria-label="360 degree interactive living space"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* 360 Panorama Canvas Engine */}
      <canvas ref={canvasRef} className="hero-360__canvas" />

      {/* Floating 360 Spatial Hotspots & Interactive Hit-Zones on Furniture */}
      <div className="hero-360__hotspots-layer">
        {visibleHotspots.map((item) => {
          if (!item.isVisible) return null
          const isSelected = selectedPiece?.id === item.id

          return (
            <div
              key={item.id}
              className={`hero-hotspot ${isSelected ? 'hero-hotspot--active' : ''}`}
              style={{
                left: `${item.screenPercentX}%`,
                top: `${item.screenPercentY}%`,
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {/* Furniture Interactive Hit Area */}
              <div
                className="hero-hotspot__hit-area"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectPiece(item)
                }}
                title={`Click to view ${item.name} details, pricing & materials`}
              />

              {/* Glowing Pulse Ring */}
              <div className="hero-hotspot__pulse" />

              {/* Floating Pill Marker */}
              <button
                type="button"
                className="hero-hotspot__marker"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectPiece(item)
                }}
                aria-label={`View ${item.name} price ${item.price} and materials`}
              >
                <img src={item.image} alt={item.name} className="hero-hotspot__thumb" />
                <div className="hero-hotspot__marker-text">
                  <span className="hero-hotspot__label">{item.name}</span>
                  <span className="hero-hotspot__sublabel">Click for Details</span>
                </div>
                <span className="hero-hotspot__price">{item.price}</span>
              </button>
            </div>
          )
        })}
      </div>

      {/* High-Impact Furniture Product Popup Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <div
            className="hero-modal-backdrop"
            onClick={() => setSelectedPiece(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPiece.name} product details`}
          >
            <motion.div
              className="hero-product-popup"
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="hero-product-popup__close"
                onClick={() => setSelectedPiece(null)}
                aria-label="Close product popup"
              >
                <X size={18} />
              </button>

              {/* Product Visual Showcase Column */}
              <div className="hero-product-popup__media">
                <div className="hero-product-popup__img-wrap">
                  <img
                    src={selectedPiece.image}
                    alt={selectedPiece.name}
                    className="hero-product-popup__img"
                  />
                  <span className="hero-product-popup__bearing-tag">
                    <Compass size={13} />
                    {selectedPiece.angle}° 360° Room Bearing
                  </span>
                  <span className="hero-product-popup__stock-tag">
                    <Sparkles size={12} />
                    Studio Handcrafted
                  </span>
                </div>

                {/* Swatches & Finishes */}
                {selectedPiece.swatches && (
                  <div className="hero-product-popup__swatches-wrap">
                    <div className="hero-product-popup__swatches-info">
                      <span className="hero-product-popup__swatches-label">Available Finishes:</span>
                      <span className="hero-product-popup__swatches-current">
                        {selectedPiece.swatchNames?.[activeSwatch] || 'Standard Finish'}
                      </span>
                    </div>
                    <div className="hero-product-popup__swatches">
                      {selectedPiece.swatches.map((color, idx) => (
                        <button
                          key={color}
                          type="button"
                          className={`hero-product-popup__swatch ${activeSwatch === idx ? 'hero-product-popup__swatch--active' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setActiveSwatch(idx)}
                          title={selectedPiece.swatchNames?.[idx] || 'Finish'}
                          aria-label={`Select ${selectedPiece.swatchNames?.[idx] || 'Finish'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimensions Quick Chip */}
                <div className="hero-product-popup__dim-chip">
                  <Layers size={14} />
                  <span>{selectedPiece.specs.dimensions}</span>
                </div>
              </div>

              {/* Product Info, Pricing & Materials Column */}
              <div className="hero-product-popup__content">
                <div className="hero-product-popup__header">
                  <span className="hero-product-popup__cat">{selectedPiece.category}</span>
                  <h2 className="hero-product-popup__title">{selectedPiece.name}</h2>
                  <p className="hero-product-popup__desc">{selectedPiece.tagline}</p>
                </div>

                {/* Dedicated Pricing Details Card */}
                <div className="hero-product-popup__pricing-card">
                  <div className="hero-product-popup__pricing-row">
                    <div className="hero-product-popup__price-group">
                      <span className="hero-product-popup__price-label">Curated Price</span>
                      <div className="hero-product-popup__price-main">
                        <span className="hero-product-popup__price">{selectedPiece.price}</span>
                        <span className="hero-product-popup__mrp">{selectedPiece.pricingDetails.mrp}</span>
                        <span className="hero-product-popup__discount-badge">
                          {selectedPiece.pricingDetails.savings}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hero-product-popup__emi-banner">
                    <CreditCard size={14} className="hero-product-popup__emi-icon" />
                    <span>{selectedPiece.pricingDetails.emi}</span>
                  </div>

                  <div className="hero-product-popup__pricing-perks">
                    <div className="hero-product-popup__perk">
                      <Check size={13} className="hero-product-popup__perk-icon" />
                      <span>{selectedPiece.pricingDetails.tax}</span>
                    </div>
                    <div className="hero-product-popup__perk">
                      <Truck size={13} className="hero-product-popup__perk-icon" />
                      <span>{selectedPiece.pricingDetails.shipping}</span>
                    </div>
                    <div className="hero-product-popup__perk">
                      <ShieldCheck size={13} className="hero-product-popup__perk-icon" />
                      <span>{selectedPiece.pricingDetails.trial}</span>
                    </div>
                  </div>
                </div>

                {/* Dedicated Material & Craftsmanship Card */}
                <div className="hero-product-popup__materials-card">
                  <div className="hero-product-popup__materials-header">
                    <Sparkles size={14} className="hero-product-popup__sparkle-icon" />
                    <span className="hero-product-popup__materials-title">
                      Material Specifications & Craftsmanship
                    </span>
                  </div>

                  <div className="hero-product-popup__materials-list">
                    {selectedPiece.materialDetails.map((mat) => (
                      <div key={mat.label} className="hero-product-popup__material-item">
                        <span className="hero-product-popup__material-label">{mat.label}</span>
                        <span className="hero-product-popup__material-val">{mat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Craftsmanship & Guarantee Highlights */}
                  <div className="hero-product-popup__craft-specs">
                    <div className="hero-product-popup__craft-spec">
                      <span className="hero-product-popup__craft-label">Joinery</span>
                      <span className="hero-product-popup__craft-val">{selectedPiece.specs.joinery}</span>
                    </div>
                    <div className="hero-product-popup__craft-spec">
                      <span className="hero-product-popup__craft-label">Guarantee</span>
                      <span className="hero-product-popup__craft-val">{selectedPiece.specs.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA Row */}
                <div className="hero-product-popup__actions">
                  <motion.button
                    className="btn btn-hero-terracotta hero-product-popup__cta"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setIsAdded(true)
                      setTimeout(() => setIsAdded(false), 2400)
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={17} />
                        <span>Added to Curated Order!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={17} />
                        <span>Add to Curated Order</span>
                      </>
                    )}
                  </motion.button>

                  <a
                    href="#featured"
                    className="btn btn-hero-glass hero-product-popup__secondary"
                    onClick={() => setSelectedPiece(null)}
                  >
                    <span>Explore in Isometric 3D</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom HUD: Jitter-Style Motion Timeline Scrubber & 360 Deck */}
      <div className="hero-360__deck">
        <div className="container hero-360__deck-inner">
          {/* Jitter Motion Scrubber & Keyframe Track */}
          <div className="hero-timeline" role="region" aria-label="360 Motion Timeline Scrubber">
            {/* Play / Pause Scrubber Control */}
            <motion.button
              className={`hero-timeline__play-btn ${autoRotate ? 'hero-timeline__play-btn--playing' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                toggleAutoRotate()
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              title={autoRotate ? 'Pause 360° Ambient Motion' : 'Play 360° Ambient Motion'}
              aria-label={autoRotate ? 'Pause 360 rotation' : 'Play 360 rotation'}
            >
              {autoRotate ? <Pause size={13} /> : <Play size={13} className="hero-timeline__play-icon" />}
            </motion.button>

            {/* Live Angle Timecode Readout */}
            <div className="hero-timeline__timecode">
              <span className="hero-timeline__timecode-val">{Math.round((rotation % 360 + 360) % 360)}°</span>
              <span className="hero-timeline__timecode-total">/ 360°</span>
            </div>

            {/* Interactive Timeline Track */}
            <div
              ref={timelineRef}
              className="hero-timeline__track"
              onPointerDown={handleTimelinePointerDown}
              title="Click or drag to scrub 360° perspective"
            >
              <div
                className="hero-timeline__fill"
                style={{ width: `${(((rotation % 360 + 360) % 360) / 360) * 100}%` }}
              />

              {/* Keyframe Diamonds for Spatial Furniture Positions */}
              {furniture360.map((piece) => {
                const kfPercent = (piece.angle / 360) * 100
                const isSelected = selectedPiece?.id === piece.id
                return (
                  <button
                    key={piece.id}
                    className={`hero-timeline__keyframe ${isSelected ? 'hero-timeline__keyframe--active' : ''}`}
                    style={{ left: `${kfPercent}%` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateToPiece(piece)
                    }}
                    title={`Keyframe: ${piece.name} (${piece.angle}°)`}
                    aria-label={`Jump to keyframe ${piece.name}`}
                  >
                    <span className="hero-timeline__diamond" />
                    <span className="hero-timeline__keyframe-tooltip">{piece.name}</span>
                  </button>
                )
              })}

              {/* Scrubbing Playhead Needle */}
              <div
                className="hero-timeline__playhead"
                style={{ left: `${(((rotation % 360 + 360) % 360) / 360) * 100}%` }}
              >
                <div className="hero-timeline__playhead-needle" />
                <div className="hero-timeline__playhead-handle" />
              </div>
            </div>
          </div>

          {/* Live 360 Compass & Drag Instruction */}
          <div className="hero-360__compass-pill">
            <div className="hero-360__drag-guide">
              <Move size={14} className="hero-360__drag-icon" />
              <span>Pan 360°</span>
            </div>
            <div className="hero-360__compass-divider" />
            <div className="hero-360__heading-info">
              <Compass size={14} className="hero-360__compass-rose" />
              <span className="hero-360__heading-text">{getCompassHeading(rotation)}</span>
            </div>
          </div>

          {/* Quick Furniture Jump Pills */}
          <div className="hero-360__jump-list" role="tablist" aria-label="Explore furniture pieces in 360">
            {furniture360.map((piece) => {
              const isActive = selectedPiece?.id === piece.id
              return (
                <motion.button
                  key={piece.id}
                  className={`hero-360__jump-btn ${isActive ? 'hero-360__jump-btn--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateToPiece(piece)
                  }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  title={`Rotate 360° view to ${piece.name} (${piece.angle}°)`}
                >
                  <Eye size={12} />
                  <span>{piece.shortName || piece.name}</span>
                  <span className="hero-360__jump-deg">{piece.angle}°</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
