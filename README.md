# JWKS Mock Server

## Usage
```
$ docker run --env JWKS_ISSUER_ORIGIN="http://issuer-origin.com" --env JWT_AUDIENCE="jwt-audience" $image
```

`GET /token` to get token
`GET /.well-known/jwks.json` to get jwks

## Other
Copied jwt-utils.ts from https://github.com/levino/mock-jwks (MIT)
