import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllReports = async (req: FastifyRequest, reply: FastifyReply) => {
  const reports = await prisma.report.findMany();
  return reply.send({ success: true, data: reports });
};

export const getReport = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const report = await prisma.report.findUnique({ where: { id: req.params.id } });
  if (!report) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: report });
};

export const createReport = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const report = await prisma.report.create({ data: req.body });
  return reply.status(201).send({ success: true, data: report });
};

export const updateReport = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const report = await prisma.report.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: report });
};

export const deleteReport = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.report.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
