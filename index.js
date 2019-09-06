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
  max = 5,
  interval = 1500,
  script = 'echo "Hello World"',
  check = () => false,
  verbose = false,
} = {}) {
  let currentAttemp = 1

  async function attemp() {
    const logString = typeof verbose === 'string'
    verbose &&
      log(
        `👀  Trying to execute${
          logString ? ` "${verbose}"` : ''
        } /${currentAttemp}`
      )
    if (await check()) {
      try {
        return typeof script === 'function' ? script() : customExecSync(script)
      } catch (err) {
        console.log({ err })
      } finally {
        process.exit()
      }
    } else {
      verbose &&
        log(
          `📢  No way, trying again${
            logString ? ` executing "${verbose}"` : ''
          }`
        )
      if (currentAttemp < max) {
        currentAttemp++
        setTimeout(attemp, interval)
      } else {
        verbose &&
          log(
            `💣  Max attemps (${max}) beaten${
              logString ? ` executing "${verbose}"` : ''
            }. Exiting…`
          )
        process.exit()
      }
    }
  }

  attemp()
}

module.exports = tryExec
