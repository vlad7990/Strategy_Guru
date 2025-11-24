import { FastifyInstance } from 'fastify';
import {
  getAllObjectives,
  getObjective,
  createObjective,
  updateObjective,
  deleteObjective,
} from '../controllers/objectivesController';

export default async function objectivesRoutes(fastify: FastifyInstance) {
  // GET /api/objectives
  fastify.get('/', getAllObjectives);

  // GET /api/objectives/:id
  fastify.get('/:id', getObjective);

  // POST /api/objectives
  fastify.post('/', createObjective);

  // PUT /api/objectives/:id
  fastify.put('/:id', updateObjective);

  // DELETE /api/objectives/:id
  fastify.delete('/:id', deleteObjective);
}
