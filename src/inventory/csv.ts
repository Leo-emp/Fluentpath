/**
 * Minimal CSV reader for the vendored inventory files.
 *
 * A dependency would be overkill: these are three static files whose exact
 * shape is known and pinned, and which only ever change when a new upstream
 * release is deliberately vendored. The one non-trivial case they contain is
 * quoted fields with embedded commas, handled below.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (lines.length === 0) return []

  const headers = splitRow(lines[0]!).map((h) => h.trim())

  return lines.slice(1).map((line) => {
    const cells = splitRow(line)
    const row: Record<string, string> = {}

    // Iterate headers rather than cells, so a short row yields empty strings
    // instead of undefined and every row has the same shape.
    headers.forEach((header, i) => {
      row[header] = (cells[i] ?? '').trim()
    })

    return row
  })
}

/** Split one CSV line, respecting double-quoted fields. */
function splitRow(line: string): string[] {
  const cells: string[] = []
  let current = ''
  let inQuotes = false

  for (const ch of line) {
    if (ch === '"') inQuotes = !inQuotes
    else if (ch === ',' && !inQuotes) {
      cells.push(current)
      current = ''
    } else current += ch
  }
  cells.push(current)

  return cells
}
