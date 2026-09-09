export function randomInt(max: number): number {
  if (max <= 0) return 0
  const limit = Math.floor(0x100000000 / max) * max
  const values = new Uint32Array(1)
  do crypto.getRandomValues(values)
  while (values[0] >= limit)
  return values[0] % max
}

export function shuffle<T>(source: readonly T[]): T[] {
  const result = [...source]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
