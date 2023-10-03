import { FastifyInstance } from 'fastify';
import patientMedicamentController from '../controllers/patientMedicament';
import auth from '../hooks/auth';

const patientMedicamentRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientMedicamentController.create);
  fastify.get('/', patientMedicamentController.getAll);
  fastify.get('/:id', patientMedicamentController.getUnique);
  fastify.get('/by-patient/:id', patientMedicamentController.getUniqueByPatientId);
  fastify.put('/:id', patientMedicamentController.update);
};

export default patientMedicamentRouter;
