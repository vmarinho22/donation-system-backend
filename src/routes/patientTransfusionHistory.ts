import { FastifyInstance } from 'fastify';
import patientTransfusionHistoryController from '../controllers/patientTransfusionHistory';
import auth from '../hooks/auth';

const patientTransfusionHistoryRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientTransfusionHistoryController.create);
  fastify.get('/', patientTransfusionHistoryController.getAll);
  fastify.get('/:id', patientTransfusionHistoryController.getUnique);
  fastify.get('/by-patient/:id', patientTransfusionHistoryController.getUniqueByPatientId);
  fastify.put('/:id', patientTransfusionHistoryController.update);
};

export default patientTransfusionHistoryRouter;
