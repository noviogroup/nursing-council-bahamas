// Display-only name casing for registry records, which arrive from the Council's
// Airtable in mixed styles (e.g. "AALIYAH JADE HOLMES", "aaliyah holmes").
// Source records are left untouched; this only standardises what the public sees.

const keepUppercase = new Set(['II', 'III', 'IV', 'V']);

function capitalise(part: string) {
  if (!part) return part;
  const upper = part.toUpperCase();
  if (keepUppercase.has(upper)) return upper;

  const lower = part.toLowerCase();
  // McKenzie, McPhee: "Mc" prefixes are consistently followed by a capital.
  if (lower.startsWith('mc') && lower.length > 2) {
    return `Mc${lower.charAt(2).toUpperCase()}${lower.slice(3)}`;
  }
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function formatPersonName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    // Capitalise each piece of hyphenated and apostrophe names: Smith-Rolle, O'Brien.
    .map((word) => word.split(/([-'’])/).map(capitalise).join(''))
    .join(' ');
}
