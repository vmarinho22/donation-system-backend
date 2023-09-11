import { FastifyInstance } from 'fastify';
import medicalRecordsController from '../controllers/medicalRecords';
import auth from '../hooks/auth';

const medicalRecordsRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', medicalRecordsController.create);
  fastify.get('/', medicalRecordsController.getAll);
  fastify.get('/:id', medicalRecordsController.getUnique);
  fastify.put('/:id', medicalRecordsController.update);
};

export default medicalRecordsRouter;
