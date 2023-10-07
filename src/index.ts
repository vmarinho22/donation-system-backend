import 'dotenv/config';
import fastify from 'fastify';
import env from './config/env';
import i18nHttpMiddleware from 'i18next-http-middleware';
import ApiError from './utils/errors/apiError';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors'

import statusRouter from './routes/status';
import registerRouter from './routes/register';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import recoveryPasswordRouter from './routes/recoveryPassword';
import profileRouter from './routes/profile';
import medicalRecordsRouter from './routes/medicalRecords';
import patientsRouter from './routes/patients';
import bloodRouter from './routes/bloods';
import patientMedicamentRouter from './routes/patientMedicaments';
import patientAllergiesRouter from './routes/patientAllergies';
import doctorsRouter from './routes/doctors';

import lang from './config/lang';

export const server = fastify({
  logger: true
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
  i18next: lang,
})

server.register(statusRouter, { prefix: '/status' });
server.register(registerRouter, { prefix: '/signup' });
server.register(userRouter, { prefix: '/users' });
server.register(authRouter, { prefix: '/auth' });
server.register(recoveryPasswordRouter, { prefix: '/recovery-password' });
server.register(profileRouter, { prefix: '/profiles' });
server.register(medicalRecordsRouter, { prefix: '/medical-records' });
server.register(patientsRouter, { prefix: '/patients' });
server.register(bloodRouter, { prefix: '/bloods' });
server.register(patientMedicamentRouter, { prefix: '/patient-medicaments' });
server.register(patientAllergiesRouter, { prefix: '/patient-allergies' });
server.register(doctorsRouter, { prefix: '/doctors' });

server.setErrorHandler(function (error, request, reply) {
  this.log.error(error);
  
  if (error instanceof ApiError) {
    reply.status(error.statusCode).send({ error: true, message: error.message });
  } else if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    reply.status(500).send({ error: true, message: error.message, statusCode: error.statusCode })
  } else {
    reply.status(500).send({ error: true, message: lang.t('error:internalError')})
  }
})


server.listen({ 
    host: env.HOST, 
    port: env.PORT 
}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

