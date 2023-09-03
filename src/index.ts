import 'dotenv/config';
import fastify from 'fastify';
import env from './config/env';
import jwt from '@fastify/jwt';

import registerRouter from './routes/register';
import ApiError from './utils/errors/apiError';

export const server = fastify({
  logger: false
});

server.register(jwt, {
  secret: env.SECRET
})

server.register(registerRouter, { prefix: '/signup' });

server.setErrorHandler(function (error, request, reply) {
  this.log.error(error);

  if (error instanceof ApiError) {
    reply.status(error.statusCode).send({ error: true, message: error.message });
  } else if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    reply.status(500).send({ error: true, message: error.message, statusCode: error.statusCode })
  } else {
    reply.status(500).send({ error: true, message: 'Internal server error'})
  }
})


server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

