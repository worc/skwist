import * as esbuild from 'esbuild'
import ejs from 'ejs'
import fs from 'fs'

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true })
}
fs.mkdirSync('dist')

const result = await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  metafile: true,
  write: true,
  outdir: 'dist',
  loader: {
    '.jpg': 'file',
  },
  assetNames: 'public/[name].[hash]',
  publicPath: '/',
})

ejs.renderFile(
  'src/index.ejs',
  { index: 'index.js' },
  {},
  (err, str) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    fs.writeFileSync('dist/index.html', str)
  },
)

console.log('Build complete')
