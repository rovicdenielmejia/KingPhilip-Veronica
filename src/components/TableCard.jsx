const TableCard = ({ table }) => {
  return (
    <div className="rounded-2xl overflow-hidden border shadow-soft" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="px-4 py-3 border-b" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-serif text-base font-medium" style={{ color: '#FFFFFF' }}>
            {table.name}
          </h4>
          <span className="text-xs font-medium text-secondary px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {table.guests.length}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
        {table.guests.map((guest) => (
          <div key={guest.id} className="py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-sm" style={{ color: '#FFFFFF' }}>
              {guest.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableCard
