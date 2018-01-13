# Express Starter ![ci](https://travis-ci.org/nemtsov/express-starter.svg?branch=master)

This is a starter project for the Express and Node >= 8 featuring:

  - Docker
  - PostgreSQL
  - JWT-based authentication
  - `async / await` everywhere
  - Designed for ease of testing with an emphasis on "few-millisecond-fast" end-to-end tests
  - Service-based folder structure (each folder in `/lib` is a separate service, with its own `index.js`, `datastore.js` [if necessary], and a web `resource.js`) for easier navigation
  - Configuration is done via environment variables

The `lib/github` service is here to serve as an example of how a service
that has an http resource as well as non-trivial dependencies may be
implemented and tested.

Note: Minimum requirement is Node v8.0.0


## Usage

Development:
`docker-compose up`

Testing:
`npm test`

Check coverage:
`npm run test:cover`

Re-run tests when a file changes:
`npm run test:watch`

Production:
`npm install`
`npm start`


## Auth

Create a new user:
```
curl -i -XPOST 'http://localhost:4000/users' -H 'Content-type: application/json' -d '{"email": "e@e.com", "password": "pass"}'
```

Create a token for the user:
```
curl -i -XPOST -u 'e@e.com:pass' 'http://localhost:4000/tokens'
```

Use the token to get data:
```
curl -i 'http://localhost:4000/github/nodejs' -H 'Authorization: Bearer <TOKEN_FROM_PREV_STEP>'
```


## License

[MIT](/LICENSE)
