import 'dotenv/config';
import fastify from 'fastify';
import env from './config/env';
import i18next from 'i18next';
import i18nHttpMiddleware from 'i18next-http-middleware';
import ApiError from './utils/errors/apiError';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors'

import registerRouter from './routes/register';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import recoveryPasswordRouter from './routes/recoveryPassword';

import ptLocale from './locales/pt-br.json';

i18next.use(i18nHttpMiddleware.LanguageDetector).init({
  lng: 'pt-BR',
  preload: ['pt-BR'],
  fallbackLng: 'pt-BR',
  debug: true,
  resources: {
    "pt-BR": ptLocale
  }
})

export const server = fastify({
  logger: false
});

server.register(jwt, {
  secret: env.SECRET
});

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

server.register(i18nHttpMiddleware.plugin, {
  i18next,
})

server.register(registerRouter, { prefix: '/signup' });
server.register(userRouter, { prefix: '/users' });
server.register(authRouter, { prefix: '/auth' });
server.register(recoveryPasswordRouter, { prefix: '/recovery-password' });

server.setErrorHandler(function (error, request, reply) {
  this.log.error(error);

  console.error(error);
  
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

