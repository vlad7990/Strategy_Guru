import { FastifyInstance } from 'fastify';
import { getAllMetrics, getMetric, createMetric, updateMetric, deleteMetric } from '../controllers/metricsController';

export default async function metricsRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllMetrics);
  fastify.get('/:id', getMetric);
  fastify.post('/', createMetric);
  fastify.put('/:id', updateMetric);
  fastify.delete('/:id', deleteMetric);
}
