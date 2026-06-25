export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto border border-ink-100 rounded-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-ink-50/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-2.5 font-medium text-ink-500 text-xs uppercase tracking-wide"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-ink-400 text-sm">
                Nothing here yet.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-ink-50 last:border-0 ${
                  onRowClick ? "cursor-pointer hover:bg-cream-100" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
