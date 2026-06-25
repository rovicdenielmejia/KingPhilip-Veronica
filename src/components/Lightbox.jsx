import { useEffect, useState } from 'react'
import { tableArrangementImage } from '../constants/assets'

const Lightbox = ({ isOpen, onClose, children }) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 })
  const [startScale, setStartScale] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setScale(1)
      setPosition({ x: 0, y: 0 })
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.min(Math.max(prev + delta, 1), 4))
    if (scale <= 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      setStartScale(scale)
      setLastTouch({ x: touchDistance, y: 0 })
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true)
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      })
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      const touchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const scaleChange = touchDistance / lastTouch.x
      const newScale = Math.min(Math.max(startScale * scaleChange, 1), 4)
      setScale(newScale)
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 })
      }
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setLastTouch({ x: 0, y: 0 })
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setScale(prev => Math.min(prev + 0.5, 4)); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setScale(prev => Math.max(prev - 0.5, 1)); if (scale <= 1.5) setPosition({ x: 0, y: 0 }); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          {scale > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Hint text */}
      {scale === 1 && (
        <p className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-sm">
          Scroll to zoom &bull; Drag to pan
        </p>
      )}

      {/* Image Container */}
      <div
        className="max-w-full max-h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }}
      >
        <img
          src={tableArrangementImage}
          alt="Table Seating Arrangement"
          className="max-w-screen-sm max-h-[85vh] object-contain select-none transition-transform duration-200"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}

export default Lightbox
