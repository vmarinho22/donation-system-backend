import 'dotenv/config';
import fastify from 'fastify'
import env from './config/env'

const server = fastify();

server.get('/ping', async () => {
  return 'pong\n'
})

server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

