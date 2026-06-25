const Footer = () => {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] mt-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="h-2 floral-strip"></div>
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-secondary text-xs uppercase tracking-[0.15em]">
            Powered by{' '}
            <a
              href="https://venuelle.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-serif tracking-[0.08em] hover:underline"
            >
              Venuelle
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
