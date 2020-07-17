const tryExec = require('./index')

let available = false
setTimeout(() => (available = true), 2000)

tryExec({
  max: 3,
  script: 'echo Current npm version: `npm --version`',
  // script: 'node fail',
  verbose: 'Get NPM version',
  check: () => available,
})
