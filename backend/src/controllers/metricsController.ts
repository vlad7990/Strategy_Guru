import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllMetrics = async (_req: FastifyRequest, reply: FastifyReply) => {
  const metrics = dbHelpers.findMany('metrics', 'createdAt DESC');
  return reply.send({ success: true, data: metrics });
};

export const getMetric = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const metric = dbHelpers.findById('metrics', req.params.id);
  if (!metric) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: metric });
};

export const createMetric = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const metric = dbHelpers.create('metrics', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: metric });
};

export const updateMetric = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const metric = dbHelpers.update('metrics', req.params.id, req.body);
  return reply.send({ success: true, data: metric });
};

export const deleteMetric = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('metrics', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
