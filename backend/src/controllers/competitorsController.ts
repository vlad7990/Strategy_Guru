import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllCompetitors = async (_req: FastifyRequest, reply: FastifyReply) => {
  const competitors = dbHelpers.findMany('competitors', 'createdAt DESC');
  return reply.send({ success: true, data: competitors });
};

export const getCompetitor = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const competitor = dbHelpers.findById('competitors', req.params.id);
  if (!competitor) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: competitor });
};

export const createCompetitor = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const competitor = dbHelpers.create('competitors', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: competitor });
};

export const updateCompetitor = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const competitor = dbHelpers.update('competitors', req.params.id, req.body);
  return reply.send({ success: true, data: competitor });
};

export const deleteCompetitor = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('competitors', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
