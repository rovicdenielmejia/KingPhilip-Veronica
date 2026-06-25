import { getTables } from '../data/guests'
import TableCard from './TableCard'

const TableList = () => {
  const tables = getTables()

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl font-medium" style={{ color: '#FFFFFF' }}>
        Guest Seating List
      </h2>
      <div className="grid gap-4">
        {tables.map((table, index) => (
          <div key={table.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <TableCard table={table} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TableList
