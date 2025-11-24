import { FastifyInstance } from 'fastify';
import { getAllRoadmapItems, getRoadmapItem, createRoadmapItem, updateRoadmapItem, deleteRoadmapItem } from '../controllers/roadmapController';

export default async function roadmapRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllRoadmapItems);
  fastify.get('/:id', getRoadmapItem);
  fastify.post('/', createRoadmapItem);
  fastify.put('/:id', updateRoadmapItem);
  fastify.delete('/:id', deleteRoadmapItem);
}
