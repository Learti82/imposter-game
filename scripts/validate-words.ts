import { WORD_DATABASE } from '../src/data/wordSeeds'

const problems: string[] = []
const ids = new Set<number>()
const words = new Set<string>()

if (WORD_DATABASE.length < 3000) problems.push(`Vetëm ${WORD_DATABASE.length} hyrje; kërkohen të paktën 3000.`)

for (const entry of WORD_DATABASE) {
  const normalizedWord = entry.word.trim().toLocaleLowerCase('sq')
  const normalizedHint = entry.hint.trim().toLocaleLowerCase('sq')
  if (ids.has(entry.id)) problems.push(`ID e dyfishtë: ${entry.id}`)
  if (words.has(normalizedWord)) problems.push(`Fjalë e dyfishtë: ${entry.word}`)
  if (!normalizedWord) problems.push(`Fjalë bosh te ID ${entry.id}`)
  if (!normalizedHint) problems.push(`Hint bosh te ID ${entry.id}`)
  if (!entry.category.trim()) problems.push(`Kategori bosh te ID ${entry.id}`)
  if (normalizedWord && normalizedHint.includes(normalizedWord)) problems.push(`Hint-i përmban fjalën: ${entry.word}`)
  ids.add(entry.id)
  words.add(normalizedWord)
}

if (problems.length) {
  console.error(`Databaza ka ${problems.length} probleme:`)
  console.error(problems.slice(0, 100).join('\n'))
  process.exit(1)
}

console.log(`✓ ${WORD_DATABASE.length} terma unikë u validuan me sukses.`)
