import { Sparkles, ShieldCheck, Leaf, Award, Truck, Gem } from 'lucide-react'

const marqueeItems = [
  { icon: Leaf, text: 'FSC® Certified Solid Hardwood' },
  { icon: Gem, text: '100% Belgian Bouclé & Raw Linens' },
  { icon: Award, text: 'Architectural Japanese Joinery' },
  { icon: Sparkles, text: 'Zero VOC Non-Toxic Finishes' },
  { icon: ShieldCheck, text: '10-Year Craftsmanship Warranty' },
  { icon: Truck, text: 'Complimentary White-Glove Placement' },
]

const Marquee = () => {
  return (
    <section className="marquee-section" aria-label="Brand Highlights Ticker">
      <div className="marquee-track">
        {/* First Loop */}
        <div className="marquee-group">
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={`m1-${index}`} className="marquee-item">
                <IconComponent size={14} className="marquee-item__icon" />
                <span className="marquee-item__text">{item.text}</span>
                <span className="marquee-item__divider">✦</span>
              </div>
            )
          })}
        </div>

        {/* Cloned Loop for Seamless Infinite Scroll */}
        <div className="marquee-group" aria-hidden="true">
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={`m2-${index}`} className="marquee-item">
                <IconComponent size={14} className="marquee-item__icon" />
                <span className="marquee-item__text">{item.text}</span>
                <span className="marquee-item__divider">✦</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Marquee
