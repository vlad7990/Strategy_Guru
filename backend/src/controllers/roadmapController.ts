import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllRoadmapItems = async (req: FastifyRequest, reply: FastifyReply) => {
  const roadmapItems = await prisma.roadmapItem.findMany();
  return reply.send({ success: true, data: roadmapItems });
};

export const getRoadmapItem = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const roadmapItem = await prisma.roadmapItem.findUnique({ where: { id: req.params.id } });
  if (!roadmapItem) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: roadmapItem });
};

export const createRoadmapItem = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const roadmapItem = await prisma.roadmapItem.create({ data: req.body });
  return reply.status(201).send({ success: true, data: roadmapItem });
};

export const updateRoadmapItem = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const roadmapItem = await prisma.roadmapItem.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: roadmapItem });
};

export const deleteRoadmapItem = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.roadmapItem.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
