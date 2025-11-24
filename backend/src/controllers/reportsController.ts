import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { randomUUID } from 'crypto';

export const getAllReports = async (_req: FastifyRequest, reply: FastifyReply) => {
  const reports = dbHelpers.findMany('reports', 'createdAt DESC');
  return reply.send({ success: true, data: reports });
};

export const getReport = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const report = dbHelpers.findById('reports', req.params.id);
  if (!report) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: report });
};

export const createReport = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const report = dbHelpers.create('reports', { id: randomUUID(), ...(req.body as Record<string, unknown>) });
  return reply.status(201).send({ success: true, data: report });
};

export const updateReport = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const report = dbHelpers.update('reports', req.params.id, req.body);
  return reply.send({ success: true, data: report });
};

export const deleteReport = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  dbHelpers.delete('reports', req.params.id);
  return reply.send({ success: true, message: 'Deleted' });
};
