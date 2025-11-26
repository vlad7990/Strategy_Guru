import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllRoadmapItems = async (_req: FastifyRequest, reply: FastifyReply) => {
  const roadmapItems = dbHelpers.findMany('roadmap_items', 'createdAt DESC');
  return reply.send({ success: true, data: roadmapItems });
};

export const getRoadmapItem = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const roadmapItem = dbHelpers.findById('roadmap_items', req.params.id);
  if (!roadmapItem) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: roadmapItem });
};

export const createRoadmapItem = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const roadmapItem = dbHelpers.create('roadmap_items', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: roadmapItem });
};

export const updateRoadmapItem = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const roadmapItem = dbHelpers.update('roadmap_items', req.params.id, req.body);
  return reply.send({ success: true, data: roadmapItem });
};

export const deleteRoadmapItem = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('roadmap_items', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
