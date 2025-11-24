import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllFeedback = async (req: FastifyRequest, reply: FastifyReply) => {
  const feedback = await prisma.customerFeedback.findMany({ include: { owner: { select: { id: true, name: true } } } });
  return reply.send({ success: true, data: feedback });
};

export const getFeedback = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const feedback = await prisma.customerFeedback.findUnique({ where: { id: req.params.id } });
  if (!feedback) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: feedback });
};

export const createFeedback = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const feedback = await prisma.customerFeedback.create({ data: req.body });
  return reply.status(201).send({ success: true, data: feedback });
};

export const updateFeedback = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const feedback = await prisma.customerFeedback.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: feedback });
};

export const deleteFeedback = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.customerFeedback.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
