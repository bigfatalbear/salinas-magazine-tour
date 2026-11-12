import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const repository = process.env.GITHUB_REPOSITORY || 'bigfatalbear/salinas-magazine-tour'
const repositoryName = repository.split('/').at(-1)
const env = { ...process.env, VITE_BASE: `/${repositoryName}/` }

function run(command, args, shell = false) {
  const result = spawnSync(command, args, { stdio: 'inherit', env, shell })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run('npm', ['run', 'build'], process.platform === 'win32')
run(process.execPath, [
  resolve('node_modules/gh-pages/bin/gh-pages.js'),
  '-d',
  'dist',
  '--dotfiles',
])

console.log(`Publicado em https://${repository.split('/')[0]}.github.io/${repositoryName}/`)
