import { FastifyInstance } from 'fastify';
import {
  generateOKRs,
  generateFromDocument,
  chat,
  refine,
  healthCheck,
} from '../controllers/aiController';

export default async function aiRoutes(fastify: FastifyInstance) {
  // Health check
  fastify.get('/health', healthCheck);

  // Generate OKRs from text
  fastify.post('/generate-okrs', generateOKRs);

  // Generate OKRs from document
  fastify.post('/generate-from-document', generateFromDocument);

  // Chat with AI
  fastify.post('/chat', chat);

  // Refine OKRs
  fastify.post('/refine-okrs', refine);
}
