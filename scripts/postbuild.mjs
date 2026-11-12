import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const index = resolve('dist/index.html')
const fallback = resolve('dist/404.html')
const nojekyll = resolve('dist/.nojekyll')

if (!existsSync(index)) {
  console.error('dist/index.html não encontrado. Rode o build antes.')
  process.exit(1)
}

copyFileSync(index, fallback)
writeFileSync(nojekyll, '')
console.log('404.html e .nojekyll criados para o GitHub Pages.')
