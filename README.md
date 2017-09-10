# Express Starter

This is a starter project for the Express and Node >= 8 featuring:

  - `async / await` everywhere
  - Designed for ease of unit-testing
  - Service-based folder structure (each folder in `/lib` is a separate service, with its own `index.js`, `datastore.js` [if necessary], and a web `resource.js`) for easier navigation
  - Configuration is done via environment variables

The `lib/github` service is here to serve as an example of how a service
that has an http resource as well as non-trivial dependencies may be
implemented and tested.

Note: Minimum requirement is Node v8.0.0


## Usage

Development:
`npm run dev`

Testing:
`npm test`

Check coverage:
`npm run test:cover`

Re-run tests when a file changes:
`npm run test:watch`

Production:
`npm install`
`npm start`


## License

[MIT](/LICENSE)
