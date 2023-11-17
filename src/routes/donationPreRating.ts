import { FastifyInstance } from 'fastify';
import donationPreRatingController from '../controllers/donationPreRating';
import auth from '../hooks/auth';

const donationPreRatingRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', donationPreRatingController.create);
  fastify.get('/', donationPreRatingController.getAll);
  fastify.get('all/by-patient/:id', donationPreRatingController.getAllByPatientId);
  fastify.get('all/by-doctor/:id', donationPreRatingController.getAllByDoctorId);
  fastify.get('/:id', donationPreRatingController.getUnique);
  fastify.get('/by-doctor/:id', donationPreRatingController.getUniqueByDoctorId);
  fastify.put('/:id', donationPreRatingController.update);
};

export default donationPreRatingRouter;
