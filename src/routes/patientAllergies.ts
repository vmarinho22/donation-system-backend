import { FastifyInstance } from 'fastify';
import patientAllergiesController from '../controllers/patientAllergies';
import auth from '../hooks/auth';

const patientAllergiesRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientAllergiesController.create);
  fastify.get('/', patientAllergiesController.getAll);
  fastify.get('/:id', patientAllergiesController.getUnique);
  fastify.get('/by-patient/:id', patientAllergiesController.getUniqueByPatientId);
  fastify.put('/:id', patientAllergiesController.update);
  fastify.delete('/:id', patientAllergiesController.remove);
};

export default patientAllergiesRouter;
