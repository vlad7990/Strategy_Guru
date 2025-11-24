import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../server';

export const getAllProjects = async (req: FastifyRequest, reply: FastifyReply) => {
  const projects = await prisma.project.findMany({ include: { owner: { select: { id: true, name: true } } } });
  return reply.send({ success: true, data: projects });
};

export const getProject = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const project = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!project) return reply.status(404).send({ success: false, error: { message: 'Not found' } });
  return reply.send({ success: true, data: project });
};

export const createProject = async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
  const project = await prisma.project.create({ data: req.body });
  return reply.status(201).send({ success: true, data: project });
};

export const updateProject = async (req: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) => {
  const project = await prisma.project.update({ where: { id: req.params.id }, data: req.body });
  return reply.send({ success: true, data: project });
};

export const deleteProject = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  return reply.send({ success: true, message: 'Deleted' });
};
