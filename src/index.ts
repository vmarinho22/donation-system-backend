import 'dotenv/config';
import fastify from 'fastify';
import env from './config/env';

import registerRouter from './routes/register';

const server = fastify();

server.register(registerRouter, { prefix: '/register' });

server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

