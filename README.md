<p align="center">
  <img src="tryexec.png" width="250" />
</p>

<p align="center">Exec an <code>npm script</code>, <code>.bin</code> command, or othe CLI commands from <code>nodejs</code>, trying <code>x</code> times in case a condition doesn't meets</p>

## Install

```bash
npm install -D try-exec

# or

yarn add --dev try-exec
```

## Usage

```js
const tryExec = require('try-exec')
const isReachable = require('is-reachable')

tryExec({
  script: 'gatsby develop',
  // Check if API is reachable
  check: async () => await isReachable('cdn.contentful.com'),
})
```

## API

```js
tryExec(options?)
```

### Options

#### max

Max attemps to check

type: `Number`

default: `3`

#### interval

Delay between each attemp

type: `Number` (ms)

default: `1500`

#### script

CLI script to run

type: `String`

default: `echo "Hello World"`

#### check

(Async) function to run when checking

type: `Function`

default: `() => false`

#### verbose

Log when attemps, number of each iteration and results

type: `Boolean`

default: `false`
