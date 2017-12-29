# o7

> tiny file processor

## Installation

```sh
npm i o7
```

## Usage

```js
const o7 = require('o7')

function middleware (files) {
  files.map(file => file.contents.concat('\nhello!'))
}

o7([middleware], 'destination/').then(() => {
  // success!
})
```

### `o7(Array(MIDDLEWARE), DESTINATION, [OPTIONS]) -> Promise`

Takes an array of middleware functions that each receive a `files` argument,
which is an array of [`vfile`s](https://github.com/vfile/vfile). Middleware
functions don't need to return anything, they can modify the `files` array
in-place. Middleware runs in the order it's defined in.

`DESTINATION` can be an absolute or relative path to where the modified files
should be outputted to.

`OPTIONS` is an optional object that can have two keys:

- `source`: Where to read files from. Default is `process.cwd()`
- `exclude`: An array of files or directories to exclude. Must be strings.

Returns a promise with no special arguments when finished writing.


## License

AGPL 3.0 (see [LICENSE](./LICENSE))
