import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllMetrics = async (req: FastifyRequest, reply: FastifyReply) => {
  const metrics = await prisma.metric.findMany({ include: { owner: { select: { id: true, name: true } } } });
  return reply.send({ success: true, data: metrics });
};

export const getMetric = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const metric = await prisma.metric.findUnique({ where: { id: req.params.id } });
  if (!metric) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: metric });
};

export const createMetric = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const metric = await prisma.metric.create({ data: req.body });
  return reply.status(201).send({ success: true, data: metric });
};

export const updateMetric = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const metric = await prisma.metric.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: metric });
};

export const deleteMetric = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.metric.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
