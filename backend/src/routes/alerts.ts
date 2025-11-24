import { FastifyInstance } from 'fastify';
import { getAllAlerts, getAlert, createAlert, updateAlert, deleteAlert } from '../controllers/alertsController';

export default async function alertsRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllAlerts);
  fastify.get('/:id', getAlert);
  fastify.post('/', createAlert);
  fastify.put('/:id', updateAlert);
  fastify.delete('/:id', deleteAlert);
}
