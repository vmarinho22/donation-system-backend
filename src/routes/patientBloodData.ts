import { FastifyInstance } from 'fastify';
import patientBloodDataController from '../controllers/patientBloodData';
import auth from '../hooks/auth';

const patientBloodDataRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientBloodDataController.create);
  fastify.get('/', patientBloodDataController.getAll);
  fastify.get('/:id', patientBloodDataController.getUnique);
  fastify.get('/by-patient/:id', patientBloodDataController.getByPatientId);
  fastify.put('/:id', patientBloodDataController.update);
};

export default patientBloodDataRouter;
