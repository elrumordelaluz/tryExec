const tryExec = require('./index')

let available = false
setTimeout(() => (available = true), 5000)

tryExec({
  max: 3,
  script: 'echo Current npm version: `npm --version`',
  verbose: 'Get NPM version',
  check: () => available,
})
