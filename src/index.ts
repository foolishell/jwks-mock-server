import fastify from 'fastify'
import { createJWKS, createKeyPair, signJwt } from './jwt-utils'

const jwksOrigin = process.env.JWKS_ISSUER_ORIGIN
const jwksPath = process.env.JWKS_PATH || "/.well-known/jwks.json"
const jwtAudience = process.env.JWT_AUDIENCE

const bootstrap = () => {
  const keypair = createKeyPair()
  const JWKS = createJWKS({
    ...keypair,
    jwksOrigin,
  })
  const token = {
    aud: `${jwtAudience}`,
    iss: `${jwksOrigin}`,
    sub: 'testprovider|12345678',
  }
  
  const server = fastify()

  server.get(jwksPath, async () => {
    return JWKS
  })

  server.get('/token', async () => {
    return signJwt(keypair.privateKey, token, JWKS.keys[0].kid)
  })
  
  server.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
  
}
bootstrap()
