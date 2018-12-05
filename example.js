const tryExec = require('./index')

let available = false
setTimeout(() => (available = true), 2000)

tryExec({
  script: 'echo Current npm version: `npm --version`',
  verbose: true,
  check: () => available,
})
