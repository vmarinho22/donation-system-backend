import { FastifyInstance } from 'fastify';
import doctorsController from '../controllers/doctors';
import auth from '../hooks/auth';

const doctorsRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', doctorsController.create);
  fastify.get('/', doctorsController.getAll);
  fastify.get('/:id', doctorsController.getUnique);
  fastify.get('/by-user/:id', doctorsController.getUniqueByUserId);
  fastify.put('/:id', doctorsController.update);
};

export default doctorsRouter;
