const Hero = () => {
  return (
    <section className="py-8 px-4 animate-fade-in">
      <div className="space-y-6 text-center">
        <p className="text-secondary text-[11px] uppercase tracking-[0.26em] font-sans">
          Wedding Reception
        </p>

        <div className="space-y-2">
          <h1 className="font-cinzel text-[52px] md:text-7xl font-medium text-primary tracking-[0.08em] leading-[0.9]">
            KING PHILIP
          </h1>
          <p className="font-script text-secondary text-5xl leading-none">
            and
          </p>
          <h1 className="font-cinzel text-[52px] md:text-7xl font-medium text-primary tracking-[0.08em] leading-[0.9]">
            VERONICA
          </h1>
          <p className="font-serif text-secondary italic text-lg pt-1">
            #ItsVEEnKINGafterall
          </p>
        </div>

        <div className="floral-divider">
          <span className="diamond"></span>
        </div>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
          <span className="font-serif text-secondary text-sm tracking-[0.18em] uppercase">June 27, 2026</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
        </div>

        <div className="border border-[rgba(255,255,255,0.12)] rounded-2xl p-6 space-y-5 shadow-soft text-left" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="space-y-1 rounded-xl p-3 text-sm text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-secondary text-[10px] uppercase tracking-[0.18em]">Date and Time</p>
            <p className="text-primary font-medium">Saturday, June 27, 2026</p>
            <p className="text-secondary">at 2:00 PM</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-secondary text-[10px] uppercase tracking-[0.18em]">Ceremony</p>
              <p className="text-primary font-medium">Our Lady of the Pillar Parish</p>
              <p className="text-secondary">Cauayan City, Isabela</p>
            </div>
            <div className="space-y-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-secondary text-[10px] uppercase tracking-[0.18em]">Reception</p>
              <p className="text-primary font-medium">Casa Madera Country Club</p>
              <p className="text-secondary">Woodside Village, Cauayan City</p>
            </div>
          </div>
        </div>

        <div className="pt-1 space-y-1">
          <h2 className="font-serif text-2xl font-medium text-primary tracking-wide">
            &ldquo;Find your seat instantly&rdquo;
          </h2>
          <p className="text-secondary text-sm">Search your name below to view your table assignment.</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
