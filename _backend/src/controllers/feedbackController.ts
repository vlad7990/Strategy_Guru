import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllFeedback = async (_req: FastifyRequest, reply: FastifyReply) => {
  const feedback = dbHelpers.findMany('customer_feedback', 'createdAt DESC');
  return reply.send({ success: true, data: feedback });
};

export const getFeedback = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const feedback = dbHelpers.findById('customer_feedback', req.params.id);
  if (!feedback) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: feedback });
};

export const createFeedback = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const feedback = dbHelpers.create('customer_feedback', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: feedback });
};

export const updateFeedback = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const feedback = dbHelpers.update('customer_feedback', req.params.id, req.body);
  return reply.send({ success: true, data: feedback });
};

export const deleteFeedback = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('customer_feedback', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
