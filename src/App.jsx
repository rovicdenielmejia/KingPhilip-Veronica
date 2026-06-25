import { useState, useMemo, useEffect, useRef } from 'react'
import { Routes, Route, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import GuestResult from './components/GuestResult'
import TableDetail from './components/TableDetail'
import Lightbox from './components/Lightbox'
import Footer from './components/Footer'
import PrintQR from './components/PrintQR'
import { searchGuests } from './data/guests'
import { tableArrangementImage } from './constants/assets'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()
  const inviteId = params['*'] || params.inviteId || ''
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const initialQuery = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery || inviteId)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (inviteId) {
      setSearchQuery(inviteId)
    }
  }, [inviteId])

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery })
      setShowDropdown(searchQuery.trim().length > 0)
    } else {
      setSearchParams({})
      setShowDropdown(false)
    }
  }, [searchQuery, setSearchParams])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return searchGuests(searchQuery)
  }, [searchQuery])

  const handleClearSearch = () => {
    setSearchQuery('')
    setShowDropdown(false)
    setSelectedIndex(-1)
  }

  const handleSelectGuest = (guest) => {
    setSearchQuery(guest.name)
    setShowDropdown(false)
    setSelectedIndex(-1)
    navigate(`/table/${encodeURIComponent(guest.table)}`)
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || searchResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < searchResults.length - 1 ? prev + 1 : prev)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectGuest(searchResults[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div className="invite-floral-canvas min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 space-y-8 pb-8">
        <Hero />

        {/* Search Section */}
        <section className="space-y-4">
          <div className="relative rounded-2xl p-4 shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-secondary text-[10px] uppercase tracking-[0.18em] mb-2 px-1">Guest Search</p>
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val)
                setSelectedIndex(-1)
              }}
              onClear={handleClearSearch}
              autoFocus={!!inviteId}
              onKeyDown={handleKeyDown}
            />

            {/* Dropdown Results */}
            {showDropdown && searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 left-0 right-0 mx-4 mt-2 rounded-2xl shadow-soft-lg overflow-hidden animate-fade-in-up"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <div className="max-h-72 overflow-y-auto">
                  {searchResults.map((guest, index) => (
                    <button
                      key={guest.id}
                      onClick={() => handleSelectGuest(guest)}
                      className="w-full px-4 py-3 text-left hover:bg-white/[0.06] transition-colors flex items-center justify-between gap-3"
                      style={{
                        borderTop: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        background: index === selectedIndex ? 'rgba(255,255,255,0.08)' : 'transparent',
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate" style={{ color: '#FFFFFF' }}>
                          {guest.name}
                        </p>
                        <p className="text-secondary text-xs truncate">
                          {guest.table}
                        </p>
                      </div>
                      <svg className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-secondary text-xs text-center">
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Full Search Results */}
          {searchQuery.trim() && !showDropdown && (
            <section className="space-y-4 animate-fade-in-up">
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((guest) => (
                    <GuestResult key={guest.id} guest={guest} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl p-6 text-center border shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <p className="text-secondary">
                    No guest found. Please check the spelling or ask the registration team.
                  </p>
                </div>
              )}
            </section>
          )}
        </section>

        {/* Table Arrangement Image */}
        {!searchQuery.trim() && (
          <>
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
            <p className="text-secondary text-center italic font-serif text-lg px-4">
              #ItsVEEnKINGafterall
            </p>
          </>
        )}

        {/* Lightbox */}
        <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)}>
          <img
            src={tableArrangementImage}
            alt="Table Seating Arrangement"
            className="w-full h-auto rounded-lg"
          />
        </Lightbox>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seat-finder" element={<HomePage />} />
        <Route path="/seat-finder/*" element={<HomePage />} />
        <Route path="/table/:tableName" element={<TableDetail />} />
        <Route path="/print-qr" element={<PrintQR />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
