import { FastifyInstance } from 'fastify';
import { getAllFeedback, getFeedback, createFeedback, updateFeedback, deleteFeedback } from '../controllers/feedbackController';

export default async function feedbackRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllFeedback);
  fastify.get('/:id', getFeedback);
  fastify.post('/', createFeedback);
  fastify.put('/:id', updateFeedback);
  fastify.delete('/:id', deleteFeedback);
}
