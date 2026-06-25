import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { guests } from '../data/guests'
import { tableArrangementImage } from '../constants/assets'
import Lightbox from './Lightbox'

const TableDetail = () => {
  const { tableName } = useParams()
  const navigate = useNavigate()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const decodedTableName = decodeURIComponent(tableName || '')
  const tableGuests = guests.filter(g => g.table === decodedTableName)

  if (tableGuests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
        <div className="max-w-md mx-auto w-full px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Seat Finder
          </button>
          <div className="rounded-2xl p-6 border text-center shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-secondary">Table not found</p>
          </div>
        </div>
      </div>
    )
  }

  const getSimpleTableName = () => {
    return decodedTableName
  }

  const getTableSide = (table) => {
    const left = ["Table 1", "Table 3", "Table 5", "Table 9", "Table 12", "Table 14", "Table 16", "Principal S 1", "Principal S 2"]
    if (left.includes(table)) return "Left Side"
    if (table === "PS Long Table 1") return "Center Left"
    if (table === "PS Long Table 2") return "Center Right"
    if (table === "Parents Table") return "Front Left Side"
    return "Right Side"
  }
  const side = getTableSide(decodedTableName)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="max-w-md mx-auto w-full px-4 py-6 space-y-6 pb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Seat Finder
        </button>

        <div
          className="rounded-2xl p-3 border cursor-zoom-in hover:shadow-soft-lg transition-all"
          onClick={() => setLightboxOpen(true)}
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <img
            src={tableArrangementImage}
            alt="Table Seating Arrangement"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-secondary text-xs text-center mt-2">Tap to zoom</p>
        </div>

        <div className="rounded-2xl p-6 border shadow-soft text-center" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-secondary text-xs uppercase tracking-[0.18em] mb-2">Table</p>
          <h2 className="font-serif text-6xl md:text-7xl font-medium" style={{ color: '#FFFFFF' }}>
            {getSimpleTableName()}
          </h2>
          <p className="text-secondary text-sm mt-2">
            {tableGuests.length} {tableGuests.length === 1 ? 'guest' : 'guests'} seated at this table
          </p>
          <div className="mt-4 inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium" style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#FFFFFF',
          }}>
            {side}
          </div>
        </div>

        <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)}>
          <img
            src={tableArrangementImage}
            alt="Table Seating Arrangement"
            className="w-full h-auto rounded-lg"
          />
        </Lightbox>

        <div className="rounded-2xl overflow-hidden border shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="px-5 py-4 border-b" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 className="font-serif text-lg font-medium" style={{ color: '#FFFFFF' }}>
              Guests
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {tableGuests.map((guest, index) => (
              <div
                key={guest.id}
                className="flex items-center gap-3 py-2 border-b last:border-0"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-secondary" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {index + 1}
                </span>
                <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                  {guest.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableDetail
