import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllAlerts = async (_req: FastifyRequest, reply: FastifyReply) => {
  const alerts = dbHelpers.findMany('alerts', 'createdAt DESC');
  return reply.send({ success: true, data: alerts });
};

export const getAlert = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const alert = dbHelpers.findById('alerts', req.params.id);
  if (!alert) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: alert });
};

export const createAlert = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const alert = dbHelpers.create('alerts', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: alert });
};

export const updateAlert = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const alert = dbHelpers.update('alerts', req.params.id, req.body);
  return reply.send({ success: true, data: alert });
};

export const deleteAlert = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('alerts', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
