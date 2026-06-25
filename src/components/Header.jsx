const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b border-[rgba(255,255,255,0.08)] shadow-soft" style={{ background: 'rgba(10,10,10,0.9)' }}>
      <div className="max-w-md mx-auto px-4 py-4 text-center">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base tracking-[0.08em] uppercase font-medium">
          <span style={{ color: '#FFFFFF' }}>Seat Finder</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <a
            href="https://venuelle.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: '#A0A0A0' }}
          >
            Powered by Venuelle
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
