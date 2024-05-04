// There is no sane world in which this makes any sense
export function getExcerptFromMd(text: string, len = 253) {
  let nows = text.replace(/\s+/gi, ' ')
  const idx = nows.indexOf(`///META`)
  nows = nows.slice(idx > -1 ? idx + 8 : 0, len * 2).replace(/[^a-z0-9.!,;?()\p{Extended_Pictographic}]+/giu, ' ')

  return nows.slice(0, len) + (nows.length > len ? '...' : '')
}
