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
  const cleaned = name.trim().replace(/\s+/g, ' ');
  const comma = cleaned.indexOf(',');
  let ordered = cleaned;

  // Historical entries are filed as "LAST, FIRST MIDDLE". Keep a trailing
  // maiden name at the end when converting to "First Middle Last".
  if (comma > 0) {
    const lastName = cleaned.slice(0, comma).trim();
    let givenNames = cleaned.slice(comma + 1).trim();
    const maiden = givenNames.match(/\s*(\([^()]+\))\s*$/)?.[1] || '';
    if (maiden) givenNames = givenNames.slice(0, -maiden.length).trim();
    ordered = [givenNames, lastName, maiden].filter(Boolean).join(' ');
  }

  return ordered
    .split(' ')
    // Capitalise each piece of hyphenated and apostrophe names: Smith-Rolle, O'Brien.
    .map((word) => word.split(/([-'’()])/).map(capitalise).join(''))
    .join(' ');
}
