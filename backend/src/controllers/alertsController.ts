import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllAlerts = async (req: FastifyRequest, reply: FastifyReply) => {
  const alerts = await prisma.alert.findMany();
  return reply.send({ success: true, data: alerts });
};

export const getAlert = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const alert = await prisma.alert.findUnique({ where: { id: req.params.id } });
  if (!alert) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: alert });
};

export const createAlert = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const alert = await prisma.alert.create({ data: req.body });
  return reply.status(201).send({ success: true, data: alert });
};

export const updateAlert = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const alert = await prisma.alert.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: alert });
};

export const deleteAlert = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.alert.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
