import { FastifyInstance } from 'fastify';
import { getAllCompetitors, getCompetitor, createCompetitor, updateCompetitor, deleteCompetitor } from '../controllers/competitorsController';

export default async function competitorsRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllCompetitors);
  fastify.get('/:id', getCompetitor);
  fastify.post('/', createCompetitor);
  fastify.put('/:id', updateCompetitor);
  fastify.delete('/:id', deleteCompetitor);
}
