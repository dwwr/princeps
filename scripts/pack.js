import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'))
const outDir = join(root, 'dist')
mkdirSync(outDir, { recursive: true })
const zipPath = join(outDir, `princeps-${manifest.version}.zip`)
rmSync(zipPath, { force: true })
execFileSync(
  'zip',
  [
    '-r',
    '-X',
    zipPath,
    'manifest.json',
    'src/content.js',
    'icons',
    'LICENSE',
    '-x',
    '*.DS_Store',
  ],
  { cwd: root, stdio: 'inherit' }
)
