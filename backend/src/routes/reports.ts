import { FastifyInstance } from 'fastify';
import { getAllReports, getReport, createReport, updateReport, deleteReport } from '../controllers/reportsController';

export default async function reportsRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllReports);
  fastify.get('/:id', getReport);
  fastify.post('/', createReport);
  fastify.put('/:id', updateReport);
  fastify.delete('/:id', deleteReport);
}
