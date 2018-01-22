const trough = require('trough')
const vfileRead = require('vfile-find-down')
const vfile = require('to-vfile')
const mkdirp = require('mkdirp')
const path = require('path')
const { promisify } = require('util')

module.exports = async function (middleware, dest = 'dest', opts = {}) {
  const source = opts.source || process.cwd()
  const excludes = opts.exclude || [dest]

  const files = await t(promisify(vfileRead.all), f => {
    return !excludes.some(e => f.path.includes(e))
  }, source)
  files.shift()
  files.map(f => vfile.readSync(f))

  const chain = trough()
  middleware.forEach(m => chain.use(m))
  await t(promisify(chain.run), files)

  files.forEach(async f => {
    const relativePath = path.relative(source, f.path)
    const destPath = path.join(dest, relativePath)
    f.path = destPath
    await t(promisify(mkdirp), f.dirname)
    await t(promisify(vfile.write), f)
  })
}

async function t (fn, ...args) {
  let res
  try {
    res = await fn(...args)
  } catch (e) {
    throw new Error(e)
  }
  return res
}
