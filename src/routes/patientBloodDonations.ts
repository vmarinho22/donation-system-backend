import { FastifyInstance } from 'fastify';
import patientBloodDonationsController from '../controllers/patientBloodDonations';
import auth from '../hooks/auth';

const PatientBloodDonationsRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientBloodDonationsController.create);
  fastify.get('/', patientBloodDonationsController.getAll);
  fastify.get('/:id', patientBloodDonationsController.getUnique);
  fastify.get('/by-patient/:id', patientBloodDonationsController.getByPatientId );
  fastify.put('/:id', patientBloodDonationsController.update);
};

export default PatientBloodDonationsRouter;
