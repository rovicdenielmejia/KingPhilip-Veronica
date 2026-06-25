import { QRCodeSVG } from 'qrcode.react'

const PrintQR = () => {
  const baseUrl = window.location.origin

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: '#0A0A0A' }}>
      <div className="text-center space-y-6 max-w-md border rounded-3xl p-10 shadow-soft" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="text-secondary text-[11px] uppercase tracking-[0.2em] font-sans">
          Wedding Reception
        </p>

        <div className="space-y-1">
          <h1 className="font-cinzel text-5xl font-medium tracking-[0.08em]" style={{ color: '#FFFFFF' }}>
            KING PHILIP
          </h1>
          <p className="font-script text-4xl text-secondary leading-none">and</p>
          <h1 className="font-cinzel text-5xl font-medium tracking-[0.08em]" style={{ color: '#FFFFFF' }}>
            VERONICA
          </h1>
        </div>

        <div className="h-px" style={{ background: 'rgba(255,255,255,0.15)' }}></div>

        <p className="font-serif text-3xl tracking-[0.12em]" style={{ color: '#FFFFFF' }}>
          SCAN ME
        </p>
        <p className="text-secondary text-sm">
          Find your assigned table instantly
        </p>

        <div className="p-6 rounded-2xl border inline-block shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <QRCodeSVG
            value={baseUrl}
            size={280}
            level="H"
            includeMargin={true}
            fgColor="#FFFFFF"
          />
        </div>

        <div className="space-y-1 text-sm text-secondary pt-1">
          <p>1. Open camera and scan</p>
          <p>2. Search your full name</p>
          <p>3. View your table assignment</p>
        </div>

        <p className="text-xs text-secondary uppercase tracking-[0.14em] pt-3">
          Powered by <span className="text-primary font-serif">Venuelle</span>
        </p>
      </div>
    </div>
  )
}

export default PrintQR
