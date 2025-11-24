import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllCompetitors = async (req: FastifyRequest, reply: FastifyReply) => {
  const competitors = await prisma.competitor.findMany();
  return reply.send({ success: true, data: competitors });
};

export const getCompetitor = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const competitor = await prisma.competitor.findUnique({ where: { id: req.params.id } });
  if (!competitor) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: competitor });
};

export const createCompetitor = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const competitor = await prisma.competitor.create({ data: req.body });
  return reply.status(201).send({ success: true, data: competitor });
};

export const updateCompetitor = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const competitor = await prisma.competitor.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: competitor });
};

export const deleteCompetitor = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.competitor.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
