import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllProjects = async (_req: FastifyRequest, reply: FastifyReply) => {
  const projects = dbHelpers.findMany('projects', 'createdAt DESC');
  return reply.send({ success: true, data: projects });
};

export const getProject = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const project = dbHelpers.findById('projects', req.params.id);
  if (!project) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: project });
};

export const createProject = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const project = dbHelpers.create('projects', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: project });
};

export const updateProject = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const project = dbHelpers.update('projects', req.params.id, req.body);
  return reply.send({ success: true, data: project });
};

export const deleteProject = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('projects', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
