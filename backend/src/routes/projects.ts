import { FastifyInstance } from 'fastify';
import { getAllProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectsController';

export default async function projectsRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllProjects);
  fastify.get('/:id', getProject);
  fastify.post('/', createProject);
  fastify.put('/:id', updateProject);
  fastify.delete('/:id', deleteProject);
}
