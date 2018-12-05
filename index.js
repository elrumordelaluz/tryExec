const { execSync } = require('child_process')
const path = require('path')
const { log } = console

function customExecSync(cmd) {
  const env = Object.assign({}, process.env)
  const SEPARATOR = process.platform === 'win32' ? ';' : ':'
  env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH
  return execSync(cmd, {
    cwd: process.cwd(),
    env,
    stdio: [0, 1, 2],
  })
}

function tryExec({
  max = 3,
  interval = 1500,
  script = 'echo "Hello World"',
  check = () => false,
  verbose = false,
} = {}) {
  let currentAttemp = 1

  async function attemp() {
    verbose && log(`👀  Trying to execute [${currentAttemp}]`)
    if (await check()) {
      return customExecSync(script)
    } else {
      verbose && log(`📢  No way, trying again [${currentAttemp}]`)
      if (currentAttemp < max) {
        currentAttemp++
        setTimeout(attemp, interval)
      } else {
        verbose && log(`💣  Max attemps [${max}] beaten. Exiting…`)
        process.exit()
      }
    }
  }

  attemp()
}

module.exports = tryExec
